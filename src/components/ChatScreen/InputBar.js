import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';
import colors from '../../styles/colors';

export default function InputBar({
  value,
  onChangeText,
  onSend,
  recommendedQuestions,
}) {
  const [showQuestions, setShowQuestions] = React.useState(false);

  const animatedHeight = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: showQuestions ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [showQuestions]);

  const questionsHeight = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 60], // 60은 추천 질문 영역의 최대 높이(px)로 조정 가능
  });

  return (
    <View style={s.container}>
      <TouchableOpacity
        style={s.questionwapper}
        onPress={() => setShowQuestions(prev => !prev)}
        activeOpacity={0.7}
      >
        <Text style={s.label}>추천 질문</Text>
        <Image
          source={require('../../assets/images/Common/arrow.png')}
          style={[
            s.labelArrow,
            { transform: [{ rotate: showQuestions ? '270deg' : '90deg' }] },
          ]}
          tintColor="#fff"
        />
      </TouchableOpacity>
      <Animated.View
        style={{
          overflow: 'hidden',
          height: questionsHeight,
          marginBottom: animatedHeight.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 10],
          }),
        }}
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {showQuestions &&
            recommendedQuestions?.map((q, idx) => (
              <TouchableOpacity
                key={idx}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 16,
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  marginRight: 8,
                  marginBottom: 8,
                  opacity: 0.8,
                }}
                onPress={() => onChangeText(q)}
                activeOpacity={0.8}
              >
                <Text style={{ color: '#222', fontSize: 14 }}>{q}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </Animated.View>
      <View style={s.inputwrapper}>
        <View style={s.inputbar}>
          <TextInput
            style={s.input}
            value={value}
            onChangeText={onChangeText}
            placeholder="질문을 입력하세요"
            placeholderTextColor="#888"
          />
        </View>
        <TouchableOpacity onPress={onSend}>
          <Image
            source={require('../../assets/images/ChatScreen/arrow_circle.png')}
            style={s.arrow}
            tintColor="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    padding: 20,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  questionwapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    margin: 14,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white000,
  },
  labelArrow: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  inputwrapper: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 8,
  },
  inputbar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 8,
    boxShadow: '0px 0px 10px rgba(154, 108, 108, 0.15)',
    shadowColor: 'rgba(154, 108, 108, 0.5)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 12,
  },
  input: {
    fontSize: 15,
    paddingVertical: 4,
    borderRadius: 15,
  },
  arrow: {
    width: 44,
    height: 44,
  },
});
