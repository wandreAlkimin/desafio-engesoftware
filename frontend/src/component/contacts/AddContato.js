import React from "react";
import { Link } from "react-router-dom";

const AddContato = ({ history, addContato = f => f }) => {
    let _email, _telephone, _name,_company;

    const handleAddContato = e => {
        e.preventDefault();

        addContato(_name.value, _email.value, _telephone.value, _company.value);
    };

    return (
        <div id="main" className="container">
            <div className="col-md-12">

                <br/>
                <h3 className="center">Desafio EngeSoftware - Adicionar contato</h3>
                <br/>

                <form className="form-group" id="login-form" action="" onSubmit={handleAddContato} method="post">
                    <label >Nome</label>
                    <input ref={input => (_name = input)}  autoComplete="off" id="name-input" name="name" type="text" className="form-control" placeholder="Nome" />
                    <br/>
                    <label >Email</label>
                    <input ref={input => (_email = input)} autoComplete="off" id="email-input" name="email" type="text" className="form-control" placeholder="Email"  />
                    <br/>
                    <label >Telefone</label>
                    <input ref={input => (_telephone = input)}  autoComplete="off" id="password-input" name="telephone" type="text" className="form-control" placeholder="Telefone"  />
                    <br/>
                    <label >Companhia</label>
                    <input ref={input => (_company = input)}  autoComplete="off" name="company" type="text" className="form-control" placeholder="Companhia" />

                    <br/>
                    <button type="submit" className="btn btn-primary form-control" id="email-login-btn" >
                        Adicionar
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AddContato;