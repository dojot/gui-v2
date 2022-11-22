import React, { useEffect, useState } from 'react';
import { Popover, Typography, Button, Radio, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { actions } from '../../../redux/modules/reports';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useMassActionsStyles } from './style';

const GenerateReportPopover = ({
  anchorEl,
  handleClose,
  numberOfSelectedDevices,
  reportPeriod,
  selectedDevices,
}) => {
  const dispatch = useDispatch();
  const classes = useMassActionsStyles();
  const { t } = useTranslation(['createReport', 'common']);
  const history = useHistory();

  const [isUniqueFileReport, setIsUniqueFileReport] = useState(true);
  const [fileExtension, setFileExtension] = useState('csv');
  const [reportName, setReportName] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (numberOfSelectedDevices === 1) {
      setCurrentStep(1);
    } else {
      setCurrentStep(0);
    }
  }, [numberOfSelectedDevices]);

  const handleGoToReportsList = () => {
    history.push('/reports');
  };

  const generateReport = () => {
    dispatch(
      actions.createReport({
        selectedDevices: selectedDevices,
        initialPeriod: reportPeriod.initialPeriod,
        finalPeriod: reportPeriod.finalPeriod,
        isUniqueFileReport: isUniqueFileReport,
        fileExtension: fileExtension,
        reportName: reportName,
        successCallback: handleGoToReportsList,
      }),
    );
  };

  return (
    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <div className={classes.popover}>
        <header className={classes.popoverHeader}>
          {currentStep === 0 && (
            <Typography>
              <strong>
                {t('generateReportPopover.headerTitle', { count: numberOfSelectedDevices })}
              </strong>
            </Typography>
          )}

          {currentStep === 1 && (
            <TextField
              label={t('generateReportPopover.reportNameInputPh')}
              value={reportName}
              onChange={e => setReportName(e.target.value)}
              color='secondary'
              variant='outlined'
            />
          )}
        </header>
        <div className={classes.popoverBody}>
          {currentStep === 0 && (
            <>
              <div className={classes.radioButtonWrapper}>
                <Radio
                  onChange={() => setIsUniqueFileReport(true)}
                  checked={isUniqueFileReport}
                  color='secondary'
                  value='a'
                  name='radio-button-demo'
                />
                <Typography>{t('generateReportPopover.generateUniqueReport')}</Typography>
              </div>

              <div className={classes.radioButtonWrapper}>
                <Radio
                  onChange={() => setIsUniqueFileReport(false)}
                  checked={!isUniqueFileReport}
                  color='secondary'
                  value='a'
                  name='radio-button-demo'
                />
                <Typography>
                  {t('generateReportPopover.generateIndividualReportPerDevice')}
                </Typography>
              </div>
            </>
          )}

          {currentStep === 1 && (
            <>
              <Typography>{t('generateReportPopover.reportFormat')}</Typography>
              <div className={classes.radioButtonWrapper}>
                <Radio
                  checked={fileExtension === 'csv'}
                  onChange={() => setFileExtension('csv')}
                  color='secondary'
                  value='a'
                  name='radio-button-demo'
                />
                <Typography>{t('generateReportPopover.csv')}</Typography>
              </div>

              <div className={classes.radioButtonWrapper}>
                <Radio
                  checked={fileExtension === 'pdf'}
                  onChange={() => setFileExtension('pdf')}
                  color='secondary'
                  value='a'
                  name='radio-button-demo'
                />
                <Typography>{t('generateReportPopover.pdf')}</Typography>
              </div>
            </>
          )}
        </div>
        <footer className={classes.popoverFooter}>
          {currentStep === 0 && (
            <Button onClick={() => setCurrentStep(1)} variant='text' color='secondary'>
              {t('common:next')}
            </Button>
          )}

          {currentStep === 1 && (
            <Button
              onClick={generateReport}
              variant='text'
              color='secondary'
              disabled={reportName.length === 0}
            >
              {t('generateReportPopover.generateButtonText')}
            </Button>
          )}
        </footer>
      </div>
    </Popover>
  );
};

GenerateReportPopover.propTypes = {
  anchorEl: PropTypes.object,
  handleClose: PropTypes.func.isRequired,
  numberOfSelectedDevices: PropTypes.number.isRequired,
  reportPeriod: PropTypes.object.isRequired,
  selectedDevices: PropTypes.object.isRequired,
};

GenerateReportPopover.defaultProps = {
  anchorEl: null,
};

export default GenerateReportPopover;
