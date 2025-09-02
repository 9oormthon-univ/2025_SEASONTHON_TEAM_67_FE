import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SplashScreen({ navigation }) {
  return (
    <SafeAreaView style={s.wrap}>
      <Text style={s.title}>SplashScreen</Text>
      <TouchableOpacity style={s.btn} onPress={() => navigation.replace('LoginScreen')}>
        <Text style={s.btnText}>시작하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  wrap:{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'},
  title:{fontSize:32,fontWeight:'800',marginBottom:24},
  btn:{backgroundColor:'#111827',paddingVertical:12,paddingHorizontal:20,borderRadius:12},
  btnText:{color:'#fff',fontWeight:'700'}
});
