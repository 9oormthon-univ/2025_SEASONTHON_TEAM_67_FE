// src/components/HomeScreen/Cardnews.js
import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

export default function Cardnews({ data = [], onPressItem = () => {} }) {
  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onPressItem(item)}
        style={cs.cardWrap}
      >
        <View style={cs.card}>
          {/* 제목 */}
          <Text numberOfLines={2} style={cs.title}>
            {item.title}
          </Text>

          {/* 요약 */}
          <Text numberOfLines={4} style={cs.summary}>
            {item.summary}
          </Text>

          {/* 해시태그 */}
          <View style={cs.footer}>
            {item.tag ? (
              <View style={cs.chip}>
                <Text style={cs.chipText}>{item.tag}</Text>
              </View>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    ),
    [onPressItem],
  );

  return (
    <FlatList
      data={data}
      keyExtractor={it => String(it.id)}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={cs.listContent}
      style={{ flexGrow: 0 }}
      ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
      snapToAlignment="start"
      decelerationRate="fast"
      snapToInterval={260 + 12} // 카드 너비 + 간격
    />
  );
}

const cs = StyleSheet.create({
  listContent: {
    paddingHorizontal: 20, // 화면 좌우 여백
    alignItems: 'flex-start',
  },
  cardWrap: {
    width: 260, // 고정 너비
    height: 204, // 고정 높이
    alignSelf: 'flex-start',
  },
  card: {
    flex: 1,
    padding: 18,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
    gap: 8,
    // ✅ margin 제거
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  summary: {
    fontSize: 13,
    lineHeight: 18,
    color: '#4B5563',
  },
  footer: {
    alignItems: 'flex-end',
  },
  chip: {
    backgroundColor: '#E1F738',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  chipText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 11,
  },
});
