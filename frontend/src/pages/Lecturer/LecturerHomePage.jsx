import { Col, Modal, Row } from 'antd'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { callGetLecturerTopic } from '../../../services/api'
import './LecturerHomePage.scss'

const LecturerHomePage = () => {
    const [lecturerTopic, setLecturerTopic] = useState([])
    const lecturerId = useSelector(state => state?.lecturer?.user?.lecturer_id)
    useEffect(() => {
        const callGetTopic = async () => {
            const res = await callGetLecturerTopic(lecturerId)
            if (res.data.payload) {
                setLecturerTopic(res?.data?.payload?.invitation)
            }
        }
        callGetTopic()
    }, [lecturerTopic])

    return (
        <div style={{ backgroundColor: '#efefef', marginLeft: -8, marginRight: -8, marginTop: 8 }}>
            <div className="LecturerHomePage-page">
                <Row>
                    <Col span={5}></Col>
                    <Col span={14} style={{ height: '100%', backgroundColor: 'white', borderRadius: 10, paddingTop: 10, fontSize: 14, paddingLeft: 15, paddingRight: 15 }}>
                        <div>
                            <h3>CÁC ĐỀ TÀI ĐANG PHỤ TRÁCH HƯỚNG DẪN</h3>
                            {lecturerTopic?.map((item, index) => {
                                return (
                                    <div style={{ display: 'flex', border: '0px solid black', borderRadius: '0% 0% 0% 0% / 0% 0% 0% 0%', padding: 10, marginBottom: 50, marginTop: 30, position: 'relative', boxShadow: '5px 5px 10px rgba(0,0,0,.15)' }}>
                                        <div style={{ width: '40%', marginRight: 10 }}>
                                            <b>Thông tin sinh viên: </b>
                                            <p>Tên: {item?.studentInfo?.student_name}</p>
                                            <p>Mã số sinh viên: B{item?.studentInfo?.student_code}</p>
                                            <p>Khóa: {item?.studentInfo?.grade}</p>

                                            <p>Ngành: {item?.studentInfo?.major?.major_name}</p>
                                        </div>
                                        <div style={{ width: '60%' }}>
                                            <b>Thông tin đề tài: </b>
                                            <p>Tên đề tài: {item?.studentInfo?.topic?.topic_name}</p>
                                            <p>Lĩnh vực nghiên cứu: {item?.studentInfo?.topic?.research_area}</p>
                                            <p>Mô tả đề tài: {item?.studentInfo?.topic?.basic_description}</p>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    </Col>
                    <Col span={5}>

                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default LecturerHomePage