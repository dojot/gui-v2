import React, { useMemo, useState } from 'react';

import { Box, TextField, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useIsLoading } from '../../common/hooks';
import { actions, constants } from '../../redux/modules/certificationAuthorities';
import { ViewContainer } from '../stateComponents';
import useStyles from './style';

const CreateCertificationAuthority = () => {
  const { t } = useTranslation(['createCertificationAuthority', 'common']);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [caPem, setCaPem] = useState('');

  const canSave = useMemo(() => {
    return !!caPem;
  }, [caPem]);

  const isSaving = useIsLoading(constants.CREATE_CERTIFICATION_AUTHORITY);

  const handleChangeValue = setValueFn => {
    return e => setValueFn(e.target.value);
  };

  const handleGoBack = () => {
    if (history.length) history.goBack();
    else history.push('/certification-authorities');
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(
      actions.createCertificationAuthority({
        caPem,
        successCallback: handleGoBack,
      }),
    );
  };

  return (
    <ViewContainer headerTitle={t('title')}>
      <Box className={classes.container}>
        <form className={classes.content} noValidate onSubmit={handleSubmit}>
          <TextField
            placeholder={t('caPemLabel')}
            variant='outlined'
            value={caPem}
            rows={20}
            onChange={handleChangeValue(setCaPem)}
            multiline
            fullWidth
          />

          <Box className={classes.bottomButtonsWrapper}>
            <Button size='large' onClick={handleGoBack}>
              {t('common:cancel')}
            </Button>

            <Button
              className={classes.saveButton}
              disabled={isSaving || !canSave}
              variant='contained'
              color='primary'
              type='submit'
              size='large'
            >
              {t('common:save')}
            </Button>
          </Box>
        </form>
      </Box>
    </ViewContainer>
  );
};

export default CreateCertificationAuthority;
