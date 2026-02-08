import AsyncStorage from "@react-native-async-storage/async-storage";

export const Storage = {
  setUserId: (id: string) => AsyncStorage.setItem("USER_ID", id),
  getUserId: () => AsyncStorage.getItem("USER_ID"),

  setToken: (token: string) => AsyncStorage.setItem("TOKEN", token),
  getToken: () => AsyncStorage.getItem("TOKEN"),

  clear: () => AsyncStorage.clear(),
};
