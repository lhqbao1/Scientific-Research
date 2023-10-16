import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Modal, notification, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { callSendEmailApproveReport, callUpdateTopicStatusBulkTrue } from "../../../services/api";

const ModalApproveTopicReport = (props) => {
    const { openModalApproveTopicReport, setOpenModalApproveTopicReport, selectTopics, setSelectTopics } = props
    const [file, setFile] = useState()
    const [fileList, setFileList] = useState()
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const handleSendNotification = async (values) => {
        setLoading(true)
        let arrEmail = []
        let arrTopic = []
        let contentModify = ''
        if (selectTopics) {
            selectTopics.map(topic => {
                arrTopic.push(topic.topic_id)
                topic.student.map(student => {
                    if (student.role === 'chủ nhiệm đề tài') {
                        arrEmail.push(student.email)
                    }
                })
            })
        }
        contentModify = values.content.replaceAll("\n", '<br/>')
        if (file) {
            const res = await callSendEmailApproveReport(arrEmail, values.title, contentModify, file)
            if (res) {
                const status = await callUpdateTopicStatusBulkTrue(arrTopic, 12)
                notification.success({
                    message: 'Gửi thông báo đến các chủ nhiệm đề tài thành công',
                    duration: 2
                })
                form.resetFields()
                setOpenModalApproveTopicReport(false)
                setLoading(false)
            }
        } else {
            notification.error({
                message: 'Bạn chưa chọn file',
                duration: 2
            })
        }


    }


    const handleCancelNotification = () => {
        setOpenModalApproveTopicReport(false)
        form.resetFields()
    }

    const chooseFile = (e) => {
        let file = e.file.originFileObj
        if (file) {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                console.log('check file', e.target.result)
                setFile(e.target.result)
            }
            setFileList(e.fileList)
        } else {
            setFileList([])
            notification.error({
                message: 'File phải ở định dạng csv',
                duration: 2
            })
            setFile(null)
        }

    }


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Modal title='Quyết định thông qua nghiệm thu đề tài sinh viên' open={openModalApproveTopicReport}
                okText='Gửi thông báo'
                cancelText='Xem xét'
                onCancel={handleCancelNotification}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}

            >
                <div
                    style={{ marginBottom: 30 }}>
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
                        onFinish={handleSendNotification}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Tiêu đề"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập tiêu đề email!',
                                },
                            ]}
                        >
                            <TextArea />
                        </Form.Item>

                        <Form.Item
                            label="Nội dung"
                            name="content"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập nội dung email!',
                                },
                            ]}
                        >
                            <TextArea
                                style={{
                                    height: 120,
                                }}
                            />
                        </Form.Item>
                        <Upload
                            customRequest={dummyRequest}
                            onChange={chooseFile}
                            fileList={fileList}
                            accept='application/pdf'
                        >
                            <Button
                                icon={<UploadOutlined />}  >
                                File quyết định
                            </Button>
                        </Upload>
                        <Form.Item
                            wrapperCol={{
                                offset: 0,
                                span: 16,
                            }}
                        >
                            <Button style={{ marginTop: 30 }}
                                type="primary" htmlType="submit" loading={loading}>
                                Gửi thông báo
                            </Button>
                        </Form.Item>
                    </Form>

                </div>



            </Modal>
        </>
    )
}

export default ModalApproveTopicReport