// src/screens/HomeScreen.js
import React, { useMemo } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, StatusBar,
  ImageBackground, Platform, StyleSheet as RNStyleSheet
} from 'react-native';
import {
  SafeAreaView, useSafeAreaFrame, useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Cardnews from '../components/HomeScreen/Cardnews';

export default function HomeScreen({ onPressCard }) {
  const nav = useNavigation();

  const cards = [
    { id: '1',  title: '의무지출 5년간 100조… 재정 건전성에 부담돼요',
      summary: '지난 5년 동안 한국 정부의 의무지출이 약 100조 원 늘었어요. 법이나 제도로 정해져 자동 집행되다 보니 구조적으로 바꾸기 쉽지 않아요.',
      tag: '#법 제정' },
    { id: '2',  title: '반도체 투자 세액공제 연장돼요',
      summary: '정부가 반도체 산업 경쟁력을 높이려고 세액공제를 일정 기간 연장했어요. 기업들의 투자 안정성이 커질 것으로 보여요.',
      tag: '#산업정책' },
    // ... 생략 (나머지 카드들 동일)
  ];

  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();
  const safeHeight = frame.height - insets.top - insets.bottom;
  const newsStyle = useMemo(
    () => ({ width: '100%', height: safeHeight }),
    [safeHeight]
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {/* ✅ 배경 전체 */}
      <ImageBackground
        source={require('../assets/images/HomeScreen/background.png')}
        style={RNStyleSheet.absoluteFillObject}
        resizeMode="cover"
      />

      <SafeAreaView style={{ flex: 1 }} edges={['top','bottom']}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

        <View style={[s.body, newsStyle]}>
          {/* 상단 바: 왼쪽 로고 + 오른쪽 버튼 */}
          <View style={s.topBar}>
            {/* 왼쪽 로고 */}
            <Image
              source={require('../assets/images/Common/Icon_logo.png')}
              style={s.logo}
            />

            {/* 오른쪽 버튼 그룹 */}
            <View style={s.rightBtns}>
              <TouchableOpacity onPress={() => nav.navigate('BookmarkScreen')} style={s.topBtn}>
                <Image source={require('../assets/images/HomeScreen/Icon_Bookmark.png')} style={s.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => nav.navigate('SettingScreen')} style={[s.topBtn, { marginLeft: 16 }]}>
                <Image source={require('../assets/images/HomeScreen/Icon_Settings.png')} style={s.icon} />
              </TouchableOpacity>
            </View>
          </View>

          {/* 중앙 영역 */}
          <View style={s.centerArea}>
            <View style={s.headerBlock}>
              <Image source={require('../assets/images/HomeScreen/Icon_gbnam.jpg')} style={s.avatarImg} />
              <Text style={s.helloTitle}>
                기범님 반가워요 👋🏻{'\n'}
                오늘 준비 된 뉴스가 {cards.length}개 있어요
              </Text>
            </View>

            <View style={{ height: 12 }} />

            <Cardnews
              data={cards}
              onPressItem={(item) => {
                if (onPressCard) onPressCard(item.id);
                else nav.navigate('CardScreen', { itemId: item.id });
              }}
            />
          </View>

          {/* 하단 안내 */}
          <View style={s.bottomHint}>
            <Image source={require('../assets/images/HomeScreen/Icon_Arrow.png')} style={s.arrow} />
            <Text style={s.hintText}>위로 스와이프해서 {'\n'}오늘의 뉴스 돌아보기</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  body: { flex: 1 },

  topBar: {
    position: 'absolute',
    top: 8,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // 좌: 로고 / 우: 버튼
    zIndex: 10,
    elevation: 10,
  },
  logo: {
    width: 120,
    resizeMode: 'contain',
  },
  rightBtns: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBtn: { padding: 4 },
  icon: { width: 28, height: 28, resizeMode: 'contain' },

  centerArea: { flex: 1, justifyContent: 'center' },
  headerBlock: { alignItems: 'center' },
  avatarImg: { width: 84, height: 84, borderRadius: 42, marginBottom: 10 },
  helloTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 12,
    lineHeight: 26,
  },

  bottomHint: { marginTop: 'auto', alignItems: 'center', justifyContent: 'center', paddingVertical: 16 },
  arrow: { width: 36, height: 36, marginBottom: 20, resizeMode: 'contain' },
  hintText: { fontSize: 20, fontWeight: '800', color: '#fff', textAlign: 'center', lineHeight: 24 },
});
