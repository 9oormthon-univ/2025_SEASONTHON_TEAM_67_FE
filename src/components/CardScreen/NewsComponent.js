import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NewsComponent = ({
  data,
  fields = ['title', 'date', 'description'],
  style,
  titlestyle = 'black',
}) => {
  console.log('NewsComponent data:', data);
  if (data && data.isSuccess === false) {
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
  const titleSentences = splitSentences(data.title);
  const sentences = splitSentences(data.summary);

  // 색상 결정
  const color = titlestyle === 'white' ? '#fff' : '#111';

  return (
    <View style={[s.container, style]}>
      {fields.includes('title') && (
        <Text
          style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, color }}
        >
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
            color,
            fontWeight: 'bold',
            opacity: 0.7,
          }}
        >
          {data.originalPublishedAt}
        </Text>
      )}
      {fields.includes('description') && (
        <Text style={{ fontSize: 16, marginTop: 40, color }}>
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
  },
});
