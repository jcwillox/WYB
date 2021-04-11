import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import LightTheme from "../config/theme";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";

function StarGroup({ editable, rating, size, style, onRatingChange }) {
  const [internalRating, setRating] = useState();

  useEffect(() => {
    setRating(rating);
  }, [rating]);

  function handleRatingChange(value) {
    setRating(value);
    onRatingChange && onRatingChange(value);
  }

  return (
    <View style={[styles.container, style]}>
      {[1, 2, 3, 4, 5].map((value) => (
        <Pressable
          key={value.toString()}
          onPress={editable && (() => handleRatingChange(value))}
        >
          <MaterialCommunityIcon
            name={value <= internalRating ? "star" : "star-outline"}
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
  },
});

export default StarGroup;
