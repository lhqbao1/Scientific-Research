import { Button, Form, Input, Modal, Select, DatePicker, notification } from "antd"
import { callCreateNotification, callCreateNotificationAddFileExplanation, callGetNotification, callGetNotificationAddFileExplanation, callGetNotificationStartReport } from "../../../../services/api";
const { RangePicker } = DatePicker;

const ModalCreateNotificationStartReport = (props) => {
    const { openModalCreateNotificationStartReport, setOpenModalCreateNotificationStartReport } = props
    const [form] = Form.useForm()

    const rangeConfig = {
        rules: [
            {
                type: 'array',
                required: true,
                message: 'Please select time!',
            },
        ],
    };
    const handleCancel = () => {
        setOpenModalCreateNotificationStartReport(false)
    }

    const onFinish = async (values) => {
        const getExist = await callGetNotificationStartReport()
        let existNoti = getExist?.data?.payload?.items
        let start = values.rangeTime[0].$d.getTime()
        let end = values.rangeTime[1].$d.getTime()

        let create = true
        if (existNoti.length === 0) {
            create = true
        }

        for (let i = 0; i < existNoti.length; i++) {
            let type = ''
            if (values.phase === 'đợt 1') {
                type = 'Bắt đầu nghiệm thu đợt 1'
            }
            if (values.phase === 'đợt 2') {
                type = 'Bắt đầu nghiệm thu đợt 2'
            }
            if (existNoti[i].type === type) {
                create = false;
                break;
            }
        }

        if (create === true) {
            if (start, end) {
                let type = ''
                if (values.phase === 'đợt 1') {
                    type = 'Bắt đầu nghiệm thu đợt 1'
                }
                if (values.phase === 'đợt 2') {
                    type = 'Bắt đầu nghiệm thu đợt 2'
                }
                const res = await callCreateNotificationAddFileExplanation(values.name, values.content, start, end, type)
                if (res.data.payload) {
                    notification.success({
                        message: 'Tạo thông báo thành công',
                        duration: 2
                    })
                    form.resetFields()
                    setOpenModalCreateNotificationStartReport(false)
                }
            } else {
                notification.error({
                    message: 'Chưa chọn thời hạn',
                    duration: 2
                })
            }
        } else {
            notification.error({
                message: `Thông báo ${values.phase} đã được tạo, hãy dùng chức năng chỉnh sửa!`,
                duration: 2
            })
        }


    };


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <>
            <Modal title="Tạo thông báo bắt đầu nghiệm thu"
                open={openModalCreateNotificationStartReport}
                onCancel={handleCancel}
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
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    fields={[
                        {
                            name: ["name"],
                            value: 'Thông báo bắt đầu nghiệm thu',
                        },
                    ]}
                >
                    <Form.Item
                        label="Tiêu đề"
                        name="name"
                    >
                        <Input disabled={true} />
                    </Form.Item>

                    <Form.Item
                        label="Đợt"
                        name="phase"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy nhập đợt thông báo!',
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
                                    value: 'đợt 1',
                                    label: 'Đợt 1',
                                },
                                {
                                    value: 'đợt 2',
                                    label: 'Đợt 2',
                                },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Nội dung"
                        name="content"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy nhập nội dung!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Chọn thời hạn"
                        name="rangeTime"
                        {...rangeConfig}
                    >
                        <RangePicker
                            showTime={{
                                format: 'HH:mm',
                            }}
                            format="YYYY-MM-DD HH:mm"
                        />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 0,
                            span: 24,
                        }}
                    >
                        <Button style={{ marginTop: 20 }} type="primary" htmlType="submit">
                            Tạo thông báo
                        </Button>
                    </Form.Item>
                </Form>

            </Modal>
        </>
    )
}

export default ModalCreateNotificationStartReport