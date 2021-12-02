import React, { useEffect, useMemo } from 'react';

import {
  Box,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { DevicesOther, FilterNone, History, Label } from '@material-ui/icons';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { TEMPLATE_ATTR_TYPES } from '../../common/constants';
import { useAttrTranslation, useIsLoading } from '../../common/hooks';
import {
  actions as deviceActions,
  constants as deviceConstants,
} from '../../redux/modules/devices';
import { deviceDataSelector } from '../../redux/selectors/devicesSelector';
import { ViewContainer } from '../stateComponents';
import useStyles from './style';

const DeviceDetails = () => {
  const { t } = useTranslation('deviceDetails');
  const { deviceId } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();

  const { getAttrValueTypeTranslation } = useAttrTranslation();

  const deviceData = useSelector(deviceDataSelector);
  const isLoadingDevice = useIsLoading(deviceConstants.GET_DEVICE_BY_ID);

  const hasStaticAttrs = useMemo(() => {
    if (!deviceData?.attrs?.length) return false;
    return deviceData.attrs.some(attr => attr.type === TEMPLATE_ATTR_TYPES.STATIC.value);
  }, [deviceData?.attrs]);

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
    <ViewContainer headerTitle={t('title', { name: deviceData.label })}>
      <Box className={classes.container} padding={3}>
        <Box className={classes.content}>
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
            </Grid>

            <Grid item xs={12} sm={12} md={8}>
              <List className={classes.dataGroup} disablePadding>
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
                        <TableCell>
                          {row.date ? moment(row.date).format('DD/MM/YYYY HH:mm:ss') : ''}
                        </TableCell>
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
