import React, { useEffect, useState } from 'react';

import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { AlertDialog } from '../../common/components/Dialogs';
import { TEMPLATES_PAGE_KEYS, VIEW_MODE } from '../../common/constants';
import { usePersistentState } from '../../common/hooks';
import { actions as templateActions } from '../../redux/modules/templates';
import { ViewContainer } from '../stateComponents';
import Cards from './layout/Cards';
import DataTable from './layout/DataTable';
import EmptyList from './layout/EmptyList';
import Loading from './layout/Loading';
import MassActions from './layout/MassActions';
import OptionsMenu from './layout/OptionsMenu';
import Pagination from './layout/Pagination';
import SearchBar from './layout/SearchBar';
import useStyles from './style';

const Templates = () => {
  const { t } = useTranslation('templates');
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const templates = useSelector(() => []);
  const isLoadingTemplates = useSelector(() => false);
  const { totalPages } = useSelector(() => ({ totalPages: 0 }));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [viewMode, setViewMode] = usePersistentState({
    defaultValue: VIEW_MODE.TABLE,
    key: TEMPLATES_PAGE_KEYS.VIEW_MODE,
  });

  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [templateOptionsMenu, setTemplateOptionsMenu] = useState(null);

  const [isShowingDeleteAlert, setIsShowingDeleteAlert] = useState(false);
  const [isShowingMultipleDeleteAlert, setIsShowingMultipleDeleteAlert] = useState(false);

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

  const handleConfirmMultipleTemplatesDeletion = () => {
    dispatch(templateActions.deleteMultipleTemplates({ templateIdArray: selectedTemplates }));
    handleHideMassActions();
  };

  const handleCloseMultipleTemplateDeletionAlert = () => {
    setIsShowingMultipleDeleteAlert(false);
  };

  const handleHideOptionsMenu = () => {
    setTemplateOptionsMenu(null);
  };

  const handleEditTemplate = () => {
    handleHideOptionsMenu();
    const templateId = templateOptionsMenu.template.id;
    history.push(`/templates/edit/${templateId}`);
  };

  const handleDeleteTemplate = () => {
    setIsShowingDeleteAlert(true);
  };

  const handleDuplicateTemplate = () => {
    const templateId = templateOptionsMenu.template.id;
    dispatch(templateActions.duplicateTemplate({ templateId }));
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
    dispatch(templateActions.getTemplates({ filter: { label: search } }));
  };

  useEffect(() => {
    dispatch(
      templateActions.getTemplates({
        page: {
          number: page,
          size: rowsPerPage,
        },
      }),
    );
  }, [dispatch, page, rowsPerPage]);

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

      <AlertDialog
        isOpen={isShowingMultipleDeleteAlert}
        title={t('deleteMultipleTemplateAlert.title')}
        message={t('deleteMultipleTemplateAlert.message')}
        handleConfirm={handleConfirmMultipleTemplatesDeletion}
        handleClose={handleCloseMultipleTemplateDeletionAlert}
        cancelButtonText={t('deleteMultipleTemplateAlert.cancelButton')}
        confirmButtonText={t('deleteMultipleTemplateAlert.confirmButton')}
      />

      <Box className={classes.container}>
        <SearchBar
          viewMode={viewMode}
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
                  page={page}
                  templates={templates}
                  rowsPerPage={rowsPerPage}
                  selectedTemplates={selectedTemplates}
                  handleClickTemplate={handleClickTemplate}
                  handleSelectTemplate={setSelectedTemplates}
                  handleSetTemplateOptionsMenu={setTemplateOptionsMenu}
                />
              )}

              {viewMode === VIEW_MODE.CARD && templates.length > 0 && (
                <Cards
                  page={page}
                  templates={templates}
                  rowsPerPage={rowsPerPage}
                  handleClickTemplate={handleClickTemplate}
                  handleSetTemplateOptionsMenu={setTemplateOptionsMenu}
                />
              )}

              {templates.length === 0 && <EmptyList />}
            </>
          )}
        </Box>

        <Pagination
          page={page}
          rowsPerPage={rowsPerPage}
          totalOfTemplates={totalPages}
          numberOfSelectedTemplates={selectedTemplates.length}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </ViewContainer>
  );
};

export default Templates;
