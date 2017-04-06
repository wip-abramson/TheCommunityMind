import React from "react";
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import MainContainer from "../containers/Main";
import HomeContainer from "../containers/Home";
import Topic from "../components/Topic";
import WhyContainer from "../containers/Why";
import WhatIfContainer from "../containers/WhatIf";
import HowContainer from "../containers/How";
import Login from "../components/Login";
import Register from "../components/Register";

var AppRouter = function () {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={MainContainer}>
        <IndexRoute component={HomeContainer}/>
        <Route path='/topic' component={Topic}>
          <IndexRoute component={WhyContainer}/>
          <Route path='/why' component={WhatIfContainer}/>
          <Route path='/whatif' component={HowContainer}/>
        </Route>
      </Route>
      <Route path='/login' component={Login}/>
      <Route path='register' component={Register}/>
    </Router>
  )
}


module.exports = AppRouter;
