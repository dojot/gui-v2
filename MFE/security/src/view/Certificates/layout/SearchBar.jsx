import React, { useEffect, useRef, useState } from 'react';

import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from '@material-ui/core';
import { ViewModule, List, Search, Add, Close } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { VIEW_MODE } from 'sharedComponents/Constants';
import { useDebounce } from 'sharedComponents/Hooks';
import { useSearchBarStyles } from './style';

const SearchBar = ({
  viewMode,
  lastSearchedText,
  handleChangeViewMode,
  handleSearchCertificate,
}) => {
  const { t } = useTranslation(['certificates', 'common']);
  const classes = useSearchBarStyles();
  const history = useHistory();

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
      handleSearchCertificate(search);
    },
  });

  const handleCreateCertificate = () => {
    history.push('/certificates/new');
  };

  const handleClearSearch = () => {
    handleSearchCertificate('');
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
        <Tooltip title={t('common:viewList')} arrow className={classes.tooltip}>
          <IconButton
            color={viewMode === VIEW_MODE.TABLE ? 'primary' : 'default'}
            onClick={() => handleChangeViewMode(VIEW_MODE.TABLE)}
          >
            <List />
          </IconButton>
        </Tooltip>

        <Tooltip title={t('common:viewGrid')} arrow className={classes.tooltip}>
          <IconButton
            color={viewMode === VIEW_MODE.CARD ? 'primary' : 'default'}
            onClick={() => handleChangeViewMode(VIEW_MODE.CARD)}
          >
            <ViewModule />
          </IconButton>
        </Tooltip>

        <TextField
          inputRef={searchInputRef}
          className={classes.searchTextField}
          size='small'
          variant='outlined'
          value={internalSearchText}
          placeholder={t('searchInputPh')}
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

      <Tooltip placement='left' title={t('createNewCertificate')} arrow>
        <IconButton
          className={classes.createButton}
          color='primary'
          aria-label={t('createNewCertificate')}
          onClick={handleCreateCertificate}
        >
          <Add />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

SearchBar.propTypes = {
  viewMode: PropTypes.oneOf(Object.values(VIEW_MODE)),
  lastSearchedText: PropTypes.string,
  handleChangeViewMode: PropTypes.func,
  handleSearchCertificate: PropTypes.func,
};

SearchBar.defaultProps = {
  viewMode: VIEW_MODE.TABLE,
  lastSearchedText: '',
  handleChangeViewMode: null,
  handleSearchCertificate: null,
};

export default SearchBar;
