import i18n from 'i18next';
import moment from 'moment';
import { initReactI18next } from 'react-i18next';
import { LANGUAGE_KEYS } from 'sharedComponents/Constants';

import commonEn from './translations/en.common.i18n.json';
import flowsEN from './translations/en.flows.i18n.json';
import languagesEn from './translations/en.languages.i18n.json';
import userInfoEN from './translations/en_us.userInfo.i18n.json';
import commonPtBr from './translations/pt_br.common.i18n.json';
import flowsPtBr from './translations/pt_br.flows.i18n.json';
import languagesPtBr from './translations/pt_br.languages.i18n.json';
import userInfoPtBr from './translations/pt_br.userInfo.i18n.json';

// Import moment locales here. The default locale is english (en).
import 'moment/locale/pt-br';

const flowInstance = i18n.createInstance();

const resources = {
  en: {
    common: commonEn,
    languages: languagesEn,
    userInfo: userInfoEN,
    flows: flowsEN,
  },
  'pt-BR': {
    common: commonPtBr,
    languages: languagesPtBr,
    userInfo: userInfoPtBr,
    flows: flowsPtBr,
  },
};

const preferredLanguage = localStorage.getItem(LANGUAGE_KEYS.LANGUAGE);
const lng = preferredLanguage || navigator.language || navigator.userLanguage;
flowInstance.use(initReactI18next).init({
  ns: ['common', 'flow'],
  defaultNS: 'common',
  fallbackLng: 'en',
  lng,
  resources,
  keySeparator: '.',
  interpolation: {
    escapeValue: false,
  },
  react: {
    bindI18n: 'languageChanged',
    bindI18nStore: '',
    transEmptyNodeValue: '',
    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
    useSuspense: true,
  },
});

const handleLoadMomentLocale = lang => {
  if (lang) moment.locale(lang.toLowerCase());
};

flowInstance.on('languageChanged', handleLoadMomentLocale);
handleLoadMomentLocale(lng); // Load locale on app first render

export default flowInstance;
