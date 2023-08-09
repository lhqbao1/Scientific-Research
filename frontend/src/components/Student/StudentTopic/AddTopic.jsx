import { Button, Col, Form, Input, Row } from "antd"

const AddTopic = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <div style={{ backgroundColor: '#efefef', marginLeft: -8, marginRight: -8, marginTop: 8 }}>
                <div style={{ minHeight: 570 }}>
                    <Row>
                        <Col span={5}></Col>
                        <Col span={14} style={{ height: '50%', backgroundColor: 'white', borderRadius: 10, padding: 15, fontSize: 14 }}>
                            <div>
                                <h3>ĐĂNG KÝ ĐỀ TÀI NGHIÊN CỨU KHOA HỌC</h3>
                                <Form
                                    name="basic"
                                    labelCol={{
                                        span: 7,
                                    }}
                                    wrapperCol={{
                                        span: 12,
                                    }}
                                    style={{
                                        maxWidth: 600,
                                    }}
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        label="Tên đề tài"
                                        name="topic_name"
                                        rules={[
                                            {
                                                message: 'Please input your username!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Lĩnh vực của đề tài"
                                        name="topic_area"
                                        rules={[
                                            {
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Chủ nhiệm đề tài (MSSV)"
                                        name="topic_manager"
                                        rules={[
                                            {
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Miêu tả cơ bản về đề tài"
                                        name="topic_description"
                                        rules={[
                                            {
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                    >
                                        <Input.TextArea />
                                    </Form.Item>

                                    <Form.Item
                                        wrapperCol={{
                                            offset: 7,
                                            span: 16,
                                        }}
                                    >
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
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

export default AddTopic