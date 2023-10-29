import { Card, Col, Row, Statistic } from 'antd'
import './AdminDashboard.scss'
import { ArrowDownOutlined, ArrowUpOutlined, UserOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import { callGetAcceptance, callGetCoucil, callGetLecturer, callGetStudents } from '../../../services/api'
import { useState } from 'react'


const AdminDashboard = () => {
    const [amoutStudent, setAmoutStudent] = useState()
    const [lecturer, setLecturer] = useState()
    const [explanation, setExplanation] = useState()
    const [acceptance, setAcceptance] = useState()


    useEffect(() => {
        const getStudentAmount = async () => {
            const res = await callGetStudents()
            if (res && res.data) {
                setAmoutStudent(res.data.payload.items.length)
            }
        }
        const getLecturer = async () => {
            const res = await callGetLecturer()
            if (res) {
                setLecturer(res.data.payload.items.length)
            }
        }
        const getExplanationCoucil = async () => {
            const res = await callGetCoucil()
            if (res) {
                setExplanation(res.data.payload.items.length)
            }
        }
        const getAcceptanceCoucil = async () => {
            const res = await callGetAcceptance()
            if (res) {
                setAcceptance(res.data.payload.items.length)
            }
        }

        getStudentAmount()
        getLecturer()
        getExplanationCoucil()
        getAcceptanceCoucil()
    }, [])
    return (
        <div className="admin-dashboard-container">
            <div className="admin-dashboard-page">
                <div className="admin-dashboard-1">
                    <Row gutter={16} style={{ marginBottom: 20 }}>
                        <Col span={12}>
                            <Card bordered={true}>
                                <Statistic
                                    title="Sinh viên"
                                    value={amoutStudent}
                                    precision={0}
                                    valueStyle={{
                                        color: '#3f8600',
                                    }}
                                    prefix={<UserOutlined />}
                                    suffix="sinh viên"
                                />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card bordered={true}>
                                <Statistic
                                    title="Giảng viên"
                                    value={lecturer}
                                    precision={0}
                                    valueStyle={{
                                        color: '#3f8600',
                                    }}
                                    prefix={<UserOutlined />}
                                    suffix="giảng viên"
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card bordered={true}>
                                <Statistic
                                    title="Hội đồng thuyết minh"
                                    value={explanation}
                                    precision={0}
                                    valueStyle={{
                                        color: '#3f8600',
                                    }}
                                    prefix={<UserOutlined />}
                                    suffix="hội đồng thuyết minh"
                                />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card bordered={true}>
                                <Statistic
                                    title="Hội đồng nghiệm thu"
                                    value={acceptance}
                                    precision={0}
                                    valueStyle={{
                                        color: '#3f8600',
                                    }}
                                    prefix={<UserOutlined />}
                                    suffix="hội đồng nghiệm thu"
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard