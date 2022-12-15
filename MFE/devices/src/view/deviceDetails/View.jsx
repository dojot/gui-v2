import React, { useEffect, useMemo, useState, useRef, useCallback } from 'react';

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  Block,
  CheckCircle,
  Delete,
  DevicesOther,
  Edit,
  FilterNone,
  History,
  Label,
  Send,
  VerifiedUser,
} from '@material-ui/icons';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Link as RouterLink } from 'react-router-dom';
import { TEMPLATE_ATTR_TYPES, TEMPLATE_ATTR_VALUE_TYPES, EVENT } from 'sharedComponents/Constants';
import { ViewContainer } from 'sharedComponents/Containers';
import { AlertDialog } from 'sharedComponents/Dialogs';
import { useAttrTranslation, useIsLoading, dispatchEvent } from 'sharedComponents/Hooks';

import {
  actions as deviceActions,
  constants as deviceConstants,
} from '../../redux/modules/devices';
import { deviceDataSelector } from '../../redux/selectors/devicesSelector';
import useStyles from './style';

const DeviceDetails = () => {
  const { t } = useTranslation('deviceDetails');
  const { deviceId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const { getAttrValueTypeTranslation } = useAttrTranslation();

  const deviceData = useSelector(deviceDataSelector);
  const isDeletingDevice = useIsLoading(deviceConstants.DELETE_DEVICE);
  const isLoadingDevice = useIsLoading(deviceConstants.GET_DEVICE_BY_ID);
  const isSendingActuatorData = useIsLoading(deviceConstants.ACTUATE);

  const [isShowingDeleteAlert, setIsShowingDeleteAlert] = useState(false);

  const actuatorValueRef = useRef(null);
  const [actuatorLabel, setActuatorLabel] = useState('');
  const [actuatorValue, setActuatorValue] = useState('');
  const [actuatingErrors, setActuatingErrors] = useState({
    isLabelEmpty: false,
    isValueEmpty: false,
  });

  const hasStaticAttrs = useMemo(() => {
    if (!deviceData?.attrs?.length) return false;
    return deviceData.attrs.some(attr => attr.type === TEMPLATE_ATTR_TYPES.STATIC.value);
  }, [deviceData?.attrs]);

  const actuators = useMemo(() => {
    if (!deviceData?.attrs?.length) return [];
    return deviceData.attrs.filter(attr => attr.type === TEMPLATE_ATTR_TYPES.ACTUATOR.value);
  }, [deviceData?.attrs]);

  const isActuatorTypeNumeric = useMemo(() => {
    if (!actuators.length) return false;
    const selectedActuator = actuators.find(actuator => actuator.label === actuatorLabel);
    if (!selectedActuator) return false;
    return [
      TEMPLATE_ATTR_VALUE_TYPES.INTEGER.value,
      TEMPLATE_ATTR_VALUE_TYPES.FLOAT.value,
    ].includes(selectedActuator.valueType);
  }, [actuators, actuatorLabel]);

  const handleGoBack = () => {
    history.push('/devices');
  };

  const handleShowDeleteDeviceAlert = () => {
    setIsShowingDeleteAlert(true);
  };

  const handleHideDeleteDeviceAlert = () => {
    setIsShowingDeleteAlert(false);
  };

  const handleConfirmDeviceDeletion = () => {
    dispatch(
      deviceActions.deleteDevice({
        deviceId,
        successCallback: handleGoBack,
        shouldGetCurrentPageAgain: false,
      }),
    );
  };

  const handleActuatingValuesInvalid = () => {
    const isLabelEmpty = actuatorLabel.trim() === '';
    const isValueEmpty = actuatorValue.trim() === '';
    setActuatingErrors({ isLabelEmpty, isValueEmpty });
    return isLabelEmpty || isValueEmpty;
  };

  const handleSendActuatorData = e => {
    e.preventDefault();
    if (handleActuatingValuesInvalid()) return;
    dispatch(
      deviceActions.actuate({
        deviceId,
        labels: [actuatorLabel],
        values: [actuatorValue],
        successCallback() {
          setActuatorValue('');
          if (actuatorValueRef.current) actuatorValueRef.current.focus();
        },
      }),
    );
  };

  const handleClick = useCallback(() => {
    dispatchEvent(EVENT.CHANGE_ROUTE, `/certificates?s=${deviceData.certificate.fingerprint}`);
  }, [deviceData]);

  useEffect(() => {
    dispatch(deviceActions.getDeviceById({ deviceId }));
    return () => {
      dispatch(deviceActions.updateDevices({ deviceData: null }));
    };
  }, [deviceId, dispatch]);

  if (isLoadingDevice) {
    return (
      <ViewContainer headerTitle={t('titleWithoutName')}>
        <Box className={classes.containerCentered} padding={3}>
          <CircularProgress />
        </Box>
      </ViewContainer>
    );
  }

  if (!deviceData) {
    return (
      <ViewContainer headerTitle={t('titleWithoutName')}>
        <Box className={classes.containerCentered} padding={3}>
          <Box marginBottom={2}>
            <DevicesOther size='large' />
          </Box>
          <Typography className={classes.noDataText}>{t('noDeviceDataToShow')}</Typography>
        </Box>
      </ViewContainer>
    );
  }

  return (
    <ViewContainer
      headerTitle={t('title', {
        name: deviceData.label,
        id: deviceData.id,
      })}
    >
      <AlertDialog
        isOpen={isShowingDeleteAlert}
        title={t('deleteDeviceAlert.title')}
        message={t('deleteDeviceAlert.message')}
        handleConfirm={handleConfirmDeviceDeletion}
        handleClose={handleHideDeleteDeviceAlert}
        cancelButtonText={t('deleteDeviceAlert.cancelButton')}
        confirmButtonText={t('deleteDeviceAlert.confirmButton')}
      />

      <Box className={classes.container} padding={3}>
        <Box className={classes.content}>
          <Box className={classes.actions}>
            <Button
              className={classes.deleteAction}
              size='large'
              variant='outlined'
              disabled={isDeletingDevice}
              onClick={handleShowDeleteDeviceAlert}
              endIcon={
                isDeletingDevice ? <CircularProgress size={16} color='inherit' /> : <Delete />
              }
            >
              {t('deleteDevice')}
            </Button>

            <RouterLink
              to={`/devices/edit/${deviceId}`}
              className={classes.editAction}
              disabled={isDeletingDevice}
              component={Button}
              endIcon={<Edit />}
              variant='outlined'
              color='secondary'
              size='large'
            >
              {t('editDevice')}
            </RouterLink>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4}>
              <List className={classes.dataGroup} disablePadding>
                <ListItem divider>
                  <ListItemIcon className={classes.dataGroupTitleIcon}>
                    <FilterNone fontSize='small' style={{ color: '#F1B44C' }} />
                  </ListItemIcon>
                  <ListItemText>{t('sectionTitles.templates')}</ListItemText>
                </ListItem>

                {deviceData.templates?.map(template => {
                  return (
                    <ListItem key={template.id} divider>
                      <ListItemText primary={template.label} />
                    </ListItem>
                  );
                })}

                {!deviceData.templates?.length && (
                  <ListItem divider>
                    <Box margin='auto'>
                      <ListItemText>{t('noTemplates')}</ListItemText>
                    </Box>
                  </ListItem>
                )}
              </List>

              <List className={classes.dataGroup} disablePadding>
                <ListItem divider>
                  <ListItemIcon className={classes.dataGroupTitleIcon}>
                    <Label fontSize='small' style={{ color: '#50a5f1' }} />
                  </ListItemIcon>
                  <ListItemText>{t('sectionTitles.staticAttrs')}</ListItemText>
                </ListItem>

                {deviceData.attrs?.map(attr => {
                  if (attr.type !== TEMPLATE_ATTR_TYPES.STATIC.value) return null;

                  return (
                    <ListItem key={attr.id} divider>
                      <ListItemText primary={attr.label} secondary={attr.staticValue} />
                      <ListItemText
                        className={classes.dataGroupItemTextRight}
                        secondary={getAttrValueTypeTranslation(attr.valueType)}
                      />
                    </ListItem>
                  );
                })}

                {!hasStaticAttrs && (
                  <ListItem divider>
                    <Box margin='auto'>
                      <ListItemText>{t('noStaticAttrs')}</ListItemText>
                    </Box>
                  </ListItem>
                )}
              </List>

              <List className={classes.dataGroup} disablePadding>
                <ListItem divider>
                  <ListItemIcon className={classes.dataGroupTitleIcon}>
                    <VerifiedUser fontSize='small' style={{ color: '#34C38F' }} />
                  </ListItemIcon>
                  <ListItemText>{t('sectionTitles.associatedCertificate')}</ListItemText>
                </ListItem>

                {deviceData.certificate?.fingerprint ? (
                  <ListItem divider>
                    <ListItemText
                      style={{ wordBreak: 'break-all', paddingRight: '2rem' }}
                      primary={
                        <Box mb={1}>
                          <div
                            tabIndex={0}
                            role='link'
                            onKeyDown={() => handleClick(deviceData)}
                            onClick={() => handleClick(deviceData)}
                            className={classes.link}
                          >
                            {t('seeCertificate')}
                          </div>
                        </Box>
                      }
                      secondary={deviceData.certificate.fingerprint}
                    />
                  </ListItem>
                ) : (
                  <ListItem divider>
                    <Box margin='auto'>
                      <ListItemText>{t('noAssociatedCertificate')}</ListItemText>
                    </Box>
                  </ListItem>
                )}
              </List>

              <Box>
                <Chip
                  size='large'
                  icon={deviceData.disabled ? <Block /> : <CheckCircle />}
                  label={deviceData.disabled ? t('disabledLabel') : t('enabledLabel')}
                  className={deviceData.disabled ? classes.disabledChip : classes.enabledChip}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={8}>
              {actuators.length > 0 && (
                <List className={classes.dataGroupWithBottomBorder} disablePadding>
                  <ListItem divider>
                    <ListItemIcon className={classes.dataGroupTitleIcon}>
                      <Send fontSize='small' style={{ color: '#6c6cf4' }} />
                    </ListItemIcon>
                    <ListItemText>{t('sectionTitles.acting')}</ListItemText>
                  </ListItem>

                  <ListItem
                    className={classes.actingListItem}
                    component='form'
                    onSubmit={handleSendActuatorData}
                    noValidate
                  >
                    <Grid spacing={2} container>
                      <Grid xs={12} sm={12} md={6} lg={4} item>
                        <TextField
                          size='small'
                          variant='outlined'
                          value={actuatorLabel}
                          error={actuatingErrors.isLabelEmpty}
                          helperText={actuatingErrors.isLabelEmpty && t('acting.emptyFieldError')}
                          SelectProps={{
                            displayEmpty: true,
                            renderValue: value => value || t('acting.actuatorLabelPh'),
                          }}
                          onChange={e => {
                            setActuatorLabel(e.target.value);
                            setActuatorValue('');
                          }}
                          select
                          fullWidth
                        >
                          {actuators.map(actuator => {
                            return (
                              <MenuItem key={actuator.label} value={actuator.label}>
                                {actuator.label}
                              </MenuItem>
                            );
                          })}
                        </TextField>
                      </Grid>

                      <Grid xs={12} sm={12} md={6} lg={6} item>
                        <TextField
                          inputRef={actuatorValueRef}
                          size='small'
                          variant='outlined'
                          value={actuatorValue}
                          label={t('acting.valueLabel')}
                          error={actuatingErrors.isValueEmpty}
                          type={isActuatorTypeNumeric ? 'number' : 'text'}
                          helperText={actuatingErrors.isValueEmpty && t('acting.emptyFieldError')}
                          onChange={e => setActuatorValue(e.target.value)}
                          fullWidth
                        />
                      </Grid>

                      <Grid xs={12} sm={12} md={12} lg={2} item>
                        <Button
                          className={classes.actingButton}
                          type='submit'
                          size='medium'
                          color='secondary'
                          variant='outlined'
                          disabled={isSendingActuatorData}
                          endIcon={
                            isSendingActuatorData ? (
                              <CircularProgress size={16} color='inherit' />
                            ) : (
                              <Send />
                            )
                          }
                          fullWidth
                        >
                          {t('acting.sendButton')}
                        </Button>
                      </Grid>
                    </Grid>
                  </ListItem>
                </List>
              )}

              <List className={classes.dataGroupWithBottomBorder} disablePadding>
                <ListItem divider>
                  <ListItemIcon className={classes.dataGroupTitleIcon}>
                    <History fontSize='small' style={{ color: '#f46a6a' }} />
                  </ListItemIcon>
                  <ListItemText>{t('sectionTitles.lastUpdate')}</ListItemText>
                </ListItem>

                <Table sx={{ minWidth: 650 }} aria-label={t('lastUpdateTableLabel')}>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tableCellBold}>
                        {t('lastUpdateTable.date')}
                      </TableCell>

                      <TableCell className={classes.tableCellBold}>
                        {t('lastUpdateTable.key')}
                      </TableCell>

                      <TableCell className={classes.tableCellBold}>
                        {t('lastUpdateTable.value')}
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {deviceData.lastUpdate?.map(row => (
                      <TableRow key={row.label} className={classes.tableRow}>
                        <TableCell>{row.date ? moment(row.date).format('L LTS') : ''}</TableCell>
                        <TableCell>{row.label}</TableCell>
                        <TableCell>{row.value}</TableCell>
                      </TableRow>
                    ))}

                    {!deviceData.lastUpdate?.length && (
                      <TableRow>
                        <TableCell align='center' colSpan={3}>
                          <Typography>{t('noLastUpdateData')}</Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </List>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ViewContainer>
  );
};

export default DeviceDetails;
