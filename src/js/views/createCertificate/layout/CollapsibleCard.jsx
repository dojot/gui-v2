import React from 'react';

import { Accordion, AccordionSummary, Typography, Box } from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';

import { CONSTANTS } from '../constants';
import CreateCertificateCA from './CreateCertificateCA';
import CreateCertificateCSR from './CreateCertificateCSR';
import CreateCertificateOneClick from './CreateCertificateOneClick';
import useStyles from './style';

function CollapsibleCard({ expanded, handleChange, creationMethod, title, subTitle }) {
  const classes = useStyles();
  return (
    <Accordion
      className={classes.collapsibleCard}
      expanded={expanded === creationMethod}
      name='panel1'
      onChange={() => handleChange(creationMethod)}
    >
      <AccordionSummary
        expandIcon={<ChevronRight />}
        aria-controls='panel1bh-content'
        id='panel1bh-header'
      >
        <Box>
          <Typography className={classes.title}>{title}</Typography>
          <Typography className={classes.subTitle}>{subTitle}</Typography>
        </Box>
      </AccordionSummary>

      {creationMethod === CONSTANTS.ONE_CLICK_CREATE && <CreateCertificateOneClick />}

      {creationMethod === CONSTANTS.CSR && <CreateCertificateCSR />}

      {creationMethod === CONSTANTS.CA && <CreateCertificateCA />}
    </Accordion>
  );
}

export default CollapsibleCard;
