/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import styles from './styles.css';

import Topic from '../Topic/Topic';
import TopicInput from './components/TopicInput';
import LoadMoreTopics from './components/LoadMoreTopics';

import Notifications from 'react-notification-system-redux';
import { unauthorizedErrorNotification } from '../../notifications/error.notifications';

import FOLLOW_TOPIC_MUTATION from '../../graphql/mutations/followTopic.mutation';
import UNFOLLOW_TOPIC_MUTATION from '../../graphql/mutations/unfollowTopic.mutation';
import APPROVE_QUESTION_TOPIC_LINK_MUTATION from '../../graphql/mutations/approveQuestionTopicLink.mutation';
import UNAPPROVE_QUESTION_TOPIC_LINK_MUTATION from '../../graphql/mutations/unapproveQuestionTopicLink.mutation';


const mapDispatchToProps = function (dispatch) {
  return {
    unAuthorized: () => {
      console.log("DISPATCH UNAUTHORIZED")
      dispatch(Notifications.error(unauthorizedErrorNotification))
    },
  }
};


const followTopic = graphql(FOLLOW_TOPIC_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    followTopic: (topicId) => {
      console.log("Follow Topic")
      return mutate({
        variables: { topicId },
        optimisticResponse: {
          __typename: 'Mutation',
          followTopic: {
            id: topicId,
            __typename: 'Topic',
            followedByCurrentUser: true,
          }
        },
      })
        .catch(res => {
          // catches any error returned from mutation request
          const errors = res.graphQLErrors.map((error) => {
            console.log(error.message)
            if (error.message === "Unauthorized") {
              ownProps.unAuthorized();
            }
            return error;
          });
          return errors
        })
    }
  })
});

const unfollowTopic = graphql(UNFOLLOW_TOPIC_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    unfollowTopic: (topicId) => {

      return mutate({
        variables: { topicId },
        optimisticResponse: {
          __typename: 'Mutation',
          followTopic: {
            id: topicId,
            __typename: 'Topic',
            followedByCurrentUser: false,
          }
        },
      })
        .catch(res => {
          // catches any error returned from mutation request
          const errors = res.graphQLErrors.map((error) => {
            console.log(error.message)
            if (error.message === "Unauthorized") {
              ownProps.unAuthorized();
            }
            return error;
          });
          return errors
        })
    }
  })
});

const approveQuestionTopicLink = graphql(APPROVE_QUESTION_TOPIC_LINK_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    approveQuestionTopicLink: (topicId, questionId) => {

      return mutate({
        variables: { topicId, questionId },
        optimisticResponse: {
          __typename: 'Mutation',
          approveQuestionTopicLink: {
            __typename: 'QuestionTopicLink',
            approvedByCurrentUser: true,
            question: {
              __typename: 'Question',
              id: questionId
            },
            topic: {
              __typename: 'Topic',
              id: topicId
            }
          }
        },
      })
        .catch(res => {
          // catches any error returned from mutation request
          const errors = res.graphQLErrors.map((error) => {
            console.log(error.message)
            if (error.message === "Unauthorized") {
              ownProps.unAuthorized();
            }
            return error;
          });
          return errors
        })
    }
  })
});

const unapproveQuestionTopicLink = graphql(UNAPPROVE_QUESTION_TOPIC_LINK_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    unapproveQuestionTopicLink: (topicId, questionId) => {
      console.log("Unapprove link", topicId, questionId);
      return mutate({
        variables: { topicId, questionId },
        optimisticResponse: {
          __typename: 'Mutation',
          unapproveQuestionTopicLink: {
            __typename: 'QuestionTopicLink',
            approvedByCurrentUser: false,
            question: {
              __typename: 'Question',
              id: questionId
            },
            topic: {
              __typename: 'Topic',
              id: topicId
            }
          }
        },
      })
        .catch(res => {
          // catches any error returned from mutation request
          const errors = res.graphQLErrors.map((error) => {
            console.log(error.message)
            if (error.message === "Unauthorized") {
              ownProps.unAuthorized();
            }
            return error;
          });
          return errors
        })
    }
  })
});


const TopicsBar = ({ topicLinks, hasMoreTopics, onAddTopic, isInput, approveQuestionTopicLink, unapproveQuestionTopicLink, followTopic, unfollowTopic }) =>
{
  console.log(topicLinks[0]);
  return (
    <div className={styles.topicsBar}>
      <div className={styles.topics}>
      {topicLinks.map(topicLink =>
        <Topic
          approveQuestionTopicLink={approveQuestionTopicLink}
          unapproveQuestionTopicLink={unapproveQuestionTopicLink}
          followTopic={followTopic}
          unfollowTopic={unfollowTopic}
          linkApproved={topicLink.approvedByCurrentUser}
          key={topicLink.topic.id}
          topic={topicLink.topic}
          strength={topicLink.approval}
          styles={styles}
          isInput={isInput}/>)}
      </div>
      <LoadMoreTopics isMore={hasMoreTopics}/>
      {isInput ? <TopicInput onEnter={onAddTopic}/>
        : <div className={styles.topicInputContainer}/>}
    </div>
  )
};




TopicsBar.propTypes = {
  topicLinks: PropTypes.array.isRequired,
  hasMoreTopics: PropTypes.bool.isRequired,
  onAddTopic: PropTypes.func,
  isInput: PropTypes.bool.isRequired
};

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  approveQuestionTopicLink,
  unapproveQuestionTopicLink,
  followTopic,
  unfollowTopic,
)(TopicsBar);