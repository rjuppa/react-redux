import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginActions from '../../actions/loginActions';
import * as terminalActions from '../../actions/terminalActions';
import FakeReader from './FakeReader';
import AuthorizationModal from './AuthorizationModal';
import toastr from 'toastr';
import translate from 'counterpart';


class TerminalHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.doLogOut = this.doLogOut.bind(this);
        this.handleHideModal = this.handleHideModal.bind(this);
        this.handleShowModal = this.handleShowModal.bind(this);
    }

    componentDidUpdate(){
        // check Countdown
        if( this.props.app.countdown ){
            console.log('Countdown started..');
            if( this.props.app.onsuccess_message.length > 0){
                this.redirectOnSuccess();
            }
            if( this.props.app.onfailed_message.length > 0){
                this.redirectOnFailed();
            }
        }
    }

    handleHideModal(){
        this.props.actions.cancelAuthorization();
    }
    handleShowModal(){
        this.setState({ show: true });
    }

    doLogOut(event) {
        event.preventDefault();
        this.props.actions.logout()
            .then(() => this.redirectHome())
            .catch(error => {
                console.log('doLogOut catch');
                toastr.error(error);
            });
    }

    redirectHome() {
        this.context.router.push('home');
    }

    redirectOnSuccess() {
        this.context.router.push('onsuccess');
    }

    redirectOnFailed() {
        this.context.router.push('onfailed');
    }


    render() {
        let fakeReader = <FakeReader value="3" />;
        if(this.props.user.is_authenticated){
            return (
                <div>
                    {fakeReader}
                    <div className="col-sm-12" id="terminalHeader">
                        <div className="col-sm-2 text-center">
                            <Link to="/terminal/default/" className="btn btn-success btn-huge w100">{translate('options.OPTION_HOME')}</Link>
                        </div>
                        <div className="col-sm-8 text-center">
                            <div><h4>{translate('general.TERMINAL')}</h4> </div>
                            <div><h4>{translate('general.User')}: {this.props.user.user_firstname} {this.props.user.user_lastname}</h4></div>
                        </div>
                        <div className="col-sm-2 text-center">
                            <button className="btn btn-danger btn-huge w100" onClick={this.doLogOut}>{translate('options.OPTION_LOGOUT')}</button>
                        </div>
                    </div>
                    <div className="text-center">
                        &nbsp;<span>{this.props.error || this.props.app.action}</span>
                    </div>
                    <AuthorizationModal show={this.props.authorizationRequired}
                        handleCancel={this.handleHideModal}
                    />
                </div>
            );
        }
        else{
            return (
                <div>
                    {fakeReader}
                    <div className="col-sm-12" id="terminalHeader">
                        <div className="col-sm-2 text-center">
                        </div>
                        <div className="col-sm-8 text-center">
                            <div><h4>{translate('general.TERMINAL')}</h4></div>
                            <div><h4></h4></div>
                        </div>
                        <div className="col-sm-2 text-center">
                        </div>
                    </div>
                    <div className="text-center">
                        &nbsp;<span>{this.props.error || this.props.app.action}</span>
                    </div>
                </div>
            );
        }
    }
}

TerminalHeader.propTypes = {
    actions: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    app: PropTypes.object.isRequired,
    authorizationRequired: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired
};

TerminalHeader.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    console.log('========= TerminalHeader State ==========');
    console.log(state);
    console.log('========= TerminalHeader State end ==========');

    return {
        user: state.user,
        app: state.app,
        authorizationRequired: state.authorization.authorizationRequired,
        option: state.authorization.option
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, loginActions, terminalActions), dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TerminalHeader);
