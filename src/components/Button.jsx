import { TouchableOpacity, Text } from "react-native";
import React from "react";

export default function Button({ bgColor, textColor, text, onClickHandler }) {
  return (
    <TouchableOpacity
      onPress={onClickHandler}
      className={`${bgColor} rounded-md flex items-center justify-center py-3 absolute w-full bottom-0`}
    >
      <Text
        style={{ fontFamily: "Helvetica" }}
        className={`text-white text-base`}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
