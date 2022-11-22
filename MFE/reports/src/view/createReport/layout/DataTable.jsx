import React, { useMemo } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { DataTableHead } from 'sharedComponents/DataTable';
import { DATA_ORDER } from 'sharedComponents/Constants';
import DataTableRow from './DataTableRow';
import { useDataTableStyles } from './style';

const DataTable = ({
  order,
  orderBy,
  devices,
  selectedDevices,
  setSelectedDevices,
  setOrder,
  setOrderBy,
  handleSelectDevice,
  handleSelectAttr,
  handleDeselectAttr,
}) => {
  const { t } = useTranslation(['createReport', 'common']);
  const classes = useDataTableStyles();

  const headCells = useMemo(
    () => [
      {
        id: 'label',
        label: t('dataTableHead.label'),
      },
      {
        id: 'id',
        label: t('dataTableHead.id'),
      },
      {
        id: 'updated',
        label: t('dataTableHead.updated'),
      },
      {
        id: 'attributes',
        label: t('dataTableHead.attributes'),
        withHelpIcon: true,
        helpText: t('dataTableHead.attributesHelpText'),
      },
    ],
    [t],
  );

  const handleRequestSort = (_, property) => {
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

  const validDevicesToSelect = useMemo(() => {
    return devices.filter(device => device.attrs.length > 0);
  }, [devices]);

  const isAllDevicesSelected = useMemo(() => {
    return Object.keys(selectedDevices).length === validDevicesToSelect.length;
  }, [validDevicesToSelect, selectedDevices]);

  const handleSelectAllClick = () => {
    if (isAllDevicesSelected) {
      setSelectedDevices({});
    } else {
      for (let item of validDevicesToSelect) {
        let parsedAttrs = {};

        item.attrs.forEach(attr => {
          if (attr.type !== 'static') {
            parsedAttrs[attr.id] = attr;
          }
        });

        setSelectedDevices(prevState => ({
          ...prevState,
          [item.id]: {
            id: item.id,
            label: item.label,
            created: item.created,
            updated: item.updated,
            attrs: parsedAttrs,
          },
        }));
      }
    }
  };

  const handleSelectRow = device => {
    handleSelectDevice(device);
  };

  const handleStopPropagation = e => {
    e.stopPropagation();
  };

  return (
    <Paper elevation={0}>
      <TableContainer>
        <Table aria-labelledby='tableTitle' size='small'>
          <DataTableHead
            className={classes.tableHead}
            order={order}
            orderBy={orderBy}
            cells={headCells}
            startExtraCells={<TableCell />}
            rowCount={validDevicesToSelect.length}
            numSelected={Object.keys(selectedDevices).length}
            onRequestSort={handleRequestSort}
            onSelectAllClick={handleSelectAllClick}
          />

          <TableBody>
            {devices.map(device => (
              <DataTableRow
                key={device.id}
                device={device}
                handleStopPropagation={handleStopPropagation}
                selectedDevices={selectedDevices}
                setSelectedDevices={setSelectedDevices}
                handleSelectRow={handleSelectRow}
                handleSelectAttr={handleSelectAttr}
                handleDeselectAttr={handleDeselectAttr}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

DataTable.propTypes = {
  order: PropTypes.oneOf([DATA_ORDER.ASC, DATA_ORDER.DESC]).isRequired,
  orderBy: PropTypes.string.isRequired,
  devices: PropTypes.array.isRequired,
  selectedDevices: PropTypes.object.isRequired,
  setSelectedDevices: PropTypes.func.isRequired,
  setOrder: PropTypes.func.isRequired,
  setOrderBy: PropTypes.func.isRequired,
};

export default DataTable;
