import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function CardScreen({ route }) {
  const { item } = route.params || {};

  return (
    <SafeAreaView style={s.wrap}>
      {item ? (
        <>
          <Text style={s.title}>{item.title}</Text>
          <Text style={s.summary}>{item.summary}</Text>
          <Text style={s.tag}>{item.tag}</Text>
        </>
      ) : (
        <Text>뉴스 데이터를 불러올 수 없어요.</Text>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#FFF', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  summary: { fontSize: 16, color: '#444', marginBottom: 8 },
  tag: { fontSize: 14, color: '#888' },
});
