/**
 * Created by will on 23/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import QuestionsList from '../QuestionsList/QuestionsList';


const TopicProfile = ({loading, error, topic, loadMoreEntries}) => {
  if (loading) {
    return <div>Loading</div>
  }
  else if(error) {
    return <div>Error</div>
  }
  return (
    <QuestionsList questionConnection={topic.questions}
                   totalQuestionsCount={topic.questionsCount}
                   title={topic.name + " Questions"}
                   loadMoreEntries={loadMoreEntries}/>
  )
};

export default TopicProfile;