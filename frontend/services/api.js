import axios from 'axios';

export const callLogin = (email, password) => {
    return axios.post('http://localhost:8080/api/auth/signin', { email, password })
}

export const callGetUser = (id) => {
    return axios.get(`http://localhost:8080/api/users/${id}`)
}

export const callGetStudents = () => {
    return axios.get(`http://localhost:8080/api/students`)
}


export const searchStudent = (keyword) => {
    return axios.get(`http://localhost:8080/api/students?keyword=${keyword}`)
}

export const callAddTopic = (topic_name, research_area, basic_description) => {
    return axios.post(`http://localhost:8080/api/topics`, { topic_name, research_area, basic_description })
}

export const callGetLecturerByWorkPlace = (workplace) => {
    return axios.get(`http://localhost:8080/api/lecturers/work_place/${workplace}`)
}

export const callGetStudentById = (id) => {
    return axios.get(`http://localhost:8080/api/students/${id}`)
}