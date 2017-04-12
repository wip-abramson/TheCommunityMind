import React from "react";
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import Main from "../components/Main/Main";
import Home from "../components/Home/HomeContainer";
import Topic from "../components/Topic/Topic";
import Why from "../components/Topic/Why";
import WhatIf from "../components/Topic/WhatIf";
import How from "../components/Topic/How";
import Login from "../components/Login";
import Register from "../components/Register";
import TopicHome from "../components/Topic/TopicHome";
import Wiki from "../components/Wiki/Wiki";

var AppRouter = function () {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={Main}>
        <IndexRoute component={Home}/>
        <Route path='/topic' component={Topic}>
          <IndexRoute component={TopicHome}/>
          <Route path='/why' component={Why}/>
          <Route path='/whatif' component={WhatIf}/>
          <Route path='/how' component={How}/>
        </Route>
        <Route path="/wiki" component={Wiki}/>
      </Route>
      <Route path='/login' component={Login}/>
      <Route path='register' component={Register}/>

    </Router>
  )
}


module.exports = AppRouter;
