import React from 'react';

import { Box, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { ViewModule, List, Search, Add } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import useStyles from './style';

const SearchBar = () => {
  const { t } = useTranslation('devices');
  const classes = useStyles();

  return (
    <Box className={classes.container} paddingY={1} paddingX={2} margin={0}>
      <div className={classes.leftSide}>
        <IconButton>
          <List />
        </IconButton>

        <IconButton>
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

export default SearchBar;
