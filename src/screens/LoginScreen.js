import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.center}>
        <Text style={styles.title}>로그인</Text>
        <Text style={styles.caption}>간단히 데모용 네비게이션만 구성했어요.</Text>

        <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation.replace('Home')}>
          <Text style={styles.btnTextPrimary}>로그인하고 홈으로</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnGhost} onPress={() => navigation.replace('Splash')}>
          <Text style={styles.btnTextGhost}>스플래시로 돌아가기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  title: { fontSize: 28, fontWeight: '800' },
  caption: { marginTop: 8, color: '#6b7280' },
  btnPrimary: {
    marginTop: 24,
    backgroundColor: '#111827',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  btnTextPrimary: { color: '#fff', fontWeight: '700' },
  btnGhost: {
    marginTop: 12,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  btnTextGhost: { color: '#111827', fontWeight: '700' },
});
