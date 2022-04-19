import { Dashboard, DevicesOther, FilterNone, Home, VerifiedUser } from '@material-ui/icons';

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
];
