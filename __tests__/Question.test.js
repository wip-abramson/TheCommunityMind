/**
 * Created by will on 08/03/18.
 */
import React from 'react';
import renderer from 'react-test-renderer';

import Question from '../app/components/Question/Question';
import StarIcon from '../app/components/Question/icons/StarIcon';
import EditIcon from '../app/components/Question/icons/EditIcon';
import ThinkIcon from '../app/components/Question/icons/ThinkIcon';


describe("Question Component", () => {

  // make our assertion and what we expect to happen
  // it('should render without throwing an error', () => {
  //   const component = renderer.create(
  //     <Question />
  //   )
  //   let tree = component.toJSON();
  //   expect(tree).toMatchSnapshot()
  //
  // });

  it('renders a StarIcon', () => {
    const wrapper = shallow(<Question />);
    expect(wrapper.find(StarIcon).length).toEqual(1);
  });

  it('renders a 3 divs', () => {
    const wrapper = shallow(<Question />);
    expect(wrapper.find('div').length).toEqual(4);
  });

  it('renders a StarIcon', () => {
    const wrapper = shallow(<Question />);
    expect(wrapper.find(EditIcon).length).toEqual(1);
  });

  it('renders a StarIcon', () => {
    const wrapper = shallow(<Question />);
    expect(wrapper.find(ThinkIcon).length).toEqual(1);
  })
});