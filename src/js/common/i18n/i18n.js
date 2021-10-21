import confirmModalEN from 'Components/Modal/ConfirmationModal/translations/en.confirmation.modal.i18n.json';
import confirmModalPtBr from 'Components/Modal/ConfirmationModal/translations/pt_br.confirmation.modal.i18n.json';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import dashboardEn from '../../views/dashboard/translations/en.dashboard.i18n.json';
import dashboardPtBr from '../../views/dashboard/translations/pt_br.dashboard.i18n.json';
import loginEn from '../../views/login/translations/en.login.i18n.json';
import loginPtBr from '../../views/login/translations/pt_br.login.i18n.json';
import paginatorEn from '../components/Paginator/translations/en.paginator.i18n.json';
import paginatorPtBr from '../components/Paginator/translations/pt_br.paginator.i18n.json';
import menuEn from '../menu/translations/en.menu.i18n.json';
import menuPtBr from '../menu/translations/pt_br.menu.i18n.json';
import commonEn from './translations/en.common.i18n.json';
import commonPtBr from './translations/pt_br.common.i18n.json';

const resources = {
  en: {
    login: loginEn,
    menu: menuEn,
    common: commonEn,
    paginator: paginatorEn,
    dashboard: dashboardEn,
    modal: confirmModalEN,
  },
  pt: {
    login: loginPtBr,
    menu: menuPtBr,
    common: commonPtBr,
    paginator: paginatorPtBr,
    dashboard: dashboardPtBr,
    modal: confirmModalPtBr,
  },
};
const lng = navigator.language || navigator.userLanguage;
i18n.use(initReactI18next).init({
  ns: ['login', 'menu', 'common', 'dashboard', 'modal'],
  defaultNS: 'common',
  lng,
  resources,
  keySeparator: '.',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
