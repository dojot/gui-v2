import React, { useState, useEffect, useMemo } from 'react';

import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { TemplatesTable } from '../../common/components/TemplatesTable';
import { TEMPLATE_ATTR_TYPES } from '../../common/constants';
import { actions as templateActions } from '../../redux/modules/templates';
import {
  loadingTemplatesSelector,
  paginationControlSelector,
  templatesSelector,
} from '../../redux/selectors/templatesSelector';
import { ViewContainer } from '../stateComponents';
import AttrsTable from './AttrsTable';
import { useEditDeviceStyles } from './style';

const EditDevice = () => {
  const { t } = useTranslation(['editDevice', 'common']);
  const classes = useEditDeviceStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const deviceData = useSelector(() => null);
  const templates = useSelector(templatesSelector);
  const isLoadingTemplates = useSelector(loadingTemplatesSelector);
  const { totalPages = 0 } = useSelector(paginationControlSelector);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isShowingAttrs, setIsShowingAttrs] = useState(true);

  const [deviceName, setDeviceName] = useState('');
  const [selectedTemplates, setSelectedTemplates] = useState({});
  const [staticAttrValues, setStaticAttrValues] = useState({});

  const numberOfSelectedTemplates = useMemo(() => {
    return Object.keys(selectedTemplates).length;
  }, [selectedTemplates]);

  const attrs = useMemo(() => {
    const allAttrs = [];

    Object.values(selectedTemplates).forEach(template => {
      template.attrs.forEach(attr => {
        const attrClone = { ...attr };
        attrClone.templateLabel = template.label;
        if (attrClone.type === TEMPLATE_ATTR_TYPES.STATIC) {
          allAttrs.unshift(attrClone); // Static attrs comes first
        } else {
          allAttrs.push(attrClone);
        }
      });
    });

    return allAttrs;
  }, [selectedTemplates]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleToggleAttrs = () => {
    setIsShowingAttrs(isShowing => !isShowing);
  };

  const handleClearDeviceName = () => {
    setDeviceName('');
  };

  const handleSearchForTemplates = search => {
    dispatch(templateActions.getTemplates({ filter: { label: search } }));
  };

  const handleCancelDeviceEdition = () => {
    if (history.length) history.goBack();
    else history.push('/devices');
  };

  const handleSetAttrValue = (attrId, value) => {
    setStaticAttrValues(currentAttrValues => {
      const attrValuesClone = { ...currentAttrValues };
      attrValuesClone[attrId] = value;
      return attrValuesClone;
    });
  };

  const handleEditDevice = () => {
    dispatch({ type: 'EDIT', payload: {} });
  };

  useEffect(() => {
    if (deviceData) {
      setDeviceName(deviceData.label);

      setSelectedTemplates(() => {
        const templatesObject = {};
        deviceData?.templates.forEach(template => {
          templatesObject[template.id] = template;
        });
        return templatesObject;
      });

      setStaticAttrValues(() => {
        const staticAttrsObject = {};
        deviceData?.attrs.forEach(attr => {
          if (attr.type === TEMPLATE_ATTR_TYPES.STATIC && attr.value) {
            staticAttrsObject[attr.id] = attr.value;
          }
        });
        return staticAttrsObject;
      });
    }
  }, [deviceData, dispatch]);

  useEffect(() => {
    dispatch({ type: 'GET_DEVICE_DATA', payload: {} });
  }, [dispatch]);

  return (
    <ViewContainer headerTitle={t('title')}>
      <Box className={classes.container} padding={4}>
        <Box className={classes.content}>
          <Box className={classes.form}>
            <Box marginBottom={4}>
              <TextField
                className={classes.input}
                variant='outlined'
                value={deviceName}
                label={t('deviceNamePh')}
                onChange={e => setDeviceName(e.target.value)}
                InputProps={{
                  endAdornment: deviceName ? (
                    <InputAdornment position='end'>
                      <IconButton onClick={handleClearDeviceName}>
                        <Close />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                }}
              />
            </Box>

            <Box marginBottom={4}>
              <TemplatesTable
                page={page}
                templates={templates}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                selectedTemplates={selectedTemplates}
                numberOfSelectedTemplates={numberOfSelectedTemplates}
                handleChangePage={handleChangePage}
                setSelectedTemplates={setSelectedTemplates}
                handleSearchForTemplates={handleSearchForTemplates}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              />

              {!isLoadingTemplates && templates.length === 0 && (
                <Box className={classes.emptyList} marginY={3}>
                  <Typography className={classes.emptyListText}>
                    {t('emptyTemplateList')}
                  </Typography>
                </Box>
              )}
            </Box>

            <Box>
              <AttrsTable
                attrs={attrs}
                isShowingAttrs={isShowingAttrs}
                staticAttrValues={staticAttrValues}
                handleToggleAttrs={handleToggleAttrs}
                handleSetAttrValue={handleSetAttrValue}
              />
            </Box>
          </Box>

          <Box className={classes.actions} paddingTop={4}>
            <Button size='large' variant='text' onClick={handleCancelDeviceEdition}>
              {t('common:cancel')}
            </Button>

            <Button size='large' color='primary' variant='contained' onClick={handleEditDevice}>
              {t('common:edit')}
            </Button>
          </Box>
        </Box>
      </Box>
    </ViewContainer>
  );
};

export default EditDevice;
