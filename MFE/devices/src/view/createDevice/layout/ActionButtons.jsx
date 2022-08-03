import React from 'react';

import { Box, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useActionButtonStyles } from './style';

const ActionButtons = ({
  isLastStep,
  withBackButton,
  isBackButtonDisabled,
  isNextButtonDisabled,
  isCancelButtonDisabled,
  handleClickBackButton,
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

      {withBackButton && (
        <Button
          className={classes.backButton}
          size='large'
          color='primary'
          variant='outlined'
          disabled={isBackButtonDisabled}
          onClick={handleClickBackButton}
        >
          {t('back')}
        </Button>
      )}

      <Button
        className={classes.nextButton}
        size='large'
        color='primary'
        variant='contained'
        onClick={handleClickNextButton}
        disabled={isNextButtonDisabled}
      >
        {t(isLastStep ? 'finish' : 'next')}
      </Button>
    </Box>
  );
};

ActionButtons.propTypes = {
  isLastStep: PropTypes.bool,
  withBackButton: PropTypes.bool,
  isBackButtonDisabled: PropTypes.bool,
  isNextButtonDisabled: PropTypes.bool,
  isCancelButtonDisabled: PropTypes.bool,
  handleClickBackButton: PropTypes.func,
  handleClickNextButton: PropTypes.func,
  handleClickCancelButton: PropTypes.func,
};

ActionButtons.defaultProps = {
  isLastStep: false,
  withBackButton: false,
  isBackButtonDisabled: false,
  isNextButtonDisabled: false,
  isCancelButtonDisabled: false,
  handleClickBackButton: null,
  handleClickNextButton: null,
  handleClickCancelButton: null,
};

export default ActionButtons;
