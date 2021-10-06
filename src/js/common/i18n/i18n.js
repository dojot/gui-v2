import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import dashboardEn from '../../views/dashboard/translations/en.dashboard.i18n.json';
import dashboardPtBr from '../../views/dashboard/translations/pt_br.dashboard.i18n.json';
import homeEn from '../../views/home/translations/en.home.i18n.json';
import homePtBr from '../../views/home/translations/pt_br.home.i18n.json';
import loginEn from '../../views/login/translations/en.login.i18n.json';
import loginPtBr from '../../views/login/translations/pt_br.login.i18n.json';
import userInfoEn from '../../views/stateComponents/UserInfo/translations/en_us.userInfo.i18n.json';
import userInfoBr from '../../views/stateComponents/UserInfo/translations/pt_br.userInfo.i18n.json';
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
    home: homeEn,
    userInfo: userInfoEn,
  },
  pt: {
    login: loginPtBr,
    menu: menuPtBr,
    common: commonPtBr,
    paginator: paginatorPtBr,
    dashboard: dashboardPtBr,
    home: homePtBr,
    userInfo: userInfoBr,
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
