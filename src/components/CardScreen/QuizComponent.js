import React, { useState } from 'react';
import colors from '../../styles/colors';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ToastAlert from './ToastAlert';

const QuizComponent = ({ data, style }) => {
  const [toast, setToast] = useState(null);
  const [disabled, setDisabled] = useState(false);

  if (!data.quiz) {
    return (
      <View style={[s.container, style]}>
        <Text style={{ color: 'gray', fontSize: 18 }}>
          error : cannot found data
        </Text>
      </View>
    );
  }

  const handleAnswer = answer => {
    setDisabled(true);
    if (data.answer === answer) {
      setToast('정답이에요! 집중력이 대단해요 👏');
    } else {
      setToast('오답이에요🥲 다시 읽어 볼까요?');
    }
    setTimeout(() => setToast(null), 1500);
  };

  const answerButtons = [
    {
      label: '아니예요',
      value: 'NO',
      activeColor: colors.pink600,
      isCorrect: answer => answer !== 'NO',
    },
    {
      label: '맞아요',
      value: 'YES',
      activeColor: colors.green600,
      isCorrect: answer => answer !== 'YES',
    },
  ];

  return (
    <View style={[s.container, style]}>
      {/* 방사형 그라데이션 배경 */}

      <ToastAlert message={toast} />
      <Text style={{ fontSize: 16, color: 'white' }}>🥳 깜짝퀴즈 !</Text>
      <Text style={s.quiz}>{data.quiz}</Text>

      <View style={s.btnwrap}>
        {answerButtons.map(btn => (
          <TouchableOpacity
            key={btn.value}
            style={[
              s.btn,
              disabled && btn.isCorrect(data.answer)
                ? { backgroundColor: colors.gray500 }
                : { backgroundColor: btn.activeColor },
            ]}
            onPress={() => handleAnswer(btn.value)}
            disabled={disabled}
          >
            <Text style={s.btntxt}>{btn.label}</Text>
          </TouchableOpacity>
        ))}
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
    color: 'white',
    width: '90%',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    lineHeight: 30,
  },
  btnwrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 14,
  },
  btn: {
    textAlign: 'center',
    width: 120,
    padding: 12,
    borderRadius: 25,
  },
  btntxt: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#222',
  },
});
