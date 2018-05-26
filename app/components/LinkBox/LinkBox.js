/**
 * Created by will on 22/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import LinkQuestion from '../LinkQuestion/LinkQuestion';
import LinkRelation from '../LinkRelation/LinkRelation';

import styles from './styles.css';

const LinkBox = ({questionLink}) => {
  return (
    <div className={styles.linkBox}>
      <LinkQuestion cssClassName={styles.fromQuestion} question={questionLink.fromQuestion}/>
      <LinkRelation relation={questionLink.linkType}/>
      <LinkQuestion cssClassName={styles.toQuestion} question={questionLink.toQuestion}/>

    </div>
  )
};

export default LinkBox;