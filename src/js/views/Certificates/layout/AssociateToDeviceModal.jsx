import React, { useEffect, useMemo, useState } from 'react';

import {
  Dialog,
  DialogActions,
  Box,
  Table,
  TableCell,
  TableRow,
  TableBody,
  Button,
  Radio,
  CircularProgress,
  TableContainer,
  Typography,
} from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { DataTableHead } from '../../../common/components/DataTable';
import { DialogHeader } from '../../../common/components/Dialogs';
import { ROWS_PER_PAGE_OPTIONS } from '../../../common/constants';
import { useIsLoading } from '../../../common/hooks';
import { actions as certificateActions } from '../../../redux/modules/certificates';
import { actions as deviceActions, constants } from '../../../redux/modules/devices';
import {
  devicesSelector,
  paginationControlSelector,
} from '../../../redux/selectors/devicesSelector';
import Pagination from './Pagination';
import { useAssociateToDeviceModalStyles } from './style';

const AssociateToDeviceModal = ({ isOpen, certificate, handleHideDevicesToAssociateModal }) => {
  const { t } = useTranslation('certificates');

  const dispatch = useDispatch();
  const classes = useAssociateToDeviceModalStyles();

  const devices = useSelector(devicesSelector);
  const isLoadingDevices = useIsLoading(constants.GET_DEVICES);
  const { totalPages } = useSelector(paginationControlSelector);

  const [page, setPage] = useState(0);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[0]);

  const headCells = useMemo(
    () => [
      {
        id: 'id',
        className: classes.tableHeadCell,
        label: t('associateToDeviceModal.table.id'),
      },
      {
        id: 'label',
        className: classes.tableHeadCell,
        label: t('associateToDeviceModal.table.label'),
      },
      {
        id: 'lastUpdate',
        className: classes.tableHeadCell,
        label: t('associateToDeviceModal.table.lastUpdate'),
      },
    ],
    [classes.tableHeadCell, t],
  );

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeSelectedDevice = e => {
    setSelectedDeviceId(e.target.value);
  };

  const handleAssociateWIthTheSelectedDevice = () => {
    handleHideDevicesToAssociateModal();
    dispatch(
      certificateActions.associateDevice({
        fingerprint: certificate.fingerprint,
        deviceId: selectedDeviceId,
      }),
    );
  };

  useEffect(() => {
    dispatch(
      deviceActions.getDevices({
        page: {
          number: page + 1,
          size: rowsPerPage,
        },
      }),
    );
  }, [dispatch, page, rowsPerPage]);

  useEffect(() => {
    return () => {
      dispatch(deviceActions.updateDevices({ devices: [] }));
    };
  }, [dispatch]);

  useEffect(() => {
    if (!isOpen) setSelectedDeviceId('');
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={handleHideDevicesToAssociateModal} maxWidth='lg' fullWidth>
      <DialogHeader
        title={t('certificates:associateToDevice')}
        handleHideDialog={handleHideDevicesToAssociateModal}
      />

      <Box padding={2}>
        <Box marginBottom={2}>
          <Typography>{t('certificates:dataTableTitle')}</Typography>
        </Box>
        <TableContainer className={classes.tableContainer}>
          <Table aria-label='Table' size='small'>
            <DataTableHead
              className={classes.tableHead}
              cells={headCells}
              rowCount={devices.length}
              startExtraCells={<TableCell padding='checkbox' style={{ padding: '1.6rem 0' }} />}
              disableOrderBy
              disableCheckbox
            />

            {isLoadingDevices ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4} align='center'>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {devices.map(device => {
                  const handleSelectThisDevice = () => {
                    setSelectedDeviceId(device.id);
                  };

                  return (
                    <TableRow
                      key={device.id}
                      className={classes.selectableTableRow}
                      onClick={handleSelectThisDevice}
                    >
                      <TableCell>
                        <Radio
                          value={device.id}
                          checked={selectedDeviceId === device.id}
                          onChange={handleChangeSelectedDevice}
                        />
                      </TableCell>

                      <TableCell>{device.id}</TableCell>

                      <TableCell>{device.label}</TableCell>

                      <TableCell>
                        {moment(device.updated || device.created).format('L LTS')}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            )}
          </Table>
        </TableContainer>

        <Pagination
          page={page}
          rowsPerPage={rowsPerPage}
          totalOfPages={totalPages}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>

      <DialogActions>
        <Box padding={1}>
          <Button
            onClick={handleAssociateWIthTheSelectedDevice}
            disabled={!selectedDeviceId}
            variant='contained'
            color='primary'
            size='large'
          >
            {t('associateToDeviceModal.associate')}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

AssociateToDeviceModal.propTypes = {
  isOpen: PropTypes.bool,
  certificate: PropTypes.object,
  handleHideDevicesToAssociateModal: PropTypes.func,
};

AssociateToDeviceModal.defaultProps = {
  isOpen: false,
  certificate: {},
  handleHideDevicesToAssociateModal: null,
};

export default AssociateToDeviceModal;
