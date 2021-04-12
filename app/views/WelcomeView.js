import React from "react";
import { StyleSheet, View } from "react-native";
import { Caption, FAB, Title } from "react-native-paper";
import * as details from "../../app.json";

function WelcomeView({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleGroup}>
        <Title style={styles.text}>{details.expo.name}.</Title>
        <Caption style={styles.caption}>WYB</Caption>
      </View>
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
  titleGroup: {
    alignItems: "center",
  },
  text: {
    fontSize: 28,
  },
  caption: {
    fontSize: 18,
    marginTop: 8,
  },
  fab: {
    width: 200,
  },
  loginFab: {
    marginBottom: 24,
  },
});

export default WelcomeView;
