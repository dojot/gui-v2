import { TextField } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { WFooter } from 'Components/Footer';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
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
    >
      {formikProps => (
        <GeneralForm {...formikProps} {...otherProps} onBack={handleBack} />
      )}
    </Formik>
  );
};

const GeneralForm = props => {
  const { initialValues, handleChange, handleSubmit, selectedValues } = props;

  const [checked, setChecked] = useState(selectedValues);
  const [filteredDevices, setFilteredDevices] = useState([]);
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
    setSearchTerm(e.target.value ? e.target.value.toLowerCase() : '');
  }, []);

  useEffect(() => {
    // TODO aqui nessa rotina quando estivermos com a api funcionando com o filtro de pesquisa
    // podemos receber uma função como props desse componente e pasar o termo de consulta
    // para que o objeto pai realize a consulta via Saga e atualize a lista de devices.
    // Hoje o filtro está sendo feito em cima dos valores recebidos na propriedade initialValues

    if (!searchTermDebounced) {
      setFilteredDevices(initialValues);
      return;
    }
    setFilteredDevices(
      initialValues.filter(
        device =>
          device.id.includes(searchTermDebounced) ||
          device.label.toLowerCase().includes(searchTermDebounced),
      ),
    );
  }, [searchTermDebounced, initialValues]);

  const getItemSelected = id => checked.map(item => item.id).indexOf(id) !== -1;

  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit}>
      <Grid container justify="center">
        <Grid item className={classes.searchContainer}>
          <TextField
            variant="outlined"
            label="Filtro de dispositivos"
            name="searchDevices"
            onChange={handleChangeSearch}
            fullWidth
          />
        </Grid>
        <List className={classes.root}>
          {!filteredDevices.length ? (
            <ListItem className={classes.notFound}>
              <ListItemText primary="Nenhum dispositivo encontrado para o filtro informado." />
            </ListItem>
          ) : (
            filteredDevices.map(value => {
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
      </Grid>
      <WFooter {...props} isValid={!!checked.length} />
    </form>
  );
};

Devices.defaultProps = {};

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
};

export default Devices;
