import React, { Component } from 'react'
import ApiService from "../ApiService"
import $ from "jquery";

class ListUserComponent extends Component {


    constructor(props) {
        super(props)
        this.state = {
            users: [],
            message: null
        }
        this.deleteContato = this.deleteContato.bind(this);
        this.editContato   = this.editContato.bind(this);
        this.addContato    = this.addContato.bind(this);
        this.reloadList    = this.reloadList.bind(this);
    }

    componentDidMount() {
        this.reloadList();
            $(document).ready(function(){
            $("#searchInput").on("keyup", function() {
                var value = $(this).val().toLowerCase();
                $("#tableContatos tr").filter(function() {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
        });
    }

    reloadList() {
        ApiService.getContacts()
            .then((json) => {
                if (json.data.success) {
                    this.setState({ users: json.data.data });
                    //alert("Login Successful!");
                } else alert("Falha ao buscar lista de contatos");
            });
    }

    deleteContato(userId) {

        ApiService.deleteContato(userId)
            .then(response => {
                console.log(response);
                return response;
            })
            .then((json) => {
                if (json.data.success) {
                    alert("Contato deletado com sucesso!");
                        this.setState({users: this.state.users.filter(user => user.id !== userId)});
                } else alert(JSON.stringify(json.data.data));

            })
            .catch(err => {
                alert("Um erro ocorreu" + err);
                console.error(err);
            });

    }

    editContato(id) {
        window.localStorage.setItem("userId", id);
        this.props.history.push('/editContato');
    }

    addContato() {
        window.localStorage.removeItem("userId");
        this.props.history.push('/addContato');
    }


    render() {
        return (
            <div className="container">
                <h2 className="text-center">Lista de contatos</h2>
                <div className="row">
                    <div className="col-md-2">
                        <button className="btn btn-danger " onClick={() => this.addContato()}> Adicionar contato</button>
                    </div>
                    <div className="col-md-10">
                        <input className="form-control " id="searchInput" type="text" placeholder="Search.."/>
                    </div>
                </div>
                    <br/>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th className="hidden">Id</th>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Email</th>
                        <th>Compania</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody id="tableContatos">
                    {
                        this.state.users.map(
                            user =>
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.telephone}</td>
                                    <td>{user.email}</td>
                                    <td>{user.company}</td>

                                    <td>
                                        <button className="btn btn-success" onClick={() => this.deleteContato(user.id)}> Delete</button>
                                        <button className="btn btn-success" onClick={() => this.editContato(user.id)}> Edit</button>
                                    </td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>

                <button
                    style={{ padding: 10, backgroundColor: "red", color: "white" }}
                    onClick={this.props.logoutUser}
                >
                    Logout{" "}
                </button>

            </div>
        );
    }

}

export default ListUserComponent;