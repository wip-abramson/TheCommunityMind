/**
 * Created by will on 20/03/18.
 */
import React from 'react';
import { Link } from 'react-router'

import QuestionOwner from '../../app/components/Question/Components/QuestionOwner';

describe("QuestionOwner component", () => {
  let props;
  beforeEach(() => {
    props = {
      owner: {
        id: 1,
        username: "Will"
      }
    };
  });
  it('Should render a span', () => {
        const wrapper = shallow(<QuestionOwner {... props}/>);
    expect(wrapper.find('span').length).toEqual(1);
  });

  it('Should render a react-router Link', () => {
    const wrapper = shallow(<QuestionOwner {... props}/>);
    expect(wrapper.find(Link).length).toEqual(1);
  });

  it('The text of the Link should be the owners username', () => {
    const wrapper = mount(<QuestionOwner {... props}/>);
    expect(wrapper.find(Link).text()).toEqual(props.owner.username);
  });
});
