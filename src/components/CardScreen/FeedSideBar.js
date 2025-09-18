import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { apiFetchJson, clearTokens } from '../../services/apiClient';
import ToastAlert from '../Common/ToastAlert';

const FeedSideBar = ({ data }) => {
  const navigation = useNavigation();
  const [bookmarkActive, setBookmarkActive] = useState(data?.scrapped);
  const [toast, setToast] = useState('');

  const handleBookmark = async () => {
    if (!data?.newsId) {
      setToast('뉴스 ID가 없습니다.');
      return;
    }
    try {
      if (bookmarkActive) {
        // 이미 북마크 상태면 DELETE 요청
        await apiFetchJson(`/api/news/${data.newsId}/scrap`, { method: 'DELETE' });
        setBookmarkActive(false);
      } else {
        // 북마크가 아니면 POST 요청
        await apiFetchJson(`/api/news/${data.newsId}/scrap`, { method: 'POST' });
        setBookmarkActive(true);
      }
    } catch (err) {
      const msg = String(err?.message || '');
      if (msg === 'Unauthorized' || msg.includes('401')) {
        try { await clearTokens(); } catch {}
        navigation.replace('LoginScreen');
        return;
      }
      setToast('북마크 처리 중 오류가 발생했습니다.');
      console.error('[FeedSideBar] bookmark error:', msg);
    }
  };

  return (
    <View style={styles.container}>
      <ToastAlert
        message={toast}
        onClose={() => setToast('')}
        duration={2000}
      />
      <TouchableOpacity onPress={handleBookmark} activeOpacity={0.8}>
        <Image
          source={require('../../assets/images/CardScreen/bookmark.png')}
          style={[styles.icon, { opacity: bookmarkActive ? 1 : 0.5 }]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('ChatScreen', { data })}
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
    bottom: Platform.OS === 'ios' ? 40 : 40,
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
