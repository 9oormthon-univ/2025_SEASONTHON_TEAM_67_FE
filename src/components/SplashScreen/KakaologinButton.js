// src/components/SplashScreen/KakaologinButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import SvgIcon from '../../assets/images/SplashScreen/icon_kakao.svg'; // svg-transformer 설정 필요
import textStyles from '../../styles/textStyles';

const KakaologinButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.inner} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.content}>
        <SvgIcon width={24} height={24} style={styles.icon} />
        <Text style={[styles.text, textStyles.title18Bold]}>카카오 로그인</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  inner: {
    height: 64,
    backgroundColor: '#FEE500',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',           // 너비는 부모가 중앙 정렬하므로 90%
    alignSelf: 'center',
  },
  content: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: 8 },
  text: { color: '#000' },
});

export default KakaologinButton;
