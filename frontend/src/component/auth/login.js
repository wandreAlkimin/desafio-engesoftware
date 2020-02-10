import React from "react";
import { Link } from "react-router-dom";

const Login = ({ history, loginUser = f => f }) => {
    let _email, _password;
    const handleLogin = e => {
        e.preventDefault();
        loginUser(_email.value, _password.value);
    };
    return (
        <div id="main" className="container">
            <div className="col-md-offset-5 col-md-3">

                <br/>
                <h3 className="center">Desafio EngeSoftware</h3>
                <br/>

                <form className="form-group" id="login-form" action="" onSubmit={handleLogin} method="post">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input ref={input => (_email = input)}  autoComplete="off" id="email-input" name="email" type="text" className="form-control" placeholder="email" />
                    <br/>
                    <label >Senha</label>
                    <input ref={input => (_password = input)}  autoComplete="off" id="password-input" name="password" type="password" className="form-control" placeholder="senha" />
                    <br/>
                    <button type="submit" className="btn btn-primary form-control" id="email-login-btn" href="#facebook" >
                        Entrar
                    </button>
                </form>
                <Link  to="/register" className="btn btn-info form-control" >
                    Registre-se
                </Link>
            </div>
        </div>
    );
};

export default  Login;