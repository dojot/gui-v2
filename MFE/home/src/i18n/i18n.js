import i18n from 'i18next';
import moment from 'moment';
import { initReactI18next } from 'react-i18next';
import { LANGUAGE_KEYS } from 'sharedComponents/Constants';

const homeInstance = i18n.createInstance();
import homeEn from './translations/en.home.i18n.json';
import homePtBr from './translations/pt_br.home.i18n.json';
import commonEn from './translations/en.common.i18n.json';
import commonPtBr from './translations/pt_br.common.i18n.json';
import languagesEn from './translations/en.languages.i18n.json';
import languagesPtBr from './translations/pt_br.languages.i18n.json';
import userInfoEN from './translations/en_us.userInfo.i18n.json';
import userInfoPtBr from './translations/pt_br.userInfo.i18n.json';

// Import moment locales here. The default locale is english (en).
import 'moment/locale/pt-br';

const resources = {
    en: {
        common: commonEn,
        home: homeEn,
        languages: languagesEn,
        userInfo: userInfoEN,
    },
    'pt-BR': {
        common: commonPtBr,
        home: homePtBr,
        languages: languagesPtBr,
        userInfo: userInfoPtBr,
    },
};

const preferredLanguage = localStorage.getItem(LANGUAGE_KEYS.LANGUAGE);
const lng = preferredLanguage || navigator.language || navigator.userLanguage;
homeInstance
    .use(initReactI18next)
    .init({
        ns: ['common', 'home'],
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
    if(lang) moment.locale(lang.toLowerCase());
};

homeInstance.on('languageChanged', handleLoadMomentLocale);
handleLoadMomentLocale(lng); // Load locale on app first render

export default homeInstance;
