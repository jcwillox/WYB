import React from "react";
import { Button, StyleSheet, View } from "react-native";

function AppButton(props) {
  return (
    <View style={styles.container}>
      <Button></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AppButton;
