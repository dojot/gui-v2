import React from 'react';

import { Box, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { ViewModule, List, Search, Add } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { VIEW_MODE } from './constants';
import useStyles from './style';

const SearchBar = ({ viewMode, handleChangeViewMode }) => {
  const { t } = useTranslation('devices');
  const classes = useStyles();

  return (
    <Box className={classes.container} paddingY={1} paddingX={2} margin={0}>
      <div className={classes.leftSide}>
        <IconButton
          color={viewMode === VIEW_MODE.TABLE ? 'primary' : 'default'}
          onClick={() => handleChangeViewMode(VIEW_MODE.TABLE)}
        >
          <List />
        </IconButton>

        <IconButton
          color={viewMode === VIEW_MODE.CARD ? 'primary' : 'default'}
          onClick={() => handleChangeViewMode(VIEW_MODE.CARD)}
        >
          <ViewModule />
        </IconButton>

        <TextField
          className={classes.searchTextField}
          size='small'
          variant='outlined'
          placeholder={t('searchInputPh')}
          InputProps={{
            className: classes.searchInput,
            startAdornment: (
              <InputAdornment position='start'>
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <IconButton className={classes.createButton} color='primary' aria-label='Create'>
        <Add />
      </IconButton>
    </Box>
  );
};

SearchBar.propTypes = {
  viewMode: PropTypes.oneOf(Object.values(VIEW_MODE)),
  handleChangeViewMode: PropTypes.func,
};

SearchBar.defaultProps = {
  viewMode: VIEW_MODE.TABLE,
  handleChangeViewMode: null,
};

export default SearchBar;
