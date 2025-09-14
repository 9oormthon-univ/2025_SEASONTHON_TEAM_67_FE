// src/screens/OnboardingScreen.js
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
  const [step, setStep] = useState(1);
  const [moreTopics, setMoreTopics] = useState([]);
  const [lessTopics, setLessTopics] = useState([]);
  const [tone, setTone] = useState(null);

  const ALL_TOPICS = [
    '정치사회', '경제', '국제', 'IT/과학',
    '문화', '스포츠', '환경', '교육',
  ];

  const step1Options = useMemo(
      () => ALL_TOPICS.filter(t => !lessTopics.includes(t)),
      [ALL_TOPICS, lessTopics],
  );

  const step2Options = useMemo(
      () => ALL_TOPICS.filter(t => !moreTopics.includes(t)),
      [ALL_TOPICS, moreTopics],
  );

  // 3단계 진행도 - 4번째(완료) 화면은 바 숨김
  const currentStepForBar = step > 3 ? 3 : step; // 1..3

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
          {step <= 3 && <ProgressBar current={currentStepForBar} total={3} />}

          <ScrollView
              contentContainerStyle={styles.centerBlock}
              showsVerticalScrollIndicator={false}
          >
            {step === 1 && (
                <>
                  <View style={[styles.headerBlock, {position: 'absolute', top: '20%'}]}>
                    <Text style={styles.title}>
                      자주 보고 싶은 주제를{'\n'}선택해주세요
                    </Text>
                    <Text style={styles.desc}>
                      선택한 주제를 더 자주 보여드릴게요
                    </Text>
                  </View>
                  <View style={styles.chipsBlock}>
                    <ChoiceChips
                        options={step1Options}
                        selected={moreTopics}
                        onToggle={toggle(moreTopics, setMoreTopics)}
                        accent="#E1F738"
                    />
                  </View>
                </>
            )}

            {step === 2 && (
                <>
                  <View style={[styles.headerBlock, {position: 'absolute', top: '20%'}]}>
                    <Text style={styles.title}>
                      적게 보고 싶은 주제를{'\n'}선택해주세요
                    </Text>
                    <Text style={styles.desc}>
                      선택한 주제는 더 적게 보여드릴게요
                    </Text>
                  </View>
                  <View style={styles.chipsBlock}>
                    <ChoiceChips
                        options={step2Options}
                        selected={lessTopics}
                        onToggle={toggle(lessTopics, setLessTopics)}
                        accent="#FFC891"
                    />
                  </View>
                </>
            )}

            {step === 3 && (
              <>
                <View style={[styles.headerBlock, {position: 'absolute', top: '20%'}]}>
                  <Text style={styles.title}>
                    어떤 문체로 뉴스를{'\n'}보여드릴까요?
                  </Text>
                  <Text style={styles.desc}>원하는 톤을 선택해주세요</Text>
                </View>

                <View style={styles.toneWrap}>
                  <View style={{ width: '86%', maxWidth: 360 }}>
                    {['사회', '정치사회', '경제'].map((label, idx) => {
                      const active = tone === label;
                      return (
                        <TouchableOpacity
                          key={label}
                          style={[
                            styles.toneItem,
                            idx > 0 && { marginTop: 12 },
                            {
                              backgroundColor: active ? '#fff' : 'rgba(0,0,0,0.35)',
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
                </View>
              </>
            )}

            {step === 4 && (
                <>
                  <Text style={styles.title}>이제 뉴스를 보러 가볼까요?</Text>
                  <Text style={styles.desc}>선호 설정이 완료되었어요</Text>
                </>
            )}
          </ScrollView>

          {/* 하단 버튼 */}
          <View style={styles.footer}>
            {step !== 1 && step !== 4 && (
                <TouchableOpacity
                    onPress={goPrev}
                    style={styles.prevBtn}
                >
                  <Text style={styles.prevText}>이전</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity
                onPress={() => {
                  if (step < 4) return goNext();
                  navigation.replace('CardScreen');
                }}
                style={[
                  styles.nextBtn,
                  (step === 1 || step === 4) && { flex: 1, marginLeft: 0, width: '100%' },
                ]}
            >
              <Text style={styles.nextText}>
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
  centerBlock: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 24,
  },
  headerBlock: {
    alignItems: 'center',
    marginTop: -40,
  },
  chipsBlock: {
    position: 'absolute',
    //bottom: '20%',
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 30,
  },
  desc: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 16,
  },
  toneWrap: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
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
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingBottom: 24,
  },
  prevBtn: {
    width: 100,
    height: 54,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prevText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  nextBtn: {
    flex: 1,
    marginLeft: 16,
    height: 54,
    borderRadius: 22,
    backgroundColor: '#fff', // ✅ 버튼 흰색
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextText: { color: '#111', fontSize: 18, fontWeight: '800' },
});
