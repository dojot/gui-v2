import React, { useEffect, useState } from 'react';

import { Box, CircularProgress, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Close, Search } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import { useDebounce } from 'sharedComponents/Hooks';
import { useSearchBarStyles } from './style';

const SecuritySearchBar = ({ lastSearchedText, handleSearch }) => {
  const { t } = useTranslation('createDevice');
  const classes = useSearchBarStyles();

  const [isTyping, setIsTyping] = useState(false);
  const [internalSearchText, setInternalSearchText] = useState('');

  const handleDebounce = useDebounce({
    delay: 1000,
    startCallback() {
      setIsTyping(true);
    },
    stopCallback(search) {
      setIsTyping(false);
      handleSearch(search);
    },
  });

  const handleClearSearch = () => {
    handleSearch('');
    setInternalSearchText('');
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
    <TextField
      className={classes.searchTextField}
      size='small'
      variant='outlined'
      value={internalSearchText}
      placeholder={t('securityStep.searchInputPh')}
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
  );
};

export default SecuritySearchBar;
