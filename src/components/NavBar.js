import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const NavBar = () => {
  return (
    <div>
        <div className='NavBar-navBar'>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='title' color='inherit' className='NavBar-flex'>
                        <a href='#' className='Navbar-navBarIconLink'>Invoice Generator</a>
                    </Typography>
                  
                </Toolbar>
            </AppBar>
        </div>
    </div>
  );
}

export default NavBar;

/* Code for future nav links:
<div className='Navbar-navLinks'>
<Button color='inherit' className='NavBar-navLink'><Typography color='inherit'>About Us</Typography></Button>
<Button color='inherit' className='NavBar-navLink'><Typography color='inherit'>Contact</Typography></Button>
</div>
*/

