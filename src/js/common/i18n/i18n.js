import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import loginEn from '../../views/login/translations/en.login.i18n.json';
import loginPtBr from '../../views/login/translations/pt_br.login.i18n.json';
import paginatorEn from '../components/Paginator/translations/en.paginator.i18n.json';
import paginatorPtBr from '../components/Paginator/translations/pt_br.paginator.i18n.json';
import menuEn from '../menu/translations/en.menu.i18n.json';
import menuPtBr from '../menu/translations/pt_br.menu.i18n.json';
import commonEn from './translations/en.common.i18n.json';
import commonPtBr from './translations/pt_br.common.i18n.json';

const resources = {
  en: { login: loginEn, common: commonEn },
  'en-US': {
    login: loginEn,
    menu: menuEn,
    common: commonEn,
    paginator: paginatorEn,
  },
  'pt-BR': {
    login: loginPtBr,
    menu: menuPtBr,
    common: commonPtBr,
    paginator: paginatorPtBr,
  },
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
