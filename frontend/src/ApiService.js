import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/phones';

class ApiService {

    constructor(props) {
        this.state = {
            token: JSON.parse(localStorage["appState"]).user.auth_token,
        };

    }

    getContacts() {
        return axios.get(API_BASE_URL + '/?token=' + this.state.token);
    }

    fetchUserById(userId) {
        return axios.get(API_BASE_URL + "/" + userId + '?token=' + this.state.token);
    }

    editUser(user) {

        let formData = new FormData();
        formData.append("token", JSON.parse(localStorage["appState"]).user.auth_token);
        formData.append("id", user.id);
        formData.append("telephone", user.telephone);
        formData.append("email", user.email);
        formData.append("name", user.name);
        formData.append("company", user.company);

        return axios.post("http://localhost:8000/api/phones/update/" + user.id , formData);
    }


    deleteContato(userId) {

        let formData = new FormData();
        formData.append("token", JSON.parse(localStorage["appState"]).user.auth_token);

        return axios.post(API_BASE_URL + "/delete/" + userId ,formData);
    }

}

export default new ApiService();