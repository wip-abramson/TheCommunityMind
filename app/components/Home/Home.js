/**
 * Created by will on 21/11/17.
 */
import React from 'react';

import ThreadBarContainer from '../ThreadBar/ThreadBarContainer';

const Home = (props) => {
  return (
    <div>
      <ThreadBarContainer/>
      {props.children}
    </div>
  )
}

export default Home;