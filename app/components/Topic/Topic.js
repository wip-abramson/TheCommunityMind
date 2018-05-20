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

const Topic = ({ styles, topic, strength, isInput }) => {
  const view = isInput ?
    <div className={styles.topic}>
      {topic.name}
    </div> :

    <div className={styles.topic}>
      <Dropdown
        id={topic.id}
        title={formatTopic(topic.name)}
        fontSize={15}
      >
        <FollowTopic topicId={topic.id}/>
        <ApproveLink topicId={topic.id}/>
        <Incentivise topicId={topic.id}/>
        <ViewTopic topicId={topic.id}/>
      </Dropdown>
      <Count amount={strength}/>

    </div>;

  return view;
};

function formatTopic(topic) {
  return topic.replace(/\w\S*/g, function(txt){
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

Topic.propTypes = {
  styles: PropTypes.shape({}),
  topic: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  strength: PropTypes.number
};

export default Topic;