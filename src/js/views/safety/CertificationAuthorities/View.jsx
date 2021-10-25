import React, { useState } from 'react';

import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { ViewContainer } from '../../stateComponents';
import CreateCertificationAuthority from './layout/CreateCertificationAuthority';
import DataTable from './layout/DataTable';
import DevicesLoading from './layout/DevicesLoading';
import EmptyCAList from './layout/EmptyCAList';
import Pagination from './layout/Pagination';
import SearchBar from './layout/SearchBar';
import useStyles from './style';

const Safety = props => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [certificationAuthorities, setCertificationAuthotiries] = useState([]);
  const [selectedAuthorities, setSelectedAuthorities] = useState([]);

  const { t } = useTranslation('certificationAuthorities');

  const toggleShowRegistration = () => {
    setShowRegistration(!showRegistration);
  };

  return (
    <ViewContainer headerTitle={t('headerTitle')}>
      <Box className={classes.container}>
        {!showRegistration ? (
          <>
            <SearchBar toggleShowRegistration={toggleShowRegistration} />
            <Box className={classes.content}>
              {isLoading && <DevicesLoading />}

              {certificationAuthorities.length > 0 && (
                <DataTable
                  page={page}
                  certificationAuthorities={certificationAuthorities}
                  rowsPerPage={rowsPerPage}
                  selectedCertificationAuthorities={selectedAuthorities}
                  handleSelectAuthority={setSelectedAuthorities}
                  handleUpdateAuthorityList={setCertificationAuthotiries}
                />
              )}

              {certificationAuthorities.length === 0 && !isLoading && (
                <EmptyCAList toggleShowRegistration={toggleShowRegistration} />
              )}
            </Box>
            <Pagination
              page={page}
              rowsPerPage={rowsPerPage}
              totalOfDevices={certificationAuthorities.length}
              numberOfSelectedDevices={selectedAuthorities.length}
            />
          </>
        ) : (
          <CreateCertificationAuthority toggleShowRegistration={toggleShowRegistration} />
        )}
      </Box>
    </ViewContainer>
  );
};

export default Safety;
