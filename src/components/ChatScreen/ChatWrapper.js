// ChatWrapper.js

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import colors from '../../styles/colors';

const AI_PROFILE = require('../../assets/images/Common/ChatGPT.png');
const USER_PROFILE = require('../../assets/images/Common/Icon_gbnam.jpg');

export default function ChatWrapper({ messages, isLoading }) {
  const [dotCount, setDotCount] = useState(1);

  React.useEffect(() => {
    if (!isLoading) {
      setDotCount(1);
      return;
    }
    const interval = setInterval(() => {
      setDotCount(prev => (prev < 3 ? prev + 1 : 1));
    }, 400);
    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <ScrollView
      style={styles.wrapper}
      contentContainerStyle={{ padding: 12, gap: 16 }}
      showsVerticalScrollIndicator={false}
    >
      {messages.map((msg, idx) => (
        <View
          key={idx}
          style={[styles.row, msg.sender === 'user' ? styles.rowReverse : null]}
        >
          <Image
            source={msg.sender === 'user' ? USER_PROFILE : AI_PROFILE}
            style={[
              styles.profile,
              msg.sender !== 'user' && { tintColor: '#fff' }, // AI_PROFILE일 때만 흰색 tint
            ]}
          />
          <View
            style={[
              styles.bubble,
              msg.sender === 'user' ? styles.userBubble : styles.aiBubble,
            ]}
          >
            <Text style={styles.text}>{msg.text}</Text>
          </View>
        </View>
      ))}
      {/* AI 응답 대기 중일 때 로딩 점 애니메이션 */}
      {isLoading && (
        <View style={[styles.row]}>
          <Image
            source={AI_PROFILE}
            style={[styles.profile, { tintColor: '#fff' }]}
          />
          <View
            style={[
              styles.bubble,
              styles.aiBubble,
              { flexDirection: 'row', alignItems: 'center' },
            ]}
          >
            <Text style={[styles.text, { fontSize: 22 }]}>
              {'.'.repeat(dotCount)}
            </Text>
          </View>
        </View>
      )}
      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  profile: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  bubble: {
    maxWidth: '80%',
    backgroundColor: colors.white000,
    borderRadius: 15,
    boxShadow: '0px 0px 10px rgba(154, 108, 108, 0.25)', // RN에서는 shadow* 사용
    shadowColor: 'rgba(154, 108, 108, 0.25)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  aiBubble: {
    alignSelf: 'flex-start',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: colors.green600,
  },
  text: {
    fontFamily: 'Noto Sans',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 18,
    color: '#000',
  },
});
