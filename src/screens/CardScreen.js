import React from 'react';
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

const FeedFooter = () => {
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
            backgroundColor: 'rgba(255,249,249,0.5)',
            zIndex: 0,
          }}
          pointerEvents="none"
        />
        <TouchableOpacity
          style={[s.btn, { top: insets.top, zIndex: 2 }]}
          // onPress={() => navigation.goBack() //스크롤 변경이후 작동안됨
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <Image
            source={require('../assets/icons/Common/arrow.png')}
            style={s.img}
          />
        </TouchableOpacity>
        {/* <StatusBar barStyle={'light-content'} backgroundColor={'black'} /> */}
        <Scroll data={VIDEO_DATA} />
        <FeedFooter />
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
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
});
