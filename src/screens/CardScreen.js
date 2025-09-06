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
// import { VIDEO_DATA } from '../assets/dummydata';

import Scroll from '../components/CardScreen/Scroll';
import axios from 'axios';

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
    const ids = [1, 2, 3, 4];
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          ids.map(id =>
            axios.get(`https://hsmyspace.site/api/news/${id}`, {
              headers: {
                accept: '*/*',
                Authorization:
                  'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsImlhdCI6MTc1NzE1NDU3NiwiZXhwIjoxNzU3MjQwOTc2fQ.9-eCc07fm5EhZDD8SdpfuStWRppMkNPIcJudUvgNfes',
              },
            }),
          ),
        );
        const dataArr = responses.map(res => res.data);
        setData(dataArr);
        console.log(
          'data:',
          dataArr.map(d => d.isSuccess),
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (data) {
      console.log('CardScreen data:', data);
    }
  }, [data]);
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
