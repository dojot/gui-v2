import React, { useState } from 'react';

import { Box } from '@material-ui/core';

import { ViewContainer } from '../stateComponents';
import AssociateDevicesModal from './layout/AssociateDevicesModal';
import CertificateOptionsMenu from './layout/CertificateOptionsMenu';
import DataTable from './layout/DataTable';
import Pagination from './layout/Pagination';
import SearchBar from './layout/SearchBar';
import useStyles from './style';

const Certificates = () => {
  const classes = useStyles();

  const [certificatesOptionsMenu, setCertificatesOptionsMenu] = useState(null);
  const [isShowingDetails, setIsShowingDetails] = useState(false);
  const [clickedCertificate, setClickedCertificate] = useState(null);

  const handleHideOptionsMenu = () => {
    setCertificatesOptionsMenu(null);
  };

  const handleHideDetailsModal = () => {
    setIsShowingDetails(false);
  };

  const handleShowDevicesToAssociate = certificate => {
    setClickedCertificate(certificate);
    setIsShowingDetails(true);
  };

  return (
    <ViewContainer headerTitle='Certificados'>
      <AssociateDevicesModal
        isOpen={isShowingDetails}
        deviceDetails={clickedCertificate || {}}
        handleHideDetailsModal={handleHideDetailsModal}
      />

      <CertificateOptionsMenu
        isShowingMenu={!!certificatesOptionsMenu}
        anchorElement={certificatesOptionsMenu?.anchorElement}
        certificate={certificatesOptionsMenu?.certificate}
        handleHideOptionsMenu={handleHideOptionsMenu}
        handleShowDevicesToAssociate={handleShowDevicesToAssociate}
      />
      <Box className={classes.container}>
        <Box className={classes.content}>
          <SearchBar />
          <DataTable
            rowsPerPage={10}
            selectedCertificates={[]}
            page={0}
            certificates={[]}
            handleSetCertificateOptionsMenu={setCertificatesOptionsMenu}
            handleShowDevicesToAssociate={handleShowDevicesToAssociate}
          />
        </Box>
        <Pagination />
      </Box>
    </ViewContainer>
  );
};

export default Certificates;
