import React, { useEffect, useRef } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Animated,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import KakaologinButton from '../components/SplashScreen/KakaologinButton';

export default function SplashScreen() {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    const t = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,        // 0.5초 페이드인
        useNativeDriver: true,
      }).start();
    }, 2000);                 // 2초 대기 후 시작
    return () => clearTimeout(t);
  }, [fadeAnim]);

  return (
    <ImageBackground
      source={require('../assets/images/SplashScreen/background.png')}
      style={s.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={s.wrap}>
        <StatusBar barStyle="light-content" />

        {/* 중앙 타이틀 */}
        <View style={s.center}>
          <Text style={s.title}>OHNEW</Text>
          <Text style={s.subtitle}>뉴스를 보는 새로운 방법</Text>
        </View>

        {/* 하단 카카오 로그인 버튼 */}
        <Animated.View
          style={[
            s.bottomWrap,
            {
              opacity: fadeAnim,
              bottom: Math.max(insets.bottom, 16) + 36, // SafeArea 하단 보정
            },
          ]}
        >
          <KakaologinButton
            onPress={() => {
              navigation.replace('CardScreen'); // ✅ 버튼 누르면 홈화면 이동
            }}
          />
        </Animated.View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const s = StyleSheet.create({
  bg: { flex: 1 },
  wrap: { flex: 1 },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: '#E1F738',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  bottomWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
