// src/screens/HomeScreen.js
import React, { useMemo, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ImageBackground,
  ActivityIndicator,
  StyleSheet as RNStyleSheet,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Cardnews from '../components/HomeScreen/Cardnews';
import { apiFetch } from '../components/Common/apiClient'; // ✅ 중앙 API 래퍼 사용
import GradientBg from '../components/Common/gradientBg';

export default function HomeScreen({ onPressCard }) {
  const nav = useNavigation();

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState('');

  // safe area 기반 높이
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();
  const safeHeight = frame.height - insets.top - insets.bottom;
  const newsStyle = useMemo(
    () => ({ width: '100%', height: safeHeight }),
    [safeHeight],
  );

  // ---- 데이터 로드 ----
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setErrMsg('');

        // ⛳️ 서버가 today는 POST를 기대한다면 이렇게 호출 (GET이면 method:'GET'로 바꿔도 됨)
        const { result } = await apiFetch('/api/news/today', { method: 'GET' });

        if (!alive) return;

        if (!Array.isArray(result)) {
          throw new Error(
            '서버 응답 형식이 올바르지 않습니다.(result 배열 아님)',
          );
        }

        const mapped = result.map(n => ({
          id: String(n.newsId),
          title: n.title ?? '',
          summary: n.summary ?? '',
          tag: Array.isArray(n.tags) && n.tags.length ? `#${n.tags[0]}` : '',
          originalUrl: n.originalUrl,
          originalPublishedAt: n.originalPublishedAt,
          scrapped: !!n.scrapped,
        }));

        setCards(mapped);
      } catch (e) {
        const msg = String(e?.message || '예기치 않은 오류');
        setErrMsg(msg);

        // 토큰 없음/만료 추정 시 로그인으로 유도 (필요 없으면 제거)
        if (msg.includes('401') || msg.includes('Unauthorized')) {
          nav.replace('LoginScreen');
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [nav]);

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {/* 배경 전체 */}
      {/* <ImageBackground
        source={require('../assets/images/Common/background.png')}
        style={RNStyleSheet.absoluteFillObject}
        resizeMode="cover"
      /> */}
      <GradientBg overlayOpacity={50}>
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="light-content"
          />

          <View style={[s.body, newsStyle]}>
            {/* 상단 바: 왼쪽 로고 + 오른쪽 버튼 */}
            <View style={s.topBar}>
              <Image
                source={require('../assets/images/Common/Icon_logo.png')}
                style={s.logo}
              />
              <View style={s.rightBtns}>
                <TouchableOpacity
                  onPress={() => nav.navigate('BookmarkScreen')}
                  style={s.topBtn}
                >
                  <Image
                    source={require('../assets/images/HomeScreen/Icon_Bookmark.png')}
                    style={s.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => nav.navigate('SettingScreen')}
                  style={[s.topBtn, { marginLeft: 16 }]}
                >
                  <Image
                    source={require('../assets/images/HomeScreen/Icon_Settings.png')}
                    style={s.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* 중앙 영역 */}
            <View style={s.centerArea}>
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

              <View style={{ height: 12 }} />

              {/* 로딩/에러/리스트 */}
              {loading ? (
                <ActivityIndicator size="large" color="#fff" />
              ) : errMsg ? (
                <Text style={s.errorText}>{errMsg}</Text>
              ) : (
                <Cardnews
                  data={cards}
                  onPressItem={item => {
                    console.log('[homescreen]item id:', item.id);
                    if (onPressCard) onPressCard(item.id);
                  }}
                />
              )}
            </View>

            {/* 하단 안내 */}
            <View style={s.bottomHint}>
              <Image
                source={require('../assets/images/HomeScreen/Icon_Arrow.png')}
                style={s.arrow}
              />
              <Text style={s.hintText}>
                위로 스와이프해서 {'\n'}오늘의 뉴스 돌아보기
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </GradientBg>
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
    justifyContent: 'space-between',
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

  bottomHint: {
    marginTop: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  arrow: { width: 36, height: 36, marginBottom: 20, resizeMode: 'contain' },
  hintText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
  },

  errorText: {
    color: '#ffd1d1',
    textAlign: 'center',
    marginTop: 8,
  },
});
