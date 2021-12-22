import React from 'react';

import {
  AccordionDetails,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import useStyles from './style';

function GeneratedCertificateResume({ data }) {
  const classes = useStyles();
  const { t } = useTranslation('createCertificate');

  return (
    <AccordionDetails className={classes.createCertificateOneClick}>
      <Typography>{t('generatedCertificateResume.downloadFilesMessage')}</Typography>
      <Table style={{ maxWidth: 400 }}>
        <TableBody>
          <TableCell>
            <TableRow>{t('generatedCertificateResume.certificate')}</TableRow>
            <TableRow>{t('generatedCertificateResume.privateKey')}</TableRow>
            <TableRow>{t('generatedCertificateResume.publicKey')}</TableRow>
            <TableRow>{t('generatedCertificateResume.caCertificate')}</TableRow>
          </TableCell>

          <TableCell>
            <TableRow className={classes.textLink}>{data?.certificate}</TableRow>
            <TableRow className={classes.textLink}>{data?.privateKey}</TableRow>
            <TableRow className={classes.textLink}>{data?.publicKey}</TableRow>
            <TableRow className={classes.textLink}>{data?.caCertificate}</TableRow>
          </TableCell>
        </TableBody>
      </Table>
    </AccordionDetails>
  );
}

export default GeneratedCertificateResume;
