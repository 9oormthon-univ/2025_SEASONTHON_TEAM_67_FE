// src/screens/SettingScreen.js
import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image,
  ImageBackground, StatusBar, Linking,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SettingScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const onPressEmail = () => Linking.openURL('mailto:team@ohnew.app');
  const onPressGit = () => Linking.openURL('https://github.com/9oormthon-univ/2025_SEASONTHON_TEAM_67_FE');

  return (
    <ImageBackground
      source={require('../assets/images/Common/background.png')}
      style={s.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={s.wrap} edges={['top','bottom']}>
        <StatusBar barStyle="light-content" />

        {/* 🔙 뒤로가기: 노치만큼 아래로 */}
        <TouchableOpacity
          style={[s.backBtn, { top: insets.top + 8 }]}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Image source={require('../assets/images/Common/arrow.png')} style={s.backIcon} />
        </TouchableOpacity>

        {/* 본문 */}
        <View style={s.container}>
          {/* 프로필 */}
          <Image
            source={require('../assets/images/HomeScreen/Icon_gbnam.jpg')}
            style={s.avatar}
          />

          {/* 이름 + 연필 */}
          <View style={s.nameRow}>
            <Text style={s.name}>기범</Text>
            <Image
              source={require('../assets/images/SettingScreen/Icon_Pencil.png')}
              style={s.pencil}
            />
          </View>

          {/* 메뉴: 가운데 정렬 */}
          <View style={s.menu}>
            <TouchableOpacity style={s.menuItem}><Text style={s.menuText}>계정관리</Text></TouchableOpacity>
            <TouchableOpacity style={s.menuItem}><Text style={s.menuText}>로그아웃</Text></TouchableOpacity>
            <TouchableOpacity style={s.menuItem}><Text style={s.menuText}>이용약관</Text></TouchableOpacity>
          </View>

          {/* 하단 정보 */}
          <View style={s.footer}>
            <Text style={s.meta1}>9oomthon-univ</Text>
            <Text style={s.meta2}>SEASONTHON_TEAM_67</Text>
            <Text style={s.teamLabel}>team</Text>
            <Text style={s.teamName}>OHNEW</Text>

            <View style={s.iconRow}>
              <TouchableOpacity onPress={onPressEmail} activeOpacity={0.7}>
                <Image source={require('../assets/images/SettingScreen/Icon_Email.png')} style={s.footerIcon} />
              </TouchableOpacity>
              <View style={{ width: 40 }} />
              <TouchableOpacity onPress={onPressGit} activeOpacity={0.7}>
                <Image source={require('../assets/images/SettingScreen/Icon_git.png')} style={s.footerIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const s = StyleSheet.create({
  bg: { flex: 1 },
  wrap: { flex: 1 },

  backBtn: {
    position: 'absolute',
    left: 14,
    zIndex: 10,
    padding: 6,
  },
  backIcon: { width: 22, height: 22, resizeMode: 'contain' },

  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 32,
    paddingHorizontal: 20,
  },

  avatar: { width: 96, height: 96, borderRadius: 48, marginTop: 82, marginBottom: 12 },

  nameRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  name: { fontSize: 22, fontWeight: '800', color: '#111827' },
  pencil: { width: 18, height: 18, resizeMode: 'contain', marginLeft: 6, tintColor: '#111827' },

  menu: { width: '100%', alignItems: 'center', gap: 14, marginTop: 50, marginBottom: 24 },
  menuItem: { paddingVertical: 8, paddingHorizontal: 12 },
  menuText: { fontSize: 16, color: '#6B7280', fontWeight: '700', textAlign: 'center' },

  footer: { marginTop: 'auto', alignItems: 'center', paddingBottom: 10 },
  meta1: { fontSize: 14, color: '#111827', marginBottom: 2 },
  meta2: { fontSize: 16, color: '#111827', marginBottom: 30, fontWeight: '700' },
  teamLabel: { fontSize: 14, color: '#111827', marginBottom: -2 },
  teamName: { fontSize: 32, color: '#111827', fontWeight: '900', marginBottom: 30, letterSpacing: 0.5 },

  iconRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  footerIcon: { width: 34, height: 34, resizeMode: 'contain', tintColor: '#111827', marginBottom: 30 },
});
