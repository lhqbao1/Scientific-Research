import { Button, Form, Input, message, Modal, Select, Space } from "antd"
import { useEffect, useState } from "react";
import { callCreateLecturer, callCreateUser, callGetWorkPlace } from "../../../services/api";

const AddLecturer = (props) => {
    const { openModalAdd, setOpenModalAdd } = props
    const [form] = Form.useForm();
    const [workplace, setWorkplace] = useState([])
    const [workplaceSelected, setWorkplaceSelected] = useState('')



    useEffect(() => {
        getWorkPlace()
    }, [])

    const handleCancel = () => {
        setOpenModalAdd(false);
        form.resetFields()
    };

    const getWorkPlace = async () => {
        const res = await callGetWorkPlace()
        console.log(res.data.payload.items)
        if (res) {
            setWorkplace(res.data.payload.items)
        }
    }

    const onFinish = async (values) => {
        // form.resetFields()
        const resUser = await callCreateUser(values.lecturer_email, '123456', 'lecturer')
        if (resUser) {
            let userID = resUser?.data?.payload?.id
            const resLecturer = await callCreateLecturer(userID, values.lecturer_name, values.lecturer_position, values.lecturer_title, values.lecturer_email, workplaceSelected)
            console.log(resLecturer)
        }
        form.resetFields()
        message.success('Tạo tài khoản giảng viên thành công')
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleChange = (value) => {
        setWorkplaceSelected(value)
        // console.log(`selected ${value}`);
    };
    return (
        <div>
            <Modal
                title="Thêm giảng viên"
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
                        marginTop: 30
                    }}
                    initialValues={{
                        remember: true,
                    }}

                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên giảng viên"
                        name="lecturer_name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Chức danh"
                        name="lecturer_title"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Chức vụ"
                        name="lecturer_position"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="lecturer_email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Nơi công tác"
                        name="lecturer_workplace"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Select
                            // defaultValue="lucy"
                            style={{
                                width: 235,
                            }}
                            onChange={handleChange}
                        >
                            {workplace.map((item, index) => {
                                return (
                                    <Option value={item.id} label={item.id}>
                                        <Space>

                                            {item.workplace_name}
                                        </Space>
                                    </Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 17,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Thêm giảng viên
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default AddLecturer