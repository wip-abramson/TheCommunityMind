import whys from './Why'
import hows from './How'
import whatIfs from './WhatIf'
import { combineReducers } from 'redux'

const App = combineReducers({

  whatIfs,
  hows,
  whys
})

export default App;
