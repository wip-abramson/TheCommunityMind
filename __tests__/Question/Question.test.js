/**
 * Created by will on 08/03/18.
 */
import React from 'react';

import Question from '../../app/components/Question/Question';
import StarIcon from '../../app/components/Question/Components/StarIcon';
import EditIcon from '../../app/components/Question/Components/EditIcon';
import ThinkIcon from '../../app/components/Question/Components/ThinkIcon';
import DeleteIcon from '../../app/components/Question/Components/DeleteIcon';
import AskQuestionIcon from '../../app/components/Question/Components/AskQuestionIcon';
import QuestionOwner from '../../app/components/Question/Components/QuestionOwner';



describe("Question Component", () => {

  it('renders a StarIcon', () => {
    const wrapper = shallow(<Question />);
    expect(wrapper.find(StarIcon).length).toEqual(1);
  });

  it('renders a 4 divs', () => {
    const wrapper = shallow(<Question />);
    expect(wrapper.find('div').length).toEqual(4);
  });

  it('renders a EditIcon', () => {
    const wrapper = shallow(<Question />);
    expect(wrapper.find(EditIcon).length).toEqual(1);
  });

  it('renders a ThinkIcon', () => {
    const wrapper = shallow(<Question />);
    expect(wrapper.find(ThinkIcon).length).toEqual(1);
  });
  it('renders a DeleteIcon', () => {
      const wrapper = shallow(<Question />);
      expect(wrapper.find(DeleteIcon).length).toEqual(1);
  });
  it('renders a AskQuestionIcon', () => {
    const wrapper = shallow(<Question/>);
    expect(wrapper.find(AskQuestionIcon).length).toEqual(1);
  })
  it('renders a QuestionOwner', () => {
    const wrapper = shallow(<Question/>);
    expect(wrapper.find(QuestionOwner).length).toEqual(1);
  })
});