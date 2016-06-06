import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginActions from '../../actions/loginActions';
import { Link } from 'react-router';
import toastr from 'toastr';
import translate from 'counterpart';


class OnFailedPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.countDown = this.countDown.bind(this);
        //this.state = Store.getState();
        this.state = {
            counter: 3
        };
    }

    componentDidMount(){
        if(!this.interval) {
            this.interval = setInterval(this.countDown, 1000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    countDown(){
        if(this.state.counter >= 0) {
            if(this.state.counter == 0){
                this.props.actions.logout()
                    .then(() => this.context.router.push('/terminal/default/'))
                        .catch(error =>{
                            toastr.error(error);
                        });
            }
            else{
                let newCount = this.state.counter - 1;
                this.setState({
                    counter: newCount
                });
            }
        }
    }

    render() {
        return (
            <div>
                <div className="col-sm-8 col-sm-offset-2">
                    <div className="text-center top-margin100">

                      <div className="panel panel-sorry">
                          <div className="panel-heading text-center">{translate('general.Warning')}</div>
                          <div className="panel-body">
                            <h2>{translate('general.Action')} {this.props.message} {translate('general.failed')}.</h2>
                          </div>
                          <div className="panel-heading text-center">
                             {translate('general.Logoff_countdown')} <span id="counter">{this.state.counter}</span> sec.
                          </div>
                      </div>

                    </div>
                </div>
            </div>
        );
    }
}

OnFailedPage.propTypes = {
    actions: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

OnFailedPage.contextTypes = {
    router: PropTypes.object
};

//export default HomePage;
function mapStateToProps(state, ownProps) {
    return {
        user: state.user,
        message: state.app.onfailed_message
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(loginActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OnFailedPage);
