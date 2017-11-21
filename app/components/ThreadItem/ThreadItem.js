/**
 * Created by will on 20/11/17.
 */
import React from 'react';
import FaClose from 'react-icons/fa/close';


export default (props) => {
  return (
    <span >
      {props.thread.name}
      <FaClose size={10} onClick={() => props.removeThread(props.thread)}/>
    </span>
  )
}