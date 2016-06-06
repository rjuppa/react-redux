// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import Header from './common/Header';
import TerminalHeader from './common/TerminalHeader';
import LoginForm from './forms/LoginForm';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import translate from 'counterpart';


class App extends React.Component {

    render() {
        //translate.registerTranslations('cs', require('../languages/cs.json'));     //singleton
        //translate.registerTranslations('en', require('../languages/en.json'));
        if(this.props.user.is_authenticated){
            return (
                <div>
                    <TerminalHeader user={this.props.user} error="" />
                    {this.props.children}
                </div>
        );
        }
        else{
            return (
                <div>
                    <TerminalHeader user={this.props.user} error="" />
                    <div className="jumbotron text-center">
                        <h2>{translate('app.welcome')}</h2>
                        <img src="/terminal/static/images/login-card.png" alt="login" />
                        <h3 className="login_header">
                            {translate('app.swift_card')}
                        </h3>
                    </div>
                </div>
            );
        }

    }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        user: state.user,
        loading: state.ajaxCallsInProgress > 0
    };
}

export default connect(mapStateToProps)(App);
