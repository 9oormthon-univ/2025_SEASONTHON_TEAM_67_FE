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
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProgressBar from '../components/OnboardingScreen/ProgressBar';
import ChoiceChips from '../components/OnboardingScreen/ChoiceChips';
import { apiFetchJson, clearTokens } from '../services/apiClient';

export default function OnboardingScreen({ navigation }) {
  const [step, setStep] = useState(1);
  const [moreTopics, setMoreTopics] = useState([]);
  const [lessTopics, setLessTopics] = useState([]);
  const [tone, setTone] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const ALL_TOPICS = [
    '정치', '경제', '사회', '국제',
    '연예', '스포츠', '생활', '문화',
  ];

  const TONE_OPTIONS = [
    { label: '간결한 스타일', code: 'CONCISE' },
    { label: '친근한 스타일', code: 'FRIENDLY' },
    { label: '사실 중심적인 스타일', code: 'NEUTRAL' },
  ];

  const TOPIC_ICON = {
    '정치': '🏛️',
    '경제': '💹',
    '사회': '🧑‍🤝‍🧑',
    '국제': '🌍',
    '연예': '🎬',
    '스포츠': '🏅',
    '생활': '🏠',
    '문화': '🎨',
  };
  const toDisplay = (t) => `${TOPIC_ICON[t] || ''} ${t}`.trim();
  const toBase = (label) => {
    if (ALL_TOPICS.includes(label)) return label; // already base
    const firstSpace = label.indexOf(' ');
    return firstSpace > 0 ? label.slice(firstSpace + 1) : label;
  };

  const step1Options = useMemo(
    () => ALL_TOPICS.filter(t => !lessTopics.includes(t)),
    [ALL_TOPICS, lessTopics],
  );

  const step2Options = useMemo(
    () => ALL_TOPICS.filter(t => !moreTopics.includes(t)),
    [ALL_TOPICS, moreTopics],
  );

  const step1OptionsDisplay = useMemo(
    () => step1Options.map(toDisplay),
    [step1Options]
  );
  const step2OptionsDisplay = useMemo(
    () => step2Options.map(toDisplay),
    [step2Options]
  );

  const currentStepForBar = step > 3 ? 3 : step;

  const toggle = (selected, setter, max = Infinity) => label => {
    if (selected.includes(label)) {
      setter(selected.filter(x => x !== label));
    } else {
      if (selected.length >= max) return; // enforce max selections
      setter([...selected, label]);
    }
  };

  const toggleTopic = (selectedBase, setter, max = Infinity) => (displayLabel) => {
    const base = toBase(displayLabel);
    if (selectedBase.includes(base)) {
      setter(selectedBase.filter(x => x !== base));
    } else {
      if (selectedBase.length >= max) return;
      setter([...selectedBase, base]);
    }
  };

  const goNext = () => setStep(prev => Math.min(prev + 1, 4));
  const goPrev = () => setStep(prev => Math.max(prev - 1, 1));

  const canNext = useMemo(() => {
    if (step === 1) return moreTopics.length > 0;      // at least 1
    if (step === 2) return true;                       // optional
    if (step === 3) return tone !== null;              // required
    if (step === 4) return true;                       // submit screen
    return false;
  }, [step, moreTopics, tone]);

  const handleSubmit = async () => {
    setLoading(true);
    setErrMsg('');
    try {
      const body = {
        preferredStyle: tone, // "CONCISE" | "FRIENDLY" | "NEUTRAL"
        likedTags: moreTopics,
        blockedTags: lessTopics,
      };
      const json = await apiFetchJson('/api/users/preferences/news', {
        method: 'PUT',
        body: JSON.stringify(body),
      });
      console.log('✅ 선호 저장 성공:', json.result);
      navigation.replace('CardScreen');
    } catch (e) {
      const msg = String(e?.message || '예기치 않은 오류');
      setErrMsg(msg);
      if (msg === 'Unauthorized' || msg.includes('401')) {
        try { await clearTokens(); } catch {}
        navigation.replace('LoginScreen');
      }
    } finally {
      setLoading(false);
    }
  };

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
              <View style={[styles.headerBlock, { position: 'absolute', top: '20%' }]}>
                <Text style={styles.title}>자주 보고 싶은 주제를{'\n'}선택해주세요</Text>
                <Text style={styles.desc}>3개까지 고를 수 있어요</Text>
              </View>
              <View style={styles.chipsBlock}>
                <ChoiceChips
                  options={step1OptionsDisplay}
                  selected={moreTopics.map(toDisplay)}
                  onToggle={toggleTopic(moreTopics, setMoreTopics, 3)}
                  accent="#E1F738"
                />
              </View>
            </>
          )}

          {step === 2 && (
            <>
              <View style={[styles.headerBlock, { position: 'absolute', top: '20%' }]}>
                <Text style={styles.title}>적게 보고 싶은 주제를{'\n'}선택해주세요</Text>
                <Text style={styles.desc}>3개까지 고를 수 있어요</Text>
              </View>
              <View style={styles.chipsBlock}>
                <ChoiceChips
                  options={step2OptionsDisplay}
                  selected={lessTopics.map(toDisplay)}
                  onToggle={toggleTopic(lessTopics, setLessTopics, 3)}
                  accent="#FFC891"
                />
              </View>
            </>
          )}

          {step === 3 && (
            <>
              <View style={[styles.headerBlock, { position: 'absolute', top: '20%' }]}>
                <Text style={styles.title}>어떤 문체로 뉴스를{'\n'}보여드릴까요?</Text>
                <Text style={styles.desc}>선택한 문체에 가깝게 자극도를 조절해요</Text>
              </View>

              <View style={styles.toneWrap}>
                <View style={{ width: '86%', maxWidth: 360 }}>
                  {TONE_OPTIONS.map((opt, idx) => {
                    const active = tone === opt.code;
                    return (
                      <TouchableOpacity
                        key={opt.code}
                        style={[
                          styles.toneItem,
                          idx > 0 && { marginTop: 12 },
                          {
                            backgroundColor: active ? '#fff' : 'rgba(0,0,0,0.35)',
                            borderColor: active ? 'transparent' : 'rgba(255,255,255,0.25)',
                          },
                        ]}
                        onPress={() => setTone(opt.code)}
                      >
                        <Text style={[styles.toneLabel, { color: active ? '#111' : '#fff' }]}>
                          {opt.label}
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
              {loading && <ActivityIndicator size="large" color="#fff" style={{ marginTop: 16 }} />}
              {errMsg ? <Text style={{ color: '#ffd1d1', marginTop: 16 }}>{errMsg}</Text> : null}
            </>
          )}
        </ScrollView>

        <View style={styles.footer}>
          {step !== 1 && step !== 4 && (
            <TouchableOpacity onPress={goPrev} style={styles.prevBtn}>
              <Text style={styles.prevText}>이전</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => {
              if (step < 4) return goNext();
              handleSubmit();
            }}
            style={[
              styles.nextBtn,
              (step === 1 || step === 4) && { flex: 1, marginLeft: 0, width: '100%' },
              !canNext && styles.nextBtnDisabled,
            ]}
            disabled={loading || !canNext}
          >
            <Text style={[styles.nextText, !canNext && styles.nextTextDisabled]}>{step === 4 ? '시작하기' : '다음'}</Text>
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
  headerBlock: { alignItems: 'center', marginTop: -40 },
  chipsBlock: { position: 'absolute', width: '100%', alignItems: 'center' },
  title: { color: '#fff', fontSize: 24, fontWeight: '800', textAlign: 'center', lineHeight: 30 },
  desc: { color: 'rgba(255,255,255,0.88)', fontSize: 15, textAlign: 'center', marginTop: 16 },
  toneWrap: { position: 'absolute', width: '100%', alignItems: 'center' },
  toneItem: {
    height: 54,
    borderRadius: 28,
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  toneLabel: { fontSize: 16, fontWeight: '700' },
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextBtnDisabled: {
    backgroundColor: '#ccc',
  },
  nextText: { color: '#111', fontSize: 18, fontWeight: '800' },
  nextTextDisabled: {
    color: '#888',
  },
});
