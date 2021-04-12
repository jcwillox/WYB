import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import DataStore from "../config/DataStore";
import FormTextInput from "../components/FormTextInput";
import { Button } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import LightTheme from "../config/theme";
import StarGroup from "../components/StarGroup";
import FormImageField from "../components/FormImageField";
import ChipGroup from "../components/ChipGroup";

const schema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  description: Yup.string().label("Description"),
  image: Yup.mixed().required().label("Image"),
  category: Yup.string().label("Category"),
  rating: Yup.number().required().label("Rating"),
});

function AddPlaceView({ route, navigation }) {
  const categories = DataStore.categories.all();
  const editMode = route.params && route.params.placeId;

  const emptyValues = {
    name: "",
    description: "",
    category: "",
    image: "",
    rating: 0,
  };
  const [initialValues, setInitialValues] = useState({ ...emptyValues });

  let placeId;
  useFocusEffect(
    useCallback(() => {
      // on focus check if a placeId was passed and
      // set initial form values using that place
      placeId = route.params && route.params.placeId;
      if (placeId) {
        setInitialValues(DataStore.places.fromUUID(placeId));
      }

      return () => {
        // reset form on un-focus only when in edit mode
        if (placeId) {
          route.params = null;
          setInitialValues({ ...emptyValues });
        }
      };
    }, [route.params])
  );

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        enableReinitialize
        onSubmit={(values, { resetForm }) => {
          DataStore.places.add(values);
          // when we're in edit mode the form is cleared on un-focus
          // in add mode we reset the form here
          if (!editMode) resetForm({ values: emptyValues });
          // return to the place tab to see updated listings
          navigation.navigate("Places");
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
          resetForm,
          errors,
          handleBlur,
          touched,
        }) => (
          <>
            <FormImageField
              field="image"
              formik={{
                values,
                errors,
                touched,
                setFieldValue,
                setFieldTouched,
              }}
            />
            <View style={styles.starGroup}>
              <StarGroup
                size={24}
                editable
                rating={values.rating}
                onRatingChange={(rating) => setFieldValue("rating", rating)}
              />
            </View>
            <View style={styles.chipGroup}>
              <ChipGroup
                items={categories}
                selected={new Set([values.category])}
                onSelectedChange={(selected) =>
                  setFieldValue("category", selected)
                }
              />
            </View>
            <View style={styles.formInner}>
              <FormTextInput
                label="Name"
                mode="outlined"
                textContentType="name"
                field="name"
                formik={{ values, errors, touched, handleBlur, handleChange }}
              />
              <FormTextInput
                label="Description"
                mode="outlined"
                field="description"
                numberOfLines={4}
                multiline
                formik={{ values, errors, touched, handleBlur, handleChange }}
              />

              <View style={styles.buttonGroup}>
                <Button
                  mode="outlined"
                  icon="plus-circle"
                  style={styles.buttonStyle}
                  onPress={handleSubmit}
                >
                  {editMode ? "Update" : "Add"}
                </Button>
                <Button
                  mode="outlined"
                  style={styles.buttonStyle}
                  icon={editMode ? "cancel" : "delete"}
                  color={LightTheme.colors.trash}
                  onPress={() => {
                    if (values.uuid) {
                      // the form will be cleared when this view is un-focused
                      navigation.navigate("Places");
                    } else {
                      resetForm();
                    }
                  }}
                >
                  {editMode ? "Cancel" : "Clear"}
                </Button>
              </View>
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
    backgroundColor: LightTheme.colors.surface,
  },
  formInner: {
    flexGrow: 1,
    marginHorizontal: 8,
  },
  starGroup: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 8,
    height: 24,
  },
  chipGroup: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  buttonGroup: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 8,
    // offset the outer margin for the buttons
    marginHorizontal: -4,
  },
  buttonStyle: {
    flexGrow: 1,
    marginHorizontal: 4,
  },
});

export default AddPlaceView;
