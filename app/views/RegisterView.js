import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Formik } from "formik";
import DataStore from "../config/DataStore";
import * as Yup from "yup";
import FormTextInput from "../components/FormTextInput";

const schema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  name: Yup.string().required().label("Name"),
  password: Yup.string().required().min(4).max(56).label("Password"),
  confirmPassword: Yup.string().required().min(4).max(56).label("Password"),
});

function RegisterView({ navigation }) {
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
        onSubmit={(values, { ResetForm }) => {
          // TODO check email is unique
          DataStore.users.add(values);
          DataStore.users.login(values);
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          setFieldValue,
          handleReset,
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
            <Button
              mode="outlined"
              onPress={handleSubmit}
              // disabled={Object.keys(errors).length !== 0}
            >
              Register
            </Button>
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
    // justifyContent: "center",
    padding: 16,
  },
});

export default RegisterView;
