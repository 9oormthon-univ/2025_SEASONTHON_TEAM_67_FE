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

const GradientFooter = React.memo(() => (
  <LinearGradient
    colors={['rgba(0,0,0,0)', 'rgba(22,22,22,0.5)']}
    start={{ x: 0.5, y: 0 }}
    end={{ x: 0.5, y: 1 }}
    style={styles.footer}
    pointerEvents="none"
  />
));

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
        {
          sender: 'ai',
          text: '귀멸의 칼날이 그렇게 빨리 흥행한 건 몇 가지 이유가 있어요. 먼저 애니메이션이랑 극장판이 연달아 대박이 나면서 원작 만화까지 사람들이 몰려봤고, 코로나 시기에 집에서 보는 문화랑 스트리밍 서비스가 잘 맞아떨어졌어요. 거기에다 화려한 그림체랑 몰입감 있는 스토리 덕분에 입소문이 엄청 퍼져서 기록적인 인기를 끌게 된 거예요.',
        },
      ]);
    }, 2000);
  };

  return (
    <View style={s.flexContainer}>
      <ImageBackground
        source={require('../assets/images/Common/background.png')}
        style={s.flexContainer}
        resizeMode="cover"
      >
        {/* Linear gradient overlay */}
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            zIndex: 1,
          }}
          pointerEvents="none"
        >
          <ImageBackground
            source={null}
            style={{ flex: 1 }}
            imageStyle={{
              width: '100%',
              height: '100%',
            }}
          >
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: 'transparent',
              }}
              pointerEvents="none"
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(30, 24, 78, 0.3)',
                }}
              />
            </View>
          </ImageBackground>
        </View>
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
              style={[s.img, { tintColor: 'white' }]}
            />
          </TouchableOpacity>
          <NewsComponent
            data={data}
            fields={['title', 'date']}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 30,
              maxHeight: 150,
            }}
            titlestyle="white"
            titleEllipsis={true}
          />
          <ChatWrapper messages={messages} />
          <InputBar
            value={inputValue}
            onChangeText={setInputValue}
            onSend={handleSend}
            recommendedQuestions={data.recommendedQuestions}
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
