import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ToastAlert = ({ message }) => {
  if (!message) return null;
  return (
    <View style={styles.toast}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(225, 247, 56, 0.3)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    zIndex: 999,
    marginHorizontal: 24,
    alignSelf: 'center',
    opacity: 0.95,
  },
  text: {
    color: '#222',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ToastAlert;
