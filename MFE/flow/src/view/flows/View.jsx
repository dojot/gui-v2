import React, { useEffect, useState } from 'react';

import { Box } from '@material-ui/core';
import { DeviceHub } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DEVICES_PAGE_KEYS, VIEW_MODE } from 'sharedComponents/Constants';
import { ViewContainer } from 'sharedComponents/Containers';
import { AlertDialog } from 'sharedComponents/Dialogs';
import { EmptyPlaceholder } from 'sharedComponents/EmptyPlaceholder';
import { useIsLoading, usePersistentState } from 'sharedComponents/Hooks';

import { actions as flowsActions, constants } from '../../redux/modules/flows';
import { flowsSelector } from '../../redux/selectors/flowsSelector';
import Cards from './layout/Cards';
import DataTable from './layout/DataTable';
import FlowOptionsMenu from './layout/FlowOptionsMenu';
import FlowsLoading from './layout/FlowsLoading';
import SearchBar from './layout/SearchBar';
import useStyles from './style';

const Flows = () => {
  const { t } = useTranslation('flows');
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const flows = useSelector(flowsSelector);
  const isLoadingFlows = useIsLoading(constants.GET_FLOWS);

  const [viewMode, setViewMode] = usePersistentState({
    defaultValue: VIEW_MODE.TABLE,
    key: DEVICES_PAGE_KEYS.VIEW_MODE,
  });

  const [selectedFlows, setSelectedFlows] = useState([]);
  const [flowOptionsMenu, setFlowOptionsMenu] = useState(null);

  const [isShowingDeleteAlert, setIsShowingDeleteAlert] = useState(false);

  const handleFlowCreation = () => {
    history.push(`/flows/new`);
  };

  const handleClickFlow = flow => {
    dispatch(flowsActions.setFlow(flow));
    history.push(`/flows/edit/${flow.id}`);
  };

  const handleHideOptionsMenu = () => {
    setFlowOptionsMenu(null);
  };

  const handleEditFlow = () => {
    dispatch(flowsActions.setFlow(flowOptionsMenu.flow));
    handleHideOptionsMenu();
    const flowId = flowOptionsMenu.flow.id;
    history.push(`/flows/edit/${flowId}`);
  };

  const handleDeleteFlow = () => {
    setIsShowingDeleteAlert(true);
  };

  const handleConfirmFlowDeletion = () => {
    const flowID = flowOptionsMenu.flow.id;
    dispatch(flowsActions.deleteFlow({ flowID }));
  };

  const handleCloseFlowDeletionAlert = () => {
    setIsShowingDeleteAlert(false);
    handleHideOptionsMenu();
  };

  useEffect(() => {
    dispatch(flowsActions.getFlows());
  }, [dispatch]);

  useEffect(() => {
    if (viewMode) setSelectedFlows([]);
  }, [viewMode]);

  return (
    <ViewContainer headerTitle={t('flows:title')}>
      <FlowOptionsMenu
        isShowingMenu={!!flowOptionsMenu}
        anchorElement={flowOptionsMenu?.anchorElement}
        handleEditFlow={handleEditFlow}
        handleDeleteFlow={handleDeleteFlow}
        handleHideOptionsMenu={handleHideOptionsMenu}
      />

      <AlertDialog
        isOpen={isShowingDeleteAlert}
        title={t('deleteFlowAlert.title')}
        message={t('deleteFlowAlert.message')}
        handleConfirm={handleConfirmFlowDeletion}
        handleClose={handleCloseFlowDeletionAlert}
        cancelButtonText={t('deleteFlowAlert.cancelButton')}
        confirmButtonText={t('deleteFlowAlert.confirmButton')}
      />

      <Box className={classes.container}>
        <SearchBar
          viewMode={viewMode}
          handleChangeViewMode={setViewMode}
          handleCreationClick={handleFlowCreation}
        />
        <Box className={classes.content}>
          {isLoadingFlows ? (
            <FlowsLoading />
          ) : (
            <>
              {viewMode === VIEW_MODE.TABLE && flows.length > 0 && (
                <DataTable
                  flows={flows}
                  handleClickFlow={handleClickFlow}
                  handleSetFlowOptionsMenu={setFlowOptionsMenu}
                />
              )}

              {viewMode === VIEW_MODE.CARD && flows.length > 0 && (
                <Cards
                  flows={flows}
                  handleClickFlow={handleClickFlow}
                  handleSetFlowOptionsMenu={setFlowOptionsMenu}
                />
              )}

              {flows.length === 0 && (
                <EmptyPlaceholder
                  textButton={t('createNewFlow')}
                  emptyListMessage={t('emptyListMessage')}
                  icon={<DeviceHub fontSize='large' />}
                  handleButtonClick={handleFlowCreation}
                />
              )}
            </>
          )}
        </Box>
      </Box>
    </ViewContainer>
  );
};

export default Flows;
