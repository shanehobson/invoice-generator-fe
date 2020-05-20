import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

class DialogTabContent1 extends Component {
    render() {
        return (
            <div className='Dialog-tabContentContainer'>
                <div className='Dialog-tabContentHeader'>
                    <Typography variant='subheading'>
                            Basic Project Description
                    </Typography>
                </div>
               <Typography variant='body1'>
                Developer will develop a completely custom website for Customer. The goal of this website is to provide Customer with an online presence displaying information about Customer's business.
               </Typography>
            </div>
        );
    }
}

export default DialogTabContent1;