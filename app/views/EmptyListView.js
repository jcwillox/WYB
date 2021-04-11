import React from "react";
import { StyleSheet, View } from "react-native";
import { Caption } from "react-native-paper";
import { SimpleLineIcons } from "@expo/vector-icons";
import LightTheme from "../config/theme";

function EmptyListView() {
  return (
    <View style={styles.container}>
      <SimpleLineIcons
        name="ghost"
        size={72}
        color={LightTheme.colors.mediumGrey}
      />
      <Caption>Empty Category</Caption>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    flexGrow: 1,
  },
});

export default EmptyListView;
