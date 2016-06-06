import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Button, Modal } from 'react-bootstrap';
import translate from 'counterpart';


class ConfirmModal extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
    }

    render(){
        const close = this.props.handleCancel;
        const process = this.props.handleProcess;
        const centerStyle = {textAlign: 'center'};
        const yesStyle = {padding: '5px'};
        const noStyle = {padding: '5px', marginLeft: '100px'};
        return (
             <div className="modal-container" style={{height: 200}}>
                 <Modal
                     show={this.props.show}
                     onHide={close}
                     container={this}
                     aria-labelledby="contained-modal-title"
                 >
                     <Modal.Header closeButton className="text-center modal-header-primary">
                         <Modal.Title id="contained-modal-title">{this.props.title}</Modal.Title>
                     </Modal.Header>
                     <Modal.Body className="text-center">
                         <h3>{this.props.body}</h3>
                     </Modal.Body>
                     <Modal.Footer className="text-center" style={centerStyle}>
                         <Button bsStyle="primary" className="btn-huge" style={yesStyle} onClick={process}>{this.props.yes}</Button>
                         <Button bsStyle="success" className="btn-huge" style={noStyle} onClick={close}>{this.props.no}</Button>
                     </Modal.Footer>
                 </Modal>
              </div>
        );
    }
}

ConfirmModal.propTypes = {
    handleProcess: React.PropTypes.func.isRequired,
    handleCancel: React.PropTypes.func.isRequired,
    title: React.PropTypes.string.isRequired,
    body: React.PropTypes.string.isRequired,
    yes: React.PropTypes.string.isRequired,
    no: React.PropTypes.string.isRequired,
    show: React.PropTypes.bool.isRequired
};

export default ConfirmModal;