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
          {/* <Image
            source={{
              uri: 'https://via.placeholder.com/40/2196F3/222222?text=2',
            }}
            style={[
              styles.profileImg,
              { left: 16, zIndex: 2, position: 'absolute' },
            ]}
          />
          <Image
            source={{
              uri: 'https://via.placeholder.com/40/FF9800/ffffff?text=3',
            }}
            style={[
              styles.profileImg,
              { left: 32, zIndex: 1, position: 'absolute' },
            ]}
          /> */}
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
    bottom: 0,
    padding: 24,
  },
  sourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  profileImg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#ffffffff',
    shadowColor: '#b7ababff',
    shadowOpacity: 0.018,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 25,
    elevation: 4,
  },
  source: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white000,
  },
  link: {
    fontSize: 15,
    color: colors.white000,
    textDecorationLine: 'underline',
    marginTop: 4,
    opacity:0.7
  },
  profileGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
  },
});
