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
import DeleteIcon from '../generic/DeleteIcon/DeleteIcon';
import {MenuItem} from 'react-bootstrap';


const Topic = ({ styles, questionId, topic, onDeleteTopic, strength, isInput, followTopic, unfollowTopic, linkApproved, approveQuestionTopicLink, unapproveQuestionTopicLink }) => {
  return isInput ?
    <div className={styles.topic}>
      {formatTopic(topic.name)}
      <DeleteIcon onDelete={() => {console.log(topic); onDeleteTopic(topic.id)} }/>
    </div> :

    <div className={styles.topic}>
      <Dropdown

        id={topic.id}
        title={formatTopic(topic.name)}
        fontSize={15}
      >
        <FollowTopic
          topicId={topic.id}
          canFollow={!topic.followedByCurrentUser}
          followTopic={followTopic}
          unfollowTopic={unfollowTopic}/>
        <ApproveLink
          approval={strength}
          questionId={questionId}
          canApprove={!linkApproved}
          approveLink={approveQuestionTopicLink}
          unapproveLink={unapproveQuestionTopicLink}
          topicId={topic.id}/>
        <Incentivise topicId={topic.id}/>
        <ViewTopic topicId={topic.id}/>
      </Dropdown>
      <Count amount={strength} toolTipMessage=" Approved Links"/>

    </div>;
};

function formatTopic(topic) {
  return topic.replace(/\b\w/g, l => l.toUpperCase())
}

Topic.propTypes = {
  styles: PropTypes.shape({}),
  topic: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  strength: PropTypes.number
};

export default Topic