import { Col, Row } from "antd"
import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import Header from "../../components/Header/Header"
import AddTopic from "../../components/Student/StudentTopic/AddTopic"
import Topic from "../../components/Student/StudentTopic/Topic"

const StudentTopic = () => {
    const [hasTopic, setHasTopic] = useState(false)
    const topic = useSelector(state => state.student.user.topic_id)
    useEffect(() => {
        if (topic !== '') {
            setHasTopic(true)
        }
    }, [])

    return (
        <>
            <Header />
            {hasTopic === true
                ?
                <Topic />
                :
                <AddTopic />
            }
        </>
    )
}

export default StudentTopic