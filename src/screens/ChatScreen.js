// src/screens/ChatScreen.js

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../styles/colors';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';

import InputBar from '../components/ChatScreen/InputBar';
import ChatWrapper from '../components/ChatScreen/ChatWrapper';
import BackArrow from '../components/Common/back_arrow';
import ToastAlert from '../components/Common/ToastAlert';

// ✅ 공통 API 클라이언트로 통일
import { apiFetchJson, clearTokens } from '../services/apiClient';

export default function ChatScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
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

  // 채팅방 입장
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const json = await apiFetchJson(
          `/api/chats/rooms/enter?newsId=${data.newsId}`,
          { method: 'POST' } // Authorization 자동 첨부됨
        );
        if (!alive) return;

        if (json?.result?.chatRoomId) {
          setRoomId(json.result.chatRoomId);
          setRecommendedQuestions(json.result.recommendedQuestions || []);
          console.log('Entered chat room:', json.result);
        } else {
          throw new Error('채팅방 정보를 가져오지 못했습니다.');
        }
      } catch (err) {
        const msg = String(err?.message || '');
        console.error('Error entering chat room:', msg);

        // 만료/미보유 → 토큰 비움 후 로그인으로
        if (msg === 'Unauthorized' || msg.includes('401')) {
          try { await clearTokens(); } catch {}
          navigation.replace('LoginScreen');
          return;
        }

        setToast('채팅방 입장 중 오류가 발생했습니다.');
        setTimeout(() => navigation.goBack(), 1500);
      }
    })();
    return () => { alive = false; };
  }, [data?.newsId, navigation]);

  const handleSend = async () => {
    if (!inputValue.trim() || !roomId) return;

    const userText = inputValue;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const json = await apiFetchJson(
        `/api/chats/news/${data.newsId}/talk`,
        {
          method: 'POST', // Authorization 자동 첨부됨
          body: JSON.stringify({
            message: userText,
            chatRoomId: roomId,
          }),
        }
      );

      const aiReply = json?.result?.messages || 'AI 답변을 불러오지 못했습니다.';
      setMessages(prev => [
        ...prev,
        { sender: 'ai', text: aiReply },
      ]);
    } catch (err) {
      const msg = String(err?.message || '');
      console.error('[ChatScreen] talk error:', msg);

      if (msg === 'Unauthorized' || msg.includes('401')) {
        try { await clearTokens(); } catch {}
        navigation.replace('LoginScreen');
      } else {
        setMessages(prev => [
          ...prev,
          { sender: 'ai', text: 'AI 답변 중 오류가 발생했습니다.' },
        ]);
        setToast('AI 답변 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={s.flexContainer}>
      {showAll ? (
        <SafeAreaView
          style={{ flex: 1, padding: 32, paddingTop: insets.top + 16, zIndex: 2 }}
          edges={['bottom']}
        >
          <StatusBar barStyle="light-content" />
          {/* 맨 위에 그라데이션 */}
          <LinearGradient
            colors={['#222222', 'rgba(0,0,0,0)']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 300, zIndex: 0 }}
            pointerEvents="none"
          />

          <BlurView blurType="dark" blurAmount={1} style={StyleSheet.absoluteFill} />
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.white000, marginTop: 45 }} numberOfLines={2} ellipsizeMode="tail">
            {data.title}
          </Text>
          <Text style={{ fontSize: 14, color: colors.gray300, marginTop: 4 }}>
            {data.originalPublishedAt}
          </Text>

          <View style={{ height: 10 }} />
          <ChatWrapper messages={messages} isLoading={isLoading} />
        </SafeAreaView>
      ) : (
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'rgba(139,128,208,0.05)' }}
          onPress={() => navigation.goBack()}
        />
      )}

      <ToastAlert message={toast} onClose={() => setToast('')} duration={2000} />
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
});
