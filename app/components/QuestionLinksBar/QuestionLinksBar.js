/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

import QuestionLinkType from './components/QuestionLinkType';

//TODO make sure correct checkbox is ticked at the start
//TODO do not like that links bar has to know what kind of links it should represent
// TODO should be provided to it
class QuestionLinksBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxSelected: null
    };

    this.getIdSelected = this.getIdSelected.bind(this);
  }

  getIdSelected() {
    return this.props.selectedLinkType ? this.props.selectedLinkType.id : 0
  }

  render() {
    return (

      <div className={styles.linksBar}>
        <QuestionLinkType
          selectLinkType={this.props.selectLinkType}
          isInput={this.props.isInput}
          hasBorder={false}
          idSelected={this.getIdSelected()}
          linkType={{id: '1', linkType: "Super Questions", amount: 26}}/>
        <QuestionLinkType
          selectLinkType={this.props.selectLinkType}
          isInput={this.props.isInput}
          hasBorder={true}
          idSelected={this.getIdSelected()}
          linkType={{id: '2', linkType: "Sub Questions", amount: 29}}/>
        <QuestionLinkType
          selectLinkType={this.props.selectLinkType}
          isInput={this.props.isInput}
          hasBorder={true}
          linkType={{id: '3', linkType: "Related Questions", amount: 11}}
          idSelected={this.getIdSelected()}/>
      </div>
    )
  }
}

QuestionLinkType.propTypes = {
  isInput: PropTypes.bool.isRequired,
  selectedLinkType: PropTypes.shape({
    id: PropTypes.string.isRequired,
    linkType: PropTypes.string.isRequired,
  }),
  selectLinkType: PropTypes.func.isRequired
};

export default QuestionLinksBar;