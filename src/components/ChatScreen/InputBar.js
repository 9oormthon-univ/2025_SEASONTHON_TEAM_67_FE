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
import LinearGradient from 'react-native-linear-gradient';

export default function InputBar({
  value,
  onChangeText,
  onSend,
  recommendedQuestions,
  setShowAll,
  gradientTop = -100,
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
    outputRange: [0, 140],
  });

  // opacity 애니메이션 값 (초기값 0)
  const gradientOpacity = React.useRef(new Animated.Value(0)).current;

  // 마운트 시 0→1로 서서히 진해짐
  React.useEffect(() => {
    Animated.timing(gradientOpacity, {
      toValue: 1,
      duration: 600, // 원하는 속도로 조정
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={s.container}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { top: gradientTop, opacity: gradientOpacity },
        ]}
        pointerEvents="none"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0)', '#8B80D0']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
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
        <View style={{ flexDirection: 'wrap', flexWrap: 'wrap' }}>
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
        <TouchableOpacity
          onPress={() => {
            onSend();
            setShowAll && setShowAll(true);
            setShowQuestions(false);
          }}
        >
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
    bottom: 0,
    padding: 20,
    paddingBottom: 30,
    backgroundColor: 'transparent',
    zIndex: 10,
    // minHeight: 300,
    justifyContent: 'flex-end',
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
