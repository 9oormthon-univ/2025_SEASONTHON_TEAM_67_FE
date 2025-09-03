import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FeedHeader = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={s.btn} onPress={() => navigation.goBack()}>
      <Image
        source={require('../../assets/icons/common/arrow.png')}
        style={s.img}
      />
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  btn: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  img: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
});

export default FeedHeader;
