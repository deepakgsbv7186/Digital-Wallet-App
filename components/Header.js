import { View, Text, TouchableOpacity, Image } from "react-native";
import { COLORS, FONTS, SIZES, icons } from "../constants";
import { useNavigation } from "@react-navigation/native";

export default function Header({ backTo, headerName, ...props }) {
  const pointsTo = useNavigation();
  // props.icon to populate icon for third element
  // props.moveTo to navigate from third element
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: SIZES.padding * 3,
          marginHorizontal: SIZES.padding * 2,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            pointsTo.navigate(`${backTo}`);
          }}
        >
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{ width: 20, height: 20, tintColor: COLORS.white }}
          />
        </TouchableOpacity>
        <View>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h3,
            }}
          >
            {headerName}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log("Settings Clicked");
            pointsTo.navigate(`${props.moveTo}`);
          }}
        >
          {props.moveTo && (
            <Image
              source={props.icon}
              resizeMode="contain"
              style={{ width: 20, height: 20, tintColor: COLORS.white }}
            />
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}
