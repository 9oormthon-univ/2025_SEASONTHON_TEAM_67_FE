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

  // 채팅방 입장 API 호출
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await apiFetch(
          `/api/chats/rooms/enter?nwsId=${data.newsId}`,
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
      }
    })();
    return () => {
      alive = false;
    };
  }, [data?.newsId]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    // 사용자 메시지 추가
    setMessages(prev => [...prev, { sender: 'user', text: inputValue }]);
    setInputValue('');

    // 백엔드 요청 예시 (실제 API로 변경)
    // const response = await fetch(...);
    // const data = await response.json();
    // setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);

    // 데모: 1초 후 AI 응답
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: '귀멸의 칼날이 그렇게 빨리 흥행한 건 몇 가지 이유가 있어요. 먼저 애니메이션이랑 극장판이 연달아 대박이 나면서 원작 만화까지 사람들이 몰려봤고, 코로나 시기에 집에서 보는 문화랑 스트리밍 서비스가 잘 맞아떨어졌어요. 거기에다 화려한 그림체랑 몰입감 있는 스토리 덕분에 입소문이 엄청 퍼져서 기록적인 인기를 끌게 된 거예요.',
        },
      ]);
    }, 2000);
  };

  return (
    <View style={s.flexContainer}>
      {showAll ? (
        <SafeAreaView
          style={{
            flex: 1,
            padding: 28,
            paddingTop: 60,
            zIndex: 2,
          }}
        >
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
              marginBottom: 16,
            }}
          >
            {data.originalPublishedAt}
          </Text>

          <ChatWrapper messages={messages} />
        </SafeAreaView>
      ) : (
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: 'rgba(240, 237, 237, 0.1)',
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
        gradientTop={showAll ? 0 : -100}
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
