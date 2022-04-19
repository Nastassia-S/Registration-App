import React from "react";
import "./style.modules.css";
import Registration from "./components/Registration";
import MyContext from "./context";

const initialState = {
    login: "",
    password: "",
    gender: "female",
}

class App extends React.Component {
    state = initialState;

    handleChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        this.setState({[inputName]: value});
    };

    resetState = () => {
        this.setState(initialState);
    };

    render() {
        return (
            <MyContext.Provider
                value={{...this.state, onChange: this.handleChange, resetState: this.resetState}}
            >
                <div className="App">
                    <Registration/>
                </div>
            </MyContext.Provider>
        );
    }
}

export default App;
