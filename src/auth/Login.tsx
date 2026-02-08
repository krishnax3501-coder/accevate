import React, { memo, useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { Storage } from "../store/storage";
import { api } from "../apis/api";

type Props = {
  onSuccess: () => void;
};

type LoginResponse = {
  msg: string;
  status: boolean;
  userid: number;
};

const Login = ({ onSuccess }: Props) => {
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const login = useCallback(async () => {
    if (!usernameRef.current || !passwordRef.current) {
      Alert.alert("Please enter username and password");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post<LoginResponse>(
        "/flutter-api/login.php",
        {
          userid: usernameRef.current,
          password: passwordRef.current,
        }
      );

      console.log("Login response:", response.data);

      if (response.data.status) {
        await Storage.setUserId(response.data.userid.toString());
        onSuccess(); 
      } else {
        Alert.alert(response.data.msg || "Invalid credentials, please try again.");
      }
    } catch (error) {
      console.log("Login error:", error);
      Alert.alert("Login failed. Please check your network or credentials.");
    } finally {
      setLoading(false);
    }
  }, [onSuccess]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Image
        source={require('../../assets/logoa.png')}
        resizeMode="contain"
        style={{ width: 200, height: 200, marginBottom: 16 }}
      />

      <View style={styles.card}>
        <Text style={styles.subtitle}>Login to continue</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#999"
          onChangeText={(v) => (usernameRef.current = v)}
        />

        <View style={styles.passwordWrapper}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            onChangeText={(v) => (passwordRef.current = v)}
          />
          <TouchableOpacity
            onPress={() => setShowPassword((prev) => !prev)}
            style={styles.showHideBtn}
          >
            <Text style={styles.showHideText}>
              {showPassword ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={login}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default memo(Login);

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 6,
  },
  subtitle: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 24,
    color: "#333",
    textAlign: "center",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "#333",
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  showHideBtn: {
    position: "absolute",
    right: 12,
    padding: 4,
    top:10
  },
  showHideText: {
    color: "#609accff",
    fontWeight: "600",
    fontSize: 12,
  },
  button: {
    height: 48,
    backgroundColor: "#273745ff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: "#8FBCE6",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
