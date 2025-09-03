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
            source={{
              uri: 'https://via.placeholder.com/40/8BC34A/ffffff?text=1',
            }}
            style={[styles.profileImg, { left: 0, zIndex: 3 }]}
          />
          <Image
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
          />
        </View>
        <Text style={styles.source}>{data?.source}</Text>
      </View>
      <TouchableOpacity
        onPress={() => data?.link && Linking.openURL(data.link)}
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
    gap: 8,
  },
  profileImg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#eee',
  },
  source: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.gray000,
  },
  link: {
    fontSize: 15,
    color: '#222',
    textDecorationLine: 'underline',
    marginTop: 4,
  },
  profileGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 56,
    height: 32,
    marginRight: 8,
    position: 'relative',
  },
});
