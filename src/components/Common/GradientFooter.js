import React, { useRef, useEffect } from 'react';
import { StyleSheet, Animated, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientFooter = ({ isHome }) => {
  const animatedValue = useRef(new Animated.Value(isHome ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isHome ? 1 : 0,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [isHome, animatedValue]);

  // 두 개의 Animated.View + LinearGradient를 겹치고 opacity로 cross-fade
  const homeOpacity = animatedValue;
  const normalOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <View style={s.footer}>
      <Animated.View
        style={[StyleSheet.absoluteFill, { opacity: normalOpacity }]}
        pointerEvents="none"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(22,22,22,0.5)']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
      </Animated.View>
      <Animated.View
        style={[StyleSheet.absoluteFill, { opacity: homeOpacity }]}
        pointerEvents="none"
      >
        <LinearGradient
          colors={['rgba(186,227,252,0.0)', 'rgba(83, 172, 227, 0.5)']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
      </Animated.View>
    </View>
  );
};

const s = StyleSheet.create({
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
  },
});

export default GradientFooter;