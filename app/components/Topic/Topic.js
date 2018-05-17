/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from '../generic/Dropdown/Dropdown';
import Count from '../generic/Count/Count';
import FollowTopic from './MenuItems/FollowTopic';
import ApproveLink from './MenuItems/ApproveLink';
import Incentivise from './MenuItems/Incentivise';
import ViewTopic from './MenuItems/ViewTopic';

const Topic = ({styles, topic, strength}) =>
  <div className={styles.topic}>
    <Dropdown
      title={topic.name}
      >
      <FollowTopic topicId={topic.id}/>
      <ApproveLink topicId={topic.id}/>
      <Incentivise topicId={topic.id}/>
      <ViewTopic topicId={topic.id}/>
    </Dropdown>
    <Count amount={strength}/>

  </div>;

Topic.propTypes = {
  styles: PropTypes.shape({}),
  topic: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  strength: PropTypes.number.isRequired
};

export default Topic;