import React, { useEffect, useState } from 'react';

import { Box } from '@material-ui/core';
import { FilterNone } from '@material-ui/icons';
import { isNumber } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { AlertDialog, WarningDialog } from 'sharedComponents/Dialogs';
import { EmptyPlaceholder } from 'sharedComponents/EmptyPlaceholder';
import {
  DATA_ORDER,
  ROWS_PER_PAGE_OPTIONS,
  TEMPLATES_PAGE_KEYS,
  VIEW_MODE,
} from 'sharedComponents/Constants';
import { useIsLoading, usePersistentState, useSearchParamState } from 'sharedComponents/Hooks';
import {
  actions as templateActions,
  constants as templateConstants,
} from '../../redux/modules/templates';
import {
  templatesSelector,
  paginationControlSelector,
} from '../../redux/selectors/templatesSelector';
import { ViewContainer } from 'sharedComponents/Containers';
import Cards from './layout/Cards';
import DataTable from './layout/DataTable';
import Loading from './layout/Loading';
import MassActions from './layout/MassActions';
import OptionsMenu from './layout/OptionsMenu';
import Pagination from './layout/Pagination';
import SearchBar from './layout/SearchBar';
import useStyles from './style';
import DeleteMultipleTemplatesConfirmation from './layout/DeleteMultipleTemplatesConfirmation';

const Templates = () => {
  const { t } = useTranslation('templates');
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const templates = useSelector(templatesSelector);
  const { totalPages } = useSelector(paginationControlSelector);

  const isLoadingTemplates = useIsLoading(templateConstants.GET_TEMPLATES);

  const [page, setPage] = useSearchParamState({
    key: 'p',
    type: 'number',
    defaultValue: 0,
    valueFormatter(value, defaultValue) {
      const zeroBasedTotalPages = totalPages - 1;
      if (isNumber(value) && value >= 0 && value <= zeroBasedTotalPages) return value;
      return defaultValue;
    },
  });

  const [order, setOrder] = useSearchParamState({
    key: 'or',
    type: 'string',
    defaultValue: DATA_ORDER.ASC,
    valueFormatter(value, defaultValue) {
      if (Object.values(DATA_ORDER).includes(value)) return value;
      return defaultValue;
    },
  });

  const [rowsPerPage, setRowsPerPage] = useSearchParamState({
    key: 'r',
    type: 'number',
    defaultValue: ROWS_PER_PAGE_OPTIONS[0],
    valueFormatter(value, defaultValue) {
      if (isNumber(value) && ROWS_PER_PAGE_OPTIONS.includes(value)) return value;
      return defaultValue;
    },
  });

  const [orderBy, setOrderBy] = useSearchParamState({
    key: 'ob',
    type: 'string',
    defaultValue: '',
  });

  const [searchText, setSearchText] = useSearchParamState({
    key: 's',
    type: 'string',
    defaultValue: '',
  });

  const [viewMode, setViewMode] = usePersistentState({
    defaultValue: VIEW_MODE.TABLE,
    key: TEMPLATES_PAGE_KEYS.VIEW_MODE,
  });

  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [templateOptionsMenu, setTemplateOptionsMenu] = useState(null);

  const [isShowingDeleteAlert, setIsShowingDeleteAlert] = useState(false);
  const [isShowingMultipleDeleteAlert, setIsShowingMultipleDeleteAlert] = useState(false);
  const [multipleTemplatesDeletion, setMultiplTemplatesDeletion] = useState({
    showing: false,
    templates: [],
  });

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickTemplate = template => {
    history.push(`/templates/${template.id}`);
  };

  const handleHideMassActions = () => {
    setSelectedTemplates([]);
  };

  const handleDeleteMultipleTemplates = () => {
    setIsShowingMultipleDeleteAlert(true);
  };

  const handleShowMultipleTemplatesDeletionError = templates => {
    setMultiplTemplatesDeletion({ showing: true, templates: templates });
  };

  const handleCloseMultipleTemplatesDeletionError = () => {
    setMultiplTemplatesDeletion({ showing: false, templates: [] });
  };

  const handleConfirmMultipleTemplatesDeletion = () => {
    const templateIdsToDelete = selectedTemplates.map(({ id }) => id);
    dispatch(
      templateActions.deleteMultipleTemplates({
        templateIds: templateIdsToDelete,
        failCallback: handleShowMultipleTemplatesDeletionError,
      }),
    );
    handleHideMassActions();
  };

  const handleCloseMultipleTemplateDeletionAlert = () => {
    setIsShowingMultipleDeleteAlert(false);
  };

  const handleHideOptionsMenu = () => {
    setTemplateOptionsMenu(null);
  };

  const handleEditTemplate = () => {
    const templateId = templateOptionsMenu.template.id;
    history.push(`/templates/edit/${templateId}`);
  };

  const handleDeleteTemplate = () => {
    setIsShowingDeleteAlert(true);
  };

  const handleDuplicateTemplate = () => {
    const templateId = templateOptionsMenu.template.id;
    dispatch(templateActions.duplicateTemplate({ templateId }));
    handleHideOptionsMenu();
  };

  const handleConfirmTemplateDeletion = () => {
    const templateId = templateOptionsMenu.template.id;
    dispatch(templateActions.deleteTemplate({ templateId }));
    setSelectedTemplates(currentSelectedTemplates => {
      return currentSelectedTemplates.filter(id => id !== templateId);
    });
  };

  const handleCloseTemplateDeletionAlert = () => {
    setIsShowingDeleteAlert(false);
    handleHideOptionsMenu();
  };

  const handleSearchTemplate = search => {
    setPage(0);
    setSearchText(search);
  };

  useEffect(() => {
    dispatch(
      templateActions.getTemplates({
        page: {
          number: page + 1,
          size: rowsPerPage,
        },
        filter: {
          label: searchText,
        },
      }),
    );
  }, [dispatch, page, rowsPerPage, searchText]);

  useEffect(() => {
    if (viewMode) setSelectedTemplates([]);
  }, [viewMode]);

  return (
    <ViewContainer headerTitle={t('title')}>
      <OptionsMenu
        isShowingMenu={!!templateOptionsMenu}
        anchorElement={templateOptionsMenu?.anchorElement}
        handleEditTemplate={handleEditTemplate}
        handleDeleteTemplate={handleDeleteTemplate}
        handleHideOptionsMenu={handleHideOptionsMenu}
        handleDuplicateTemplate={handleDuplicateTemplate}
      />

      <AlertDialog
        isOpen={isShowingDeleteAlert}
        title={t('deleteTemplateAlert.title')}
        message={t('deleteTemplateAlert.message')}
        handleConfirm={handleConfirmTemplateDeletion}
        handleClose={handleCloseTemplateDeletionAlert}
        cancelButtonText={t('deleteTemplateAlert.cancelButton')}
        confirmButtonText={t('deleteTemplateAlert.confirmButton')}
      />

      <DeleteMultipleTemplatesConfirmation
        isOpen={isShowingMultipleDeleteAlert}
        title={t('deleteMultipleTemplateAlert.title', { count: selectedTemplates.length })}
        handleConfirm={handleConfirmMultipleTemplatesDeletion}
        handleClose={handleCloseMultipleTemplateDeletionAlert}
        cancelButtonText={t('deleteMultipleTemplateAlert.cancelButton')}
        confirmButtonText={t('deleteMultipleTemplateAlert.confirmButton')}
        selectedTemplates={selectedTemplates}
      />

      <WarningDialog
        isOpen={multipleTemplatesDeletion.showing}
        // isOpen={true}
        templates={multipleTemplatesDeletion.templates}
        message={t('multipleTemplatesDeletionError.message')}
        handleClose={handleCloseMultipleTemplatesDeletionError}
        cancelButtonText={t('multipleTemplatesDeletionError.cancelButtonText')}
      />

      <Box className={classes.container}>
        <SearchBar
          viewMode={viewMode}
          lastSearchedText={searchText}
          handleChangeViewMode={setViewMode}
          handleSearchTemplate={handleSearchTemplate}
        />

        {selectedTemplates.length > 0 && (
          <MassActions
            handleHideMassActions={handleHideMassActions}
            handleDeleteMultipleTemplates={handleDeleteMultipleTemplates}
          />
        )}

        <Box className={classes.content}>
          {isLoadingTemplates ? (
            <Loading />
          ) : (
            <>
              {viewMode === VIEW_MODE.TABLE && templates.length > 0 && (
                <DataTable
                  order={order}
                  orderBy={orderBy}
                  templates={templates}
                  selectedTemplates={selectedTemplates}
                  setOrder={setOrder}
                  setOrderBy={setOrderBy}
                  handleClickTemplate={handleClickTemplate}
                  handleSelectTemplate={setSelectedTemplates}
                  handleSetTemplateOptionsMenu={setTemplateOptionsMenu}
                />
              )}

              {viewMode === VIEW_MODE.CARD && templates.length > 0 && (
                <Cards
                  templates={templates}
                  handleClickTemplate={handleClickTemplate}
                  handleSetTemplateOptionsMenu={setTemplateOptionsMenu}
                />
              )}

              {templates.length === 0 && (
                <EmptyPlaceholder
                  emptyListMessage={t('emptyListMessage')}
                  icon={<FilterNone fontSize='large' />}
                  handleButtonClick={() => history.push('/templates/new')}
                  textButton={t('createNewTemplate')}
                />
              )}
            </>
          )}
        </Box>

        <Pagination
          page={page}
          rowsPerPage={rowsPerPage}
          totalOfPages={totalPages}
          numberOfSelectedTemplates={selectedTemplates.length}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </ViewContainer>
  );
};

export default Templates;
