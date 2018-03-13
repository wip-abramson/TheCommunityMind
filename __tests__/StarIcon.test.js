/**
 * Created by will on 12/03/18.
 */
import React from 'react';
import StarIcon from '../app/components/Question/icons/StarIcon';
import FaStar from 'react-icons/lib/fa/star';

describe("StarIcon component", () => {
  let props;
  beforeEach(() => {
    props = {
      canStar: false,
      starCount: 1,
      starQuestion: jest.fn(),
      unstarQuestion: jest.fn(),
    };
  });

  it('always renders a span', () => {
    const wrapper = shallow(<StarIcon {... props}/>);
    expect(wrapper.find('span').length).toEqual(2);
  });

  it('contains a star icon', () => {
    const wrapper = shallow(<StarIcon {... props}/>);
    expect(wrapper.find(FaStar).length).toEqual(1);
  });

  it('calls starQuestion when FaStar icon clicked and props.canStar is false', () => {
    let testProps = {
      canStar: false,
      starCount: 1,
      starQuestion: jest.fn(),
      unstarQuestion: jest.fn(),
    };

    const wrapper = mount(<StarIcon {... testProps}/>);
    expect(wrapper.props().canStar).toEqual(false);
    wrapper.find(FaStar).simulate('click');
    expect(testProps.starQuestion).toHaveBeenCalledTimes(1);
  });

  it('calls starQuestion when FaStar icon clicked and props.canStar is false', () => {
    let testProps = {
      canStar: true,
      starCount: 1,
      starQuestion: jest.fn(),
      unstarQuestion: jest.fn(),
    };

    const wrapper = mount(<StarIcon {... testProps}/>);
    expect(wrapper.props().canStar).toEqual(true);
    wrapper.find(FaStar).simulate('click');
    expect(testProps.unstarQuestion).toHaveBeenCalledTimes(1);
  });

  it('displays the star count', () => {
    const wrapper = mount(<StarIcon {... props}/>);
    expect(wrapper.find('#starCount').text()).toEqual("" + props.starCount);
  })



});