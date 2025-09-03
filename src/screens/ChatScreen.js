import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NewsComponent from '../components/CardScreen/NewsComponent';

export default function ChatScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const { data } = route?.params ?? {};
  return (
    <View style={s.flexContainer}>
      <ImageBackground
        source={require('../assets/images/Common/background.png')}
        style={s.flexContainer}
        resizeMode="cover"
      >
        <SafeAreaView style={{ flex: 1, padding: '20' }}>
          <TouchableOpacity
            style={[s.btn, { top: insets.top }]}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require('../assets/images/Common/arrow.png')}
              style={s.img}
            />
          </TouchableOpacity>
          <NewsComponent data={data} fields={['title', 'date']} />{' '}
        </SafeAreaView>
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
  news: safeHeight => ({
    width: '100%',
    height: Platform.OS === 'ios' ? safeHeight : safeHeight,
    padding: 20,
    // borderColor: 'black',
    // borderWidth: 1, //test
  }),
});
