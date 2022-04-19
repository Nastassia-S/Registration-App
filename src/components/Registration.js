import React from "react";
import "../style.modules.css";
import Modal from "./Modal";
import MyContext from "../context";

const GENDERS = {
    male: "male",
    female: "female",
};

const MIN_LENGTH_VALUE = 5;

class Registration extends React.Component {
    static contextType = MyContext;
    state = {
        isSubscriptionChecked: true,
        isModalVisible: false,
        errors: {
            login: "",
            password: "",
            gender: "",
            isSubscriptionChecked: "",
        },
    };

    handleChange = (e) => {
        const inputName = e.target.name;
        this.context.onChange(e);
        this.setState({
            errors: {
                ...this.state.errors,
                [inputName]: "",
            },
        });
    };

    handleCheckboxChange = (e) => {
        const checked = e.target.checked;
        this.setState({
            isSubscriptionChecked: checked,
            errors: {
                ...this.state.errors,
                isSubscriptionChecked: "",
            },
        });
    };

    handleSubmit = () => {
        const errors = {};
        const {isSubscriptionChecked} = this.state;
        const {login, password} = this.context;
        if (login.length < MIN_LENGTH_VALUE) {
            errors.login = "The login should contain at least 5 characters";
        }
        if (password.length < MIN_LENGTH_VALUE) {
            errors.password = "The password should contain at least 5 characters";
        }
        if (!isSubscriptionChecked) {
            errors.isSubscriptionChecked = "You should agree";
        }

        if (errors.login || errors.password || errors.isSubscriptionChecked) {
            this.setState({
                errors: {
                    login: errors.login || "",
                    password: errors.password || "",
                    isSubscriptionChecked: errors.isSubscriptionChecked || "",
                },
            });
            return;
        }

        this.setState({isModalVisible: true});
    };

    handleClose = () => {
        this.setState({isModalVisible: false});
    };

    render() {
        const {isSubscriptionChecked, errors, isModalVisible} = this.state;
        const {login, password, gender} = this.context;

        return (
            <div className="form">
                <h1>Registration Form</h1>
                <label>
                    Login:
                    <input
                        type="text"
                        name="login"
                        placeholder="Type your login"
                        value={login}
                        onChange={this.handleChange}
                    />
                </label>
                {errors.login && <p>{errors.login}</p>}
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        placeholder="Type your password"
                        value={password}
                        onChange={this.handleChange}
                    />
                </label>
                {errors.password && <p>{errors.password}</p>}
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value={GENDERS.male}
                        checked={gender === GENDERS.male}
                        onChange={this.handleChange}
                    />
                    {GENDERS.male}
                </label>
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value={GENDERS.female}
                        checked={gender === GENDERS.female}
                        onChange={this.handleChange}
                    />
                    {GENDERS.female}
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="isSubscriptionChecked"
                        checked={isSubscriptionChecked}
                        onChange={this.handleCheckboxChange}
                    />
                    You agree to subscribe notifications
                </label>
                {errors.isSubscriptionChecked && <p>{errors.isSubscriptionChecked}</p>}
                <button type="button" onClick={this.handleSubmit}>
                    Register
                </button>
                {isModalVisible && <Modal onClose={this.handleClose}/>}
            </div>
        );
    }
}

export default Registration;
