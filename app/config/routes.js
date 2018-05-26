import React from "react";
import {Router, Route, browserHistory, IndexRoute} from "react-router";

import Main from "../components/Main/Main";
import LoginContainer from "../components/Authentication/LoginContainer";
import RegisterContainer from "../components/Authentication/RegisterContainer";
import UserProfileContainer from "../components/UserProfile/UserProfileContainer";
import LandingPage from '../components/LandingPage/LandingPage';
import QuestionsLinksContainer from '../components/QuestionLinksContainers/QuestionsLinksViewContainer';
import RandomQuestionTracker from '../components/RandomQuestionContainer/RandomQuestionTracker';
import QuestionIdFocusContainer from '../components/QuestionIdFocusContainer/QuestionIdFocusContainer';
import LinkFocus from '../components/LinkFocus/LinkFocus';
import TopicsQuestionsContainer from '../components/TopicContainer/TopicContainer';

const AppRouter = function () {
  return (
    <Router history={browserHistory}>

      <Route path='/' component={Main}>



        <IndexRoute component={RandomQuestionTracker}/>
        <Route path='/landing' component={LandingPage}/>

        <Route path='/question' component={QuestionIdFocusContainer}/>
        <Route path='/question/links' component={QuestionsLinksContainer}/>
        <Route path='/topic' component={TopicsQuestionsContainer}/>

        < Route
          path='/login'
          component={LoginContainer}/>
        < Route
          path='/register'
          component={RegisterContainer}/>
        <Route
          path='/profile'
          component={UserProfileContainer}/>
      </Route>



    </ Router >
  )
}


export default AppRouter;
