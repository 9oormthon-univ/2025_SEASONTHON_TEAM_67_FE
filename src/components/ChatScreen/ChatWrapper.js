import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import colors from '../../styles/colors';

const AI_PROFILE = require('../../assets/images/Common/ChatGPT.png');
const USER_PROFILE = require('../../assets/images/Common/Icon_gbnam.jpg');

export default function ChatWrapper({ messages }) {
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
            style={styles.profile}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginBottom: 80, // inputbar 공간 확보
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
    backgroundColor: '#eee',
  },
  bubble: {
    maxWidth: '80%',
    backgroundColor: 'rgba(255,255,255,0.8)',
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
    opacity: 0.8,
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
