import React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';

export default function SettingScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/images/Common/background.png')}
      style={s.flexContainer}
      resizeMode="cover"
    >
      <SafeAreaView style={s.wrap}>
        <Text style={s.title}>SettingScreen</Text>
        <TouchableOpacity style={s.btn} onPress={() => navigation.goBack()}>
          <Text style={s.btnText}>뒤로</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}
const s = StyleSheet.create({
  flexContainer: { flex: 1 },
  wrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 24 },
  btn: {
    backgroundColor: '#111827',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  btnText: { color: '#fff', fontWeight: '700' },
});
