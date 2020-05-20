import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const Header = () => (
    <div className='Header-headerContainer'>
        <Grid container direction='column' justify='space-around' alignContent='center' alignItems='center' className='Header-gridContainer'>
            <Grid item>
                <div className='Header-headerTextContainer'>
                    <Typography variant='headline' color='primary'>
                        Create an invoice for your freelance web development project in minutes.
                    </Typography>
                </div>
            </Grid>
        </Grid>
    </div>
  );
  
export default Header;