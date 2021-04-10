import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import LightTheme from "../themes/theme";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";

function StarGroup({ editable, initialRating, size, style }) {
  const [rating, setRating] = useState(initialRating);
  return (
    <View style={[styles.container, style]}>
      {[1, 2, 3, 4, 5].map((value) => (
        <Pressable
          onPress={editable && (() => setRating(value))}
          key={value.toString()}
        >
          <MaterialCommunityIcon
            name={value <= rating ? "star" : "star-outline"}
            color={LightTheme.colors.stars}
            size={size || 16}
          />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    // alignItems: "space-around",
    // justifyContent: "space-around",
  },
});

export default StarGroup;
