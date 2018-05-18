/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';


import styles from './styles.css';

import Topic from '../Topic/Topic';
import TopicInput from './components/TopicInput';
import LoadMoreTopics from './components/LoadMoreTopics';



const TopicsBar = ({ topics, hasMoreTopics, onAddTopic, isInput }) =>

  <div className={styles.topicsBar}>
    <div className={styles.topics}>
      {topics.map(topic => { console.log(topic); return <Topic topic={topic} strength={21} styles={styles} isInput={isInput}/>;})}
    </div>
    <LoadMoreTopics isMore={hasMoreTopics}/>
    <TopicInput onAddTopic={onAddTopic}/>
  </div>;



// class TopicsBar extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//
//
//   render() {
//     return (
//       <div className={styles.topicsBar}>
//         <div className={styles.topics}>
//           {this.props.topics.map(topic => <Topic topic={topic} strength={21} styles={styles}/>)}
//         </div>
//         <LoadMoreTopics isMore={this.props.hasMoreTopics}/>
//         <TopicInput addTopic={}/>
//       </div>
//     )
//   }
// }

TopicsBar.propTypes = {
  topics: PropTypes.array.isRequired,
  hasMoreTopics: PropTypes.bool.isRequired,
  onAddTopic: PropTypes.func.isRequired,
  isInput: PropTypes.func.isRequired
};

export default TopicsBar;