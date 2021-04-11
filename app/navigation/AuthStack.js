import AppHeader from "../components/AppHeader";
import WelcomeView from "../views/WelcomeView";
import LoginView from "../views/LoginView";
import RegisterView from "../views/RegisterView";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        header: (props) => <AppHeader {...props} />,
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeView}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={LoginView} />
      <Stack.Screen name="Register" component={RegisterView} />
    </Stack.Navigator>
  );
}

export default AuthStack;
