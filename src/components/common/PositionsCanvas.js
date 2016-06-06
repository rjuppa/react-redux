import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as terminalActions from '../../actions/terminalActions';
import OptionProcessor from '../../processors/optionProcessor';
import * as UserOptions from '../../constants/UserOptions';
import * as PositionStates from '../../constants/PositionStates';
import * as BackendActions from '../../constants/BackendActions';
import ConfirmModal from './ConfirmModal';
import toastr from 'toastr';
import { Button, Modal } from 'react-bootstrap';
import translate from 'counterpart';


const fabric = require('fabric').fabric;


const LabeledRect = fabric.util.createClass(fabric.Rect, {
    type: 'labeledRect',
    initialize: function(options){
        if(!options){
            options = {};
        }
        this.options = options;
        this.callSuper('initialize', options);
        this.set('state', options.state || 1);
        return this.set('label', options.label || '');
    },
    toObject: function(){
        return fabric.util.object.extend(this.callSuper('toObject'), {
            label: this.get('label')
        });
    },
    _render: function(ctx){
        let tw;
        this.callSuper('_render', ctx);
        ctx.font = '20px Helvetica';
        ctx.fillStyle = '#FFFFFF';
        ctx.lineWidth = 4;
        ctx.strokeStyle = this.options.borderFill;        //</this>'black';
        ctx.stroke();
        tw = Math.round(ctx.measureText(this.label).width);
        return ctx.fillText(this.label, -tw / 2, 0);
    }
});



class PositionsCanvas extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.global_canvas = null;
        this.updateCanvas = this.updateCanvas.bind(this);
        this.canvasClicked = this.canvasClicked.bind(this);
        this.handleHideModal = this.handleHideModal.bind(this);
        this.handleShowModal = this.handleShowModal.bind(this);
        this.processAction = this.processAction.bind(this);
        this.state = { show: false, positionInfo: {} };
    }

    componentDidMount() {
        this.updateCanvas();
    }

    handleHideModal(){
        this.setState({ show: false, positionInfo: this.state.positionInfo });
    }
    handleShowModal(){
        this.setState({ show: true, positionInfo: this.state.positionInfo });
    }

    updateCanvas() {
        const canvas = ReactDOM.findDOMNode(this.refs.canvas);
        this.global_canvas = new fabric.Canvas(canvas, {width: 800, height: 500});
        //this.global_canvas.backgroundColor = 'rgb(255,255,255)';
        this.props.positions.forEach(position => {
            let settings = JSON.parse(position.coord);
            settings.label = position.line_position_name;
            settings.state = position.state;
            if( this.props.action_name.substring(0, 19) != 'ACTION_REPORT_ERROR'){
                switch(position.state){
                    case PositionStates.POSITION_AVAILABLE:
                        settings.fill = '#2DBC2E';
                        settings.borderFill = 'green';
                        break;
                    case PositionStates.POSITION_AVAILABLE_WITH_AUTHORIZATION: // need authorization
                        settings.fill = '#2DBC2E';
                        settings.borderFill = 'red';
                        break;
                    case PositionStates.POSITION_OCCUPIED:  // occupied
                        settings.fill = '#CCCCCC';
                        settings.borderFill = '#666666';
                        break;
                    case PositionStates.POSITION_ERROR_REPORTED:  // error
                        settings.fill = 'red';
                        settings.borderFill = 'red';
                        break;
                    default :
                        settings.fill = '#888888';
                        settings.borderFill = 'black';
                }
            }
            else if( this.props.action_name != 'ACTION_START_REPAIR' ){
                switch(position.state){
                    case PositionStates.POSITION_ERROR_REPORTED:  // error
                        settings.fill = 'red';
                        settings.borderFill = 'red';
                        break;
                    case PositionStates.POSITION_OCCUPIED:  // repairing now
                        settings.fill = '#CCCCCC';
                        settings.borderFill = 'red';
                        break;
                    default :
                        settings.fill = '#2DBC2E';
                        settings.borderFill = 'green';
                }
            }
            else{
                switch(position.state){
                    case PositionStates.POSITION_ERROR_REPORTED:  // error
                        settings.fill = 'red';
                        settings.borderFill = 'red';
                        break;
                    default :
                        settings.fill = 'green';
                        settings.borderFill = 'black';
                }
            }

            let rect = new LabeledRect(settings);
            rect.positionInfo = position;
            rect.lockMovementX = true;
            rect.lockMovementY = true;
            rect.lockScalingX = true;
            rect.lockScalingY = true;
            rect.lockRotation = true;
            rect.hasControls = false;
            rect.hasBorders = false;
            this.global_canvas.add(rect);
        });
        this.global_canvas.renderAll();
    }

    canvasClicked(event){
        let selectedObject = this.global_canvas.getActiveObject();
        if (selectedObject){
            event.preventDefault();
            // process click
            if( this.props.state.app.action == 'ACTION_END_OPERATOR' ){
                if(selectedObject.positionInfo.occupied == 0){
                    toastr.error('Position is not accupied by anybody.');
                    return;
                }
                // show confirmation
                if( !this.state.show ){
                    this.setState({ show: true, positionInfo: selectedObject.positionInfo });
                }
            }
            else{
                // process now
                this.setState({ show: false, positionInfo: selectedObject.positionInfo });
                const option = OptionProcessor.createOption(UserOptions.OPTION_SELECT_POSITION,
                                                BackendActions.ACTION_NONE,
                                                selectedObject.positionInfo);
                const proc = new OptionProcessor(this.props.state, this.context.router);
                proc.process_option(option, this.props.actions);
            }
        }
    }

    processAction(){
        const option = OptionProcessor.createOption(UserOptions.OPTION_SELECT_POSITION,
                                                BackendActions.ACTION_NONE,
                                                this.state.positionInfo);
        const proc = new OptionProcessor(this.props.state, this.context.router);
        proc.process_option(option, this.props.actions);
    }

    render(){
        return (
            <div className="canvas-outer" onClick={this.canvasClicked}>
                <div className="text-center">
                    <h2>{translate('general.Choose_a_position')}</h2>
                </div>
                <canvas ref="canvas" width="800px" height="500px" id="line_positions"></canvas>
                <ConfirmModal show={this.state.show}
                    handleProcess={this.processAction}
                    handleCancel={this.handleHideModal}
                    title={translate('general.Confirmation')}
                    body={translate('general.Are_you_sure_you_want_to_end_work_on_the_position')}
                    yes={translate('general.YES')}
                    no={translate('general.NO')}
                />
            </div>
            );
    }
}

PositionsCanvas.propTypes = {
    actions: PropTypes.object.isRequired,
    positions: PropTypes.array.isRequired,
    action_name: PropTypes.string.isRequired,
    state: PropTypes.object
};

PositionsCanvas.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        positions: state.positions,
        action_name: state.app.action,
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(terminalActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PositionsCanvas);
