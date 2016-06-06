import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TextInput from '../common/TextInput';


class LoginForm extends React.Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            credits: {chipcard_num: 'N001', mac_address: '02:42:6c:01:8c:01'},
            errors: {}
        };

        this.onChange = this.setFormState.bind(this);
    }

    loginFormIsValid() {
        let formIsValid = true;
        let errors = {};

        if( this.state.credits.chipcard_num.length < 3){
            this.state.errors.chipcard_num = 'chipcard_num => min. 3 chars';
            formIsValid = false;
        }
        if( this.state.credits.mac_address.length < 3){
            this.state.errors.mac_address = 'mac_address => min. 3 chars';
            formIsValid = false;
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    setFormState(event) {
        const field = event.target.name;
        let credits = this.state.credits;
        credits[field] = event.target.value;
        //return this.setState({credits: credits});
    }

    render() {
        return (
            <form action="/terminal/default/" method="post">
                <h1>Log In</h1>

                <TextInput name="chipcard_num"
                    label="Chipcard No."
                    value="N001"
                    onChange={this.onChange}
                    error={this.state.errors.chipcard_num} />
                <br/>

                <TextInput name="mac_address"
                    label="MAC address"
                    value="02:42:6c:01:8c:01"
                    onChange={this.onChange}
                    error={this.state.errors.mac_address} />
                <br/>
                <input type="submit"
                    value="Login"
                    className="btn btn-success" />
                <br/>
            </form>
        );
    }

}

LoginForm.propTypes = {};

export default LoginForm;

