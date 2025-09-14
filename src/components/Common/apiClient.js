// src/components/Common/apiClient.js
import { getAccessToken } from '../../utils/authStorage';

const BASE_URL = 'https://hsmyspace.site';

export async function apiFetch(
  path,
  { method = 'GET', headers = {}, body } = {},
) {
  const token = await getAccessToken();
  console.log('[apifetch]Access Token:', token);
  // 백엔드가 'Bearer ' 없이 토큰만 기대하면 아래 그대로 사용.
  // 만약 Bearer 스킴이 필요하면 `Authorization: \`Bearer ${token}\`` 로 바꿔줘.
  const authHeader = token ? { Authorization: token } : {};

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...authHeader,
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : null;
  } catch (e) {
    throw new Error(
      `Response JSON parse failed: ${e.message}; body=${text?.slice(0, 300)}`,
    );
  }

  if (!res.ok || !json?.isSuccess) {
    const msg = json?.message || `HTTP ${res.status}`;
    const code = json?.code ? ` (${json.code})` : '';
    throw new Error(`${msg}${code}`);
  }

  return json; // { isSuccess, code, message, result }
}
