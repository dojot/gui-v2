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
    label: 'Dispositivos',
    path: '/devices',
    icon: DevicesOther,
  },
  {
    label: 'Modelos',
    path: '/templates',
    icon: FilterNone,
  },
  {
    label: 'Fluxos',
    path: '/flow',
    icon: DeviceHub,
  },
  {
    label: 'Notificações',
    path: '/notification',
    icon: NotificationImportant,
  },
  {
    label: 'Usuários',
    path: '/users',
    icon: People,
  },
  {
    label: 'Perfis',
    path: '/profiles',
    icon: SupervisedUserCircle,
  },
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: Dashboard,
  },
];
