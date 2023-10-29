import { CaretLeftOutlined, CaretRightOutlined, DownOutlined, EditOutlined, UploadOutlined } from "@ant-design/icons"
import { Button, Col, Collapse, DatePicker, Descriptions, Dropdown, Form, Input, message, Modal, notification, Row, Select, Space, Steps, Upload } from "antd"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { callCreateStudent, callCreateUser, callGetAcceptanceFile, callGetExplanationByid, callGetExplanationCoucilById, callGetFileWithTopic, callGetLecturerById, callGetLetterFile, callGetMajors, callGetNotificationAddFile, callGetNotificationAddFileExplanation, callGetNotificationAddFilePhase2, callGetStudentByCode, callGetTopicAccById, callGetTopicById, callGetTopicEditExFile, callGetTopicStatus, callGetTranscriptAccByTopicId, callGetTranscriptByTopicId, callUpdateFile, callUpdateStudentRole, callUpdateStudentTopic, callUpdateTopic, callUpdateTopicInfo, callUpdateTopicPlace, callUpdateTopicStatus, callUploadPresentFile } from "../../../../services/api"
import { Document, Page, pdfjs } from 'react-pdf';
import "react-pdf/dist/esm/Page/TextLayer.css";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import ModalSendDocument from "../../ModalStudent/ModalSendDocument"
import ModalFileExplanation from "./ModalTopic/ModalFileExplanation"
import DrawerListFile from "./ModalTopic/DrawerListFile"
import ModalAddFileExplanation from "./ModalTopic/ModalAddFilesExplanation"
import ModalGetTranscriptExplanation from "./ModalTopic/ModalGetTranscriptExplanation"
import ModalEditFileExplanation from "./ModalTopic/ModalEditFileExplanation"
import ModalAddFileAcceptance from "./ModalTopic/ModalAddFileAcceptance"

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const Topic = (props) => {
    const [topicInfo, setTopicInfo] = useState([])
    const [topicAccInfo, setTopicAccInfo] = useState([])
    const [lecturerInfo, setLecturerInfo] = useState([])
    // const topicId = useSelector(state => state.student.user.topic_id)
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const fileType = ['application/pdf']

    const [filePreview, setFilePreview] = useState(null)
    const [pdfFile, setPdfFile] = useState()
    const [pdfFileAcc, setPdfFileAcc] = useState()
    const [pdfFileLetter, setPdfFileLetter] = useState()
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false)
    const [isModalOpenView, setIsMOdalOpenView] = useState(false)

    const [hasFile, setHasFile] = useState(false)
    const [hasAcceptanceFile, setHasAcceptanceFile] = useState(false)
    const [hasLetterFile, setHasLetterFile] = useState(false)
    const [hasEditFile, setHasEditFile] = useState(false)

    const [editExFile, setEditExFile] = useState([])
    const [thesisFile, setThesisFile] = useState([])

    const [letterFile, setLetterFile] = useState([])
    const [acceptanceFile, setAcceptanceFile] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalAccOpen, setIsModalAccOpen] = useState(false);

    const [transcriptInfo, setTranscriptInfo] = useState([])
    const [transcriptAccInfo, setTranscriptAccInfo] = useState([])

    const [dataTranscript, setDataTranscript] = useState([])

    const [buttonAppear, setButtonAppear] = useState(false)
    const [topicMember, setTopicMember] = useState([])
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [form] = Form.useForm()
    const [formEdit] = Form.useForm()
    const [majorInfo, setMajorInfo] = useState([])
    const [dataStudent, setDataStudent] = useState()
    const [hasNotiAddFileExplanation, setHasNotiAddFileExplanation] = useState(false)
    const [hasNotiAddFileExplanation2, setHasNotiAddFileExplanation2] = useState(false)
    const [openModalAddFileExplanation, setOpenModalAddFileExplanation] = useState(false)
    const [hasNoti, setHasNoti] = useState(false)
    const [hasNoti2, setHasNoti2] = useState(false)
    const [current, setCurrent] = useState(0);

    const [isOpenAddExplanation, setIsOpenAddExplanation] = useState(false)
    const [isOpenDrawerListFile, setIsOpenDrawerListFile] = useState(false)

    const [isModalExplanationOpen, setIsModalExplanationOpen] = useState(false)
    const [isOpenAddEditExplanation, setIsOpenAddEditExplanation] = useState(false)
    const [isOpenAddAcceptance, setIsOpenAddAcceptance] = useState(false)

    const [openSendDocument, setOpenSendDocument] = useState(false)
    const dateFormat = 'DD-MM-YYYY';


    let reload = false

    let { topicId, setTopicId } = props





    useEffect(() => {
        getFile()
        getTranscript()
        getMajor()
        getTopicAccInfo()
        getAccTranscript()
        getNotificationAddFile()
        getNotiAddFileExplanation()
    }, []
    )

    useEffect(() => {
        getTopicInfo()
    })

    // [topicId, pdfFile, topicInfo]
    const getMajor = async () => {
        const res = await callGetMajors()
        if (res) {
            setMajorInfo(res.data.payload.items)
        }
    }

    const getNotificationAddFile = async () => {
        const res = await callGetNotificationAddFile()
        let noti = res.data.payload.items
        const topic = await callGetTopicById(topicId)
        let topicPhase = topic.data.payload.phase

        let today = new Date()
        let todayInt = today.getTime()

        if (noti.length > 0) {
            noti.map(item => {
                if (topicPhase === 1 && item.type === 'nghiệm thu và báo cáo đợt 1') {
                    if (todayInt > +item.start_date && todayInt < +item.end_date)
                        setHasNoti(true)
                }
                if (topicPhase === 2 && item.type === 'nghiệm thu và báo cáo đợt 2') {
                    if (todayInt > +item.start_date && todayInt < +item.end_date)
                        setHasNoti2(true)
                }
            })
        }
    }

    const getNotiAddFileExplanation = async () => {
        const res = await callGetNotificationAddFileExplanation()
        let noti = res.data.payload.items
        const topic = await callGetTopicById(topicId)
        let topicPhase = topic.data.payload.phase

        let today = new Date()
        let todayInt = today.getTime()

        if (noti.length > 0) {
            noti.map(item => {
                if (topicPhase === 1 && item.type === 'Thông báo nộp hồ sơ thuyết minh đợt 1') {
                    if (todayInt > +item.start_date && todayInt < +item.end_date)
                        setHasNotiAddFileExplanation(true)
                }
                if (topicPhase === 2 && item.type === 'Thông báo nộp hồ sơ thuyết minh đợt 2') {
                    if (todayInt > +item.start_date && todayInt < +item.end_date)
                        setHasNotiAddFileExplanation2(true)
                }
            })
        }
    }

    const getTopicInfo = async () => {
        const resTopicInfo = await callGetTopicById(topicId)
        let topic = resTopicInfo?.data?.payload
        topic.acceptancedate = (new Date(+topic.acceptancedate)).toLocaleDateString()
        setTopicInfo(topic)

        // console.log('check a', topic)
        switch (topic?.status?.status_id) {
            case 3:
                // code block
                setCurrent(1)
                break;
            case 4:
                // code block
                setCurrent(2)
                break;
            case 5:
                // code block
                setCurrent(3)
                if (topic?.file?.length === 3) {
                    setCurrent(4)
                }
                break;
            case 15:
                // code block
                setCurrent(5)
                break;
            case 16:
                // code block
                setCurrent(6)
                break;
            case 17:
                // code block
                setCurrent(7)
                break;
            case 6:
                // code block
                setCurrent(7)
                break;
            case 7:
                // code block
                setCurrent(8)
                break;
            case 8:
                // code block
                setCurrent(9)
                break;
            case 9:
                // code block
                setCurrent(10)
                break;
            case 10:
                // code block
                setCurrent(11)
                break;
            case 11:
                // code block
                setCurrent(12)
                break;
            case 12:
                // code block
                setCurrent(13)
                break;
            case 13:
                // code block
                setCurrent(14)
                break;
            case 14:
                // code block
                setCurrent(15)
                break;
            case 18:
                // code block
                setCurrent(16)
                break;
            case 20:
                // code block
                setCurrent(17)
                break;


            default:
            // code block
        }
        setTopicMember(resTopicInfo?.data?.payload?.student)
    }

    const getTopicAccInfo = async () => {
        const resTopicInfo = await callGetTopicAccById(topicId)

        setTopicAccInfo(resTopicInfo?.data?.payload)
    }

    const getTranscript = async () => {
        const res = await callGetTranscriptByTopicId(topicId)
        if (res.data.payload.length > 0) {
            setTranscriptInfo(res.data.payload)
        }
    }

    const getAccTranscript = async () => {
        console.log(topicInfo)
        const resTopicInfo = await callGetTopicById(topicId)
        let topic = resTopicInfo?.data?.payload

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
            // console.log(arrData)
            setDataTranscript(res.data.payload)
        }

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
        const resAcceptance = await callGetAcceptanceFile(topicId)
        if (resAcceptance.data.payload.items.length > 0) {
            let fileData = resAcceptance.data.payload.items
            fileData.map(item => {
                setAcceptanceFile(item)
            })
            setHasAcceptanceFile(true)
        }

        const resLetter = await callGetLetterFile(topicId)
        // console.log('letter', resLetter.data.payload.items)
        if (resLetter.data.payload.items.length > 0) {
            let fileData = resLetter.data.payload.items
            fileData.map(item => {
                setLetterFile(item)
            })
            setHasLetterFile(true)
        }

        const resEditEx = await callGetTopicEditExFile(topicId)
        if (resEditEx.data.payload.items.length > 0) {
            let fileData = resEditEx.data.payload.items
            fileData.map(item => {
                setEditExFile(item)
            })
            setHasEditFile(true)
        }


    }



    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const seeFile = (values) => {
        if (thesisFile) {
            setIsMOdalOpenView(true)
            setFilePreview(thesisFile.file_url)
            setButtonAppear(true)
        } else {
            setFilePreview(null)
        }

    };
    const seeFileAcc = (values) => {
        if (acceptanceFile) {
            setIsMOdalOpenView(true)
            setFilePreview(acceptanceFile.file_url)
            setButtonAppear(true)
        } else {
            setFilePreview(null)
        }
    };
    const seeFileLetter = (values) => {
        if (letterFile) {
            setIsMOdalOpenView(true)
            setFilePreview(letterFile.file_url)
            setButtonAppear(true)
        } else {
            setFilePreview(null)
        }

    };


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const chooseFile = (e) => {
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

    const chooseAcceptanceFile = (e) => {
        let file = e.file.originFileObj
        if (file && fileType.includes(file.type)) {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                console.log('check file', e.target.result)
                setPdfFileAcc(e.target.result)
            }
        } else {
            setPdfFileAcc(null)
        }
    }




    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    const handleSaveFile = (e) => {
        console.log('jeje', e)
    }


    const propsFileEditEx = {
        defaultFileList: [
            {
                uid: '1',
                name: editExFile?.file_name,
                status: 'done',
                url: editExFile?.file_url,
            },

        ],
        onRemove: false

    };

    const propsFileAcceptance = {
        defaultFileList: [
            {
                uid: '1',
                name: acceptanceFile?.file_name,
                status: 'done',
                url: acceptanceFile?.file_url,
            },

        ],
        onRemove: false


    };

    const propsFileLetter = {
        defaultFileList: [
            {
                uid: '1',
                name: letterFile?.file_name,
                status: 'done',
                url: letterFile?.file_url,
            },

        ],
        onRemove: false


    };

    const GetTranscript = () => {
        if (topicInfo.status.status_id === 3 ||
            topicInfo.status.status_id === 4 ||
            topicInfo.status.status_id === 5 ||
            topicInfo.status.status_id === 15
        ) {
            notification.error({
                message: 'Thư ký hội đồng nghiệm thu chưa duyệt qua kết báo cáo',
                duration: 2
            })
        } else {
            setIsModalExplanationOpen(true);
        }

    }

    const GetTranscriptAcc = () => {
        if (topicInfo?.status?.status_id === 20) {
            setIsModalAccOpen(true)
        } else {
            notification.error({
                message: 'Chờ thư ký hội đồng duyệt qua kết quả nghiệm thu',
                duration: 2
            })
        }
    }

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOkAcc = () => {
        setIsModalAccOpen(false);
    };
    const handleCancelAcc = () => {
        setIsModalAccOpen(false);
    };

    const openAddStudentModal = () => {
        if (topicInfo.status.status_id <= 6) {
            if (topicMember.length >= 5) {
                notification.error({
                    message: 'Đề tài đã đạt tối đa thành viên',
                    duration: 2
                })
            } else {
                setIsModalAddOpen(true)
            }
        } else {
            notification.error({
                message: 'Không thể thêm thành viên trong quá trình thực hiện',
                duration: 2
            })
        }

    }

    const handleCancelAddModel = () => {
        setIsModalAddOpen(false)
        form.resetFields()
        setDataStudent([])
    }

    const onAddStudent = async (values) => {
        if (topicInfo?.student.length < 5) {
            if (dataStudent.topic_id !== null) {
                notification.error({
                    message: 'Đề tài đã đủ 5 thành viên',
                    duration: 2
                })
            } else {
                const res = callUpdateStudentTopic(dataStudent.student_id, topicInfo.topic_id)
                const role = callUpdateStudentRole(dataStudent.student_id, 'thành viên')
                if (res && role) {
                    notification.success({
                        message: 'Thêm thành viên cho đề tài thành công',
                        duration: 2
                    })
                    form.resetFields()
                    setDataStudent([])
                    setIsModalAddOpen(false)
                }
            }
        } else {
            notification.error({
                message: 'Đề tài đã đủ 5 thành viên',
                duration: 2
            })
        }

    };

    const onFinishEditEx = async (values) => {
        let file = values.presentFile.file.originFileObj

        const res = await callUploadPresentFile(file.name, pdfFile, "edit explanation", topicInfo.topic_id)
        const updateTopic = await callUpdateTopicStatus(topicId, 17)
        notification.success({
            message: 'Tải file gỉai trình thuyết minh thành công ',
            duration: 2
        })
        setPdfFile(null)
    };

    const sendDocumentAcc = (data) => {
        setOpenSendDocument(true)
    }

    const saveInfoAcc = async (data) => {
        const res = await callUpdateTopicPlace(topicInfo.topic_id, data.place)
        if (res) {
            const status = await callUpdateTopicStatus(topicInfo.topic_id, 18)
            notification.success({
                message: 'Cập nhật thông tin báo cáo nghiệm thu thành công',
                duration: 2
            })
        }
    }
    const openEditTopic = async () => {
        const res = await callGetExplanationByid(topicInfo.explanationboard)
        let member = 0
        if (res?.data?.payload?.items?.president !== null) {
            member = member + 1
        }
        if (res?.data?.payload?.items?.secretary !== null) {
            member = member + 1
        }
        if (res?.data?.payload?.items?.commissioners !== null) {
            // console.log('check type', (res?.data?.payload?.items?.commissioners?.length))
            member = member + res?.data?.payload?.items?.commissioners?.length
        }
        // console.log('chek member', member)

        if (topicInfo.status.status_id >= 7 && topicInfo.status.status_id <= 13) {
            notification.error({
                message: 'Không thể sửa thông tin đề tài trong quá trình thực hiện!',
                duration: 2
            })
        } else {
            setIsModalOpenEdit(true)

        }
    }

    const openAddExplanation = () => {
        setIsOpenAddExplanation(true)
    }



    const openDrawerListFile = () => {
        setIsOpenDrawerListFile(true)
    }

    const openAddFileExplanation = () => {
        setOpenModalAddFileExplanation(true)
    }

    const items = [
        {
            key: '1',
            label: 'Tên đề tài',
            children: [
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div>{topicInfo.topic_name}</div>
                    {/* <div>hehe</div> */}
                </div>
            ],
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
            key: '11',
            label: 'Thời gian thực hiện',
            children: topicInfo?.duration,
            span: '16'
        },
        {
            key: '4',
            label: 'Giáo viên hướng dẫn',
            children: topicInfo.lecturer_id ? topicInfo?.lecturerInfo?.degree + ' ' + topicInfo?.lecturerInfo?.lecturer_name : 'Chưa có giáo viên hướng dẫn',
            span: '16'
        },
        {
            key: '8',
            label: 'Thành viên đề tài',
            children: [
                <div>
                    {topicMember.map((student, index) => {
                        return (
                            <div>{student.student_name}</div>
                        )
                    })}
                    <Button type='primary' style={{ marginTop: 10 }} onClick={openAddStudentModal}>Thêm thành viên</Button>
                </div>
            ]
            ,
            span: '16'
        },
        {
            key: '12',
            label: 'Danh sách file',
            children: [
                <div>
                    <Button type="primary" onClick={openDrawerListFile}>Xem danh sách file</Button>
                </div>
            ],
            span: '16'
        },

        {
            key: '7',
            label: 'Hội đồng thuyết minh',
            children: [
                <div>
                    {topicInfo.board === null ?
                        <div>Chưa có hội đồng thuyết minh</div>
                        :
                        <div>
                            <div>Chủ tịch hội đồng: {topicInfo?.board?.presidentInfo?.lecturer_name}</div>
                            <div>Thư ký: {topicInfo?.board?.secretaryInfo?.lecturer_name}</div>

                            {
                                topicAccInfo?.board?.commissioners.map(item => {
                                    return (
                                        <div>Ủy viên: {item?.lecturerInfo?.lecturer_name}</div>

                                    )
                                })
                            }

                            <Button style={{ marginTop: 10 }} onClick={GetTranscript} type="primary">Xem nhận xét</Button>
                        </div>
                    }

                </div>
            ],
            span: '16'
        },
        {
            key: '10',
            label: 'Hội đồng nghiệm thu',
            children: [
                <div>
                    {topicAccInfo.accBoard === null ?
                        <div>Chưa có hội đồng thuyết minh</div>
                        :
                        <div>
                            {topicInfo?.acceptancedate === null ? 'Chưa có ngày báo cáo' :
                                <h4>Ngày báo cáo: {topicInfo.acceptancedate}</h4>
                            }
                            <div>Chủ tịch hội đồng: {topicAccInfo?.accBoard?.presidentInfo?.lecturer_name}</div>
                            <div>Thư ký: {topicAccInfo?.accBoard?.secretaryInfo?.lecturer_name}</div>
                            {
                                topicAccInfo?.accBoard?.counter.map(item => {
                                    return (
                                        <div>Phản biện: {item?.lecturerInfo?.lecturer_name}</div>

                                    )
                                })
                            }
                            {
                                topicAccInfo?.accBoard?.commissioners.map(item => {
                                    return (
                                        <div>Ủy viên: {item?.lecturerInfo?.lecturer_name}</div>

                                    )
                                })
                            }
                            {topicInfo?.status?.status_id === 13 ?
                                <Button style={{ marginTop: 10 }} onClick={() => sendDocumentAcc(topicInfo)} type="primary">Gửi hồ sơ cho hội đồng</Button>
                                : ''}
                            <div>
                                <Button style={{ marginTop: 10 }} onClick={GetTranscriptAcc} type="primary">Xem nhận xét</Button>
                            </div>
                        </div>
                    }

                </div>
            ],
            span: '16'
        },
        {
            key: '11',
            label: 'Thao tác',
            children: [
                <div>
                    {topicInfo?.status?.status_id === 14 ?
                        <>
                            <h4>Thông báo về thời gian và địa điểm nghiệm thu cho phòng quản lí khoa học</h4>
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
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={saveInfoAcc}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                                fields={[
                                    {
                                        name: ["date"],
                                        value: topicInfo.acceptancedate,
                                    },
                                ]}
                            >
                                <Form.Item
                                    label="Thời gian tổ chức nghiệm thu"
                                    name="date"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nhập thời gian nghiệm thu!',
                                        },
                                    ]}
                                >
                                    <Input
                                        disabled
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Địa điểm tổ chức nghiệm thu"
                                    name="place"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nhập địa điểm nghiệm thu!',
                                        },
                                    ]}
                                >
                                    <Input />
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
                        </>

                        : ''}
                    {topicInfo?.status?.status_id === 3 || topicInfo?.status?.status_id === 4 || topicInfo?.status?.status_id === 5 || topicInfo?.status?.status_id === 16 ?
                        <div style={{ marginBottom: 15 }}>
                            <Button style={{ marginLeft: 0 }} type="primary" onClick={openEditTopic}>Sửa thông tin đề tài</Button>

                        </div>
                        : ''
                    }
                    {topicInfo?.status?.status_id === 3 ?
                        <Button style={{ marginLeft: 0 }} type="primary" onClick={openAddExplanation}>Tải lên file thuyết minh</Button>
                        : ''}

                    {topicInfo?.file?.length >= 3 ? '' :
                        topicInfo?.status?.status_id === 5 && hasNotiAddFileExplanation || hasNotiAddFileExplanation2 ?
                            <Button style={{ marginLeft: 0 }} type="primary" onClick={openAddFileExplanation}>Tải lên hồ sơ thuyết minh</Button>
                            : ''
                    }
                    {topicInfo?.status?.status_id === 16 ?
                        <Button style={{ marginLeft: 0 }} type="primary" onClick={() => setIsOpenAddEditExplanation(true)}>Tải lên file giải trình chỉnh sửa</Button>
                        : ''}
                    {topicInfo?.status?.status_id === 8 && hasNoti === true || hasNoti2 === true ?
                        <Button style={{ marginLeft: 0 }} type="primary" onClick={() => setIsOpenAddAcceptance(true)}>Nộp đơn xin nghiệm thu</Button>
                        : ''}



                </div>
            ],
            span: '16'
        },
    ]

    const prevPage = () => {
        setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1)
    }

    const nextPage = () => {
        setPageNumber(pageNumber + 1 >= numPages ? pageNumber : pageNumber + 1)
    }

    const onChangeAdd = (values) => {
        console.log('check changes', values)
    }

    const onFinishCode = async (values) => {
        const res = await callGetStudentByCode(values.student_code)
        if (res?.data?.payload) {
            setDataStudent(res.data.payload)
        } else {
            notification.error({
                message: 'Mã số sinh viên không tồn tại!',
                duration: 2
            })
        }
    }

    const onFinishFailedCode = () => {
        console.log('check failed')
    }


    const handleEditTopic = async (values) => {
        let file = values.fileEx.file.originFileObj
        const res = await callUpdateFile(thesisFile.file_id, file.name, pdfFile, "explanation", topicInfo.topic_id)
        const resTopic = await callUpdateTopicInfo(topicInfo.topic_id, values.name, values.research_area, values.description)
        if (res && resTopic) {
            notification.success({
                message: 'Cập nhật thông tin đề tài thành công',
                duration: 2
            })
            formEdit.resetFields()
            setIsModalOpenEdit(false)
        } else {
            notification.error({
                message: 'Có lỗi xảy ra!',
                duration: 2
            })
        }
    }



    const handleCancelEditTopic = () => {
        setIsModalOpenEdit(false)
        formEdit.resetFields()
    }

    const onFinishFailedEdit = () => {
        console.log('hehe')
    }

    const handleCancelView = () => {
        setIsMOdalOpenView(false)
        setNumPages(null)
        setPageNumber(1)
    }


    const onChangeStatus = (value) => {
        console.log('onChange:', value);
    };

    var arr = [];
    var len = dataTranscript?.length;
    for (var i = 0; i < len; i++) {
        arr.push({
            key: i + 1,
            label: [
                <div>
                    {topicAccInfo?.accBoard?.presidentInfo?.lecturer_name === dataTranscript[i]?.lecturerInfo?.lecturer_name ?
                        <>                        Chủ tịch: {topicAccInfo?.accBoard?.presidentInfo?.lecturer_name}
                        </>
                        : ''}
                    {topicAccInfo?.accBoard?.secretaryInfo?.lecturer_name === dataTranscript[i]?.lecturerInfo?.lecturer_name ?
                        <>                        Thư ký: {topicAccInfo?.accBoard?.secretaryInfo?.lecturer_name}
                        </>
                        : ''}
                    {topicAccInfo?.accBoard?.commissioners.map(item => {
                        if (item?.lecturerInfo?.lecturer_name === dataTranscript[i]?.lecturerInfo?.lecturer_name) {
                            return (
                                <>
                                    Ủy viên: {item?.lecturerInfo?.lecturer_name}
                                </>
                            )
                        }
                    })}
                    {topicAccInfo?.accBoard?.counter.map(item => {
                        if (item?.lecturerInfo?.lecturer_name === dataTranscript[i]?.lecturerInfo?.lecturer_name) {
                            return (
                                <>
                                    Phản biện: {item?.lecturerInfo?.lecturer_name}
                                </>
                            )
                        }
                    })}
                </div>
            ],
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
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[i]?.scoreInfo?.score1}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[i]?.commentInfo?.comment1}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Mục tiêu đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[i]?.scoreInfo?.score2}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[i]?.commentInfo?.comment2}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Phương pháp nghiên cứu</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[i]?.scoreInfo?.score3}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[i]?.commentInfo?.comment3}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Nội dung khoa họcNội dung khoa học</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[i]?.scoreInfo?.score4}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[i]?.commentInfo?.comment4}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Đóng góp về mặt kinh tế - xã hội, giáo dục và đào tạo, an ninh, quốc phòng</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[i]?.scoreInfo?.score5}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[i]?.commentInfo?.comment5}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Hình thức trình bày báo cáo tổng kết đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[i]?.scoreInfo?.score6}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[i]?.commentInfo?.comment6}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Thời gian và tiến độ thực hiện đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[i]?.scoreInfo?.score7}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[i]?.commentInfo?.comment7}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Điểm thưởng</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[i]?.scoreInfo?.score8}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}></td>
                            </tr>
                        </table >
                        <span style={{ marginBottom: 30 }}><b>Ý kiến của hội đồng về kết quả của đề tài: </b>{dataTranscript[i]?.commentInfo?.comment8}</span>
                        <br></br>
                        <span><b>Những tồn tại và đề xuất hướng hoặc biện pháp để giải quyết: </b>{dataTranscript[i]?.commentInfo?.comment9}</span>

                    </div>

                ],
        });
    }



    const itemStep = [
        {
            key: '1',
            label: 'Tiến độ của đề tài',
            children: [
                <Steps
                    current={current}
                    onChange={onChangeStatus}
                    direction="vertical"
                    style={{ width: 280, textAlign: 'right' }}
                    items={[
                        {
                            title: 'Tạo đề tài',
                        },
                        {
                            title: 'Tải lên file thuyết minh',
                        },
                        {
                            title: 'Tìm giáo viên hướng dẫn',
                        },
                        {
                            title: 'Tải lên hồ sơ thuyết minh',
                        },
                        {
                            title: 'Chờ phân công hội đồng',
                        },
                        {
                            title: 'Báo cáo thuyết minh',
                        },
                        {
                            title: 'Nộp file giải trình',
                        },
                        {
                            title: 'Bắt đầu thực hiện',
                        },
                        {
                            title: 'Chờ giáo viên hướng dẫn mời hội đồng',
                        },
                        {
                            title: 'Nộp đơn xin nghiệm thu',
                        },
                        {
                            title: 'Chờ giáo viên hướng dẫn duyệt',
                        },
                        {
                            title: 'Chờ trường duyệt',
                        },
                        {
                            title: 'Chờ nhận quyết định nghiệm thu',
                        },
                        {
                            title: 'Chờ giáo viên hướng dẫn chọn ngày báo cáo',
                        },
                        {
                            title: 'Nộp hồ sơ biểu mẫu cho hội đồng',
                        },
                        {
                            title: 'Thông báo thời gian và địa điểm nghiệm thu',
                        },
                        {
                            title: 'Báo cáo nghiệm thu',
                        },

                    ]}
                />
            ]
        },
    ]

    return (
        <>
            <div style={{ backgroundColor: '#efefef', marginLeft: -8, marginRight: -8, marginTop: 8, marginBottom: -8, paddingBottom: 20 }}>
                <div style={{ minHeight: 570 }}>
                    <Row>
                        <Col span={5}>
                            <Collapse
                                items={
                                    itemStep
                                }
                                bordered={false}
                            />

                        </Col>

                        <Col span={14} style={{ height: '50%', backgroundColor: 'white', borderRadius: 10, padding: 15, fontSize: 14 }}>
                            <div>
                                <span>
                                    <h3>THÔNG TIN ĐỀ TÀI CỦA BẠN &nbsp;
                                    </h3>
                                </span>
                                <Descriptions bordered items={items} />
                            </div>
                        </Col>

                        <Col onSubmit={handleSaveFile} span={5}>
                        </Col>

                    </Row>
                </div>



                <Modal
                    title="Nhận xét của hội đồng nghiệm thu"
                    style={{
                        marginTop: -80,
                        height: 780,
                        overflow: 'scroll',
                        borderRadius: 10
                    }}
                    maskClosable={false}
                    open={isModalAccOpen}
                    onOk={handleOkAcc}
                    onCancel={handleCancelAcc}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    okButtonProps={{ style: { display: 'none' } }}
                    width={1000}

                >
                    <Collapse
                        items={
                            arr
                        }
                        defaultActiveKey={['1']}
                        style={{ marginTop: 25 }}

                    />
                </Modal>

                <Modal
                    title="Thêm thành viên"
                    open={isModalAddOpen}
                    onCancel={handleCancelAddModel}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    okButtonProps={{ style: { display: 'none' } }}
                    maskClosable={false}
                    style={{
                        marginTop: -80,
                        height: 780,
                        overflow: 'scroll',
                        borderRadius: 10
                    }}
                >
                    <Form
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
                        onFinish={onFinishCode}
                        onFinishFailed={onFinishFailedCode}
                        autoComplete="off"
                        form={form}
                    >
                        <Form.Item
                            label="Mã số sinh viên"
                            name="student_code"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bạn chưa nhập mã số sinh viên!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 0,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Nhập mã số sinh viên
                            </Button>
                        </Form.Item>
                    </Form>
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
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onAddStudent}
                        onCancel={handleCancelAddModel}
                        onChange={onChangeAdd}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        fields={[
                            {
                                name: ["student_name"],
                                value: dataStudent?.student_name,
                            },
                            {
                                name: ["student_class"],
                                value: dataStudent?.student_class,
                            },
                            {
                                name: ["student_email"],
                                value: dataStudent?.email,
                            },
                            {
                                name: ["student_grade"],
                                value: dataStudent?.grade,
                            },
                            {
                                name: ["student_major"],
                                value: dataStudent?.major?.major_name,
                            },
                        ]}
                    >
                        <Form.Item
                            label="Tên sinh viên"
                            name="student_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bạn chưa nhập tên sinh viên!',
                                },
                            ]}
                        >
                            <Input disabled />
                        </Form.Item>

                        <Form.Item
                            label="Lớp học"
                            name="student_class"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bạn chưa nhập lớp học của sinh viên!',
                                },
                            ]}
                        >
                            <Input disabled />
                        </Form.Item>


                        <Form.Item
                            label="Email"
                            name="student_email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bạn chưa nhập email của sinh viên!',
                                },
                            ]}
                        >
                            <Input disabled />
                        </Form.Item>

                        <Form.Item
                            label="Niên khóa"
                            name="student_grade"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bạn chưa nhập niên khóa của sinh viên!',
                                },
                            ]}
                        >
                            <Input disabled />
                        </Form.Item>

                        <Form.Item
                            label="Chuyên nghành"
                            name="student_major"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bạn chưa chuyên nghành của sinh viên!',
                                },
                            ]}
                        >
                            <Input disabled />
                        </Form.Item>




                        <Form.Item
                            wrapperCol={{
                                offset: 17,
                                span: 24,
                            }}
                        >
                            <Button type="primary" htmlType="submit" >
                                Thêm sinh viên
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal title="Sửa thông tin đề tài"
                    open={isModalOpenEdit}
                    onCancel={handleCancelEditTopic}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    okButtonProps={{ style: { display: 'none' } }}
                >
                    <Form
                        form={formEdit}
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
                        onFinish={handleEditTopic}
                        onFinishFailed={onFinishFailedEdit}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Tên đề tài"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập tên đề tài!',
                                },
                            ]}
                        >
                            <Input placeholder={topicInfo?.topic_name} />
                        </Form.Item>

                        <Form.Item
                            label="Lĩnh vực nghiên cứu"
                            name="research_area"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập lĩnh vực nghiên cứu!',
                                },
                            ]}
                        >
                            <Input placeholder={topicInfo?.research_area} />
                        </Form.Item>
                        <Form.Item
                            label="Mô tả đề tài"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập mô tả đề tài!',
                                },
                            ]}
                        >
                            <Input placeholder={topicInfo?.basic_description} />
                        </Form.Item>
                        <Form.Item
                            label="File thuyết minh"
                            name="fileEx"
                            rules={[
                                {
                                    required: true,
                                    message: 'Chọn file thuyết minh!',
                                },
                            ]}
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
                                Nộp hồ sơ
                            </Button>
                        </Form.Item>
                    </Form>

                </Modal>
                <ModalSendDocument
                    openSendDocument={openSendDocument}
                    setOpenSendDocument={setOpenSendDocument}
                    topicInfo={topicInfo}
                />
                <Modal
                    open={isModalOpenView}
                    onCancel={handleCancelView}
                    width={650}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    okButtonProps={{ style: { display: 'none' } }}
                >
                    <div style={{ marginLeft: 280 }}>
                        <CaretLeftOutlined onClick={prevPage} style={{ fontSize: 30 }} />
                        <CaretRightOutlined onClick={nextPage} style={{ fontSize: 30 }} />
                    </div>
                    <Document
                        file={filePreview}
                        onLoadSuccess={onDocumentLoadSuccess}
                        noData={''}
                        loading={''}
                    >
                        <Page pageNumber={pageNumber} renderAnnotationLayer={true} renderTextLayer={true}></Page>

                    </Document>
                </Modal>

                <ModalFileExplanation
                    isOpenAddExplanation={isOpenAddExplanation}
                    setIsOpenAddExplanation={setIsOpenAddExplanation}
                    topicInfo={topicInfo}
                />
                <DrawerListFile
                    isOpenDrawerListFile={isOpenDrawerListFile}
                    setIsOpenDrawerListFile={setIsOpenDrawerListFile}
                    topicInfo={topicInfo}
                />
                <ModalAddFileExplanation
                    openModalAddFileExplanation={openModalAddFileExplanation}
                    setOpenModalAddFileExplanation={setOpenModalAddFileExplanation}
                    topicInfo={topicInfo}
                />

                <ModalGetTranscriptExplanation
                    isModalExplanationOpen={isModalExplanationOpen}
                    setIsModalExplanationOpen={setIsModalExplanationOpen}
                    transcriptInfo={transcriptInfo}
                    topicInfo={topicInfo}
                />

                <ModalEditFileExplanation
                    setIsOpenAddEditExplanation={setIsOpenAddEditExplanation}
                    isOpenAddEditExplanation={isOpenAddEditExplanation}
                    topicInfo={topicInfo}
                />
                <ModalAddFileAcceptance
                    setIsOpenAddAcceptance={setIsOpenAddAcceptance}
                    isOpenAddAcceptance={isOpenAddAcceptance}
                    topicInfo={topicInfo}
                />

            </div>
        </>
    )
}
export default Topic