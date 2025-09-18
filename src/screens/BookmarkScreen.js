// src/screens/BookmarkScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Bookmark from '../components/BookmarkScreen/Bookmark';
import { apiFetchJson, clearTokens } from '../services/apiClient';

export default function BookmarkScreen() {
  const navigation = useNavigation();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setErrMsg('');

        // ✅ 스크랩 목록 조회
        const json = await apiFetchJson('/api/news/scraps/me', { method: 'GET' });
        if (!alive) return;

        if (!json?.result || !Array.isArray(json.result)) {
          throw new Error('서버 응답이 올바르지 않습니다.');
        }

        // 응답 데이터 → 화면용으로 변환
        const mapped = json.result.map(n => ({
          id: String(n.newsId),
          title: n.title ?? '',
          date: n.originalPublishedAt ?? '',
          tag: Array.isArray(n.tags) && n.tags.length ? `#${n.tags[0]}` : '',
        }));

        setItems(mapped);
      } catch (e) {
        const msg = String(e?.message || '예기치 않은 오류');
        setErrMsg(msg);

        if (msg === 'Unauthorized' || msg.includes('401')) {
          try { await clearTokens(); } catch {}
          navigation.replace('LoginScreen');
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => { alive = false; };
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ImageBackground
        source={require('../assets/images/Common/background.png')}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />

      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

        {/* 상단 바 */}
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

          <Text style={s.title}>저장한 뉴스</Text>
          <View style={{ width: 32 }} />
        </View>

        {/* 로딩/에러/리스트 */}
        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
        ) : errMsg ? (
          <Text style={{ color: '#ffd1d1', textAlign: 'center', marginTop: 20 }}>{errMsg}</Text>
        ) : (
          <Bookmark items={items} />
        )}
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
    justifyContent: 'space-between',
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
