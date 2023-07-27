import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES, icons } from "../constants";
import { useNavigation } from "@react-navigation/native";

export default function Header({ backTo, headerName, ...props }) {
  const pointsTo = useNavigation();
  // props.icon to populate icon for third element
  // props.moveTo to navigate from third element
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            pointsTo.navigate(`${backTo}`);
          }}
        >
          <Image
            source={icons.back}
            resizeMode="contain"
            style={styles.iconStyle}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerStyle}>{headerName}</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            pointsTo.navigate(`${backTo}`);
          }}
        >
          <Image
            source={icons.close}
            resizeMode="contain"
            style={styles.iconStyle}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: SIZES.padding * 3,
    marginHorizontal: SIZES.padding * 2,
  },
  iconStyle: { width: 20, height: 20, tintColor: COLORS.white },
  headerStyle: {
    color: COLORS.white,
    ...FONTS.h3,
    textAlign: "center",
  },
});
