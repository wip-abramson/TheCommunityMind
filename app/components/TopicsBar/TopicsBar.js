/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

import Topic from '../Topic/Topic';
import TopicInput from './components/TopicInput';
import LoadMoreTopics from './components/LoadMoreTopics';

const TopicsBar = ({ topics, hasMoreTopics }) =>

  <div className={styles.topicsBar}>
    <div className={styles.topics}>
      {topics.map(topic => <Topic topic={topic} strength={21} styles={styles}/>)}
    </div>
    <LoadMoreTopics isMore={hasMoreTopics}/>
    <TopicInput/>
  </div>;

TopicsBar.propTypes = {
  topics: PropTypes.array.isRequired,
  hasMoreTopics: PropTypes.bool.isRequired
};

export default TopicsBar;