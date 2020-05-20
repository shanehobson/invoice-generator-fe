import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

class DialogTabContent2 extends Component {
    render() {
        return (
            <div className='Dialog-tabContentContainer'>
                <div className='Dialog-tabContentHeader'>
                    <Typography variant='subheading'>
                            Project Description with Timetable
                    </Typography>
                </div>
                <Typography variant='body1'>
                Developer will develop a completely custom website for Customer. The goal of this website is to provide Customer with an online presence displaying information about Customer's business.
                <br /><br />
                The design process consists of four (4) phases: (1) Concept, (2) Design, (3) Technical, and (4) Testing. In Phase I (Concept), Developer will outline the basic structure of the website and provide draft text and images. In Phase 2 (Design), Developer will create digital artwork for the outlined webpages and integrate the images and text. In Phase 3 (Technical), Developer will enable the website server, domains, and add interactive functionality to the website. In Phase 4 (Testing), Developer will perform manual and programmatic testing to ensure the website performs to the specifications.
                </Typography>
            </div>
        );
    }
}

export default DialogTabContent2;