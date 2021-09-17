import {
  Dashboard,
  DeviceHub,
  DevicesOther,
  FilterNone,
  NotificationImportant,
  People,
  SupervisedUserCircle,
} from '@material-ui/icons';

export const MENU_ITEMS = [
  {
    visible: true,
    i18n: 'devices',
    label: 'Dispositivos',
    path: '/devices',
    icon: DevicesOther,
  },
  {
    visible: true,
    i18n: 'templates',
    label: 'Modelos',
    path: '/templates',
    icon: FilterNone,
  },
  {
    visible: true,
    i18n: 'flows',
    label: 'Fluxos',
    path: '/flow',
    icon: DeviceHub,
  },
  {
    i18n: 'notifications',
    label: 'Notificações',
    path: '/notification',
    icon: NotificationImportant,
  },
  {
    visible: true,
    i18n: 'users',
    label: 'Usuários',
    path: '/users',
    icon: People,
  },
  {
    visible: true,
    i18n: 'profiles',
    label: 'Perfis',
    path: '/profiles',
    icon: SupervisedUserCircle,
  },
  {
    visible: true,
    i18n: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: Dashboard,
  },
];
