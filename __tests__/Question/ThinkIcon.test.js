/**
 * Created by will on 13/03/18.
 */
import React from 'react';
import ThinkIcon from '../../app/components/Question/Components/ThinkIcon';
import FaEye from 'react-icons/lib/fa/eye';

describe("EditIcon component", () => {

  it('always renders a span', () => {
    const wrapper = shallow(<ThinkIcon />);
    expect(wrapper.find('span').length).toEqual(1);
  });

  it('contains a eye icon', () => {
    const wrapper = shallow(<ThinkIcon />);
    expect(wrapper.find(FaEye).length).toEqual(1);
  });

  it('calls forgetAboutQuestion when icon clicked and canThink is false', () => {
    let props = {
      canThink: false,
      thinkAboutQuestion: jest.fn(),
      forgetAboutQuestion: jest.fn(),
    };

    const wrapper = mount(<ThinkIcon {... props}/>);
    wrapper.find(FaEye).simulate('click');
    expect(props.forgetAboutQuestion).toHaveBeenCalledTimes(1);
  });

  it('calls thinkAboutQuestion when icon clicked and canThink is true', () => {
    let props = {
      canThink: true,
      thinkAboutQuestion: jest.fn(),
      forgetAboutQuestion: jest.fn(),

    };

    const wrapper = mount(<ThinkIcon {... props}/>);
    wrapper.find(FaEye).simulate('click');
    expect(props.thinkAboutQuestion).toHaveBeenCalledTimes(1);
  })


});