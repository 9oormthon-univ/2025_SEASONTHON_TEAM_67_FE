// src/components/Bookmark.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function Bookmark({ items = [] }) {
  return (
    <View style={styles.container}>
      {/* 리스트 */}
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent} // ✅ 화면 너비의 90%
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.row}>
              <Text style={styles.date}>{item.date}</Text>
              <View style={styles.chip}>
                <Text style={styles.chipText}>{item.tag}</Text>
              </View>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // ✅ 컨테이너 배경 제거 + 전체 폭 사용
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'stretch',
    // backgroundColor 제거
    // border/shadow 제거
  },

  // ✅ 리스트 컨텐츠를 화면 너비의 90%로 중앙 정렬
  listContent: {
    width: '90%',
    alignSelf: 'center',
    paddingBottom: 12,
  },

  // 카드 UI는 유지
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  date: {
    fontSize: 13,
    color: '#888',
    marginRight: 12,
  },
  chip: {
    backgroundColor: '#F7FBCF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  chipText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#888B2C',
  },
});
