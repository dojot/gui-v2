import React, { useState } from 'react';

import { Button } from '@material-ui/core';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { DevelopmentContainer } from 'Components/Containers';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';

import { ViewContainer } from '../../../stateComponents';
import useStyles from './style';

const Wizard = ({ initialValues, ...props }) => {
  const { steps, onSubmit, headerTitle, children } = props;
  const [page, setPage] = useState(0);
  const [values, setValues] = useState(initialValues || {});

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

  const handleSubmit = value => {
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(value);
    }
    next(value);
    return null;
  };

  const activePage = React.Children.toArray(children)[page];
  const isLastPage = page === React.Children.count(children) - 1;
  const classes = useStyles();
  const { t } = useTranslation(['common', 'dashboard']);
  return (
    <ViewContainer headerTitle={headerTitle}>
      <div className={classes.root}>
        <Stepper classes={{ root: classes.paper }} alternativeLabel activeStep={page}>
          {steps.map(({ label, key }) => (
            <Step key={key}>
              <StepLabel>{t([`dashboard:${label}`, 'undefined'])}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Form initialValues={values} validate={validate} onSubmit={handleSubmit}>
          {formProps => (
            <form onSubmit={formProps.handleSubmit}>
              {React.cloneElement(activePage, { values: formProps.values }, null)}
              <div className={classes.footer}>
                {page > 0 && (
                  <Button
                    type='button'
                    color='primary'
                    variant='contained'
                    disableElevation
                    onClick={previous}
                  >
                    {t('back')}
                  </Button>
                )}
                {!isLastPage && (
                  <Button type='submit' color='primary' variant='contained' disableElevation>
                    {t('next')}
                  </Button>
                )}
                {isLastPage && (
                  <Button
                    type='submit'
                    disabled={formProps.submitting}
                    color='primary'
                    variant='contained'
                    disableElevation
                  >
                    {t('finish')}
                  </Button>
                )}
              </div>
              <DevelopmentContainer>
                <pre>{JSON.stringify(formProps.values, null, 2)}</pre>
              </DevelopmentContainer>
            </form>
          )}
        </Form>
      </div>
    </ViewContainer>
  );
};

Wizard.Page = ({ children }) => children;

Wizard.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Wizard;
