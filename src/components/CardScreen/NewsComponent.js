import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const NewsComponent = ({ data, style, titleEllipsis = false }) => {
  if (data && data.isSuccess === false) {
    return (
      <View style={[s.container, style]}>
        <Text style={{ color: 'gray', fontSize: 18 }}>
          error : cannot found data
        </Text>
      </View>
    );
  }

  // 문장마다 분리
  const splitSentences = text => (text ? text.split(/(?<=[.!?…])\s+/) : []);
  const titleSentences = splitSentences(data.title);
  const sentences = splitSentences(data.summary);

  // 색상 결정 (항상 green600으로 고정)
  const color = colors.green600;

  // 최대 2줄까지만 표시, 넘으면 ... 처리
  const renderWithEllipsis = (sentences, maxLines = 2) => {
    if (sentences.length <= maxLines) {
      return sentences.join('\n');
    }
    return sentences.slice(0, maxLines).join('\n') + '...';
  };

  return (
    <View style={[s.container, style]}>
      <Text
        style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8, color }}
        numberOfLines={titleEllipsis ? 2 : undefined}
        ellipsizeMode={titleEllipsis ? 'tail' : undefined}
      >
        {titleEllipsis
          ? renderWithEllipsis(titleSentences, 2)
          : titleSentences.join('\n')}
      </Text>
      <Text
        style={{
          color,
          fontWeight: 'bold',
          opacity: 0.7,
        }}
      >
        {data.originalPublishedAt}
      </Text>
      <Text style={{ fontSize: 16, marginTop: 30, lineHeight: 28, color }}>
        {sentences.map((sentence, idx) => (
          <Text key={idx} style={{ color, fontSize: 16 }}>
            {sentence}
            {'\n\n'}
          </Text>
        ))}
      </Text>
    </View>
  );
};

export default NewsComponent;

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
});
