import React from "react";
import { Image, StyleSheet, useWindowDimensions, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Divider, HelperText, TouchableRipple } from "react-native-paper";
import LightTheme from "../config/theme";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";

function FormImageField({ formik, field }) {
  const hasError = formik.touched[field] === true && formik.errors[field];
  const windowWidth = useWindowDimensions().width;
  const value = formik.values[field];

  const updateImage = async () => {
    formik.setFieldTouched(field);

    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access photos is required to add a picture!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      formik.setFieldValue(field, { uri: result.uri });
    }
  };

  return (
    <>
      <TouchableRipple onPress={updateImage}>
        {value ? (
          <Image
            style={[styles.image, { width: windowWidth }]}
            source={value}
          />
        ) : (
          <View style={[styles.image, { width: windowWidth }]}>
            <MaterialCommunityIcon
              name="image-plus"
              size={72}
              color={LightTheme.colors.mediumGrey}
            />
          </View>
        )}
      </TouchableRipple>
      <Divider />
      {hasError && <HelperText type="error">{formik.errors[field]}</HelperText>}
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: LightTheme.colors.background,
  },
});

export default FormImageField;
