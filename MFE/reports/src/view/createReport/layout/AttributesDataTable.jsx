import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Collapse,
  Box,
  Checkbox,
} from '@material-ui/core';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useDataTableStyles } from './style';

const AttributesDataTable = ({
  isAttrsCollapsed,
  attributes,
  device,
  selectedDevices,
  setSelectedDevices,
  isDeviceSelected,
}) => {
  const classes = useDataTableStyles();
  const { t } = useTranslation('createReport');

  const handleDeselectAttr = (deviceId, attrId) => {
    setSelectedDevices(prevState => {
      const newSelected = { ...prevState };
      delete newSelected[deviceId].attrs[attrId];
      if (Object.keys(newSelected[deviceId].attrs).length <= 0) {
        delete newSelected[deviceId];
      }
      return newSelected;
    });
  };

  const handleSelectAttr = (device, attr) => {
    const isDeviceSelected = !!selectedDevices[device.id];
    const isAttrSelected = !!selectedDevices[device.id]?.attrs[attr.id];

    if (isDeviceSelected && !isAttrSelected) {
      setSelectedDevices(prevState => {
        const newSelected = { ...prevState };
        newSelected[device.id].attrs[attr.id] = attr;
        return newSelected;
      });
    } else if (!isDeviceSelected && !isAttrSelected) {
      let parsedAttrs = {};

      parsedAttrs[attr.id] = attr;

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
    <TableRow
      className={clsx({
        [classes.dataTableRowCollapsed]: isAttrsCollapsed,
        [classes.dataTableRowHide]: !isAttrsCollapsed,
      })}
    >
      <TableCell style={{ margin: 0, padding: 0 }} colSpan={6}>
        <Collapse in={isAttrsCollapsed}>
          <Box>
            <Table size='small'>
              <TableHead>
                <TableRow
                  role='checkbox'
                  selected={isDeviceSelected}
                  aria-checked={isDeviceSelected}
                >
                  <TableCell />

                  <TableCell />

                  <TableCell>{t('attrDataTableHead.attributes')}</TableCell>

                  <TableCell>{t('attrDataTableHead.attrType')}</TableCell>

                  <TableCell>{t('attrDataTableHead.valueType')}</TableCell>

                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {attributes.map(attr => {
                  if (attr.type === 'static') {
                    return;
                  }
                  const isAttrSelected = !!selectedDevices[device.id]?.attrs[attr.id];

                  const handleSelectAttribute = (e, device, attr) => {
                    if (isDeviceSelected && isAttrSelected) {
                      handleDeselectAttr(device.id, attr.id);
                    } else {
                      handleSelectAttr(device, attr);
                    }
                  };

                  return (
                    <TableRow
                      role='checkbox'
                      selected={isAttrSelected}
                      aria-checked={isAttrSelected}
                      key={attr.id}
                    >
                      <TableCell />

                      <TableCell align='center' width={38}>
                        <Checkbox
                          color='secondary'
                          size='small'
                          onChange={e => handleSelectAttribute(e, device, attr)}
                          checked={isAttrSelected}
                        />
                      </TableCell>

                      <TableCell>{attr.label}</TableCell>

                      <TableCell>
                        {attr.type === 'static' && t('attrDataTableRow.static')}
                        {attr.type === 'dynamic' && t('attrDataTableRow.dynamic')}
                        {attr.type === 'actuator' && t('attrDataTableRow.actuator')}
                      </TableCell>

                      <TableCell>
                        {attr.valueType === 'string' && t('attrDataTableRow.text')}
                        {attr.valueType === 'integer' && t('attrDataTableRow.integer')}
                        {attr.valueType === 'bool' && t('attrDataTableRow.boolean')}
                        {attr.valueType === 'geo:point' && t('attrDataTableRow.geo')}
                        {attr.valueType === 'float' && t('attrDataTableRow.float')}
                        {attr.valueType === 'json' && t('attrDataTableRow.json')}
                      </TableCell>

                      <TableCell />
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

AttributesDataTable.propTypes = {
  isAttrsCollapsed: PropTypes.bool.isRequired,
  attributes: PropTypes.array.isRequired,
  device: PropTypes.object.isRequired,
  selectedDevices: PropTypes.object.isRequired,
  setSelectedDevices: PropTypes.func.isRequired,
  isDeviceSelected: PropTypes.bool.isRequired,
};

export default AttributesDataTable;
