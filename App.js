import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Platform } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import theme from "./app/config/theme";
import DataStore from "./app/config/DataStore";
import AuthStack from "./app/navigation/AuthStack";
import MainStack from "./app/navigation/MainStack";
import { useAuthStatus } from "./app/config/Hooks";

export default function App() {
  const isLoggedIn = useAuthStatus();
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
