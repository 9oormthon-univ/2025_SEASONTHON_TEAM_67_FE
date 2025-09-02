import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, View } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={s.wrap}>
      <Text style={s.title}>HomeScreen</Text>
      <View style={s.row}>
        <TouchableOpacity style={s.btn} onPress={() => navigation.navigate('CardScreen')}>
          <Text style={s.btnText}>Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.btn} onPress={() => navigation.navigate('BookmarkScreen')}>
          <Text style={s.btnText}>Bookmark</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.btn} onPress={() => navigation.navigate('SettingScreen')}>
          <Text style={s.btnText}>Setting</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  wrap:{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',padding:20},
  title:{fontSize:28,fontWeight:'800',marginBottom:20},
  row:{width:'100%',gap:12},
  btn:{backgroundColor:'#111827',paddingVertical:14,borderRadius:12,alignItems:'center'},
  btnText:{color:'#fff',fontWeight:'700'}
});
