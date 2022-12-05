import React, { Fragment, useCallback, useEffect, useState, useMemo } from 'react';

import {
  Button,
  Divider,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Tooltip,
} from '@material-ui/core';
import { Comment, Search } from '@material-ui/icons';
import _ from 'lodash';
import { TextField as FormTextField } from 'mui-rff';
import PropTypes from 'prop-types';
import { GithubPicker } from 'react-color';
import { Field } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { FormCheckBox } from 'sharedComponents/Checkbox';
import { TEMPLATE_ATTR_VALUE_TYPES, DEFAULT_COLORS } from 'sharedComponents/Constants';
import { Paginator, usePaginator } from 'sharedComponents/Paginator';
import { object2Array, hexToRgb, randomHexColor } from 'sharedComponents/Utils';
import { useDebounce } from 'use-debounce';

import Wizard from '../../wizard';
import { useStyles } from './style';

export const attrValidates = values => {
  const errors = {};
  if (Object.keys(values.attributes).length < 1) {
    errors.msg = 'chooseAtLeastOne';
  }
  return errors;
};

const Index = ({ values, validate, acceptedTypes, staticSupported, name }) => {
  const classes = useStyles();
  const { t } = useTranslation(['dashboard']);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermDebounced] = useDebounce(searchTerm, 1000);
  const { paginatorData, setPaginatorData, setCurrentPage, setPageSize } = usePaginator('client');

  const sortList = useCallback((list, fieldCompare) => {
    const orderedList = object2Array(list);
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

    const orderedDevices = _.isEmpty(values.templates)
      ? sortList(values.devices, 'label')
      : sortList(values.templates, 'label');

    orderedDevices.forEach(device => {
      const orderedAttrs = sortList(device.attrs, 'label');

      const deviceAttributes = orderedAttrs.map(attr => ({
        deviceId: device.id,
        deviceLabel: device.label,
        attributeId: `${device.id}${attr.label}`,
        attributeLabel: attr.label,
        attributeValueType: attr.valueType,
        isDynamic: attr.isDynamic,
      }));
      deviceAttributes.forEach(attr => attributes.push(attr));
    });
    return attributes;
  }, [values.devices, values.templates, sortList]);

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

  return (
    <Wizard.Page validate={validate}>
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
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <List>
          {!paginatorData.pageData.length ? (
            <ListItem className={classes.notFound}>
              <ListItemText primary={t('attributes.notFound')} />
            </ListItem>
          ) : (
            paginatorData.pageData.map((item, index) => {
              const {
                deviceId,
                deviceLabel,
                attributeId,
                attributeLabel,
                attributeValueType,
                isDynamic,
              } = item;

              return (
                <ItemRow
                  index={index}
                  value={{
                    label: attributeLabel,
                    valueType: attributeValueType,
                  }}
                  meta={{
                    id: deviceId,
                    label: deviceLabel,
                    attributeId,
                  }}
                  attributes={values.attributes}
                  key={`${deviceId}${attributeLabel}`}
                  acceptedTypes={acceptedTypes}
                  staticSupported={staticSupported}
                  isDynamic={isDynamic}
                  name={name}
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
    </Wizard.Page>
  );
};

const ColorPickerAdapter = ({ input: { onChange, value }, changeColor }) => {
  return (
    <GithubPicker
      triangle='top-right'
      colors={DEFAULT_COLORS}
      onChange={props => {
        changeColor(props);
        onChange(props.hex);
      }}
      color={value}
    />
  );
};

const ItemRow = ({
  index,
  value,
  meta,
  attributes,
  acceptedTypes,
  staticSupported,
  isDynamic,
  name,
}) => {
  const { id, label, attributeId } = meta;

  const { t } = useTranslation(['dashboard']);
  const classes = useStyles();

  const labelId = `checkbox-list-label-${attributeId}`;

  const disabledColor = {
    rgb: { r: 250, g: 250, b: 250 },
    hex: '#FAFAFA',
  };

  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState(disabledColor);
  const [isDisabled, setIsDisabled] = useState(true);

  const randomHex = useMemo(() => randomHexColor(), []);

  const attributeItem = {
    deviceID: id,
    attributeID: `${attributeId}`,
    deviceLabel: label,
    color: color.hex,
    label: value.label,
    isDynamic,
  };

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  useEffect(() => {
    if (attributes && attributes[attributeId] && !isDisabled) {
      if (attributes[attributeId].color === disabledColor.hex) {
        const attrColor = DEFAULT_COLORS[index] || randomHex;
        setColor({
          rgb: hexToRgb(attrColor),
          hex: attrColor,
        });
      } else {
        setColor({
          rgb: hexToRgb(attributes[attributeId].color),
          hex: attributes[attributeId].color,
        });
      }
    } else {
      setColor(disabledColor);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDisabled, attributes, setColor]);

  const handleFormat = item => {
    if (item) {
      setIsDisabled(item.attributeID !== attributeId);
      return item.attributeID === attributeId;
    }
    setIsDisabled(true);
    return false;
  };

  const checkCompatibility = useCallback(
    () => !(acceptedTypes.includes(value.valueType) && (isDynamic || staticSupported)),
    [acceptedTypes, staticSupported, value, isDynamic],
  );

  const renderItem = useCallback(() => {
    return (
      <>
        <span className='listTitle'>{`[${label}] ${value.label}`}</span>
        <span className='listId'>{`( ${isDynamic ? 'Dynamic' : 'Static'} )`}</span>
      </>
    );
  }, [isDynamic, label, value.label]);

  return (
    <Fragment key={attributeId}>
      <ListItem role={undefined} disabled={checkCompatibility()}>
        <ListItemIcon>
          <Field
            type='checkbox'
            color='secondary'
            name={`${name}.${attributeId}`}
            component={FormCheckBox}
            format={handleFormat}
            disabled={checkCompatibility()}
            parse={item => (item ? attributeItem : undefined)}
          />
        </ListItemIcon>
        <Tooltip title={id} placement='bottom-start' disabled>
          <ListItemText id={labelId} primary={renderItem()} />
        </Tooltip>
        <ListItemSecondaryAction className={classes.action}>
          <FormTextField
            label={t('attributes.subtitle')}
            name={`${name}.${attributeId}.description`}
            variant='outlined'
            margin='dense'
            fullWidth={false}
            disabled={isDisabled || checkCompatibility()}
          />
          <Button
            variant='outlined'
            startIcon={<Comment />}
            className={classes.button}
            style={{
              '--red': color.rgb.r,
              '--green': color.rgb.g,
              '--blue': color.rgb.b,
            }}
            onClick={() => setIsOpen(!isOpen)}
            disabled={isDisabled || checkCompatibility()}
          >
            {t('attributes.colorPicker')}
          </Button>
          {isOpen ? (
            <div className={classes.picker}>
              <Field
                name={`${name}.${attributeId}.color`}
                component={ColorPickerAdapter}
                changeColor={setColor}
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
  acceptedTypes: Object.values(TEMPLATE_ATTR_VALUE_TYPES).map(({ value }) => value),
  staticSupported: true,
};

Index.propTypes = {
  acceptedTypes: PropTypes.arrayOf(
    PropTypes.oneOf(Object.values(TEMPLATE_ATTR_VALUE_TYPES).map(({ value }) => value)),
  ),
  staticSupported: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

export default Index;
