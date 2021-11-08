import React from 'react';

import { CircularProgress, Box, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { TemplatesTable as SelectableTemplatesTable } from '../../../../common/components/TemplatesTable';
import { useTemplatesTableStyles } from './style';

const TemplateTables = ({
  page,
  templates,
  totalPages,
  rowsPerPage,
  selectedTemplates,
  isLoadingTemplates,
  numberOfSelectedTemplates,
  handleChangePage,
  setSelectedTemplates,
  handleChangeRowsPerPage,
  handleSearchForTemplates,
}) => {
  const { t } = useTranslation('createDevice');
  const classes = useTemplatesTableStyles();

  if (isLoadingTemplates) {
    return (
      <Box className={classes.loadingContainer} padding={2}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  return (
    <>
      <SelectableTemplatesTable
        page={page}
        templates={templates}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        selectedTemplates={selectedTemplates}
        numberOfSelectedTemplates={numberOfSelectedTemplates}
        handleChangePage={handleChangePage}
        setSelectedTemplates={setSelectedTemplates}
        handleSearchForTemplates={handleSearchForTemplates}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />

      {templates.length === 0 && (
        <Box className={classes.emptyList}>
          <Typography className={classes.emptyListText}>
            {t('templatesStep.emptyTemplateList')}
          </Typography>
        </Box>
      )}
    </>
  );
};

TemplateTables.propTypes = {
  page: PropTypes.number.isRequired,
  templates: PropTypes.array.isRequired,
  totalPages: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  selectedTemplates: PropTypes.object.isRequired,
  isLoadingTemplates: PropTypes.bool.isRequired,
  numberOfSelectedTemplates: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  setSelectedTemplates: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  handleSearchForTemplates: PropTypes.func.isRequired,
};

export default TemplateTables;
