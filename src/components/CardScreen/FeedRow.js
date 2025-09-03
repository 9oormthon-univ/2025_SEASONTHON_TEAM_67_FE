import { View } from 'react-native';
import ContentComponent from './ContentComponent';
import FeedFooter from './FeedFooter';
import FeedSideBar from './FeedSideBar';

const FeedRow = ({ data }) => {
  return (
    <View>
      <ContentComponent data={data} />
      <FeedSideBar data={data} />
      <FeedFooter data={data} />
    </View>
  );
};

export default FeedRow;
