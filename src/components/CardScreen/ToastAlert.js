import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../styles/colors';

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
    top: 200,
    left: 0,
    right: 0,
    backgroundColor: colors.white000,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    zIndex: 999,
    marginHorizontal: 8,
    alignSelf: 'center',
    opacity: 0.95,
    shadowColor: colors.white000,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 2,
    shadowRadius: 10,
    elevation: 10,
    opacity: 0.8,
  },
  text: {
    color: colors.black000,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ToastAlert;
