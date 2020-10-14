import { ExitToApp, HelpOutline } from '@material-ui/icons';

export default [
  {
    visible: false,
    i18n: 'help',
    label: 'Ajuda',
    path: '/help',
    icon: HelpOutline,
  },
  {
    visible: true,
    i18n: 'exit',
    label: 'Sair',
    path: '/logout',
    icon: ExitToApp,
  },
];
