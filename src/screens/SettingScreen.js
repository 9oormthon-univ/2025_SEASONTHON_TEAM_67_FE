import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function SettingScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.header}>
        <Text style={styles.title}>Setting</Text>
        <Text style={styles.caption}>알림, 테마 같은 설정을 여기에 둘 수 있어요 (데모)</Text>
      </View>

      <View style={styles.btns}>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.btnText}>Home으로</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline} onPress={() => navigation.navigate('Bookmark')}>
          <Text style={styles.btnOutlineText}>Bookmark으로</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline} onPress={() => navigation.navigate('Card')}>
          <Text style={styles.btnOutlineText}>Card으로</Text>
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
  btnOutline: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnOutlineText: { color: '#111827', fontWeight: '700' },
});
