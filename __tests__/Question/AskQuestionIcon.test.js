/**
 * Created by will on 20/03/18.
 */
import React from 'react';

import AskQuestionIcon from '../../app/components/Question/Components/AskQuestionIcon';
import FaQuestion from 'react-icons/lib/fa/question-circle';


describe('DeleteIcon component', () => {

  it('Should render a span', () => {
    const wrapper = shallow(<AskQuestionIcon />);
    expect(wrapper.find('span').length).toEqual(1)
  });

  it('Should render icon if canAskQuestion is true', () => {
    let props = {
      canAskQuestion: true,
      askQuestion: jest.fn()
    };
    const wrapper = mount(<AskQuestionIcon {... props}/>);
    expect(wrapper.find(FaQuestion).length).toEqual(1);
  });

  it('Should not render icon if canAskQuestion is false', () => {
    let props = {
      canAskQuestion: false,
      askQuestion: jest.fn()
    };
    const wrapper = mount(<AskQuestionIcon {... props}/>);
    expect(wrapper.find(FaQuestion).length).toEqual(0);
  });

  it('Should call askQuestion when icon is clicked', () => {
    let props = {
      canAskQuestion: true,
      askQuestion: jest.fn()
    };
    const wrapper = mount(<AskQuestionIcon {... props}/>);
    wrapper.find(FaQuestion).simulate('click');

    expect(props.askQuestion).toHaveBeenCalled();
  })
});
