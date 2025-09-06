import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NewsComponent = ({
  data,
  fields = ['title', 'date', 'description'],
  style,
}) => {
  if (data && data.ok === false) {
    return (
      <View style={[s.container, style]}>
        <Text style={{ color: 'black', fontSize: 18 }}>
          error : cannot found data
        </Text>
      </View>
    );
  }

  // 문장마다 분리
  const splitSentences = text => (text ? text.split(/(?<=[.!?…])\s+/) : []);
  const titleSentences = splitSentences(data.newsTitle);
  const sentences = splitSentences(data.summary);

  return (
    <View style={[s.container, style]}>
      {fields.includes('title') && (
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
          {titleSentences.map((sentence, idx) => (
            <React.Fragment key={`title-${idx}`}>
              {sentence}
              {idx < titleSentences.length - 1 ? '\n' : ''}
            </React.Fragment>
          ))}
        </Text>
      )}
      {fields.includes('date') && (
        <Text
          style={{
            color: '#888',
            fontWeight: 'bold',
          }}
        >
          {data.date}
        </Text>
      )}
      {fields.includes('description') && (
        <Text style={{ fontSize: 16, marginTop: 40 }}>
          {sentences.map((sentence, idx) => (
            <React.Fragment key={`desc-${idx}`}>
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
    maxHeight: 120,
  },
});
