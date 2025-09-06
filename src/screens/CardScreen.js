import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Scroll from '../components/CardScreen/Scroll';
import { apiFetch } from '../components/Common/apiClient'; // ✅ apiFetch 사용

const GradientFooter = () => {
  return (
    <>
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(22,22,22,0.5)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={s.footer}
        pointerEvents="none"
      />
    </>
  );
};

export default function CardScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [currentType, setCurrentType] = useState(null);
  const [data, setData] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        // apiFetch로 오늘의 뉴스 요청
        const { result } = await apiFetch('/api/news/today', { method: 'GET' });
        if (!alive) return;
        setData(result); // result를 data로 설정
        console.log('CardScreen data:', result);
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
      <ImageBackground
        source={require('../assets/images/Common/background.png')}
        style={s.flexContainer}
        resizeMode="cover"
      >
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'transparent',
          }}
          pointerEvents="none"
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(61, 49, 158, 0.25)',
            }}
          />
        </View>
        <Scroll
          data={data}
          onTypeChange={setCurrentType}
          scrollRef={scrollRef}
        />
      </ImageBackground>
    </View>
  );
}

const s = StyleSheet.create({
  flexContainer: { flex: 1, backgroundColor: 'black' },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
  },
  btn: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  img: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
