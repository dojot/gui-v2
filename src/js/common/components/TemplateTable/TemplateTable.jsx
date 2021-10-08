import React, { useMemo } from 'react';

import {
  Checkbox,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { DataTableHead } from 'Components/DataTable';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useTemplateTableStyles } from './style';

const TemplateTable = ({ templates, handleFilterTemplates }) => {
  const { t } = useTranslation('templateTable');
  const classes = useTemplateTableStyles();

  const headCells = useMemo(
    () => [
      {
        id: 'template',
        label: t('template'),
      },
      {
        id: 'attributesNumber',
        label: t('attributesNumber'),
      },
    ],
    [t],
  );

  const handleStopPropagation = e => {
    e.stopPropagation();
  };

  return (
    <TableContainer>
      <Table aria-labelledby='tableTitle' size='small'>
        <DataTableHead
          className={classes.tableHead}
          cells={headCells}
          rowCount={10}
          numSelected={0}
          endExtraCells={
            <TableCell>
              <TextField
                size='small'
                className={classes.searchTextField}
                onChange={handleFilterTemplates}
                InputProps={{
                  className: classes.searchInput,
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Search />
                    </InputAdornment>
                  ),
                }}
                variant='outlined'
              />
            </TableCell>
          }
        />
        <TableBody>
          {templates.map(template => {
            return (
              <TableRow key={template.id} tabIndex={-1} role='checkbox' hover>
                <TableCell onClick={handleStopPropagation}>
                  <Checkbox color='primary' />
                </TableCell>
                <TableCell>{template.name}</TableCell>
                <TableCell colSpan='2'>{template.numberAttributes}</TableCell>
              </TableRow>
            );
          })}
          {templates.length === 0 && (
            <TableRow>
              <TableCell align='center' colSpan={4} className={classes.tableBodyEmpty}>
                <i>{t('templateEmpty')}</i>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TemplateTable.propTypes = {
  templates: PropTypes.array,
  handleFilterTemplates: PropTypes.func.isRequired,
};

TemplateTable.defaultProps = {
  templates: [],
};

export default TemplateTable;
