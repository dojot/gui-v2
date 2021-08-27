import React, { Fragment, useCallback, useEffect, useState } from 'react';

import { Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { FormCheckBox } from 'Components/Checkbox';
import { CircularIndeterminate } from 'Components/Loading';
import { Paginator, usePaginator } from 'Components/Paginator';
import { Field } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { Template as TemplateService } from 'Services/index';

import { useStyles } from './style';

const Templates = ({ validate, ...otherProps }) => {
  const {
    paginatorData,
    setPaginatorData,
    setCurrentPage,
    setPageSize,
    setDisablePaginator,
  } = usePaginator();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setDisablePaginator(true);
    setIsLoading(true);
    TemplateService.getTemplatesList({
      number: paginatorData.currentPage,
      size: paginatorData.pageSize,
    })
      .then(response => {
        const { templates, currentPage, totalPages } = response.getTemplates;
        setPaginatorData({
          data: templates,
          currentPage,
          totalPages,
        });
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error); // TODO tratamento de erro da api
        setDisablePaginator(false);
        setIsLoading(false);
      });
  }, [setDisablePaginator, setPaginatorData, paginatorData.currentPage, paginatorData.pageSize]);

  useEffect(() => {
    setCurrentPage(1);
  }, [setCurrentPage]);

  const classes = useStyles();

  const { t } = useTranslation(['dashboard']);

  const renderItem = useCallback((label, id) => {
    return (
      <>
        <span className='listTitle'>{label}</span>
        <span className='listId'>{`( ${id} )`}</span>
      </>
    );
  }, []);

  if (isLoading) return <CircularIndeterminate />;

  return (
    <Grid container justify='center'>
      <List className={classes.root}>
        {!paginatorData.pageData.length ? (
          <ListItem className={classes.notFound}>
            <ListItemText primary={t('devices.notFound')} />
          </ListItem>
        ) : (
          paginatorData.pageData.map(value => {
            const { id, label } = value;
            const labelId = `checkbox-list-label-${id}`;

            return (
              <Fragment key={value.id}>
                <ListItem role={undefined}>
                  <ListItemIcon>
                    <Field
                      type='checkbox'
                      name={`${otherProps.name}.chk-${id}`}
                      component={FormCheckBox}
                      format={item => (item ? item.id === id : false)}
                      parse={item => (item ? value : undefined)}
                      callback={() =>
                        otherProps.form.mutators.clearAttributesByDevice(id, 'attributes')
                      }
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={renderItem(label, id)} />
                </ListItem>
                <Divider />
              </Fragment>
            );
          })
        )}
      </List>
      {paginatorData.pageData.length > 0 && (
        <Grid item className={classes.paginationContainer}>
          <Paginator
            totalPages={paginatorData.totalPages}
            currentPage={paginatorData.currentPage}
            pageSize={paginatorData.pageSize}
            onPageChange={(event, page) => setCurrentPage(page)}
            onPageSizeChange={pageSize => setPageSize(pageSize)}
            showFirstButton
            showLastButton
            disabled={paginatorData.disabled}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Templates;
