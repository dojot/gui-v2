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
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { DialogHeader } from '../../../common/components/Dialogs';
import { useDetailsModalStyles } from './style';

const fakeRows = [
  {
    id: '029485',
    label: 'Device 01',
    lastUpdate: '04/03/2021 08:11:43',
  },
  {
    id: '345674',
    label: 'Device 02',
    lastUpdate: '04/03/2021 08:11:43',
  },
  {
    id: '876454',
    label: 'Device 03',
    lastUpdate: '04/03/2021 08:11:43',
  },
  {
    id: '275386',
    label: 'Device 04',
    lastUpdate: '04/03/2021 08:11:43',
  },
  {
    id: '243578',
    label: 'Device 05',
    lastUpdate: '04/03/2021 08:11:43',
  },
  {
    id: '958736',
    label: 'Device 06',
    lastUpdate: '04/03/2021 08:11:43',
  },
];

const AssociateDevicesModal = ({ isOpen, handleHideDetailsModal }) => {
  const { t } = useTranslation('certificates');
  const classes = useDetailsModalStyles();
  const [selectedDevice, setSelectedDevice] = useState('');

  const handleChangeSelectedDevice = e => {
    setSelectedDevice(e.target.value);
  };

  return (
    <Dialog open={isOpen} onClose={handleHideDetailsModal} maxWidth='lg' fullWidth>
      <DialogHeader
        title={t('AssociateToDeviceModalTitle')}
        handleHideDialog={handleHideDetailsModal}
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
                  {fakeRows.map(device => (
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
                        {device.lastUpdate}
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
        <Button onClick={handleHideDetailsModal}>{t('associateDeviceModal.associate')}</Button>
      </DialogActions>
    </Dialog>
  );
};

AssociateDevicesModal.propTypes = {
  isOpen: PropTypes.bool,
  handleHideDetailsModal: PropTypes.func,
};

AssociateDevicesModal.defaultProps = {
  isOpen: false,
  handleHideDetailsModal: null,
};

export default AssociateDevicesModal;
