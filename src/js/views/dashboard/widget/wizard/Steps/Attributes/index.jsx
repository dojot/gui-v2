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
import { Paginator, usePaginator } from 'Components/Paginator';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { GithubPicker } from 'react-color';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'use-debounce';
import * as Yup from 'yup';

import { useStyles } from './style';

const validationSchema = Yup.object({});

const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, deps);
};

const Index = ({ initialState, handleClick, ...otherProps }) => {
  const handleSubmit = values => {
    const staticValues = [];
    const dynamicValues = [];
    values.attributes.forEach(item => {
      if (item.isDynamic) {
        dynamicValues.push(item);
      } else {
        staticValues.push(item);
      }
    });

    handleClick({
      type: 'next',
      payload: {
        values: { dynamicValues, staticValues },
        key: 'attributes',
      },
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
  const { handleChange, handleSubmit, initialValues, acceptedTypes } = props;
  const [checked, setChecked] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermDebounced] = useDebounce(searchTerm, 1000);
  const {
    paginatorData,
    setPaginatorData,
    setCurrentPage,
    setPageSize,
  } = usePaginator('client');

  const sortList = useCallback((list, fieldCompare) => {
    const orderedList = [...list];
    orderedList.sort((item1, item2) => {
      if (item1[fieldCompare] < item2[fieldCompare]) {
        return -1;
      }
      if (item1[fieldCompare] > item2[fieldCompare]) {
        return 1;
      }
      return 0;
    });
    return orderedList;
  }, []);

  const getInitialAttributes = useCallback(() => {
    const attributes = [];
    const orderedDevices = sortList(initialValues, 'label');

    orderedDevices.forEach(device => {
      const orderedAttrs = sortList(device.attrs, 'label');

      const deviceAttributes = orderedAttrs.map(
        ({ isDynamic, staticValue, label, valueType }) => ({
          isDynamic,
          staticValue,
          deviceId: device.id,
          deviceLabel: device.label,
          attributeId: `${device.id}${label}`,
          attributeLabel: label,
          attributeValueType: valueType,
        }),
      );
      deviceAttributes.forEach(attr => attributes.push(attr));
    });
    return attributes;
  }, [initialValues, sortList]);

  const [initialAttributes] = useState(() => getInitialAttributes());

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTermDebounced, setCurrentPage]);

  useEffect(() => {
    const filtered = !searchTermDebounced
      ? initialAttributes
      : initialAttributes.filter(item => {
          return (
            item.deviceLabel.toLowerCase().includes(searchTermDebounced) ||
            item.attributeLabel.toLowerCase().includes(searchTermDebounced)
          );
        });
    setPaginatorData(filtered);
  }, [initialAttributes, searchTermDebounced, setPaginatorData]);

  const handleSearchChange = useCallback(e => {
    const { value } = e.target;
    setSearchTerm(value ? value.toLowerCase() : '');
  }, []);

  const handleToggle = ({ isToggle, ...otherProps }) => {
    const currentIndex = checked
      .map(item => item.attributeID)
      .indexOf(otherProps.attributeID);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push({
        ...otherProps,
      });
    } else if (isToggle) {
      newChecked.splice(currentIndex, 1);
      newChecked.push({
        ...otherProps,
      });
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    handleChange({
      currentTarget: {
        name: 'attributes',
        value: newChecked,
      },
    });
  };

  const { t } = useTranslation(['dashboard']);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction='column' className={classes.root}>
        <Grid item className={classes.searchContainer}>
          <TextField
            variant='outlined'
            placeholder={t('attributes.search')}
            name='searchAttributes'
            onChange={handleSearchChange}
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
        <List className={classes.listContainer}>
          {!paginatorData.pageData.length ? (
            <ListItem className={classes.notFound}>
              <ListItemText primary={t('attributes.notFound')} />
            </ListItem>
          ) : (
            paginatorData.pageData.map(item => {
              const {
                deviceId,
                deviceLabel,
                attributeId,
                attributeLabel,
                attributeValueType,
                isDynamic,
                staticValue,
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
                  meta={{
                    id: deviceId,
                    label: deviceLabel,
                    attributeId,
                  }}
                  key={`${deviceId}${attributeLabel}`}
                  selected={!!isSelected}
                  acceptedTypes={acceptedTypes}
                  isDynamic={isDynamic}
                  staticValue={staticValue}
                />
              );
            })
          )}
        </List>
        <Grid item className={classes.paginationContainer}>
          <Paginator
            totalPages={paginatorData.totalPages}
            currentPage={paginatorData.currentPage}
            pageSize={paginatorData.pageSize}
            onPageChange={(event, currentPage) => setCurrentPage(currentPage)}
            onPageSizeChange={pageSize => setPageSize(pageSize)}
            showFirstButton
            showLastButton
          />
        </Grid>
      </Grid>
      <WFooter {...props} isValid={!!checked.length} />
    </form>
  );
};

const ItemRow = ({
  value,
  handleToggle,
  meta,
  selected = false,
  acceptedTypes,
  isDynamic,
  staticValue,
}) => {
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
        isDynamic,
        staticValue,
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
        isDynamic,
        staticValue,
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
      isDynamic,
      staticValue,
    });
  }, [isToggle]);

  const checkCompatibility = useCallback(
    () => !acceptedTypes.includes(value.valueType),
    [acceptedTypes, value],
  );

  const renderItem = useCallback(() => {
    return (
      <>
        <span className='listTitle'>{`[${label}] ${value.label}`}</span>
        <span className='listId'>{`( ${
          isDynamic ? 'Dynamic' : 'Static'
        } )`}</span>
      </>
    );
  }, []);

  const { t } = useTranslation(['dashboard']);

  return (
    <Fragment key={attributeId}>
      <ListItem
        role={undefined}
        button
        onClick={() => setIsToggle(!isToggle)}
        disabled={checkCompatibility()}
      >
        <ListItemIcon>
          <Checkbox
            edge='start'
            checked={isToggle}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
            color='primary'
          />
        </ListItemIcon>
        <Tooltip title={id} placement='bottom-start'>
          <ListItemText id={labelId} primary={renderItem()} />
        </Tooltip>
        <ListItemSecondaryAction className={classes.action}>
          <TextField
            id='outlined-search'
            label={t('attributes.subtitle')}
            variant='outlined'
            margin='dense'
            value={description}
            onChange={event => setDescription(event.target.value)}
            disabled={checkCompatibility()}
          />
          <Button
            variant='outlined'
            startIcon={<CommentIcon />}
            className={classes.button}
            style={{ backgroundColor: color }}
            onClick={() => setIsOpen(!isOpen)}
            disabled={checkCompatibility()}
          >
            {t('attributes.colorPicker')}
          </Button>
          {isOpen ? (
            <div className={classes.picker}>
              <GithubPicker
                triangle='top-right'
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

Index.defaultProps = {
  isOpen: false,
  acceptedTypes: ['NUMBER', 'BOOLEAN', 'STRING', 'GEO', 'UNDEFINED'],
};

Index.propTypes = {
  initialState: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.array.isRequired,
  isOpen: PropTypes.bool,
  acceptedTypes: PropTypes.arrayOf(PropTypes.string),
};

export default Index;
