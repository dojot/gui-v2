import React, { useMemo } from 'react';

import {
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Box,
  Chip,
} from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { DataTableHead } from 'sharedComponents/DataTable';
import { DATA_ORDER, NEW_CHIP_HOURS_AGO } from 'sharedComponents/Constants';
import { getComparator, isSomeHoursAgo } from 'sharedComponents/Utils';
import { useDataTableStyles } from './style';

const DataTable = ({
  page,
  attrs,
  order,
  orderBy,
  rowsPerPage,
  selectedAttrs,
  valueFormatters,
  setOrder,
  setOrderBy,
  handleSelectAttr,
  handleSetAttrOptionsMenu,
}) => {
  const { t } = useTranslation(['templateAttrs', 'common']);
  const classes = useDataTableStyles();

  const headCells = useMemo(
    () => [
      {
        id: 'label',
        label: t('attrData.label'),
      },
      {
        id: 'id',
        label: t('attrData.id'),
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
        id: 'staticValue',
        label: t('attrData.staticValue'),
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
              .sort(getComparator(order === DATA_ORDER.DESC, orderBy, valueFormatters[orderBy]))
              .map(attr => {
                const isSelected = selectedAttrs.indexOf(attr.id) !== -1;
                const attrTypeTranslation = valueFormatters.type(attr);
                const valueTypeTranslation = valueFormatters.valueType(attr);
                const isNew = isSomeHoursAgo(attr.created, NEW_CHIP_HOURS_AGO);

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

                    <TableCell>
                      <Box mr={isNew ? 1 : 0} component='span'>
                        {attr.label}
                      </Box>

                      {isNew && <Chip color='primary' label={t('common:new')} size='small' />}
                    </TableCell>

                    <TableCell>{attr.id}</TableCell>
                    <TableCell>{attrTypeTranslation}</TableCell>
                    <TableCell>{valueTypeTranslation}</TableCell>
                    <TableCell>{attr.staticValue}</TableCell>

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
  page: PropTypes.number.isRequired,
  attrs: PropTypes.array.isRequired,
  order: PropTypes.oneOf([DATA_ORDER.ASC, DATA_ORDER.DESC]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  selectedAttrs: PropTypes.array.isRequired,
  valueFormatters: PropTypes.object.isRequired,
  setOrder: PropTypes.func.isRequired,
  setOrderBy: PropTypes.func.isRequired,
  handleSelectAttr: PropTypes.func.isRequired,
  handleSetAttrOptionsMenu: PropTypes.func.isRequired,
};

export default DataTable;
