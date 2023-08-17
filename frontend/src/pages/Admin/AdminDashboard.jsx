import { Card, Col, Row, Statistic } from 'antd'
import './AdminDashboard.scss'
import { ArrowDownOutlined, ArrowUpOutlined, UserOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import { callGetStudents } from '../../../services/api'
import { useState } from 'react'


const AdminDashboard = () => {
    const [amoutStudent, setAmoutStudent] = useState()

    const getStudentAmount = async () => {
        const res = await callGetStudents()
        if (res && res.data) {
            setAmoutStudent(res.data.payload.items.length)
        }
    }

    useEffect(() => {
        getStudentAmount()
    }, [])
    return (
        <div className="admin-dashboard-container">
            <div className="admin-dashboard-page">
                <div className="admin-dashboard-1">
                    <Row gutter={16} style={{ marginBottom: 20 }}>
                        <Col span={12}>
                            <Card bordered={true}>
                                <Statistic
                                    title="Students"
                                    value={amoutStudent}
                                    precision={0}
                                    valueStyle={{
                                        color: '#3f8600',
                                    }}
                                    prefix={<UserOutlined />}
                                    suffix="students"
                                />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card bordered={true}>
                                <Statistic
                                    title="Lecturer"
                                    value={100}
                                    precision={0}
                                    valueStyle={{
                                        color: '#3f8600',
                                    }}
                                    prefix={<UserOutlined />}
                                    suffix="Lecturers"
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card bordered={true}>
                                <Statistic
                                    title="Advisors"
                                    value={100}
                                    precision={0}
                                    valueStyle={{
                                        color: '#3f8600',
                                    }}
                                    prefix={<UserOutlined />}
                                    suffix="Advisors"
                                />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card bordered={true}>
                                <Statistic
                                    title="Council"
                                    value={100}
                                    precision={0}
                                    valueStyle={{
                                        color: '#3f8600',
                                    }}
                                    prefix={<UserOutlined />}
                                    suffix="Councils"
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