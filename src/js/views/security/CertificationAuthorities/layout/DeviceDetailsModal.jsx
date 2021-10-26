import React from 'react';

import {
  Dialog,
  IconButton,
  Typography,
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from '@material-ui/core';
import { Close, FilterNone, Label, History } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useDetailsModalStyles } from './style';

const fakeRows = [
  { date: '02/03/2021 15:22:15', key: 'testing_1', value: 'Testing' },
  { date: '02/03/2021 15:22:15', key: 'testing_2', value: 'Testing' },
  { date: '02/03/2021 15:22:15', key: 'testing_3', value: 'Testing' },
  { date: '02/03/2021 15:22:15', key: 'testing_4', value: 'Testing' },
  { date: '02/03/2021 15:22:15', key: 'testing_5', value: 'Testing' },
  { date: '02/03/2021 15:22:15', key: 'testing_6', value: 'Testing' },
  { date: '02/03/2021 15:22:15', key: 'testing_7', value: 'Testing' },
  { date: '02/03/2021 15:22:15', key: 'testing_8', value: 'Testing' },
  { date: '02/03/2021 15:22:15', key: 'testing_9', value: 'Testing' },
];

const DeviceDetailsModal = ({ isOpen, deviceDetails, handleHideDetailsModal }) => {
  const { t } = useTranslation('devices');
  const classes = useDetailsModalStyles();

  return (
    <Dialog open={isOpen} onClose={handleHideDetailsModal} maxWidth='lg' fullWidth>
      <Box className={classes.detailsModalTitle} padding={2}>
        <Typography variant='h6'>
          {t('detailsModalTitle', { label: deviceDetails.label })}
        </Typography>
        <IconButton onClick={handleHideDetailsModal} size='small'>
          <Close />
        </IconButton>
      </Box>

      <Box padding={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <List className={classes.dataGroup} disablePadding>
              <ListItem divider>
                <ListItemIcon className={classes.dataGroupTitleIcon}>
                  <FilterNone fontSize='small' style={{ color: '#F1B44C' }} />
                </ListItemIcon>
                <ListItemText>Modelos</ListItemText>
              </ListItem>
              <ListItem divider>
                <ListItemText secondary='Modelo' />
              </ListItem>
              <ListItem divider>
                <ListItemText secondary='Modelo' />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <List className={classes.dataGroup} disablePadding>
              <ListItem divider>
                <ListItemIcon className={classes.dataGroupTitleIcon}>
                  <Label fontSize='small' style={{ color: '#50a5f1' }} />
                </ListItemIcon>
                <ListItemText>Atributos Estáticos</ListItemText>
              </ListItem>
              <ListItem divider>
                <ListItemText primary='Primary' secondary='Secondary' />
              </ListItem>
              <ListItem divider>
                <ListItemText primary='Primary' secondary='Secondary' />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <List className={classes.dataGroup} disablePadding>
              <ListItem divider>
                <ListItemIcon className={classes.dataGroupTitleIcon}>
                  <History fontSize='small' style={{ color: '#f46a6a' }} />
                </ListItemIcon>
                <ListItemText>Última Atualização Recebida</ListItemText>
              </ListItem>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableCellBold}>{t('lastUpdate.date')}</TableCell>
                    <TableCell className={classes.tableCellBold}>{t('lastUpdate.key')}</TableCell>
                    <TableCell className={classes.tableCellBold}>{t('lastUpdate.value')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fakeRows.map(row => (
                    <TableRow
                      key={row.key}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell className={classes.tableCellSecondary}>{row.date}</TableCell>
                      <TableCell className={classes.tableCellSecondary}>{row.key}</TableCell>
                      <TableCell className={classes.tableCellSecondary}>{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </List>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

DeviceDetailsModal.propTypes = {
  isOpen: PropTypes.bool,
  deviceDetails: PropTypes.object,
  handleHideDetailsModal: PropTypes.func,
};

DeviceDetailsModal.defaultProps = {
  isOpen: false,
  deviceDetails: {},
  handleHideDetailsModal: null,
};

export default DeviceDetailsModal;
