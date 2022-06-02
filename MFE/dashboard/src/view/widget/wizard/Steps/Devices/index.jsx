import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Grid, Divider, InputAdornment, List, ListItem, ListItemIcon, ListItemText, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { FormCheckBox } from 'sharedComponents/Checkbox';
import { Paginator, usePaginator } from 'sharedComponents/Paginator';
import { Field } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { Device as DeviceService } from 'Services';
import { useDebounce } from 'use-debounce';

import Wizard from '../../wizard';
import { useStyles } from './style';

export const deviceValidates = values => {
  const errors = {};
  if (!values.devices) {
    errors.msg = 'requiredDevice';
  } else if (Object.keys(values.devices).length < 1) {
    errors.msg = 'chooseAtLeastOne';
  }
  return errors;
};

const Devices = ({ validate, ...otherProps }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermDebounced] = useDebounce(searchTerm, 1000);
  const { paginatorData, setPaginatorData, setCurrentPage, setPageSize, setDisablePaginator } =
    usePaginator();

  useEffect(() => {
    setDisablePaginator(true);
    DeviceService.getDevicesList(
      { number: paginatorData.currentPage, size: paginatorData.pageSize },
      { label: searchTermDebounced },
    )
      .then(response => {
        const { devices, currentPage, totalPages } = response.getDevices;
        setPaginatorData({ data: devices, currentPage, totalPages });
      })
      .catch(error => {
        console.error(error); // TODO tratamento de erro da api
        setDisablePaginator(false);
      });
  }, [
    setDisablePaginator,
    setPaginatorData,
    paginatorData.currentPage,
    paginatorData.pageSize,
    searchTermDebounced,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTermDebounced, setCurrentPage]);

  const handleChangeSearch = useCallback(e => {
    setSearchTerm(e.target.value);
  }, []);

  const classes = useStyles();

  const { t } = useTranslation(['dashboard']);

  const renderItem = useCallback((label, id) => {
    return (
      <>
        <span className='listTitle'>{label}</span>
        <span className='listId'>{`( ${id} )`}</span>
      </>
    );
  }, []);

  return (
    <Wizard.Page validate={validate}>
      <Grid container justifyContent='center' style={{ display: 'block' }}>
        <Grid item className={classes.searchContainer}>
          <TextField
            variant='outlined'
            placeholder={t('devices.search')}
            name='searchDevices'
            onChange={handleChangeSearch}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <List className={classes.root}>
          {!paginatorData.pageData.length ? (
            <ListItem className={classes.notFound}>
              <ListItemText primary={t('devices.notFound')} />
            </ListItem>
          ) : (
            paginatorData.pageData.map(value => {
              const { id, label } = value;
              const labelId = `checkbox-list-label-${id}`;

              return (
                <Fragment key={value.id}>
                  <ListItem
                    role={undefined}
                    // button
                    // onClick={() => handleToggle(value)}
                  >
                    <ListItemIcon>
                      <Field
                        type='checkbox'
                        name={`${otherProps.name}.chk-${id}`}
                        component={FormCheckBox}
                        format={item => (item ? item.id === id : false)}
                        parse={item => (item ? value : undefined)}
                        callback={() =>
                          otherProps.form.mutators.clearAttributesByDevice(id, 'attributes')
                        }
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={renderItem(label, id)} />
                  </ListItem>
                  <Divider />
                </Fragment>
              );
            })
          )}
        </List>
        {paginatorData.pageData.length > 0 && (
          <Grid item className={classes.paginationContainer}>
            <Paginator
              totalPages={paginatorData.totalPages}
              currentPage={paginatorData.currentPage}
              pageSize={paginatorData.pageSize}
              onPageChange={(event, page) => setCurrentPage(page)}
              onPageSizeChange={pageSize => setPageSize(pageSize)}
              showFirstButton
              showLastButton
              disabled={paginatorData.disabled}
            />
          </Grid>
        )}
      </Grid>
    </Wizard.Page>
  );
};

export default Devices;
