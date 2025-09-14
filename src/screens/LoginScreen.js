// src/screens/LoginScreen.js
import React, { useState, useMemo } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  StatusBar,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { apiFetch } from '../components/Common/apiClient';
import { setAccessToken, setUserInfo } from '../utils/authStorage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const canSubmit = useMemo(() => email.trim() && password.trim(), [email, password]);

  const onSubmit = async () => {
    if (!canSubmit || submitting) return;
    try {
      setSubmitting(true);
      setError('');

      const { result } = await apiFetch('/api/users/local/login', {
        method: 'POST',
        body: { email, password }, // { email, password }
      });

      // 토큰/유저 저장
      if (result?.accessToken) await setAccessToken(result.accessToken);
      await setUserInfo({ id: result?.id, email: result?.email, name: result?.name });

      // 이동
      navigation.replace('OnboardingScreen'); // 원하는 첫 화면으로
    } catch (e) {
      setError(String(e?.message || '로그인에 실패했습니다.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/SplashScreen/background.png')}
      style={s.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={s.wrap}>
        <StatusBar barStyle="light-content" />

        <KeyboardAvoidingView
          style={s.wrap}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={s.center}>
            {/* 브랜드 */}
            <Text style={s.brandTitle}>OHNEW</Text>
            <Text style={s.brandSub}>뉴스를 보는 새로운 방법</Text>

            {/* 폼 */}
            <View style={s.formCard}>
              <TextInput
                style={s.input}
                placeholder="이메일"
                placeholderTextColor="rgba(255,255,255,0.6)"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
              />
              <TextInput
                style={[s.input, { marginTop: 12 }]}
                placeholder="비밀번호"
                placeholderTextColor="rgba(255,255,255,0.6)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              {/* 에러 */}
              {error && <Text style={s.errorText}>{error}</Text>}

              <TouchableOpacity
                activeOpacity={0.85}
                style={[s.loginBtn, (!canSubmit || submitting) && s.loginBtnDisabled]}
                onPress={onSubmit}
                disabled={!canSubmit || submitting}
              >
                {submitting ? (
                  <ActivityIndicator color="#111827" />
                ) : (
                  <Text style={s.loginBtnText}>로그인</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const s = StyleSheet.create({
  bg: { flex: 1 },
  wrap: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  brandTitle: { fontSize: 40, fontWeight: '900', color: '#E1F738', marginBottom: 8 },
  brandSub: { fontSize: 16, fontWeight: '600', color: '#fff', marginBottom: 24 },

  formCard: { width: '85%', alignItems: 'center' },
  input: {
    width: '100%',
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(255,255,255,0.12)',
    color: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
  },
  errorText: { color: '#ffd1d1', marginTop: 10, alignSelf: 'flex-start' },

  loginBtn: {
    marginTop: 16,
    width: '100%',
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E1F738',
  },
  loginBtnDisabled: { opacity: 0.5 },
  loginBtnText: { color: '#111827', fontWeight: '800', fontSize: 16 },
});
