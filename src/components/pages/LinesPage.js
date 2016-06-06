import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as terminalActions from '../../actions/terminalActions';
import { Link } from 'react-router';
import LinesSelector from '../common/LinesSelector';


class LinesPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <LinesSelector className="jumbotron text-center"
                    lines={this.props.lines} />
            </div>
        );
    }
}

LinesPage.propTypes = {
    actions: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    lines: PropTypes.array.isRequired
};

LinesPage.contextTypes = {
    router: PropTypes.object
};


function mapStateToProps(state, ownProps) {
    console.log(state.lines);
    return {
        user: state.user,
        lines: state.lines
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(terminalActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LinesPage);

