import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

class DialogTabContent1A extends Component {
    render() {
        return (
            <div className='Dialog-tabContentContainer'>
                <div className='Dialog-tabContentHeader'>
                    <Typography variant='subheading'>
                        One-Time Fee at Project Completion
                    </Typography>
                </div>
               <Typography variant='body1'>
                    Upon completion of the Project, which shall occur upon the Acceptance event as set forth in Section IV of this Agreement, Developer shall issue an invoice to Customer in the amount of (PAYMENT AMOUNT). Within thirty (30) days of receiving this invoice, Customer shall make payment to Developer for said amount in consideration for the services rendered by Developer.
               </Typography>
            </div>
        );
    }
}

export default DialogTabContent1A;