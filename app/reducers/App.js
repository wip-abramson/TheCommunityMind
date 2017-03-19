import { whys, currentWhy } from './Why'
import { hows } from './How'
import { whatIfs, currentWhatIf } from './WhatIf'
import { topics, currentTopic } from './Topic'
import { headerType } from './TopicHeader'
import { combineReducers } from 'redux'

const App = combineReducers({
  topics,
  whys,
  whatIfs,
  hows,
  currentTopic,
  currentWhy,
  currentWhatIf,
  headerType,
})

export default App;
