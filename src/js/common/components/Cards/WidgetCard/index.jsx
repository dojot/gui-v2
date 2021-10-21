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
import { ConfirmationModal } from 'Components/Modal';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import useStyles from './style';

const WidgetCard = ({ id, onDelete, onPin, config, children, onEdit, onExport }) => {
  const classes = useStyles();

  const [openModal, setOpenModal] = React.useState(false);
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

  const handleConfirm = () => {
    setOpenModal(true);
    setAnchorEl(null);
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
              <MenuItem onClick={() => handleClose(onExport)}>
                <ListItemText primary={t('common:export')} />
              </MenuItem>
              <MenuItem onClick={() => handleConfirm()}>
                <ListItemText primary={t('common:delete')} />
              </MenuItem>
              <ConfirmationModal
                open={openModal}
                onClose={setOpenModal}
                callback={() => onDelete(id)}
              />
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

WidgetCard.propTypes = {
  id: PropTypes.string.isRequired,
  config: PropTypes.shape({
    meta: PropTypes.shape({
      title: PropTypes.string.isRequired,
      subTitle: PropTypes.string,
    }),
  }).isRequired,
  children: PropTypes.node.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPin: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onExport: PropTypes.func.isRequired,
};

export default WidgetCard;
