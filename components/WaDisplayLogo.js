import { View, Image } from "react-native";
import React from "react";
import { SIZES, images } from "../constants";

export default function WaDisplayLogo() {
  return (
    <>
      <View
        style={{
          height: 100,
          justifyContent: "center",
          alignItems: "center",
          marginTop: SIZES.padding * 5,
        }}
      >
        <Image
          source={images.wallie_logo}
          resizeMode="contain"
          style={{ width: SIZES.width * 0.6 }}
        />
      </View>
    </>
  );
}
