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
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { useDebounce } from 'use-debounce';
import * as Yup from 'yup';

import { useStyles } from './Devices';

const validationSchema = Yup.object({});

const Devices = props => {
  const { initialState, handleClick, ...otherProps } = props;
  const handleSubmit = values => {
    handleClick({
      type: 'next',
      payload: { values: values.devices, key: 'devices' },
    });
  };

  const handleBack = () => {
    handleClick({ type: 'back' });
  };
  return (
    <Formik
      initialValues={initialState}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {formikProps => (
        <GeneralForm {...formikProps} {...otherProps} onBack={handleBack} />
      )}
    </Formik>
  );
};

const GeneralForm = props => {
  const {
    initialValues,
    handleChange,
    handleSubmit,
    selectedValues,
    onFilter,
    usePagination,
    onPageChange,
    totalPages,
  } = props;

  const [checked, setChecked] = useState(selectedValues);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermDebounced] = useDebounce(searchTerm, 1000);

  const handleToggle = value => {
    const currentIndex = checked.map(item => item.id).indexOf(value.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    handleChange({ currentTarget: { name: 'devices', value: newChecked } });
  };

  const handleChangeSearch = useCallback(e => {
    setSearchTerm(e.target.value);
  }, []);

  useEffect(() => {
    onFilter(searchTermDebounced);
  }, [searchTermDebounced, onFilter]);

  const getItemSelected = id => checked.map(item => item.id).indexOf(id) !== -1;

  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit}>
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
          {!initialValues.length ? (
            <ListItem className={classes.notFound}>
              <ListItemText primary="Nenhum dispositivo encontrado para o filtro informado." />
            </ListItem>
          ) : (
            initialValues.map(value => {
              const labelId = `checkbox-list-label-${value.id}`;

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
                        checked={getItemSelected(value.id)}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                        color="primary"
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={`[${value.id}] ${value.label}`}
                    />
                  </ListItem>
                  <Divider />
                </Fragment>
              );
            })
          )}
        </List>
        {usePagination && initialValues.length > 0 && (
          <Grid item className={classes.paginationContainer}>
            <Pagination
              count={totalPages}
              variant="outlined"
              shape="rounded"
              onChange={onPageChange}
            />
          </Grid>
        )}
      </Grid>
      <WFooter {...props} isValid={!!checked.length} />
    </form>
  );
};

Devices.defaultProps = {
  onFilter: () => {},
  usePagination: false,
  onPageChange: () => {},
  totalPages: 1,
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
  onPageChange: PropTypes.func,
  totalPages: PropTypes.number,
};

export default Devices;
