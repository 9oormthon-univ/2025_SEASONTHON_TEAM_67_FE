// src/screens/SplashScreen.js
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getStoredAccessToken } from '../services/apiClient'; // ✅ 토큰 불러오기

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getStoredAccessToken(); // ✅ 로컬 저장소에서 JWT 확인
        if (token) {
          navigation.replace('CardScreen'); // 토큰 있으면 뉴스화면으로
        } else {
          navigation.replace('LoginScreen'); // 없으면 로그인으로
        }
      } catch (e) {
        navigation.replace('LoginScreen'); // 오류 시 로그인으로
      }
    };

    const t = setTimeout(checkAuth, 1500); // 1.5초 후 실행
    return () => clearTimeout(t);
  }, [navigation]);

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
          <Text style={s.title}>OH!NEW</Text>
          <Text style={s.subtitle}>더 쉽게 접하는 오늘의 뉴스</Text>
        </View>
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
});
