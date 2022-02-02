import '@testing-library/jest-dom/extend-expect';
import 'regenerator-runtime/runtime';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key,
    i18n: {
      language: 'en',
      options: {
        resources: {
          en: {},
          'pt-BR': {},
        },
      },
      changeLanguage: (_, callback) => {
        return new Promise(resolve => {
          if (callback) callback();
          resolve();
        });
      },
    },
  }),
}));
