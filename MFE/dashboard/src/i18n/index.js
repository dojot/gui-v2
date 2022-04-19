import i18n from 'i18next';
import moment from 'moment';
import { initReactI18next } from 'react-i18next';
import { LANGUAGE_KEYS } from 'sharedComponents/Constants';

const dashboardInstance = i18n.createInstance();
import attrsEn from './translations/en.attrs.i18n.json';
import attrsPtBr from './translations/pt_br.attrs.i18n.json';
import commonEn from './translations/en.common.i18n.json';
import commonPtBr from './translations/pt_br.common.i18n.json';
import constantsEn from './translations/en.constants.i18n.json';
import constantsPtBr from './translations/pt_br.constants.i18n.json';
import dashboardEn from '../view/translations/en.dashboard.i18n.json';
import dashboardPtBr from '../view/translations/pt_br.dashboard.i18n.json';
import errorEn from './translations/en.error.i18n.json';
import errorPtBr from './translations/pt_br.error.i18n.json';
import languagesEn from './translations/en.languages.i18n.json';
import languagesPtBr from './translations/pt_br.languages.i18n.json';
import successEn from './translations/en.success.i18n.json';
import successPtBr from './translations/pt_br.success.i18n.json';
import userInfoEN from './translations/en_us.userInfo.i18n.json';
import userInfoPtBr from './translations/pt_br.userInfo.i18n.json';

// Import moment locales here. The default locale is english (en).
import 'moment/locale/pt-br';

const resources = {
    en: {
        common: commonEn,
        dashboard: dashboardEn,
        attrs: attrsEn,
        error: errorEn,
        success: successEn,
        constants: constantsEn,
        languages: languagesEn,
        userInfo: userInfoEN,
    },
    'pt-BR': {
        common: commonPtBr,
        dashboard: dashboardPtBr,
        attrs: attrsPtBr,
        error: errorPtBr,
        success: successPtBr,
        constants: constantsPtBr,
        languages: languagesPtBr,
        userInfo: userInfoPtBr,
    },
};

const preferredLanguage = localStorage.getItem(LANGUAGE_KEYS.LANGUAGE);
const lng = preferredLanguage || navigator.language || navigator.userLanguage;

dashboardInstance.use(initReactI18next).init({
    ns: ['common', 'dashboard'],
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
    if(lang) moment.locale(lang.toLowerCase());
};

dashboardInstance.on('languageChanged', handleLoadMomentLocale);

handleLoadMomentLocale(lng); // Load locale on app first render

export default dashboardInstance;
