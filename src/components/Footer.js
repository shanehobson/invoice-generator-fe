import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const Footer = () => (
    <div>
        <AppBar position='static'  className='Footer-footerContainer'>
            <Toolbar>
                <Grid container justify='center' alignContent='center'>
                    <Grid item>
                        <Typography variant='title' style={{ color: '#fff'}}>
                            &copy; Copyright 2020
                        </Typography>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    </div>
  );
  
export default Footer;