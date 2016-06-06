import React, {PropTypes} from 'react';
import {Link} from 'react-router';


const LineButton = ({line, onSelect}) => {
    return (
        <div className="button_wrapper">
            <button className="btn btn-success option-w btn-huge"
                onClick={onSelect.bind(this, line.line_id)}> {line.line_name} </button>
        </div>
    );
};

LineButton.propTypes = {
    line: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default LineButton;
