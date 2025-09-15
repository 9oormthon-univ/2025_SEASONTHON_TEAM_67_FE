import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import colors from '../../styles/colors';

const ToastAlert = ({
  message,
  visible = !!message,
  onClose,
  duration = 2000,
  marginTop = 40,
}) => {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    if (visible && message) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [visible, message, onClose, duration]);

  if (!show) return null;
  return (
    <Modal transparent animationType="fade" visible={show} pointerEvents="none">
      <View style={[s.absoluteWrapper, { marginTop }]}>
        <View style={s.toast}>
          <Text style={s.text}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const s = StyleSheet.create({
  absoluteWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  toast: {
    backgroundColor: colors.white000,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    opacity: 0.95,
    shadowColor: colors.white000,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 2,
    shadowRadius: 10,
    elevation: 10,
    marginTop: 0,
  },
  text: {
    color: colors.black000,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ToastAlert;
