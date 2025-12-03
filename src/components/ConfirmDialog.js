import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
    ConfirmDialogOverlay,
    ConfirmDialogContainer,
    ConfirmDialogMessage,
    ConfirmDialogButton,
    ConfirmDialogButtons
} from '../styles';

function ConfirmDialog({ isOpen, message, onConfirm, onCancel, isLoading   }) {
    const overlayRef = useRef(null);

    useEffect(() {
        if(!isOpen) return;

        const handleClickOutside = (e) => {
            if(overlayRef.current && e.target === overlayRef.current) {
                onCancel();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onCancel]);

    if(!isOpen) return null;

    return (
        <ConfirmDialogOverlay ref={overlayRef}>
            <ConfirmDialogContainer>
                <ConfirmDialogMessage>{message}</ConfirmDialogMessage>
                <ConfirmDialogButtons>
                    <ConfirmDialogButton
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        Cancel
                    </ConfirmDialogButton>
                    <ConfirmDialogButton
                        danger
                        onClick={onConfirm}
                        disabled={isLoading}
                    >
                        Confirm
                    </ConfirmDialogButton>
                </ConfirmDialogButtons>
            </ConfirmDialogContainer>
        </ConfirmDialogOverlay>
    );
}

ConfirmDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
};

ConfirmDialog.defaultProps = {
    isLoading: false
};

export default ConfirmDialog;