import React from 'react';

import { Box, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useActionButtonStyles } from './style';

const ActionButtons = ({
  withBackButton,
  handleClickBackButton,
  handleClickNextButton,
  handleClickCancelButton,
}) => {
  const { t } = useTranslation('common');
  const classes = useActionButtonStyles();

  return (
    <Box className={classes.container}>
      <Button
        className={withBackButton ? classes.cancelButtonLeftAligned : null}
        variant='text'
        size='large'
        onClick={handleClickCancelButton}
      >
        {t('cancel')}
      </Button>

      {withBackButton && (
        <Button variant='outlined' color='primary' size='large' onClick={handleClickBackButton}>
          {t('back')}
        </Button>
      )}

      <Button variant='contained' color='primary' size='large' onClick={handleClickNextButton}>
        {t('next')}
      </Button>
    </Box>
  );
};

ActionButtons.propTypes = {
  withBackButton: PropTypes.bool,
  handleClickBackButton: PropTypes.func,
  handleClickNextButton: PropTypes.func,
  handleClickCancelButton: PropTypes.func,
};

ActionButtons.defaultProps = {
  withBackButton: false,
  handleClickBackButton: null,
  handleClickNextButton: null,
  handleClickCancelButton: null,
};

export default ActionButtons;
