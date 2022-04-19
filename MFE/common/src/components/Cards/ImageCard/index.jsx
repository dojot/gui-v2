import React from 'react';

import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import useStyles from './style';

const ImageCard = ({ title, image, description, handleClick }) => {
  const classes = useStyles();
  return (
    <Grid item classes={{ item: classes.item }}>
      <Card className={classes.rootCard}>
        <CardActionArea
          className={classes.actions}
          onClick={() => handleClick()}
          data-testid='card-action'
        >
          <CardMedia className={classes.media} image={image} />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2' data-testid='title'>
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

ImageCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ImageCard;
