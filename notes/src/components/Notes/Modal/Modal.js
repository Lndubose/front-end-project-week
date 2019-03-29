import React from 'react';
import PropTypes from 'prop-types';

import {
    ModalContainer,
    ModalMain,
    DeleteButton,
    NoButton,
} from './modalStyle';

function Modal(props) {
    return (
        <ModalContainer style={{ display: props.showModal ? 'block' : 'none' }}>
            <ModalMain>
                <h5>Are you sure you want to delete this?</h5>
                <DeleteButton onClick={event => props.deleteClick(event)}>
                    Delete
                </DeleteButton>
                <NoButton onClick={props.toggleModal}>No</NoButton>
            </ModalMain>
        </ModalContainer>
    );
}

Modal.propTypes = {
    deleteClick: PropTypes.func,
    showModal: PropTypes.bool,
    toggleModal: PropTypes.func,
};

export default Modal;
