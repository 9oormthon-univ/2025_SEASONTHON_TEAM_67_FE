// src/screens/BookmarkScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Bookmark from '../components/BookmarkScreen/Bookmark';

export default function BookmarkScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const items =
    route.params?.items ?? [
      { id: '1', title: '의무지출 5년간 100조… 재정 건전성에 부담돼요', date: '2025.08.20', tag: '#법 제정' },
      { id: '2', title: '반도체 투자 세액공제 연장돼요', date: '2025.08.19', tag: '#산업정책' },
      { id: '3', title: '도시철도 환승 할인 제도 개선돼요', date: '2025.08.18', tag: '#교통' },
      { id: '4', title: '청년 주거 지원 예산 늘었어요', date: '2025.08.17', tag: '#주거' },
      { id: '5', title: '전기차 충전소 확대돼요', date: '2025.08.16', tag: '#환경' },
    ];

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ImageBackground
        source={require('../assets/images/Common/background.png')}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />

      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

        {/* 상단 바: 뒤로가기 + 제목 */}
        <View style={s.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={s.backBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Image
              source={require('../assets/images/Common/arrow.png')}
              style={s.backIcon}
            />
          </TouchableOpacity>

          {/* 중앙 타이틀 */}
          <Text style={s.title}>저장한 뉴스</Text>

          {/* 오른쪽 공간 맞추기 */}
          <View style={{ width: 32 }} />
        </View>

        {/* 리스트 */}
        <Bookmark items={items} />
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  header: {
    height: 52,
    marginBottom: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // 좌우 균형
  },
  backBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
  },
});
