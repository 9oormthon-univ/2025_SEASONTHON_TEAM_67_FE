import { StyleSheet, View, Text } from 'react-native';

import React from 'react';
import ContentComponent from './ContentComponent';
import QuizComponent from './QuizComponent';
import FeedFooter from './FeedFooter';
import FeedSideBar from './FeedSideBar';

const FeedRow = ({ data }) => {
  return (
    <View>
      <ContentComponent data={data} />
      <FeedSideBar />
      <FeedFooter data={data} />
    </View>
  );
};

export default FeedRow;
