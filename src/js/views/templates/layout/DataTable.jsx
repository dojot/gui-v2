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
import { DATA_ORDER } from '../../../common/constants';
import { getComparator } from '../../../common/utils';
import { useDataTableStyles } from './style';

const DataTable = ({
  order,
  orderBy,
  templates,
  selectedTemplates,
  setOrder,
  setOrderBy,
  handleClickTemplate,
  handleSelectTemplate,
  handleSetTemplateOptionsMenu,
}) => {
  const { t } = useTranslation('templates');
  const classes = useDataTableStyles();

  const headCells = useMemo(
    () => [
      {
        id: 'id',
        label: t('dataTableHead.id'),
      },
      {
        id: 'label',
        label: t('dataTableHead.label'),
      },
      {
        id: 'attrsLength',
        label: t('dataTableHead.attrsLength'),
      },
      {
        id: 'actions',
        label: t('dataTableHead.actions'),
        disableOrderBy: true,
      },
    ],
    [t],
  );

  const valueFormatters = useMemo(
    () => ({
      attrsLength(template) {
        return template.attrs?.length || 0;
      },
    }),
    [],
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
      const newSelectedTemplates = templates.map(row => row.id);
      handleSelectTemplate(newSelectedTemplates);
      return;
    }

    handleSelectTemplate([]);
  };

  const handleSelectRow = id => {
    const selectedIndex = selectedTemplates.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedTemplates, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedTemplates.slice(1));
    } else if (selectedIndex === selectedTemplates.length - 1) {
      newSelected = newSelected.concat(selectedTemplates.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedTemplates.slice(0, selectedIndex),
        selectedTemplates.slice(selectedIndex + 1),
      );
    }

    handleSelectTemplate(newSelected);
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
            rowCount={templates.length}
            numSelected={selectedTemplates.length}
            onRequestSort={handleRequestSort}
            onSelectAllClick={handleSelectAllClick}
          />

          <TableBody>
            {templates
              .slice()
              .sort(getComparator(order === DATA_ORDER.DESC, orderBy, valueFormatters[orderBy]))
              .map(template => {
                const isSelected = selectedTemplates.indexOf(template.id) !== -1;
                const attrsLength = template.attrs?.length || 0;

                const handleClickInThisTemplate = () => {
                  handleClickTemplate(template);
                };

                const handleSelectThisRow = () => {
                  handleSelectRow(template.id);
                };

                const handleShowOptionsMenu = e => {
                  handleSetTemplateOptionsMenu({
                    anchorElement: e.target,
                    template,
                  });
                };

                return (
                  <TableRow
                    key={template.id}
                    tabIndex={-1}
                    role='checkbox'
                    selected={isSelected}
                    aria-checked={isSelected}
                    onClick={handleClickInThisTemplate}
                    hover
                  >
                    <TableCell onClick={handleStopPropagation}>
                      <Checkbox
                        color='primary'
                        checked={isSelected}
                        onChange={handleSelectThisRow}
                      />
                    </TableCell>

                    <TableCell className={classes.clickableCell}>{template.id}</TableCell>

                    <TableCell className={classes.clickableCell}>{template.label}</TableCell>

                    <TableCell className={classes.clickableCell}>{attrsLength}</TableCell>

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
  order: PropTypes.oneOf([DATA_ORDER.ASC, DATA_ORDER.DESC]).isRequired,
  orderBy: PropTypes.string.isRequired,
  templates: PropTypes.array.isRequired,
  selectedTemplates: PropTypes.array.isRequired,
  setOrder: PropTypes.func.isRequired,
  setOrderBy: PropTypes.func.isRequired,
  handleClickTemplate: PropTypes.func.isRequired,
  handleSelectTemplate: PropTypes.func.isRequired,
  handleSetTemplateOptionsMenu: PropTypes.func.isRequired,
};

export default DataTable;
