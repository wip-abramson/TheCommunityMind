/**
 * Created by will on 22/04/18.
 */
import React from 'react';
import {Jumbotron, Well} from 'react-bootstrap'
import {Link} from 'react-router';

const LandingPage = () =>
  <Jumbotron>
    <h1>Hello, Welcome to The Community Mind</h1>


    <h2>Where people come to think</h2>
    <h3>To inspire and be inspired</h3>
    <p>Through this website I hope to create a community based around sharing beautiful questions. These are defined by Warren Berger, author of <a href="http://amorebeautifulquestion.com/" target="_blank">A More Beautiful Question</a> as:</p>
      <Well><h2>"An ambitious yet actionable question that can begin to shift the way we perceive or think about something—and that might serve as a catalyst to bring about change."</h2></Well>
    <p>In a world full of answers, questions are becoming ever more important. Why don't we share our questions? And by doing so might we be able to open source creativity?</p>
      <h2><Link to="/register">Sign up</Link> now and start asking your beautiful questions</h2>
    <p>Remember, if you don't ask the right question you are never going to find the right answer!</p>

  </Jumbotron>;

export default LandingPage;