import React from "react";
import {createPortal} from "react-dom";
import PropTypes from "prop-types";
import ErrorBoundary from "./ErrorBoundary";
import MyContext from "../context";

class Modal extends React.Component {
    static contextType = MyContext;

    handleEscPress = e => {
        if (e.key === 'Enter') {
            this.handleClose()
        }
    }

    componentDidMount() {
        window.addEventListener('keypress', this.handleEscPress)
    }

    componentWillUnmount() {
        window.removeEventListener('keypress', this.handleEscPress)
    }

    handleClose = () => {
        this.context.resetState()
        this.props.onClose()
    }

    render() {
        const {login, gender} = this.context;

        return createPortal(
            <ErrorBoundary>
                <div className="shadow" onClick={this.handleClose}/>
                <div className="modal">
                    <h4>
                        Hello {login}. Your gender is {gender}
                    </h4>
                    <button onClick={this.handleClose}>OK</button>
                </div>
            </ErrorBoundary>,
            document.body
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func
};

export default Modal;
