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
          <Text numberOfLines={2} style={cs.title}>
            {item.title}
          </Text>
          <Text numberOfLines={4} style={cs.summary}>
            {item.summary}
          </Text>
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
      style={{ flexGrow: 0, height: 200 }} // ⛔ 세로로 쭉 늘어지는 것 방지
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
    marginTop: 12,
    alignItems: 'center', // ✅ cross-axis 늘어짐 방지
  },
  cardWrap: {
    width: 220,
    height: 200,
  },
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 25,
    backgroundColor: '#F9FAFB',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 25,
    elevation: 4,
    minHeight: 155, // 필요시 140~160 사이로 조절
  },
  title: { fontSize: 16, fontWeight: '700', color: '#111827' },
  summary: { marginTop: 6, fontSize: 13, lineHeight: 20, color: '#4B5563' },
  footer: {
    paddingTop: 8,
    alignItems: 'flex-end',
  },
  chip: {
    backgroundColor: '#E1F738',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  chipText: { color: '#000', fontWeight: '600', fontSize: 11 },
});
