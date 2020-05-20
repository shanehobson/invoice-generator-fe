import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

class DialogTabContent3A extends Component {
    render() {
        return (
            <div className='Dialog-tabContentContainer'>
                <div className='Dialog-tabContentHeader'>
                    <Typography variant='subheading'>
                        Retainer Agreement
                    </Typography>
                </div>
                <Typography variant='body1'>
                    Customer agrees to commit to (RETAINER FEE). Retainer fee in full must accopmany signed Agreement. Developer shall be paid an hourly rate of (HOURLY RATE). Initial hours will be applied against deposit until expended. Subsequently, Client will be billed on a weekly basis for each prior week’s hours. Payments are due upon receipt. Payments rendered are considered fully earned and non-refundable.
                </Typography>
            </div>
        );
    }
}

export default DialogTabContent3A;