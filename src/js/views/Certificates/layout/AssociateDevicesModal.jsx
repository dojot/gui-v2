import React, { useState } from 'react';

import {
  Dialog,
  DialogActions,
  Box,
  Grid,
  List,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
  Radio,
} from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { DialogHeader } from '../../../common/components/Dialogs';
import { devicesSelector } from '../../../redux/selectors/devicesSelector';
import { useDetailsModalStyles } from './style';

const AssociateDevicesModal = ({ isOpen, handleHideDevicesToAssociateModal }) => {
  const { t } = useTranslation('certificates');
  const classes = useDetailsModalStyles();
  const devices = useSelector(devicesSelector);
  const [selectedDevice, setSelectedDevice] = useState('');

  const handleChangeSelectedDevice = e => {
    setSelectedDevice(e.target.value);
  };

  return (
    <Dialog open={isOpen} onClose={handleHideDevicesToAssociateModal} maxWidth='lg' fullWidth>
      <DialogHeader
        title={t('AssociateToDeviceModalTitle')}
        handleHideDialog={handleHideDevicesToAssociateModal}
      />

      <Box padding={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <List className={classes.dataGroup} disablePadding>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell className={classes.tableCellBold}>
                      {t('associateDeviceModal.table.id')}
                    </TableCell>
                    <TableCell className={classes.tableCellBold}>
                      {t('associateDeviceModal.table.devices')}
                    </TableCell>
                    <TableCell className={classes.tableCellBold}>
                      {t('associateDeviceModal.table.lastUpdate')}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {devices.map(device => (
                    <TableRow
                      key={device.key}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>
                        <Radio
                          value={device.id}
                          checked={selectedDevice === device.id}
                          onChange={handleChangeSelectedDevice}
                        />
                      </TableCell>
                      <TableCell className={classes.tableCellSecondary}>{device.id}</TableCell>
                      <TableCell className={classes.tableCellSecondary}>{device.label}</TableCell>
                      <TableCell className={classes.tableCellSecondary}>
                        {moment(device.updated || device.created).format('DD/MM/YYYY HH:mm:ss')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </List>
          </Grid>
        </Grid>
      </Box>

      <DialogActions>
        <Button onClick={handleHideDevicesToAssociateModal}>
          {t('associateDeviceModal.associate')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AssociateDevicesModal.propTypes = {
  isOpen: PropTypes.bool,
  handleHideDevicesToAssociateModal: PropTypes.func,
};

AssociateDevicesModal.defaultProps = {
  isOpen: false,
  handleHideDevicesToAssociateModal: null,
};

export default AssociateDevicesModal;
