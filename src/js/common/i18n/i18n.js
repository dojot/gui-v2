import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import createDeviceEn from '../../views/createDevice/translations/en.createDevice.i18n.json';
import createDevicePtBr from '../../views/createDevice/translations/pt_br.createDevice.i18n.json';
import createTemplateEn from '../../views/createTemplate/translations/en.createTemplate.i18n.json';
import createTemplatePtBr from '../../views/createTemplate/translations/pt_br.createTemplate.i18n.json';
import dashboardEn from '../../views/dashboard/translations/en.dashboard.i18n.json';
import dashboardPtBr from '../../views/dashboard/translations/pt_br.dashboard.i18n.json';
import devicesEn from '../../views/devices/translations/en.devices.i18n.json';
import devicesPtBr from '../../views/devices/translations/pt_br.devices.i18n.json';
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
import deviceIntegrationModalEn from '../components/TutorialModals/DeviceIntegrationModal/translations/en.deviceIntegrationModal.i18n.json';
import deviceIntegrationModalPtBr from '../components/TutorialModals/DeviceIntegrationModal/translations/pt_br.deviceIntegrationModal.i18n.json';
import templateCreationEn from '../components/WizardForms/TemplateCreation/translations/en.templateCreation.i18n.json';
import templateCreationPtBr from '../components/WizardForms/TemplateCreation/translations/pt_br.templateCreation.i18n.json';
import menuEn from '../menu/translations/en.menu.i18n.json';
import menuPtBr from '../menu/translations/pt_br.menu.i18n.json';
import attrsEn from './translations/en.attrs.i18n.json';
import commonEn from './translations/en.common.i18n.json';
import attrsPtBr from './translations/pt_br.attrs.i18n.json';
import commonPtBr from './translations/pt_br.common.i18n.json';

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
    createDevice: createDeviceEn,
    deviceIntegrationModal: deviceIntegrationModalEn,
  },
  pt: {
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
    createDevice: createDevicePtBr,
    deviceIntegrationModal: deviceIntegrationModalPtBr,
  },
};

const lng = navigator.language || navigator.userLanguage;

i18n.use(initReactI18next).init({
  ns: ['login', 'menu', 'common', 'dashboard'],
  defaultNS: 'common',
  lng,
  resources,
  keySeparator: '.',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
