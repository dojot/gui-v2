import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import CommentIcon from '@material-ui/icons/ColorLens';
import SearchIcon from '@material-ui/icons/Search';
import { WFooter } from 'Components/Footer';
import { Paginator } from 'Components/Paginator';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { GithubPicker } from 'react-color';
import { useDebounce } from 'use-debounce';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

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
      enableReinitialize
    >
      {formikProps => (
        <AttributesForm {...formikProps} {...otherProps} onBack={handleBack} />
      )}
    </Formik>
  );
};

const AttributesForm = props => {
  const classes = useStyles();
  const { handleChange, handleSubmit, initialValues } = props;
  const [checked, setChecked] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermDebounced] = useDebounce(searchTerm, 1000);
  const [filteredAttributes, setFilteredAttributes] = useState([]);
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    totalPages: 0,
    pageSize: 5,
  });

  const [initialAttributes] = useState(() => {
    const list = [];
    if (!initialValues) return list;

    initialValues.forEach(device => {
      const deviceAttributes = device.attrs.map(attr => ({
        deviceId: device.id,
        deviceLabel: device.label,
        attributeId: uuidv4(),
        attributeLabel: attr.label,
        attributeValueType: attr.valueType,
      }));
      deviceAttributes.forEach(attr => list.push(attr));
    });
    return list;
  });

  useEffect(() => {
    setPaginationData(state => ({ ...state, currentPage: 1 }));
  }, [searchTermDebounced]);

  useEffect(() => {
    const filtered = !searchTermDebounced
      ? initialAttributes
      : initialAttributes.filter(item => {
          return (
            item.deviceLabel.toLowerCase().includes(searchTermDebounced) ||
            item.attributeLabel.toLowerCase().includes(searchTermDebounced)
          );
        });

    const start = paginationData.pageSize * (paginationData.currentPage - 1);

    const end =
      paginationData.currentPage === 1
        ? paginationData.pageSize
        : start + paginationData.pageSize;

    const paginatedAttrs = filtered.slice(start, end);

    const totalPages = Math.ceil(filtered.length / paginationData.pageSize);
    setPaginationData(state => ({ ...state, totalPages }));
    setFilteredAttributes(paginatedAttrs);
  }, [
    initialAttributes,
    searchTermDebounced,
    paginationData.currentPage,
    paginationData.pageSize,
  ]);

  const handleSearchChange = useCallback(e => {
    const { value } = e.target;
    setSearchTerm(value ? value.toLowerCase() : '');
  }, []);

  const onPageChange = useCallback((event, currentPage) => {
    setPaginationData(state => ({ ...state, currentPage }));
  }, []);

  const onPageSizeChange = useCallback(pageSize => {
    setPaginationData(state => ({ ...state, currentPage: 1, pageSize }));
  }, []);

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
        <Grid item className={classes.searchContainer}>
          <TextField
            variant="outlined"
            placeholder="Digite o nome do dispositivo / atributo"
            name="searchAttributes"
            onChange={handleSearchChange}
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
          {!filteredAttributes.length ? (
            <ListItem className={classes.notFound}>
              <ListItemText primary="Nenhum atributo encontrado para o filtro informado" />
            </ListItem>
          ) : (
            filteredAttributes.map(item => {
              const {
                deviceId,
                deviceLabel,
                attributeId,
                attributeLabel,
                attributeValueType,
              } = item;

              const isSelected = checked.find(
                checkedItem => checkedItem.attributeID === attributeId,
              );

              return (
                <ItemRow
                  handleToggle={handleToggle}
                  value={{
                    label: attributeLabel,
                    valueType: attributeValueType,
                  }}
                  meta={{ id: deviceId, label: deviceLabel, attributeId }}
                  key={`${deviceId}${attributeLabel}`}
                  selected={!!isSelected}
                />
              );
            })
          )}
        </List>
        <Grid item className={classes.paginationContainer}>
          <Paginator
            totalPages={paginationData.totalPages}
            currentPage={paginationData.currentPage}
            pageSize={paginationData.pageSize}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
            showFirstButton
            showLastButton
          />
        </Grid>
      </Grid>
      <WFooter {...props} isValid={!!checked.length} />
    </form>
  );
};

const ItemRow = ({ value, handleToggle, meta, selected = false }) => {
  const { id, label, attributeId } = meta;

  const classes = useStyles();
  const labelId = `checkbox-list-label-${attributeId}`;

  const [isOpen, setIsOpen] = useState(false);
  const [isToggle, setIsToggle] = useState(selected);
  const [color, setColor] = useState('#FAFAFA');
  const [description, setDescription] = useState('');

  useDidMountEffect(() => {
    if (isToggle) {
      handleToggle({
        deviceID: id,
        attributeID: `${attributeId}`,
        deviceLabel: label,
        color,
        description,
        label: value.label,
        isToggle,
      });
    }
  }, [color]);

  useDidMountEffect(() => {
    if (isToggle) {
      handleToggle({
        deviceID: id,
        attributeID: `${attributeId}`,
        deviceLabel: label,
        color,
        description,
        label: value.label,
        isToggle,
      });
    }
  }, [description]);

  useDidMountEffect(() => {
    handleToggle({
      deviceID: id,
      attributeID: `${attributeId}`,
      deviceLabel: label,
      color,
      description,
      label: value.label,
      isToggle,
    });
  }, [isToggle]);

  return (
    <Fragment key={attributeId}>
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
        <Tooltip title={id} placement="bottom-start">
          <ListItemText id={labelId} primary={`[${label}] ${value.label}`} />
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
