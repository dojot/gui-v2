import React, { useEffect, useState } from 'react';

import { Box } from '@material-ui/core';
import { isNumber } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { AlertDialog } from 'sharedComponents/Dialogs';
import { DATA_ORDER, ROWS_PER_PAGE_OPTIONS } from 'sharedComponents/Constants';
import { useIsLoading, useSearchParamState } from 'sharedComponents/Hooks';
import { EmptyPlaceholder } from 'sharedComponents/EmptyPlaceholder';
import { actions as reportActions, constants } from '../../redux/modules/reports';
import { reportsSelector, paginationControlSelector } from '../../redux/selectors/reportsSelector';
import { ViewContainer } from 'sharedComponents/Containers';
import DataTable from './layout/DataTable';
import DevicesLoading from './layout/DevicesLoading';
import Pagination from './layout/Pagination';
import SearchBar from './layout/SearchBar';
import { useTranslation } from 'react-i18next';
import { Description } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import useStyles from './style';

const MyReports = () => {
  const dispatch = useDispatch();
  const reports = useSelector(reportsSelector);
  const history = useHistory();
  const { totalPages } = useSelector(paginationControlSelector);
  const isLoadingReports = useIsLoading(constants.GET_REPORTS);
  const { t } = useTranslation('myReports');
  const classes = useStyles();

  const [isShowingDeleteAlert, setIsShowingDeleteAlert] = useState({
    isShowing: false,
    reportId: null,
  });

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

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchReport = search => {
    setPage(0);
    setSearchText(search);
  };

  const handleDeleteReport = id => {
    setIsShowingDeleteAlert({ isShowing: true, reportId: id });
  };

  const handleConfirmDeleteReport = () => {
    dispatch(reportActions.deleteReport({ id: isShowingDeleteAlert.reportId }));
  };

  const handleCloseReportDeletionAlert = () => {
    setIsShowingDeleteAlert({ isShowing: false, reportId: null });
  };

  const handleGoToReportCreation = () => {
    history.push('/create-report');
  };

  const handleDownloadFile = file => {
    console.log(file);
    dispatch(
      reportActions.downloadReport({
        path: file.path,
      }),
    );
  };

  useEffect(() => {
    dispatch(
      reportActions.getReports({
        page: page,
        pageSize: rowsPerPage,
      }),
    );
  }, [dispatch]);

  return (
    <>
      <ViewContainer headerTitle={t('title')}>
        <AlertDialog
          isOpen={isShowingDeleteAlert.isShowing}
          title={t('deleteReportAlert.title')}
          message={t('deleteReportAlert.message')}
          handleConfirm={handleConfirmDeleteReport}
          handleClose={handleCloseReportDeletionAlert}
          cancelButtonText={t('deleteReportAlert.cancelButton')}
          confirmButtonText={t('deleteReportAlert.confirmButton')}
        />

        <Box className={classes.container}>
          <SearchBar lastSearchedText={searchText} handleSearchReport={handleSearchReport} />

          <Box className={classes.content}>
            {isLoadingReports ? (
              <DevicesLoading />
            ) : (
              <>
                {reports.length > 0 && (
                  <DataTable
                    order={order}
                    orderBy={orderBy}
                    reports={reports}
                    setOrder={setOrder}
                    setOrderBy={setOrderBy}
                    handleDeleteReport={handleDeleteReport}
                    handleDownloadFile={handleDownloadFile}
                  />
                )}
              </>
            )}

            {reports.length === 0 && (
              <EmptyPlaceholder
                textButton={t('createNewReport')}
                emptyListMessage={t('emptyListMessage')}
                icon={<Description fontSize='large' />}
                handleButtonClick={handleGoToReportCreation}
              />
            )}
          </Box>

          <Pagination
            page={page}
            rowsPerPage={rowsPerPage}
            totalOfPages={totalPages}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>
      </ViewContainer>
    </>
  );
};

export default MyReports;
