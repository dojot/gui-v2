import React, { useEffect, useMemo, useState } from 'react';

import { Box } from '@material-ui/core';
import { LocalOffer } from '@material-ui/icons';
import { isNumber } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { AlertDialog } from '../../common/components/Dialogs';
import { EmptyPlaceholder } from '../../common/components/EmptyPlaceholder';
import {
  DATA_ORDER,
  ROWS_PER_PAGE_OPTIONS,
  TEMPLATE_ATTRIBUTES_PAGE_KEYS,
  VIEW_MODE,
} from '../../common/constants';
import { useIsLoading, usePersistentState, useSearchParamState } from '../../common/hooks';
import { actions as attrActions } from '../../redux/modules/templateAttrs';
import {
  actions as templateActions,
  constants as templateConstants,
} from '../../redux/modules/templates';
import { templateDataSelector } from '../../redux/selectors/templatesSelector';
import { ViewContainer } from '../stateComponents';
import AttrManagementModal from './layout/AttrManagementModal';
import Cards from './layout/Cards';
import DataTable from './layout/DataTable';
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

  const templateData = useSelector(templateDataSelector);
  const isLoadingAttrs = useIsLoading(templateConstants.GET_TEMPLATE_BY_ID);

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
    key: TEMPLATE_ATTRIBUTES_PAGE_KEYS.VIEW_MODE,
  });

  const attrs = useMemo(() => {
    if (!templateData?.attrs) return [];
    if (searchText) {
      return templateData.attrs.filter(attr => attr.label.includes(searchText));
    }
    return templateData.attrs;
  }, [searchText, templateData?.attrs]);

  const totalPages = useMemo(() => {
    return Math.ceil(attrs.length / rowsPerPage);
  }, [attrs.length, rowsPerPage]);

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

  const [selectedAttrs, setSelectedAttrs] = useState([]);
  const [attrOptionsMenu, setAttrOptionsMenu] = useState(null);
  const [isShowingDeleteAlert, setIsShowingDeleteAlert] = useState(false);
  const [isShowingMultipleDeleteAlert, setIsShowingMultipleDeleteAlert] = useState(false);
  const [isShowingAttrManagementModal, setIsShowingAttrManagementModal] = useState(false);

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
    handleHideMassActions();
    dispatch(
      attrActions.deleteMultipleAttrs({
        templateId,
        attrIds: selectedAttrs,
        successCallback() {
          dispatch(templateActions.getTemplateById({ templateId }));
        },
      }),
    );
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
    dispatch(
      attrActions.deleteAttr({
        attrId,
        templateId,
        successCallback() {
          dispatch(templateActions.getTemplateById({ templateId }));
          setSelectedAttrs(currentSelectedAttrs => {
            return currentSelectedAttrs.filter(id => id !== attrId);
          });
        },
      }),
    );
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
    if (attrOptionsMenu?.attr) {
      dispatch(
        attrActions.editAttr({
          templateId,
          attr: newAttrData,
          attrId: attrOptionsMenu.attr.id,
          successCallback() {
            handleHideAttrManagementModal();
            dispatch(templateActions.getTemplateById({ templateId }));
          },
        }),
      );
    } else {
      dispatch(
        attrActions.createAttr({
          templateId,
          attr: newAttrData,
          successCallback() {
            handleHideAttrManagementModal();
            dispatch(templateActions.getTemplateById({ templateId }));
          },
        }),
      );
    }
  };

  const handleSearchAttr = search => {
    setSearchText(search);
  };

  useEffect(() => {
    dispatch(templateActions.getTemplateById({ templateId }));
    return () => dispatch(templateActions.updateTemplates({ templateData: null }));
  }, [dispatch, templateId]);

  useEffect(() => {
    if (viewMode) setSelectedAttrs([]);
  }, [viewMode]);

  return (
    <ViewContainer headerTitle={t('title', { template: templateData?.label || templateId })}>
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
          lastSearchedText={searchText}
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
                  order={order}
                  orderBy={orderBy}
                  rowsPerPage={rowsPerPage}
                  selectedAttrs={selectedAttrs}
                  setOrder={setOrder}
                  setOrderBy={setOrderBy}
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

              {attrs.length === 0 && (
                <EmptyPlaceholder
                  textButton={t('createNewAttr')}
                  icon={<LocalOffer fontSize='large' />}
                  emptyListMessage={t('emptyListMessage')}
                  handleButtonClick={handleShowAttrManagementModal}
                />
              )}
            </>
          )}
        </Box>

        <Pagination
          page={page}
          totalOfPages={totalPages}
          rowsPerPage={rowsPerPage}
          numberOfSelectedAttrs={selectedAttrs.length}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </ViewContainer>
  );
};

export default TemplateAttrs;
