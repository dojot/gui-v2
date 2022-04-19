import i18n from 'i18next';
import moment from 'moment';
import { initReactI18next } from 'react-i18next';
const templateInstance = i18n.createInstance();
import { LANGUAGE_KEYS } from 'sharedComponents/Constants';

import createTemplateEn from '../view/createTemplate/translations/en.createTemplate.i18n.json';
import createTemplatePtBr from '../view/createTemplate/translations/pt_br.createTemplate.i18n.json';
import editTemplateEn from '../view/editTemplate/translations/en.editTemplate.i18n.json';
import editTemplatePtBr from '../view/editTemplate/translations/pt_br.editTemplate.i18n.json';
import templateAttrsEn from '../view/templateAttrs/translations/en.templateAttrs.i18n.json';
import templateAttrsPtBr from '../view/templateAttrs/translations/pt_br.templateAttrs.i18n.json';
import templatesEn from '../view/templates/translations/en.templates.i18n.json';
import templatesPtBr from '../view/templates/translations/pt_br.templates.i18n.json';
import commonEn from './translations/en.common.i18n.json';
import constantsEn from './translations/en.constants.i18n.json';
import errorEn from './translations/en.error.i18n.json';
import successEn from './translations/en.success.i18n.json';
import attrsPtBr from './translations/pt_br.attrs.i18n.json';
import attrsEn from './translations/en.attrs.i18n.json';
import commonPtBr from './translations/pt_br.common.i18n.json';
import constantsPtBr from './translations/pt_br.constants.i18n.json';
import errorPtBr from './translations/pt_br.error.i18n.json';
import languagesPtBr from './translations/pt_br.languages.i18n.json';
import languagesEn from './translations/en.languages.i18n.json';
import successPtBr from './translations/pt_br.success.i18n.json';
import templateCreationEn from './translations/en.templateCreation.i18n.json';
import templateCreationBr from './translations/pt_br.templateCreation.i18n.json';
import userInfoEN from './translations/en_us.userInfo.i18n.json';
import userInfoPtBr from './translations/pt_br.userInfo.i18n.json';

// Import moment locales here. The default locale is english (en).
import 'moment/locale/pt-br';

const resources = {
  en: {
    attrs: attrsEn,
    common: commonEn,
    constants: constantsEn,
    createTemplate: createTemplateEn,
    editTemplate: editTemplateEn,
    error: errorEn,
    languages: languagesEn,
    success: successEn,
    templateAttrs: templateAttrsEn,
    templates: templatesEn,
    templateCreation: templateCreationEn,
    userInfo: userInfoEN,
  },
  'pt-BR': {
    attrs: attrsPtBr,
    common: commonPtBr,
    constants: constantsPtBr,
    createTemplate: createTemplatePtBr,
    editTemplate: editTemplatePtBr,
    error: errorPtBr,
    languages: languagesPtBr,
    success: successPtBr,
    templateAttrs: templateAttrsPtBr,
    templates: templatesPtBr,
    templateCreation: templateCreationBr,
    userInfo: userInfoPtBr
  },
};

const preferredLanguage = localStorage.getItem(LANGUAGE_KEYS.LANGUAGE);
const lng = preferredLanguage || navigator.language || navigator.userLanguage;

templateInstance
    .use(initReactI18next)
    .init({
  ns: ['common', 'templates', 'templateAttrs', 'createTemplate', 'editTemplate'],
  defaultNS: 'templates',
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

i18n.on('languageChanged', handleLoadMomentLocale);
handleLoadMomentLocale(lng); // Load locale on app first render

export default templateInstance;
