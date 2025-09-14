// src/components/OnboardingScreen/ProgressBar.js
import React, { useMemo, useRef, useEffect } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';

/**
 * Animated ProgressBar for onboarding
 * props:
 *  - current: number (1-based)
 *  - total: number
 *  - height?: number
 *  - trackColor?: string
 *  - barColor?: string
 *  - style?: ViewStyle
 */
export default function ProgressBar({
                                      current = 1,
                                      total = 3,
                                      height = 6,
                                      trackColor = 'rgba(255,255,255,0.25)',
                                      barColor = '#FFFFFF',
                                      style,
                                    }) {
  const clamped = useMemo(() => {
    if (!total || total <= 0) return 0;
    const v = Math.max(0, Math.min(current, total));
    return v / total;
  }, [current, total]);

  // Keep the animated value between 0..1
  const progress = useRef(new Animated.Value(clamped)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: clamped,
      duration: 350,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false, // width animation needs layout
    }).start();
  }, [clamped, progress]);

  const widthInterpolate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
      <View style={[styles.wrap, style]}>
        <View style={[styles.track, { backgroundColor: trackColor, height }]}>
          <Animated.View
              style={[styles.bar, { backgroundColor: barColor, height, width: widthInterpolate }]}
          />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  track: {
    width: '100%',
    borderRadius: 999,
    overflow: 'hidden',
  },
  bar: {
    borderRadius: 999,
  },
});
