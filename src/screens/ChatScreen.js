//chatscreen.js

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../styles/colors';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';

import InputBar from '../components/ChatScreen/InputBar';
import ChatWrapper from '../components/ChatScreen/ChatWrapper';
import BackArrow from '../components/Common/back_arrow';
import { apiFetch } from '../components/Common/apiClient';
import ToastAlert from '../components/Common/ToastAlert';

export default function ChatScreen({ navigation, route }) {
  const { data } = route?.params ?? {};
  const [inputValue, setInputValue] = React.useState('');
  const [messages, setMessages] = useState([]);
  const [toast, setToast] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [recommendedQuestions, setRecommendedQuestions] = useState(
    data?.recommendedQuestions || [],
  );
  const [isLoading, setIsLoading] = useState(false);

  // 채팅방 입장 API 호출
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await apiFetch(
          `/api/chats/rooms/enter?newsId=${data.newsId}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          },
        );
        if (!alive) return;
        if (res?.result?.chatRoomId) {
          setRoomId(res.result.chatRoomId);
          setRecommendedQuestions(res.result.recommendedQuestions || []);
          console.log('Entered chat room:', res.result);
        }
      } catch (err) {
        console.error('Error entering chat room:', err);
        setToast('채팅방 입장 중 오류가 발생했습니다.');
        setTimeout(() => navigation.goBack(), 2000);
      }
    })();
    return () => {
      alive = false;
    };
  }, [data?.newsId]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: inputValue }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await apiFetch(`/api/chats/news/${data.newsId}/talk`, {
        method: 'POST',
        body: {
          message: inputValue,
          chatRoomId: roomId,
        },
      });
      const aiReply = res?.result?.messages || 'AI 답변을 불러오지 못했습니다.';
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: aiReply,
        },
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: 'AI 답변 중 오류가 발생했습니다.',
        },
      ]);
      setToast('AI 답변 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={s.flexContainer}>
      {showAll ? (
        <SafeAreaView
          style={{
            flex: 1,
            padding: 32,
            paddingTop: 60,
            zIndex: 2,
          }}
        >
          {/* 맨 위에 그라데이션 */}
          <LinearGradient
            colors={['#222222', 'rgba(0,0,0,0)']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 300,
              zIndex: 0,
            }}
            pointerEvents="none"
          />

          <BlurView
            blurType="dark"
            blurAmount={1}
            style={StyleSheet.absoluteFill}
          />

          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: colors.white000,
            }}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {data.title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: colors.gray300,
              marginTop: 4,
            }}
          >
            {data.originalPublishedAt}
          </Text>

          <View style={{ height: 10 }} />
          <ChatWrapper messages={messages} isLoading={isLoading} />
        </SafeAreaView>
      ) : (
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: 'rgba(139,128,208,0.05)',
          }}
          onPress={() => navigation.goBack()}
        />
      )}
      <ToastAlert
        message={toast}
        onClose={() => setToast('')}
        duration={2000}
      />
      <BackArrow style={{ zIndex: 10 }} onPress={() => navigation.goBack()} />
      <InputBar
        value={inputValue}
        onChangeText={setInputValue}
        onSend={handleSend}
        recommendedQuestions={recommendedQuestions}
        setShowAll={setShowAll}
        gradientTop={showAll ? -40 : -200}
      />
    </View>
  );
}

const s = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
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
});
