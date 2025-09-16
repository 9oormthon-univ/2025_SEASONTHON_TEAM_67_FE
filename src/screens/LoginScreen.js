// src/screens/LoginScreen.js
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  StatusBar,
  View,
  Text,
  Alert,
} from 'react-native';
import KakaologinButton from '../components/LoginScreen/KakaologinButton';
import { kakaoSdkLogin } from '../services/auth/kakaoauth';
import { postKakaoLogin } from '../services/apiClient';

export default function LoginScreen({ navigation }) {
  const handleKakaoLogin = async () => {
    try {
      // 1) 카카오 SDK 로그인 (카카오톡 → 계정 로그인 fallback)
      const kakaoAccessToken = await kakaoSdkLogin();
      if (!kakaoAccessToken) throw new Error('카카오 로그인 실패');

      // 2) 서버에 카카오 accessToken 전달 → 우리 서비스 토큰 발급 (auth: 'none' to avoid Authorization header)
      const result = await postKakaoLogin(kakaoAccessToken, { auth: 'none' });

      console.log('✅ 로그인 성공:', result);

      // 3) 로그인 성공 시 온보딩/홈 화면으로 이동
      navigation.replace('OnboardingScreen');
    } catch (e) {
      console.error('❌ 로그인 실패:', e);
      Alert.alert('로그인 실패', e.message || '다시 시도해주세요.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/SplashScreen/background.png')}
      style={s.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={s.wrap}>
        <StatusBar barStyle="light-content" />

        <View style={s.center}>
          <Text style={s.brandTitle}>OH!NEW</Text>
          <Text style={s.brandSub}>더 쉽게 접하는 오늘의 뉴스</Text>
        </View>

        {/* 카카오 로그인 버튼 */}
        <KakaologinButton onPress={handleKakaoLogin} />
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
  brandTitle: {
    fontSize: 40,
    fontWeight: '900',
    color: '#E1F738',
    marginBottom: 8,
  },
  brandSub: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 24,
  },
});
