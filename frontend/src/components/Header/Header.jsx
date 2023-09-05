import './Header.scss'
import { Badge, Button, Col, Popover, Row, message } from 'antd'
import { HomeOutlined, UserOutlined, LaptopOutlined, NotificationOutlined, BookOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { doLogoutAction } from '../../redux/account/accountSlice';
import { doGetWorkplace } from '../../redux/workplace/workplaceSlice';
import { doClearStudentInfo } from '../../redux/account/studentSlice';
import { useEffect } from 'react';
import { callGetAcceptedInvitation, callGetLecturerById } from '../../../services/api';


const Header = () => {
    const [countNoti, setCountNoti] = useState(1)
    const [workPlace, setWorkPlace] = useState('')
    const [invitationInfo, setInvitationInfo] = useState([])
    const [lecturerInfo, setLecturerInfo] = useState([])



    const navigate = useNavigate()
    const userInfo = useSelector(state => state.student.user)
    const userRole = useSelector(state => state.account.user.role)
    const checkHasLecturer = useSelector(state => state.account.user.status)
    const dispatch = useDispatch()


    const text = <span style={{ fontSize: 16 }}>Quản lí tài khoản</span>;
    let content = ''
    if (userInfo !== '') {
        content = (
            <div>
                {/* {userInfo.role === '' ? '' : */}
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

    const handleNavigate = (abc) => {
        dispatch(doGetWorkplace(abc))
        navigate('/student/lecturer')
    }


    const contentLecturer = (
        <div >
            <div style={{ marginBottom: 5 }}><a style={{ color: 'black', textTransform: 'uppercase' }} onClick={() => handleNavigate('CNPM')} >Khoa công nghệ phần mềm</a>
            </div>
            <div style={{ marginBottom: 5 }}><a style={{ color: 'black', textTransform: 'uppercase' }} onClick={() => handleNavigate('CNTT')}>Khoa công nghệ thông tin</a></div>
            <div style={{ marginBottom: 5 }}><a style={{ color: 'black', textTransform: 'uppercase' }} onClick={() => handleNavigate('HTTT')}>Khoa hệ thống thông tin</a>
            </div>
            <div style={{ marginBottom: 5 }}><a style={{ color: 'black', textTransform: 'uppercase' }} onClick={() => handleNavigate('KHMT')}>Khoa khoa học máy tính</a>
            </div>
            <div style={{ marginBottom: 5 }}><a style={{ color: 'black', textTransform: 'uppercase' }} onClick={() => handleNavigate('MMTVTT')}>Khoa mạng máy tính và truyền thông</a>
            </div>
            <div style={{ marginBottom: 5 }}><a style={{ color: 'black', textTransform: 'uppercase' }} onClick={() => handleNavigate('TTDPT')}>Khoa truyền thông đa phương tiện</a>
            </div>

        </div >
    )

    useEffect(() => {
        const getAcceptedInvitation = async () => {
            const res = await callGetAcceptedInvitation(userInfo.student_id)
            setInvitationInfo(res?.data?.payload?.status)
            const resLecturer = await callGetLecturerById(res?.data?.payload?.lecturer)
            setLecturerInfo(resLecturer?.data?.payload)
        }
        getAcceptedInvitation()
    }, [userInfo])

    const contentNoti = (
        <div>
            {invitationInfo === 2 ?
                <div>
                    <p>1. Giảng viên <b>{lecturerInfo.lecturer_name} </b> đã chấp nhận yêu cầu hướng dẫn nghiên cứu khoa học của bạn.</p>
                </div>
                :
                <p>hehe</p>
            }
        </div>
    );

    const checkNoti = () => {
        setCountNoti(0)
    }

    const handleLogout = () => {
        dispatch(doLogoutAction())
        dispatch(doClearStudentInfo())
        message.success('Log out success')
        navigate('/student')
    }

    const handleLogin = () => {
        if (userInfo === '') {
            navigate('/login')
        }
    }

    const backtoHome = () => {
        if (window.location.pathname === '/student') {
            console.log('hehe')
        } else {
            navigate('/student')

        }
    }




    return (
        <div style={{ backgroundColor: '#efefef', margin: '-8px' }}>
            <div className="header-page">
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
                            <div className='header-button' >
                                <div style={{ marginTop: 0 }}>
                                    <HomeOutlined style={{ marginRight: 6, marginLeft: 7 }} />
                                    <span onClick={() => backtoHome()}>Home</span>
                                </div>
                            </div>
                            <div className='header-button' >
                                <div style={{ marginTop: 0 }}>
                                    <Popover placement="bottomLeft" content={content}  >
                                        <UserOutlined style={{ marginRight: 6, marginLeft: 2 }} />
                                        <span onClick={() => handleLogin()}>{userInfo?.student_name ? userInfo?.student_name : 'Đăng nhập'}</span>
                                    </Popover>
                                </div>
                            </div>
                            <div className='header-button' >
                                <div style={{ marginTop: 0 }}>
                                    <Popover placement="bottomLeft">
                                        <LaptopOutlined style={{ marginRight: 6, marginLeft: 2 }} />
                                        <span onClick={() => navigate('/topic')}>Your topic</span>
                                    </Popover>
                                </div>
                            </div>
                            {/* {checkHasLecturer !== 'active' ?
                                <div className='header-button' >
                                    <div style={{ marginTop: 0 }} >
                                        <Popover placement="bottomLeft" content={contentLecturer}  >
                                            <LaptopOutlined style={{ marginRight: 6, marginLeft: 2 }} />
                                            <span>Lecturer</span>
                                        </Popover>
                                    </div>
                                </div> : ''} */}

                            <div className='header-button' >
                                <div style={{ marginTop: 0 }} >
                                    {userRole === 'student' ?
                                        <Popover placement="bottomLeft" content={contentLecturer}  >
                                            <LaptopOutlined style={{ marginRight: 6, marginLeft: 2 }} />
                                            <span>Lecturer</span>
                                        </Popover>
                                        :
                                        <div>
                                            <BookOutlined style={{ marginRight: 6, marginLeft: 2 }} />
                                            <span>Topics</span>
                                        </div>
                                    }

                                </div>
                            </div>
                            <div className='header-button' >
                                <div style={{ marginTop: 0 }} onClick={checkNoti}>
                                    <Badge count={countNoti} size='small' offset={[8, 2]}>
                                        <Popover placement="bottomLeft" content={contentNoti} trigger="click">
                                            <NotificationOutlined style={{ marginRight: 6, marginLeft: 2 }} />
                                            <span>Notification</span>
                                        </Popover>
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

export default Header