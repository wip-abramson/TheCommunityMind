/**
 * Created by will on 11/05/18.
 */

import React from 'react';

import OstBalance from '../../app/components/OstBalance/OstBalance';

describe('OstBalance', () => {
  let props;
  beforeEach(() => {

    props = {
      airdroppedBalance: 50,
      totalBalance: 100,

    };
  });

  it('should render a span', () => {
    const wrapper = shallow(<OstBalance {...props}/>);
    expect(wrapper.find('div').length).toEqual(3);
  })
})