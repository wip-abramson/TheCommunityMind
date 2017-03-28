import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import MainContainer from '../containers/MainContainer'
import HomeContainer from '../containers/HomeContainer'
import Topic from '../components/Topic'
import WhyContainer from '../containers/WhyContainer'
import WhatIfContainer from '../containers/WhatIfContainer'
import HowContainer from '../containers/HowContainer'

var AppRouter = function (){
  return (
    <Router history={browserHistory}>
      <Route path='/' component={MainContainer}>
        <IndexRoute component={HomeContainer} />
        <Route path='/topic' component={Topic}>
          <IndexRoute component={WhyContainer} />
          <Route path='/why' component={WhatIfContainer} />
          <Route path='/whatif' component={HowContainer} />
        </Route>
      </Route>
    </Router>
  )
}


module.exports = AppRouter;
