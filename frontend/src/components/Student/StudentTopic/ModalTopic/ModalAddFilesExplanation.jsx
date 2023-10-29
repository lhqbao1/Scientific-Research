import { UploadOutlined } from "@ant-design/icons"
import { Button, Form, Modal, notification, Upload } from "antd"
import { useState } from "react"
import { callBulkCreateFile, callGetAllFileOfTopic, callGetFileWithTopic, callUpdateFile, callUpdateTopicStatus, callUploadPresentFile } from "../../../../../services/api"

const ModalAddFileExplanation = (props) => {
    const { openModalAddFileExplanation, setOpenModalAddFileExplanation, topicInfo } = props
    const [file1, setFile1] = useState()
    const [file2, setFile2] = useState()
    const [file3, setFile3] = useState()



    const handleCancel = () => {
        setOpenModalAddFileExplanation(false)
    }
    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };
    const onFinish = async (values) => {
        if (values.file1) {
            const resFile = await callGetFileWithTopic(topicInfo?.topic_id)
            let fileExplanation = resFile?.data?.payload?.items
            console.log(fileExplanation)

            const update = await callUpdateFile(fileExplanation[0]?.file_id, values?.file1?.file?.name, file1, 'explanation', topicInfo?.topic_id)
        }



        let fileArr = []
        let objectFile2 = {}
        let objectFile3 = {}

        objectFile2.file_name = values?.file2?.file?.name
        objectFile2.file_url = file2
        objectFile2.file_type = 'explantion-contract'
        objectFile2.topic_id = topicInfo?.topic_id

        objectFile3.file_name = values?.file3?.file?.name
        objectFile3.file_url = file3
        objectFile3.file_type = 'explantion-estimate'
        objectFile3.topic_id = topicInfo?.topic_id

        fileArr.push(objectFile2, objectFile3)



        const res = callBulkCreateFile(fileArr)
        if (res) {
            notification.success({
                message: 'Tải file thuyết minh thành công',
                duration: 2
            })
            setFile1(null)
            setFile2(null)
            setFile3(null)

            setOpenModalAddFileExplanation(false)
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const chooseFile1 = (e) => {
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
            <Modal title="Hồ sơ thuyết minh"
                open={openModalAddFileExplanation}
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
                        label="File thuyết minh đề tài nghiên cứu khoa học (pdf)"
                        name="file1"
                        rules={[
                            {
                                required: true,
                                message: 'Chọn file thuyết minh',
                            },
                        ]}
                    >
                        <Upload
                            accept='application/pdf'
                            customRequest={dummyRequest}
                            onChange={chooseFile1}
                        >
                            <Button icon={<UploadOutlined />}  >
                                Chọn file
                            </Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        label="File bản hợp đồng thực hiện nghiên cứu khoa học (pdf)"
                        name="file2"
                        rules={[
                            {
                                required: true,
                                message: 'Chọn file bản hợp đồng',
                            },
                        ]}
                    >
                        <Upload
                            accept='application/pdf'
                            customRequest={dummyRequest}
                            onChange={chooseFile2}
                        >
                            <Button icon={<UploadOutlined />}  >
                                Chọn file
                            </Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="File bản dự toán kinh phí thực hiện nghiên cứu khoa học (pdf)"
                        name="file3"
                        rules={[
                            {
                                required: true,
                                message: 'Chọn file bản dự toán',
                            },
                        ]}
                    >
                        <Upload
                            accept='application/pdf'
                            customRequest={dummyRequest}
                            onChange={chooseFile3}
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

export default ModalAddFileExplanation