import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Subheading, Title } from "react-native-paper";

function WelcomeView({ navigation }) {
  return (
    <View style={styles.container}>
      <Title style={styles.text}>Uber Deets</Title>
      <Subheading style={styles.text}>{}</Subheading>
      <View>
        <Button
          mode="outlined"
          onPress={() => {
            navigation.navigate("Login");
          }}
          style={{ marginBottom: 16, width: 200 }}
        >
          Login
        </Button>
        <Button
          mode="outlined"
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          Register
        </Button>
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
    // fontWeight: "400",
    // textTransform: "uppercase",
    fontSize: 24,
  },
  titleIcon: {
    marginTop: 8,
  },
});

export default WelcomeView;
