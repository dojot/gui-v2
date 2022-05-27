import React, { useState, useEffect, useMemo } from 'react';

import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import { Close, Check } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { TemplatesTable } from 'sharedComponents/TemplatesTable';
import { TEMPLATE_ATTR_TYPES } from 'sharedComponents/Constants';
import { useIsLoading } from 'sharedComponents/Hooks';
import {
  actions as deviceActions,
  constants as deviceConstants,
} from '../../redux/modules/devices';
import {
  actions as templateActions,
  constants as templateConstants,
} from '../../redux/modules/templates';
import { deviceDataSelector } from '../../redux/selectors/devicesSelector';
import {
  templatesSelector,
  paginationControlSelector,
} from '../../redux/selectors/templatesSelector';
import { ViewContainer } from 'sharedComponents/Containers';
import AttrsTable from './AttrsTable';
import { useEditDeviceStyles } from './style';

const EditDevice = () => {
  const { t } = useTranslation(['editDevice', 'common']);
  const classes = useEditDeviceStyles();
  const { deviceId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const templates = useSelector(templatesSelector);
  const deviceData = useSelector(deviceDataSelector);
  const { totalPages } = useSelector(paginationControlSelector);

  const isEditingDevice = useIsLoading(deviceConstants.EDIT_DEVICE);
  const isLoadingTemplates = useIsLoading(templateConstants.GET_TEMPLATES);
  const isLoadingDeviceData = useIsLoading(deviceConstants.GET_DEVICE_BY_ID);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isShowingAttrs, setIsShowingAttrs] = useState(true);
  const [searchTemplateText, setSearchTemplateText] = useState('');

  const [deviceName, setDeviceName] = useState('');
  const [selectedTemplates, setSelectedTemplates] = useState({});
  const [staticAttrValues, setStaticAttrValues] = useState({});

  const numberOfSelectedTemplates = useMemo(() => {
    return Object.keys(selectedTemplates).length;
  }, [selectedTemplates]);

  const attrs = useMemo(() => {
    const allAttrs = [];
    Object.values(selectedTemplates).forEach(template => {
      template.attrs?.forEach(attr => {
        const attrClone = { ...attr };
        attrClone.templateLabel = template.label;
        if (attrClone.type === TEMPLATE_ATTR_TYPES.STATIC.value) {
          allAttrs.unshift(attrClone); // Static attrs comes first
        } else {
          allAttrs.push(attrClone);
        }
      });
    });
    return allAttrs;
  }, [selectedTemplates]);

  const canSaveChanges = useMemo(() => {
    return (
      !isLoadingDeviceData &&
      !isLoadingTemplates &&
      numberOfSelectedTemplates > 0 &&
      !!deviceName.trim()
    );
  }, [deviceName, isLoadingDeviceData, isLoadingTemplates, numberOfSelectedTemplates]);

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
    setPage(0);
    setSearchTemplateText(search);
  };

  const handleGoBack = () => {
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

  const handleEditDevice = e => {
    e.preventDefault();

    const attrsToSave = attrs.map(attr => {
      const attrClone = { ...attr, id: Number(attr.id) };
      delete attrClone.isDynamic;
      delete attrClone.templateLabel;
      const attrValue = staticAttrValues[attr.id];
      if (attrValue) attrClone.staticValue = attrValue;
      return attrClone;
    });

    const templateIds = Object.values(selectedTemplates).map(({ id }) => {
      return Number(id);
    });

    dispatch(
      deviceActions.editDevice({
        id: deviceId,
        label: deviceName,
        templates: templateIds,
        attrs: attrsToSave,
        successCallback: handleGoBack,
      }),
    );
  };

  useEffect(() => {
    if (deviceData) {
      setDeviceName(deviceData.label);

      setSelectedTemplates(() => {
        const templatesObject = {};
        deviceData.templates?.forEach(template => {
          const templateAttrs = deviceData.attrs?.filter(
            attr => String(attr.templateId) === String(template.id),
          );
          templatesObject[template.id] = { ...template, attrs: templateAttrs || [] };
        });
        return templatesObject;
      });

      setStaticAttrValues(() => {
        const staticAttrsObject = {};
        deviceData.attrs?.forEach(attr => {
          if (attr.type === TEMPLATE_ATTR_TYPES.STATIC.value && attr.staticValue) {
            staticAttrsObject[attr.id] = attr.staticValue;
          }
        });
        return staticAttrsObject;
      });
    }
  }, [deviceData, dispatch]);

  useEffect(() => {
    dispatch(deviceActions.getDeviceById({ deviceId }));
    return () => {
      dispatch(deviceActions.updateDevices({ deviceData: null }));
    };
  }, [deviceId, dispatch]);

  useEffect(() => {
    dispatch(
      templateActions.getTemplates({
        page: {
          number: page + 1,
          size: rowsPerPage,
        },
        filter: {
          label: searchTemplateText,
        },
      }),
    );
  }, [dispatch, page, rowsPerPage, searchTemplateText]);

  if (isLoadingDeviceData) {
    return (
      <ViewContainer headerTitle={t('title')}>
        <Box className={classes.loadingContainer} padding={4}>
          <CircularProgress />
        </Box>
      </ViewContainer>
    );
  }

  return (
    <ViewContainer headerTitle={t('title')}>
      <Box className={classes.container} padding={4}>
        <Box className={classes.content} component='form' onSubmit={handleEditDevice} noValidate>
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
                <Box className={classes.templatesTablePlaceholder} marginY={3}>
                  <Typography className={classes.templatesTablePlaceholderText}>
                    {t('emptyTemplateList')}
                  </Typography>
                </Box>
              )}

              {isLoadingTemplates && (
                <Box className={classes.templatesTablePlaceholder} marginY={3}>
                  <CircularProgress size={24} />
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
            <Button size='large' variant='text' onClick={handleGoBack} disabled={isEditingDevice}>
              {t('common:cancel')}
            </Button>

            <Button
              size='large'
              type='submit'
              color='primary'
              variant='contained'
              disabled={!canSaveChanges || isEditingDevice}
              endIcon={isEditingDevice ? <CircularProgress color='inherit' size={14} /> : <Check />}
            >
              {t('common:save')}
            </Button>
          </Box>
        </Box>
      </Box>
    </ViewContainer>
  );
};

export default EditDevice;
