import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import Home from "./component/home";
import Login from "./component/auth/login";
import Register from "./component/auth/register";
import AddContato from "././component/contacts/AddContato";
import EditContato from "././component/contacts/EditContato";

import axios from "axios";
import $ from "jquery";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            user: {}
        };
    }
    _loginUser = (email, password) => {
        $("#login-form button")
            .attr("disabled", "disabled")
            .html(
                '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>'
            );
        var formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        axios
            .post("http://localhost:8000/api/user/login/", formData)
            .then(response => {
                console.log(response);
                return response;
            })
            .then(json => {
                if (json.data.success) {
                    const { name, id, email, auth_token } = json.data.data;

                    let userData = {
                        name,
                        id,
                        email,
                        auth_token,
                        timestamp: new Date().toString()
                    };
                    let appState = {
                        isLoggedIn: true,
                        user: userData
                    };
                    // save app state with user date in local storage
                    localStorage["appState"] = JSON.stringify(appState);
                    this.setState({
                        isLoggedIn: appState.isLoggedIn,
                        user: appState.user
                    });
                } else alert("Falha ao logar");

                $("#login-form button")
                    .removeAttr("disabled")
                    .html("Login");
            })
            .catch(error => {
                alert(`An Error Occured! ${error}`);
                $("#login-form button")
                    .removeAttr("disabled")
                    .html("Login");
            });
    };

    _registerUser = (name, email, password) => {
        $("#email-login-btn")
            .attr("disabled", "disabled")
            .html(
                '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>'
            );

        var formData = new FormData();
        formData.append("password", password);
        formData.append("email", email);
        formData.append("name", name);


        axios
            .post("http://localhost:8000/api/user/register", formData)
            .then(response => {
                console.log(response);
                return response;
            })
            .then(json => {
                if (json.data.success) {
                    alert(`Cadastrado com sucesso!`);
                    const { name, id, email, auth_token } = json.data.data;
                    let userData = {
                        name,
                        id,
                        email,
                        auth_token,
                        timestamp: new Date().toString()
                    };
                    let appState = {
                        isLoggedIn: true,
                        user: userData
                    };
                    // save app state with user date in local storage
                    localStorage["appState"] = JSON.stringify(appState);
                    this.setState({
                        isLoggedIn: appState.isLoggedIn,
                        user: appState.user
                    });
                    // redirect home
                    //this.props.history.push("/");
                } else {
                    alert(`Falha ao se cadastrar!`);
                    $("#email-login-btn")
                        .removeAttr("disabled")
                        .html("Register");
                }
            })
            .catch(error => {
                alert("Um erro ocorreu!" + error);
                console.log(`${formData} ${error}`);
                $("#email-login-btn")
                    .removeAttr("disabled")
                    .html("Register");
            });




    };




    _AddContato = (name, email, telephone, company) => {

        var formData = new FormData();
        formData.append("token", JSON.parse(localStorage["appState"]).user.auth_token);
        formData.append("telephone", telephone);
        formData.append("email", email);
        formData.append("name", name);
        formData.append("company", company);

        axios
            .post("http://localhost:8000/api/phones", formData)
            .then(response => {
                console.log(response);
                return response;
            })
            .then((json) => {
                if (json.data.success) {
                    this.props.history.push('/');
                    alert("Criado com sucesso!");
                } else alert(JSON.stringify(json.data.data));

            })
            .catch(err => {
                alert("Um erro ocorreu" + err);
                console.error(err);
            });

    };


    _logoutUser = () => {
        let appState = {
            isLoggedIn: false,
            user: {}
        };
        // save app state with user date in local storage
        localStorage["appState"] = JSON.stringify(appState);
        this.setState(appState);
    };

    componentDidMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            console.log(AppState);
            this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState });
        }
    }

    render() {
        console.log(this.state.isLoggedIn);
        console.log("path name: " + this.props.location.pathname);
        if (
            !this.state.isLoggedIn &&
            this.props.location.pathname !== "/login" &&
            this.props.location.pathname !== "/register"
        ) {
            console.log(
                "you are not loggedin and are not visiting login or register, so go to login page"
            );
            this.props.history.push("/login");
        }
        if (
            this.state.isLoggedIn &&
            (this.props.location.pathname === "/login" ||
                this.props.location.pathname === "/register")
        ) {
            console.log(
                "you are either going to login or register but youre logged in"
            );

            this.props.history.push("/");
        }
        return (
            <Switch data="data">
                <div id="main">
                    <Route
                        exact
                        path="/"
                        render={props => (
                            <Home
                                {...props}
                                logoutUser={this._logoutUser}
                                user={this.state.user}
                            />
                        )}
                    />

                    <Route
                        path="/login"
                        render={props => <Login {...props} loginUser={this._loginUser} />}
                    />

                    <Route
                        path="/register"
                        render={props => (
                            <Register {...props} registerUser={this._registerUser} />
                        )}
                    />

                    <Route
                        path="/addContato"
                        render={props => (
                            <AddContato {...props} addContato={this._AddContato} />
                        )}
                    />


                    <Route path="/editContato" component={EditContato} />

                </div>
            </Switch>
        );
    }
}

const AppContainer = withRouter(props => <App {...props} />);
// console.log(store.getState())
render(
    <BrowserRouter>
        <AppContainer />
    </BrowserRouter>,

    document.getElementById("root")
);
