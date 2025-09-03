import React, { useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function Cardnews({ data = [], onPressItem = () => {} }) {
  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity activeOpacity={0.9} onPress={() => onPressItem(item)} style={cs.cardWrap}>
        <View style={cs.card}>
          <Text numberOfLines={2} style={cs.title}>{item.title}</Text>
          <Text numberOfLines={4} style={cs.summary}>{item.summary}</Text>
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
    [onPressItem]
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(it) => String(it.id)}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={cs.listContent}
      style={{ flexGrow: 0 }}                 // ⛔ 세로로 쭉 늘어지는 것 방지
      ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
      snapToAlignment="start"
      decelerationRate="fast"
      snapToInterval={220 + 12}
    />
  );
}

const cs = StyleSheet.create({
  listContent: {
    paddingHorizontal: 20,
    alignItems: 'flex-start',                 // ✅ cross-axis 늘어짐 방지
  },
  cardWrap: {
    width: 220,
    height: 180,
  },
  card: {
    flex: 1,
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#F9FAFB',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
    minHeight: 155,                           // 필요시 140~160 사이로 조절
  },
  title: { fontSize: 15, fontWeight: '700', color: '#111827' },
  summary: { marginTop: 6, fontSize: 13, lineHeight: 18, color: '#4B5563' },
  footer: {
    marginTop: 'auto',                        // ✅ 내용 밑으로 밀고 하단 고정
    alignItems: 'flex-end',
  },
  chip: { backgroundColor: '#E1F738', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, },
  chipText: { color: '#000', fontWeight: '600', fontSize: 11 },
});
