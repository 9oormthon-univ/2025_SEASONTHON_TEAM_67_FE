import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FeedSideBar = ({ data }) => {
  const navigation = useNavigation();

  const [bookmarkActive, setBookmarkActive] = React.useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setBookmarkActive(prev => !prev)}
        activeOpacity={0.8}
      >
        <Image
          source={require('../../assets/images/CardScreen/bookmark.png')}
          style={[styles.icon, { opacity: bookmarkActive ? 1 : 0.5 }]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('ChatScreen', { data: data })}
        activeOpacity={0.8}
      >
        <Image
          source={require('../../assets/images/CardScreen/chat.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8}>
        <Image
          source={require('../../assets/images/CardScreen/share.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FeedSideBar;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 40 : 40, //이후 수정
    alignSelf: 'flex-end',
    alignItems: 'center',
    gap: 15,
    right: 20,
  },
  icon: {
    width: 44,
    height: 44,
    marginBottom: 2,
    resizeMode: 'contain',
  },
});
