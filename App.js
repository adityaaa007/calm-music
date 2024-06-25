import React, { useCallback } from "react";
import GetStarted from "./src/screens/GetStarted.jsx";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import  Home from './src/screens/Home.jsx'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Player from "./src/screens/Player.jsx";
import TrackPlayer from 'react-native-track-player';

// Initializing TrackPlayer
TrackPlayer.setupPlayer().then(async () => {
    // The player is ready to be used
});


export default function App() {
  const Stack = createNativeStackNavigator();

  const [fontsLoaded, fontError] = useFonts({
    "ClashDisplay-Bold": require("./src/assets/ClashDisplay-Bold.otf"),
    ClashDisplay: require("./src/assets/ClashDisplay-Regular.otf"),
    "ClashDisplay-Light": require("./src/assets/ClashDisplay-Light.otf"),
    "ClashDisplay-Medium": require("./src/assets/ClashDisplay-Medium.otf"),
    "ClashDisplay-SemiBold": require("./src/assets/ClashDisplay-Semibold.otf"),
    "Helvetica-Bold": require("./src/assets/helvetica-bold.ttf"),
    Helvetica: require("./src/assets/helvetica.ttf"),
    "Helvetica-Light": require("./src/assets/helvetica-light.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="GetStarted"
          component={GetStarted}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Player" component={Player} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}
