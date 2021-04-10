import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import theme from "./app/themes/theme";
import DataStore from "./app/config/DataStore";
import AuthStack from "./app/navigation/AuthStack";
import MainStack from "./app/navigation/MainStack";
import { useAuthStatus } from "./app/config/Hooks";

export default function App() {
  const isLoggedIn = useAuthStatus();
  DataStore.users.login({ email: "1@b.c", password: "1234" });
  console.log("Theme", theme);
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {console.log(DataStore.users.current())}
        {isLoggedIn ? <MainStack /> : <AuthStack />}
      </NavigationContainer>
    </PaperProvider>
  );
}

// disable outline effect when running in the browser
if (Platform.OS === "web") {
  const style = document.createElement("style");
  style.textContent = `textarea, select, input, button { outline: none!important; }`;
  document.head.append(style);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
