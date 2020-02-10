import React, { Component } from 'react'
import ApiService from "../../ApiService";

class EditContato extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            name: '',
            email: '',
            telephone: '',
            company: '',
        }
        this.saveUser = this.saveUser.bind(this);
        this.loadUser = this.loadUser.bind(this);
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser() {
        ApiService.fetchUserById(window.localStorage.getItem("userId"))
            .then((json) => {
                let user = json.data.data;
                this.setState({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    telephone: user.telephone,
                    company: user.company,
                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });



    saveUser = (e) => {
        e.preventDefault();
        let user = {id: this.state.id, name: this.state.name, email: this.state.email, telephone: this.state.telephone, company: this.state.company};

        ApiService.editUser(user)
            .then(response => {
                console.log(response);
                return response;
            })
            .then((json) => {
                if (json.data.success) {
                    alert("Contato salvo");
                    this.props.history.push('/');
                } else alert(JSON.stringify(json.data.data));

            })
            .catch(err => {
                alert("Um erro ocorreu" + err);
                console.error(err);
            });
    }

    render() {
        return (
            <div className="container">
                <h2 className="text-center">Desafio EngeSoftware - Editar contato</h2>
                <form action=""  method="post">

                    <div className="form-group">
                        <label>User Name:</label>
                        <input type="text" placeholder="username" name="name" className="form-control"  value={this.state.name} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>email:</label>
                        <input placeholder="First Name" name="email" className="form-control" value={this.state.email} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Last Name:</label>
                        <input placeholder="Last name" name="telephone" className="form-control" value={this.state.telephone} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>company:</label>
                        <input type="text" placeholder="age" name="company" className="form-control" value={this.state.company} onChange={this.onChange}/>
                    </div>


                    <button className="btn btn-success" onClick={this.saveUser}>Save</button>
                </form>
            </div>
        );
    }
}

export default EditContato;