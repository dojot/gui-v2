import React, { useEffect, useState } from 'react';

import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { AlertDialog } from '../../common/components/Dialogs';
import { TEMPLATE_ATTRIBUTES_PAGE_KEYS, VIEW_MODE } from '../../common/constants';
import { useIsLoading, usePersistentState } from '../../common/hooks';
import {
  actions as attrActions,
  constants as attrConstants,
} from '../../redux/modules/templateAttrs';
import {
  attrsSelector,
  paginationControlSelector,
} from '../../redux/selectors/templateAttrsSelector';
import { ViewContainer } from '../stateComponents';
import AttrManagementModal from './layout/AttrManagementModal';
import Cards from './layout/Cards';
import DataTable from './layout/DataTable';
import EmptyList from './layout/EmptyList';
import Loading from './layout/Loading';
import MassActions from './layout/MassActions';
import OptionsMenu from './layout/OptionsMenu';
import Pagination from './layout/Pagination';
import SearchBar from './layout/SearchBar';
import useStyles from './style';

const TemplateAttrs = () => {
  const { t } = useTranslation('templateAttrs');
  const { templateId } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();

  const template = useSelector(() => ({})); // TODO: Create and use a selector
  const attrs = useSelector(attrsSelector);
  const { totalPages } = useSelector(paginationControlSelector);

  const isLoadingAttrs = useIsLoading(attrConstants.GET_ATTRS);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [viewMode, setViewMode] = usePersistentState({
    defaultValue: VIEW_MODE.TABLE,
    key: TEMPLATE_ATTRIBUTES_PAGE_KEYS.VIEW_MODE,
  });

  const [selectedAttrs, setSelectedAttrs] = useState([]);
  const [attrOptionsMenu, setAttrOptionsMenu] = useState(null);

  const [isShowingAttrManagementModal, setIsShowingAttrManagementModal] = useState(false);

  const [isShowingDeleteAlert, setIsShowingDeleteAlert] = useState(false);
  const [isShowingMultipleDeleteAlert, setIsShowingMultipleDeleteAlert] = useState(false);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleHideMassActions = () => {
    setSelectedAttrs([]);
  };

  const handleDeleteMultipleAttrs = () => {
    setIsShowingMultipleDeleteAlert(true);
  };

  const handleConfirmMultipleAttrsDeletion = () => {
    dispatch(attrActions.deleteMultipleAttrs({ templateId, attrIdArray: selectedAttrs }));
    handleHideMassActions();
  };

  const handleCloseMultipleAttrDeletionAlert = () => {
    setIsShowingMultipleDeleteAlert(false);
  };

  const handleHideOptionsMenu = () => {
    setAttrOptionsMenu(null);
  };

  const handleEditAttr = () => {
    setIsShowingAttrManagementModal(true);
  };

  const handleDeleteAttr = () => {
    setIsShowingDeleteAlert(true);
  };

  const handleConfirmAttrDeletion = () => {
    const attrId = attrOptionsMenu.attr.id;
    dispatch(attrActions.deleteAttr({ templateId, attrId }));
    setSelectedAttrs(currentSelectedAttrs => {
      return currentSelectedAttrs.filter(id => id !== attrId);
    });
  };

  const handleCloseAttrDeletionAlert = () => {
    setIsShowingDeleteAlert(false);
    handleHideOptionsMenu();
  };

  const handleShowAttrManagementModal = () => {
    setIsShowingAttrManagementModal(true);
  };

  const handleHideAttrManagementModal = () => {
    setIsShowingAttrManagementModal(false);
    handleHideOptionsMenu();
  };

  const handleSaveAttr = newAttrData => {
    handleHideAttrManagementModal();
    const isEditingAttr = !!attrOptionsMenu?.attr;
    if (isEditingAttr) {
      dispatch(attrActions.editAttr({ templateId, attr: newAttrData }));
    } else {
      dispatch(attrActions.createAttr({ templateId, attr: newAttrData }));
    }
  };

  const handleSearchAttr = search => {
    dispatch(attrActions.getAttrs({ templateId, filter: { label: search } }));
  };

  useEffect(() => {
    dispatch(
      attrActions.getAttrs({
        templateId,
        page: {
          number: page,
          size: rowsPerPage,
        },
      }),
    );
  }, [dispatch, page, rowsPerPage, templateId]);

  useEffect(() => {
    if (viewMode) setSelectedAttrs([]);
  }, [viewMode]);

  // TODO: Create an useEffect to fetch the template data (or only the label)

  return (
    <ViewContainer headerTitle={t('title', { template: template.label || templateId })}>
      <OptionsMenu
        isShowingMenu={!!attrOptionsMenu}
        anchorElement={attrOptionsMenu?.anchorElement}
        handleEditAttr={handleEditAttr}
        handleDeleteAttr={handleDeleteAttr}
        handleHideOptionsMenu={handleHideOptionsMenu}
      />

      <AlertDialog
        isOpen={isShowingDeleteAlert}
        title={t('deleteAttrAlert.title')}
        message={t('deleteAttrAlert.message')}
        handleConfirm={handleConfirmAttrDeletion}
        handleClose={handleCloseAttrDeletionAlert}
        cancelButtonText={t('deleteAttrAlert.cancelButton')}
        confirmButtonText={t('deleteAttrAlert.confirmButton')}
      />

      <AlertDialog
        isOpen={isShowingMultipleDeleteAlert}
        title={t('deleteMultipleAttrAlert.title')}
        message={t('deleteMultipleAttrAlert.message')}
        handleConfirm={handleConfirmMultipleAttrsDeletion}
        handleClose={handleCloseMultipleAttrDeletionAlert}
        cancelButtonText={t('deleteMultipleAttrAlert.cancelButton')}
        confirmButtonText={t('deleteMultipleAttrAlert.confirmButton')}
      />

      <AttrManagementModal
        attrToEdit={attrOptionsMenu?.attr}
        isOpen={isShowingAttrManagementModal}
        handleSaveAttr={handleSaveAttr}
        handleHideModal={handleHideAttrManagementModal}
      />

      <Box className={classes.container}>
        <SearchBar
          viewMode={viewMode}
          handleChangeViewMode={setViewMode}
          handleSearchAttr={handleSearchAttr}
          handleCreateAttr={handleShowAttrManagementModal}
        />

        {selectedAttrs.length > 0 && (
          <MassActions
            handleHideMassActions={handleHideMassActions}
            handleDeleteMultipleAttrs={handleDeleteMultipleAttrs}
          />
        )}

        <Box className={classes.content}>
          {isLoadingAttrs ? (
            <Loading />
          ) : (
            <>
              {viewMode === VIEW_MODE.TABLE && attrs.length > 0 && (
                <DataTable
                  page={page}
                  attrs={attrs}
                  rowsPerPage={rowsPerPage}
                  selectedAttrs={selectedAttrs}
                  handleSelectAttr={setSelectedAttrs}
                  handleSetAttrOptionsMenu={setAttrOptionsMenu}
                />
              )}

              {viewMode === VIEW_MODE.CARD && attrs.length > 0 && (
                <Cards
                  page={page}
                  attrs={attrs}
                  rowsPerPage={rowsPerPage}
                  handleSetAttrOptionsMenu={setAttrOptionsMenu}
                />
              )}

              {attrs.length === 0 && <EmptyList handleCreateAttr={handleShowAttrManagementModal} />}
            </>
          )}
        </Box>

        <Pagination
          page={page}
          rowsPerPage={rowsPerPage}
          totalOfAttrs={totalPages}
          numberOfSelectedAttrs={selectedAttrs.length}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </ViewContainer>
  );
};

export default TemplateAttrs;
