import React, { useState, useEffect, useRef, useCallback } from 'react';

import {
  Box,
  CircularProgress,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from '@material-ui/core';
import { Search, Close, Save } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'sharedComponents/Hooks';

import { useSearchBarStyles } from './style';

const LabelBar = ({ label, handleSaveClick, handleName, handleCancel }) => {
  const { t } = useTranslation(['flows', 'common']);
  const classes = useSearchBarStyles();

  const searchInputRef = useRef(null);

  const [isTyping, setIsTyping] = useState(false);
  const [internalSearchText, setInternalSearchText] = useState(label);

  useEffect(() => {
    if (typeof internalSearchText === 'string' && internalSearchText === '') {
      setInternalSearchText(label);
    }
  }, [label]);

  const handleDebounce = useDebounce({
    delay: 500,
    startCallback() {
      setIsTyping(true);
    },
    stopCallback(flowNewName) {
      setIsTyping(false);
      handleName(flowNewName);
    },
  });

  const handleClearSearch = useCallback(() => {
    setInternalSearchText('');
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
  }, [setInternalSearchText, searchInputRef]);

  const handleChangeSearchText = useCallback(
    e => {
      const search = e.target.value;
      setInternalSearchText(search);
      handleDebounce(search);
    },
    [setInternalSearchText, handleDebounce],
  );

  return (
    <Box className={classes.searchContainer} paddingY={1} paddingX={2} margin={0}>
      <Box className={classes.leftSide}>
        <TextField
          inputRef={searchInputRef}
          className={classes.searchTextField}
          size='small'
          variant='outlined'
          value={internalSearchText}
          placeholder={t('nameInput')}
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
      <Tooltip placement='bottom' title={t('CancelAction')} arrow>
        <Button
          className={classes.createButton}
          color='primary'
          aria-label={t('CancelAction')}
          onClick={handleCancel}
          startIcon={<Close />}
        >
          {t('common:cancel')}
        </Button>
      </Tooltip>
      <Tooltip placement='bottom' title={t('SaveChanges')} arrow>
        <Button
          className={classes.createButton}
          color='primary'
          aria-label={t('saveChanges')}
          onClick={handleSaveClick}
          startIcon={<Save />}
        >
          {t('common:save')}
        </Button>
      </Tooltip>
    </Box>
  );
};

LabelBar.propTypes = {
  label: PropTypes.string,
  handleSaveClick: PropTypes.func,
  handleName: PropTypes.func,
  handleCancel: PropTypes.func,
};

LabelBar.defaultProps = {
  label: '',
  handleSaveClick: null,
  handleName: null,
  handleCancel: null,
};

export default LabelBar;
