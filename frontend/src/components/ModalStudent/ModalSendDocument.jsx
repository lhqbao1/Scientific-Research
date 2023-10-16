import { UploadOutlined } from "@ant-design/icons"
import { Button, Form, Modal, notification, Upload } from "antd"
import { useState } from "react"
import { callBulkCreateFile, callUpdateTopicStatus } from "../../../services/api"

const ModalSendDocument = (props) => {
    const { openSendDocument, setOpenSendDocument, topicInfo } = props

    const [form] = Form.useForm()
    const [file1, setFile1] = useState()
    const [file2, setFile2] = useState()
    const [file3, setFile3] = useState()


    const handleCancelModal = () => {
        setOpenSendDocument(false)
        form.resetFields()
    }

    const handleSendDocument = async (values) => {
        let data = []
        let object1 = {}
        let object2 = {}
        let object3 = {}

        object1.file_name = values.file1.file.name
        object1.file_url = 'file1'
        object1.file_type = 'report-decide'
        object1.topic_id = topicInfo.topic_id


        object2.file_name = values.file2.file.name
        object2.file_url = 'file2'
        object2.file_type = 'report-finalreport'
        object2.topic_id = topicInfo.topic_id


        object3.file_name = values.file3.file.name
        object3.file_url = 'file3'
        object3.file_type = 'report-assessmentform'
        object3.topic_id = topicInfo.topic_id

        data.push(object1, object2, object3)

        const res = await callBulkCreateFile(data)
        if (res) {
            console.log(res)
            const status = await callUpdateTopicStatus(topicInfo.topic_id, 14)
            notification.success({
                message: 'Tạo file thành công',
                duration: 2
            })
            form.resetFields()
            setOpenSendDocument(false)
        }
    }

    const onFinishFailed = () => {
        console.log('jeje')
    }

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };
    const chooseFile = (e) => {
        let file = e.file.originFileObj
        if (file) {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                console.log('check file', e.target.result)
                setFile1(e.target.result)
            }
        } else {
            setFile1(null)
        }
    }
    const chooseFile2 = (e) => {
        let file = e.file.originFileObj
        if (file) {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                console.log('check file', e.target.result)
                setFile2(e.target.result)
            }
        } else {
            setFile2(null)
        }
    }
    const chooseFile3 = (e) => {
        let file = e.file.originFileObj
        if (file) {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                console.log('check file', e.target.result)
                setFile3(e.target.result)
            }
        } else {
            setFile3(null)
        }
    }
    return (
        <>
            <Modal title="Gửi hồ sơ nghiệm thu cho hội đồng"
                open={openSendDocument}
                onCancel={handleCancelModal}
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
                    onFinish={handleSendDocument}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="File quyết định nghiệm thu"
                        name="file1"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy tải file lên!',
                            },
                        ]}
                    >
                        <Upload
                            customRequest={dummyRequest}
                            onChange={chooseFile}
                            accept='application/pdf'
                        >
                            <Button icon={<UploadOutlined />}  >
                                Chọn file
                            </Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        label="File báo cáo tổng kết đề tài"
                        name="file2"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy tải file lên!',
                            },
                        ]}
                    >
                        <Upload
                            customRequest={dummyRequest}
                            onChange={chooseFile2}
                            accept='application/pdf'
                        >
                            <Button icon={<UploadOutlined />}  >
                                Chọn file
                            </Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        label="File phiếu nhận xét đánh giá kết quả đề tài sinh viên"
                        name="file3"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy tải file lên!',
                            },
                        ]}
                    >
                        <Upload
                            customRequest={dummyRequest}
                            onChange={chooseFile3}
                            accept='application/pdf'
                        >
                            <Button icon={<UploadOutlined />}  >
                                Chọn file
                            </Button>
                        </Upload>
                    </Form.Item>


                    <Form.Item
                        wrapperCol={{
                            offset: 0,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Sửa đề tài
                        </Button>
                    </Form.Item>
                </Form>

            </Modal>
        </>
    )
}

export default ModalSendDocument