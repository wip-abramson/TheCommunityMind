/**
 * Created by will on 15/11/17.
 */
import React from 'react'

import FaEye from 'react-icons/fa/eye';


const WatchQuestion = (props) => {

  var style= {
    color: "red",
    cursor: "pointer"
  }
  return <div>
    <FaEye
      style={props.watchedByCurrentUser ? style :  {"cursor": "pointer"}}
      onClick={() => {
        if (props.watchedByCurrentUser) {
          console.log("UNWATCH")
          props.unwatchQuestion();
        }
        else {
          props.watchQuestion();
        }
      }}
    />

  </div>

}

export default WatchQuestion;