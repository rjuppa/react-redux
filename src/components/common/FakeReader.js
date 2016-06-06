import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as terminalActions from '../../actions/terminalActions';
import translate from 'counterpart';


class FakeReader extends React.Component {
    constructor(props) {
        super(props);
        this.getButton = this.getButton.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
        this.state = {chipcard_num: 'N001', mac_address:'02:42:6c:01:8c:01'};
    }

    getButton(){
        if( this.props.showReader ){
            return React.createElement('div', {},
                React.createElement('button', {
                    type: 'button',
                    onClick: this.props.actions.verifyAuthorization.bind(null, {
                        chipcard_num: this.state.chipcard_num,
                        action_type: this.props.action_type,
                        person_id: this.props.user.user_id,
                        position_id: this.props.option.line_position_id
                    })
                }, "Approve"),
                React.createElement('button', {
                    type: 'button',
                    onClick: this.props.actions.cancelAuthorization.bind(null)
                }, "Cancel")
            );
        }
        else{
            return React.createElement('button', {type: 'submit'}, "Send");
        }
    }

    inputHandler(ev){
        this.setState({ chipcard_num: ev.target.value });
    }

    inputHandlerMAC(ev){
        this.setState({ mac_address: ev.target.value });
    }

    render(){
        let loginClass = 'LoginForm';
        if(this.props.showReader){
            loginClass += ' hidden';
        }
        if( !this.props.user.is_authenticated || this.props.showReader ){
            return (
                React.createElement('form',
                    {className: loginClass, action: '/terminal/default/', method: 'post'},
                    React.createElement('span', {className: 'card-reader'}, 'Fake Card Reader:'),
                    React.createElement('input', {
                        type: 'text',
                        name: 'chipcard_num',
                        id: 'chipcard_num',
                        className: '',
                        placeholder: 'chipcard_num',
                        onChange: this.inputHandler,
                        value: this.state.chipcard_num
                    }),
                    React.createElement('input', {
                        type: 'text',
                        name: 'mac_address',
                        id: 'mac_address',
                        onChange: this.inputHandlerMAC,
                        value: this.state.mac_address
                    }),
                    this.getButton(this.props)
                )
            );
        }
        else{
            return(
                <div className="hidden">
                    <form className="LoginForm" action="/terminal/default/" method="post">
                        <span className="card-reader">Fake Card Reader:</span>
                        <input type="text" name="chipcard_num" id="chipcard_num" />
                        <input type="hidden" name="mac_address" value="02:42:6c:01:8c:01" />
                        <div><button type="button">{translate('general.Approve')}</button><button type="button">{translate('general.Cancel')}</button></div>
                    </form>
                </div>);
        }
    }
}

FakeReader.propTypes = {
    actions: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    option: PropTypes.object.isRequired,
    action_type: PropTypes.string.isRequired,
    showReader: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        user: state.user,
        showReader: state.authorization.authorizationRequired,
        action_type: state.app.action,
        option: state.authorization.option
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(terminalActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FakeReader);
