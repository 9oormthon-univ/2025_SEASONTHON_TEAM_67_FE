// src/services/auth/kakaoAuth.js
import { login, loginWithKakaoTalk, getAccessToken } from '@react-native-seoul/kakao-login';

export async function kakaoSdkLogin() {
  // 1) 카카오톡 앱으로 우선 로그인 시도 → 실패 시 계정(웹) 로그인
  try {
    const token = await loginWithKakaoTalk();
    return token?.accessToken;
  } catch {
    const token = await login();
    return token?.accessToken;
  }
}

export async function getKakaoAccessTokenIfAny() {
  try {
    const t = await getAccessToken();
    return t?.accessToken ?? null;
  } catch {
    return null;
  }
}
