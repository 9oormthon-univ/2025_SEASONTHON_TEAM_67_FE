import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NewsComponent = ({
  data,
  fields = ['title', 'date', 'description'],
  style,
}) => {
  // 문장마다 분리
  const splitSentences = text => (text ? text.split(/(?<=[.!?…])\s+/) : []);
  const sentences = splitSentences(data.description);
  const titleSentences = splitSentences(data.title);

  return (
    <View style={[s.container, style]}>
      {fields.includes('title') && (
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
          {titleSentences.map((sentence, idx) => (
            <React.Fragment key={idx}>
              {sentence}
              {idx < titleSentences.length - 1 ? '\n' : ''}
            </React.Fragment>
          ))}
        </Text>
      )}
      {fields.includes('date') && (
        <Text style={{ color: '#888', fontWeight: 'bold', marginBottom: 40 }}>
          {data.date}
        </Text>
      )}
      {fields.includes('description') && (
        <Text style={{ fontSize: 16 }}>
          {sentences.map((sentence, idx) => (
            <React.Fragment key={idx}>
              {sentence}
              {idx < sentences.length - 1 ? '\n\n' : ''}
            </React.Fragment>
          ))}
        </Text>
      )}
    </View>
  );
};

export default NewsComponent;

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
});
