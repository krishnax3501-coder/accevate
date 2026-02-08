import React, { memo, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";

type Props = {
  onFinish: () => void;
};

const Splash = ({ onFinish }: Props) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 1500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logoa.png')} resizeMode="contain" style={{width:500,height:500}}/>
    </View>
  );
};

export default memo(Splash);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent:"center",
    alignItems:"center"

  },
});
