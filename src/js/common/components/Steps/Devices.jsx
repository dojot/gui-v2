import React, { Fragment, useCallback, useEffect, useState } from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Pagination from '@material-ui/lab/Pagination';
import { WFooter } from 'Components/Footer';
import PropTypes from 'prop-types';
import { useDebounce } from 'use-debounce';

import { useStyles } from './Devices';

const Devices = props => {
  const {
    initialState,
    selectedValues,
    onFilter,
    usePagination,
    onPageChange,
    currentPage,
    totalPages,
    handleClick,
  } = props;

  const classes = useStyles();
  const [selectedDevices, setSelectedDevices] = useState(selectedValues);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermDebounced] = useDebounce(searchTerm, 1000);

  useEffect(() => {
    onFilter(searchTermDebounced);
  }, [searchTermDebounced, onFilter]);

  const handleToggle = useCallback(
    value => {
      const currentDeviceIndex = selectedDevices
        .map(item => item.id)
        .indexOf(value.id);
      const newSelectedDevices = [...selectedDevices];

      if (currentDeviceIndex === -1) {
        newSelectedDevices.push(value);
      } else {
        newSelectedDevices.splice(currentDeviceIndex, 1);
      }
      setSelectedDevices(newSelectedDevices);
    },
    [selectedDevices],
  );

  const handleChangeSearch = useCallback(e => {
    setSearchTerm(e.target.value);
  }, []);

  const getSelectedDevice = useCallback(
    id => selectedDevices.map(item => item.id).indexOf(id) !== -1,
    [selectedDevices],
  );

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      handleClick({
        type: 'next',
        payload: { values: selectedDevices, key: 'devices' },
      });
    },
    [handleClick, selectedDevices],
  );

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <Grid container justify="center">
        <Grid item className={classes.searchContainer}>
          <TextField
            variant="outlined"
            placeholder="Digite o nome do dispositivo"
            name="searchDevices"
            onChange={handleChangeSearch}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <List className={classes.root}>
          {!initialState.length ? (
            <ListItem className={classes.notFound}>
              <ListItemText primary="Nenhum dispositivo encontrado para o filtro informado." />
            </ListItem>
          ) : (
            initialState.map(value => {
              const { id, label } = value;
              const labelId = `checkbox-list-label-${id}`;

              return (
                <Fragment key={value.id}>
                  <ListItem
                    role={undefined}
                    button
                    onClick={() => handleToggle(value)}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={getSelectedDevice(id)}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                        color="primary"
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`[${id}] ${label}`} />
                  </ListItem>
                  <Divider />
                </Fragment>
              );
            })
          )}
        </List>
        {usePagination && initialState.length > 0 && (
          <Grid item className={classes.paginationContainer}>
            <Pagination
              count={totalPages}
              page={currentPage}
              variant="outlined"
              shape="rounded"
              onChange={onPageChange}
            />
          </Grid>
        )}
      </Grid>
      <WFooter {...props} isValid={!!selectedDevices.length} />
    </form>
  );
};

Devices.defaultProps = {
  onFilter: () => {},
  usePagination: false,
  currentPage: 1,
  totalPages: 1,
  onPageChange: () => {},
};

Devices.propTypes = {
  initialState: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      attrs: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          valueType: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
  handleClick: PropTypes.func.isRequired,
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.array.isRequired,
  onFilter: PropTypes.func,
  usePagination: PropTypes.bool,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
};

export default Devices;
