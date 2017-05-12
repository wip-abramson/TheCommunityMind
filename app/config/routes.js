import React from "react";
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import Main from "../components/Main/Main";
import Why from "../components/Questions/Why";
import WhatIf from "../components/Questions/WhatIf";
import How from "../components/Questions/How";
import Login from "../components/Login";
import RegisterContainer from "../components/Register/RegisterContainer";

var AppRouter = function () {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={Main}>
        <IndexRoute component={Why}/>
        <Route path='/whatif' component={WhatIf}/>
        <Route path='/how' component={How}/>
      </Route>
      < Route
        path='/login'
        component={Login}/>
      < Route
        path='register'
        component={RegisterContainer}/>

    </ Router >
  )
}


module.exports = AppRouter;
