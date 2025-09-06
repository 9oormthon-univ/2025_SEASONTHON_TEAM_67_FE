import React, { useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
} from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      //navigation.replace('LoginScreen'); // 2초 뒤 로그인 화면으로 이동
      navigation.replace('CardScreen'); // 2초 뒤 로그인 화면으로 이동
    }, 2000);

    return () => clearTimeout(timer); // cleanup
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../assets/images/SplashScreen/background.png')}
      style={s.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={s.wrap}>
        <StatusBar barStyle="light-content" />
        <Text style={s.title}>OHNEW</Text>
        <Text style={s.subtitle}>뉴스를 보는 새로운 방법</Text>
      </SafeAreaView>
    </ImageBackground>
  );
}

const s = StyleSheet.create({
  bg: { flex: 1 },
  wrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: '#E1F738',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#52525B',
  },
});
