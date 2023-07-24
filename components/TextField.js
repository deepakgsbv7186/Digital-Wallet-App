import { View, Text, TextInput, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import MIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";

export default function TextField({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  onBlur,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.textInputContainer,
          isFocused
            ? {
                borderColor: error ? COLORS.red : COLORS.lightGreen,
                borderWidth: 1,
              }
            : {
                borderBottomColor: COLORS.lightGreen,
                borderBottomWidth: 1,
              },
        ]}
      >
        <MIcons
          name={iconName}
          style={[
            styles.textInputIcon,
            { color: error ? COLORS.red : COLORS.white },
          ]}
        />
        <TextInput
          {...props}
          secureTextEntry={hidePassword}
          style={styles.textInputStyle}
          placeholderTextColor={COLORS.white}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            onBlur();
            setIsFocused(false);
          }}
        />
        {password && (
          <MIcons
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            onPress={() => setHidePassword(!hidePassword)}
            style={[
              styles.passwordEye,
              { color: error ? COLORS.red : COLORS.white },
            ]}
          />
        )}
      </View>
      {error && <Text style={styles.errorStyle}>{error}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    color: COLORS.lightGreen,
    ...FONTS.body4,
    marginVertical: SIZES.padding,
  },
  textInputContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.transparent,
    // borderWidth: 2,
    alignItems: "center",
    borderRadius: SIZES.radius / 4,
  },
  textInputIcon: {
    fontSize: SIZES.h2 * 1.2,
    paddingHorizontal: SIZES.padding,
    borderRightWidth: 1,
    borderRightColor: COLORS.white,
  },
  textInputStyle: {
    flex: 1,
    marginVertical: SIZES.padding / 2,
    paddingHorizontal: SIZES.padding,
    height: 40,
    maxWidth: SIZES.width * 0.72,
    color: COLORS.white,
    ...FONTS.body3,
  },
  passwordEye: {
    fontSize: SIZES.h3,
    paddingRight: SIZES.padding,
  },
  errorStyle: {
    color: COLORS.red,
    ...FONTS.body5,
    marginTop: SIZES.padding / 4,
  },
});
