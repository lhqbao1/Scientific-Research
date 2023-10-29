import { CaretLeftOutlined, CaretRightOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Card, Col, Collapse, Descriptions, Form, Input, InputNumber, Modal, notification, Row, Select, Space, Table, Tag, Upload } from 'antd'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { callCheckExistedTranscript, callCreateExplanationTranscript, callCreateTranscriptScore, callGetExplanationByid, callGetExplanationCoucilById, callGetLecturerById, callGetTopicStudent, callGetTopicWithExplanation, callGetTranscriptByTopicId, callUpdateTopicStatus, callUpdateTranscriptScore, callUpdateTranscriptStatus } from '../../../services/api'
import './LecturerExplanationBoard.scss'
import { Buffer } from 'buffer';
import "react-pdf/dist/esm/Page/TextLayer.css";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import { Document, Page, pdfjs } from 'react-pdf';
import ColumnGroup from 'antd/es/table/ColumnGroup'
import Column from 'antd/es/table/Column'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;


const LecturerExplanationBoard = () => {
    const [lecturerTopic, setLecturerTopic] = useState([])
    const [pdfFile, setPdfFile] = useState()
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpenTranscript, setIsOpenTranscript] = useState(false);
    const [topicId, setTopicId] = useState('')
    const [formTranscript] = Form.useForm()
    const [hasTranscript, setHasTranscript] = useState(false)
    const [topicList, setTopicList] = useState([])
    const [hasRole, setHasRole] = useState(false)
    const [isModalAccOpen, setIsModalAccOpen] = useState(false)
    const [dataTranscript, setDataTranscript] = useState([])
    const [choosedTopic, setChoosedTopic] = useState()
    const [topicApprove, setTopicApprove] = useState()
    const [explanationBoard, setExplanationBoard] = useState()



    const lecturerId = useSelector(state => state?.lecturer?.user?.lecturer_id)
    const lecturer = useSelector(state => state?.lecturer?.user)

    useEffect(() => {
        const callGetTopic = async () => {
            const res = await callGetLecturerById(lecturerId)
            console.log('check res', res.data.payload)
            let topicData = []
            let data = res?.data?.payload?.lecturer
            let dataCommissioner = res?.data?.payload?.commissioner
            if (data?.presidentInfo?.length > 0) {
                // setHasRole(true)
                data?.presidentInfo.map(presidentInfo => {
                    if (presidentInfo.type === 'hội đồng thuyết minh') {
                        presidentInfo?.topicInfo.map(topicInfo => {
                            topicInfo.role = 'Chủ tịch hội đồng'
                            topicData.push(topicInfo)
                        })
                    }
                })
            }
            if (data?.secretaryInfo?.length > 0) {
                // setHasRole(true)
                data?.secretaryInfo.map(secretaryInfo => {
                    if (secretaryInfo.type === 'hội đồng thuyết minh') {
                        secretaryInfo?.topicInfo.map(topicInfo => {
                            topicInfo.role = 'Thư ký'
                            topicData.push(topicInfo)
                        })
                    }
                })
            }
            if (dataCommissioner.length > 0) {
                dataCommissioner.map(data => {
                    // console.log('cjeck maspdpasd', data)
                    data?.boardInfo?.topicInfo.map(topic => {
                        topic.role = 'Ủy viên'
                        topicData.push(topic)
                    })
                })

            }


            setTopicList(topicData)
            console.log('check dataasdasdasd', topicData)

        }


        callGetTopic()
    }, [])






    const props = {
        defaultFileList: [
            {
                uid: '1',
                name: 'thesisFile.file_name',
                status: 'done',
                url: 'thesisFile.file_url',
            },

        ],
    };

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    const getFileUrl = (file_url) => {
        let fileBase64 = new Buffer(file_url, 'base64').toString('binary')
        console.log('check buffer', fileBase64)
        setIsModalOpen(true);
        setPdfFile(fileBase64)
    };


    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const prevPage = () => {
        setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1)
    }
    const nextPage = () => {
        setPageNumber(pageNumber + 1 >= numPages ? pageNumber : pageNumber + 1)
    }

    // const checkExistTranscript = async () => {
    //     console.log('asdasdasd', checkExist.data.payload)
    //     if (checkExist.data.payload.length > 0) {
    //         setHasTranscript(true)
    //     }
    // }

    const openTranscript = async (topic) => {

        topic.student.map(student => {
            if (student.role === 'chủ nhiệm đề tài') {
                topic.topic_manager = student.student_name
            }
        })

        setChoosedTopic(topic)
        if (topic.student.length < 1) {
            notification.error({
                message: 'Đề tài phải có ít nhất 1 thành viên'
            })
        } else {
            const checkExist = await callCheckExistedTranscript(lecturerId, topic.topic_id)

            if (checkExist.data.payload.length > 0) {
                notification.error({
                    message: 'Bạn đã chấm điểm cho đề tài này',
                    // description: ``,
                    duration: 2
                })
            } else {
                setIsOpenTranscript(true)
                setTopicId(topic?.topic_id)
            }
        }

    }

    const handleCreateTranscript = () => {
        setIsOpenTranscript(false);
    };


    const handleCancelTranscript = () => {
        setIsOpenTranscript(false);
        formTranscript.resetFields()
    };

    const createTranscript = async (values) => {
        const score = await callCreateTranscriptScore(values.grade1, values.grade2, values.grade3, values.grade4, values.grade5, values.grade6, values.grade7, values.grade8, 'nghiệm thu')
        let total = values.grade1 + values.grade2 + values.grade3 + values.grade4 + values.grade5 + values.grade6 + values.grade7 + values.grade8
        // // console.log(total)
        const res = await callCreateExplanationTranscript(values.comment, total, lecturerId, topicId, 'thuyết minh', 1)
        const scoreupdate = await callUpdateTranscriptScore(res?.data?.payload.id, score?.data?.payload?.id)

        if (res && scoreupdate) {
            setIsOpenTranscript(false)
            formTranscript.resetFields()
            notification.success({
                message: `Bạn đã cho đề tài ${choosedTopic?.topic_name} ${total} điểm`,
                duration: 2
            })
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleGetScore = (score) => {
        console.log(score)
    }

    const handleGetTranscript = async (topic) => {
        if (topic) {
            setTopicApprove(topic)
            setIsModalAccOpen(true)
            const res = await callGetTranscriptByTopicId(topic?.topic_id)
            setDataTranscript(res?.data?.payload)
            const board = await callGetExplanationCoucilById(topic?.explanationboard)
            let boardInfo = board?.data?.payload?.items
            console.log(topic)

            setExplanationBoard(boardInfo)
        }
    }
    const handleCancelAcc = () => {
        setIsModalAccOpen(false)
    }

    const getTotal = () => {

    }


    const data = [
        {
            key: (
                <div style={{ textAlign: 'center' }}>1</div>
            ),
            content: (
                <div style={{ textAlign: 'left' }}>Tổng quan tình hình nghiên cứu thuộc lĩnh vực đề tài</div>
            ),
            maxgrade: (
                <div style={{ textAlign: 'center' }}>10</div>
            ),
            action: (
                <Form.Item
                    name="grade1"
                    rules={[{ required: true, message: "Bạn chưa nhập điểm" }]}
                >
                    <InputNumber min={1} max={10} style={{ width: 100, marginTop: 25 }}
                    />
                    {/* <Input style={{ width: 150, marginTop: 25 }} /> */}
                </Form.Item>
            ),
        },
        {
            key: (
                <div style={{ textAlign: 'center' }}>2</div>
            ),
            content: (
                <div style={{ textAlign: 'left' }}>Tính cấp thiết của đề tài</div>
            ),
            maxgrade: (
                <div style={{ textAlign: 'center' }}>15</div>
            ),
            action: (
                <Form.Item
                    name="grade2"
                    rules={[{ required: true, message: "Bạn chưa nhập điểm" }]}
                >
                    <InputNumber min={1} max={15} style={{ width: 100, marginTop: 25 }} />
                    {/* <Input style={{ width: 150, marginTop: 25 }} /> */}
                </Form.Item>
            ),
        },
        {
            key: (
                <div style={{ textAlign: 'center' }}>3</div>
            ),
            content: (
                <div style={{ textAlign: 'left' }}>Mục tiêu của đề tài</div>
            ),
            maxgrade: (
                <div style={{ textAlign: 'center' }}>10</div>
            ),
            action: (
                <Form.Item
                    name="grade3"
                    rules={[{ required: true, message: "Bạn chưa nhập điểm" }]}
                >
                    <InputNumber min={1} max={10} style={{ width: 100, marginTop: 25 }} />
                    {/* <Input style={{ width: 150, marginTop: 25 }} /> */}
                </Form.Item>
            ),
        },
        {
            key: (
                <div style={{ textAlign: 'center' }}>4</div>
            ),
            content: (
                <div style={{ textAlign: 'left' }}>Cách tiếp cận và phương pháp nghiên cứu</div>
            ),
            maxgrade: (
                <div style={{ textAlign: 'center' }}>10</div>
            ),
            action: (
                <Form.Item
                    name="grade4"
                    rules={[{ required: true, message: "Bạn chưa nhập điểm" }]}
                >
                    <InputNumber min={1} max={10} style={{ width: 100, marginTop: 25 }} />
                    {/* <Input style={{ width: 150, marginTop: 25 }} /> */}
                </Form.Item>
            ),
        },
        {
            key: (
                <div style={{ textAlign: 'center' }}>5</div>
            ),
            content: (
                <div style={{ textAlign: 'left' }}>Đối tượng và phạm vi nghiên cứu</div>
            ),
            maxgrade: (
                <div style={{ textAlign: 'center' }}>5</div>
            ),
            action: (
                <Form.Item
                    name="grade5"
                    rules={[{ required: true, message: "Bạn chưa nhập điểm" }]}
                >
                    <InputNumber min={1} max={5} style={{ width: 100, marginTop: 25 }} />
                    {/* <Input style={{ width: 150, marginTop: 25 }} /> */}
                </Form.Item>
            ),
        },
        {
            key: (
                <div style={{ textAlign: 'center' }}>6</div>
            ),
            content: (
                <div style={{ textAlign: 'left' }}>Nội dung nghiên cứu và tiến độ thực hiện</div>
            ),
            maxgrade: (
                <div style={{ textAlign: 'center' }}>20</div>
            ),
            action: (
                <Form.Item
                    name="grade6"
                    rules={[{ required: true, message: "Bạn chưa nhập điểm" }]}
                >
                    <InputNumber min={1} max={20} style={{ width: 100, marginTop: 25 }} />
                    {/* <Input style={{ width: 150, marginTop: 25 }} /> */}
                </Form.Item>
            ),
        },
        {
            key: (
                <div style={{ textAlign: 'center' }}>7</div>
            ),
            content: (
                <div style={{ textAlign: 'left' }}>Sản phẩm của đề tài</div>
            ),
            maxgrade: (
                <div style={{ textAlign: 'center' }}>20</div>
            ),
            action: (
                <Form.Item
                    name="grade7"
                    rules={[{ required: true, message: "Bạn chưa nhập điểm" }]}
                >
                    <InputNumber min={1} max={20} style={{ width: 100, marginTop: 25 }} />
                    {/* <Input style={{ width: 150, marginTop: 25 }} /> */}
                </Form.Item>
            ),
        },
        {
            key: (
                <div style={{ textAlign: 'center' }}>8</div>
            ),
            content: (
                <div style={{ textAlign: 'left' }}>Phương thức chuyển giao, địa chỉ ứng dụng, tác động và lợi ích mang lại của kết quả nghiên cứu</div>
            ),
            maxgrade: (
                <div style={{ textAlign: 'center' }}>10</div>
            ),
            action: (
                <Form.Item
                    name="grade8"
                    rules={[{ required: true, message: "Bạn chưa nhập điểm" }]}
                >
                    <InputNumber min={1} max={10} style={{ width: 100, marginTop: 25 }} />
                    {/* <Input style={{ width: 150, marginTop: 25 }} /> */}
                </Form.Item>
            ),
        },
        {
            content: (
                <div style={{ textAlign: 'left', cursor: 'pointer', color: 'blue' }} onClick={getTotal} >Tổng điểm</div>
            ),
            maxgrade: (
                <div style={{ textAlign: 'center' }}>100</div>
            ),
        },
    ];

    const approveTopicSec = async () => {
        const res = await callGetExplanationByid(topicApprove.explanationboard)
        // console.log('check res', res.data.payload)
        let member = 0
        if (res?.data?.payload?.items?.president !== null) {
            member = member + 1
        }
        if (res?.data?.payload?.items?.secretary !== null) {
            member = member + 1
        }
        if (res?.data?.payload?.items?.commissioners !== null) {
            member = member + res?.data?.payload?.items?.commissioners?.length
        }
        if (member === dataTranscript.length) {
            let idArr = []
            dataTranscript.map(item => {
                idArr.push(item.id)
            })
            if (topicApprove.status.status_id !== 15) {
                notification.error({
                    message: 'Đề tài đã được thông qua kết quả thuyết minh',
                    duration: 2
                })
            } else {
                const res1 = await callUpdateTranscriptStatus(idArr)
                const res2 = await callUpdateTopicStatus(topicApprove.topic_id, 16)
                if (res1 && res2) {
                    setIsModalAccOpen(false)
                    notification.success({
                        message: 'Đã thông qua kết quả báo cáo thuyết minh',
                        duration: 2
                    })
                }
            }
        } else {
            notification.error({
                message: 'Cần đầy đủ nhận xét của hội đồng để duyệt',
                duration: 2
            })
        }


    }

    var arr = [];
    var len = dataTranscript?.length;
    for (var i = 0; i < len; i++) {
        arr.push({
            key: i + 1,
            label: [
                <div>
                    {explanationBoard?.presidentInfo?.lecturer_name === dataTranscript[i]?.lecturerInfo?.lecturer_name ?
                        <>                        Chủ tịch: {explanationBoard?.presidentInfo?.lecturer_name}
                        </>
                        : ''}
                    {explanationBoard?.secretaryInfo?.lecturer_name === dataTranscript[i]?.lecturerInfo?.lecturer_name ?
                        <>                        Thư ký: {explanationBoard?.secretaryInfo?.lecturer_name}
                        </>
                        : ''}
                    {explanationBoard?.commissioners.map(item => {
                        if (item?.lecturerInfo?.lecturer_name === dataTranscript[i]?.lecturerInfo?.lecturer_name) {
                            return (
                                <>
                                    Ủy viên: {item?.lecturerInfo?.lecturer_name}
                                </>
                            )
                        }
                    })}
                </div>
            ],
            children:
                [
                    <div>
                        {dataTranscript[i]?.lecturerInfo?.lecturer_name === explanationBoard?.presidentInfo?.lecturer_name}
                        <>
                            <table style={{ width: '100%', marginBottom: 30 }}>
                                <tr style={{ backgroundColor: '#E0E0E0', border: '1px solid #E0E0E0', borderRadius: 10 }}>
                                    <th style={{ border: '1px solid #E0E0E0' }}>Nội dung đánh giá</th>
                                    <th style={{ height: 40, border: '1px solid #E0E0E0' }}>Điểm</th>
                                </tr >
                                <tr >
                                    <td style={{ width: 800, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Tổng quan tình hình nghiên cứu thuộc lĩnh vực đề tài</b></td>
                                    <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[i]?.scoreInfo?.score1}</td>
                                </tr>
                                <tr >
                                    <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Mục tiêu đề tài</b></td>
                                    <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[i]?.scoreInfo?.score2}</td>
                                </tr>
                                <tr >
                                    <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Phương pháp nghiên cứu</b></td>
                                    <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[i]?.scoreInfo?.score3}</td>
                                </tr>
                                <tr >
                                    <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Nội dung khoa họcNội dung khoa học</b></td>
                                    <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[i]?.scoreInfo?.score4}</td>
                                </tr>
                                <tr >
                                    <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Đóng góp về mặt kinh tế - xã hội, giáo dục và đào tạo, an ninh, quốc phòng</b></td>
                                    <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[i]?.scoreInfo?.score5}</td>
                                </tr>
                                <tr >
                                    <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Hình thức trình bày báo cáo tổng kết đề tài</b></td>
                                    <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[i]?.scoreInfo?.score6}</td>
                                </tr>
                                <tr >
                                    <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Thời gian và tiến độ thực hiện đề tài</b></td>
                                    <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[i]?.scoreInfo?.score7}</td>
                                </tr>
                                <tr >
                                    <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Điểm thưởng</b></td>
                                    <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[i]?.scoreInfo?.score8}</td>
                                </tr>
                            </table >
                            <span style={{ marginBottom: 30 }}><b>- Ý kiến của hội đồng về kết quả của đề tài: </b>{dataTranscript[i]?.comment}</span>
                        </>
                    </div>

                ],
        });
    }


    return (
        <div className='abc'>
            <div style={{ marginLeft: -8, marginRight: -8, marginTop: 8 }}>
                <div className="LecturerHomePage-page">
                    <Row>
                        <Col span={5}></Col>

                        <Col span={14} style={{ height: '100%', backgroundColor: 'white', borderRadius: 10, paddingTop: 10, fontSize: 14, paddingLeft: 15, paddingRight: 15 }}>
                            <div>
                                <h3>CÁC ĐỀ TÀI THUỘC HỘI ĐỒNG THUYẾT MINH</h3>
                                {topicList.map((topicList, index) => {
                                    return (
                                        <>
                                            <div style={{ border: '0px solid black', borderRadius: '0% 0% 0% 0% / 0% 0% 0% 0%', padding: 10, marginBottom: 50, marginTop: 30, position: 'relative', boxShadow: '5px 5px 10px rgba(0,0,0,.15)' }}>

                                                <Descriptions title="Thông tin sinh viên" column={1} bordered={true}>

                                                    {topicList?.student.map((student, index) => {
                                                        return (
                                                            <>
                                                                <Descriptions.Item style={{ width: 100 }} label="Tên sinh viên">{student?.student_name} ({student?.role})</Descriptions.Item>
                                                                <Descriptions.Item label="Mã số sinh viên">{student?.student_code}</Descriptions.Item>
                                                            </>


                                                        )
                                                    })}
                                                </Descriptions>
                                                <div style={{ marginTop: 20 }}>
                                                    <Descriptions title="Thông tin đề tài" column={1} bordered={true}>
                                                        <Descriptions.Item style={{ width: 100 }} label="Tên đề tài">{topicList?.topic_name}</Descriptions.Item>
                                                        <Descriptions.Item label="Giáo viên hướng dẫn">{topicList?.lecturerInfo?.lecturer_name}</Descriptions.Item>
                                                        <Descriptions.Item label="File thuyết minh" ><a onClick={() => getFileUrl(topicList?.file[0]?.file_url)}>{topicList?.file[0]?.file_name}</a></Descriptions.Item>
                                                        <Descriptions.Item label="Thao tác">
                                                            <div>
                                                                {topicList?.status?.status_id === 15 ? <Button type='primary' onClick={() => openTranscript(topicList)}>Chấm điểm thuyết minh</Button>
                                                                    : ''}
                                                            </div>
                                                            <div style={{ marginTop: 15 }}>
                                                                {topicList?.role === 'Thư ký' || topicList?.role === 'Chủ tịch hội đồng' ? <Button onClick={() => handleGetTranscript(topicList)} type="primary">Xem điểm số</Button> : ''}
                                                            </div>
                                                        </Descriptions.Item>

                                                    </Descriptions>



                                                </div>

                                            </div>
                                        </>
                                    )
                                })}
                            </div>

                        </Col>

                        <Modal
                            open={isOpenTranscript}
                            onOk={handleCreateTranscript}
                            onCancel={handleCancelTranscript}
                            cancelButtonProps={{ style: { display: 'none' } }}
                            okButtonProps={{ style: { display: 'none' } }}
                            width={800}
                            style={{
                                marginTop: -80,
                                height: 780,
                                overflow: 'scroll',
                                borderRadius: 10
                            }}
                            maskClosable={false}
                        >
                            <div>
                                <div>
                                    <div style={{ textAlign: 'center' }}>
                                        <h3>PHIẾU ĐÁNH GIÁ</h3>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <h3>THUYẾT MINH ĐỀ TÀI KHOA HỌC VÀ CÔNG NGHỆ CẤP CƠ SỞ</h3>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>(đề tài do sinh viên thực hiện)</div>
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <div>
                                        <b>1. </b>Họ và tên thành viên Hội đồng: {lecturer?.lecturer_name}
                                    </div>
                                    <div>
                                        <b>2. </b>Tên đề tài: {choosedTopic?.topic_name}
                                    </div>
                                    <div>
                                        <b>3. </b>Chủ nhiệm đề tài: {choosedTopic?.topic_manager}
                                    </div>
                                    <div style={{ marginBottom: 20 }}>
                                        <b>4. </b>Đánh giá của thành viên Hội đồng
                                    </div>
                                </div>
                                <Form
                                    form={formTranscript}
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
                                    onFinish={createTranscript}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"

                                >
                                    <Table
                                        dataSource={data}
                                        pagination={false}
                                        bordered={true}
                                    // style={{ width: 1000 }}
                                    >
                                        <Column title="Stt" dataIndex="key" key="key" />
                                        <Column title="Nội dung đánh giá" dataIndex="content" key="content" />
                                        <Column title="Điểm tối đa" dataIndex="maxgrade" key="maxgrade" />
                                        <Column
                                            title="Điểm đánh giá"
                                            key="action"
                                            dataIndex='action'
                                        />
                                    </Table>

                                    <p>Ghi chú: <b>Phê duyệt: &ge; 70 điểm; Không phê duyệt: &lt; 70 điểm</b></p>
                                    <div style={{ marginBottom: 20 }}>
                                        <b>5. </b>Nhận xét:
                                        <Form.Item
                                            name="comment"
                                            rules={[{ required: true, message: "Bạn chưa nhập nhận xét" }]}
                                        >
                                            <Input style={{ marginTop: 25, height: 150, resize: 'none', paddingBottom: 120 }} />
                                        </Form.Item>
                                    </div>
                                    <Form.Item
                                        wrapperCol={{
                                            offset: 0,
                                            span: 16,
                                        }}
                                    >
                                        <Button type="primary" htmlType="submit">
                                            Xác nhận
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>

                        </Modal>

                        <Modal
                            width={640}
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            cancelButtonProps={{ style: { display: 'none' } }}
                            okButtonProps={{ style: { display: 'none' } }}
                            closeIcon={false}
                        // bodyStyle={{ height: 100 }}
                        >
                            <Row gutter={24}>
                                <Col span={10}></Col>
                                <Col span={4}>
                                    <CaretLeftOutlined onClick={prevPage} style={{ fontSize: 30 }} />
                                    <CaretRightOutlined onClick={nextPage} style={{ fontSize: 30 }} />
                                </Col>

                                <Col span={10}></Col>

                            </Row>

                            <Document
                                file={pdfFile}
                                onLoadSuccess={onDocumentLoadSuccess}
                                noData={''}
                                loading={''}
                            >
                                <Page pageNumber={pageNumber} renderAnnotationLayer={true} renderTextLayer={true}></Page>
                            </Document>
                        </Modal>

                        <Modal
                            title="Nhận xét của hội đồng thuyết minh"
                            open={isModalAccOpen}
                            // onOk={handleOkAcc}
                            onCancel={handleCancelAcc}
                            cancelButtonProps={{ style: { display: 'none' } }}
                            okButtonProps={{ style: { display: 'none' } }}
                            style={{
                                marginTop: -80,
                                height: 780,
                                overflow: 'scroll',
                                borderRadius: 10
                            }}
                            width={1000}
                            maskClosable={false}
                        >
                            <Collapse
                                items={
                                    arr
                                }
                                defaultActiveKey={['1']}
                                style={{ marginTop: 25 }}

                            />
                            {topicApprove?.role === 'Thư ký' ?
                                <Button style={{ marginTop: 20 }} type='primary' onClick={approveTopicSec}>Duyệt qua kết quả báo cáo</Button>
                                : ''}
                        </Modal>
                        <Col span={5}>

                        </Col>
                    </Row>
                </div>
            </div >
        </div>
    )
}

export default LecturerExplanationBoard