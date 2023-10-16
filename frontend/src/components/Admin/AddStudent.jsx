import { Button, Form, Input, Modal, Select, Space } from "antd"
import { useState } from "react";
import { useEffect } from "react";
import { callGetMajors } from '../../../services/api'

const AddStudent = (props) => {
    const { openModalAdd, setOpenModalAdd } = props
    const [majorInfo, setMajorInfo] = useState([])
    const [form] = Form.useForm();



    useEffect(() => {
        const getMajors = async () => {
            const res = await callGetMajors()
            setMajorInfo(res?.data?.payload?.items)
        }

        getMajors()
    }, [])

    const handleCancel = () => {
        setOpenModalAdd(false);
        form.resetFields()
    };

    const onFinish = (values) => {
        console.log('Success:', values);
        form.resetFields()

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            <Modal
                title="Thêm sinh viên"
                open={openModalAdd}
                onCancel={handleCancel}
                maskClosable={false}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    style={{
                        maxWidth: 800,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên sinh viên"
                        name="student_name"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa nhập tên sinh viên!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Lớp học"
                        name="student_class"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa nhập lớp học của sinh viên!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Mã số sinh viên"
                        name="student_code"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa nhập mã số sinh viên!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="student_email"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa nhập email của sinh viên!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Niên khóa"
                        name="student_grade"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa nhập niên khóa của sinh viên!',
                            },
                        ]}
                    >
                        <Select
                            // defaultValue="lucy"
                            style={{
                                width: 120,
                            }}
                            options={[
                                {
                                    value: 'K44',
                                    label: 'K44',
                                },
                                {
                                    value: 'K45',
                                    label: 'K45',
                                },
                                {
                                    value: 'K46',
                                    label: 'K46',
                                },
                                {
                                    value: 'K47',
                                    label: 'K47',
                                },
                                {
                                    value: 'K48',
                                    label: 'K48',
                                },
                                {
                                    value: 'K49',
                                    label: 'K49',
                                },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Chuyên nghành"
                        name="student_major"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa chuyên nghành của sinh viên!',
                            },
                        ]}
                    >
                        <Select
                            // defaultValue="lucy"
                            style={{
                                width: 315,
                            }}
                        // onChange={handleChange}
                        >
                            {majorInfo.map((item, index) => {
                                return (
                                    <Option value={item.major_id} label={item.major_id}>
                                        <Space>
                                            {item.major_name}
                                        </Space>
                                    </Option>
                                )
                            })}
                        </Select>
                    </Form.Item>




                    <Form.Item
                        wrapperCol={{
                            offset: 17,
                            span: 24,
                        }}
                    >
                        <Button type="primary" htmlType="submit" >
                            Thêm sinh viên
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default AddStudent