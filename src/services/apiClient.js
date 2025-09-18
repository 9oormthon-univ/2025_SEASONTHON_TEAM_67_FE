// src/services/apiClient.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE = 'https://hsmyspace.site';
const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';
const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';
const LOGIN_PATH = '/api/users/kakao-login';

// ✅ 메모리 캐시: 저장 직후 레이스 방지
let accessTokenCache = null;
let refreshTokenCache = null;

export async function setTokens({ accessToken, refreshToken }) {
  if (accessToken) {
    accessTokenCache = accessToken;
    console.log('📦 저장할 JWT:', accessToken);
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }
  if (refreshToken) {
    refreshTokenCache = refreshToken;
    console.log('📦 저장할 RefreshToken:', refreshToken);
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
  console.log('✅ 로그인 성공, JWT 저장 완료');
}

export async function getStoredAccessToken() {
  if (accessTokenCache) {
    console.log('[apifetch] Using cached Access Token');
    return accessTokenCache;
  }
  const t = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  accessTokenCache = t || null;
  console.log('[apifetch] Access Token:', t);
  return t;
}

export async function getStoredRefreshToken() {
  if (refreshTokenCache) return refreshTokenCache;
  const t = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
  refreshTokenCache = t || null;
  return t;
}

export async function clearTokens() {
  accessTokenCache = null;
  refreshTokenCache = null;
  await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
  console.log('🗑️ 토큰 삭제 완료');
}

// 공통 fetch: 로그인 API만 Authorization 제외
export async function apiFetch(path, options = {}) {
  const url = path.startsWith('http') ? path : `${BASE}${path}`;
  const needAuth = options.auth === 'none' ? false : (path !== LOGIN_PATH);

  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };

  if (needAuth) {
    const token = await getStoredAccessToken();
    if (!token) {
      // 토큰이 아직 없는 상태면 바로 Unauthorized로 처리해 화면단에서 로그인으로 보내게 함
      throw new Error('Unauthorized');
    }
    headers.Authorization = `Bearer ${token}`; // 서버가 Bearer 스킴을 원함
  }

  console.log('➡️ API 요청:', url, headers);

  const res = await fetch(url, { ...options, headers });

  if (res.status === 401) {
    await clearTokens();
    throw new Error('Unauthorized');
  }
  return res;
}

export async function apiFetchJson(path, options = {}) {
  const res = await apiFetch(path, options);
  let json;
  try {
    json = await res.json();
  } catch {
    throw new Error(`HTTP ${res.status}`);
  }
  if (!res.ok) throw new Error(json?.message || `HTTP ${res.status}`);
  return json;
}

// 로그인: Authorization 절대 붙이면 안 됨
export async function postKakaoLogin(kakaoAccessToken) {
  const json = await apiFetchJson(LOGIN_PATH, {
    method: 'POST',
    auth: 'none',
    body: JSON.stringify({ accessToken: kakaoAccessToken }),
  });

  const serviceAccessToken = json?.result?.accessToken;
  const refreshToken = json?.result?.refreshToken;

  if (!serviceAccessToken) throw new Error('❌ 서버에서 JWT 안 내려옴');

  await setTokens({ accessToken: serviceAccessToken, refreshToken });
  return json?.result;
}
