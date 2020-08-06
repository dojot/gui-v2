import {
  Dashboard,
  DeviceHub,
  DevicesOther,
  FilterNone,
  NotificationImportant,
  People,
  SupervisedUserCircle,
} from '@material-ui/icons';

export default [
  {
    i18n: 'devices',
    label: 'Dispositivos',
    path: '/devices',
    icon: DevicesOther,
  },
  {
    i18n: 'templates',
    label: 'Modelos',
    path: '/templates',
    icon: FilterNone,
  },
  {
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
    i18n: 'users',
    label: 'Usuários',
    path: '/users',
    icon: People,
  },
  {
    i18n: 'profiles',
    label: 'Perfis',
    path: '/profiles',
    icon: SupervisedUserCircle,
  },
  {
    i18n: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: Dashboard,
  },
];
