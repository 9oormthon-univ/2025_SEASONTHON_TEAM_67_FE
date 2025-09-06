// src/screens/HomeScreen.js
import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ImageBackground,
  Platform,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Cardnews from '../components/HomeScreen/Cardnews';

export default function HomeScreen({ navigation, onPressCard }) {
  const nav = useNavigation();

  // 데모 뉴스 데이터 (10개)
  const cards = [
    { id: '1',  title: '의무지출 5년간 100조… 재정 건전성에 부담돼요',
      summary: '지난 5년 동안 한국 정부의 의무지출이 약 100조 원 늘었어요. 법이나 제도로 정해져 자동 집행되다 보니 구조적으로 바꾸기 쉽지 않아요.',
      tag: '#법 제정' },
    { id: '2',  title: '반도체 투자 세액공제 연장돼요',
      summary: '정부가 반도체 산업 경쟁력을 높이려고 세액공제를 일정 기간 연장했어요. 기업들의 투자 안정성이 커질 것으로 보여요.',
      tag: '#산업정책' },
    { id: '3',  title: '도시철도 환승 할인 제도 개선돼요',
      summary: '지역 간 환승 시 불편했던 요금 정산 절차가 간소화돼요. 이용자 편의성과 이동 비용 절감 효과가 기대돼요.',
      tag: '#교통' },
    { id: '4',  title: '청년 주거 지원 예산 늘었어요',
      summary: '정부가 청년층의 주거 부담을 줄이기 위해 월세 지원과 공공임대 물량을 늘렸어요.',
      tag: '#주거' },
    { id: '5',  title: '전기차 충전소 확대돼요',
      summary: '환경부가 올해 안에 전국 주요 고속도로 휴게소에 급속 충전기를 추가 설치하기로 했어요.',
      tag: '#환경' },
    { id: '6',  title: '소상공인 카드 수수료 지원 연장돼요',
      summary: '정부가 코로나19 이후 시행된 소상공인 카드 수수료 경감 지원을 내년까지 연장한다고 했어요.',
      tag: '#경제' },
    { id: '7',  title: '의료 인력 확충 계획 발표됐어요',
      summary: '보건복지부가 지방 의료 공백 해소를 위해 의대 정원을 늘리는 방안을 검토하고 있어요.',
      tag: '#보건' },
    { id: '8',  title: '초등학교 방과후 프로그램 다양해져요',
      summary: '교육부가 맞벌이 가정을 위해 방과후 돌봄과 예체능 프로그램을 확대 지원하기로 했어요.',
      tag: '#교육' },
    { id: '9',  title: '공공 데이터 무료 개방 늘려요',
      summary: '행정안전부가 기업과 연구자들이 활용할 수 있도록 교통, 환경 데이터를 새로 공개했어요.',
      tag: '#데이터' },
    { id: '10', title: '대중교통 마스크 착용 의무 해제돼요',
      summary: '방역 당국이 최근 안정세를 고려해 버스, 지하철 등에서 마스크 착용 의무를 해제했어요.',
      tag: '#방역' },
  ];

  // Safe area 기반 높이 계산
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();
  const safeHeight = frame.height - insets.top - insets.bottom;
  const newsStyle = useMemo(
    () => ({ width: '100%', height: Platform.OS === 'ios' ? safeHeight : safeHeight }),
    [safeHeight]
  );

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }} edges={['top','bottom']}>
        <ImageBackground
          source={require('../assets/images/Common/background.png')}
          resizeMode="cover"
          style={{ flex: 1 }}
        >
          <StatusBar barStyle="light-content" />

          <View style={[s.body, newsStyle]}>
            {/* 상단 버튼 */}
            <View style={s.topBar}>
              <TouchableOpacity onPress={() => nav.navigate('BookmarkScreen')} style={s.topBtn}>
                <Image source={require('../assets/images/HomeScreen/Icon_Bookmark.png')} style={s.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => nav.navigate('SettingScreen')} style={[s.topBtn, { marginLeft: 16 }]}>
                <Image source={require('../assets/images/HomeScreen/Icon_Settings.png')} style={s.icon} />
              </TouchableOpacity>
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
        </ImageBackground>
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  body: { flex: 1 },
  topBar: {
    position: 'absolute',
    top: 8,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
    elevation: 10, // Android 터치 우선 보장
  },
  topBtn: { padding: 4 },
  icon: { width: 32, height: 32, resizeMode: 'contain' },

  centerArea: { flex: 1, justifyContent: 'center' },
  headerBlock: { alignItems: 'center' },
  avatarImg: { width: 84, height: 84, borderRadius: 42, marginBottom: 10 },
  helloTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 12,
    lineHeight: 26,
  },

  bottomHint: { marginTop: 'auto', alignItems: 'center', justifyContent: 'center', paddingVertical: 16 },
  arrow: { width: 36, height: 36, marginBottom: 20, resizeMode: 'contain' },
  hintText: { fontSize: 20, fontWeight: '800', color: '#111827', textAlign: 'center', lineHeight: 24 },
});
