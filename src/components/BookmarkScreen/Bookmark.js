import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const dummyData = [
  {
    id: '1',
    title: '의무지출 5년간 100조… 재정 건전성에 부담돼요',
    date: '2025.08.20',
    tag: '#법 제정',
  },
  // 필요시 더 추가
  {
    id: '2',
    title: '의무지출 5년간 100조… 재정 건전성에 부담돼요',
    date: '2025.08.20',
    tag: '#법 제정',
  },
  {
    id: '3',
    title: '의무지출 5년간 100조… 재정 건전성에 부담돼요',
    date: '2025.08.20',
    tag: '#법 제정',
  },
  {
    id: '4',
    title: '의무지출 5년간 100조… 재정 건전성에 부담돼요',
    date: '2025.08.20',
    tag: '#법 제정',
  },
  {
    id: '5',
    title: '의무지출 5년간 100조… 재정 건전성에 부담돼요',
    date: '2025.08.20',
    tag: '#법 제정',
  },
];

const Bookmark = () => {
  return (
    <View style={styles.container}>
      {/* 탭 영역 */}
      <View style={styles.tabWrap}>
        <View style={styles.tabActive}>
          <Text style={styles.tabActiveText}>스크랩한 뉴스</Text>
        </View>
        <View style={styles.tabInactive}>
          <Text style={styles.tabInactiveText}>채팅기록</Text>
        </View>
      </View>
      {/* 리스트 */}
      <FlatList
        data={dummyData}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
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
};

const styles = StyleSheet.create({
  container: {
    width: '92%',
    alignSelf: 'center',
    marginTop: 32,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 24,
    paddingBottom: 24,
    // 그림자 효과
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 25,
    elevation: 4,
  },
  tabWrap: {
    flexDirection: 'row',
    marginBottom: 18,
    marginTop: 8,
    paddingHorizontal: 8,
  },
  tabActive: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingVertical: 12,
    alignItems: 'center',
    zIndex: 2,
    elevation: 2,
  },
  tabActiveText: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#111',
  },
  tabInactive: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingVertical: 12,
    alignItems: 'center',
    zIndex: 1,
  },
  tabInactiveText: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#bbb',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    // 그림자 효과
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

export default Bookmark;
