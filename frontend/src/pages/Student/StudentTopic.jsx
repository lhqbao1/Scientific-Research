import { Col, Row } from "antd"
import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import Header from "../../components/Header/Header"

const StudentTopic = () => {
    const [hasTopic, setHasTopic] = useState(false)
    const topic = useSelector(state => state.account.user.status)
    useEffect(() => {
        console.log('topic', topic)
        if (topic === '') {
            setHasTopic(true)
        }
    }, [])

    return (
        <>
            <Header />
            <div style={{ backgroundColor: '#efefef', marginLeft: -8, marginRight: -8, marginTop: 8 }}>
                <div style={{ minHeight: 570 }}>
                    <Row>
                        <Col span={5}></Col>
                        <Col span={14} style={{ height: '50%', backgroundColor: 'white', borderRadius: 10, padding: 15, fontSize: 14 }}>
                            <div>
                                {hasTopic === true
                                    ?
                                    <h3>THÔNG TIN ĐỀ TÀI CỦA BẠN</h3>
                                    :
                                    <h3>ĐĂNG KÝ ĐỀ TÀI NGHIÊN CỨU KHOA HỌC</h3>

                                }
                            </div>
                        </Col>
                        <Col span={5}>

                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default StudentTopic