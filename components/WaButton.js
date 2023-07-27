import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";

export default function WaButton({
  displayBtnTitle,
  onPress = () => {},
  ...props
}) {
  return (
    <>
      <TouchableOpacity
        {...props}
        onPress={onPress}
        style={styles.btnContainer}
      >
        <Text style={styles.btnText}>{displayBtnTitle}</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: COLORS.black,
    padding: SIZES.padding,
    borderRadius: SIZES.radius / 4,
  },
  btnText: {
    color: COLORS.white,
    alignSelf: "center",
    ...FONTS.body3,
  },
});
