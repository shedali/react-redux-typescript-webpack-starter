import * as React from 'react';
import * as chai from 'chai';
import { mount, shallow } from 'enzyme';

import { Hello, HelloProps } from './index';

describe('<Hello />', () => {

  it('verifies rendering', () => {
    const props: HelloProps = {
      name: 'Maxim'
    };

    const wrapper = mount(<Hello {...props} />);

    chai.expect(wrapper.props().name).to.equal(props.name);
  });

});
