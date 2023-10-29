import { UploadOutlined } from "@ant-design/icons"
import { Button, Form, Modal, notification, Upload } from "antd"
import { useState } from "react"
import { callUpdateTopicStatus, callUploadPresentFile } from "../../../../../services/api"

const ModalAddFileAcceptance = (props) => {
    const { isOpenAddAcceptance, setIsOpenAddAcceptance, topicInfo } = props
    const [pdfFile, setPdfFile] = useState()
    const [form] = Form.useForm()

    const handleCancel = () => {
        setIsOpenAddAcceptance(false)
    }
    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };
    const onFinish = async (values) => {
        let file = values.presentFile.file.originFileObj
        const res = await callUploadPresentFile(file.name, pdfFile, "acceptance", topicInfo.topic_id)
        if (res) {
            const updateTopic = await callUpdateTopicStatus(topicInfo.topic_id, 9)
            notification.success({
                message: 'Tải file đơn xin nghiệm thu thành công',
                duration: 2
            })
            setPdfFile(null)
            setIsOpenAddAcceptance(false)
            form.resetFields()
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const chooseFile = (e) => {
        let file = e.file.originFileObj
        if (file) {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                console.log('check file', e.target.result)
                setPdfFile(e.target.result)
            }
        } else {
            setPdfFile(null)
        }
    }
    return (
        <>
            <Modal title="Nộp file đơn xin nghiệm thu (PDF)"
                open={isOpenAddAcceptance}
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                maskClosable={false}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 1000,
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
                        // label="File thuyết minh (pdf)"
                        name="presentFile"

                    >
                        <Upload
                            accept='application/pdf'
                            customRequest={dummyRequest}
                            onChange={chooseFile}
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
                            Tải lên
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default ModalAddFileAcceptance