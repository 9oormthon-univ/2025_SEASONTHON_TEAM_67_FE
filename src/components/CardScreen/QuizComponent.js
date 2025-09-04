import React from 'react';
import colors from '../../styles/colors';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';

const NewsComponent = ({ data }) => (
  <View style={s.container}>
    <Text style={{ fontSize: 15 }}>🥳 깜짝퀴즈 !</Text>
    <Text style={s.quiz}>{data.quiz}</Text>

    <View style={s.btnwrap}>
      <TouchableOpacity style={[s.btn, { backgroundColor: colors.pink600 }]}>
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
          아니예요
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[s.btn, { backgroundColor: colors.green600 }]}>
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
          맞아요
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default NewsComponent;

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100,
  },
  quiz: {
    width: '90%',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  btnwrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
  btn: {
    textAlign: 'center',
    width: 120,
    padding: 12,
    backgroundColor: 'rgba(225, 247, 56, 0.5)',
    borderRadius: 25,
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 18,
    shadowColor: 'rgba(154, 108, 108, 0.25)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 8,
  },
});
