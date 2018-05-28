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
    approveQuestionTopicLink: (topicId, questionId, approval) => {
      console.log("Approve link", topicId, questionId, approval);
      return mutate({
        variables: { topicId, questionId },
        optimisticResponse: {
          __typename: 'Mutation',
          approveQuestionTopicLink: {
            __typename: 'QuestionTopicLink',
            approvedByCurrentUser: true,
            approval: approval +1,
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
        update: (proxy, { data: { approveQuestionTopicLink } }) => {
          ownProps.updateQuery(proxy, (question) => {
            question.linksToTopics.edges.forEach(edge => {
              if (edge.node.topic.id === topicId) {
                edge.node.approvedByCurrentUser = true;
                edge.node.approval ++;
              }
            });

            return question;
          })
        }
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
    unapproveQuestionTopicLink: (topicId, questionId, approval) => {
      console.log("Unapprove link", topicId, questionId, approval);
      return mutate({
        variables: { topicId, questionId },
        optimisticResponse: {
          __typename: 'Mutation',
          unapproveQuestionTopicLink: {
            __typename: 'QuestionTopicLink',
            approvedByCurrentUser: false,
            approval: 0,
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
        update: (proxy, { data: { unapproveQuestionTopicLink } }) => {
          ownProps.updateQuery(proxy, (question) => {
            question.linksToTopics.edges.forEach(edge => {
              if (edge.node.topic.id === topicId) {
                edge.node.approvedByCurrentUser = false;
                edge.node.approval--;
              }
            });

            return question;
          })
        }
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


const TopicsBar = ({ topicLinks, questionId, hasMoreTopics, onAddTopic, onDeleteTopic, isInput, approveQuestionTopicLink, unapproveQuestionTopicLink, followTopic, unfollowTopic }) =>
{
  return (
    <div className={styles.topicsBar}>
      <div className={styles.topics}>
      {topicLinks.sort((a,b) => a.topic.strength - b.topic.strength).map(topicLink =>
        <Topic
          questionId={questionId}
          approveQuestionTopicLink={approveQuestionTopicLink}
          unapproveQuestionTopicLink={unapproveQuestionTopicLink}
          onDeleteTopic={onDeleteTopic}
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
  isInput: PropTypes.bool.isRequired,
  questionId: PropTypes.string.isRequired
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