import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { COLORS, FONTS, SIZES } from "../constants";
import { useNavigation } from "@react-navigation/native";

const LoginSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "Minimum two letters.")
    .matches(
      /^(?!.*(\w)\1\1)[\w\d]+$/,
      "No letter repeat more than two times please..."
    )
    .matches(/^[A-Za-z]{2,40}$/, "Only alphabets allowed.")
    .required("First name is required."),
  lastName: Yup.string()
    .min(2, "Minimum two letters.")
    .matches(
      /^(?!.*(\w)\1\1)[\w\d]+$/,
      "No letter repeat more than two times please..."
    )
    .matches(/^[A-Za-z]{2,40}$/, "Only alphabets allowed.")
    .required("Last name is required."),
});

export default function FormikTest() {
  const pointsTo = useNavigation();
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    console.log("Kam kar raha hai? ", userInfo);
  }, [userInfo]);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>FormikTest</Text>
        <Formik
          initialValues={userInfo}
          validationSchema={LoginSchema}
          onSubmit={(values, { setSubmitting }) => {
            setIsLoading(true);
            setTimeout(() => {
              console.log(values);
              setUserInfo(values);
              setIsLoading(false);
              setSubmitting(false);
              pointsTo.navigate("Login");
            }, 3000);
          }}
        >
          {({
            values,
            touched,
            errors,
            handleSubmit,
            handleChange,
            handleBlur,
            isValid,
          }) => {
            const { firstName, lastName } = values;
            return (
              <>
                <View style={styles.formInputContainer}>
                  <TextInput
                    value={firstName}
                    onChangeText={(text) =>
                      handleChange("firstName")(text.replace(/[^a-zA-Z]/g, ""))
                    }
                    onBlur={handleBlur("firstName")}
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect={false}
                    style={styles.formInput}
                    placeholder="Enter First Name"
                  />
                  {touched.firstName && errors.firstName && (
                    <Text style={styles.errorShown}>{errors.firstName}</Text>
                  )}
                </View>
                <View style={styles.formInputContainer}>
                  <TextInput
                    value={lastName}
                    onChangeText={(text) =>
                      handleChange("lastName")(text.replace(/[^a-zA-Z]/g, ""))
                    }
                    onBlur={handleBlur("lastName")}
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect={false}
                    style={styles.formInput}
                    placeholder="Enter Last Name"
                  />
                  {touched.lastName && errors.lastName && (
                    <Text style={styles.errorShown}>{errors.lastName}</Text>
                  )}
                </View>

                <Pressable
                  style={[styles.submitBtn, !isValid && { opacity: 0.4 }]}
                  onPress={handleSubmit}
                  disabled={!isValid || isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator size={"small"} />
                  ) : (
                    <Text style={styles.submitBtnTitle}>Submit</Text>
                  )}
                </Pressable>
              </>
            );
          }}
        </Formik>
      </View>
      <View style={styles.outputContainer}>
        <Text style={styles.outputText}>
          {userInfo.firstName + " " + userInfo.lastName}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 60,
    justifyContent: "center",
    width: SIZES.width * 0.6,
    alignSelf: "center",
  },
  formTitle: {
    color: COLORS.purple,
    ...FONTS.h2,
    textAlign: "center",
  },
  formInputContainer: {
    marginVertical: SIZES.padding,
  },
  formInput: {
    backgroundColor: COLORS.gray,
    borderRadius: SIZES.radius / 4,
    paddingLeft: SIZES.padding,
  },
  errorShown: {
    color: COLORS.red,
    ...FONTS.body5,
    marginTop: SIZES.padding / 6,
    lineHeight: 15,
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    padding: SIZES.padding / 2,
    borderRadius: SIZES.radius / 4,
  },
  submitBtnTitle: {
    color: COLORS.white,
    ...FONTS.body4,
    textAlign: "center",
  },
  outputContainer: {
    flex: 40,
    backgroundColor: COLORS.purple,
    alignItems: "center",
    justifyContent: "center",
  },
  outputText: {
    color: COLORS.white,
    ...FONTS.largeTitle,
    flexWrap: "wrap",
    width: SIZES.width * 0.9,
    textAlign: "center",
  },
});
