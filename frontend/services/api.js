import axios from 'axios';

export const callLogin = (email, password) => {
    return axios.post('http://localhost:8080/api/auth/signin', { email, password })
}
export const callCreateUser = (email, password, role) => {
    return axios.post(`http://localhost:8080/api/auth/signup`, { email, password, role })
}

export const callGetUser = () => {
    return axios.get(`http://localhost:8080/api/users/`)
}

export const callGetStudents = () => {
    return axios.get(`http://localhost:8080/api/students`)
}

export const callDeleteStudent = (id) => {
    return axios.delete(`http://localhost:8080/api/students/delete/${id}`)
}

export const searchStudent = (keyword) => {
    return axios.get(`http://localhost:8080/api/students?keyword=${keyword}`)
}

export const callSearchLecturer = (keyword) => {
    return axios.get(`http://localhost:8080/api/lecturers?keyword=${keyword}`)
}

export const callAddTopic = (topic_name, research_area, basic_description, topic_status, duration, phase) => {
    return axios.post(`http://localhost:8080/api/topics`, { topic_name, research_area, basic_description, topic_status, duration, phase })
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

export const callGetLecturerByIdAcc = (id) => {
    return axios.get(`http://localhost:8080/api/lecturer-acc/${id}`)
}

export const callGetTopicById = (id) => {
    return axios.get(`http://localhost:8080/api/topic/${id}`)
}

export const callGetTopicAccById = (id) => {
    return axios.get(`http://localhost:8080/api/topic-acc/${id}`)
}
export const callGetTopicEditExFile = (id) => {
    return axios.get(`http://localhost:8080/api/editexplanation-file/${id}`)
}

export const callSetDateTopic = (topic_id, acceptancedate) => {
    return axios.put(`http://localhost:8080/api/topics/${topic_id}`, { acceptancedate })
}

export const callCreateInvitation = (student, lecturer, topic) => {
    return axios.post(`http://localhost:8080/api/invitation/`, { student, lecturer, topic })
}

export const callGetInvitationById = (id) => {
    return axios.get(`http://localhost:8080/api/invitation/${id}`)
}

export const callUpdateTopic = (id, lecturer_id, topic_status) => {
    return axios.put(`http://localhost:8080/api/topics/${id}`, { lecturer_id, topic_status })
}

export const callUpdateTopicStatus = (id, topic_status) => {
    return axios.put(`http://localhost:8080/api/topics/${id}`, { topic_status })
}

// export const callGetLecturerTopic = (id) => {
//     return axios.get(`http://localhost:8080/api/lecturerTopic/${id}`)
// }

export const callAddStudentTopic = (student_id, topic_id) => {
    return axios.put(`http://localhost:8080/api/students/${student_id}`, { topic_id })
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

export const callCreateCoucil = (name, phase, type) => {
    return axios.post(`http://localhost:8080/api/explanation/`, { name, phase, type })
}

export const callGetTopicStudent = (id) => {
    return axios.get(`http://localhost:8080/api/topic/students/${id}`)
}

export const callGetAllTopics = () => {
    return axios.get(`http://localhost:8080/api/topics`)
}

export const callGetTopicWithStatus = (keyword) => {
    return axios.get(`http://localhost:8080/api/topics?keyword=${keyword}`)
}

export const callGetTopicWithExplanation = (id) => {
    return axios.get(`http://localhost:8080/api/topic/explanation/${id}`)
}

export const callCreateExplanationTranscript = (comment, score, lecturer, topic, type, status) => {
    return axios.post(`http://localhost:8080/api/transcript/`, { comment, score, lecturer, topic, type, status })
}

export const callCheckExistedTranscript = (lecturer, topic) => {
    return axios.get(`http://localhost:8080/api/transcript/${lecturer}/${topic}/`)
}
export const callCheckExistedTranscriptAcc = (lecturer, topic) => {
    return axios.get(`http://localhost:8080/api/transcript-acc/${lecturer}/${topic}/`)
}
export const callGetTranscriptByTopicId = (topicid) => {
    return axios.get(`http://localhost:8080/api/transcript/${topicid}`)
}

export const callGetTranscriptAccByTopicId = (topic_id) => {
    return axios.get(`http://localhost:8080/api/transcript-acc/${topic_id}/`)
}

export const callGetTranscriptAcc1ByTopicId = (topic_id) => {
    return axios.get(`http://localhost:8080/api/transcript-acc-1/${topic_id}/`)
}

export const callGetMajors = () => {
    return axios.get(`http://localhost:8080/api/majors/`)
}

export const callCreateStudent = (user_id,
    student_name,
    student_class,
    student_code,
    email,
    grade,
    major_id,
    topic_id,
    role) => {
    return axios.post(`http://localhost:8080/api/student/`, {
        user_id,
        student_name,
        student_class,
        student_code,
        email,
        grade,
        major_id,
        topic_id,
        role
    })
}

export const callGetExplanationCoucilById = (id) => {
    return axios.get(`http://localhost:8080/api/explanation/${id}`)
}

export const callUpdateBoard = (id, president, secretary, couter, commissioner1, commissioner2, commissioner3
) => {
    return axios.put(`http://localhost:8080/api/explanation/${id}`, {
        president, secretary, couter, commissioner1, commissioner2, commissioner3
    })
}

export const callSetTopicBoard = (id, explanationboard) => {
    return axios.put(`http://localhost:8080/api/topics/${id}`, { explanationboard })
}
export const callSetTopicAccBoard = (id, acceptanceboard) => {
    return axios.put(`http://localhost:8080/api/topics/${id}`, { acceptanceboard })
}


export const callApproveTopic = (id, topic_status) => {
    return axios.put(`http://localhost:8080/api/topics/${id}`, { topic_status })
}

export const callApproveTopicCtu = (id, topic_code, cost, topic_status) => {
    return axios.put(`http://localhost:8080/api/topics/${id}`, { topic_code, cost, topic_status })
}

export const callApproveAccTopic = (id, topic_status) => {
    return axios.put(`http://localhost:8080/api/topics/${id}`, { topic_status })
}

export const callGetRefusedInvitation = (id) => {
    return axios.get(`http://localhost:8080/api/refused-invitation/${id}`)
}

export const callGetAcceptanceFile = (id) => {
    return axios.get(`http://localhost:8080/api/acceptance-file/${id}`)
}

export const callGetLetterFile = (id) => {
    return axios.get(`http://localhost:8080/api/letter-file/${id}`)
}

export const callGetLecturerLogin = (id) => {
    return axios.get(`http://localhost:8080/api/lecturer-login/${id}`)
}

export const callCreateAccInvitation = (advisor, lecturer, topic, type) => {
    return axios.post(`http://localhost:8080/api/invitationacceptance/`, { advisor, lecturer, topic, type })
}

export const callGetSentInvi = (advisor, topic) => {
    return axios.get(`http://localhost:8080/api/sent-invitationacceptance/${advisor}/${topic}`)
}

export const callCheckInvi = (advisor, lecturer, topic) => {
    return axios.get(`http://localhost:8080/api/check-invitationacceptance/${advisor}/${lecturer}/${topic}`)
}

export const callCheckInviRole = (advisor, topic, type) => {
    return axios.get(`http://localhost:8080/api/checkrole-invitationacceptance/${advisor}/${topic}/${type}`)
}

export const callCheckRecieveInvi = (lecturer) => {
    return axios.get(`http://localhost:8080/api/recieve-invitationacceptance/${lecturer}`)
}

export const callAcceptAccInvi = (id, status) => {
    return axios.put(`http://localhost:8080/api/invitationacceptance/${id}`, { status })
}

export const callSetAccBoardPresident = (id, president) => {
    return axios.put(`http://localhost:8080/api/explanation/${id}`, { president })
}
export const callSetAccBoardSecretary = (id, secretary) => {
    return axios.put(`http://localhost:8080/api/explanation/${id}`, { secretary })
}
export const callSetAccBoardCouter = (id, couter) => {
    return axios.put(`http://localhost:8080/api/explanation/${id}`, { couter })
}

export const callRefuseAccInvi = (id, status) => {
    return axios.put(`http://localhost:8080/api/invitationacceptance/${id}`, { status })
}
export const callSetTopicCost = (topic_id, cost) => {
    return axios.put(`http://localhost:8080/api/topics/${topic_id}`, { cost })
}
export const callCreateBulkUser = (data) => {
    return axios.post(`http://localhost:8080/api/auth/bulksignup`, data)
}
export const callCreateBulkStudent = (data) => {
    return axios.post(`http://localhost:8080/api/students/`, data)
}

export const callCreateBulkLecturer = (data) => {
    return axios.post(`http://localhost:8080/api/lecturers/`, data)
}
export const callGetAcceptance = () => {
    return axios.get(`http://localhost:8080/api/acceptances/`)
}
export const callDeleteUser = (id) => {
    return axios.delete(`http://localhost:8080/api/user/${id}`)
}

export const callCreateNotification = (name, content, start_date, end_date, students, type) => {
    return axios.post(`http://localhost:8080/api/notification/`, { name, content, start_date, end_date, students, type })
}
export const callCreateNotificationAddFileExplanation = (name, content, start_date, end_date, type) => {
    return axios.post(`http://localhost:8080/api/notification/`, { name, content, start_date, end_date, type })
}
export const callGetNotification = () => {
    return axios.get(`http://localhost:8080/api/notifications/`)
}
export const callGetNotificationStartReport = () => {
    return axios.get(`http://localhost:8080/api/notifications-start-report/`)
}

export const callGetNotificationPhase2 = () => {
    return axios.get(`http://localhost:8080/api/notifications-2/`)
}
export const callUpdateNotification = (id, name, content, start_date, end_date, students) => {
    return axios.put(`http://localhost:8080/api/notification/${id}`, { name, content, start_date, end_date, students })
}

export const callUpdateNotificationAddFile = (id, name, content, start_date, end_date) => {
    return axios.put(`http://localhost:8080/api/notification/${id}`, { name, content, start_date, end_date })
}
export const callUpdateNotificationAddFileExplanation = (id, name, content, start_date, end_date) => {
    return axios.put(`http://localhost:8080/api/notification/${id}`, { name, content, start_date, end_date })
}

export const callUpdateStudentRole = (id, role) => {
    return axios.put(`http://localhost:8080/api/students/${id}`, { role })
}

export const callUpdateStudentInfo = (id, student_name, student_code, grade, email) => {
    return axios.put(`http://localhost:8080/api/students/${id}`, { student_name, student_code, grade, email })
}

export const callGetStudentByCode = (student_code) => {
    return axios.get(`http://localhost:8080/api/student-code/${student_code}`)
}

export const callUpdateStudentTopic = (id, topic_id) => {
    return axios.put(`http://localhost:8080/api/students/${id}`, { topic_id })
}
export const callCreateCommissioner = (lecturer, board) => {
    return axios.post(`http://localhost:8080/api/commissioner/`, { lecturer, board })
}
export const callCreateCounter = (lecturer, board) => {
    return axios.post(`http://localhost:8080/api/counter/`, { lecturer, board })
}
export const callGetExplanationByid = (id) => {
    return axios.get(`http://localhost:8080/api/explanation/${id}`)
}
export const callCreateNotificationDate = (name, content, date, type, topic) => {
    return axios.post(`http://localhost:8080/api/notification/`, { name, content, date, type, topic })
}
export const callUpdateTopicInfo = (id, topic_name, research_area, basic_description) => {
    return axios.put(`http://localhost:8080/api/topics/${id}`, { topic_name, research_area, basic_description })
}
export const callUpdateFile = (id, file_name, file_url, file_type, topic_id) => {
    return axios.put(`http://localhost:8080/api/file/${id}`, { file_name, file_url, file_type, topic_id })
}
export const callGetNotificationAddFile = () => {
    return axios.get(`http://localhost:8080/api/notifications-addfile/`)
}
export const callGetNotificationAddFilePhase2 = () => {
    return axios.get(`http://localhost:8080/api/notifications-addfile2/`)
}
export const callCreateNotificationAddFile = (name, content, start_date, end_date, type) => {
    return axios.post(`http://localhost:8080/api/notification/`, { name, content, start_date, end_date, type })
}
export const callGetTopicSetExplanation = () => {
    return axios.get(`http://localhost:8080/api/topic-set-explanation/`)
}

export const callUpdateTopicExplanationBulk = (idArr, board) => {
    return axios.put(`http://localhost:8080/api/topic-bulk/`, { idArr, board })
}
export const callUpdateTopicStatusBulk = (idArr) => {
    return axios.put(`http://localhost:8080/api/topic-bulk-status/`, { idArr })
}

export const callUpdateTopicStatusBulkTrue = (idArr, status) => {
    return axios.put(`http://localhost:8080/api/topic-bulk-status-true/`, { idArr, status })
}

export const callUpdateTopicStatusStartBulk = (idArr) => {
    return axios.put(`http://localhost:8080/api/topic-bulk-status-7/`, { idArr })
}
export const callUpdateTopicCostBulk = (idArr, cost, code) => {
    return axios.put(`http://localhost:8080/api/topic-approve/`, { idArr, cost, code })
}
export const callSendEmailNotification = (receiver, file, pdfFile) => {
    return axios.post(`http://localhost:8080/api/send-email-approve/`, { receiver, file, pdfFile })
}

export const callSendEmailApproveReport = (receiver, title, content, pdfFile) => {
    return axios.post(`http://localhost:8080/api/send-email-approve-report/`, { receiver, title, content, pdfFile })
}

export const callUpdateTranscriptStatus = (idArr) => {
    return axios.put(`http://localhost:8080/api/transcript/`, { idArr })
}

export const callGetAllFileOfTopic = (id) => {
    return axios.get(`http://localhost:8080/api/file/${id}`)
}

export const callBulkCreateFile = (data) => {
    return axios.post(`http://localhost:8080/api/bulk-file`, data)
}
export const callUpdateTopicPlace = (id, acceptanceplace) => {
    return axios.put(`http://localhost:8080/api/topics/${id}`, { acceptanceplace })
}
export const callCreateTranscriptComment = (comment1, comment2, comment3, comment4, comment5, comment6, comment7, comment8, comment9, type) => {
    return axios.post(`http://localhost:8080/api/transcript-comment/`, { comment1, comment2, comment3, comment4, comment5, comment6, comment7, comment8, comment9, type })
}
export const callCreateTranscriptScore = (score1, score2, score3, score4, score5, score6, score7, score8, type) => {
    return axios.post(`http://localhost:8080/api/transcript-score/`, { score1, score2, score3, score4, score5, score6, score7, score8, type })
}
export const callUpdateTranscriptComment = (id, comment) => {
    return axios.put(`http://localhost:8080/api/transcript-comment/`, { id, comment })
}
export const callUpdateTranscriptScore = (id, score) => {
    return axios.put(`http://localhost:8080/api/transcript-score/`, { id, score })
}

export const callGetNotificationAddFileExplanation = () => {
    return axios.get(`http://localhost:8080/api/notifications-add-file-explanation/`)
}