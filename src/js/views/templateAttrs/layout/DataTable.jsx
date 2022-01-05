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

const ATTR_TYPE_TRANSLATIONS = {};
Object.values(TEMPLATE_ATTR_TYPES).forEach(({ value, translation }) => {
  ATTR_TYPE_TRANSLATIONS[value] = translation;
});

const ATTR_VALUE_TYPE_TRANSLATIONS = {};
Object.values(TEMPLATE_ATTR_VALUE_TYPES).forEach(({ value, translation }) => {
  ATTR_VALUE_TYPE_TRANSLATIONS[value] = translation;
});

const DataTable = ({
  page,
  attrs,
  order,
  orderBy,
  rowsPerPage,
  selectedAttrs,
  setOrder,
  setOrderBy,
  handleSelectAttr,
  handleSetAttrOptionsMenu,
}) => {
  const { t } = useTranslation('templateAttrs');
  const classes = useDataTableStyles();

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

  const valueFormatters = useMemo(
    () => ({
      type(attr) {
        return t(ATTR_TYPE_TRANSLATIONS[attr.type]) || attr.type;
      },
      valueType(attr) {
        return t(ATTR_VALUE_TYPE_TRANSLATIONS[attr.valueType]) || attr.valueType;
      },
    }),
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

                    <TableCell>{attr.id}</TableCell>
                    <TableCell>{attr.label}</TableCell>
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
  setOrder: PropTypes.func.isRequired,
  setOrderBy: PropTypes.func.isRequired,
  handleSelectAttr: PropTypes.func.isRequired,
  handleSetAttrOptionsMenu: PropTypes.func.isRequired,
};

export default DataTable;
