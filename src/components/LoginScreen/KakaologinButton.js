import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import SvgIcon from '../../assets/images//SplashScreen/icon_kakao.svg';

const KakaologinButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.content}>
        <SvgIcon width={24} height={24} style={styles.icon} />
        <Text style={styles.text}>카카오 로그인</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 52,
    width: '90%',
    height: 64,
    backgroundColor: '#FEE500',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  content: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: 8 },
  text: { color: '#000', fontWeight: '700', fontSize: 16 },
});

export default KakaologinButton;
