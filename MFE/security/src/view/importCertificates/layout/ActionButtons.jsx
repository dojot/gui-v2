import React from 'react';

import { Box, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useActionButtonStyles } from './style';

const ActionButtons = ({
  isNextButtonDisabled,
  isCancelButtonDisabled,
  handleClickNextButton,
  handleClickCancelButton,
}) => {
  const { t } = useTranslation('common');
  const classes = useActionButtonStyles();

  return (
    <Box className={classes.container}>
      <Button
        className={classes.cancelButton}
        size='large'
        variant='text'
        disabled={isCancelButtonDisabled}
        onClick={handleClickCancelButton}
      >
        {t('cancel')}
      </Button>

      <Button
        className={classes.nextButton}
        size='large'
        color='secondary'
        variant='contained'
        onClick={handleClickNextButton}
        disabled={isNextButtonDisabled}
      >
        {t('finish')}
      </Button>
    </Box>
  );
};

ActionButtons.propTypes = {
  isNextButtonDisabled: PropTypes.bool,
  isCancelButtonDisabled: PropTypes.bool,
  handleClickNextButton: PropTypes.func,
  handleClickCancelButton: PropTypes.func,
};

ActionButtons.defaultProps = {
  isNextButtonDisabled: false,
  isCancelButtonDisabled: false,
  handleClickNextButton: null,
  handleClickCancelButton: null,
};

export default ActionButtons;
