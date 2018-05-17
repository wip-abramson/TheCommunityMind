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
      checkboxSelected: {
        id: 1,
        linkType: "Super Question"
      }
    };

    this.selectLinkType = this.selectLinkType.bind(this);
  }

  // TODO not happy with how this is achieved. Should load links from BE
  linkTypes = [{id: 1, linkType: "Super Questions"}, {id: 2, linkType: "Sub Questions"}, {id: 3, linkType: "Unrelated Question"}];

  selectLinkType(id) {
    if (this.props.isInput) {
      let linkIds = this.linkTypes.map(type => type.id);
      this.setState({
        checkboxSelected: this.linkTypes[linkIds.indexOf(id)]
      })
    }
    else {
      // TODO load links in view to navigate through
    }

  }

  render() {
    return (

      <div className={styles.linksBar}>
        <QuestionLinkType
          selectLinkType={this.selectLinkType}
          isInput={this.props.isInput}
          hasBorder={false}
          idSelected={this.state.checkboxSelected.id}
          linkType={{id: 1, linkType: "Super Questions"}}
          amount={5}/>
        <QuestionLinkType
          selectLinkType={this.selectLinkType}
          isInput={this.props.isInput}
          hasBorder={true} idSelected={this.state.checkboxSelected.id}
          linkType={{id: 2, linkType: "Sub Questions"}}
          amount={25}/>
        {/*<QuestionLinkType isInput={this.props.isInput} hasBorder={true} linkType="Related Questions" amount={11}/>*/}
        {this.props.isInput ?
          <QuestionLinkType
            selectLinkType={this.selectLinkType}
            isInput={this.props.isInput}
            hasBorder={true}
            idSelected={this.state.checkboxSelected.id}
            linkType={{id: 3, linkType: "Unrelated Question"}}/>
          : null}
      </div>
    )
  }
}

QuestionLinkType.propTypes = {
  isInput: PropTypes.bool.isRequired
};

export default QuestionLinksBar;