// src/screens/CardScreen.js
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Scroll from '../components/CardScreen/Scroll';
import GradientBg from '../components/Common/gradientBg';
import { apiFetchJson, clearTokens } from '../services/apiClient';

export default function CardScreen({ navigation }) {
  const [data, setData] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        // ✅ 모든 API 호출에 JWT 자동 첨부 (apiFetchJson 사용)
        const json = await apiFetchJson('/api/news/today', { method: 'GET' });
        if (!alive) return;

        const { result } = json || {};
        setData(result ?? null);
      } catch (e) {
        const msg = String(e?.message || '');
        console.error('[CardScreen] fetch error:', msg);

        // ✅ 만료/미보유 시 토큰 제거 후 로그인으로
        if (msg === 'Unauthorized' || msg.includes('401')) {
          try { await clearTokens(); } catch {}
          navigation.replace('LoginScreen');
        }
      }
    })();

    return () => { alive = false; };
  }, [navigation]);

  return (
    <View style={s.flexContainer}>
      <Scroll data={data} scrollRef={scrollRef} />
    </View>
  );
}

const s = StyleSheet.create({
  flexContainer: { flex: 1, backgroundColor: 'black' },
});
