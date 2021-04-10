import React from "react";
import { HelperText, TextInput } from "react-native-paper";

function FormTextInput({ formik, field, icon, ...props }) {
  const hasError = formik.touched[field] === true && formik.errors[field];
  return (
    <>
      <TextInput
        left={<TextInput.Icon name={icon} />}
        error={hasError}
        value={formik.values[field]}
        onBlur={formik.handleBlur(field)}
        onChangeText={formik.handleChange(field)}
        {...props}
      />
      <HelperText type="error" visible={hasError}>
        {formik.errors[field]}
      </HelperText>
    </>
  );
}

export default FormTextInput;
