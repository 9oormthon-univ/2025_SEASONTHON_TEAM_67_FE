import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import NewsComponent from './NewsComponent';
// import FeedFooter from './FeedFooter';
import FeedSideBar from './FeedSideBar';
import FeedHeader from './FeedHeader';

// const FeedRow = ({data, index, visible, isVisible, isNext}) => {
const FeedRow = () => {
  return (
    <View>
      <NewsComponent />
      {/* <NewsComponent data={data} isNext={isNext} isVisible {isVisible} /> */}
      <FeedHeader />
      <FeedSideBar />
      {/* <FeedFooter data={data} /> */}
    </View>
  );
};

export default FeedRow;
