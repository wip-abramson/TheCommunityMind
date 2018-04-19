/**
 * Created by will on 13/03/18.
 */
import React from 'react';
import EditIcon from '../../app/components/Question/Components/EditIcon';
import FaEdit from 'react-icons/lib/fa/edit';

describe("EditIcon component", () => {

  it('always renders a span', () => {
    const wrapper = shallow(<EditIcon />);
    expect(wrapper.find('span').length).toEqual(1);
  });

  it('contains a edit icon when canEdit prop true', () => {
    const wrapper = shallow(<EditIcon canEdit={true}/>);
    expect(wrapper.find(FaEdit).length).toEqual(1);
  });

  it('doesnt contain edit icon if canEdit is false', () => {
    let props = {
      canEdit: false,
      editQuestion: jest.fn()
    };
    const wrapper = mount(<EditIcon {... props} />);
    expect(wrapper.find(FaEdit).length).toEqual(0);
  });

  it('calls editQuestion on icon click', () => {
    let props = {
      canEdit: true,
      editQuestion: jest.fn()
    };
    const wrapper = mount(<EditIcon {... props}/>);
    wrapper.find(FaEdit).simulate('click');
    expect(props.editQuestion).toHaveBeenCalledTimes(1);
  })


});