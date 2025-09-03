import { StyleSheet, View, Text } from 'react-native';

import React from 'react';
import NewsComponent from './NewsComponent';
import FeedFooter from './FeedFooter';
import FeedSideBar from './FeedSideBar';
import QuizComponent from './QuizComponent';

const FeedRow = ({ data }) => {
  const showQuiz = Math.random() < 0.5;

  return (
    <View>
      {showQuiz ? <QuizComponent data={data} /> : <NewsComponent data={data} />}
      <FeedSideBar />
      <FeedFooter />
    </View>
  );
};

export default FeedRow;
