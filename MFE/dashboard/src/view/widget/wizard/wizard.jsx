import React, { useState } from 'react';

import { Button, Step, StepLabel, Stepper, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { EVENT } from 'sharedComponents/Constants';
import { DevelopmentContainer, ViewContainer } from 'sharedComponents/Containers';
import { AlertDialog } from 'sharedComponents/Dialogs';
import { dispatchEvent } from 'sharedComponents/Hooks';
import { StepIcon } from 'sharedComponents/StepIcon';
import { StepLine } from 'sharedComponents/StepLine';

import useStyles from './style';

const Wizard = ({ initialValues, ...props }) => {
  const { steps, onSubmit, headerTitle, children } = props;

  const [page, setPage] = useState(0);
  const [formValues, setValues] = useState(initialValues || {});
  const [isShowingCancelModal, setIsShowingCancelModal] = useState(false);

  const history = useHistory();

  const cancel = () => {
    setIsShowingCancelModal(true);
  };

  const handleHideCancelModal = () => {
    setIsShowingCancelModal(false);
  };

  const handleGoBack = () => {
    history.push('/dashboard');
  };

  const next = value => {
    setPage(Math.min(page + 1, children.length - 1));
    setValues(value);
  };

  const previous = () => {
    setPage(Math.max(page - 1, 0));
  };

  const validate = value => {
    const activePage = React.Children.toArray(children)[page];
    return activePage.props.validate ? activePage.props.validate(value) : {};
  };

  const handleFormSubmit = value => {
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(value);
    }
    next(value);
    return null;
  };

  const checkErrorsBeforeSubmit = (event, invalid, error, callback) => {
    if (invalid) {
      dispatchEvent(EVENT.GLOBAL_TOAST, {
        duration: 10000,
        i18nMessage: error.msg || 'requiredFiled',
        type: 'warning',
      });
    }
    callback(event);
  };

  const activePage = React.Children.toArray(children)[page];
  const isLastPage = page === React.Children.count(children) - 1;
  const classes = useStyles();
  const { t } = useTranslation(['common', 'dashboard']);
  return (
    <ViewContainer headerTitle={headerTitle}>
      <AlertDialog
        isOpen={isShowingCancelModal}
        cancelButtonText={t('common:no')}
        autoFocusConfirmationButton={false}
        title={t('dashboard:cancelDashboardCreationTitle')}
        confirmButtonText={t('common:yesImSure')}
        message={t('dashboard:cancelDashboardCreationMessage')}
        handleConfirm={handleGoBack}
        handleClose={handleHideCancelModal}
      />

      <div className={classes.root}>
        <Box className={classes.stepperWrapper}>
          <Stepper
            className={classes.stepper}
            activeStep={page}
            orientation='horizontal'
            connector={<StepLine />}
          >
            {steps.map(({ label, key }) => (
              <Step key={key}>
                <StepLabel StepIconComponent={StepIcon}>
                  {t([`dashboard:${label}`, 'undefined'])}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Form
          initialValues={formValues}
          validate={validate}
          onSubmit={handleFormSubmit}
          mutators={{
            clearField: ([name, value], state, { changeValue }) => {
              changeValue(state, name, () => value);
            },
            clearAttributesByDevice: ([id, locale], state, { changeValue, getIn }) => {
              const data = getIn(state, `formState.values.${locale}`);
              if (data) {
                const keysToBeDeleted = Object.keys(data).filter(v => v.startsWith(id));
                keysToBeDeleted.forEach(e => {
                  delete data[e];
                });
              }
              changeValue(state, locale, () => data);
            },
          }}
          render={({ handleSubmit, submitting, values, form, invalid, errors }) => (
            <form
              onSubmit={event => checkErrorsBeforeSubmit(event, invalid, errors, handleSubmit)}
              className={classes.form}
            >
              <div className={classes.formContent}>
                {React.cloneElement(activePage, { values, form }, null)}

                <DevelopmentContainer>
                  <div className={classes.developmentContainer}>
                    {JSON.stringify(values, null, 2)}
                  </div>
                </DevelopmentContainer>
              </div>

              <div className={classes.footer}>
                <Button
                  className={classes.footerButton}
                  type='button'
                  color='secondary'
                  variant='text'
                  size='large'
                  disableElevation
                  onClick={cancel}
                >
                  {t('cancel')}
                </Button>

                <div>
                  {page > 0 && (
                    <Button
                      className={classes.footerButton}
                      type='button'
                      color='secondary'
                      variant='outlined'
                      size='large'
                      disableElevation
                      onClick={previous}
                    >
                      {t('back')}
                    </Button>
                  )}
                  {!isLastPage && (
                    <Button
                      className={classes.footerButton}
                      type='submit'
                      size='large'
                      color='secondary'
                      variant='contained'
                      disableElevation
                    >
                      {t('next')}
                    </Button>
                  )}
                  {isLastPage && (
                    <Button
                      className={classes.footerButton}
                      type='submit'
                      disabled={submitting}
                      color='secondary'
                      variant='contained'
                      size='large'
                      disableElevation
                    >
                      {t('finish')}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          )}
        />
      </div>
    </ViewContainer>
  );
};

Wizard.Page = ({ children }) => children;

Wizard.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Wizard;
