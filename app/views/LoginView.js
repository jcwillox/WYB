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
        initialValues={{ email: "1@b.c", password: "1234" }} // email: "1@b.c", password: "1234"
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          if (!DataStore.users.login(values)) {
            alert("Invalid username/password!");
          }
          // if(validateUser(values)){
          //     resetForm();
          //     createUser(values);
          //     navigation.navigate("Home", {
          //             screen: "Home",
          //             params:{
          //                 screen:"Home",
          //                 params:{
          //                     paramEmail: values.email,
          //                     paramName: getUser(values).name,
          //                     paramImage: getUser(values).image,
          //                 },
          //             }
          //         }
          //         );
          // }
          // else{
          //     resetForm();
          //     alert("Invalid Login Details")
          // }
          console.log("Submit", values);
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
              label="Password"
              mode="outlined"
              secureTextEntry
              textContentType="password"
              icon="key-outline"
              field="password"
              formik={{ values, errors, touched, handleBlur, handleChange }}
            />
            <Button
              mode="outlined"
              onPress={handleSubmit}
              // disabled={Object.keys(errors).length !== 0}
            >
              Login
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
    // alignSelf: "stretch",
    // justifyContent: "center",
    padding: 16,
  },
});

export default LoginView;
