import './HeaderLecturer.scss'
import { Badge, Button, Col, Popover, Row, message, Modal, Descriptions, Collapse, theme, notification } from 'antd'
import { HomeOutlined, UserOutlined, LaptopOutlined, NotificationOutlined, BookOutlined, CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { doLogoutAction } from '../../redux/account/accountSlice';
import { doClearLecturerInfo } from '../../redux/account/lecturerSlice';
import { useEffect } from 'react';
import { callAcceptAccInvi, callCheckRecieveInvi, callCreateCommissioner, callCreateCounter, callGetInvitationById, callRefuseAccInvi, callSetAccBoardCouter, callSetAccBoardPresident, callSetAccBoardSecretary, callUpdateInvitation, callUpdateTopic } from '../../../services/api';
import { Document, Page, pdfjs } from 'react-pdf';
import { Buffer } from 'buffer';



const HeaderLecturer = () => {
    const [countNoti, setCountNoti] = useState(0)
    const [hasInvitation, setHasInvitation] = useState(false)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [invitationInfo, setInvitationInfo] = useState([])
    const navigate = useNavigate()
    const lecturerInfo = useSelector(state => state.lecturer.user)
    // const userID = useSelector(state => state.account.user.id)
    const dispatch = useDispatch()
    const [pdfFile, setPdfFile] = useState()
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [seeButton, setSeeButton] = useState(false)
    const [hasAccInvi, setHasAccInvi] = useState(false)
    const [accInvitationInfo, setAccInvitationInfo] = useState([])

    const text = <span style={{ fontSize: 16 }}>Quản lí tài khoản</span>;
    let content = ''
    if (lecturerInfo !== '') {
        content = (
            <div>
                {/* {lecturerInfo.role === '' ? '' : */}
                <div style={{ height: 40, marginBottom: 20, marginTop: -15 }}>
                    <p>Thông tin tài khoản
                    </p>
                    <p style={{ cursor: 'pointer' }} onClick={() => handleLogout()}>Đăng xuất</p>
                </div>
                {/* } */}
            </div>

        );
    } else {
        content = ''
    }


    useEffect(() => {
        const getInvitation = async () => {
            const invitation = await callGetInvitationById(lecturerInfo?.lecturer_id)
            // console.log()
            if (invitation.data.payload.length > 0) {
                setCountNoti(invitation.data.payload.length)
                setInvitationInfo(invitation?.data?.payload)
                setHasInvitation(true)
            } else {
                setHasInvitation(false)
            }

        }
        const getAccInvitation = async () => {
            const res = await callCheckRecieveInvi(lecturerInfo.lecturer_id)
            // console.log('check ressasa', res.data.payload)
            if (res.data.payload.length > 0) {
                setCountNoti(res.data.payload.length)
                setAccInvitationInfo(res.data.payload)
                setHasAccInvi(true)

            } else {
                setHasAccInvi(false)
            }

        }

        getInvitation()
        getAccInvitation()
    }
        , [
            // invitationInfo, accInvitationInfo
            lecturerInfo
        ]
    )



    const handleLogout = () => {
        dispatch(doLogoutAction())
        dispatch(doClearLecturerInfo())
        notification.success({
            message: 'Đăng xuất thành công',
            duration: 2
        })
        navigate('/student')
    }

    const handleLogin = () => {
        if (lecturerInfo === '') {
            navigate('/login')
        }
    }

    const backtoHome = () => {
        if (window.location.pathname === '/student') {
            console.log('hehe')
        } else {
            navigate('/lecturer')

        }
    }

    const showModal = () => {
        console.log('check invi', hasInvitation)
        console.log('check acc invi', hasAccInvi)
        if (hasInvitation === true || hasAccInvi === true) {
            setIsModalOpen(true);
        }
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSeeButton(false)
        setPdfFile()
    };

    const acceptInvitation = async (data) => {
        console.log(data)
        const topicUpdate = await callUpdateTopic(data?.topic, data?.lecturer, 5)
        const invitationUpdate = await callUpdateInvitation(data.id, 2)
        if (topicUpdate) {
            setIsModalOpen(false)
            notification.success({
                message: 'Đã chấp nhận lời mời hướng dẫn',
                duration: 2
            })
        }
        setCountNoti(countNoti - 1)
    }

    const acceptAccInvitation = async (data) => {
        console.log('check data', data)
        // console.log('check topic',)
        const invitationUpdate = await callAcceptAccInvi(data.id, 2)
        if (data.type === 1) {
            const president = await callSetAccBoardPresident(data?.topicInfo?.acceptanceboard, data?.lecturer)
            notification.success({
                message: 'Chấp nhận lời mời',
                duration: 2
            })
            setIsModalOpen(false)
        }
        if (data.type === 2) {
            const secretary = await callSetAccBoardSecretary(data?.topicInfo?.acceptanceboard, data?.lecturer)
            notification.success({
                message: 'Chấp nhận lời mời',
                duration: 2
            })
            setIsModalOpen(false)

        }
        if (data.type === 3) {
            const couter = await callCreateCounter(data?.lecturer, data?.topicInfo?.acceptanceboard)
            notification.success({
                message: 'Chấp nhận lời mời',
                duration: 2
            })
            setIsModalOpen(false)

        }
        if (data.type === 4) {
            const res = await callCreateCommissioner(data?.lecturer, data?.topicInfo?.acceptanceboard)
            // const com1 = await callSetAccBoardCom1(data?.topicInfo?.acceptanceboard, data?.lecturer)
            notification.success({
                message: 'Chấp nhận lời mời',
                duration: 2
            })
            setIsModalOpen(false)

        }



    }

    const getFileUrl = (file_url) => {
        let fileBase64 = new Buffer(file_url, 'base64').toString('binary')
        console.log('check buffer', fileBase64)
        setPdfFile(fileBase64)
        setSeeButton(true)
    };

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    const prevPage = () => {
        setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1)
    }
    const nextPage = () => {
        setPageNumber(pageNumber + 1 >= numPages ? pageNumber : pageNumber + 1)
    }

    const refuseInvitation = async (data) => {
        // const topicUpdate = await callUpdateTopic(data?.topic, data?.lecturer, 5)
        const invitationUpdate = await callUpdateInvitation(data.id, 7)
        if (invitationUpdate) {
            setIsModalOpen(false)
            notification.success({
                message: 'Đã từ chối lời mời hướng dẫn',
                duration: 2
            })
        }
    }
    const refuseInvitationAcc = async (data) => {
        const invitationUpdate = await callRefuseAccInvi(data.id, 7)
        if (invitationUpdate) {
            setIsModalOpen(false)
            notification.success({
                message: 'Đã từ chối lời mời hướng dẫn',
                duration: 2
            })
            setCountNoti(countNoti - 1)
        }
    }

    return (
        <div style={{ backgroundColor: '#efefef', margin: '-8px' }}>
            <div className="HeaderLecturer-page">
                <Row>
                    <Col span={5} ></Col>

                    <Col span={14}>
                        <Row>
                            {/* <div style={{  }} > */}
                            <img
                                style={{ height: 130, width: '97.8%', backgroundColor: 'white', padding: 10, marginTop: 5, borderRadius: 10 }}
                                src="https://cit.ctu.edu.vn/encict/images/update2023/banner/banner_cict.jpg"
                            />
                            {/* </div> */}
                        </Row>
                        <Row style={{ backgroundColor: 'white', height: 50, marginBottom: 10, marginTop: 10, borderRadius: 10 }}>
                            <div className='HeaderLecturer-button' >
                                <div style={{ marginTop: 0 }}>
                                    <HomeOutlined style={{ marginRight: 6, marginLeft: 7 }} />
                                    <span onClick={() => backtoHome()}>Đề tài </span>
                                </div>
                            </div>
                            <div className='HeaderLecturer-button' >
                                <div style={{ marginTop: 0 }}>
                                    <Popover placement="bottomLeft" content={content}  >
                                        <UserOutlined style={{ marginRight: 6, marginLeft: 2 }} />
                                        <span onClick={() => handleLogin()}>{lecturerInfo?.lecturer_name ? lecturerInfo?.lecturer_name : 'Đăng nhập'}</span>
                                    </Popover>
                                </div>
                            </div>
                            <div className='HeaderLecturer-button' >
                                <div style={{ marginTop: 0 }}>
                                    <HomeOutlined style={{ marginRight: 6, marginLeft: 7 }} />
                                    <span onClick={() => navigate("explanation-board")}>Hội đồng thuyết minh </span>
                                </div>
                            </div>
                            <div className='HeaderLecturer-button' >
                                <div style={{ marginTop: 0 }}>
                                    <HomeOutlined style={{ marginRight: 6, marginLeft: 7 }} />
                                    <span onClick={() => navigate("acceptance-board")}>Hội đồng nghiệm thu</span>
                                </div>
                            </div>

                            <div className='HeaderLecturer-button' >
                                <div style={{ marginTop: 0 }} >
                                    <Badge count={countNoti} size='small' offset={[8, 2]}>
                                        <NotificationOutlined style={{ marginRight: 6, marginLeft: 2 }} />
                                        <span onClick={showModal}>Notification</span>
                                        <Modal
                                            open={isModalOpen}
                                            onOk={handleOk}
                                            onCancel={handleCancel}
                                            width={700}
                                            okButtonProps={{ style: { display: 'none' } }}
                                            cancelButtonProps={{ style: { display: 'none' } }}
                                        >
                                            {invitationInfo.map((item, index) => {
                                                let topicInfo = item.topicInfo
                                                return (
                                                    <div >
                                                        <h2>Lời mời hướng dẫn</h2>
                                                        <div style={{ display: 'flex' }}>
                                                            <div style={{ width: 250, marginRight: 10 }}>
                                                                <b>Thông tin sinh viên: </b>
                                                                <p>Tên: {item?.studentInfo?.student_name}</p>
                                                                <p>Mã số sinh viên: B{item?.studentInfo?.student_code}</p>
                                                                <p>Khóa: {item?.studentInfo?.grade}</p>

                                                                <p>Ngành: {item?.studentInfo?.major?.major_name}</p>
                                                            </div>
                                                            <div style={{ width: 350 }}>
                                                                <b>Thông tin đề tài: </b>
                                                                <p>Tên đề tài: {item?.topicInfo?.topic_name}</p>
                                                                <p>Lĩnh vực nghiên cứu: {item?.topicInfo?.research_area}</p>
                                                                <p>Mô tả đề tài: {item?.topicInfo?.basic_description}</p>
                                                                {topicInfo?.file.map((file, index) => {
                                                                    return (
                                                                        <p>File thuyết minh: <a onClick={() => getFileUrl(file?.file_url)}>{file?.file_name}</a></p>
                                                                    )
                                                                })}

                                                            </div>
                                                        </div>
                                                        <Button style={{ marginRight: 20 }} type='primary' onClick={() => acceptInvitation(item)}>Chấp nhận</Button>
                                                        <Button type='dashed' onClick={() => refuseInvitation(item)}>Từ chối</Button>

                                                    </div>
                                                )
                                            })}

                                            {accInvitationInfo.map((item, index) => {
                                                let topicInfo = item.topicInfo
                                                let typeText = ''
                                                if (item?.type === 1) {
                                                    typeText = 'Chủ tịch hội đồng'
                                                }
                                                if (item?.type === 2) {
                                                    typeText = 'Thư ký hội đồng'
                                                }
                                                if (item?.type === 3) {
                                                    typeText = 'Phản biện hội đồng'
                                                }
                                                if (item?.type === 4) {
                                                    typeText = 'Ủy viên hội đồng'
                                                }

                                                return (
                                                    <div >
                                                        <h2>Lời mời hội đồng ({typeText})</h2>
                                                        <div style={{ display: 'flex' }}>
                                                            <div style={{ width: 250, marginRight: 10 }}>
                                                                <b>Giáo viên hướng dẫn: </b>
                                                                <p>{item?.advisorInfo?.degree} {item?.advisorInfo?.lecturer_name}</p>
                                                                <b>Thông tin sinh viên: </b>
                                                                {topicInfo?.student.map((student, index) => {
                                                                    return (
                                                                        <div>
                                                                            <p>Tên: {student?.student_name}</p>
                                                                            <p>Mã số sinh viên: B{student?.student_code}</p>

                                                                        </div>
                                                                    )
                                                                })}

                                                            </div>
                                                            <div style={{ width: 350 }}>
                                                                <b>Thông tin đề tài: </b>
                                                                <p>Tên đề tài: {item?.topicInfo?.topic_name}</p>
                                                                <p>Lĩnh vực nghiên cứu: {item?.topicInfo?.research_area}</p>
                                                                <p>Mô tả đề tài: {item?.topicInfo?.basic_description}</p>
                                                                {topicInfo?.file.map((file, index) => {
                                                                    return (
                                                                        <p>File thuyết minh: <a onClick={() => getFileUrl(file?.file_url)}>{file?.file_name}</a></p>
                                                                    )
                                                                })}

                                                            </div>
                                                        </div>
                                                        <Button style={{ marginRight: 20 }} type='primary' onClick={() => acceptAccInvitation(item)}>Chấp nhận</Button>
                                                        <Button type='dashed' onClick={() => refuseInvitationAcc(item)}>Từ chối</Button>

                                                    </div>
                                                )
                                            })}


                                            <Row gutter={24}>
                                                <Col span={10}></Col>
                                                <Col span={4}>
                                                    {seeButton === true ?
                                                        <div>
                                                            <CaretLeftOutlined onClick={prevPage} style={{ fontSize: 30 }} />
                                                            <CaretRightOutlined onClick={nextPage} style={{ fontSize: 30 }} />
                                                        </div>
                                                        : ''}

                                                </Col>

                                                <Col span={10}></Col>

                                            </Row>


                                            <div style={{ marginLeft: 27 }}
                                            >
                                                <Document
                                                    file={pdfFile}
                                                    onLoadSuccess={onDocumentLoadSuccess}
                                                    noData={''}
                                                    loading={''}
                                                >
                                                    <Page pageNumber={pageNumber} renderAnnotationLayer={true} renderTextLayer={true}></Page>
                                                </Document>
                                            </div>

                                        </Modal>


                                    </Badge>
                                </div>
                            </div>

                        </Row>
                    </Col>
                    <Col span={5}></Col>
                </Row>

            </div >
        </div >
    )
}

export default HeaderLecturer