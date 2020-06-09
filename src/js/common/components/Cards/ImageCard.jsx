import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import useStyles from './ImageCard'


const ImageCard = (props) => {
  const classes = useStyles()
  const {
    title, image, description, handleClick,
  } = props
  return (
    <Grid item classes={{ item: classes.item }}>
      <Card className={classes.rootCard}>
        <CardActionArea className={classes.actions} onClick={() => handleClick()}>
          <CardMedia
            className={classes.media}
            image={image}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

export default ImageCard
