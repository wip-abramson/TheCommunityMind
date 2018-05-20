/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';


import styles from './styles.css';

import Topic from '../Topic/Topic';
import TopicInput from './components/TopicInput';
import LoadMoreTopics from './components/LoadMoreTopics';



const TopicsBar = ({ topicLinks, hasMoreTopics, onAddTopic, isInput }) =>
{
  return (
    <div className={styles.topicsBar}>
      <div className={styles.topics}>
      {topicLinks.map(topicLink => <Topic key={topicLink.topic.id} topic={topicLink.topic} strength={topicLink.approval} styles={styles} isInput={isInput}/>)}
      </div>
      <LoadMoreTopics isMore={hasMoreTopics}/>
      {isInput ? <TopicInput onEnter={onAddTopic}/>
        : <div className={styles.topicInputContainer}/>}
    </div>
  )
}




TopicsBar.propTypes = {
  topicLinks: PropTypes.array.isRequired,
  hasMoreTopics: PropTypes.bool.isRequired,
  onAddTopic: PropTypes.func,
  isInput: PropTypes.bool.isRequired
};

export default TopicsBar;