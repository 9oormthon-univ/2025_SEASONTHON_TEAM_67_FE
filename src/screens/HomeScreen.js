import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image,
  StatusBar, ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cardnews from '../components/HomeScreen/Cardnews';

export default function HomeScreen({ navigation }) {
  // 데모 뉴스 데이터 (10개)
  const cards = [
    {
      id: '1',
      title: '의무지출 5년간 100조… 재정 건전성에 부담돼요',
      summary: '지난 5년 동안 한국 정부의 의무지출이 약 100조 원 늘었어요. 법이나 제도로 정해져 자동 집행되다 보니 구조적으로 바꾸기 쉽지 않아요.',
      tag: '#법 제정',
    },
    {
      id: '2',
      title: '반도체 투자 세액공제 연장돼요',
      summary: '정부가 반도체 산업 경쟁력을 높이려고 세액공제를 일정 기간 연장했어요. 기업들의 투자 안정성이 커질 것으로 보여요.',
      tag: '#산업정책',
    },
  ];

  return (
    <ImageBackground
      source={require('../assets/images/Common/background.png')}
      style={s.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }} edges={['top','bottom']}>
        <StatusBar barStyle="light-content" />

        <View style={s.body}>

          {/* ▶ 상단 버튼: 오른쪽 상단 고정 */}
          <View style={s.topBar}>
            <TouchableOpacity onPress={() => navigation.navigate('BookmarkScreen')} style={s.topBtn}>
              <Image source={require('../assets/images/HomeScreen/Icon_Bookmark.png')} style={s.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SettingScreen')} style={[s.topBtn, { marginLeft: 16 }]}>
              <Image source={require('../assets/images/HomeScreen/Icon_Settings.png')} style={s.icon} />
            </TouchableOpacity>
          </View>

          {/* ▶ 화면 중앙 블록: 프로필/텍스트 + Cardnews */}
          <View style={s.centerArea}>
            {/* 프로필 & 인사 */}
            <View style={s.headerBlock}>
              <Image
                source={require('../assets/images/HomeScreen/Icon_gbnam.jpg')}
                style={s.avatarImg}
              />
              <Text style={s.helloTitle}>
                기범님 반가워요 👋🏻{'\n'}
                오늘 준비 된 뉴스가 {cards.length}개 있어요
              </Text>
            </View>

            {/* 간격 */}
            <View style={{ height: 12 }} />

            {/* Cardnews */}
            <Cardnews
              data={cards}
              onPressItem={(item) => navigation.navigate('CardScreen', { item })}
            />
          </View>

          {/* ▶ 하단 안내 */}
          <View style={s.bottomHint}>
            <Image
              source={require('../assets/images/HomeScreen/Icon_Arrow.png')}
              style={s.arrow}
            />
            <Text style={s.hintText}>위로 스와이프해서 {'\n'}오늘의 뉴스 돌아보기</Text>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const s = StyleSheet.create({
  bg: { flex: 1 },
  body: { flex: 1 },

  topBar: {
    position: 'absolute',
    top: 8,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  topBtn: { padding: 4 },
  icon: { width: 32, height: 32, resizeMode: 'contain' },

  centerArea: {
    flex: 1,
    justifyContent: 'center',
  },
  headerBlock: {
    alignItems: 'center',
  },
  avatarImg: {
    width: 84, height: 84, borderRadius: 42,
    marginBottom: 10,
  },
  helloTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
    marginTop: 12,     // ✅ 상단 여백
    marginBottom: 12,  // ✅ 하단 여백
    lineHeight: 26,    // 줄 간격 넉넉히
  },

  bottomHint: {
    marginTop: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  arrow: {
    width: 36, height: 36,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  hintText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
    lineHeight: 24,
  },
});
