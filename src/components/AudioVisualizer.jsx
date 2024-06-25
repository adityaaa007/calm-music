import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AudioVisualizer = () => {
  const circles = [useSharedValue(0), useSharedValue(0), useSharedValue(0)];

  useEffect(() => {
    circles.forEach((circle, index) => {
      circle.value = withRepeat(
        withTiming(1, {
          duration: 3000 + index * 1000,
          easing: Easing.linear,
        }),
        -1,
        false
      );
    });
  }, []);

  const animatedProps = circles.map((circle) =>
    useAnimatedProps(() => ({
      r: interpolate(circle.value, [0, 1], [0, width / 2]),
      opacity: interpolate(circle.value, [0, 1], [1, 0]),
    }))
  );

  return (
    <View style={styles.container}>
      <Svg height={height} width={width}>
        {animatedProps.map((props, index) => (
          <AnimatedCircle
            key={index}
            cx={width / 2}
            cy={height / 2}
            stroke="blue"
            strokeWidth="2"
            fill="none"
            animatedProps={props}
          />
        ))}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});

export default AudioVisualizer;
