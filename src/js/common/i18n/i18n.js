import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import certificatesEn from '../../views/Certificates/translations/en.certificates.i18n.json';
import certificatesPtBr from '../../views/Certificates/translations/pt_br.certificates.i18n.json';
import certificationAuthoritiesEn from '../../views/CertificationAuthorities/translations/en.certificationAuthorities.i18n.json';
import certificationAuthoritiesPtBr from '../../views/CertificationAuthorities/translations/pt_br.certificationAuthorities.i18n.json';
import createCertificateEn from '../../views/createCertificate/translations/en.createCertificate.i18n.json';
import createCertificatePtBr from '../../views/createCertificate/translations/pt_br.createCertificate.i18n.json';
import createCertificationAuthorityEn from '../../views/createCertificationAuthority/translations/en.createCertificationAuthority.json';
import createCertificationAuthorityPtBr from '../../views/createCertificationAuthority/translations/pt_br.createCertificationAuthority.json';
import createDeviceEn from '../../views/createDevice/translations/en.createDevice.i18n.json';
import createDevicePtBr from '../../views/createDevice/translations/pt_br.createDevice.i18n.json';
import createTemplateEn from '../../views/createTemplate/translations/en.createTemplate.i18n.json';
import createTemplatePtBr from '../../views/createTemplate/translations/pt_br.createTemplate.i18n.json';
import dashboardEn from '../../views/dashboard/translations/en.dashboard.i18n.json';
import dashboardPtBr from '../../views/dashboard/translations/pt_br.dashboard.i18n.json';
import deviceDetailsEn from '../../views/deviceDetails/translations/en.deviceDetails.i18n.json';
import deviceDetailsPtBr from '../../views/deviceDetails/translations/pt_br.deviceDetails.i18n.json';
import devicesEn from '../../views/devices/translations/en.devices.i18n.json';
import devicesPtBr from '../../views/devices/translations/pt_br.devices.i18n.json';
import editDeviceEn from '../../views/editDevice/translations/en.editDevice.i18n.json';
import editDevicePtBr from '../../views/editDevice/translations/pt_br.editDevice.i18n.json';
import editTemplateEn from '../../views/editTemplate/translations/en.editTemplate.i18n.json';
import editTemplatePtBr from '../../views/editTemplate/translations/pt_br.editTemplate.i18n.json';
import homeEn from '../../views/home/translations/en.home.i18n.json';
import homePtBr from '../../views/home/translations/pt_br.home.i18n.json';
import loginEn from '../../views/login/translations/en.login.i18n.json';
import loginPtBr from '../../views/login/translations/pt_br.login.i18n.json';
import userInfoEn from '../../views/stateComponents/UserInfo/translations/en_us.userInfo.i18n.json';
import userInfoBr from '../../views/stateComponents/UserInfo/translations/pt_br.userInfo.i18n.json';
import templateAttrsEn from '../../views/templateAttrs/translations/en.templateAttrs.i18n.json';
import templateAttrsPtBr from '../../views/templateAttrs/translations/pt_br.templateAttrs.i18n.json';
import templatesEn from '../../views/templates/translations/en.templates.i18n.json';
import templatesPtBr from '../../views/templates/translations/pt_br.templates.i18n.json';
import paginatorEn from '../components/Paginator/translations/en.paginator.i18n.json';
import paginatorPtBr from '../components/Paginator/translations/pt_br.paginator.i18n.json';
import templatesTableEn from '../components/TemplatesTable/translations/en.templatesTable.i18n.json';
import templatesTablePtBr from '../components/TemplatesTable/translations/pt_br.templatesTable.i18n.json';
import deviceIntegrationModalEn from '../components/TutorialModals/DeviceIntegrationModal/translations/en.deviceIntegrationModal.i18n.json';
import deviceIntegrationModalPtBr from '../components/TutorialModals/DeviceIntegrationModal/translations/pt_br.deviceIntegrationModal.i18n.json';
import templateCreationEn from '../components/WizardForms/TemplateCreation/translations/en.templateCreation.i18n.json';
import templateCreationPtBr from '../components/WizardForms/TemplateCreation/translations/pt_br.templateCreation.i18n.json';
import { LANGUAGE_KEYS } from '../constants';
import menuEn from '../menu/translations/en.menu.i18n.json';
import menuPtBr from '../menu/translations/pt_br.menu.i18n.json';
import attrsEn from './translations/en.attrs.i18n.json';
import commonEn from './translations/en.common.i18n.json';
import constantsEn from './translations/en.constants.i18n.json';
import errorEn from './translations/en.error.i18n.json';
import languagesEn from './translations/en.languages.i18n.json';
import successEn from './translations/en.success.i18n.json';
import attrsPtBr from './translations/pt_br.attrs.i18n.json';
import commonPtBr from './translations/pt_br.common.i18n.json';
import constantsPtBr from './translations/pt_br.constants.i18n.json';
import errorPtBr from './translations/pt_br.error.i18n.json';
import languagesPtBr from './translations/pt_br.languages.i18n.json';
import successPtBr from './translations/pt_br.success.i18n.json';

const resources = {
  en: {
    login: loginEn,
    menu: menuEn,
    common: commonEn,
    paginator: paginatorEn,
    dashboard: dashboardEn,
    devices: devicesEn,
    home: homeEn,
    templates: templatesEn,
    createTemplate: createTemplateEn,
    templateCreation: templateCreationEn,
    templateAttrs: templateAttrsEn,
    attrs: attrsEn,
    userInfo: userInfoEn,
    certificationAuthorities: certificationAuthoritiesEn,
    createCertificationAuthority: createCertificationAuthorityEn,
    createDevice: createDeviceEn,
    deviceDetails: deviceDetailsEn,
    certificates: certificatesEn,
    deviceIntegrationModal: deviceIntegrationModalEn,
    editDevice: editDeviceEn,
    templatesTable: templatesTableEn,
    error: errorEn,
    success: successEn,
    editTemplate: editTemplateEn,
    createCertificate: createCertificateEn,
    constants: constantsEn,
    languages: languagesEn,
  },
  'pt-BR': {
    login: loginPtBr,
    menu: menuPtBr,
    common: commonPtBr,
    paginator: paginatorPtBr,
    dashboard: dashboardPtBr,
    devices: devicesPtBr,
    home: homePtBr,
    templates: templatesPtBr,
    createTemplate: createTemplatePtBr,
    templateCreation: templateCreationPtBr,
    templateAttrs: templateAttrsPtBr,
    attrs: attrsPtBr,
    userInfo: userInfoBr,
    certificationAuthorities: certificationAuthoritiesPtBr,
    createCertificationAuthority: createCertificationAuthorityPtBr,
    createDevice: createDevicePtBr,
    deviceDetails: deviceDetailsPtBr,
    certificates: certificatesPtBr,
    deviceIntegrationModal: deviceIntegrationModalPtBr,
    editDevice: editDevicePtBr,
    templatesTable: templatesTablePtBr,
    error: errorPtBr,
    success: successPtBr,
    editTemplate: editTemplatePtBr,
    createCertificate: createCertificatePtBr,
    constants: constantsPtBr,
    languages: languagesPtBr,
  },
};

const preferredLanguage = localStorage.getItem(LANGUAGE_KEYS.LANGUAGE);
const lng = preferredLanguage || navigator.language || navigator.userLanguage;

i18n.use(initReactI18next).init({
  ns: ['login', 'menu', 'common', 'dashboard'],
  defaultNS: 'common',
  fallbackLng: 'en',
  lng,
  resources,
  keySeparator: '.',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
