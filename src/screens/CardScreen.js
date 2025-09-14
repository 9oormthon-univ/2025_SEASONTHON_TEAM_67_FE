import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Scroll from '../components/CardScreen/Scroll';
import { apiFetch } from '../components/Common/apiClient';
import GradientBg from '../components/Common/gradientBg'; // 추가

export default function CardScreen({ navigation }) {
  const [data, setData] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { result } = await apiFetch('/api/news/today', { method: 'GET' });
        if (!alive) return;
        setData(result);
      } catch (error) {
        console.error(error);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <View style={s.flexContainer}>
      <Scroll data={data} scrollRef={scrollRef} />
    </View>
  );
}

const s = StyleSheet.create({
  flexContainer: { flex: 1, backgroundColor: 'black' },
});
