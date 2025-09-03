import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const FeedFooter = () => {
  return (
    <>
      {/* <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(22,22,22,0.6)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.controlsContainer}
      /> */}
    </>
  );
};

export default FeedFooter;

const styles = StyleSheet.create({
  controlsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
  },
});
