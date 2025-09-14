import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import colors from '../../styles/colors';
import { Image } from 'react-native';

const FeedFooter = ({ data }) => {
  return (
    <View style={styles.Container}>
      <View style={styles.sourceRow}>
        <View style={styles.profileGroup}>
          <Image
            source={require('../../assets/images/Common/sbs_icon.png')}
            style={[styles.profileImg, { left: 0, zIndex: 3 }]}
          />
        </View>
        {/* <Text style={styles.source}>{data?.source}</Text> //api 열 추가이후 수정 */}
        <Text style={styles.source}>SBS</Text>
      </View>
      <TouchableOpacity
        onPress={() => data?.originalUrl && Linking.openURL(data.originalUrl)}
      >
        <Text style={styles.link}>원문 기사 링크 바로가기 &gt;</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedFooter;

const styles = StyleSheet.create({
  Container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    padding: 24,
  },
  sourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  profileImg: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffffff',
  },
  source: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white000,
  },
  link: {
    fontSize: 15,
    color: colors.gray300,
    textDecorationLine: 'underline',
    marginTop: 4,
  },
  profileGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
  },
});
