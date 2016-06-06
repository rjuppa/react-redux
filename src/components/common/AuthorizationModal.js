import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Button, Modal } from 'react-bootstrap';
import translate from 'counterpart';


class AuthorizationModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        const close = this.props.handleCancel;
        const centerStyle = {textAlign: 'center'};
        const noStyle = {padding: '5px'};
        return (
             <div className="modal-container" style={{height: 20}}>
                 <Modal dialogClassName=""
                     show={this.props.show}
                     onHide={close}
                     container={this}
                     aria-labelledby="contained-modal-title"
                 >
                     <Modal.Header closeButton className="text-center modal-header-danger">
                         <Modal.Title id="contained-modal-title">{translate('general.AUTHORIZATION_OF_FOREMAN')}</Modal.Title>
                     </Modal.Header>
                     <Modal.Body className="text-center">
                         <h3>{translate('app.swift_card')}</h3>
                     </Modal.Body>
                     <Modal.Footer className="text-center" style={centerStyle}>
                         <Button bsStyle="success" className="btn-huge" style={noStyle} onClick={close}>{translate('general.Cancel')}</Button>
                     </Modal.Footer>
                 </Modal>
              </div>
        );
    }
}

AuthorizationModal.propTypes = {
    handleCancel: React.PropTypes.func.isRequired,
    show: React.PropTypes.bool.isRequired
};

export default AuthorizationModal;