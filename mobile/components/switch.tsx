import React, { useEffect } from "react";
import { Pressable, StyleSheet, SwitchProps } from "react-native";
import Animated, { interpolateColor as interpolateColors, withSpring as spring, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

const defaultTrackColor = {
  true: "#2075f3",
  false: "#daedff"
}
const RNSwitch = ({ value, trackColor = defaultTrackColor, thumbColor = "#FFF", disabled, onValueChange: handleOnPress }: SwitchProps) => {
  const {
    true: activeTrackColor,
    false: inActiveTrackColor
  } = trackColor;
  const switchTranslate = useSharedValue(0);
  const circleAnimationStyle = {
    backgroundColor: thumbColor,
    transform: [
      {
        translateX: switchTranslate,
      },
    ],
  }
  const style = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColors(
        switchTranslate.value,
        [0, 22],
        [inActiveTrackColor.toString(), activeTrackColor.toString()]
      ),
    }
  });
  const memoizedOnSwitchPressCallback = React.useCallback(() => {
    handleOnPress(!value);
  }, [handleOnPress, value]);

  useEffect(() => {
    if (value === true) {
      switchTranslate.value = spring(
        21,
        {
          mass: 1,
          damping: 15,
          stiffness: 120,
          overshootClamping: false,
          restSpeedThreshold: 0.001,
          restDisplacementThreshold: 0.001,
        }
      );
    } else {
      switchTranslate.value = spring(
        0,
        {
          mass: 1,
          damping: 15,
          stiffness: 120,
          overshootClamping: false,
          restSpeedThreshold: 0.001,
          restDisplacementThreshold: 0.001,
        }
      );
    }
  }, [value, switchTranslate]);

  return (
    <Pressable
      onPress={memoizedOnSwitchPressCallback}
      disabled={disabled}
    >
      <Animated.View
        style={[styles.containerStyle, style]}
      >
        <Animated.View style={[styles.circleStyle, circleAnimationStyle, styles.shadowValue]} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  circleStyle: {
    width: 24,
    height: 24,
    borderRadius: 24,
  },
  containerStyle: {
    width: 50,
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 36.5,
  },
  shadowValue: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});

export default RNSwitch;