import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginActions from '../../actions/loginActions';
import { Link } from 'react-router';
import TerminalHeader from '../common/TerminalHeader';
import OptionsSelector from '../common/OptionsSelector';
import toastr from 'toastr';
import translate from 'counterpart';


class HomePage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        translate.setLocale(this.props.user.lang);
    }


    render() {
        return (
            <div>
                <OptionsSelector className="jumbotron text-center"
                    options={this.props.user.options} />
            </div>
        );
    }
}

HomePage.propTypes = {
    actions: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

HomePage.contextTypes = {
    router: PropTypes.object
};

//export default HomePage;
function mapStateToProps(state, ownProps) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(loginActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);