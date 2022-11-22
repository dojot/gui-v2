import React, { useEffect, useRef, useState } from 'react';

import { Box, CircularProgress, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Search, Close } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useDebounce } from 'sharedComponents/Hooks';
import { useSearchBarStyles } from './style';

const SearchBar = ({ lastSearchedText, handleSearchDevice }) => {
  const { t } = useTranslation(['createReport', 'common']);
  const classes = useSearchBarStyles();

  const searchInputRef = useRef(null);

  const [isTyping, setIsTyping] = useState(false);
  const [internalSearchText, setInternalSearchText] = useState('');

  const handleDebounce = useDebounce({
    delay: 1000,
    startCallback() {
      setIsTyping(true);
    },
    stopCallback(search) {
      setIsTyping(false);
      handleSearchDevice(search);
    },
  });

  const handleClearSearch = () => {
    handleSearchDevice('');
    setInternalSearchText('');
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
  };

  const handleChangeSearchText = e => {
    const search = e.target.value;
    setInternalSearchText(search);
    handleDebounce(search);
  };

  useEffect(() => {
    setInternalSearchText(lastSearchedText);
  }, [lastSearchedText]);

  return (
    <Box className={classes.searchContainer} paddingY={1} paddingX={2} margin={0}>
      <Box className={classes.leftSide}>
        <TextField
          inputRef={searchInputRef}
          className={classes.searchTextField}
          size='small'
          variant='outlined'
          value={internalSearchText}
          placeholder={t('searchBar.searchInputPh')}
          onChange={handleChangeSearchText}
          InputProps={{
            className: classes.searchInput,
            startAdornment: (
              <InputAdornment position='start'>
                {isTyping ? (
                  <Box marginRight={1} paddingTop={0.5}>
                    <CircularProgress size={16} />
                  </Box>
                ) : (
                  <Search />
                )}
              </InputAdornment>
            ),
            endAdornment: internalSearchText ? (
              <InputAdornment position='end'>
                <IconButton onClick={handleClearSearch} disabled={isTyping} size='small'>
                  <Close />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />
      </Box>
    </Box>
  );
};

SearchBar.propTypes = {
  lastSearchedText: PropTypes.string,
  handleSearchDevice: PropTypes.func,
};

SearchBar.defaultProps = {
  lastSearchedText: '',
  handleSearchDevice: null,
};

export default SearchBar;
