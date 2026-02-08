import React, { memo, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Logo from "../../assets/logoa.png";

type Props = {
  onFinish: () => void;
};

const SplashScreen = ({ onFinish }: Props) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 1500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Logo width={160} height={160} />
    </View>
  );
};

export default memo(SplashScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
