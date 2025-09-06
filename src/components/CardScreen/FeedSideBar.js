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

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          source={require('../../assets/images/CardScreen/bookmark.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('ChatScreen', { data: data })}
      >
        <Image
          source={require('../../assets/images/CardScreen/chat.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity>
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
    bottom: Platform.OS === 'ios' ? 50 : 50, //이후 수정
    alignSelf: 'flex-end',
    alignItems: 'center',
    gap: 20,
    right: 20,
  },
  icon: {
    width: 32,
    height: 32,
    marginBottom: 2,
    resizeMode: 'contain',
    tintColor: 'white',
  },
});
