/**
 * Created by will on 13/03/18.
 */
import React from 'react';
import ThinkIcon from '../app/components/Question/icons/ThinkIcon';
import FaEye from 'react-icons/lib/fa/eye';

describe("EditIcon component", () => {

  it('always renders a span', () => {
    const wrapper = shallow(<ThinkIcon />);
    expect(wrapper.find('span').length).toEqual(1);
  });

  it('contains a eye icon when canThink prop is true', () => {
    const wrapper = shallow(<ThinkIcon canThink={true}/>);
    expect(wrapper.find(FaEye).length).toEqual(1);
  });

  it('doesnt contain eye icon when canThink prop is false', () => {
    const wrapper = shallow(<ThinkIcon canThink={false}/>);
    expect(wrapper.find(FaEye).length).toEqual(0);
  });

  it('calls thinkAboutQuestion when icon clicked', () => {
    let props = {
      canThink: true,
      thinkAboutQuestion: jest.fn()
    };

    const wrapper = mount(<ThinkIcon {... props}/>);
    wrapper.find(FaEye).simulate('click');
    expect(props.thinkAboutQuestion).toHaveBeenCalledTimes(1);
  })


});