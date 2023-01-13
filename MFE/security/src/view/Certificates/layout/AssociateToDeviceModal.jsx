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
  Chip,
} from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { DataTableHead } from 'sharedComponents/DataTable';
import { DialogHeader } from 'sharedComponents/Dialogs';
import { ROWS_PER_PAGE_OPTIONS, NEW_CHIP_HOURS_AGO, DATA_ORDER } from 'sharedComponents/Constants';
import { useIsLoading } from 'sharedComponents/Hooks';
import { isSomeHoursAgo } from 'sharedComponents/Utils';
import { actions as certificateActions } from '../../../redux/modules/certificates';
import { actions as deviceActions, constants } from '../../../redux/modules/devices';
import {
  devicesSelector,
  paginationControlSelector,
} from '../../../redux/selectors/devicesSelector';
import Pagination from './Pagination';
import { useAssociateToDeviceModalStyles } from './style';

const AssociateToDeviceModal = ({ isOpen, certificate, handleHideDevicesToAssociateModal }) => {
  const { t } = useTranslation(['certificates', 'common']);

  const dispatch = useDispatch();
  const classes = useAssociateToDeviceModalStyles();

  const devices = useSelector(devicesSelector);
  const isLoadingDevices = useIsLoading(constants.GET_DEVICES);
  const { totalPages } = useSelector(paginationControlSelector);

  const [page, setPage] = useState(0);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[0]);

  const [orderBy, setOrderBy] = useState({
    key: 'ob',
    type: 'string',
    defaultValue: '',
  });

  const [order, setOrder] = useState({
    key: 'or',
    type: 'string',
    defaultValue: DATA_ORDER.ASC,
    valueFormatter(value, defaultValue) {
      if (Object.values(DATA_ORDER).includes(value)) return value;
      return defaultValue;
    },
  });

  const headCells = useMemo(
    () => [
      {
        id: 'label',
        className: classes.tableHeadCell,
        label: t('associateToDeviceModal.table.label'),
      },
      {
        id: 'id',
        className: classes.tableHeadCell,
        label: t('associateToDeviceModal.table.id'),
      },
      {
        id: 'created',
        className: classes.tableHeadCell,
        label: t('associateToDeviceModal.table.created'),
      },
      {
        id: 'updated',
        className: classes.tableHeadCell,
        label: t('associateToDeviceModal.table.updated'),
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

  const handleRequestSort = (_, property) => {
    console.log('_: ', _);
    console.log('property: ', property);
    const isSameProperty = orderBy === property;
    if (isSameProperty) {
      const isAsc = order === DATA_ORDER.ASC;
      setOrder(isAsc ? DATA_ORDER.DESC : DATA_ORDER.ASC);
      setOrderBy(isAsc ? property : '');
    } else {
      setOrder(DATA_ORDER.ASC);
      setOrderBy(property);
    }
  };

  useEffect(() => {
    dispatch(
      deviceActions.getDevices({
        page: {
          number: page + 1,
          size: rowsPerPage,
        },
        sortBy: orderBy ? `${order}:${orderBy}` : undefined,
      }),
    );
  }, [dispatch, page, rowsPerPage, order, orderBy]);

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
              disableCheckbox
              onRequestSort={handleRequestSort}
              order={order}
              orderBy={orderBy}
            />

            {isLoadingDevices ? (
              <TableBody>
                <TableRow>
                  <TableCell align='center'>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {devices.map(device => {
                  const isNew = isSomeHoursAgo(device.created, NEW_CHIP_HOURS_AGO);

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
                          color='secondary'
                          value={device.id}
                          checked={selectedDeviceId === device.id}
                          onChange={handleChangeSelectedDevice}
                        />
                      </TableCell>

                      <TableCell>
                        <Box mr={isNew ? 1 : 0} component='span'>
                          {device.label}
                        </Box>

                        {isNew && <Chip color='primary' label={t('common:new')} size='small' />}
                      </TableCell>

                      <TableCell>{device.id}</TableCell>

                      <TableCell>{moment(device.created).format('L LTS')}</TableCell>

                      <TableCell>
                        {device.updated ? moment(device.updated).format('L LTS') : ''}
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
