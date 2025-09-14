// src/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import SettingScreen from './screens/SettingScreen';
import CardScreen from './screens/CardScreen';
import ChatScreen from './screens/ChatScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="BookmarkScreen" component={BookmarkScreen} />
          <Stack.Screen name="SettingScreen" component={SettingScreen} />
          <Stack.Screen
            name="CardScreen"
            component={CardScreen}
            options={{ animation: 'slide_from_bottom' }} //이동 시 아래에서 위로 올라옴
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{
              presentation: 'transparentModal', // 이전 화면이 배경에 깔림
              animation: 'fade', //  애니메이션도 자연스럽게
              cardStyle: { backgroundColor: 'rgba(28,26,47,0.95)' }, // (선택) 반투명 배경
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
