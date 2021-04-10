import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function IconButton({ icon, size, accent, color, onPress }) {
  return (
    <TouchableHighlight
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.5}
    >
      <MaterialCommunityIcons
        name={icon}
        size={size}
        style={[{ color, backgroundColor: accent }, styles.button]}
      ></MaterialCommunityIcons>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    // borderRadius: "50%",
    overflow: "hidden",
  },
  button: {
    padding: 4,
  },
});

export default IconButton;
