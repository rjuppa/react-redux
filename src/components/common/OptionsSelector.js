import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as terminalActions from '../../actions/terminalActions';
import OptionProcessor from '../../processors/optionProcessor';
import OptionButton from './OptionButton';
import toastr from 'toastr';
import translate from 'counterpart';


class OptionsSelector extends React.Component {
    constructor(props, context){
        super(props, context);
        this.selectOption = this.selectOption.bind(this);
    }

    selectOption(option, event){
        console.log(option);
        event.preventDefault();
        const proc = new OptionProcessor(this.props.state, this.context.router);
        proc.process_option(option, this.props.actions);
    }


    render() {
        return (
            <div className="table">
                <div className="text-center">
                    <h2>{translate('general.Choose_an_action')}</h2>
                </div>
              {this.props.options.map(option =>
                      <OptionButton key={'opt_'+option.option_name}
                          title={translate('options.'+option.option_name)}
                          option={option}
                          onSelect={this.selectOption}/>
              )}
            </div>
        );
    }
}

OptionsSelector.propTypes = {
    actions: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    state: PropTypes.object
};

OptionsSelector.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        options: state.user.options,
        user: state.user,
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(terminalActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionsSelector);

