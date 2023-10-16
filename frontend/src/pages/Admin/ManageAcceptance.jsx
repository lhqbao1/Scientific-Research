import { Button, Card, Col, Form, Input, message, Modal, Row, Select } from "antd"
import { useForm } from "antd/es/form/Form"
import { useState } from "react"
import { useEffect } from "react"
import { callCreateCoucil, callGetAcceptance, callGetCoucil } from "../../../services/api"

const ManageAcceptance = (props) => {
    const [coucil, setCoucil] = useState([])

    const showModal = () => {
        setIsModalOpen(true);
    };

    useEffect(() => {
        getAcceptanceBoard()
    }, [])

    const getAcceptanceBoard = async () => {
        const res = await callGetAcceptance()
        if (res) {
            setCoucil(res?.data?.payload?.items)
            console.log('aschecekdmsa', res.data.payload.items)
        }
    }





    return (
        <>
            <h2 style={{ marginLeft: 35 }}>Các hội đồng nghiệm thu</h2>
            <Button style={{ marginLeft: 35, marginBottom: 20 }} type='primary' onClick={showModal}>Tạo hội đồng mới</Button>

            <Row>
                {/* <Col span={4}></Col> */}
                {/* <Col span={16} > */}
                {coucil.map((coucil, index) => {
                    return (
                        <Col span={11} style={{ border: '0px solid black', marginBottom: 30, marginLeft: 35, padding: 10, borderRadius: '0% 0% 0% 0% / 0% 0% 0% 0%', boxShadow: '5px 5px  5px 6px  rgba(0,0,0,.15)', }}>
                            <Row>
                                <Col span={18}>
                                    <div style={{ fontSize: 15, marginBottom: 10 }}>{coucil.name} ({coucil.phase})</div>
                                </Col>
                            </Row>
                            <Row>
                                <div style={{ fontSize: 15, marginBottom: 10 }}>Các thành viên của hội đồng:</div>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12} style={{ marginBottom: 17 }}>
                                    <Card title={coucil?.presidentInfo?.lecturer_name ? coucil?.presidentInfo?.lecturer_name : 'chưa có'} bordered={false}>
                                        Chủ tịch hội đồng
                                    </Card>
                                </Col>
                                <Col span={12} style={{ marginBottom: 17 }}>
                                    <Card title={coucil?.secretaryInfo?.lecturer_name ? coucil?.secretaryInfo?.lecturer_name : 'chưa có'} bordered={false}>
                                        Thư ký
                                    </Card>
                                </Col>
                                <Col span={12} style={{ marginBottom: 17 }}>
                                    <Card title={coucil?.couterInfo?.lecturer_name ? coucil?.couterInfo?.lecturer_name : 'chưa có'} bordered={false}>
                                        Phản biện
                                    </Card>
                                </Col>
                                {coucil.commissioners.map((com, index) => {
                                    return (
                                        <Col span={12} style={{ marginBottom: 17 }}>
                                            <Card title={com?.lecturerInfo?.lecturer_name} bordered={false}>
                                                Ủy viên
                                            </Card>
                                        </Col>
                                    )
                                })}


                            </Row>


                        </Col>
                    )
                })}
                {/* </Col> */}
            </Row>



        </>
    )
}

export default ManageAcceptance