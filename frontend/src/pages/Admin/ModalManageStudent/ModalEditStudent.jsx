import { Button, Form, Input, Modal, notification } from "antd"
import { callUpdateStudentInfo } from "../../../../services/api";

const ModalEditStudent = (props) => {
    const { openModalEdit, setOpenModalEdit, choosedStudent, reload, setReload } = props

    const handleCancel = () => {
        setOpenModalEdit(false)
    };

    const onFinish = async (values) => {
        const res = await callUpdateStudentInfo(choosedStudent.student_id, values.student_name, values.student_code, values.grade, values.email)
        if (res) {
            notification.success({
                message: 'Cập nhật thông tin sinh viên thành công',
                duration: 2
            })
            setReload(!reload)
            setOpenModalEdit(false)
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Modal title="Sửa thông tin sinh viên"
                open={openModalEdit}
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                maskClosable={false}
            >
                <Form
                    name="basic"
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
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
                    fields={[
                        {
                            name: ["student_name"],
                            value: choosedStudent?.student_name,
                        },
                        {
                            name: ["student_code"],
                            value: choosedStudent?.student_code,
                        },
                        {
                            name: ["email"],
                            value: choosedStudent?.email,
                        },
                        {
                            name: ["grade"],
                            value: choosedStudent?.grade,
                        },
                    ]}
                >
                    <Form.Item
                        label="Tên sinh viên"
                        name="student_name"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập tên sinh viên',
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
                                message: 'Nhập mã số sinh viên',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập email',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Niên khóa"
                        name="grade"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập niên khóa',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 0,
                            span: 0,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Sửa thông tin
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default ModalEditStudent