import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "react-native-linear-gradient";
import storageService from "../services/storageService";

export default function GenreCard({ data, navigation, audioFiles, genreList }) {
  const [imageUrl, setImageUrl] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const list = [];

  useEffect(() => {
    const imgUrl = storageService.getImage({ fileId: data.imageUrl });
    imgUrl && setImageUrl(String(imgUrl));
    console.log(imgUrl);

    const icoUrl = storageService.getImage({ fileId: data.iconUrl });
    icoUrl && setIconUrl(String(icoUrl));
  }, []);

  return (
    <TouchableOpacity
      className={`flex rounded-xl w-[45%] m-[2.5%]`}
      onPress={() => {
        navigation.navigate("Player", {
          imageUrl,
          title: data.title,
          initialTrack: data.title,
          audioFiles,
          genreList,
        });
      }}
    >
      <Image
        source={{ uri: imageUrl }}
        className={"w-full object-cover h-48 rounded-xl"}
      ></Image>
      <LinearGradient
        colors={["rgba(0, 0, 0, 0.9)", "transparent"]}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0.5 }}
        className="absolute bottom-0 h-60 z-2 w-full rounded-xl"
      />
      <View className="flex absolute bottom-4 left-2">
        <View className="flex flex-row gap-2">
          <Text
            className="text-sm"
            style={{ fontFamily: "Helvetica", color: data.color }}
          >
            {data.title}
          </Text>
          <Image
            source={{ uri: iconUrl }}
            className={"w-3 h-3"}
            style={{ tintColor: data.color }}
          ></Image>
        </View>
        <Text
          className="text-xs text-neutral-300 pr-4"
          style={{ fontFamily: "Helvetica" }}
        >
          {data.content}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
