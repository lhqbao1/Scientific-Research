import axios from 'axios';

export const callLogin = (email, password) => {
    return axios.post('http://localhost:8080/api/auth/signin', { email, password })
}
export const callCreateUser = (email, password, role) => {
    return axios.post(`http://localhost:8080/api/auth/signup`, { email, password, role })
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

export const callSearchLecturer = (keyword) => {
    return axios.get(`http://localhost:8080/api/lecturers?keyword=${keyword}`)
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

export const callGetLecturerById = (id) => {
    return axios.get(`http://localhost:8080/api/lecturer/${id}`)
}

export const callGetTopicById = (id) => {
    return axios.get(`http://localhost:8080/api/topic/${id}`)
}

export const callCreateInvitation = (student, lecturer, topic) => {
    return axios.post(`http://localhost:8080/api/invitation/`, { student, lecturer, topic })
}

export const callGetInvitationById = (id) => {
    return axios.get(`http://localhost:8080/api/invitation/${id}`)
}

export const callUpdateTopic = (id, lecturer_id, status) => {
    return axios.put(`http://localhost:8080/api/topics/${id}`, { lecturer_id, status })
}

export const callUpdateTopicStatus = (id, topic_status) => {
    return axios.put(`http://localhost:8080/api/topics/${id}`, { topic_status })
}

export const callGetLecturerTopic = (id) => {
    return axios.get(`http://localhost:8080/api/lecturerTopic/${id}`)
}

export const callUpdateInvitation = (id, status) => {
    return axios.put(`http://localhost:8080/api/invitation/${id}`, { status })
}

export const callGetAcceptedInvitation = (id) => {
    return axios.get(`http://localhost:8080/api/accepted-invitation/${id}`)
}

export const callUploadPresentFile = (file_name, file_url, file_type, topic_id) => {
    return axios.post(`http://localhost:8080/api/file`, { file_name, file_url, file_type, topic_id })
}

export const callGetFileWithTopic = (topic_id) => {
    return axios.get(`http://localhost:8080/api/file/${topic_id}`)
}

export const callGetTopicStatus = (status_id) => {
    return axios.get(`http://localhost:8080/api/status/${status_id}`)
}

export const callGetLecturer = () => {
    return axios.get(`http://localhost:8080/api/lecturers`)
}

export const callGetWorkPlace = () => {
    return axios.get(`http://localhost:8080/api/workplaces/`)
}

export const callCreateLecturer = (user_id, lecturer_name, position, degree, email, work_place_id) => {
    return axios.post(`http://localhost:8080/api/lecturers`, { user_id, lecturer_name, position, degree, email, work_place_id })
}

export const callGetCoucil = () => {
    return axios.get(`http://localhost:8080/api/explanations/`)
}

export const callSetLecturerCoucil = (id, explanationboard, explanationrole) => {
    return axios.put(`http://localhost:8080/api/lecturers/${id}`, { explanationboard, explanationrole })
}

export const callGetLecturerByCoucil = (explanationboard) => {
    return axios.get(`http://localhost:8080/api/lecturers/coucil/${explanationboard}`)
}

export const callCreateCoucil = (name, phase) => {
    return axios.post(`http://localhost:8080/api/explanation/`, { name, phase })
}

export const callGetTopicStudent = (id) => {
    return axios.get(`http://localhost:8080/api/topic/students/${id}`)
}