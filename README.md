# 2025_SEASONTHON_TEAM_67_FE

## 프로젝트 소개
2025_SEASONTHON_TEAM_67_FE는 React Native 기반의 SBS 뉴스 요약 및 AI 챗봇 기능을 제공하는 모바일 앱 프론트엔드 프로젝트입니다.

---

## 폴더 구조

```
src/
├── App.js
├── assets
│   ├── dummydata.js
│   ├── fonts
│   │   ├── Pretendard-Black.ttf
│   │   ├── Pretendard-Bold.ttf
│   │   ├── Pretendard-ExtraBold.ttf
│   │   ├── Pretendard-ExtraLight.ttf
│   │   ├── Pretendard-Light.ttf
│   │   ├── Pretendard-Medium.ttf
│   │   ├── Pretendard-Regular.ttf
│   │   ├── Pretendard-SemiBold.ttf
│   │   └── Pretendard-Thin.ttf
│   └── images
│       ├── BookmarkScreen
│       ├── CardScreen
│       │   ├── AI_icon.png
│       │   ├── bookmark.png
│       │   ├── chat.png
│       │   └── share.png
│       ├── ChatScreen
│       │   └── arrow_circle.png
│       ├── Common
│       │   ├── ChatGPT.png
│       │   ├── Icon_gbnam.jpg
│       │   ├── Icon_logo.png
│       │   ├── arrow.png
│       │   ├── background.png
│       │   └── sbs_icon.png
│       ├── HomeScreen
│       │   ├── Icon_Arrow.png
│       │   ├── Icon_Bookmark.png
│       │   ├── Icon_Settings.png
│       │   ├── Icon_gbnam.jpg
│       │   └── background.png
│       ├── LoginScreen
│       │   └── icon_kakao.svg
│       ├── OnboardingScreen
│       │   └── background.png
│       ├── SettingScreen
│       │   ├── Icon_Email.png
│       │   ├── Icon_Pencil.png
│       │   └── Icon_git.png
│       └── SplashScreen
│           ├── background.png
│           └── icon_kakao.svg
├── components
│   ├── BookmarkScreen
│   │   └── Bookmark.js
│   ├── CardScreen
│   │   ├── ContentWrapper.js
│   │   ├── FeedFooter.js
│   │   ├── FeedSideBar.js
│   │   ├── NewsComponent.js
│   │   ├── QuizComponent.js
│   │   └── Scroll.js
│   ├── ChatScreen
│   │   ├── ChatWrapper.js
│   │   └── InputBar.js
│   ├── Common
│   │   ├── GradientFooter.js
│   │   ├── ToastAlert.js
│   │   ├── apiClient.js
│   │   ├── back_arrow.js
│   │   └── gradientBg.js
│   ├── HomeScreen
│   │   └── Cardnews.js
│   ├── LoginScreen
│   │   └── KakaologinButton.js
│   ├── OnboardingScreen
│   │   ├── ChoiceChips.js
│   │   └── ProgressBar.js
│   ├── SettingScreen
│   └── SplashScreen
│       └── KakaologinButton.js
├── screens
│   ├── BookmarkScreen.js
│   ├── CardScreen.js
│   ├── ChatScreen.js
│   ├── HomeScreen.js
│   ├── LoginScreen.js
│   ├── OnboardingScreen.js
│   ├── SettingScreen.js
│   └── SplashScreen.js
├── services
│   ├── apiClient.js
│   └── auth
│       └── kakaoauth.js
├── styles
│   ├── colors.js
│   ├── fonts.js
│   └── textStyles.js
└── utils
    └── authStorage.js

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
