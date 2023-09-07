import { Button, Card, Col, Form, Input, message, Modal, Row, Select } from "antd"
import { useForm } from "antd/es/form/Form"
import { useState } from "react"
import { useEffect } from "react"
import { callCreateCoucil, callGetCoucil } from "../../../services/api"

const ManageExplanation = (props) => {
    const { openManageExplanation, setOpenManageExplanation, openManageLecturer, setOpenManageLecturer } = props
    const [coucil, setCoucil] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm()

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        getCoucil()
    }, [coucil])

    const getCoucil = async () => {
        const res = await callGetCoucil()
        if (res) {
            setCoucil(res?.data?.payload?.items)
            console.log(res.data.payload.items)
        }
    }

    const onFinish = async (values) => {
        const totalPhase = values.phase + ' ' + values.year

        console.log('Success:', values.coucil, totalPhase);
        const res = await callCreateCoucil(values.coucil, totalPhase)
        if (res) {
            form.resetFields()
            message.success('Tạo hội đồng thành công')
            setIsModalOpen(false);
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const navigateLecturer = () => {
        setOpenManageExplanation(false)
        setOpenManageLecturer(true)
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
                                <Col span={6}>
                                    <Button type="dashed" onClick={navigateLecturer} >Thêm thành viên</Button>

                                </Col>
                            </Row>
                            <Row>
                                <div style={{ fontSize: 15, marginBottom: 10 }}>Các thành viên của hội đồng:</div>
                            </Row>
                            <Row gutter={16}>
                                {coucil.lecturer.map((lecturer, index) => {
                                    return (
                                        // <Col span={10}>
                                        //     <div style={{ marginBottom: 5 }}>Tên: {lecturer.lecturer_name}</div>
                                        //     <div style={{ marginBottom: 5 }}>Chức vụ: {lecturer.explanationrole}</div>
                                        // </Col>
                                        <Col span={12} style={{ marginBottom: 17 }}>
                                            <Card title={lecturer.lecturer_name} bordered={false}>
                                                {lecturer.explanationrole}
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
            <Modal
                title="Tạo hội đồng mới"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                        marginTop: 20
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên hội đồng"
                        name="coucil"
                        rules={[
                            {
                                required: true,
                                message: 'Please input coucil name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Đợt"
                        name="phase"
                        rules={[
                            {
                                required: true,
                                message: 'Please input phase!',
                            },
                        ]}
                    >
                        <Select
                            style={{
                                width: 120,
                            }}
                            onChange={handleChange}
                            options={[
                                {
                                    value: 'Đợt 1',
                                    label: 'Đợt 1',
                                },
                                {
                                    value: 'Đợt 2',
                                    label: 'Đợt 2',
                                },

                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Năm"
                        name="year"
                        rules={[
                            {
                                required: true,
                                message: 'Please input year!',
                            },
                        ]}
                    >
                        <Select
                            style={{
                                width: 120,
                            }}
                            onChange={handleChange}
                            options={[
                                {
                                    value: 'năm 2023',
                                    label: '2023',
                                },
                                {
                                    value: 'năm 2024',
                                    label: '2024',
                                },

                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 16,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Tạo hội đồng
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default ManageExplanation