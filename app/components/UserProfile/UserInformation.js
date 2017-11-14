/**
 * Created by will on 14/11/17.
 */
import React from 'react'
import {Button} from 'react-bootstrap';
import FaUser from 'react-icons/fa/user';


export default () => {
  return (
    <div>
      <h2>Will Abramson</h2>
      <FaUser size={70}/>
      <p>My user bio</p>
      <Button bsStyle="primary">Follow</Button>
    </div>
    )
}
