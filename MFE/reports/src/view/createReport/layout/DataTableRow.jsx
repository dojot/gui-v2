import React, { useState } from 'react';
import { Checkbox, IconButton, TableCell, TableRow, Tooltip } from '@material-ui/core';
import { ChevronRight, ExpandMore } from '@material-ui/icons';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import AttributesDataTable from './AttributesDataTable';
import { useDataTableStyles } from './style';

const DataTableRow = ({ device, handleStopPropagation, selectedDevices, setSelectedDevices }) => {
  const [isAttrsCollapsed, setIsAttrsCollapsed] = useState(false);
  const classes = useDataTableStyles();
  const { t } = useTranslation('createReport');

  const isUnableToReport = !device.attrs.length;
  const isDeviceSelected = !!selectedDevices[device.id];

  const toggleCollapseAttrs = () => {
    setIsAttrsCollapsed(prevState => !prevState);
  };

  const handleDeselectDevice = deviceId => {
    setSelectedDevices(prevState => {
      const newSelected = { ...prevState };
      delete newSelected[deviceId];
      return newSelected;
    });
  };

  const handleSelectDevice = () => {
    const isDeviceSelected = !!selectedDevices[device.id];

    if (isDeviceSelected) {
      handleDeselectDevice(device.id);
    } else {
      let parsedAttrs = {};

      for (let item of device.attrs) {
        parsedAttrs[item.id] = item;
      }

      const parsedDevice = {
        id: device.id,
        label: device.label,
        created: device.created,
        updated: device.updated,
        attrs: parsedAttrs,
      };

      setSelectedDevices({ ...selectedDevices, [device.id]: parsedDevice });
    }
  };

  return (
    <React.Fragment key={device.id}>
      <TableRow
        tabIndex={-1}
        role='checkbox'
        selected={isDeviceSelected}
        aria-checked={isDeviceSelected}
        hover={!isAttrsCollapsed && !isUnableToReport}
        className={clsx(classes.dataTableRow, {
          [classes.dataTableRowCollapsed]: isAttrsCollapsed,
          [classes.unableToSelect]: isUnableToReport,
        })}
      >
        <TableCell onClick={handleStopPropagation} width={38}>
          <Checkbox
            color='secondary'
            checked={isDeviceSelected}
            onChange={handleSelectDevice}
            disabled={isUnableToReport}
          />
        </TableCell>

        <TableCell width={38}>
          <IconButton size='small' onClick={toggleCollapseAttrs} disabled={isUnableToReport}>
            {isAttrsCollapsed ? <ExpandMore /> : <ChevronRight />}
          </IconButton>
        </TableCell>

        <TableCell>{device.label}</TableCell>

        <TableCell>{device.id}</TableCell>

        <TableCell>
          {device.updated
            ? moment(device.updated).format('L LTS')
            : moment(device.created).format('L LTS')}
        </TableCell>

        <TableCell>{device.attrs.length}</TableCell>
      </TableRow>

      <AttributesDataTable
        isAttrsCollapsed={isAttrsCollapsed}
        attributes={device.attrs}
        isDeviceSelected={isDeviceSelected}
        device={device}
        selectedDevices={selectedDevices}
        setSelectedDevices={setSelectedDevices}
      />
    </React.Fragment>
  );
};

DataTableRow.propTypes = {
  device: PropTypes.object.isRequired,
  handleStopPropagation: PropTypes.func.isRequired,
  selectedDevices: PropTypes.object.isRequired,
  setSelectedDevices: PropTypes.func.isRequired,
};

export default DataTableRow;
