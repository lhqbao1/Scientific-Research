import axios from 'axios';

export const callLogin = (email, password) => {
    return axios.post('http://localhost:8080/api/auth/signin', { email, password })
}

export const callGetUser = (id) => {
    return axios.get(`http://localhost:8080/api/users/${id}`)
}