import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { TextField, WaButton, WaDisplayLogo } from "../components";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

// Main function
export default function Login() {
  // main function return
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <LinearGradient
        style={{ flex: 1 }}
        colors={[COLORS.lime, COLORS.emerald]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <WaDisplayLogo />
          <WaLoginForm />
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

// Validation Schema
const loginSchema = Yup.object({
  email: Yup.string()
    .trim()
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email.")
    .required("Email is required."),
  password: Yup.string()
    .trim()
    .min(8, "Minimum 8 character required.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Weak password."
    )
    .required("Password is required."),
});
// Login Form
const WaLoginForm = () => {
  const pointsTo = useNavigation();
  const headText = "{ Happy to see you again 🥳 }";
  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
  });
  console.log(userInputs);
  return (
    <>
      <View style={styles.formContaier}>
        <Text style={styles.formHeading}>{headText}</Text>
        {/* Form Starts */}
        <Formik
          initialValues={userInputs}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              setUserInputs(values);
              setSubmitting(false);
              resetForm();
              pointsTo.navigate("HomeTabs");
            }, 3000);
          }}
        >
          {({
            values,
            touched,
            errors,
            setFieldTouched,
            handleChange,
            handleSubmit,
            isSubmitting,
            isValid,
          }) => {
            const { email, password } = values;
            return (
              <>
                {/* Email Input */}
                <TextField
                  value={email}
                  onChangeText={handleChange("email")}
                  onBlur={() => setFieldTouched("email")}
                  label={"Email ID"}
                  placeholder={"Enter Email"}
                  iconName={"email-outline"}
                  error={touched.email && errors.email}
                />
                {/* Password Input */}
                <TextField
                  password
                  value={password}
                  onChangeText={handleChange("password")}
                  onBlur={() => setFieldTouched("password")}
                  label={"Password"}
                  placeholder={"Enter Password"}
                  iconName={"lock-outline"}
                  error={touched.password && errors.password}
                />

                {/* login button */}
                <View style={{ marginTop: SIZES.padding * 4 }}>
                  <WaButton
                    displayBtnTitle={
                      isSubmitting ? (
                        <ActivityIndicator size={"small"} />
                      ) : (
                        "Login"
                      )
                    }
                    onPress={handleSubmit}
                    disabled={!isValid || isSubmitting}
                  />
                </View>
              </>
            );
          }}
        </Formik>
        {/* Form Ends */}
        {/* or */}
        <View style={styles.orContainer}>
          <Text style={{ textAlign: "center", marginTop: 5 }}>OR</Text>
        </View>
        {/* create new account button */}
        <View style={{ marginTop: SIZES.padding }}>
          <WaButton
            displayBtnTitle={"Create New Account"}
            onPress={() => pointsTo.navigate("SignUp")}
          />
        </View>
        {/* Button Section Ends */}
      </View>
    </>
  );
};

// Login Page Style
const styles = StyleSheet.create({
  formContaier: {
    marginTop: SIZES.padding * 3,
    marginHorizontal: SIZES.padding * 3,
  },
  formHeading: {
    color: COLORS.white,
    ...FONTS.h2,
    alignSelf: "center",
    marginVertical: SIZES.padding * 2,
  },
  orContainer: {
    marginTop: SIZES.padding * 3,
    borderTopColor: COLORS.white,
    borderTopWidth: 1,
  },
});
