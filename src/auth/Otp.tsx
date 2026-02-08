import React, { memo, useCallback, useRef } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { Storage } from "../store/storage";
import { api } from "../apis/api";


type Props = {
  onSuccess: () => void;
};

const Otp
 = ({ onSuccess }: Props) => {
  const otpRef = useRef("");

  const verifyOtp = useCallback(async () => {
    const userId = await Storage.getUserId();

    const res = await api.post("/verify_otp.php", {
      userId,
      otp: otpRef.current,
    });

    await Storage.setToken(res.data.token);
    onSuccess();
  }, [onSuccess]);

  return (
    <View>
      <Text>OTP Verification</Text>

      <TextInput
        placeholder="Enter 6-digit OTP"
        keyboardType="number-pad"
        maxLength={6}
        onChangeText={v => (otpRef.current = v)}
      />

      <Button title="Verify" onPress={verifyOtp} />
    </View>
  );
};

export default memo(Otp

);
