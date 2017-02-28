import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import Main from '../components/Main'
import HomeContainer from '../containers/HomeContainer'
import TopicContainer from '../containers/TopicContainer'
import WhyContainer from '../containers/WhyContainer'
import WhatIfContainer from '../containers/WhatIfContainer'
import HowContainer from '../containers/HowContainer'

var routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={HomeContainer} />
      <Route path='/topic' component={TopicContainer}>
        <IndexRoute component={WhyContainer} />
        <Route path='/why' component={WhatIfContainer} />
        <Route path='/whatif' component={HowContainer} />
      </Route>
    </Route>
  </Router>
)

module.exports = routes;
