import React from "react";
import { HelperText, TextInput } from "react-native-paper";

function FormTextInput({ formik, field, icon, ...props }) {
  const hasError = formik.touched[field] === true && formik.errors[field];
  return (
    <>
      <TextInput
        left={icon && <TextInput.Icon name={icon} />}
        error={hasError}
        value={formik.values[field]}
        onBlur={formik.handleBlur(field)}
        onChangeText={formik.handleChange(field)}
        {...props}
      />
      {hasError && <HelperText type="error">{formik.errors[field]}</HelperText>}
    </>
  );
}

export default FormTextInput;
