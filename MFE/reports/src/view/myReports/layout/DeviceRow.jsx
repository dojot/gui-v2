import React, { useState } from 'react';
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Table,
  TableHead,
  Box,
  TableBody,
} from '@material-ui/core';
import { ChevronRight, ExpandMore } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const DeviceRow = ({ device }) => {
  const { t } = useTranslation('myReports');

  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => setIsOpen(prevState => !prevState);

  return (
    <>
      <TableRow>
        <TableCell />
        <TableCell width='80px' style={{ paddingTop: '6px', paddingBottom: '6px' }}>
          <IconButton onClick={toggleCollapse}>
            {isOpen ? <ExpandMore /> : <ChevronRight />}
          </IconButton>
        </TableCell>
        <TableCell component='th'>{device.label}</TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ margin: 0, padding: 0 }} colSpan={7}>
          <Collapse in={isOpen}>
            <Box>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell />
                    <TableCell>{t('attrDataTableHead.attribute')}</TableCell>
                    <TableCell>{t('attrDataTableHead.attrType')}</TableCell>
                    <TableCell>{t('attrDataTableHead.valueType')}</TableCell>
                    <TableCell />
                    <TableCell />
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {device.attrs.map(attr => (
                    <TableRow key={attr.id}>
                      <TableCell />
                      <TableCell />
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
                      <TableCell />
                      <TableCell />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

DeviceRow.propTypes = {
  device: PropTypes.object.isRequired,
};

export default DeviceRow;
