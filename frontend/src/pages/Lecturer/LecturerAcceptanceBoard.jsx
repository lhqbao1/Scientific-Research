import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons"
import { Button, Card, Col, Collapse, Descriptions, Form, Input, InputNumber, Modal, notification, Row, Select, Table } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { callCheckExistedTranscript, callCheckExistedTranscriptAcc, callCreateExplanationTranscript, callCreateTranscriptComment, callCreateTranscriptScore, callGetExplanationByid, callGetLecturerById, callGetLecturerByIdAcc, callGetTranscriptAccByTopicId, callUpdateTopicStatus, callUpdateTranscriptComment, callUpdateTranscriptScore, callUpdateTranscriptStatus } from "../../../services/api"
import { Document, Page, pdfjs } from 'react-pdf';
import { Buffer } from 'buffer';
import "react-pdf/dist/esm/Page/TextLayer.css";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import Column from "antd/es/table/Column"
import TextArea from "antd/es/input/TextArea"



pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const LecturerAcceptanceBoard = () => {
    const [topicList, setTopicList] = useState([])
    const [isOpenTranscript, setIsOpenTranscript] = useState(false);
    const [topicId, setTopicId] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pdfFile, setPdfFile] = useState()
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [hasRole, setHasRole] = useState(false)
    const [dataTranscript, setDataTranscript] = useState([])
    const [isModalAccOpen, setIsModalAccOpen] = useState(false)
    const [choosedTopic, setChoosedTopic] = useState()
    const [isOpenTranscriptComment, setIsOpenTranscriptComment] = useState(false)
    const [dataTable, setDataTable] = useState([])
    const [formTranscript] = Form.useForm()
    const [formTranscriptComment] = Form.useForm()




    const lecturerId = useSelector(state => state.lecturer.user.lecturer_id)
    const lecturer = useSelector(state => state?.lecturer?.user)



    useEffect(() => {
        const callGetTopic = async () => {
            let topicData = []
            const res = await callGetLecturerByIdAcc(lecturerId)
            console.log(res.data.payload)
            let data = res?.data?.payload?.lecturer
            let dataCommissioner = res?.data?.payload?.commissioner
            let dataCounter = res?.data?.payload?.counter


            if (data?.presidentInfo?.length > 0) {
                setHasRole(true)
                data?.presidentInfo.map(presidentInfo => {
                    // console.log('check president', presidentInfo)
                    if (presidentInfo.type === 'hội đồng nghiệm thu') {
                        presidentInfo?.topicAccInfo.map(topicAccInfo => {
                            topicData.push(topicAccInfo)
                        })
                    }
                })
            }
            if (data?.secretaryInfo?.length > 0) {
                setHasRole(true)
                data?.secretaryInfo.map(secretaryInfo => {
                    // console.log('check secretatry', secretaryInfo)
                    if (secretaryInfo.type === 'hội đồng nghiệm thu') {
                        secretaryInfo?.topicAccInfo.map(topicAccInfo => {
                            topicData.push(topicAccInfo)
                        })
                    }
                })
            }

            if (dataCounter?.length > 0) {
                dataCounter.map(data => {
                    // console.log('cjeck maspdpasd', data)
                    data?.boardInfo?.topicAccInfo.map(topic => {
                        topicData.push(topic)
                    })
                })

            }

            if (dataCommissioner?.length > 0) {
                dataCommissioner.map(data => {
                    // console.log('cjeck maspdpasd', data)
                    data?.boardInfo?.topicAccInfo.map(topic => {
                        topicData.push(topic)
                    })
                })

            }
            if (topicData?.length > 0) {
                topicData.map(item => {
                    item.dateString = (new Date(+item.acceptancedate)).toLocaleDateString()
                    // item.acceptancedate = (new Date(+item.acceptancedate)).toLocaleDateString()
                })
                setTopicList(topicData)

                console.log('chcek topicasc,', topicData)
                // console.log('check data', data)
            }
        }

        callGetTopic()
    }, [])

    const openTranscript = async (topic) => {
        const checkExist = await callCheckExistedTranscriptAcc(lecturerId, topic.topic_id)
        if (checkExist.data.payload.length > 0) {
            notification.error({
                message: 'Bạn đã chấm điểm cho đề tài này',
                // description: ``,
                duration: 2
            })
        } else {
            setIsOpenTranscript(true)
            setTopicId(topic?.topic_id)
            setChoosedTopic(topic)
        }
    }

    const openTranscriptComment = async (topic) => {
        // console.log(lecturerId)
        // console.log(topic.topic_id)
        const checkExist = await callCheckExistedTranscriptAcc(lecturerId, topic.topic_id)
        console.log(checkExist.data.payload)
        if (checkExist.data.payload.length === 0) {
            notification.error({
                message: 'Cần chấm điểm đề tài trước khi nhận xét',
                duration: 2
            })
        } else {
            if (checkExist.data.payload[0]?.commentreport !== null) {
                notification.error({
                    message: 'Bạn đã nhận xét cho đề tài này',
                    duration: 2
                })
            } else {
                setIsOpenTranscriptComment(true)
                setTopicId(topic?.topic_id)
                setChoosedTopic(topic)
            }
        }

    }




    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleCreateTranscript = () => {
        setIsOpenTranscript(false);
    };

    const handleCancelTranscript = () => {
        setIsOpenTranscript(false);
        formTranscript.resetFields()
    };

    const handleCancelTranscriptComment = () => {
        setIsOpenTranscriptComment(false)
        formTranscriptComment.resetFields()

    }

    const createTranscript = async (values) => {
        const score = await callCreateTranscriptScore(values.grade1, values.grade2, values.grade3, values.grade4, values.grade5, values.grade6, values.grade7, values.grade8, 'nghiệm thu')
        let total = values.grade1 + values.grade2 + values.grade3 + values.grade4 + values.grade5 + values.grade6 + values.grade7 + values.grade8
        // // console.log(total)
        const res = await callCreateExplanationTranscript('', total, lecturerId, topicId, 'nghiệm thu', 1)
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
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }
    const getFileUrl = (file_url) => {
        let fileBase64 = new Buffer(file_url, 'base64').toString('binary')
        setIsModalOpen(true);
        setPdfFile(fileBase64)
    };

    const handleGetTranscript = async (topic) => {
        setChoosedTopic(topic)
        const board = await callGetExplanationByid(topic?.acceptanceboard)
        let member = 0
        if (board?.data?.payload?.items?.president !== null) {
            member = member + 1
        }
        if (board?.data?.payload?.items?.secretary !== null) {
            member = member + 1
        }
        if (board?.data?.payload?.items?.commissioners !== null) {
            member = member + board?.data?.payload?.items?.commissioners?.length
        }
        if (board?.data?.payload?.items?.counter !== null) {
            member = member + board?.data?.payload?.items?.counter?.length
        }
        const transcript = await callGetTranscriptAccByTopicId(topic.topic_id)
        if (member === transcript.data.payload.length) {
            setIsModalAccOpen(true)
            const res = await callGetTranscriptAccByTopicId(topic.topic_id)
            let data = res.data.payload
            let arrData = []
            data.map(item => {
                let object = {}
                object.lecturer = item.lecturerInfo.lecturer_name
                object.comment1 = item.commentInfo.comment1
                object.score1 = item.scoreInfo.score1
                object.comment2 = item.commentInfo.comment2
                object.score2 = item.scoreInfo.score2
                object.comment3 = item.commentInfo.comment3
                object.score3 = item.scoreInfo.score3
                object.comment4 = item.commentInfo.comment4
                object.score4 = item.scoreInfo.score4
                object.comment5 = item.commentInfo.comment5
                object.score5 = item.scoreInfo.score5
                object.comment6 = item.commentInfo.comment6
                object.score6 = item.scoreInfo.score6
                object.comment7 = item.commentInfo.comment7
                object.score7 = item.scoreInfo.score7
                object.comment8 = item.commentInfo.comment8
                object.score8 = item.scoreInfo.score8
                object.comment9 = item.commentInfo.comment9

                arrData.push(object)
            })
            console.log(arrData)
            setDataTranscript(res?.data?.payload)
            setDataTable(arrData)
        } else {
            notification.error({
                message: 'Đề tài chưa có đủ nhận xét',
                duration: 2
            })
        }
    }
    const handleCancelAcc = () => {
        setIsModalAccOpen(false)
    }
    const data = [
        {
            key: (
                <div style={{ textAlign: 'center' }}>1</div>
            ),
            content: (
                <div style={{ textAlign: 'left' }}>Tổng quan tình hình nghiên cứu, lý do chọn đề tài</div>
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
                <div style={{ textAlign: 'left' }}>Mục tiêu đề ài</div>
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
                <div style={{ textAlign: 'left' }}>Phương pháp nghiên cứu</div>
            ),
            maxgrade: (
                <div style={{ textAlign: 'center' }}>15</div>
            ),
            action: (
                <Form.Item
                    name="grade3"
                    rules={[{ required: true, message: "Bạn chưa nhập điểm" }]}
                >
                    <InputNumber min={1} max={15} style={{ width: 100, marginTop: 25 }} />
                    {/* <Input style={{ width: 150, marginTop: 25 }} /> */}
                </Form.Item>
            ),
        },
        {
            key: (
                <div style={{ textAlign: 'center' }}>4</div>
            ),
            content: (
                <div style={{ textAlign: 'left' }}>Nội dung khoa học</div>
            ),
            maxgrade: (
                <div style={{ textAlign: 'center' }}>30</div>
            ),
            action: (
                <Form.Item
                    name="grade4"
                    rules={[{ required: true, message: "Bạn chưa nhập điểm" }]}
                >
                    <InputNumber min={1} max={30} style={{ width: 100, marginTop: 25 }} />
                    {/* <Input style={{ width: 150, marginTop: 25 }} /> */}
                </Form.Item>
            ),
        },
        {
            key: (
                <div style={{ textAlign: 'center' }}>5</div>
            ),
            content: (
                <div style={{ textAlign: 'left' }}>Đóng góp về mặt kinh tế - xã hội, giáo dục và đào, an ninh, quốc phòng</div>
            ),
            maxgrade: (
                <div style={{ textAlign: 'center' }}>15</div>
            ),
            action: (
                <Form.Item
                    name="grade5"
                    rules={[{ required: true, message: "Bạn chưa nhập điểm" }]}
                >
                    <InputNumber min={1} max={15} style={{ width: 100, marginTop: 25 }} />
                    {/* <Input style={{ width: 150, marginTop: 25 }} /> */}
                </Form.Item>
            ),
        },
        {
            key: (
                <div style={{ textAlign: 'center' }}>6</div>
            ),
            content: (
                <div style={{ textAlign: 'left' }}>Hình thức trình bày báo cáo tổng kết đề tài</div>
            ),
            maxgrade: (
                <div style={{ textAlign: 'center' }}>5</div>
            ),
            action: (
                <Form.Item
                    name="grade6"
                    rules={[{ required: true, message: "Bạn chưa nhập điểm" }]}
                >
                    <InputNumber min={1} max={5} style={{ width: 100, marginTop: 25 }} />
                    {/* <Input style={{ width: 150, marginTop: 25 }} /> */}
                </Form.Item>
            ),
        },
        {
            key: (
                <div style={{ textAlign: 'center' }}>7</div>
            ),
            content: (
                <div style={{ textAlign: 'left' }}>Thời gian và tiến độ thực hiện đề tài</div>
            ),
            maxgrade: (
                <div style={{ textAlign: 'center' }}>5</div>
            ),
            action: (
                <Form.Item
                    name="grade7"
                    rules={[{ required: true, message: "Bạn chưa nhập điểm" }]}
                >
                    <InputNumber min={1} max={5} style={{ width: 100, marginTop: 25 }} />
                    {/* <Input style={{ width: 150, marginTop: 25 }} /> */}
                </Form.Item>
            ),
        },
        {
            key: (
                <div style={{ textAlign: 'center' }}>8</div>
            ),
            content: (
                <div style={{ textAlign: 'left' }}>Điểm thưởng (cho 0 nếu không có bài báo khoa học)</div>
            ),
            maxgrade: (
                <div style={{ textAlign: 'center' }}>5</div>
            ),
            action: (
                <Form.Item
                    name="grade8"
                    rules={[{ required: true, message: "Bạn chưa nhập điểm" }]}
                >
                    <InputNumber min={1} max={5} style={{ width: 100, marginTop: 25 }} />
                    {/* <Input style={{ width: 150, marginTop: 25 }} /> */}
                </Form.Item>
            ),
        },
        {
            content: (
                <div style={{ textAlign: 'left', cursor: 'pointer', color: 'blue' }}  >Tổng điểm</div>
            ),
            maxgrade: (
                <div style={{ textAlign: 'center' }}>100</div>
            ),
        },
    ];

    const dataComment = [
        {
            key: (
                <div style={{ textAlign: 'center' }}>1</div>
            ),
            content: (
                <div style={{ textAlign: 'left' }}>Tổng quan tình hình nghiên cứu, lý do chọn đề tài</div>
            ),
            comment: (
                <Form.Item
                    name="comment1"
                    rules={[{ required: true, message: "Bạn chưa nhận xét" }]}
                >
                    <TextArea style={{ width: 300, marginTop: 25, minHeight: 150 }}
                    />
                </Form.Item>
            ),
        },
        {
            key: (
                <div style={{ textAlign: 'center' }}>2</div>
            ),
            content: (
                <div style={{ textAlign: 'left' }}>Mục tiêu đề tài</div>
            ),
            comment: (
                <Form.Item
                    name="comment2"
                    rules={[{ required: true, message: "Bạn chưa nhận xét" }]}
                >
                    <TextArea style={{ width: 300, marginTop: 25, minHeight: 150 }}
                    />
                </Form.Item>
            ),
        },
        {
            key: (
                <div style={{ textAlign: 'center' }}>3</div>
            ),
            content: (
                <div style={{ textAlign: 'left' }}>Phương pháp nghiên cứu</div>
            ),
            comment: (
                <Form.Item
                    name="comment3"
                    rules={[{ required: true, message: "Bạn chưa nhận xét" }]}
                >
                    <TextArea style={{ width: 300, marginTop: 25, minHeight: 150 }}
                    />
                </Form.Item>
            ),
        },
        {
            key: (
                <div style={{ textAlign: 'center' }}>4</div>
            ),
            content: (
                <div style={{ textAlign: 'left' }}>Nội dung khoa học</div>
            ),
            comment: (
                <Form.Item
                    name="comment4"
                    rules={[{ required: true, message: "Bạn chưa nhận xét" }]}
                >
                    <TextArea style={{ width: 300, marginTop: 25, minHeight: 150 }}
                    />
                </Form.Item>
            ),
        },
        {
            key: (
                <div style={{ textAlign: 'center' }}>5</div>
            ),
            content: (
                <div style={{ textAlign: 'left' }}>Đóng góp về mặt kinh tế - xã hội, giáo dục và đào tạo, an ninh, quốc phòng</div>
            ),
            comment: (
                <Form.Item
                    name="comment5"
                    rules={[{ required: true, message: "Bạn chưa nhận xét" }]}
                >
                    <TextArea style={{ width: 300, marginTop: 25, minHeight: 150 }}
                    />
                </Form.Item>
            ),
        },
        {
            key: (
                <div style={{ textAlign: 'center' }}>6</div>
            ),
            content: (
                <div style={{ textAlign: 'left' }}>Hình thức trình bày báo cáo tổng kết đề tài </div>
            ),
            comment: (
                <Form.Item
                    name="comment6"
                    rules={[{ required: true, message: "Bạn chưa nhận xét" }]}
                >
                    <TextArea style={{ width: 300, marginTop: 25, minHeight: 150 }}
                    />
                </Form.Item>
            ),
        },
        {
            key: (
                <div style={{ textAlign: 'center' }}>7</div>
            ),
            content: (
                <div style={{ textAlign: 'left' }}>Thời gian và tiến độ thực hiện đề tài</div>
            ),
            comment: (
                <Form.Item
                    name="comment7"
                    rules={[{ required: true, message: "Bạn chưa nhận xét" }]}
                >
                    <TextArea style={{ width: 300, marginTop: 25, minHeight: 150 }}
                    />
                </Form.Item>
            ),
        }
    ];

    const createTranscriptComment = async (data) => {
        const res = await callCreateTranscriptComment(data.comment1, data.comment2, data.comment3, data.comment4, data.comment5, data.comment6, data.comment7, data.comment8, data.comment9, 'nghiệm thu')
        if (res) {
            const transcript = await callCheckExistedTranscriptAcc(lecturerId, choosedTopic.topic_id)
            const comment = await callUpdateTranscriptComment(transcript?.data?.payload[0].id, res?.data?.payload?.id)
            notification.success({
                message: 'Nhận xét thành công',
                duration: 2
            })
            formTranscriptComment.resetFields()
            setIsOpenTranscriptComment(false)
        }
    }

    const items = [

        {

            key: '1',
            label: dataTranscript[0]?.lecturerInfo?.lecturer_name,
            children:
                [
                    <div>
                        <table style={{ width: '100%', marginBottom: 30 }}>
                            <tr style={{ backgroundColor: '#E0E0E0', border: '1px solid #E0E0E0', borderRadius: 10 }}>
                                <th style={{ border: '1px solid #E0E0E0' }}></th>
                                <th style={{ height: 40, border: '1px solid #E0E0E0' }}>Điểm</th>
                                <th style={{ border: '1px solid #E0E0E0' }}>Nhận xét</th>
                            </tr >
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Tổng quan tình hình nghiên cứu, lý do chọn đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[0]?.scoreInfo?.score1}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[0]?.commentInfo?.comment1}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Mục tiêu đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[0]?.scoreInfo?.score2}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[0]?.commentInfo?.comment2}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Phương pháp nghiên cứu</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[0]?.scoreInfo?.score3}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[0]?.commentInfo?.comment3}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Nội dung khoa họcNội dung khoa học</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[0]?.scoreInfo?.score4}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[0]?.commentInfo?.comment4}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Đóng góp về mặt kinh tế - xã hội, giáo dục và đào tạo, an ninh, quốc phòng</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[0]?.scoreInfo?.score5}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[0]?.commentInfo?.comment5}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Hình thức trình bày báo cáo tổng kết đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[0]?.scoreInfo?.score6}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[0]?.commentInfo?.comment6}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Thời gian và tiến độ thực hiện đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[0]?.scoreInfo?.score7}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[0]?.commentInfo?.comment7}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Điểm thưởng</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[0]?.scoreInfo?.score8}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}></td>
                            </tr>
                        </table >
                        <span style={{ marginBottom: 30 }}><b>Ý kiến của hội đồng về kết quả của đề tài: </b>{dataTranscript[0]?.commentInfo?.comment8}</span>
                        <br></br>
                        <span><b>Những tồn tại và đề xuất hướng hoặc biện pháp để giải quyết: </b>{dataTranscript[0]?.commentInfo?.comment9}</span>

                    </div>

                ],
        },
        {
            key: '2',
            label: dataTranscript[1]?.lecturerInfo?.lecturer_name,
            children:
                [
                    <div>

                        <table style={{ width: '100%', marginBottom: 30 }}>
                            <tr style={{ backgroundColor: '#E0E0E0', border: '1px solid #E0E0E0', borderRadius: 10 }}>
                                <th style={{ border: '1px solid #E0E0E0' }}></th>
                                <th style={{ height: 40, border: '1px solid #E0E0E0' }}>Điểm</th>
                                <th style={{ border: '1px solid #E0E0E0' }}>Nhận xét</th>
                            </tr >
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Tổng quan tình hình nghiên cứu, lý do chọn đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[1]?.scoreInfo?.score1}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[1]?.commentInfo?.comment1}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Mục tiêu đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[1]?.scoreInfo?.score2}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[1]?.commentInfo?.comment2}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Phương pháp nghiên cứu</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[1]?.scoreInfo?.score3}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[1]?.commentInfo?.comment3}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Nội dung khoa họcNội dung khoa học</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[1]?.scoreInfo?.score4}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[1]?.commentInfo?.comment4}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Đóng góp về mặt kinh tế - xã hội, giáo dục và đào tạo, an ninh, quốc phòng</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[1]?.scoreInfo?.score5}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[1]?.commentInfo?.comment5}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Hình thức trình bày báo cáo tổng kết đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[1]?.scoreInfo?.score6}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[1]?.commentInfo?.comment6}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Thời gian và tiến độ thực hiện đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[1]?.scoreInfo?.score7}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[1]?.commentInfo?.comment7}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Điểm thưởng</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[1]?.scoreInfo?.score8}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}></td>
                            </tr>
                        </table >
                        <span style={{ marginBottom: 30 }}><b>Ý kiến của hội đồng về kết quả của đề tài: </b>{dataTranscript[1]?.commentInfo?.comment8}</span>
                        <br></br>
                        <span><b>Những tồn tại và đề xuất hướng hoặc biện pháp để giải quyết: </b>{dataTranscript[1]?.commentInfo?.comment9}</span>

                    </div>

                ],
        },
        {
            key: '3',
            label: dataTranscript[2]?.lecturerInfo?.lecturer_name,
            children:
                [
                    <div>

                        <table style={{ width: '100%', marginBottom: 30 }}>
                            <tr style={{ backgroundColor: '#E0E0E0', border: '1px solid #E0E0E0', borderRadius: 10 }}>
                                <th style={{ border: '1px solid #E0E0E0' }}></th>
                                <th style={{ height: 40, border: '1px solid #E0E0E0' }}>Điểm</th>
                                <th style={{ border: '1px solid #E0E0E0' }}>Nhận xét</th>
                            </tr >
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Tổng quan tình hình nghiên cứu, lý do chọn đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[2]?.scoreInfo?.score1}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[2]?.commentInfo?.comment1}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Mục tiêu đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[2]?.scoreInfo?.score2}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[2]?.commentInfo?.comment2}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Phương pháp nghiên cứu</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[2]?.scoreInfo?.score3}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[2]?.commentInfo?.comment3}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Nội dung khoa họcNội dung khoa học</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[2]?.scoreInfo?.score4}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[2]?.commentInfo?.comment4}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Đóng góp về mặt kinh tế - xã hội, giáo dục và đào tạo, an ninh, quốc phòng</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[2]?.scoreInfo?.score5}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[2]?.commentInfo?.comment5}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Hình thức trình bày báo cáo tổng kết đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[2]?.scoreInfo?.score6}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[2]?.commentInfo?.comment6}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Thời gian và tiến độ thực hiện đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[2]?.scoreInfo?.score7}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[2]?.commentInfo?.comment7}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Điểm thưởng</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[2]?.scoreInfo?.score8}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}></td>
                            </tr>
                        </table >
                        <span style={{ marginBottom: 30 }}><b>Ý kiến của hội đồng về kết quả của đề tài: </b>{dataTranscript[2]?.commentInfo?.comment8}</span>
                        <br></br>
                        <span><b>Những tồn tại và đề xuất hướng hoặc biện pháp để giải quyết: </b>{dataTranscript[2]?.commentInfo?.comment9}</span>

                    </div>

                ],
        },
        {
            key: '3',
            label: dataTranscript[3]?.lecturerInfo?.lecturer_name,
            children:
                [
                    <div>

                        <table style={{ width: '100%', marginBottom: 30 }}>
                            <tr style={{ backgroundColor: '#E0E0E0', border: '1px solid #E0E0E0', borderRadius: 10 }}>
                                <th style={{ border: '1px solid #E0E0E0' }}></th>
                                <th style={{ height: 40, border: '1px solid #E0E0E0' }}>Điểm</th>
                                <th style={{ border: '1px solid #E0E0E0' }}>Nhận xét</th>
                            </tr >
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Tổng quan tình hình nghiên cứu, lý do chọn đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[3]?.scoreInfo?.score1}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[3]?.commentInfo?.comment1}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Mục tiêu đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[3]?.scoreInfo?.score2}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[3]?.commentInfo?.comment2}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Phương pháp nghiên cứu</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[3]?.scoreInfo?.score3}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[3]?.commentInfo?.comment3}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Nội dung khoa họcNội dung khoa học</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[3]?.scoreInfo?.score4}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[3]?.commentInfo?.comment4}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Đóng góp về mặt kinh tế - xã hội, giáo dục và đào tạo, an ninh, quốc phòng</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[3]?.scoreInfo?.score5}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[3]?.commentInfo?.comment5}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Hình thức trình bày báo cáo tổng kết đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[3]?.scoreInfo?.score6}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[3]?.commentInfo?.comment6}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Thời gian và tiến độ thực hiện đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[3]?.scoreInfo?.score7}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[3]?.commentInfo?.comment7}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Điểm thưởng</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[3]?.scoreInfo?.score8}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}></td>
                            </tr>
                        </table >
                        <span style={{ marginBottom: 30 }}><b>Ý kiến của hội đồng về kết quả của đề tài: </b>{dataTranscript[3]?.commentInfo?.comment8}</span>
                        <br></br>
                        <span><b>Những tồn tại và đề xuất hướng hoặc biện pháp để giải quyết: </b>{dataTranscript[3]?.commentInfo?.comment9}</span>

                    </div>

                ],
        },
        {
            key: '4',
            label: dataTranscript[4]?.lecturerInfo?.lecturer_name,
            children:
                [
                    <div>

                        <table style={{ width: '100%', marginBottom: 30 }}>
                            <tr style={{ backgroundColor: '#E0E0E0', border: '1px solid #E0E0E0', borderRadius: 10 }}>
                                <th style={{ border: '1px solid #E0E0E0' }}></th>
                                <th style={{ height: 40, border: '1px solid #E0E0E0' }}>Điểm</th>
                                <th style={{ border: '1px solid #E0E0E0' }}>Nhận xét</th>
                            </tr >
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Tổng quan tình hình nghiên cứu, lý do chọn đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[4]?.scoreInfo?.score1}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[4]?.commentInfo?.comment1}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Mục tiêu đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[4]?.scoreInfo?.score2}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[4]?.commentInfo?.comment2}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Phương pháp nghiên cứu</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[4]?.scoreInfo?.score3}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[4]?.commentInfo?.comment3}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Nội dung khoa họcNội dung khoa học</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[4]?.scoreInfo?.score4}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[4]?.commentInfo?.comment4}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Đóng góp về mặt kinh tế - xã hội, giáo dục và đào tạo, an ninh, quốc phòng</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[4]?.scoreInfo?.score5}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[4]?.commentInfo?.comment5}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Hình thức trình bày báo cáo tổng kết đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[4]?.scoreInfo?.score6}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[4]?.commentInfo?.comment6}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Thời gian và tiến độ thực hiện đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[4]?.scoreInfo?.score7}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[4]?.commentInfo?.comment7}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Điểm thưởng</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[4]?.scoreInfo?.score8}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}></td>
                            </tr>
                        </table >
                        <span style={{ marginBottom: 30 }}><b>Ý kiến của hội đồng về kết quả của đề tài: </b>{dataTranscript[4]?.commentInfo?.comment8}</span>
                        <br></br>
                        <span><b>Những tồn tại và đề xuất hướng hoặc biện pháp để giải quyết: </b>{dataTranscript[4]?.commentInfo?.comment9}</span>

                    </div>

                ],
        },
        {
            key: '5',
            label: dataTranscript[5]?.lecturerInfo?.lecturer_name,
            children:
                [
                    <div>

                        <table style={{ width: '100%', marginBottom: 30 }}>
                            <tr style={{ backgroundColor: '#E0E0E0', border: '1px solid #E0E0E0', borderRadius: 10 }}>
                                <th style={{ border: '1px solid #E0E0E0' }}></th>
                                <th style={{ height: 40, border: '1px solid #E0E0E0' }}>Điểm</th>
                                <th style={{ border: '1px solid #E0E0E0' }}>Nhận xét</th>
                            </tr >
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Tổng quan tình hình nghiên cứu, lý do chọn đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[5]?.scoreInfo?.score1}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[5]?.commentInfo?.comment1}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Mục tiêu đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[5]?.scoreInfo?.score2}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[5]?.commentInfo?.comment2}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Phương pháp nghiên cứu</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[5]?.scoreInfo?.score3}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[5]?.commentInfo?.comment3}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Nội dung khoa họcNội dung khoa học</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[5]?.scoreInfo?.score4}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[5]?.commentInfo?.comment4}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Đóng góp về mặt kinh tế - xã hội, giáo dục và đào tạo, an ninh, quốc phòng</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[5]?.scoreInfo?.score5}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[5]?.commentInfo?.comment5}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Hình thức trình bày báo cáo tổng kết đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[5]?.scoreInfo?.score6}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[5]?.commentInfo?.comment6}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Thời gian và tiến độ thực hiện đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[5]?.scoreInfo?.score7}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[5]?.commentInfo?.comment7}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Điểm thưởng</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[5]?.scoreInfo?.score8}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}></td>
                            </tr>
                        </table >
                        <span style={{ marginBottom: 30 }}><b>Ý kiến của hội đồng về kết quả của đề tài: </b>{dataTranscript[5]?.commentInfo?.comment8}</span>
                        <br></br>
                        <span><b>Những tồn tại và đề xuất hướng hoặc biện pháp để giải quyết: </b>{dataTranscript[5]?.commentInfo?.comment9}</span>

                    </div>

                ],
        },
    ];

    const approveTopicReport = async () => {
        console.log(choosedTopic)
        let idArr = []
        dataTranscript.map(item => {
            idArr.push(item.id)
        })
        const res = await callUpdateTranscriptStatus(idArr)
        const status = await callUpdateTopicStatus(choosedTopic.topic_id, 20)
        if (res && status) {
            setIsModalAccOpen(false)
            notification.success({
                message: 'Duyệt qua kết quả nghiệm thu thành công',
                duration: 2
            })
        }
    }

    return (
        <>
            <div className='abc'>
                <div style={{ marginLeft: -8, marginRight: -8, marginTop: 8 }}>
                    <div className="LecturerHomePage-page">
                        <Row>
                            <Col span={5}></Col>

                            <Col span={14} style={{ height: '100%', backgroundColor: 'white', borderRadius: 10, paddingTop: 10, fontSize: 14, paddingLeft: 15, paddingRight: 15 }}>
                                <div>
                                    <h3>CÁC ĐỀ TÀI THUỘC HỘI ĐỒNG NGHIỆM THU</h3>
                                    {topicList.map((topicList, index) => {
                                        return (
                                            <>
                                                <div style={{ border: '0px solid black', borderRadius: '0% 0% 0% 0% / 0% 0% 0% 0%', padding: 10, marginBottom: 50, marginTop: 30, position: 'relative', boxShadow: '5px 5px 10px rgba(0,0,0,.15)' }}>

                                                    <div >
                                                        <Descriptions title="Thông tin sinh viên" column={1} bordered={true}>

                                                            {topicList?.student.map((student, index) => {
                                                                return (
                                                                    <>
                                                                        <Descriptions.Item style={{ width: 200 }} label="Tên sinh viên">{student?.student_name} ({student?.role})</Descriptions.Item>
                                                                        <Descriptions.Item label="Mã số sinh viên">{student?.student_code}</Descriptions.Item>
                                                                    </>


                                                                )
                                                            })}
                                                        </Descriptions>
                                                    </div>

                                                    <div style={{ marginTop: 20 }}>
                                                        <Descriptions title="Thông tin đề tài" column={1} bordered={true}>
                                                            <Descriptions.Item style={{ width: 200 }} label="Tên đề tài">{topicList?.topic_name}</Descriptions.Item>
                                                            <Descriptions.Item label="Mã số đề tài">{topicList?.topic_code}</Descriptions.Item>
                                                            <Descriptions.Item label="Ngày báo cáo">{topicList?.dateString}</Descriptions.Item>
                                                            <Descriptions.Item label="Giáo viên hướng dẫn">{topicList?.lecturerInfo?.lecturer_name}</Descriptions.Item>
                                                            {topicList?.file.map(item => {
                                                                if (item?.file_type === 'acceptance') {
                                                                    return (
                                                                        <Descriptions.Item label="Đơn xin nghiệm thu" ><a onClick={() => getFileUrl(item?.file_name)}>{item?.file_name}</a></Descriptions.Item>
                                                                    )
                                                                }
                                                                if (item?.file_type === 'report-decide') {
                                                                    return (
                                                                        <Descriptions.Item label="Quyết định nghiệm thu" ><a onClick={() => getFileUrl(item?.file_name)}>{item?.file_name}</a></Descriptions.Item>
                                                                    )
                                                                }
                                                                if (item?.file_type === 'report-finalreport') {
                                                                    return (
                                                                        <Descriptions.Item label="Bản báo cáo tổng kết" ><a onClick={() => getFileUrl(item?.file_name)}>{item?.file_name}</a></Descriptions.Item>
                                                                    )
                                                                }
                                                                if (item?.file_type === 'report-assessmentform') {
                                                                    return (
                                                                        <Descriptions.Item label="Phiếu nhận xét đánh giá đề tài" ><a onClick={() => getFileUrl(item?.file_name)}>{item?.file_name}</a></Descriptions.Item>
                                                                    )
                                                                }
                                                            })}
                                                            <Descriptions.Item label="Thao tác">
                                                                <div>
                                                                    {topicList?.status?.status_id === 18 ? <Button type='primary' onClick={() => openTranscript(topicList)}>Chấm điểm đề tài</Button>
                                                                        : ''}
                                                                </div>
                                                                <div style={{ marginTop: 15 }}>
                                                                    {topicList?.status?.status_id === 18 ? <Button type='primary' onClick={() => openTranscriptComment(topicList)}>Nhận xét đề tài</Button>
                                                                        : ''}
                                                                </div>
                                                                <div style={{ marginTop: 15 }}>
                                                                    {hasRole === true && topicList?.status?.status_id === 18 || topicList?.status?.status_id === 20 ? <Button onClick={() => handleGetTranscript(topicList)} type="primary">Xem đánh giá</Button> : ''}
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
                                maskClosable={false}
                                width={800}
                                style={{
                                    marginTop: -80,
                                    height: 780,
                                    overflow: 'scroll',
                                    borderRadius: 10
                                }}
                            >
                                <div>
                                    <div>
                                        <div style={{ textAlign: 'center' }}>
                                            <h3>PHIẾU ĐÁNH GIÁ</h3>
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <h3>NGHIỆM THU ĐỀ TÀI KHOA HỌC VÀ CÔNG NGHỆ CẤP CƠ SỞ</h3>
                                        </div>
                                        <div style={{ textAlign: 'center' }}><b>(đề tài do sinh viên thực hiện)</b></div>
                                    </div>
                                    <div style={{ marginTop: 20 }}>
                                        <div>
                                            <b>1. </b>Họ và tên thành viên Hội đồng: {lecturer?.lecturer_name}
                                        </div>
                                        <div>
                                            <b>2. </b>Tên đề tài: {choosedTopic?.topic_name}
                                        </div>
                                        <div>
                                            <b>3. </b>Sinh viên thực hiện: {choosedTopic?.student.map(item => {
                                                if (item.role === 'chủ nhiệm đề tài') {
                                                    return (
                                                        item.student_name + `(${item.role})`
                                                    )
                                                }
                                            })}
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

                                        <p>Ghi chú: Đề tài được xếp loại (theo điểm trung bình cuối cùng) theo mức xuất sắc: từ 90 điểm trở lên; mức tốt từ 80 điểm đến dưới 90 điểm; mức khá từ 70 điểm đến dưới 80 điểm; mức đạt từ 50 điểm đến dứoi 70 điểm và không đạt: dưới 50 điểm</p>

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
                                maskClosable={false}
                                open={isOpenTranscriptComment}
                                // onOk={handleCreateTranscript}
                                onCancel={handleCancelTranscriptComment}
                                cancelButtonProps={{ style: { display: 'none' } }}
                                okButtonProps={{ style: { display: 'none' } }}
                                width={800}
                                style={{
                                    marginTop: -80,
                                    height: 780,
                                    overflow: 'scroll',
                                    borderRadius: 10
                                }}
                            >
                                <div>
                                    <div>
                                        <div style={{ textAlign: 'center' }}>
                                            <h3>PHIẾU ĐÁNH GIÁ</h3>
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <h3>NGHIỆM THU ĐỀ TÀI KHOA HỌC VÀ CÔNG NGHỆ CẤP CƠ SỞ</h3>
                                        </div>
                                        <div style={{ textAlign: 'center' }}><b>(đề tài do sinh viên thực hiện)</b></div>
                                    </div>
                                    <div style={{ marginTop: 20 }}>
                                        <div>
                                            <b>1. Họ và tên thành viên Hội đồng:</b> {lecturer?.lecturer_name}
                                        </div>
                                        <div>
                                            <b>2. Tên đề tài:</b> {choosedTopic?.topic_name}
                                        </div>
                                        <div>
                                            <b>3. Sinh viên thực hiện:</b> {choosedTopic?.student.map(item => {
                                                if (item.role === 'chủ nhiệm đề tài') {
                                                    return (
                                                        item.student_name + `(${item.role})`
                                                    )
                                                }
                                            })}
                                        </div>
                                        <div style={{ marginBottom: 20 }}>
                                            <b>4. Đánh giá của thành viên Hội đồng</b>
                                        </div>
                                    </div>
                                    <Form
                                        form={formTranscriptComment}
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
                                        onFinish={createTranscriptComment}
                                        onFinishFailed={onFinishFailed}
                                        autoComplete="off"

                                    >
                                        <Table
                                            dataSource={dataComment}
                                            pagination={false}
                                            bordered={true}
                                        >
                                            <Column title="Stt" dataIndex="key" key="key" />
                                            <Column title="Nội dung đánh giá" dataIndex="content" key="content" />
                                            <Column title="Ý kiến của thành viên hội đồng" dataIndex="comment" key="comment" />
                                        </Table>

                                        <div style={{ marginTop: 25 }}>
                                            <b>5. Ý kiến nhận xét của thành viên Hội đồng về: </b>
                                            <br></br>
                                            <b>- Kết quả của đề tài:</b>
                                        </div>
                                        <Form.Item
                                            name="comment8"
                                            rules={[{ required: true, message: "Bạn chưa nhận xét" }]}
                                        >
                                            <TextArea style={{ width: 800, minHeight: 150 }}
                                            />
                                        </Form.Item>
                                        <b>- Những tồn tại và đề xuất hướng hoặc biện pháp giải quyết:
                                        </b>
                                        <Form.Item
                                            name="comment9"
                                            rules={[{ required: true, message: "Bạn chưa nhận xét" }]}
                                        >
                                            <TextArea style={{ width: 800, minHeight: 150 }}
                                            />
                                        </Form.Item>


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
                                style={{
                                    marginTop: -80,
                                    height: 780,
                                    overflow: 'scroll',
                                    borderRadius: 10
                                }}
                                maskClosable={false}
                                title="Nhận xét của hội đồng nghiệm thu"
                                open={isModalAccOpen}
                                // onOk={handleOkAcc}
                                onCancel={handleCancelAcc}
                                cancelButtonProps={{ style: { display: 'none' } }}
                                okButtonProps={{ style: { display: 'none' } }}
                                width={1000}
                            >

                                <Collapse
                                    items={
                                        items
                                    }
                                    defaultActiveKey={['1']}
                                    style={{ marginTop: 25 }}

                                />
                                {hasRole === true && topicList?.status?.status_id === 18 ?
                                    <Button style={{ marginTop: 30 }} type="primary" onClick={approveTopicReport}>Duyệt qua kết quả nghiệm thu</Button>
                                    : ''}
                            </Modal>

                            <Col span={5}>

                            </Col>
                        </Row>
                    </div>
                </div >
            </div>
        </>
    )
}



export default LecturerAcceptanceBoard