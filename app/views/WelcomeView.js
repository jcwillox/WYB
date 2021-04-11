import React from "react";
import { StyleSheet, View } from "react-native";
import { FAB, Title } from "react-native-paper";
import * as details from "../../app.json";

function WelcomeView({ navigation }) {
  return (
    <View style={styles.container}>
      <Title style={styles.text}>{details.expo.name}</Title>
      <View>
        <FAB
          style={[styles.fab, styles.loginFab]}
          label="Login"
          onPress={() => navigation.navigate("Login")}
        />
        <FAB
          style={styles.fab}
          label="Register"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  text: {
    fontSize: 24,
  },
  fab: {
    width: 250,
  },
  loginFab: {
    marginBottom: 24,
  },
});

export default WelcomeView;
