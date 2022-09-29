import React from 'react';

import { Box, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useActionButtonStyles } from './style';

const ActionButtons = ({
  isLastStep,
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
        {t(isLastStep ? 'finish' : 'next')}
      </Button>
    </Box>
  );
};

ActionButtons.propTypes = {
  isLastStep: PropTypes.bool,
  isNextButtonDisabled: PropTypes.bool,
  isCancelButtonDisabled: PropTypes.bool,
  handleClickNextButton: PropTypes.func,
  handleClickCancelButton: PropTypes.func,
};

ActionButtons.defaultProps = {
  isLastStep: false,
  isNextButtonDisabled: false,
  isCancelButtonDisabled: false,
  handleClickNextButton: null,
  handleClickCancelButton: null,
};

export default ActionButtons;
