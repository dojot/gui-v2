import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import More from '@material-ui/icons/MoreVert';
import { useTranslation } from 'react-i18next';

import useStyles from './style';

export default ({ id, onDelete, onPin, config, children, onEdit }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { t } = useTranslation(['common']);

  const handleClickMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (callback = () => {}) => {
    setAnchorEl(null);
    callback(id);
  };
  return (
    <Card className={classes.card} variant='outlined'>
      <CardHeader
        action={
          <div>
            <IconButton
              aria-controls='fade-menu-2'
              aria-haspopup='true'
              aria-label='settings'
              onClick={handleClickMenu}
              size='small'
              classes={{ sizeSmall: classes.iconButtonSmall }}
            >
              <More />
            </IconButton>
            <Menu
              id='fade-menu-2'
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={() => handleClose(onEdit)}>
                <ListItemText primary={t('common:edit')} />
              </MenuItem>
              <MenuItem onClick={() => handleClose(onPin)}>
                <ListItemText primary={t('common:pin')} />
              </MenuItem>
              <MenuItem onClick={() => handleClose(onDelete)}>
                <ListItemText primary={t('common:delete')} />
              </MenuItem>
            </Menu>
          </div>
        }
        classes={{
          root: classes.header,
          title: classes.headerTitle,
          action: classes.headerAction,
          subheader: classes.subHeaderTitle,
        }}
        title={config.meta.title}
        subheader={config.meta.subTitle}
      />
      <CardContent className={classes.cardContent}>{children}</CardContent>
    </Card>
  );
};
