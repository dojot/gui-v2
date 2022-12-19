import React, { useMemo } from 'react';

import {
  Box,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { NEW_CHIP_HOURS_AGO } from 'sharedComponents/Constants';
import { DataTableHead } from 'sharedComponents/DataTable';
import { isSomeHoursAgo } from 'sharedComponents/Utils';

import { useDataTableStyles } from './style';

const DataTable = ({ flows, handleClickFlow, handleSetFlowOptionsMenu }) => {
  const { t } = useTranslation(['common']);
  const classes = useDataTableStyles();

  const headCells = useMemo(
    () => [
      {
        id: 'name',
        label: t('dataTableHead.label'),
      },
      {
        id: 'id',
        label: t('dataTableHead.id'),
      },
      {
        id: 'created',
        label: t('dataTableHead.created'),
      },
      {
        id: 'updated',
        label: t('dataTableHead.updated'),
      },
      {
        id: 'actions',
        label: t('dataTableHead.actions'),
        disableOrderBy: true,
      },
    ],
    [t],
  );

  return (
    <Paper elevation={0}>
      <TableContainer>
        <Table aria-labelledby='tableTitle' size='medium'>
          <DataTableHead
            className={classes.tableHead}
            cells={headCells}
            rowCount={flows.length}
            disableCheckbox
            disableOrderBy
          />

          <TableBody>
            {flows.map(device => {
              const isNew = isSomeHoursAgo(device.created, NEW_CHIP_HOURS_AGO);

              return (
                <TableRow
                  key={device.id}
                  tabIndex={-1}
                  role='checkbox'
                  onClick={() => handleClickFlow(device)}
                  hover
                >
                  <TableCell className={classes.clickableCell}>
                    <Box mr={isNew ? 1 : 0} component='span'>
                      {device.name}
                    </Box>

                    {isNew && <Chip color='primary' label={t('new')} size='small' />}
                  </TableCell>

                  <TableCell className={classes.clickableCell}>{device.id}</TableCell>

                  <TableCell className={classes.clickableCell}>
                    {device.created ? moment(device.created).format('L LTS') : ''}
                  </TableCell>

                  <TableCell className={classes.clickableCell}>
                    {device.updated ? moment(device.updated).format('L LTS') : ''}
                  </TableCell>

                  <TableCell onClick={e => e.stopPropagation()}>
                    <IconButton
                      onClick={event =>
                        handleSetFlowOptionsMenu({
                          anchorElement: event.target,
                          flow: device,
                        })
                      }
                      size='small'
                    >
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
  flows: PropTypes.array.isRequired,
  handleClickFlow: PropTypes.func.isRequired,
  handleSetFlowOptionsMenu: PropTypes.func.isRequired,
};

export default DataTable;
