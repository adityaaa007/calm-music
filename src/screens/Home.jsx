import { Text, View, StatusBar, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react-native";
import GenreCard from "../components/GenreCard";
import { MotiView } from "moti";
import databaseService from "../services/databaseService";
import LoaderKit from "react-native-loader-kit";
import colors from "../constants/colors.js";

const Home = ({ navigation }) => {
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    (async () => {
      const genres = await databaseService.getGenres();
      genres && setGenreList(genres);
    })();
  }, []);

  const audioFiles = [
    {
      id: "Forest sounds",
      url: require("../assets/forest-sounds.wav"),
      title: "Forest sounds",
      artist: "Aditya",
    },
    {
      id: "Ocean Waves",
      url: require("../assets/ocean-sounds.wav"),
      title: "Ocean Waves",
      artist: "Aditya",
    },
  ];

  return (
    <View className="flex bg-bg flex-1 p-4">
      <MotiView
        className="flex flex-1"
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "timing", duration: 500 }}
      >
        <StatusBar
          barStyle={"light-content"}
          backgroundColor={colors.bg}
        ></StatusBar>
        <Image source={require('../assets/calm-music-app-icon-transparent.png')} className={'w-12 h-12 self-center'}></Image>
        <View className="flex flex-row gap-2 mt-4 mx-2 items-center">
          <Text
            style={{ fontFamily: "ClashDisplay-Medium" }}
            className="text-white text-3xl"
          >
            Pick your type
          </Text>
          <Eye color="white" size={24}></Eye>
        </View>

        {genreList.length == 0 ? (
          <View className="flex-1 flex justify-center items-center">
            <LoaderKit
              style={{ width: 100, height: 100 }}
              name={"BallScaleMultiple"}
              color={colors.primary}
            />
          </View>
        ) : (
          <FlatList
            renderItem={({ item }) => (
              <GenreCard
                data={item}
                navigation={navigation}
                audioFiles={audioFiles}
                genreList={genreList}
              ></GenreCard>
            )}
            numColumns={2}
            data={genreList}
            keyExtractor={(item) => item.title}
            className="mt-4"
          ></FlatList>
        )}

        {/* <Image height={100} width={100} source={{ uri: "" }}></Image> */}
      </MotiView>
    </View>
  );
};

export default Home;
