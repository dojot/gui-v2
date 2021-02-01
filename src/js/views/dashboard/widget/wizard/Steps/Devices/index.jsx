import React, { Fragment, useCallback, useEffect, useState } from 'react';

import { Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { FormCheckBox } from 'Components/Checkbox';
import { Paginator, usePaginator } from 'Components/Paginator';
import { Field } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { Device as DeviceService } from 'Services/index';
import { useDebounce } from 'use-debounce';

import Wizard from '../../wizard';
import { useStyles } from './style';

const Devices = ({ validate, ...otherProps }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermDebounced] = useDebounce(searchTerm, 1000);
  const {
    paginatorData,
    setPaginatorData,
    setCurrentPage,
    setPageSize,
    setDisablePaginator,
  } = usePaginator();

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
      <Grid container justify='center'>
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
                  <SearchIcon />
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
                        parse={item => (item ? value : null)}
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
