import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import useStyles from './style';

const Index = ({ title, image, description, handleClick }) => {
  const classes = useStyles();
  return (
    <Grid item classes={{ item: classes.item }}>
      <Card className={classes.rootCard}>
        <CardActionArea
          className={classes.actions}
          onClick={() => handleClick()}
          data-testid='card-action'
        >
          <CardMedia
            className={classes.media}
            image={image}
            title='Contemplative Reptile'
          />
          <CardContent>
            <Typography
              gutterBottom
              variant='h5'
              component='h2'
              data-testid='title'
            >
              {title}
            </Typography>
            <Typography
              variant='body2'
              color='textSecondary'
              component='p'
              data-testid='description'
            >
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

Index.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Index;
