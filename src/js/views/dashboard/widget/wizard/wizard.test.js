import React from 'react';

import { reduxify, makeMountRender } from '../../../../common/test-utils';
import Wizard from './Wizard';

const toDashboard = () => {};

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key,
  }),
}));

describe('Simple Wizard', () => {
  it('It should render', () => {
    const wrapper = makeMountRender(
      reduxify(Wizard, { title: 'test', type: '0', toDashboard }),
    )();
    console.log(wrapper.debug());
  });
});
