import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <SafeAreaView style={s.wrap}>
      <Text style={s.title}>LoginScreen</Text>
      <TouchableOpacity style={s.btn} onPress={() => navigation.replace('HomeScreen')}>
        <Text style={s.btnText}>홈으로</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  wrap:{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'},
  title:{fontSize:28,fontWeight:'800',marginBottom:24},
  btn:{backgroundColor:'#111827',paddingVertical:12,paddingHorizontal:20,borderRadius:12},
  btnText:{color:'#fff',fontWeight:'700'}
});
