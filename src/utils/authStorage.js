// src/utils/authStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN_KEY = 'ohnew/accessToken';
const USER_INFO_KEY = 'ohnew/userInfo'; // 필요시 사용자 정보도 저장

export async function setAccessToken(token) {
  await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export async function getAccessToken() {
  return AsyncStorage.getItem(ACCESS_TOKEN_KEY);
}

export async function clearAccessToken() {
  await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
}

export async function setUserInfo(infoObj) {
  await AsyncStorage.setItem(USER_INFO_KEY, JSON.stringify(infoObj ?? {}));
}

export async function getUserInfo() {
  const raw = await AsyncStorage.getItem(USER_INFO_KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function clearUserInfo() {
  await AsyncStorage.removeItem(USER_INFO_KEY);
}
