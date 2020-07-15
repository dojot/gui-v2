import React, { Fragment, useState, useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { WFooter } from 'Components/Footer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CommentIcon from '@material-ui/icons/ColorLens';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { GithubPicker } from 'react-color';
import Tooltip from '@material-ui/core/Tooltip';
import { useStyles } from './Devices';

const validationSchema = Yup.object({});

const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

const Attributes = props => {
  const { initialState, handleClick, ...otherProps } = props;

  const handleSubmit = values => {
    handleClick({
      type: 'next',
      payload: { values: values.attributes, key: 'attributes' },
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
        <AttributesForm {...formikProps} {...otherProps} onBack={handleBack} />
      )}
    </Formik>
  );
};

const AttributesForm = props => {
  const { handleChange, handleSubmit, initialValues } = props;

  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);

  const handleToggle = ({
    attributeID,
    deviceID,
    deviceLabel,
    color,
    description,
    label,
    isToggle,
  }) => {
    const currentIndex = checked
      .map(item => item.attributeID)
      .indexOf(attributeID);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push({
        label,
        attributeID,
        deviceID,
        deviceLabel,
        color,
        description,
      });
    } else if (isToggle) {
      newChecked.splice(currentIndex, 1);
      newChecked.push({
        label,
        attributeID,
        deviceID,
        deviceLabel,
        color,
        description,
      });
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    handleChange({ currentTarget: { name: 'attributes', value: newChecked } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" className={classes.root}>
        <List className={classes.root}>
          {initialValues.map(value => {
            const { attrs, id, label } = value;
            return attrs.map((item, index) => (
              <ItemRow
                handleToggle={handleToggle}
                value={item}
                meta={{ id, label, index }}
                key={`${id}${item.label}`}
              />
            ));
          })}
        </List>
      </Grid>
      <WFooter {...props} />
    </form>
  );
};

const ItemRow = ({ value, handleToggle, meta }) => {
  const classes = useStyles();
  const labelId = `checkbox-list-label-${meta.id}`;

  const [isOpen, setIsOpen] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const [color, setColor] = useState('#FAFAFA');
  const [description, setDescription] = useState('');

  useDidMountEffect(() => {
    const { id, label, index } = meta;
    if (isToggle) {
      handleToggle({
        deviceID: id,
        attributeID: `${id}${index}`,
        deviceLabel: label,
        color,
        description,
        label: value.label,
        isToggle,
      });
    }
  }, [color]);

  useDidMountEffect(() => {
    const { id, label, index } = meta;
    if (isToggle) {
      handleToggle({
        deviceID: id,
        attributeID: `${id}${index}`,
        deviceLabel: label,
        color,
        description,
        label: value.label,
        isToggle,
      });
    }
  }, [description]);

  useDidMountEffect(() => {
    const { id, label, index } = meta;
    handleToggle({
      deviceID: id,
      attributeID: `${id}${index}`,
      deviceLabel: label,
      color,
      description,
      label: value.label,
      isToggle,
    });
  }, [isToggle]);

  return (
    <Fragment key={meta.id}>
      <ListItem role={undefined} button onClick={() => setIsToggle(!isToggle)}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={isToggle}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
            color="primary"
          />
        </ListItemIcon>
        <Tooltip title={meta.id} placement="bottom-start">
          <ListItemText
            id={labelId}
            primary={`[${meta.label}] ${value.label}`}
          />
        </Tooltip>
        <ListItemSecondaryAction className={classes.action}>
          <TextField
            id="outlined-search"
            label="Legenda"
            variant="outlined"
            margin="dense"
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
          <Button
            variant="outlined"
            startIcon={<CommentIcon />}
            className={classes.button}
            style={{ backgroundColor: color }}
            onClick={() => setIsOpen(!isOpen)}
          >
            Selecionar cor
          </Button>
          {isOpen ? (
            <div className={classes.picker}>
              <GithubPicker
                triangle="top-right"
                onChange={props => {
                  setColor(props.hex);
                  setIsOpen(!isOpen);
                }}
                color={color}
              />
            </div>
          ) : null}
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </Fragment>
  );
};

Attributes.defaultProps = {
  isOpen: false,
};

Attributes.propTypes = {
  initialState: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.array.isRequired,
  isOpen: PropTypes.bool,
};

export default Attributes;
