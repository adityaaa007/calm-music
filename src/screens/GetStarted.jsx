import { View, Text, Image } from "react-native";
import { StatusBar } from "react-native";
import colors from "../constants/colors.js";
import React from "react";
import { MotiView } from "moti";
import Button from "../components/Button.jsx";

const GetStarted = ({ navigation }) => {
  return (
    <View className="flex flex-1 p-4 bg-bg">
      <MotiView
        className="flex flex-1"
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "timing" }}
      >
        <StatusBar
          barStyle={"light-content"}
          backgroundColor={colors.bg}
        ></StatusBar>
        <Image
          source={require("../assets/cover-image.jpg")}
          className={"w-full object-cover h-[60%] rounded-2xl"}
        ></Image>
        <Text
          style={{ fontFamily: "ClashDisplay-Medium" }}
          className="text-white text-3xl my-8 mx-2"
        >
          Customize your calm
        </Text>
        <Text
          style={{ fontFamily: "Helvetica" }}
          className="text-neutral-300 text-base mx-2"
        >
          Tailor your meditation experience to your personal needs, choosing
          from a variety of focused themes.
        </Text>
        <Button
          onClickHandler={() => {
            navigation.navigate("Home");
          }}
          bgColor={"bg-purple-600"}
          textColor={"text-white"}
          text={"Start"}
        ></Button>
      </MotiView>
    </View>
  );
};

export default GetStarted;
