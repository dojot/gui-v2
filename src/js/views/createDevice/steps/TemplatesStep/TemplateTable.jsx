import React, { useMemo, useRef, useState } from 'react';

import {
  Checkbox,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  CircularProgress,
  IconButton,
  Typography,
  Box,
} from '@material-ui/core';
import { Close, Search } from '@material-ui/icons';
import { DataTableHead } from 'Components/DataTable';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useDebounce } from '../../../../common/hooks';
import { useTemplateTableStyles } from './style';

const TemplateTable = ({
  templates,
  selectedTemplates,
  numberOfSelectedTemplates,
  setSelectedTemplates,
  handleSearchForTemplates,
}) => {
  const { t } = useTranslation('createDevice');
  const classes = useTemplateTableStyles();

  const searchInputRef = useRef(null);

  const [isTyping, setIsTyping] = useState(false);
  const [isShowingClearButton, setIsShowingClearButton] = useState(false);

  const headCells = useMemo(
    () => [
      {
        id: 'template',
        label: t('templatesStep.templateName'),
      },
      {
        id: 'attributesNumber',
        label: t('templatesStep.numberOfAttrs'),
      },
    ],
    [t],
  );

  const handleDebounce = useDebounce({
    delay: 1000,
    startCallback() {
      setIsTyping(true);
    },
    stopCallback(search) {
      setIsTyping(false);
      handleSearchForTemplates(search);
    },
  });

  const handleClearSearch = () => {
    handleSearchForTemplates('');
    setIsShowingClearButton(false);
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
  };

  const handleChangeSearchText = e => {
    const searchText = e.target.value;
    handleDebounce(searchText);
    setIsShowingClearButton(searchText);
  };

  const handleSelectTemplate = template => {
    const isAlreadySelected = !!selectedTemplates[template.id];

    if (isAlreadySelected) {
      setSelectedTemplates(currentSelectedTemplates => {
        const selectedTemplatesClone = { ...currentSelectedTemplates };
        delete selectedTemplatesClone[template.id];
        return selectedTemplatesClone;
      });
    } else {
      setSelectedTemplates(currentSelectedTemplates => {
        const selectedTemplatesClone = { ...currentSelectedTemplates };
        selectedTemplatesClone[template.id] = template;
        return selectedTemplatesClone;
      });
    }
  };

  const handleSelectAllTemplates = event => {
    if (event.target.checked) {
      const newSelectedTemplates = {};
      templates.forEach(template => {
        newSelectedTemplates[template.id] = template;
      });
      setSelectedTemplates(newSelectedTemplates);
    } else {
      setSelectedTemplates({});
    }
  };

  return (
    <>
      <TableContainer>
        <Table aria-labelledby='tableTitle' size='small'>
          <DataTableHead
            className={classes.tableHead}
            cells={headCells}
            rowCount={templates.length}
            numSelected={numberOfSelectedTemplates}
            onSelectAllClick={handleSelectAllTemplates}
            endExtraCells={
              <TableCell width={480}>
                <TextField
                  inputRef={searchInputRef}
                  className={classes.searchTextField}
                  size='small'
                  variant='outlined'
                  onChange={handleChangeSearchText}
                  placeholder={t('templatesStep.searchTemplatePh')}
                  InputProps={{
                    className: classes.searchInput,
                    startAdornment: (
                      <InputAdornment position='start'>
                        {isTyping ? <CircularProgress size={16} /> : <Search />}
                      </InputAdornment>
                    ),
                    endAdornment: isShowingClearButton ? (
                      <InputAdornment position='end'>
                        <IconButton onClick={handleClearSearch} size='small'>
                          <Close />
                        </IconButton>
                      </InputAdornment>
                    ) : null,
                  }}
                />
              </TableCell>
            }
            disableOrderBy
          />

          <TableBody>
            {templates.map(template => {
              const isSelected = !!selectedTemplates[template.id];

              const handleSelectThisTemplate = () => {
                handleSelectTemplate(template);
              };

              return (
                <TableRow
                  key={template.id}
                  tabIndex={-1}
                  role='checkbox'
                  selected={isSelected}
                  aria-checked={isSelected}
                  onClick={handleSelectThisTemplate}
                  hover
                >
                  <TableCell>
                    <Checkbox
                      color='primary'
                      checked={isSelected}
                      onChange={handleSelectThisTemplate}
                    />
                  </TableCell>

                  <TableCell className={classes.clickableCell}>{template.label}</TableCell>

                  <TableCell className={classes.clickableCell} colSpan='2'>
                    {template.attrsLength}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {templates.length === 0 && (
        <Box className={classes.emptyList}>
          <Typography className={classes.emptyListText}>
            {t('templatesStep.emptyTemplateList')}
          </Typography>
        </Box>
      )}
    </>
  );
};

TemplateTable.propTypes = {
  templates: PropTypes.array.isRequired,
  selectedTemplates: PropTypes.object.isRequired,
  numberOfSelectedTemplates: PropTypes.object.isRequired,
  setSelectedTemplates: PropTypes.func.isRequired,
  handleSearchForTemplates: PropTypes.func.isRequired,
};

export default TemplateTable;
