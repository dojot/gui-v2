import i18n from 'i18next';
import moment from 'moment';
import { initReactI18next } from 'react-i18next';
import { LANGUAGE_KEYS } from 'sharedComponents/Constants';

import attrsEn from './translations/en.attrs.i18n.json';
import attrsPtBr from './translations/pt_br.attrs.i18n.json';
import commonEn from './translations/en.common.i18n.json';
import commonPtBr from './translations/pt_br.common.i18n.json';
import constantsEn from './translations/en.constants.i18n.json';
import constantsPtBr from './translations/pt_br.constants.i18n.json';
import errorEn from './translations/en.error.i18n.json';
import errorPtBr from './translations/pt_br.error.i18n.json';
import languagesEn from './translations/en.languages.i18n.json';
import languagesPtBr from './translations/pt_br.languages.i18n.json';
import successEn from './translations/en.success.i18n.json';
import successPtBr from './translations/pt_br.success.i18n.json';
import templateCreationBr from './translations/pt_br.templateCreation.i18n.json';
import templateCreationEn from './translations/en.templateCreation.i18n.json';
import templatesTableEn from './translations/en.templatesTable.i18n.json';
import templatesTablePtBr from './translations/pt_br.templatesTable.i18n.json';
import userInfoEN from './translations/en_us.userInfo.i18n.json';
import userInfoPtBr from './translations/pt_br.userInfo.i18n.json';
import createReportEn from '../view/createReport/translations/en.createReport.i18n.json';
import createReportPtBr from '../view/createReport/translations/pt_br.createReport.i18n.json';
import myReportsEn from '../view/myReports/translations/en.myReports.i18n.json';
import myReportsPtBr from '../view/myReports/translations/pt_br.myReports.i18n.json';

const deviceInstance = i18n.createInstance();
// Import moment locales here. The default locale is english (en).
import 'moment/locale/pt-br';

const resources = {
  en: {
    common: commonEn,
    constants: constantsEn,
    error: errorEn,
    languages: languagesEn,
    success: successEn,
    templatesTable: templatesTableEn,
    attrs: attrsEn,
    userInfo: userInfoEN,
    templateCreation: templateCreationEn,
    createReport: createReportEn,
    myReports: myReportsEn,
  },
  'pt-BR': {
    common: commonPtBr,
    constants: constantsPtBr,
    error: errorPtBr,
    languages: languagesPtBr,
    success: successPtBr,
    templatesTable: templatesTablePtBr,
    attrs: attrsPtBr,
    userInfo: userInfoPtBr,
    templateCreation: templateCreationBr,
    createReport: createReportPtBr,
    myReports: myReportsPtBr,
  },
};

const preferredLanguage = localStorage.getItem(LANGUAGE_KEYS.LANGUAGE);
const lng = preferredLanguage || navigator.language || navigator.userLanguage;

deviceInstance.use(initReactI18next).init({
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

const handleLoadMomentLocale = lang => {
  if (lang) moment.locale(lang.toLowerCase());
};

deviceInstance.on('languageChanged', handleLoadMomentLocale);
handleLoadMomentLocale(lng); // Load locale on app first render

export default deviceInstance;
