import React, { useState } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import theme from "../themes/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function AppTextInput({ icon, error, ...props }) {
  const [hasFocus, setFocused] = useState();
  return (
    <View style={styles.outerContainer}>
      <View
        style={[
          styles.container,
          hasFocus && styles.focusedStyle,
          error && { color: "red", borderColor: "red" },
        ]}
      >
        {icon && (
          <MaterialCommunityIcons name={icon} size={24} style={[styles.icon]} />
        )}
        <TextInput
          style={[styles.textInput, icon && { paddingLeft: 0 }]}
          onBlur={() => setFocused(false)}
          onFocus={() => setFocused(true)}
          placeholderTextColor={error && "red"}
          {...props}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

if (Platform.OS === "web") {
  var webStyles = {
    outlineWidth: 0,
  };
}

const styles = StyleSheet.create({
  outerContainer: {
    marginBottom: 16,
    alignSelf: "stretch",
  },
  container: {
    borderRadius: 8,
    borderColor: theme.backgroundDark,
    color: theme.backgroundDark,
    borderWidth: 1,
    alignSelf: "stretch",
    padding: 1,
    flexDirection: "row",
    alignItems: "center",
    lineHeight: 1.6,
  },
  focusedStyle: {
    borderColor: theme.accent,
    color: theme.accent,
    borderWidth: 2,
    padding: 0,
  },
  textInput: {
    padding: 16,
    alignSelf: "stretch",
    flexGrow: 1,
    fontSize: 16,
    lineHeight: 1.6,
    ...webStyles,
  },
  icon: {
    // color: "",
    marginLeft: 12,
    marginRight: 8,
  },
  error: {
    color: "red",
    fontSize: 12,
  },
});

export default AppTextInput;
