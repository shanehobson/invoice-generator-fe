import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

class DialogTabContent2A extends Component {
    render() {
        return (
            <div className='Dialog-tabContentContainer'>
                <div className='Dialog-tabContentHeader'>
                    <Typography variant='subheading'>
                        Hourly Rate
                    </Typography>
                </div>
               <Typography variant='body1'>
                Developer shall be paid an hourly rate of (HOURLY RATE). Upon completion of the Project, which shall occur upon the Acceptance event as set forth in Section IV of this Agreement, Developer shall issue an invoice to Customer containing a written record of the hours Developer worked on the Project, rounded to the nearest 15 minute increment. The payment requested in the invoice shall be the product of the hours worked by Developer and the hourly rate establish herein. Within thirty (30) days of receiving this invoice, Customer shall make payment to Developer for said amount in consideration for the services rendered by Developer.
               </Typography>
            </div>
        );
    }
}

export default DialogTabContent2A;