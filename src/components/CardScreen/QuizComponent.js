import React, { useState } from 'react';
import colors from '../../styles/colors';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ToastAlert from './ToastAlert';

const QuizComponent = ({ data, style }) => {
  const [toast, setToast] = useState(null);
  const [selected, setSelected] = useState(null);
  const [disabled, setDisabled] = useState(false);

  if (!data.quiz) {
    return (
      <View style={[s.container, style]}>
        <Text style={{ color: 'black', fontSize: 18 }}>
          error : cannot found data
        </Text>
      </View>
    );
  }

  const handleAnswer = answer => {
    setSelected(answer);
    setDisabled(true);
    if (data.quiz.answer === answer) {
      setToast('정답이에요! 집중력이 대단해요 👏');
    } else {
      setToast('오답이에요🥲 다시 읽어 볼까요?');
    }
    setTimeout(() => setToast(null), 1500);
  };

  return (
    <View style={[s.container, style]}>
      <ToastAlert message={toast} />
      <Text style={{ fontSize: 15 }}>🥳 깜짝퀴즈 !</Text>
      <Text style={s.quiz}>{data.quiz.question}</Text>

      <View style={s.btnwrap}>
        <TouchableOpacity
          style={[
            s.btn,
            disabled && data.quiz.answer !== 'NO'
              ? { backgroundColor: '#fff' }
              : { backgroundColor: colors.pink600 },
          ]}
          onPress={() => handleAnswer('NO')}
          disabled={disabled}
        >
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              color: disabled && data.quiz.answer !== 'NO' ? '#222' : '#111',
            }}
          >
            아니예요
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            s.btn,
            disabled && data.quiz.answer !== 'YES'
              ? { backgroundColor: '#fff' }
              : { backgroundColor: colors.green600 },
          ]}
          onPress={() => handleAnswer('YES')}
          disabled={disabled}
        >
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              color: disabled && data.quiz.answer !== 'YES' ? '#222' : '#111',
            }}
          >
            맞아요
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuizComponent;

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
