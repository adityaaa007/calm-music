import { View, Text, StatusBar, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Video } from "expo-av";
import { Play, SkipBack, SkipForward, Pause } from "lucide-react-native";
import colors from "../constants/colors";
import LinearGradient from "react-native-linear-gradient";
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
  State,
} from "react-native-track-player";
import { setupPlayer, addTracks } from "../services/audioService.js";
import storageService from "../services/storageService.js";

const Player = ({ navigation, route }) => {
  const videoRef = useRef(null);

  const [imageUrl, setImageUrl] = useState(route.params.imageUrl);
  const [title, setTitle] = useState(route.params.title);
  const [videoUrl, setVideoUrl] = useState("");
  const [playerInit, setPlayerInit] = useState(false);

  const { initialTrack, genreList } = route.params;
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);

  const [imageList, setImageList] = useState([]);
  const [audioList, setAudioList] = useState([]);
  const [videoList, setVideoList] = useState([]);

  const [playing, setPlaying] = useState(false);

  // for toggling play button
  const togglePlaying = async () => {
    const currentState = await TrackPlayer.getState();

    if (currentState === State.Playing) {
      await TrackPlayer.pause();
      setPlaying(false);
    } else {
      await TrackPlayer.play();
      setPlaying(true);
    }
  };

  // loading all the data in lists
  useEffect(() => {
    if (imageList.length === 0) {
      const list = genreList.map((genre) =>
        storageService.getImage({ fileId: genre.imageUrl })
      );
      setImageList(list);
    }

    if (videoList.length === 0) {
      const list = genreList.map((genre) =>
        storageService.getVideo({ fileId: genre.videoUrl })
      );
      setVideoList(list);
    }

    if (audioList.length === 0) {
      const list = genreList.map((genre) => ({
        id: genre.title,
        url: storageService.getAudio({ fileId: genre.audioUrl }),
        title: genre.title,
        artist: "Aditya",
      }));
      console.log("list: " + JSON.stringify(list));
      setAudioList(list);
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (
        currentTrackIndex !== null &&
        playerInit &&
        videoList.length > 0 &&
        videoUrl == ""
      ) {
        setVideoUrl(videoList[currentTrackIndex]);

        await TrackPlayer.skip(currentTrackIndex);
        await TrackPlayer.play();

        setPlaying(true);
      }
    })();
  }, [currentTrackIndex, videoList, playerInit]);

  useEffect(() => {
    (async () => {
      if (audioList.length > 0) {
        const isSetup = await setupPlayer();

        // const queue = await TrackPlayer.getQueue();
        if (isSetup) {
          await addTracks(audioList);
          setCurrentTrackIndex(
            audioList.findIndex((file) => file.id === initialTrack)
          );

          setPlayerInit(true);

          console.log("imageList: " + JSON.stringify(imageList));
        }
      }
    })();
  }, [audioList]);

  useTrackPlayerEvents(
    [
      Event.PlaybackQueueEnded,
      Event.PlaybackState,
      Event.PlaybackActiveTrackChanged,
    ],
    async (event) => {
      if (event.type === Event.PlaybackQueueEnded && event.position === 0) {
        await TrackPlayer.stop();
        setPlaying(false);
      }

      if (event.type === Event.PlaybackState) {
        const currentState = await TrackPlayer.getState();
        setPlaying(currentState === State.Playing);
      }

      if (event.type === Event.PlaybackActiveTrackChanged) {
        console.log("track changed");

        // id of active track
        const currentTrackId = await TrackPlayer.getActiveTrack().then(
          (track) => track.id
        );
        const currentIndex = audioList.findIndex(
          (file) => file.id === currentTrackId
        );

        setCurrentTrackIndex(currentIndex);
        setImageUrl(String(imageList[currentIndex]));
        setVideoUrl(videoList[currentIndex]);
        setTitle(
          await TrackPlayer.getActiveTrack().then((track) => track.title)
        );
      }
    }
  );

  const skipToNext = async () => {
    const nextTrackIndex = (currentTrackIndex + 1) % audioList.length;
    await TrackPlayer.skip(nextTrackIndex);

    if (!playing) {
      await TrackPlayer.play();
      setPlaying(true);
    }

    // setCurrentTrackIndex(nextTrackIndex);
    // setImageUrl(String(imageList[nextTrackIndex]));
    // setVideoUrl(videoList[nextTrackIndex]);
    // setTitle(await TrackPlayer.getActiveTrack().then((track) => track.title));
  };

  const skipToPrevious = async () => {
    const previousTrackIndex =
      (currentTrackIndex - 1 + audioList.length) % audioList.length;
    await TrackPlayer.skip(previousTrackIndex);

    if (!playing) {
      await TrackPlayer.play();
      setPlaying(true);
    }

    // setCurrentTrackIndex(previousTrackIndex);
    // setImageUrl(String(imageList[previousTrackIndex]));
    // setVideoUrl(videoList[previousTrackIndex]);
    // setTitle(await TrackPlayer.getActiveTrack().then((track) => track.title));
  };

  return (
    <View className="bg-bg flex flex-1 justify-center items-center">
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
      ></StatusBar>
      {/* background video */}
      <Video
        ref={videoRef}
        source={{ uri: videoUrl }} // Replace with your video URL
        style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
        resizeMode="cover"
        shouldPlay
        isLooping
        isMuted={true} // Ensure the video is muted
        onError={(e) => console.log("Video Error:", e)}
      />
      {/* translucent film */}
      <View className="h-full w-full absolute right-0 top-0 bg-black/60"></View>

      <Text
        style={{ fontFamily: "ClashDisplay" }}
        className="text-white text-3xl mb-8"
      >
        {title}
      </Text>

      <Image
        source={{ uri: imageUrl }}
        className={"object-cover h-64 w-64 rounded-2xl"}
      ></Image>

      {/* controls */}
      <View className="flex flex-row items-center absolute bottom-8 self-center">
        {/* previous button */}
        <TouchableOpacity className="p-2" onPress={skipToPrevious}>
          <SkipBack color={"white"} size={20}></SkipBack>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={togglePlaying}
          className="p-8 rounded-full flex justify-center items-center"
        >
          <LinearGradient
            colors={[colors.gradientStart, colors.gradientEnd]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="w-16 h-16 rounded-full"
          />
          <Play
            color={"white"}
            size={20}
            fill={"white"}
            className={`absolute ${playing && "hidden"}`}
          ></Play>
          <Pause
            color={"white"}
            size={20}
            fill={"white"}
            className={`absolute ${!playing && "hidden"}`}
          ></Pause>
        </TouchableOpacity>

        {/* next button */}
        <TouchableOpacity className="p-2" onPress={skipToNext}>
          <SkipForward color={"white"} size={20}></SkipForward>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Player;
