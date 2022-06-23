const containerInstance = i18n.createInstance();
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LANGUAGE_KEYS } from 'sharedComponents/Constants';

import commonEn from './translations/en.common.i18n.json';
import commonPtBr from './translations/pt_br.common.i18n.json';
import constantsEn from './translations/en.constants.i18n.json';
import constantsPtBr from './translations/pt_br.constants.i18n.json';
import errorEn from './translations/en.error.i18n.json';
import errorPtBr from './translations/pt_br.error.i18n.json';
import languagesPtBr from './translations/pt_br.languages.i18n.json';
import successEn from './translations/en.success.i18n.json';
import successPtBr from './translations/pt_br.success.i18n.json';
import pageNotFoundEn from '../view/pageNotFound/translations/en.pageNotFound.i18n.json';
import pageNotFoundPtBr from '../view/pageNotFound/translations/pt_br.pageNotFound.i18n.json';
import menuPtBr from './translations/pt_br.menu.i18n.json';
import menuEN from './translations/en.menu.i18n.json';
import templatesTableEN from './translations/en.templatesTable.i18n.json';
import templatesTablePtBr from './translations/pt_br.templatesTable.i18n.json';
import tenantFormEN from '../view/tenantForm/translations/en.tenantForm.i18n.json';
import tenantFormPtBr from '../view/tenantForm/translations/pt_br.tenantForm.i18n.json';
import userInfoEN from './translations/en_us.userInfo.i18n.json';
import userInfoPtBr from './translations/pt_br.userInfo.i18n.json';
import warningPtBr from './translations/pt_br.warning.i18n.json';
import warningEN from './translations/en_us.warning.i18n.json';

const resources = {
  en: {
    common: commonEn,
    constants: constantsEn,
    error: errorEn,
    success: successEn,
    pageNotFound: pageNotFoundEn,
    menu: menuEN,
    templatesTable: templatesTableEN,
    tenantForm: tenantFormEN,
    userInfo: userInfoEN,
    warning: warningEN,
  },
  'pt-BR': {
    common: commonPtBr,
    constants: constantsPtBr,
    error: errorPtBr,
    languages: languagesPtBr,
    success: successPtBr,
    pageNotFound: pageNotFoundPtBr,
    menu: menuPtBr,
    templatesTable: templatesTablePtBr,
    tenantForm: tenantFormPtBr,
    userInfo: userInfoPtBr,
    warning: warningPtBr,
  },
};

const preferredLanguage = localStorage.getItem(LANGUAGE_KEYS.LANGUAGE);
const lng = preferredLanguage || navigator.language || navigator.userLanguage;

containerInstance.use(initReactI18next).init({
  ns: ['common', 'constants', 'error', 'languages', 'success'],
  defaultNS: 'common',
  fallbackLng: 'en',
  lng,
  resources,
  keySeparator: '.',
  interpolation: {
    escapeValue: false,
  },
});

export default containerInstance;
