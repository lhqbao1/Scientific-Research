import { UploadOutlined } from "@ant-design/icons"
import { Button, Col, Descriptions, Form, Input, message, Row, Upload } from "antd"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { callGetLecturerById, callGetTopicById, callUploadPresentFile } from "../../../../services/api"
import { Document, Page, pdfjs } from 'react-pdf';
// import pdfFile from './test.pdf'





// pdfjs.GlobalWorkerOptions.workerSrc = //unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js;
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;




const Topic = () => {
    const [topicInfo, setTopicInfo] = useState([])
    const [lecturerInfo, setLecturerInfo] = useState([])
    const topicId = useSelector(state => state.student.user.topic_id)
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const fileType = ['application/pdf']
    const [pdfFile, setPdfFile] = useState()

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }


    useEffect(() => {
        getTopicInfo()
    }, [topicId])

    const getTopicInfo = async () => {
        const resTopicInfo = await callGetTopicById(topicId)
        setTopicInfo(resTopicInfo?.data?.payload)
        const resLecturer = await callGetLecturerById(resTopicInfo?.data?.payload?.lecturer_id)
        setLecturerInfo(resLecturer?.data?.payload)
    }

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };
    const props = {
        // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange({ file, fileList }) {
            if (file.status !== 'uploading') {
                console.log(file, fileList);
            }
        },
        // defaultFileList: [
        //     {
        //         uid: '1',
        //         name: 'xxx.png',
        //         status: 'uploading',
        //         url: 'file:///Users/luongbao/Downloads/cb12b31a-5a12-49d1-9a3e-aaad3cd32940.pdf',
        //         percent: 33,
        //     },
        //     {
        //         uid: '2',
        //         name: 'yyy.png',
        //         status: 'done',
        //         url: 'cb12b31a-5a12-49d1-9a3e-aaad3cd32940.pdf',
        //     },
        //     {
        //         uid: '3',
        //         name: 'zzz.png',
        //         status: 'error',
        //         response: 'Server Error 500',
        //         // custom error message to show
        //         url: 'file:///Users/luongbao/Downloads/cb12b31a-5a12-49d1-9a3e-aaad3cd32940.pdf',
        //     },
        // ],
    };

    const items = [
        {
            key: '1',
            label: 'Tên đề tài',
            children: topicInfo.topic_name,
            span: '16'
        },
        {
            key: '2',
            label: 'Lĩnh vực nghiên cứu',
            children: topicInfo.research_area,
            span: '16'
        },
        {
            key: '3',
            label: 'Mô tả cơ bản',
            children: topicInfo.basic_description,
            span: '16'
        },
        {
            key: '4',
            label: 'Giáo viên hướng dẫn',
            children: topicInfo.lecturer_id ? lecturerInfo?.degree + ' ' + lecturerInfo.lecturer_name : 'Chưa có giáo viên hướng dẫn',
            span: '16'
        }
        , {
            key: '5',
            label: 'File thuyết minh',
            children:
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>,
            span: '16'
        }

    ]

    const chooseFile = (e) => {
        // if (file.status !== 'uploading') {
        //     console.log(file, fileList);
        // }
        // let file = e.target.files[0]

    }





    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    const handleSaveFile = (e) => {
        console.log('jeje', e)
    }

    const onFinish = async (values) => {
        let file = values.presentFile.file.originFileObj
        console.log('file1', file)
        if (file && fileType.includes(file.type)) {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                console.log('check file', e.target.result)

                setPdfFile(e.target.result)
            }

        } else {
            setPdfFile(null)
        }
        console.log('asd', pdfFile)
        const res = await callUploadPresentFile(file.name, pdfFile, 'thesis', topicInfo.topic_id)
        console.log('res', res)


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
                            {/* <div>
                                <h3>THÔNG TIN ĐỀ TÀI CỦA BẠN</h3>

                                <Descriptions bordered items={items} />
                            </div> */}
                            <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                                <Page pageNumber={pageNumber}></Page>
                            </Document>
                        </Col>
                        <Col onSubmit={handleSaveFile} span={5}>
                            <Form
                                name="basic"
                                labelCol={{
                                    span: 8,
                                }}
                                wrapperCol={{
                                    span: 16,
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
                                    label="File thuyết minh"
                                    name="presentFile"
                                // rules={[
                                //     {
                                //         required: true,
                                //         message: 'Please input your username!',
                                //     },
                                // ]}
                                >
                                    <Upload
                                        customRequest={dummyRequest}
                                        onChange={chooseFile}
                                    >
                                        <Button icon={<UploadOutlined />}  >
                                            Choose file
                                        </Button>
                                    </Upload>
                                </Form.Item>




                                <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>

                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default Topic