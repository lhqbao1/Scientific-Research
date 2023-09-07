import { UploadOutlined } from "@ant-design/icons"
import { Button, Col, Descriptions, Form, Input, message, Row, Upload } from "antd"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { callGetFileWithTopic, callGetLecturerById, callGetTopicById, callGetTopicStatus, callUpdateTopic, callUpdateTopicStatus, callUploadPresentFile } from "../../../../services/api"
import { Document, Page, pdfjs } from 'react-pdf';
import "react-pdf/dist/esm/Page/TextLayer.css";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'

// import "react-pdf/dist/esm/Page/TextLayer.css";
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
    const [fileTypeUpload, setFileTypeUpload] = useState('thesis')
    const [hasFile, setHasFile] = useState(false)
    const [thesisFile, setThesisFile] = useState([])
    const [status, setStatus] = useState('')

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }


    useEffect(() => {
        getTopicInfo()
        getFile()
    }, [topicId, pdfFile])

    const getTopicInfo = async () => {
        const resTopicInfo = await callGetTopicById(topicId)
        setTopicInfo(resTopicInfo?.data?.payload)
        const resLecturer = await callGetLecturerById(resTopicInfo?.data?.payload?.lecturer_id)
        setLecturerInfo(resLecturer?.data?.payload)
    }



    const getFile = async () => {
        const res = await callGetFileWithTopic(topicId)
        if (res.data.payload.items.length > 0) {
            let fileData = res.data.payload.items
            fileData.map(item => {
                setThesisFile(item)
            })
            setHasFile(true)
        }
    }

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const onFinish = async (values) => {
        let file = values.presentFile.file.originFileObj
        if (thesisFile.file_url === pdfFile) {
            message.error('Bản thuyết minh đã được tải lên!')
        } else {
            const res = await callUploadPresentFile(file.name, pdfFile, fileTypeUpload, topicInfo.topic_id)
            if (res) {
                const updateTopic = await callUpdateTopicStatus(topicId, 4)
                message.success('Tải file thuyết minh thành công!')
                setPdfFile(null)
            }
        }

    };

    const seeFile = async (values) => {
        console.log('check file', thesisFile)
        if (thesisFile) {
            setPdfFile(thesisFile.file_url)
        } else {
            setPdfFile(null)
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const chooseFile = (e) => {
        // if (file.status !== 'uploading') {
        //     console.log(file, fileList);
        // }
        let file = e.file.originFileObj

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
    }





    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    const handleSaveFile = (e) => {
        console.log('jeje', e)
    }


    const props = {
        defaultFileList: [
            {
                uid: '1',
                name: thesisFile.file_name,
                status: 'done',
                url: thesisFile.file_url,
            },

        ],

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
                hasFile === false ?
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
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Đề tài của bạn chưa có file thuyết minh, tải lên?"
                            name="presentFile"

                        >
                            <Upload
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
                    :
                    <>
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
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={seeFile}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                // label="Bản thuyết minh đề tài của bạn "
                                name="presentFileExist"

                            >
                                <Upload
                                    {...props}>
                                    {/* <Button icon={<UploadOutlined />}>Upload</Button> */}

                                </Upload>
                            </Form.Item>




                            <Form.Item
                                wrapperCol={{
                                    offset: 0,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Xem file
                                </Button>
                                <Button type="dashed" style={{ marginLeft: 10 }} onClick={() => setPdfFile(null)} >
                                    Bỏ xem
                                </Button>
                            </Form.Item>
                        </Form>

                    </>
            ,
            span: '16'
        },
        {
            key: '6',
            label: 'Trạng thái',
            children: topicInfo?.status?.status,
            span: '16'
        }


    ]

    return (
        <>
            <div style={{ backgroundColor: '#efefef', marginLeft: -8, marginRight: -8, marginTop: 8 }}>
                <div style={{ minHeight: 570 }}>
                    <Row>
                        <Col span={5}></Col>
                        <Col span={14} style={{ height: '50%', backgroundColor: 'white', borderRadius: 10, padding: 15, fontSize: 14 }}>
                            <div>
                                <h3>THÔNG TIN ĐỀ TÀI CỦA BẠN</h3>

                                <Descriptions bordered items={items} />
                            </div>
                            <div style={{ marginLeft: 100 }}>

                                <Document
                                    file={pdfFile}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    noData={''}
                                    loading={''}
                                >
                                    <Page pageNumber={pageNumber} renderAnnotationLayer={true} renderTextLayer={true}></Page>

                                </Document>
                            </div>

                        </Col>
                        <Col onSubmit={handleSaveFile} span={5}>


                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default Topic