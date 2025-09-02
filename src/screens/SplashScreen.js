import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function SplashScreen({ navigation }) {
  // 1.5초 뒤 자동으로 Login으로 이동 (원하면 주석 처리)
  useEffect(() => {
    const t = setTimeout(() => navigation.replace('Login'), 1500);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.center}>
        <Text style={styles.logo}>OHNEW</Text>
        <Text style={styles.sub}>오늘의 뉴스, 새롭게 만나요</Text>

        <TouchableOpacity style={styles.btn} onPress={() => navigation.replace('Login')}>
          <Text style={styles.btnText}>바로 시작하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#ffffff' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  logo: { fontSize: 36, fontWeight: '800', letterSpacing: 1 },
  sub: { marginTop: 8, fontSize: 14, color: '#666' },
  btn: {
    marginTop: 24,
    backgroundColor: '#111827',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  btnText: { color: '#fff', fontWeight: '700' },
});
