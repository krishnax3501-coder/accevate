import React, { memo, useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from "react-native";
import { api } from "../apis/api";
import { Storage } from "../store/storage";

type Props = {
  onLogout: () => void;
};

type DashboardResponse = {
  status: boolean;
  msg: string;
  user: {
    id: number;
    userid: string;
    name: string;
    mobile: string;
  };
  dashboard: {
    carousel: string[];
    student: { Boy: number; Girl: number };
    amount: { Total: number; Paid: number; due: number };
    color: { dynamic_color: string };
  };
};

const DashBoard = ({ onLogout }: Props) => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(
    null
  );
  const [bgColor, setBgColor] = useState("#fff");

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const token = await Storage.getToken();
      if (!token) {
        onLogout();
        return;
      }

      const response = await api.get<DashboardResponse>("/flutter-api/dashboard.php", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.status) {
        setDashboardData(response.data);
        setBgColor(response.data.dashboard.color.dynamic_color || "#fff");
      } else {
        Alert.alert(response.data.msg || "Failed to fetch dashboard");
      }
    } catch (error) {
      console.log("Dashboard fetch error:", error);
      Alert.alert("Failed to fetch dashboard. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [onLogout]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const handleCheckBg =useCallback(()=>{
fetchDashboard()
  },[])

  const handleLogout = useCallback(async () => {
    await Storage.clear();
    onLogout();
  }, [onLogout]);

  if (loading || !dashboardData) {
    return (
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  const { user, dashboard } = dashboardData;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.userName}>Welcome, {user.name}</Text>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
          {dashboard.carousel.map((img, idx) => (
            <Image key={idx} source={{ uri: img }} style={styles.carouselImage} />
          ))}
        </ScrollView>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Students</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Boys:</Text>
            <Text style={styles.value}>{dashboard.student.Boy}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Girls:</Text>
            <Text style={styles.value}>{dashboard.student.Girl}</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Amounts</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Total:</Text>
            <Text style={styles.value}>{dashboard.amount.Total}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Paid:</Text>
            <Text style={styles.value}>{dashboard.amount.Paid}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Due:</Text>
            <Text style={styles.value}>{dashboard.amount.due}</Text>
          </View>
        </View>

      </ScrollView>
 
              <TouchableOpacity onPress={handleCheckBg} style={{padding:10}}>
            <Text style={{textAlign:"center",fontSize:15}}>Refresh API</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

export default memo(DashBoard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  logoutBtn: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  logoutText: {
    color: "#273745",
    fontWeight: "600",
  },
  carousel: {
    marginBottom: 16,
  },
  carouselImage: {
    width: 250,
    height: 120,
    borderRadius: 12,
    marginRight: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    color: "#666",
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
});
