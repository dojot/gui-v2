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
import createDeviceEn from '../view/createDevice/translations/en.createDevice.i18n.json';
import createDevicePtBr from '../view/createDevice/translations/pt_br.createDevice.i18n.json';
import createMultipleDevicesEn from '../view/createMultipleDevices/translations/en.createMultipleDevices.i18n.json';
import createMultipleDevicesPtBr from '../view/createMultipleDevices/translations/pt_br.createMultipleDevices.i18n.json';
import deviceDetailsEn from '../view/deviceDetails/translations/en.deviceDetails.i18n.json';
import deviceDetailsPtBr from '../view/deviceDetails/translations/pt_br.deviceDetails.i18n.json';
import devicesEn from '../view/devices/translations/en.devices.i18n.json';
import devicesPtBr from '../view/devices/translations/pt_br.devices.i18n.json';
import editDeviceEn from '../view/editDevice/translations/en.editDevice.i18n.json';
import editDevicePtBr from '../view/editDevice/translations/pt_br.editDevice.i18n.json';
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

const deviceInstance = i18n.createInstance();
// Import moment locales here. The default locale is english (en).
import 'moment/locale/pt-br';

const resources = {
  en: {
    common: commonEn,
    constants: constantsEn,
    createDevice: createDeviceEn,
    createMultipleDevices: createMultipleDevicesEn,
    deviceDetails: deviceDetailsEn,
    devices: devicesEn,
    editDevice: editDeviceEn,
    error: errorEn,
    languages: languagesEn,
    success: successEn,
    templatesTable: templatesTableEn,
    attrs: attrsEn,
    userInfo: userInfoEN,
    templateCreation: templateCreationEn,
  },
  'pt-BR': {
    common: commonPtBr,
    constants: constantsPtBr,
    createDevice: createDevicePtBr,
    createMultipleDevices: createMultipleDevicesPtBr,
    deviceDetails: deviceDetailsPtBr,
    devices: devicesPtBr,
    editDevice: editDevicePtBr,
    error: errorPtBr,
    languages: languagesPtBr,
    success: successPtBr,
    templatesTable: templatesTablePtBr,
    attrs: attrsPtBr,
    userInfo: userInfoPtBr,
    templateCreation: templateCreationBr,
  },
};

const preferredLanguage = localStorage.getItem(LANGUAGE_KEYS.LANGUAGE);
const lng = preferredLanguage || navigator.language || navigator.userLanguage;

deviceInstance.use(initReactI18next).init({
  ns: [
    'common',
    'constants',
    'createDevice',
    'createMultipleDevices',
    'deviceDetails',
    'devices',
    'editDevice',
    'error',
    'languages',
    'success',
  ],
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
