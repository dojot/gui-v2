import React from 'react';
 
import { makeStyles,} from '@material-ui/core/styles';
import { Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import Card from '@material-ui/core/Card';
 
 
 
const useStyles = makeStyles((theme) => ({
    margin: {
        margin:'5px',
      },
 
    grid:{
        width: '250px',
        margin: '50px', 
       
    },
 
    root: {
      '& > *': {
        margin: theme.spacing(2),
        width: '25ch',
      },
    },
  }));
 
  export default function login() {
    const classes = useStyles();
    return ( 
                <Grid container justify="center" style={{ flex: '1' }} >
                    <Card className={classes.grid} >
                            <form className={classes.root} autoComplete="off" >
                                <TextField id="user" label="Login" variant="outlined"  size="large"/>
                                <TextField id="password" label="Password" type="password" 
                                autoComplete="current-password" variant="outlined" size="large"/>       
                                <FormControlLabel control={
                                <Checkbox color="primary"/>
                                } label="Remember me" />
                                <Button variant="outlined" color="secondary" size="large" className={classes.margin} >Login</Button>
                            </form>
                            
                    </Card>
                </Grid>
       
    );
}
 
 

