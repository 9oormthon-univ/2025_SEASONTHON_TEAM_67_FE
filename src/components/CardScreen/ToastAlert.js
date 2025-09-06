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
    top: 170,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(225, 247, 56, 0.9)',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    zIndex: 999,
    marginHorizontal: 10,
    alignSelf: 'center',
    opacity: 0.95,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    color: '#222',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ToastAlert;
