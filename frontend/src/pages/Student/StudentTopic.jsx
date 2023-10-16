import { Col, Row } from "antd"
import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { callGetStudentById } from "../../../services/api"
import Header from "../../components/Header/Header"
import AddTopic from "../../components/Student/StudentTopic/AddTopic"
import Topic from "../../components/Student/StudentTopic/Topic"

const StudentTopic = () => {
    const [hasTopic, setHasTopic] = useState(false)
    const studentId = useSelector(state => state.student.user.student_id)
    const [topicId, setTopicId] = useState('')
    useEffect(() => {
        GetStudentInfo()
    }, [])

    const GetStudentInfo = async () => {
        const res = await callGetStudentById(studentId)
        if (res.data.payload?.topic_id !== null) {
            setHasTopic(true)
            setTopicId(res.data.payload.topic_id)
        }
    }
    // console.log(topic)


    return (
        <>
            <Header />
            {hasTopic === true
                ?
                <Topic
                    topicId={topicId}
                    setTopicId={setTopicId}
                />
                :
                <AddTopic />
            }
        </>
    )
}

export default StudentTopic