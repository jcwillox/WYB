import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { Formik } from "formik";
import DataStore from "../config/DataStore";
import * as Yup from "yup";
import FormTextInput from "../components/FormTextInput";
import LightTheme from "../config/theme";

const schema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  name: Yup.string().required().label("Name"),
  password: Yup.string().required().min(4).max(56).label("Password"),
  confirmPassword: Yup.string()
    .required()
    .min(4)
    .max(56)
    .test("passwords-match", "Passwords do not match", function (value) {
      return this.parent.password === value;
    })
    .label("Confirm Password"),
});

function RegisterView() {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          email: "",
          name: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          if (DataStore.users.fromEmail(values.email)) {
            alert("A user with this email already exists!");
            return;
          }
          DataStore.users.add(values);
          DataStore.users.login(values);
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
              label="Name"
              mode="outlined"
              keyboardType="email-address"
              textContentType="emailAddress"
              icon="account-circle-outline"
              field="name"
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
            <FormTextInput
              label="Confirm Password"
              mode="outlined"
              secureTextEntry
              textContentType="password"
              icon="key-outline"
              field="confirmPassword"
              formik={{ values, errors, touched, handleBlur, handleChange }}
            />
            <View style={styles.button}>
              <Button mode="contained" onPress={handleSubmit}>
                Register
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
    backgroundColor: LightTheme.colors.surface,
  },
  button: {
    flexGrow: 1,
    marginTop: 8,
    justifyContent: "flex-end",
  },
});

export default RegisterView;
