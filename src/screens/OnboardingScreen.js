import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProgressBar from '../components/OnboardingScreen/ProgressBar';
import ChoiceChips from '../components/OnboardingScreen/ChoiceChips';

export default function OnboardingScreen({ navigation }) {
  // 1~4 스텝
  const [step, setStep] = useState(1);

  // 선택 상태
  const [moreTopics, setMoreTopics] = useState([]); // 자주 보고 싶은 주제
  const [lessTopics, setLessTopics] = useState([]); // 적게 보고 싶은 주제
  const [tone, setTone] = useState(null);           // 톤(문체)

  // 전체 주제 (원하는 라벨로 바꿔 써도 됨)
  const ALL_TOPICS = [
    '정치사회', '경제', '국제', 'IT/과학',
    '문화', '스포츠', '환경', '교육',
  ];

  // ❗요구사항: 1번 화면에서 고른 주제는 2번 화면에 안 보이게
  const step1Options = useMemo(
      () => ALL_TOPICS.filter(t => !lessTopics.includes(t)),
      [ALL_TOPICS, lessTopics],
  );

  const step2Options = useMemo(
      () => ALL_TOPICS.filter(t => !moreTopics.includes(t)),
      [ALL_TOPICS, moreTopics],
  );

  const progress = useMemo(() => {
    if (step === 1) return 0.25;
    if (step === 2) return 0.5;
    if (step === 3) return 0.75;
    return 1;
  }, [step]);

  const toggle = (selected, setter) => (label) => {
    if (selected.includes(label)) {
      setter(selected.filter(x => x !== label));
    } else {
      setter([...selected, label]);
    }
  };

  const goNext = () => setStep(prev => Math.min(prev + 1, 4));
  const goPrev = () => setStep(prev => Math.max(prev - 1, 1));

  return (
      <ImageBackground
          source={require('../assets/images/OnboardingScreen/background.png')}
          style={styles.bg}
          resizeMode="cover"
      >
        <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
          <StatusBar barStyle="light-content" />

          {/* 상단 프로그레스바 (흰색, 화면과 살짝 띄움) */}
          <ProgressBar progress={progress} />

          {/* 가운데 내용 */}
          <ScrollView
              contentContainerStyle={styles.centerBlock}
              showsVerticalScrollIndicator={false}
          >
            {step === 1 && (
                <>
                  <Text style={styles.title}>
                    자주 보고 싶은 주제를{'\n'}선택해주세요
                  </Text>
                  <Text style={styles.desc}>
                    선택한 주제를 더 자주 보여드릴게요
                  </Text>

                  <ChoiceChips
                      options={step1Options}
                      selected={moreTopics}
                      onToggle={toggle(moreTopics, setMoreTopics)}
                      accent="#E1F738"
                  />
                </>
            )}

            {step === 2 && (
                <>
                  <Text style={styles.title}>
                    적게 보고 싶은 주제를{'\n'}선택해주세요
                  </Text>
                  <Text style={styles.desc}>
                    선택한 주제는 더 적게 보여드릴게요
                  </Text>

                  <ChoiceChips
                      options={step2Options}
                      selected={lessTopics}
                      onToggle={toggle(lessTopics, setLessTopics)}
                      accent="#FFC891"
                  />
                </>
            )}

            {step === 3 && (
                <>
                  <Text style={styles.title}>
                    어떤 문체로 뉴스를{'\n'}보여드릴까요?
                  </Text>
                  <Text style={styles.desc}>원하는 톤을 선택해주세요</Text>

                  {/* 풀폭 톤 선택(라디오 느낌) */}
                  <View style={styles.toneWrap}>
                    {['사회', '정치사회', '경제'].map(label => {
                      const active = tone === label;
                      return (
                          <TouchableOpacity
                              key={label}
                              style={[
                                styles.toneItem,
                                {
                                  backgroundColor: active ? '#D6F24A' : 'rgba(0,0,0,0.35)',
                                  borderColor: active ? 'transparent' : 'rgba(255,255,255,0.25)',
                                },
                              ]}
                              onPress={() => setTone(label)}
                          >
                            <Text style={[styles.toneLabel, { color: active ? '#111' : '#fff' }]}>
                              {label}
                            </Text>
                          </TouchableOpacity>
                      );
                    })}
                  </View>
                </>
            )}

            {step === 4 && (
                <>
                  <Text style={styles.title}>
                    이제 뉴스를 보러 가볼까요?
                  </Text>
                  <Text style={styles.desc}>선호 설정이 완료되었어요</Text>
                </>
            )}
          </ScrollView>

          {/* 하단 네비게이션 버튼 */}
          <View style={styles.footer}>
            <TouchableOpacity
                onPress={goPrev}
                style={styles.prevBtn}
                disabled={step === 1}
            >
              <Text style={[styles.prevText, step === 1 && { opacity: 0.5 }]}>이전</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                  if (step < 4) return goNext();
                  // 마지막: 시작하기 → CardScreen
                  navigation.replace('CardScreen');
                }}
                style={[
                  styles.nextBtn,
                  step === 4 && { backgroundColor: '#fff' },
                ]}
            >
              <Text style={[styles.nextText, step === 4 && { color: '#111' }]}>
                {step === 4 ? '시작하기' : '다음'}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  safe: { flex: 1 },

  // 중앙 영역(타이틀 + 설명 + 칩/선택)
  centerBlock: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center', // 화면 정가운데
    paddingBottom: 24,
  },

  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 10,
  },
  desc: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 26, // 요청: DESC 상하 마진 추가
  },

  // 톤(문체) 전체폭 아이템
  toneWrap: {
    width: '86%',
    gap: 14,
    marginTop: 4,
  },
  toneItem: {
    height: 54,
    borderRadius: 28,
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  toneLabel: {
    fontSize: 16,
    fontWeight: '700',
  },

  // 하단 버튼
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingBottom: 24,
  },
  prevBtn: {
    width: 100,
    height: 54,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  prevText: { color: '#fff', fontSize: 16, fontWeight: '700' },

  nextBtn: {
    flex: 1,
    marginLeft: 16,
    height: 54,
    borderRadius: 22,
    backgroundColor: '#D6F24A', // 라임(디자인 톤)
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextText: { color: '#111', fontSize: 18, fontWeight: '800' },
});
