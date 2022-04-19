const securityInstance = i18n.createInstance();
import i18n from 'i18next';
import moment from 'moment';
import { initReactI18next } from 'react-i18next';
import { LANGUAGE_KEYS } from 'sharedComponents/Constants';

import attrsPtBr from './translations/pt_br.attrs.i18n.json';
import certificatesEn from '../view/Certificates/translations/en.certificates.i18n.json';
import certificatesPtBr from '../view/Certificates/translations/pt_br.certificates.i18n.json';
import certificationAuthoritiesEn
    from '../view/CertificationAuthorities/translations/en.certificationAuthorities.i18n.json';
import certificationAuthoritiesPtBr
    from '../view/CertificationAuthorities/translations/pt_br.certificationAuthorities.i18n.json';
import commonEn from './translations/en.common.i18n.json';
import commonPtBr from './translations/pt_br.common.i18n.json';
import constantsEn from './translations/en.constants.i18n.json';
import constantsPtBr from './translations/pt_br.constants.i18n.json';
import createCertificateEn from '../view/createCertificate/translations/en.createCertificate.i18n.json';
import createCertificatePtBr from '../view/createCertificate/translations/pt_br.createCertificate.i18n.json';
import createCertificationAuthorityEn
    from '../view/createCertificationAuthority/translations/en.createCertificationAuthority.json';
import createCertificationAuthorityPtBr
    from '../view/createCertificationAuthority/translations/pt_br.createCertificationAuthority.json';
import errorEn from './translations/en.error.i18n.json';
import errorPtBr from './translations/pt_br.error.i18n.json';
import languagesPtBr from './translations/pt_br.languages.i18n.json';
import languagesEn from './translations/en.languages.i18n.json';
import successEn from './translations/en.success.i18n.json';
import successPtBr from './translations/pt_br.success.i18n.json';
import userInfoEN from './translations/en_us.userInfo.i18n.json';
import userInfoPtBr from './translations/pt_br.userInfo.i18n.json';

// Import moment locales here. The default locale is english (en).
import 'moment/locale/pt-br';

const resources = {
    en: {
        common: commonEn,
        certificationAuthorities: certificationAuthoritiesEn,
        createCertificationAuthority: createCertificationAuthorityEn,
        certificates: certificatesEn,
        error: errorEn,
        success: successEn,
        createCertificate: createCertificateEn,
        constants: constantsEn,
        languages: languagesEn,
        userInfo: userInfoEN,
    },
    'pt-BR': {
        common: commonPtBr,
        attrs: attrsPtBr,
        certificationAuthorities: certificationAuthoritiesPtBr,
        createCertificationAuthority: createCertificationAuthorityPtBr,
        certificates: certificatesPtBr,
        error: errorPtBr,
        success: successPtBr,
        createCertificate: createCertificatePtBr,
        constants: constantsPtBr,
        languages: languagesPtBr,
        userInfo: userInfoPtBr,
    },
};

const preferredLanguage = localStorage.getItem(LANGUAGE_KEYS.LANGUAGE);
const lng = preferredLanguage || navigator.language || navigator.userLanguage;

securityInstance
    .use(initReactI18next)
    .init({
        ns: ['common', 'certificationAuthorities', 'createCertificationAuthority', 'certificates', 'createCertificate', 'templates', 'templateAttrs', 'createTemplate', 'editTemplate'],
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

securityInstance.on('languageChanged', handleLoadMomentLocale);
handleLoadMomentLocale(lng); // Load locale on app first render

export default securityInstance;
