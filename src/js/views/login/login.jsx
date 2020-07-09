import React from 'react';
 
import { makeStyles,} from '@material-ui/core/styles';
import { Grid, TextField, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
 
 
 
const useStyles = makeStyles((theme) => ({
    margin: {
        marginTop:16,
        marginBottom:8,
      },
 
    grid:{
      width: '250px',
      margin: '50px', 
      padding: 16,
       
    },   
   
  }));
 
  export default ()=> {
    const classes = useStyles();
    return ( 
        <Grid container justify="center" style={{ flex: '1' }} >
            <Card className={classes.grid} >
                    <form className={classes.root} autoComplete="off"  >
                        <TextField id="user" label="Login" variant="outlined"  fullWidth margin="normal" size="medium" />
                        <TextField id="password" label="Password" type="password" 
                            autoComplete="current-password" variant="outlined" fullWidth margin="normal" size="medium" />
                        <Button variant="outlined" color="secondary" size="medium" fullWidth >Login</Button>
                    </form>
                    
            </Card>
        </Grid>       
    );
}
 
 

