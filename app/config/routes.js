import React from "react";
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import Main from "../components/Main/Main";
import Why from "../components/Questions/Why";
import WhatIf from "../components/Questions/WhatIf";
import How from "../components/Questions/How";
import LoginContainer from "../components/Login/LoginContainer";
import RegisterContainer from "../components/Register/RegisterContainer";

var AppRouter = function () {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={Main}>
        <IndexRoute component={Why}/>
        <Route path='/whatif' component={WhatIf}/>
        <Route path='/how' component={How}/>
        < Route
          path='/login'
          component={LoginContainer}/>
        < Route
          path='/register'
          component={RegisterContainer}/>
      </Route>



    </ Router >
  )
}


module.exports = AppRouter;
