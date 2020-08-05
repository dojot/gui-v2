import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import loginEn from '../../views/login/translations/en.login.i18n.json';
import loginPtBr from '../../views/login/translations/pt_br.login.i18n.json';
import commonEn from './translations/en.common.json';
import commonPtBr from './translations/pt_br.common.json';

const resources = {
  en: { login: loginEn, common: commonEn },
  'en-US': { login: loginEn, common: commonEn },
  'pt-BR': { login: loginPtBr, common: commonPtBr },
};
const lng = navigator.language || navigator.userLanguage;
i18n.use(initReactI18next).init({
  lng,
  resources,
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
