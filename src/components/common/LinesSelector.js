import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as terminalActions from '../../actions/terminalActions';
import OptionProcessor from '../../processors/optionProcessor';
import * as UserOptions from '../../constants/UserOptions';
import * as BackendActions from '../../constants/BackendActions';
import LineButton from './LineButton';
import toastr from 'toastr';
import translate from 'counterpart';


class LinesSelector extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.selectLine = this.selectLine.bind(this);
    }

    selectLine(line_id, event){
        event.preventDefault();
        const option = OptionProcessor.createOption(
                            UserOptions.OPTION_SELECT_LINE,
                            BackendActions.ACTION_NONE,
                            {line_id: line_id}
        );
        const proc = new OptionProcessor(this.props.state, this.context.router);
        proc.process_option(option, this.props.actions);
    }

    render(){
        return (
            <div className="table">
                <div className="text-center">
                    <h2>{translate('general.Choose_a_line')}</h2>
                </div>
                {this.props.lines.map(line =>
                      <LineButton key={'line_'+line.line_id} line={line} onSelect={this.selectLine}/>
                )}
            </div>
        );
    }
}

LinesSelector.propTypes = {
    actions: PropTypes.object.isRequired,
    lines: PropTypes.array.isRequired,
    state: PropTypes.object
};

LinesSelector.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        lines: state.lines,
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(terminalActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LinesSelector);
