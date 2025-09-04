import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { VIDEO_DATA } from '../assets/dummydata';

import Scroll from '../components/CardScreen/Scroll';

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
  const scrollRef = useRef(null);

  return (
    <View style={s.flexContainer}>
      <ImageBackground
        source={require('../assets/images/Common/background.png')}
        style={s.flexContainer}
        resizeMode="cover"
      >
        <Scroll
          data={VIDEO_DATA[0].results}
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
