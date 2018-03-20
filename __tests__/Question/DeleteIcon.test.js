/**
 * Created by will on 20/03/18.
 */
import React from 'react';

import DeleteIcon from '../../app/components/Question/Components/DeleteIcon';
import FaClose from 'react-icons/lib/fa/close';


describe('DeleteIcon component', () => {

  it('Should render a span', () => {
    const wrapper = createShallowDeleteIcon();
    expect(wrapper.find('span').length).toEqual(1)
  });

  it('Should render FaClose icon if canDelete is true', () => {
    let props = {
      canDelete: true,
      deleteQuestion: jest.fn()
    };
    const wrapper = mount(<DeleteIcon {... props}/>);
    expect(wrapper.find(FaClose).length).toEqual(1);
  });

  it('Should not render FaClose icon if canDelete is false', () => {
    let props = {
      canDelete: false,
      deleteQuestion: jest.fn()
    };
    const wrapper = mount(<DeleteIcon {... props}/>);
    expect(wrapper.find(FaClose).length).toEqual(0);
  });

  it('Should call deleteQuestion when FaClose icon is clicked', () => {
    let props = {
      canDelete: true,
      deleteQuestion: jest.fn()
    };
    const wrapper = mount(<DeleteIcon {... props}/>);
    wrapper.find(FaClose).simulate('click');

    expect(props.deleteQuestion).toHaveBeenCalled();
  })
});

function createShallowDeleteIcon () {
  return shallow(<DeleteIcon/>);
}