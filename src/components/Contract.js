import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Contract extends Component {
    constructor(props) {
        console.log('Entered Contract constructor');
        super(props);
    };

    render() {
        const { 
            devType,
            customerType, 
            devInfo,
            customerInfo,
            description,
            specs,
            paymentTerms,
            sigInfoDev,
            sigInfoCustomer
        } = this.props;

        const devName = devInfo.name === '' ? '___________________' : devInfo.name;
        const devStreet = devInfo.street === '' ? '____________________' : devInfo.street;
        const devCity = devInfo.city === '' ? '____________________' : devInfo.city;
        const devState = devInfo.USstate === '' ? '__________' : devInfo.USstate;
        const devZip = devInfo.zip === '' ? '_____' : devInfo.zip;
        const devRepresentative = devType === 'business' ? sigInfoDev.name : devInfo.name;
        const devTitle = devType === 'business' ? sigInfoDev.title : '';

        const customerName = customerInfo.name === '' ? '___________________' : customerInfo.name;
        const customerStreet = customerInfo.street === '' ? '____________________' : customerInfo.street;
        const customerCity = customerInfo.city === '' ? '____________________' : customerInfo.city;
        const customerState = customerInfo.USstate === '' ? '__________' : customerInfo.USstate;
        const customerZip = customerInfo.zip === '' ? '_____' : customerInfo.zip;
        const customerRepresentative = customerType === 'business' ? sigInfoCustomer.name : customerInfo.name;
        const customerTitle = customerType === 'business' ? sigInfoCustomer.title : '';

        return (
            <div id='workingDocContainer'>
                <div id='Contract-ContractTitleContainer'>
                    <h3 id='Contract-ContractHeader'>AGREEMENT FOR WEB DEVELOPMENT SERVICES</h3>
                </div>
                <h4>I. PARTIES</h4>
                <p>
                This Agreement for Web Development Services is an agreement between {devName}, whose {devType === 'business' && 'registered'} address is {devStreet}, {devCity}, {devState}, {devZip} (<strong>Developer</strong>),
                and {customerName}, whose {customerType === 'business' && 'registered'} address is {customerStreet}, {customerCity}, {customerState}, {customerZip} (<strong>Customer</strong>). 
                </p>
                <h4>II.  DESCRIPTION OF SERVICES AND SCOPE OF WORK</h4>
                <p>
                Developer shall render the web development and design services set forth in <strong>Schedule A (Description of Services)</strong>,
                as per the specifications set forth in <strong>Schedule B (Project Specifications)</strong>.
                The product of the web development and design services provided by Developer shall be referred to herein as the <strong>Project</strong>.
                </p>
                <h4>III.  TERM AND TERMINATION</h4>
                <p>
                This Agreement shall take effect immediately upon the Effective Date, and shall remain in effect until Developer has completed the services described herein. Notwithstanding the foregoing, either Party may terminate this Agreement by providing the other Party written notice if the other Party: (a) is in material breach of this Agreement and has failed to cure such breach within ten (10) days after its receipt of written notice of such breach provided by the non-breaching Party; (b) engages in any unlawful business practice related to that Party's performance under the Agreement; or (c) files a petition for bankruptcy, becomes insolvent, acknowledges its insolvency in any manner, ceases to do business, makes an assignment for the benefit of its creditors, or has a receiver, trustee or similar party appointed for its property (<strong>Termination</strong>).
                </p>
                <p>
                The Parties may from time to time modify the scope of the Project by including said modifications in a written <strong>Modification Order</strong> which clearly sets forth and explains the desired modifications and the adjustment to Payment terms that will result from the Modification. Such Modification order will only become effective after being signed and dated by or on behalf of Developer and Customer.
                </p>
                <h4>IV.  ACCEPTANCE</h4>
                <p>
                Upon completion of the Project by Developer, the Developer shall invite the Customer to conduct a review of the Project. Customer shall test the compliance of the completed Project with the Specifications set forth in Schedule B. Once the Customer has completed its review, Customer shall determine whether the Project is in conformity with the Project Specifications. If the Project does so conform to the Specifications, Customer shall promptly inform Developer in writing that the Project meets said Specifications. Upon delivery of said writing, the Project shall be deemed accepted (<strong>Acceptance</strong>).
                </p>
                <p>
                If Customer concludes that the Project does not conform to the Specifications, Customer shall set forth in writing the reasons why the Project does not so conform and shall present said writing to Developer. Customer and Developer must then confer and discuss how to rectify the identified Defects. If any Defect is is caused by Customer, or any agent, contractor, or representative of Customer, the site shall be deemed to be in conformity with the Specifications and shall be deemed Accepted. If any Defect is caused by Developer, or any agent, contractor, or representative of Developer, Developer shall remedy said Defect. Thereafter, Developer shall invite Customer to conduct a subsequent review of the Project. If the Project conforms to the Specifications, Customer shall promptly inform Developer in writing that the Project meets said Specifications, and the Project shall be deemed accepted.
                </p>
                <h4>V.  PAYMENT</h4>
                <p>
                In consideration for the services of Developer, Customer shall remit payment to Developer according to the terms set forth in <strong>Schedule C (Payment Terms)</strong>. Following Acceptance, Developer shall issue a final invoice to Customer, and Customer shall make final payment to Developer in accordance with the foregoing within 30 days of receipt of the invoice.
                </p>
                <h4>VI.  WARRANTIES</h4>
                <p>
                Developer and Customer hereby warrant to the each other that each party has the full power and authority to enter into this Agreement.
                </p>
                <p>
                Developer warrants to Customer that Developer will render the services set forth herein with reasonable care and skill and in accordance with generally recognized commercial practices and standards.
                </p>
                <p>
                Customer agrees to provide Developer with all information and data necessary for completion of the Project, including all text, images, account credentials, and other information, in the format required by Developer.
                </p>
                <h4>VII.  INDEPENDENT CONTRACTOR STATUS</h4>
                <p>
                The Parties intend that Developer will be be engaged as an independent contractor of Customer. Nothing contained in this Agreement will be construed to create the relationship of employer and employee, principal and agent, partnership or joint venture, or any other fiduciary relationship.
                </p>
                <h4>VIII.  INTELLECTUAL PROPERTY</h4>
                <p>
                <strong>Intellectual Property Rights</strong> shall mean all intellectual property rights wherever in the world arising, whether registered or unregistered (and including any application), including copyright, know-how, confidential information, trade secrets, business names and domain names, trade marks, service marks, trade names, patents, petty patents, utility models, design rights, semi-conductor topography rights, database rights and all rights in the nature of unfair competition rights or rights to sue for passing off.
                </p>
                <p>
                All Intellectual Property Rights in the Specification and the Project arising in connection with this Agreement shall be the property of Customer, and Developer hereby assigns all such Intellectual Property Rights to Customer. Customer hereby warrants and guarantees that all elements of text, images, trademarks, or other artwork provided to Developer by Customer are either owned by Customer or that Customer has permission to use same.
                Developer reserves the right to display and link to the completed Project as a part of a portfolio and to write and speak about the project in various media, subject to the Confidentiality restrictions contained herein.
                </p>
                <p>
                The Parties intend that, to the extent that any of the services rendered by Developer pursuant to the Agreement (<strong>Work Product</strong>) qualifies as a work made for hire, within the definition of Section 101 of the Copyright Act of the United States (17 U.S.C. § 101), it will be so deemed a work made for hire. If the Work Product or any portion of the Work Product does not qualify as work made for hire, and/or as otherwise necessary to ensure the complete ownership of all rights, titles and interest in the Work Product by Customer, Developer shall transfer and assign to Customer all rights, titles and interests in and to any and all Work Product. This transfer and assignment includes, but is not limited to, the right to publish, distribute, make derivative works of, edit, alter or otherwise use the Work Product in any way Customer sees fit.
                </p>
                <h4>IX.  LIMITATION OF REMEDIES</h4>
                <p>
                Nothing in this agreement shall operate to exclude or limit the liability of any party liability for any breach of {devState} or {customerState} law or of any breach of the terms implied by {devState} or {customerState} law. Neither party shall be liable to the other for any loss of profit, anticipated profits, revenues, anticipated savings, goodwill or business opportunity, or for any indirect or consequential loss or damage.
                </p>
                <p>
                It is not possible to guarantee that code will function as intended indefinitely. Accordingly, Developer cannot be liable to Customer or any third party for damages, including lost profits, lost savings, or other incidental, consequential or special damages, even if Customer has advised Developer of same.
                </p>
                <h4>X.  FORCE MAJEURE</h4>
                <p>
                In this clause, <strong>Event of Force Majeure</strong> means an event beyond the control of Developer and Customer, which prevents either Party from complying with any of its obligations under this Contract. Neither Developer nor Customer shall be considered in breach of this Agreement to the extent that performance of their respective obligations (excluding payment obligations) is prevented by an Event of Force Majeure that arises after the Effective Date. 
                </p>
                <h4>XI.  CONFIDENTIALITY</h4>
                <p>
                <strong>Confidential Information</strong> shall mean all information whether technical or commercial (including all specifications, drawings and designs, disclosed in writing, on disc, orally or by inspection of documents or pursuant to discussions between the parties), where the information is (a) identified as confidential at the time of disclosure, or (b) ought reasonably to be considered confidential given the nature of the information or the circumstances of disclosure. 
                </p>
                <p>
                Confidential information shared with the receiving party shall remain the exclusive property of the disclosing party. Each Party agrees to maintain in confidence all such Confidential Information and not to divulge such Confidential Information in whole or in part to any third party and not to make use of such Confidential Information other than in relation to meeting its obligations under this Agreement. This obligation shall not apply to:  Information that: (i) is known at the time of the disclosure thereof to the receiving party by the disclosing Party; (ii) is, or becomes, publicly known, through no fault of the receiving party subsequent to the time of the disclosing partys disclosure thereof to the receiving party; (iii) is developed by the receiving party independently of, and without use of, the Confidential Information; (iv) is rightfully obtained by the receiving party from third parties authorized to make such disclosure without restriction; (v) is identified in writing by the disclosing party as no longer proprietary or confidential; or (vi) is required to be disclosed by law, regulation, or court order after giving reasonable notice to the disclosing party. 
                </p>
                <h4>XII.  ASSIGNMENT OF RIGHTS AND OBLIGATIONS</h4>
                <p>
                Developer may not assign or transfer any of its rights or obligations under this agreement. Customer may assign or transfer any of its rights or obligations under this agreement, provided it gives prior written notice to Developer.
                </p>
                <h4>XIII.  ENTIRE AGREEMENT</h4>
                <p>
                Except as provided in this clause, neither party shall have any remedy in respect of any untrue statement (whether written or oral) made to it on which it relied in entering into this agreement (<strong>Misrepresentation</strong>), and neither party shall have any liability other than pursuant to the express terms of this agreement. Nothing in this agreement shall exclude or limit either party's liability for any Misrepresentation made knowing that it was untrue. Each party's liability for Misrepresentation as to a fundamental matter, including as to a matter fundamental to that party's ability to perform its obligations under this agreement, shall be subject to the limit set out in the Limitation of Remedies clause.
                </p>
                <h4>XIV.  VARIATION AND WAIVER</h4>
                <p>
                Any variation of this agreement shall be ineffective unless said variation is set forth in writing and signed by or on behalf of Developer and Customer.
                </p>
                <p>
                A waiver of any right under this agreement is only effective if it is in writing, and it applies only to the party to whom the waiver is addressed and the circumstances for which it is given. No waiver shall be implied by taking or failing to take any other action.
                </p>
                <p>
                Unless specifically provided otherwise, rights arising under this agreement are cumulative and do not exclude rights provided by federal or state law.
                </p>
                <h4>XV.  SEVERABILITY</h4>
                <p>
                Any part, provision, representation or warranty of this Agreement which is prohibited or which is held to be void or unenforceable shall be ineffective to the extent of such prohibition or unenforceability without invalidating the remaining provisions hereof. Any part, provision, representation or warranty of this Agreement which is prohibited or unenforceable or is held to be void or unenforceable in any jurisdiction shall be ineffective, as to such jurisdiction, to the extent of such prohibition or unenforceability without invalidating the remaining provisions hereof.
                </p>
                <h4>XVI.  GOVERNING LAW</h4>
                <p>
                This Agreement shall be governed by, and construed in accordance with, the laws of the State of {devState}. 
                </p> 
                <section>
                    <h4>XVII.  SIGNATORIES</h4>
                    <p>
                    This Agreement shall be signed by {devRepresentative} {devType === 'business' && `on behalf of ${devName}`} (<strong>Developer</strong>), and {customerRepresentative} {customerType === 'business' && `on behalf of ${customerName}`} (<strong>Customer</strong>). This Agreement is effective as of the first date written above.
                    </p>
                    <br />
                    <p><strong>Developer:</strong></p>
                    <p>By: ______________________________________________</p>
                    <blockquote>{devRepresentative}</blockquote>
                    <blockquote>{devTitle}</blockquote>
                    <br />
                    <p><strong>Customer:</strong></p>
                    <p>By: ______________________________________________</p>
                    <blockquote>{customerRepresentative}</blockquote>
                    <blockquote>{customerTitle}</blockquote>
                </section>
                <section>
                    <h4>SCHEDULE A - Description of Services</h4>
                    <p>{description}</p>
                </section>
                <section>
                    <h4>SCHEDULE B - Project Specifications</h4>
                    <p>{specs}</p>
                </section>
                <section>
                    <h4>SCHEDULE C - Payment Terms</h4>
                    <p>{paymentTerms}</p>
                </section>
            </div>
        );
    }
};

Contract.propTypes = {
    devType: PropTypes.string.isRequired,
    customerType: PropTypes.string.isRequired,
    devInfo: PropTypes.object.isRequired,
    customerInfo: PropTypes.object.isRequired,
    description: PropTypes.string.isRequired,
    specs: PropTypes.string.isRequired,
    paymentTerms: PropTypes.string.isRequired,
    sigInfoDev: PropTypes.object.isRequired,
    sigInfoCustomer: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    devType: state.contractInfo.devType,
    customerType: state.contractInfo.customerType,
    devInfo: state.contractInfo.devInfo,
    customerInfo: state.contractInfo.customerInfo,
    description: state.contractInfo.description,
    specs: state.contractInfo.specs,
    paymentTerms: state.contractInfo.paymentTerms,
    sigInfoDev: state.contractInfo.sigInfoDev,
    sigInfoCustomer: state.contractInfo.sigInfoCustomer
});


export default connect(mapStateToProps)(Contract);

