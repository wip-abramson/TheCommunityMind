/**
 * Created by will on 10/03/18.
 */
import React from 'react'
import StarIcon from './icons/StarIcon';
import ThinkIcon from './icons/ThinkIcon';
import EditIcon from './icons/EditIcon';
import styles from './styles.css';

export default () => {
  return (
    <div>

      <div className="topRow"></div>
      <div className="middle"></div>
      <div className="bottomRow">
        <StarIcon/> <ThinkIcon/> <EditIcon/>
      </div>


    </div>
  )
}