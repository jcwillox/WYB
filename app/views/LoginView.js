import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import * as Yup from "yup";
import { Formik } from "formik";
import DataStore from "../config/DataStore";
import FormTextInput from "../components/FormTextInput";

const schema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).max(56).label("Password"),
});

function LoginView({ navigation }) {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={schema}
        onSubmit={(values) => {
          if (!DataStore.users.login(values)) {
            alert("Invalid username/password!");
          }
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          handleBlur,
          touched,
        }) => (
          <>
            <FormTextInput
              label="Email"
              mode="outlined"
              keyboardType="email-address"
              textContentType="emailAddress"
              icon="email-outline"
              field="email"
              formik={{ values, errors, touched, handleBlur, handleChange }}
            />
            <FormTextInput
              label="Password"
              mode="outlined"
              secureTextEntry
              textContentType="password"
              icon="key-outline"
              field="password"
              formik={{ values, errors, touched, handleBlur, handleChange }}
            />
            <View style={styles.button}>
              <Button mode="contained" onPress={handleSubmit}>
                Login
              </Button>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    paddingHorizontal: 8,
    paddingBottom: 8,
    paddingTop: 2,
  },
  button: {
    flexGrow: 1,
    marginTop: 8,
    justifyContent: "flex-end",
  },
});

export default LoginView;
