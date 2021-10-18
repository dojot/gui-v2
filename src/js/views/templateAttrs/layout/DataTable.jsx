import React, { useState, useMemo } from 'react';

import {
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { DataTableHead } from '../../../common/components/DataTable';
import {
  DATA_ORDER,
  TEMPLATE_ATTR_TYPES,
  TEMPLATE_ATTR_VALUE_TYPES,
} from '../../../common/constants';
import { getComparator } from '../../../common/utils';
import { useDataTableStyles } from './style';

const DataTable = ({
  page,
  attrs,
  rowsPerPage,
  selectedAttrs,
  handleSelectAttr,
  handleSetAttrOptionsMenu,
}) => {
  const { t } = useTranslation('templateAttrs');
  const classes = useDataTableStyles();

  const [order, setOrder] = useState(DATA_ORDER.ASC);
  const [orderBy, setOrderBy] = useState('');

  const headCells = useMemo(
    () => [
      {
        id: 'id',
        label: t('attrData.id'),
      },
      {
        id: 'label',
        label: t('attrData.label'),
      },
      {
        id: 'type',
        label: t('attrData.type'),
      },
      {
        id: 'valueType',
        label: t('attrData.valueType'),
      },
      {
        id: 'value',
        label: t('attrData.value'),
      },
      {
        id: 'actions',
        label: t('attrData.actions'),
        disableOrderBy: true,
      },
    ],
    [t],
  );

  const handleRequestSort = (_, property) => {
    const isAsc = orderBy === property && order === DATA_ORDER.ASC;
    setOrder(isAsc ? DATA_ORDER.DESC : DATA_ORDER.ASC);
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelectedTemplates = attrs.map(row => row.id);
      handleSelectAttr(newSelectedTemplates);
      return;
    }

    handleSelectAttr([]);
  };

  const handleSelectRow = id => {
    const selectedIndex = selectedAttrs.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedAttrs, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedAttrs.slice(1));
    } else if (selectedIndex === selectedAttrs.length - 1) {
      newSelected = newSelected.concat(selectedAttrs.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedAttrs.slice(0, selectedIndex),
        selectedAttrs.slice(selectedIndex + 1),
      );
    }

    handleSelectAttr(newSelected);
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
            rowCount={attrs.length}
            numSelected={selectedAttrs.length}
            onRequestSort={handleRequestSort}
            onSelectAllClick={handleSelectAllClick}
          />

          <TableBody>
            {attrs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .sort(getComparator(order === DATA_ORDER.DESC, orderBy))
              .map(attr => {
                const isSelected = selectedAttrs.indexOf(attr.id) !== -1;

                const typeConstantKey = attr.type?.replace(/:/g, '_').toUpperCase() || '';
                const typeText = TEMPLATE_ATTR_TYPES[typeConstantKey]?.translation;

                const valueTypeConstantKey = attr.valueType?.replace(/:/g, '_').toUpperCase() || '';
                const valueTypeText = TEMPLATE_ATTR_VALUE_TYPES[valueTypeConstantKey]?.translation;

                const handleSelectThisRow = () => {
                  handleSelectRow(attr.id);
                };

                const handleShowOptionsMenu = e => {
                  handleSetAttrOptionsMenu({
                    anchorElement: e.target,
                    attr,
                  });
                };

                return (
                  <TableRow key={attr.id} tabIndex={-1} selected={isSelected} hover>
                    <TableCell onClick={handleStopPropagation}>
                      <Checkbox
                        color='primary'
                        checked={isSelected}
                        onChange={handleSelectThisRow}
                      />
                    </TableCell>

                    <TableCell className={classes.clickableCell}>{attr.id}</TableCell>

                    <TableCell className={classes.clickableCell}>{attr.label}</TableCell>

                    <TableCell className={classes.clickableCell}>
                      {typeText ? t(typeText) : attr.type}
                    </TableCell>

                    <TableCell className={classes.clickableCell}>
                      {valueTypeText ? t(valueTypeText) : attr.valueType}
                    </TableCell>

                    <TableCell className={classes.clickableCell}>{attr.value}</TableCell>

                    <TableCell onClick={handleStopPropagation}>
                      <IconButton onClick={handleShowOptionsMenu}>
                        <MoreHoriz />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

DataTable.propTypes = {
  attrs: PropTypes.array.isRequired,
  handleSelectAttr: PropTypes.func.isRequired,
  handleSetAttrOptionsMenu: PropTypes.func.isRequired,
};

export default DataTable;
