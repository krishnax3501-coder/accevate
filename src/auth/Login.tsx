import React, { memo, useCallback, useRef } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { api } from "../apis/api";
import { Storage } from "../store/storage";


type Props = {
  onSuccess: () => void;
};

const Login = ({ onSuccess }: Props) => {
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  const login = useCallback(async () => {
    const res = await api.post("/login", {
      username: usernameRef.current,
      password: passwordRef.current,
    });

    await Storage.setUserId(res.data.userId);
    onSuccess();
  }, [onSuccess]);

  return (
    <View>
      <Text>Login</Text>

      <TextInput
        placeholder="Username"
        onChangeText={v => (usernameRef.current = v)}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={v => (passwordRef.current = v)}
      />

      <Button title="Login" onPress={login} />
    </View>
  );
};

export default memo(Login);
