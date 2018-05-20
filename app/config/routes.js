import React from "react";
import {Router, Route, browserHistory, IndexRoute} from "react-router";

import Main from "../components/Main/Main";
import Home from '../components/Home/Home';
import QuestionsView from '../components/QuestionViews/QuestionsView'
import LoginContainer from "../components/Authentication/LoginContainer";
import RegisterContainer from "../components/Authentication/RegisterContainer";
import UserProfileContainer from "../components/UserProfile/UserProfileContainer";
import LandingPage from '../components/LandingPage/LandingPage';
import QuestionFocusContainer from '../components/QuestionFocus/QuestionFocusContainer';
import RandomQuestionContainer from '../components/RandomQuestionContainer/RandomQuestionContainer';
import QuestionIdFocusContainer from '../components/QuestionIdFocusContainer/QuestionIdFocusContainer';

const AppRouter = function () {
  return (
    <Router history={browserHistory}>

      <Route path='/' component={Main}>


        <Route component={Home}>
          <IndexRoute component={RandomQuestionContainer}/>
          {/*<Route path="/thread/:name" component={ThreadPage}/>*/}
        </Route>
        <Route path='/landing' component={LandingPage}/>
        <Route path='/random' component={RandomQuestionContainer} />

        <Route path='/question' component={QuestionIdFocusContainer}/>

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
