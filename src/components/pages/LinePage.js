import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginActions from '../../actions/loginActions';
import { Link } from 'react-router';
import PositionsCanvas from '../common/PositionsCanvas';
import toastr from 'toastr';


class LinePage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <PositionsCanvas className="text-center" positions={this.props.positions} />
                <div className="clear"></div>
            </div>
        );
    }
}

LinePage.propTypes = {
    actions: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    positions: PropTypes.array.isRequired
};

LinePage.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        user: state.user,
        positions: state.positions
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(loginActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LinePage);
