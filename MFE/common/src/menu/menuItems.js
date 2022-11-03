import {
  Dashboard,
  DevicesOther,
  FilterNone,
  Home,
  VerifiedUser,
  Description,
  DeviceHub,
} from '@material-ui/icons';

export const MENU_ITEMS = [
  {
    visible: true,
    name: 'home',
    path: '/home',
    icon: Home,
  },
  {
    visible: true,
    name: 'dashboard',
    path: '/dashboard',
    icon: Dashboard,
  },
  {
    visible: true,
    name: 'devices',
    path: '/devices',
    icon: DevicesOther,
  },
  {
    visible: true,
    name: 'templates',
    path: '/templates',
    icon: FilterNone,
  },
  {
    visible: true,
    name: 'flows',
    path: '/flows',
    icon: DeviceHub,
  },
  {
    visible: true,
    collapsible: true,
    name: 'security',
    icon: VerifiedUser,
    subItems: [
      {
        visible: true,
        name: 'certificates',
        path: '/certificates',
      },
      {
        visible: true,
        name: 'CA',
        path: '/certification-authorities',
      },
    ],
  },
  {
    visible: true,
    collapsible: true,
    name: 'reports',
    icon: Description,
    subItems: [
      {
        visible: true,
        name: 'create-report',
        path: '/create-report',
      },
      {
        visible: true,
        name: 'my-reports',
        path: '/reports',
      },
    ],
  },
];
