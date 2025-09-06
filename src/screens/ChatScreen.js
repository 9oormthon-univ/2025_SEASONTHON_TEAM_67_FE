import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NewsComponent from '../components/CardScreen/NewsComponent';
import InputBar from '../components/ChatScreen/InputBar';
import ChatWrapper from '../components/ChatScreen/ChatWrapper';

export default function ChatScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const { data } = route?.params ?? {};
  const [inputValue, setInputValue] = React.useState('');
  const [messages, setMessages] = useState([
    { sender: 'ai', text: '이 기사에 대해 더 알아보고 싶은 내용이 있나요?' },
  ]);

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
        { sender: 'ai', text: 'AI 응답 예시입니다.' },
      ]);
    }, 1000);
  };

  return (
    <View style={s.flexContainer}>
      <ImageBackground
        source={require('../assets/images/Common/background.png')}
        style={s.flexContainer}
        resizeMode="cover"
      >
        {/* Gray tint overlay */}
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(160, 172, 158, 0.1)',
            zIndex: 1,
          }}
          pointerEvents="none"
        />
        <SafeAreaView
          style={{
            flex: 1,
            padding: '20',
            zIndex: 2,
          }}
        >
          <TouchableOpacity
            style={[s.btn, { top: insets.top }]}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require('../assets/images/Common/arrow.png')}
              style={s.img}
            />
          </TouchableOpacity>
          <NewsComponent
            data={data}
            fields={['title', 'date']}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 30,
              maxHeight: 120,
            }}
          />
          <ChatWrapper messages={messages} />
          <InputBar
            value={inputValue}
            onChangeText={setInputValue}
            onSend={handleSend}
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const s = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: 'black',
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
