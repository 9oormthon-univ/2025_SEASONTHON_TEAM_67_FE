import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
        <Text style={styles.caption}>아래 3개 버튼으로 이동해요.</Text>
      </View>

      <View style={styles.btns}>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Card')}>
          <Text style={styles.btnText}>Card 화면으로</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Bookmark')}>
          <Text style={styles.btnText}>Bookmark 화면으로</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Setting')}>
          <Text style={styles.btnText}>Setting 화면으로</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.btnGhost} onPress={() => navigation.replace('Login')}>
          <Text style={styles.btnGhostText}>로그아웃 (Login으로)</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
  header: { paddingTop: 24, paddingBottom: 12 },
  title: { fontSize: 28, fontWeight: '800' },
  caption: { color: '#6b7280', marginTop: 6 },
  btns: { flex: 1, justifyContent: 'center', gap: 12 },
  btn: {
    backgroundColor: '#111827',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: '700' },
  footer: { paddingVertical: 24 },
  btnGhost: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnGhostText: { color: '#111827', fontWeight: '700' },
});
