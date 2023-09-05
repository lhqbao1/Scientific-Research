import './HeaderLecturer.scss'
import { Badge, Button, Col, Popover, Row, message, Modal, Descriptions, Collapse, theme } from 'antd'
import { HomeOutlined, UserOutlined, LaptopOutlined, NotificationOutlined, BookOutlined, CaretRightOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { doLogoutAction } from '../../redux/account/accountSlice';
import { doGetWorkplace } from '../../redux/workplace/workplaceSlice';
import { doClearStudentInfo } from '../../redux/account/studentSlice';
import { doClearLecturerInfo } from '../../redux/account/lecturerSlice';
import { useEffect } from 'react';
import { callGetInvitationById, callGetStudentById, callGetTopicById, callUpdateInvitation, callUpdateTopic } from '../../../services/api';


const HeaderLecturer = () => {
    const [countNoti, setCountNoti] = useState(0)
    const [hasInvitation, setHasInvitation] = useState(false)
    const [studentInfo, setStudentInfo] = useState([])
    const [topicInfo, setTopicInfo] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [invitationInfo, setInvitationInfo] = useState([])
    const navigate = useNavigate()
    const lecturerInfo = useSelector(state => state.lecturer.user)
    const userID = useSelector(state => state.account.user.id)
    const dispatch = useDispatch()


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
            } else {
                setHasInvitation(false)
            }
            if (invitation) {
                setInvitationInfo(invitation?.data?.payload)
                setHasInvitation(true)
            }
        }
        getInvitation()
    }, [invitationInfo])



    const handleLogout = () => {
        dispatch(doLogoutAction())
        dispatch(doClearLecturerInfo())
        message.success('Log out success')
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
        if (hasInvitation === true) {
            setIsModalOpen(true);
        }
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const acceptInvitation = async (data) => {
        // const topicUpdate = await callUpdateTopic(data?.topic, data?.lecturer)
        const invitationUpdate = await callUpdateInvitation(data.id, 2)
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
                                    <span onClick={() => backtoHome()}>Đề tài hướng dẫn </span>
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
                                                return (
                                                    <div >
                                                        <h2>Lời mời hướng dẫn</h2>
                                                        <div style={{ display: 'flex' }}>
                                                            <div style={{ width: 300 }}>
                                                                <b>Thông tin sinh viên: </b>
                                                                <p>Tên: {item?.studentInfo?.student_name}</p>
                                                                <p>Mã số sinh viên: B{item?.studentInfo?.student_code}</p>
                                                                <p>Khóa: {item?.studentInfo?.grade}</p>

                                                                <p>Ngành: {item?.studentInfo?.major?.major_name}</p>
                                                            </div>
                                                            <div style={{ width: 350 }}>
                                                                <b>Thông tin đề tài: </b>
                                                                <p>Tên đề tài: {item?.studentInfo?.topic?.topic_name}</p>
                                                                <p>Lĩnh vực nghiên cứu: {item?.studentInfo?.topic?.research_area}</p>
                                                                <p>Mô tả đề tài: {item?.studentInfo?.topic?.basic_description}</p>
                                                            </div>
                                                        </div>
                                                        <Button type='primary' onClick={() => acceptInvitation(item)}>Chấp nhận</Button>

                                                    </div>
                                                )
                                            })}
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