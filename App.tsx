import { useCallback, useEffect, useState } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Login from "./src/auth/Login";
import Otp from "./src/auth/Otp";
import DashBoard from "./src/protected/DashBoard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Splash from "./src/auth/Splash";

type Step = "splash" | "login" | "otp" | "dashboard";

function App() {
  const isDarkMode = useColorScheme() === "dark";
  const [step, setStep] = useState<Step>("splash");


  const goLogin = useCallback(() => setStep("login"), []);
  const goOtp = useCallback(() => setStep("otp"), []);
  const goDashboard = useCallback(() => setStep("dashboard"), []);

  const handleSplashFinish = useCallback(async () => {
    const token = await AsyncStorage.getItem("TOKEN");
    setStep(token ? "dashboard" : "login");
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

      {step === "splash" && (
        <Splash onFinish={handleSplashFinish} />
      )}

      {step === "login" && <Login onSuccess={goOtp}/>}

      {step === "otp" && <Otp onSuccess={goDashboard} />}

      {step === "dashboard" && (
        <DashBoard onLogout={goLogin} />
      )}
    </SafeAreaProvider>
  );
}

export default App;
