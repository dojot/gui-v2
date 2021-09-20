import React from 'react';

import { useTranslation } from 'react-i18next';

import { ViewContainer } from '../stateComponents';
import DataTable from './DataTable';
import SearchBar from './SearchBar';

const Devices = () => {
  const { t } = useTranslation('devices');

  return (
    <ViewContainer headerTitle={t('devices:title')}>
      <SearchBar />
      <DataTable />
    </ViewContainer>
  );
};

export default Devices;
