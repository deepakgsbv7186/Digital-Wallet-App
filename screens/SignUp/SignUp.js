import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { COLORS, FONTS, SIZES, icons, images } from "../../constants";
import LinearGradient from "react-native-linear-gradient";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Header, TextField, WaButton } from "../../components";
import { Formik } from "formik";
import * as Yup from "yup";

export default function SignUp() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <LinearGradient
        style={{ flex: 1 }}
        colors={[COLORS.lime, COLORS.emerald]}
      >
        <Header backTo={"Login"} headerName={"Getting Onboard"} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <SignForm />
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

// Validation Schema
const signupSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .matches(/^[a-zA-Z]{2,20}$/, "Accept only letters.")
    .required("Required"),
  lastName: Yup.string()
    .trim()
    .matches(/^[a-zA-Z]{2,20}$/, "Accept only letters.")
    .required("Required"),
  email: Yup.string()
    .trim()
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email.")
    .required("Email is required."),
  phone: Yup.string().trim().required("Required"),
  password: Yup.string()
    .trim()
    .min(8, "Minimum 8 characters required.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Weak password."
    )
    .required("Password is required."),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

// Sign Up Form
const SignForm = () => {
  const pointsTo = useNavigation();
  const [areas, setAreas] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [userSignupInfo, setUserSignupInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  console.log(userSignupInfo);
  useEffect(() => {
    const URL = "https://restcountries.com/v3.1/all";
    const getCountryData = async () => {
      try {
        const response = await axios.get(URL);

        let countryData = response.data.map((country) => {
          return {
            countryCode: country?.cca2,
            countryName: country?.name?.common,
            callingCode: `${country?.idd?.root}${country?.idd?.suffixes}`,
            countryFlag: country?.flags?.png,
          };
        });
        setAreas(countryData);
      } catch (error) {
        console.log("No country data:", error);
      }
    };
    getCountryData();
  }, []);
  // Modal Country Selection
  const RenderCountryOptions = () => {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{ padding: SIZES.padding, flexDirection: "row" }}
          onPress={() => {
            setSelectedCountry(item);
            setModalVisible(false);
          }}
        >
          <Image
            source={{ uri: item.countryFlag }}
            style={{
              width: 30,
              height: 30,
              marginRight: 10,
            }}
          />
          <Text style={{ ...FONTS.body4, color: COLORS.black }}>
            {item.countryName}
          </Text>
        </TouchableOpacity>
      );
    };
    return (
      <>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0,0,0,0.6)",
              }}
            >
              <View
                style={{
                  height: 400,
                  width: SIZES.width * 0.8,
                  backgroundColor: COLORS.lightGreen,
                  borderRadius: SIZES.radius,
                }}
              >
                <FlatList
                  data={areas}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.countryCode}
                  showsVerticalScrollIndicator={false}
                  style={{
                    padding: SIZES.padding * 2,
                    marginBottom: SIZES.padding * 2,
                  }}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </>
    );
  };
  const headText = "{Glad to have you 🌈}";
  return (
    <>
      <View style={styles.formContaier}>
        <Text style={styles.formHeading}>{headText}</Text>
        <Formik
          initialValues={userSignupInfo}
          validationSchema={signupSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              setUserSignupInfo(values);
              setSubmitting(false);
              resetForm();
              pointsTo.navigate("Login");
            }, 3000);
          }}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            isSubmitting,
            setFieldTouched,
            handleSubmit,
            isValid,
          }) => {
            const {
              firstName,
              lastName,
              email,
              phone,
              password,
              confirmPassword,
            } = values;
            return (
              <>
                <TextField
                  value={firstName}
                  label={"First Name"}
                  placeholder={"Enter First Name"}
                  iconName={"account-settings-outline"}
                  onChangeText={handleChange("firstName")}
                  onBlur={() => setFieldTouched("firstName")}
                  error={touched.firstName && errors.firstName}
                />
                <TextField
                  value={lastName}
                  label={"Last Name"}
                  placeholder={"Enter Last Name"}
                  iconName={"account-settings-outline"}
                  onChangeText={handleChange("lastName")}
                  onBlur={() => setFieldTouched("lastName")}
                  error={touched.lastName && errors.lastName}
                />
                <TextField
                  value={email}
                  onChangeText={handleChange("email")}
                  onBlur={() => setFieldTouched("email")}
                  label={"Email ID"}
                  placeholder={"Enter Email"}
                  iconName={"email-outline"}
                  error={touched.email && errors.email}
                />
                <View style={{ marginTop: SIZES.padding * 2 }}>
                  <Text style={{ color: COLORS.lightGreen, ...FONTS.body4 }}>
                    Phone Number
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(true);
                      }}
                      style={styles.phoneCode}
                    >
                      <View style={{ justifyContent: "center" }}>
                        <Image
                          source={icons.down}
                          style={{
                            width: 10,
                            height: 10,
                            tintColor: COLORS.white,
                          }}
                        />
                      </View>
                      <View style={{ justifyContent: "center" }}>
                        <Image
                          source={{
                            uri: selectedCountry
                              ? selectedCountry.countryFlag
                              : "https://flagcdn.com/w320/in.png",
                          }}
                          resizeMode="contain"
                          style={{ width: 30, height: 30 }}
                        />
                      </View>
                      <View style={{ justifyContent: "center" }}>
                        <Text style={{ color: COLORS.white, ...FONTS.body3 }}>
                          {selectedCountry
                            ? selectedCountry.callingCode
                            : "+91"}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TextInput
                      style={styles.phoneInput}
                      value={phone}
                      placeholder="Enter Phone Number"
                      placeholderTextColor={COLORS.white}
                      selectionColor={COLORS.white}
                      iconName={"lock-outline"}
                      maxLength={10}
                      onChangeText={handleChange("phone")}
                      onBlur={() => setFieldTouched("phone")}
                      error={touched.phone && errors.phone}
                    />
                  </View>
                </View>
                <TextField
                  value={password}
                  password
                  label={"Password"}
                  placeholder={"Enter Password"}
                  iconName={"lock-outline"}
                  onChangeText={handleChange("password")}
                  onBlur={() => setFieldTouched("password")}
                  error={touched.password && errors.password}
                />
                <TextField
                  value={confirmPassword}
                  password
                  label={"Confirm Password"}
                  placeholder={"Enter Confirm Password"}
                  iconName={"lock-outline"}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={() => setFieldTouched("confirmPassword")}
                  error={touched.confirmPassword && errors.confirmPassword}
                />

                <View style={{ marginTop: SIZES.padding * 3 }}>
                  <WaButton
                    displayBtnTitle={
                      isSubmitting ? (
                        <ActivityIndicator size={"small"} />
                      ) : (
                        "Register Me"
                      )
                    }
                    onPress={handleSubmit}
                    disabled={!isValid || isSubmitting}
                  />
                </View>
                <View style={{ marginTop: SIZES.padding * 4 }}></View>
              </>
            );
          }}
        </Formik>
      </View>
      <RenderCountryOptions />
    </>
  );
};

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
  container: {
    marginTop: SIZES.padding * 3,
    marginHorizontal: SIZES.padding * 3,
  },
  phoneCode: {
    width: 100,
    height: 50,
    marginHorizontal: 5,
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    ...FONTS.body2,
  },
  phoneInput: {
    flex: 1,
    marginVertical: SIZES.padding,
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
    height: 40,
    color: COLORS.white,
    ...FONTS.body3,
  },
});
