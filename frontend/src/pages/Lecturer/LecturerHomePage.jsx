import { CaretLeftOutlined, CaretRightOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Card, Col, DatePicker, Descriptions, Drawer, Form, message, Modal, notification, Popconfirm, Radio, Row, Segmented, Space, Table, Upload } from 'antd'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { callCheckInvi, callCheckInviRole, callCreateAccInvitation, callGetAcceptanceFile, callGetExplanationCoucilById, callGetLecturerByWorkPlace, callGetNotificationAddFile, callGetSentInvi, callGetTopicById, callGetTopicStudent, callGetTopicWithExplanation, callGetTranscriptAccByTopicId, callGetTranscriptByTopicId, callSetDateTopic, callUpdateTopicStatus } from '../../../services/api'
import './LecturerHomePage.scss'
import { Buffer } from 'buffer';
import "react-pdf/dist/esm/Page/TextLayer.css";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;



const LecturerHomePage = () => {
    const [lecturerTopic, setLecturerTopic] = useState([])
    const [pdfFile, setPdfFile] = useState()
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openModalEx, setOpenModalEx] = useState(false)
    const [openModalAcc, setOpenModalAcc] = useState(false)

    const [open, setOpen] = useState(false);
    const [openInvi, setOpenInvi] = useState(false)
    const [choosedTopic, setChoosedTopic] = useState()
    const [value, setValue] = useState()
    const [dataLecturer, setDataLecturer] = useState([])
    const lecturerId = useSelector(state => state?.lecturer?.user?.lecturer_id)
    const [valueRole, setValueRole] = useState()
    const [choosedLecturer, setChoosedLecturer] = useState()
    const [sentInvitation, setSentInvitation] = useState([])
    const [exTranscript, setExTranscript] = useState([])
    const [accTranscript, setAccTranscript] = useState([])
    const [choosedDate, setChoosedDate] = useState()

    const chooseRole = (e) => {
        setValueRole(e.target.value);
    };
    const dataPop = 'Chọn vai trò trong hội đồng';
    const description = [
        <div>
            <Radio.Group onChange={chooseRole} value={valueRole}>
                <Space direction="vertical">
                    <Radio value={1}>Chủ tịch hội đồng</Radio>
                    <Radio value={2}>Thư ký</Radio>
                    <Radio value={3}>Phản biện</Radio>
                    <Radio value={4}>
                        Ủy viên
                    </Radio>

                </Space>
            </Radio.Group>
        </div>
    ];

    const confirm = async () => {
        // console.log('check full', choosedTopic)
        if (choosedLecturer.lecturer_id === lecturerId) {
            notification.error({
                message: 'Bạn đã là giáo viên hướng dẫn cho đề tài này!',
                duration: 2
            })
        } else {
            const check = await callCheckInvi(lecturerId, choosedLecturer.lecturer_id, choosedTopic.topic_id)
            // console.log('chcek asda', check?.data?.payload)
            if (check?.data?.payload.length > 0) {
                notification.error({
                    message: 'Bạn đã mời giảng viên này!',
                    duration: 2
                })
            } else {
                const checkRole = await callCheckInviRole(lecturerId, choosedTopic.topic_id, valueRole)
                let check = checkRole?.data?.payload
                let isCheck = false
                console.log('check roleasd', checkRole)
                for (let i = 0; i < check.length; i++) {
                    if (check[i].type === 3) {
                        if (check.length >= 2) {
                            notification.error({
                                message: 'Bạn đã mời giảng viên khác cho vị trí này',
                                duration: 2
                            })
                            isCheck = true
                            break;
                        }
                    }
                }
                if (isCheck === false) {
                    const res = await callCreateAccInvitation(lecturerId, choosedLecturer.lecturer_id, choosedTopic.topic_id, valueRole)
                    if (res) {
                        notification.success({
                            message: 'Mời giảng viên thành công',
                            duration: 2
                        })
                    }

                }

            }


        }


        // message.info('Clicked on Yes.');
        // console.log('check res', check)
        // console.log('check role', valueRole)
        // console.log('check lectrurer', choosedLecturer)
        // console.log('check id', lecturerId)
        // console.log('check topic', choosedTopic)

    };
    const cancel = () => {
        message.info('Clicked on Yes.');
    };



    useEffect(() => {
        const callGetTopic = async () => {
            const res = await callGetTopicStudent(lecturerId)
            if (res.data.payload) {
                setLecturerTopic(res?.data?.payload)
            }
        }
        callGetTopic()
    }
        , [lecturerTopic]
    )



    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'lecturer_name',
            render: (text, record) => <button
                // onClick={() => showLecturerDetail(text, record)}
                style={{
                    backgroundColor: "white",
                    border: 'none',
                    color: '#1677ff',
                    cursor: "pointer",
                }}
            >
                {record.degree} {text}
            </button>,
        },
        {
            title: 'Chức vụ',
            dataIndex: 'position',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Thao tác',
            dataIndex: 'action',
            render: (text, record) =>
                // {hasSent === false ? : ''}
                <Popconfirm
                    placement="bottomRight"
                    title={dataPop}
                    description={description}
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Mời"
                    cancelText="No"
                    cancelButtonProps={{ style: { display: 'none' } }}
                >
                    <button
                        // disabled={hasLecturer}
                        onClick={() => doInviteLecturer(record)}
                        style={{
                            backgroundColor: "#87d068",
                            border: 'none',
                            color: 'white',
                            cursor: "pointer",
                            padding: '10px 20px 10px 20px',
                            borderRadius: 5,
                            fontSize: 14,
                        }}
                    >
                        Mời giảng viên
                    </button >
                </Popconfirm>

        },
    ];

    const doInviteLecturer = async (data) => {
        setChoosedLecturer(data)
    }

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



    const openDrawer = async (data) => {

        const res = await callGetNotificationAddFile()
        let noti = res.data.payload.items
        // const res2 = await callGetNotificationAddFilePhase2()
        // console.log('check res', res.data.payload.items)
        const topic = await callGetTopicById(data.topic_id)
        let topicPhase = topic.data.payload.phase
        // console.log('check phase', topicPhase)
        let notiCheck = false
        let today = new Date()
        let todayInt = today.getTime()

        if (noti.length > 0) {
            noti.map(item => {
                if (topicPhase === 1 && item.type === 'nghiệm thu và báo cáo đợt 1') {
                    if (todayInt > +item.start_date && todayInt < +item.end_date)
                        notiCheck = true
                }
                if (topicPhase === 2 && item.type === 'nghiệm thu và báo cáo đợt 2') {
                    if (todayInt > +item.start_date && todayInt < +item.end_date)
                        notiCheck = true
                }
            })
        }

        if (notiCheck = true) {
            setOpen(true);
            setChoosedTopic(data)
            const dataLecturer = await callGetLecturerByWorkPlace('CNPM')
            setDataLecturer(dataLecturer.data.payload)
        }

    }

    const openDrawerInvi = async (data) => {
        const sentInvi = await callGetSentInvi(lecturerId, data.topic_id)
        console.log('chcek sinvi', sentInvi.data.payload)
        if (sentInvi.data.payload) {
            setSentInvitation(sentInvi.data.payload)
        }
        setOpenInvi(true);
    }

    const onClose = () => {
        setOpen(false);
        setDataLecturer([])
        setValue('CNPM')
    };

    const onCloseInvi = () => {
        setOpenInvi(false)
    }

    const chooseWorkPlace = async (e) => {
        setValue(e.target.value)
        const res = await callGetLecturerByWorkPlace(e.target.value)
        setDataLecturer(res.data.payload)
    }

    const approveAcceptance = async (data) => {
        const file = await callGetAcceptanceFile(data.topic_id)
        let hasFile = file.data.payload.items
        if (hasFile.length === 0) {
            notification.error({
                message: 'Chưa có file đơn xin nghiệm thu của sinh viên',
                duration: 2
            })
        } else {
            const res = await callUpdateTopicStatus(data.topic_id, 10)
            if (res.data.payload) {
                notification.success({
                    message: 'Đề tài đã được duyệt',
                    duration: 2
                })
            }
        }
    }

    const confirmBoard = async (data) => {
        const res = await callGetExplanationCoucilById(data.acceptanceboard)
        let checkMember = res.data.payload.items
        if (checkMember.president !== null &&
            checkMember.secretary !== null &&
            checkMember.counter.length === 2 &&
            checkMember.commissioners.length > 0
        ) {
            const update = await callUpdateTopicStatus(data.topic_id, 8)
            notification.success({
                message: 'Duyệt hội đồng thành công',
                duration: 2
            })
        } else {
            notification.error({
                message: 'Hội đồng nghiệm thu chưa đủ thành viên',
                duration: 2
            })
        }
    }

    const handleOpenEx = async (data) => {
        setOpenModalEx(true)
        const res = await callGetTranscriptByTopicId(data.topic_id)
        console.log('check ex', res.data.payload)
        if (res.data.payload) {
            setExTranscript(res.data.payload)
        }
    }

    const handleOpenAcc = async (data) => {
        setOpenModalAcc(true)
        const res = await callGetTranscriptAccByTopicId(data.topic_id)
        console.log('check acc', res.data.payload)

        if (res.data.payload) {
            setAccTranscript(res.data.payload)
        }
    }

    const handleCancelModalEx = () => {
        setOpenModalEx(false)
    }

    const handleCancelModalAcc = () => {
        setOpenModalAcc(false)
    }
    const chooseDateReport = async (data) => {
        console.log(choosedDate)
        const res = await callSetDateTopic(data.topic_id, choosedDate)
        if (res) {
            const status = await callUpdateTopicStatus(data.topic_id, 13)
            notification.success({
                message: 'Chọn ngày báo cáo nghiệm thu thành công',
                duration: 2
            })
        }
    }

    const changeDate = (date, dateString) => {
        // let dateNumber = 
        let dateNumber = date.$d.getTime()
        setChoosedDate(dateNumber)
        console.log(dateNumber);
    };


    return (
        <div style={{ backgroundColor: '#efefef', marginLeft: -8, marginRight: -8, marginTop: 8 }}>
            <div className="LecturerHomePage-page">
                <Row>
                    <Col span={5}></Col>

                    <Col span={14} style={{ height: '100%', backgroundColor: 'white', borderRadius: 10, paddingTop: 10, fontSize: 14, paddingLeft: 20, paddingRight: 20 }}>
                        <div>
                            <h3>CÁC ĐỀ TÀI ĐANG PHỤ TRÁCH HƯỚNG DẪN</h3>
                            {lecturerTopic.map((lecturerTopic, index) => {
                                return (
                                    <div style={{ display: 'flex', border: '0px solid black', borderRadius: '0% 0% 0% 0% / 0% 0% 0% 0%', padding: 20, marginBottom: 50, marginTop: 30, position: 'relative', boxShadow: '5px 5px 10px rgba(0,0,0,.15)' }}>
                                        <div >
                                            <div style={{ marginBottom: 20 }}>
                                                <Descriptions title="Thông tin sinh viên" column={2} bordered={true} style={{ width: 760 }}>
                                                    {lecturerTopic?.student.map((student, index) => {
                                                        return (
                                                            <>
                                                                <Descriptions.Item style={{ width: 230 }} label="Tên sinh viên">{student?.student_name}</Descriptions.Item>
                                                                <Descriptions.Item label="Mã số sinh viên">{student?.student_code}</Descriptions.Item>
                                                            </>
                                                        )
                                                    })}
                                                </Descriptions>
                                            </div>
                                            <div>
                                                <Descriptions title="Thông tin đề tài" column={1} bordered={true}>
                                                    <Descriptions.Item style={{ width: 100 }} label="Tên đề tài">{lecturerTopic?.topic_name}</Descriptions.Item>
                                                    <Descriptions.Item label="Mô tả đề tài">{lecturerTopic?.basic_description}</Descriptions.Item>
                                                    <Descriptions.Item label="Lĩnh vực nghiên cứu">{lecturerTopic?.research_area}</Descriptions.Item>
                                                    <Descriptions.Item label="Mã số đề tài">{lecturerTopic?.topic_code ? lecturerTopic?.topic_code : 'Đề tài chưa được cấp mã số'}</Descriptions.Item>
                                                    <Descriptions.Item label="Trạng thái">{lecturerTopic?.status?.status}</Descriptions.Item>
                                                    <Descriptions.Item label="File thuyết minh" >
                                                        {lecturerTopic?.file.map(item => {
                                                            if (item.file_type === 'explanation') {
                                                                return (
                                                                    <a onClick={() => getFileUrl(item?.file_url)}>{item?.file_name}</a>
                                                                )
                                                            }

                                                        })}
                                                    </Descriptions.Item>
                                                    <Descriptions.Item label="Đơn xin nghiệm thu" >
                                                        {lecturerTopic?.file.map(item => {
                                                            if (item.file_type === 'acceptance') {
                                                                return (
                                                                    <a onClick={() => getFileUrl(item?.file_url)}>{item?.file_name}</a>
                                                                )
                                                            }

                                                        })}
                                                    </Descriptions.Item>
                                                    <Descriptions.Item label="Hội đồng thuyết minh" >{lecturerTopic?.explanationboard !== null ? <Button onClick={() => handleOpenEx(lecturerTopic)} type='primary'>Xem nhận xét hội đồng</Button> : 'Chưa có hội đồng'}</Descriptions.Item>
                                                    <Descriptions.Item label="Hội đồng nghiệm thu" >{lecturerTopic?.acceptanceboard !== null ? <Button onClick={() => handleOpenAcc(lecturerTopic)} type='primary'>Xem nhận xét hội đồng</Button> : 'Chưa có hội đồng'}</Descriptions.Item>
                                                    <Descriptions.Item label="Thao tác">
                                                        <div>
                                                            <div>
                                                                {lecturerTopic?.status?.status_id === 7 ?
                                                                    <Button style={{ marginTop: 20 }} onClick={() => openDrawer(lecturerTopic)} type='primary'>Mời thành viên hội đồng nghiệm thu</Button>
                                                                    : ''}
                                                            </div>
                                                            <div>
                                                                {lecturerTopic?.status?.status_id === 7 ?
                                                                    <Button style={{ marginTop: 15 }} onClick={() => openDrawerInvi(lecturerTopic)} type='primary'>Xem danh sách lời mời</Button>
                                                                    : ''}
                                                            </div>
                                                            <div>
                                                                {lecturerTopic?.status?.status_id === 7 ?
                                                                    <Button style={{ marginTop: 15 }} type='primary' onClick={() => confirmBoard(lecturerTopic)}>Chốt danh sách hội đồng</Button>
                                                                    : ''}
                                                            </div>
                                                            <div>
                                                                {lecturerTopic?.status?.status_id === 12 ?
                                                                    <div>
                                                                        <h4>Chọn ngày báo cáo nghiệm thu</h4>
                                                                        <div style={{ display: 'flex', flexDirection: 'column', width: 200 }}>
                                                                            <DatePicker onChange={changeDate} />
                                                                            <Button style={{ marginTop: 15, width: 100 }} type='primary' onClick={() => chooseDateReport(lecturerTopic)}>Xác nhận</Button>
                                                                        </div>
                                                                    </div>
                                                                    : ''}
                                                            </div>
                                                            <div>
                                                                {lecturerTopic?.status?.status_id === 9 || lecturerTopic?.status?.status_id === 8 ?
                                                                    <Button style={{ marginTop: 15 }} type='primary' onClick={() => approveAcceptance(lecturerTopic)}>Duyệt đơn xin nghiệm thu</Button>
                                                                    : ''}
                                                            </div>

                                                        </div>

                                                    </Descriptions.Item>

                                                </Descriptions>







                                            </div>

                                        </div>



                                    </div>

                                )
                            })}

                        </div>

                    </Col>
                    <Drawer title="Danh sách giảng viên" placement="right" onClose={onClose} open={open} width={1000}>
                        {/* <Row> */}
                        <Radio.Group
                            onChange={chooseWorkPlace}
                            value={value}
                            style={{
                                marginBottom: 8,
                            }}
                            defaultValue={'CNPM'}
                        >
                            <Radio.Button style={{ marginBottom: 10 }} value="CNPM">Khoa công nghệ phần mềm</Radio.Button>

                            <Radio.Button value="CNTT">Khoa công nghệ thông tin</Radio.Button>
                            <Radio.Button value="HTTT">Khoa hệ thống thông tin</Radio.Button>
                            <Radio.Button value="KHMT">Khoa khoa học máy tính</Radio.Button>
                            <Radio.Button value="MMTVTT">Khoa mạng máy tính và truyền thông</Radio.Button>
                            <Radio.Button value="TTDPT">Khoa truyền thông đa phương tiện</Radio.Button>

                        </Radio.Group>

                        {/* </Row> */}
                        <Table
                            style={{ marginTop: 20 }}
                            bordered={true}
                            pagination={false}
                            columns={columns}
                            dataSource={dataLecturer}
                        // onChange={onChange} 
                        />
                    </Drawer>







                    <Drawer title="Danh sách lời mời" placement="right" onClose={onCloseInvi} open={openInvi} width={1000} >
                        <div style={{ marginBottom: 20 }}>

                            {/* <h3>Lời mời đã gửi</h3> */}
                            {sentInvitation.map((item, index) => {
                                let role = ''
                                if (item.type === 1) {
                                    role = 'Chủ tịch hội đồng'
                                }
                                if (item.type === 2) {
                                    role = 'Thư ký'
                                }
                                if (item.type === 3) {
                                    role = 'Phản biện'
                                }
                                if (item.type === 4) {
                                    role = 'Ủy viên 1'
                                }
                                if (item.type === 5) {
                                    role = 'Ủy viên 2'
                                }
                                if (item.type === 6) {
                                    role = 'Ủy viên 3'
                                }
                                return (
                                    <Descriptions
                                        // title="Lời mời đã gửi"
                                        bordered={true}
                                    >

                                        <Descriptions.Item style={{ width: 200 }} label="Tên giảng viên">{item?.lecturerInfo?.lecturer_name}</Descriptions.Item>
                                        <Descriptions.Item style={{ width: 200 }} label="Chức vụ hội đồng">{role}</Descriptions.Item>
                                        <Descriptions.Item style={{ width: 200 }} label="Chức vụ hội đồng">{item?.statusInfo?.status}</Descriptions.Item>


                                    </Descriptions>


                                )
                            })}
                            <div>

                            </div>
                        </div>
                    </Drawer>
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
                    <Modal title="Hội đồng thuyết minh"
                        open={openModalEx}
                        onCancel={handleCancelModalEx}
                        cancelButtonProps={{ style: { display: 'none' } }}
                        okButtonProps={{ style: { display: 'none' } }}>
                        {exTranscript.map((item, index) => {
                            return (
                                <div style={{ border: '0px solid black', borderRadius: '0% 0% 0% 0% / 0% 0% 0% 0%', marginBottom: 20, position: 'relative', boxShadow: '5px 5px 10px rgba(0,0,0,.15)', padding: 10 }}>
                                    <div>Giảng viên: {item.lecturerInfo.lecturer_name}</div>
                                    {/* <div>Chức vụ: {item.lecturerInfo.explanationrole}</div> */}
                                    <div>Nhận xét: {item.comment}</div>
                                    <div>Điểm: {item.score}</div>
                                </div>
                            )
                        })}

                    </Modal>

                    <Modal title="Hội đồng nghiệm thu" open={openModalAcc} onCancel={handleCancelModalAcc}>
                        {accTranscript.map((item, index) => {
                            return (
                                <div style={{ border: '0px solid black', borderRadius: '0% 0% 0% 0% / 0% 0% 0% 0%', marginBottom: 20, position: 'relative', boxShadow: '5px 5px 10px rgba(0,0,0,.15)', padding: 10 }}>
                                    <div>Giảng viên: {item.lecturerInfo.lecturer_name}</div>
                                    {/* <div>Chức vụ: {item.lecturerInfo.explanationrole}</div> */}
                                    <div>Nhận xét: {item.comment}</div>
                                    <div>Điểm: {item.score}</div>
                                </div>
                            )
                        })}
                    </Modal>

                    <Col span={5}>
                    </Col>
                </Row >
            </div >
        </div >
    )
}

export default LecturerHomePage