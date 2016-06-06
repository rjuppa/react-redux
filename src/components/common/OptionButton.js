import React, {PropTypes} from 'react';
import {Link} from 'react-router';


class OptionButton extends React.Component {
    constructor(props, context){
        super(props, context);
    }

    render() {
        let class_name = this.props.option.class;
        if(this.props.option.disabled){
            class_name = this.props.option.class + ' btn btn-huge option-w disabled';
            return (
                <div className="button_wrapper">
                    <button className={class_name}> {this.props.title} </button>
                </div>
            );
        }
        else{
            class_name = this.props.option.class + ' btn option-w btn-huge';
            return (
                <div className="button_wrapper">
                    <button
                        className={class_name}
                        onClick={this.props.onSelect.bind(this, this.props.option)}> {this.props.title} </button>
                </div>
            );
        }
    }
}

OptionButton.propTypes = {
    option: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default OptionButton;
