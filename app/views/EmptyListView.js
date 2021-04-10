import React from "react";
import { StyleSheet, View } from "react-native";
import { Caption, Colors } from "react-native-paper";
import { SimpleLineIcons } from "@expo/vector-icons";

function EmptyListView(props) {
  return (
    <View style={styles.container}>
      <SimpleLineIcons name="ghost" size={72} color={Colors.grey400} />
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
