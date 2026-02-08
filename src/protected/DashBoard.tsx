import React, { memo, useCallback, useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { Storage } from "../store/storage";
import { api } from "../apis/api";


type Props = {
  onLogout: () => void;
};

const DashboardScreen = ({ onLogout }: Props) => {
  const [bgColor, setBgColor] = useState<string>("#fff");

  const loadDashboard = useCallback(async () => {
    const token = await Storage.getToken();

    const res = await api.get("/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setBgColor(res.data.color);
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const logout = useCallback(async () => {
    await Storage.clear();
    onLogout();
  }, [onLogout]);

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
      <Text>Dashboard</Text>

      <Button title="Refresh Dashboard" onPress={loadDashboard} />
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default memo(DashboardScreen);
