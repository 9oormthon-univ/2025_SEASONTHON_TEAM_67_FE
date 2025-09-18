# 2025_SEASONTHON_TEAM_67_FE

## 프로젝트 소개
2025_SEASONTHON_TEAM_67_FE는 React Native 기반의 SBS 뉴스 요약 및 AI 챗봇 기능을 제공하는 모바일 앱 프론트엔드 프로젝트입니다.

---

## 폴더 구조

```
src/
├── App.js                         // 앱 진입점, 네비게이션 및 전역 설정
├── assets                        // 정적 자원 모음
│   ├── dummydata.js              // 임시 뉴스/테스트용 데이터
│   ├── fonts                     // Pretendard 폰트 파일 모음
│   └── images                    // 화면별 이미지 자원들
│       ├── BookmarkScreen        // 북마크 화면 관련 이미지
│       ├── CardScreen            // 카드뉴스 관련 아이콘들 (AI, 북마크, 공유 등)
│       ├── ChatScreen            // 채팅 입력용 화살표 아이콘
│       ├── Common                // 공통 아이콘 (로고, GPT, 배경 등)
│       ├── HomeScreen            // 홈화면 아이콘 및 배경
│       ├── LoginScreen           // 카카오 로그인용 아이콘
│       ├── OnboardingScreen      // 온보딩 배경 이미지
│       ├── SettingScreen         // 설정 화면 아이콘 (깃허브, 이메일 등)
│       └── SplashScreen          // 스플래시 화면 이미지
├── components                    // 재사용 가능한 컴포넌트들
│   ├── BookmarkScreen
│   │   └── Bookmark.js           // 북마크된 뉴스 렌더링 컴포넌트
│   ├── CardScreen
│   │   ├── ContentWrapper.js     // 뉴스 내용 감싸는 UI 래퍼
│   │   ├── FeedFooter.js         // 퀴즈/뉴스 하단 공유, 북마크 UI
│   │   ├── FeedSideBar.js        // 뉴스 좌측에 GPT, 퀴즈 등 사이드 버튼
│   │   ├── NewsComponent.js      // 뉴스 카드 자체를 구성하는 컴포넌트
│   │   ├── QuizComponent.js      // GPT 기반 뉴스 퀴즈 컴포넌트
│   │   └── Scroll.js             // 카드 스크롤 뷰 (FlatList 래퍼 등)
│   ├── ChatScreen
│   │   ├── ChatWrapper.js        // 채팅창 전체 UI
│   │   └── InputBar.js           // 채팅 입력창 UI
│   ├── Common
│   │   ├── GradientFooter.js     // 공통 하단 그라디언트
│   │   ├── ToastAlert.js         // 커스텀 토스트 알림
│   │   ├── apiClient.js          // API 호출 공통 클라이언트
│   │   ├── back_arrow.js         // 뒤로가기 화살표 아이콘 컴포넌트
│   │   └── gradientBg.js         // 공통 배경 그라디언트
│   ├── HomeScreen
│   │   └── Cardnews.js           // 홈화면의 카드뉴스 미리보기
│   ├── LoginScreen
│   │   └── KakaologinButton.js   // 카카오 로그인 버튼
│   ├── OnboardingScreen
│   │   ├── ChoiceChips.js        // 온보딩 질문 선택용 칩 UI
│   │   └── ProgressBar.js        // 온보딩 단계 프로그래스바
│   ├── SettingScreen             // (파일 없음, 향후 설정용 컴포넌트 예정?)
│   └── SplashScreen
│       └── KakaologinButton.js   // 스플래시용 로그인 버튼 (재사용)
├── screens                       // 화면 단위 컴포넌트
│   ├── BookmarkScreen.js         // 북마크 뉴스 리스트 화면
│   ├── CardScreen.js             // 뉴스 카드 상세 뷰 화면
│   ├── ChatScreen.js             // GPT와의 채팅 화면
│   ├── HomeScreen.js             // 뉴스 카드 리스트 홈화면
│   ├── LoginScreen.js            // 로그인 선택/진입 화면
│   ├── OnboardingScreen.js       // 관심사 선택 등 온보딩 화면
│   ├── SettingScreen.js          // 설정 화면
│   └── SplashScreen.js           // 앱 로딩 스플래시 화면
├── services                      // 비즈니스 로직 및 외부 연동
│   ├── apiClient.js              // fetch wrapper 및 공통 API 설정
│   └── auth
│       └── kakaoauth.js          // 카카오 로그인 처리 모듈
├── styles                        // 전역 스타일 관리
│   ├── colors.js                 // 컬러 팔레트
│   ├── fonts.js                  // 폰트 로딩 및 설정
│   └── textStyles.js             // 텍스트 스타일 모음
└── utils
    └── authStorage.js            // 토큰 저장/로드 등 로그인 유틸
```

---

## 주요 기능

- **뉴스 카드/퀴즈 카드 스크롤**: 최신 뉴스와 퀴즈를 카드 형태로 스크롤하며 탐색
- **AI 챗봇**: 뉴스별로 AI와 대화하며 요약, 질의응답, 토론 가능
- **북마크/스크랩**: 관심 뉴스 저장 및 관리
- **카카오 로그인**: 카카오 계정으로 간편 로그인
- **온보딩/스플래시**: 앱 첫 실행 시 온보딩 및 스플래시 화면 제공

---

## 개발 환경

- **React Native** 0.81.x
- **React** 19.x
- **react-navigation** 기반 화면 이동
- **react-native-safe-area-context**로 iOS/Android 안전 영역 대응
- **react-native-linear-gradient**, **react-native-community/blur** 등 UI 효과

---

## 실행 방법

1. **패키지 설치**
   ```
   npm install
   ```

2. **앱 실행**
   - Android:  
     ```
     npm run android
     ```
   - iOS:  
     ```
     npm run ios
     ```

---

## 기타 참고

- API 연동은 `src/services/apiClient.js` 및 `src/components/Common/apiClient.js`에서 관리
- 폰트 및 이미지 리소스는 `src/assets/` 하위에 위치
- 공통 컴포넌트는 `src/components/Common/`에서 관리
