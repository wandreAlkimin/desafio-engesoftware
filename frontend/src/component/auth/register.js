import React from "react";
import { Link } from "react-router-dom";

const Register = ({ history, registerUser = f => f }) => {
    let _email, _password, _name;

    const handleLogin = e => {
        e.preventDefault();

        registerUser(_name.value, _email.value, _password.value);
    };
    return (
        <div id="main" className="container">
            <div className="col-md-offset-5 col-md-3">

                <br/>
                <h3 className="center">Desafio EngeSoftware</h3>
                <br/>

                <form className="form-group" id="login-form" action="" onSubmit={handleLogin} method="post">
                    <label >Nome</label>
                    <input ref={input => (_name = input)}  autoComplete="off" id="name-input" name="name" type="text" className="form-control" placeholder="Nome" />
                    <br/>
                    <label >Email</label>
                    <input ref={input => (_email = input)} autoComplete="off" id="email-input" name="email" type="text" className="form-control" placeholder="Email" />
                    <br/>
                    <label >Senha</label>
                    <input ref={input => (_password = input)}  autoComplete="off" id="password-input" name="password" type="password" className="form-control" placeholder="Senha" />

                    <br/>
                    <button type="submit" className="btn btn-primary form-control" id="email-login-btn" >
                        Cadastrar
                    </button>

                </form>
                <Link  to="/login" className="btn btn-info form-control">
                    Entrar
                </Link>
            </div>
        </div>
    );
};

export default Register;