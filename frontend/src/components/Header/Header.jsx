import './Header.scss'
import { Badge, Button, Col, Popover, Row, message, Space } from 'antd'
import { HomeOutlined, UserOutlined, LaptopOutlined, NotificationOutlined, BookOutlined, LogoutOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { doLogoutAction } from '../../redux/account/accountSlice';
import { doGetWorkplace } from '../../redux/workplace/workplaceSlice';
import { doClearStudentInfo } from '../../redux/account/studentSlice';
import { useEffect } from 'react';
import { callGetAcceptedInvitation, callGetLecturerById, callGetNotification, callGetNotificationAddFile, callGetNotificationAddFileExplanation, callGetNotificationAddFilePhase2, callGetNotificationPhase2, callGetRefusedInvitation, callGetTopicById } from '../../../services/api';


const Header = () => {
    const [countNoti, setCountNoti] = useState(0)
    const [workPlace, setWorkPlace] = useState('')
    const [invitationInfo, setInvitationInfo] = useState([])
    const [lecturerInfo, setLecturerInfo] = useState([])
    const [refusedInvitation, setRefusedInvitation] = useState([])
    const [dataNoti, setDataNoti] = useState()
    const [dataNoti2, setDataNoti2] = useState()
    const [dataNoti3, setDataNoti3] = useState()
    const [dataNoti4, setDataNoti4] = useState()
    const [dataNoti5, setDataNoti5] = useState()
    const [dataNoti6, setDataNoti6] = useState()
    const [topic, setTopic] = useState()


    const navigate = useNavigate()
    const userInfo = useSelector(state => state.student.user)
    // const userRole = useSelector(state => state.account.user.role)
    // const checkHasLecturer = useSelector(state => state.account.user.status)
    const dispatch = useDispatch()


    const text = <span style={{ fontSize: 16 }}>Quản lí tài khoản</span>;
    let content = ''
    if (userInfo !== '') {
        content = (
            <div style={{ width: 100 }}>
                <p style={{ cursor: 'pointer', display: 'inline-block', fontSize: 15 }} onClick={() => handleLogout()}><LogoutOutlined style={{ marginRight: 10, fontSize: 16 }} />Đăng xuất</p>
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
        const getTopic = async () => {
            const res = await callGetTopicById(userInfo.topic_id)
            if (res) {
                console.log('topic', res.data.payload)
                setTopic(res?.data?.payload)
            }
        }

        const getAcceptedInvitation = async () => {
            const res = await callGetAcceptedInvitation(userInfo.student_id)
            setInvitationInfo(res?.data?.payload?.status)
            if (res?.data?.payload?.status === 2) {
                setCountNoti(1)
            }
            const resLecturer = await callGetLecturerById(res?.data?.payload?.lecturer)
            setLecturerInfo(resLecturer?.data?.payload)
        }
        const getRefusedInvitation = async () => {
            const res = await callGetRefusedInvitation(userInfo.student_id)
            setRefusedInvitation(res.data.payload)
            if (res.data.payload.length > 0) {
                setCountNoti(1)
            }
        }
        const getNotification = async () => {
            const res = await callGetNotification()
            const res3 = await callGetNotificationAddFile()
            const res4 = await callGetNotificationAddFileExplanation()
            let dataNotiCreate = ''
            let dataNotiAddFile = ''
            let dataNotiAddFileExplanation = ''

            let data = []
            let data2 = []
            let data3 = []


            dataNotiAddFile = res3.data.payload.items
            dataNotiCreate = res.data.payload.items
            dataNotiAddFileExplanation = res4.data.payload.items

            if (dataNotiCreate.length > 0) {
                let today = new Date()
                let todayInt = today.getTime()
                dataNotiCreate.map(item => {
                    if (todayInt >= +item?.start_date && todayInt <= item.end_date) {
                        console.log('item', item)
                        if (item.type === 'đợt 2') {
                            data = item
                            data.start_date = (new Date(+item.start_date)).toLocaleDateString()
                            data.end_date = (new Date(+item.end_date)).toLocaleDateString()
                            setDataNoti2(data)
                        }
                        if (item.type === 'đợt 1') {
                            data = item
                            data.start_date = (new Date(+item.start_date)).toLocaleDateString()
                            data.end_date = (new Date(+item.end_date)).toLocaleDateString()
                            setDataNoti(data)
                        }
                        console.log('check data', data)
                    } else {
                        return
                    }
                })

            }

            if (dataNotiAddFile.length > 0) {
                let today = new Date()
                let todayInt = today.getTime()
                dataNotiAddFile.map(item => {
                    if (todayInt >= +item?.start_date && todayInt <= item.end_date) {
                        console.log('chcek item', item)
                        if (item.type === 'nghiệm thu và báo cáo đợt 1') {
                            data2 = item
                            data2.start_date = (new Date(+item.start_date)).toLocaleDateString()
                            data2.end_date = (new Date(+item.end_date)).toLocaleDateString()
                            setDataNoti3(data2)
                        }
                        if (item.type === 'nghiệm thu và báo cáo đợt 2') {
                            data2 = item
                            data2.start_date = (new Date(+item.start_date)).toLocaleDateString()
                            data2.end_date = (new Date(+item.end_date)).toLocaleDateString()
                            setDataNoti4(data2)
                        }
                    } else {
                        return
                    }
                })

            }

            if (dataNotiAddFileExplanation.length > 0) {
                let today = new Date()
                let todayInt = today.getTime()
                dataNotiAddFileExplanation.map(item => {
                    if (todayInt >= +item?.start_date && todayInt <= item.end_date) {
                        console.log('chcek item', item)
                        if (item.type === 'Thông báo nộp hồ sơ thuyết minh đợt 1') {
                            data3 = item
                            data3.start_date = (new Date(+item.start_date)).toLocaleDateString()
                            data3.end_date = (new Date(+item.end_date)).toLocaleDateString()
                            setDataNoti5(data3)
                        }
                        if (item.type === 'Thông báo nộp hồ sơ thuyết minh đợt 2') {
                            data3 = item
                            data3.start_date = (new Date(+item.start_date)).toLocaleDateString()
                            data3.end_date = (new Date(+item.end_date)).toLocaleDateString()
                            setDataNoti6(data3)
                        }
                    } else {
                        return
                    }
                })

            }
        }

        getTopic()
        getNotification()
        getAcceptedInvitation()
        getRefusedInvitation()
    }
        , [
            // invitationInfo, refusedInvitation
        ]
    )

    const contentNoti = (
        <div>
            {invitationInfo === 2 && topic?.status?.status_id === 5 ?
                <div style={{ marginBottom: 15 }}>
                    <div><b>Thông báo về giảng viên hướng dẫn</b></div>
                    <div>Giảng viên <b>{lecturerInfo?.lecturer_name} </b> đã chấp nhận yêu cầu hướng dẫn nghiên cứu khoa học của bạn.</div>
                </div>
                :
                <p></p>
            }
            {refusedInvitation.length > 0 && invitationInfo !== 2 ?
                <div>
                    <p>Giảng viên <b>{refusedInvitation[0]?.lecturerInfo?.lecturer_name} </b> đã từ chối yêu cầu hướng dẫn nghiên cứu khoa học của bạn, hãy chọn giảng viên khác.</p>
                </div>
                : ''
            }
            {dataNoti && topic?.status?.status_id < 4 ?
                <>
                    <div>
                        <div><b>{dataNoti.name}</b></div>
                        <div>{dataNoti.content}</div>
                        <div>Thời hạn từ {dataNoti.start_date} đến {dataNoti.end_date}</div>
                    </div>

                </>
                : ''
            }

            {dataNoti2 ?
                <>
                    <div>
                        <div><b>{dataNoti2.name}</b></div>
                        <div>{dataNoti2.content}</div>
                        <div>Thời hạn từ {dataNoti2.start_date} đến {dataNoti2.end_date}</div>
                        <i>Sinh viên đã có đề tài bỏ qua thông báo này</i>
                    </div>
                </>
                : ''
            }

            {dataNoti3 && topic?.status?.status_id === 8 ?
                <>

                    <div>
                        <div><b>{dataNoti3.name}</b></div>
                        <div>{dataNoti3.content}</div>
                        <div>Thời hạn từ {dataNoti3.start_date} đến {dataNoti3.end_date}</div>
                    </div>

                </>
                : ''
            }
            {dataNoti4 && topic?.status?.status_id === 8 ?
                <>
                    <div>
                        <div><b>{dataNoti4.name}</b></div>
                        <div>{dataNoti4.content}</div>
                        <div>Thời hạn từ {dataNoti4.start_date} đến {dataNoti4.end_date}</div>
                    </div>
                </>
                : ''
            }
            {dataNoti5 && topic?.status?.status_id < 5 ?
                <>
                    <div>
                        <div><b>{dataNoti5.name}</b></div>
                        <div>{dataNoti5.content}</div>
                        <div>Thời hạn từ {dataNoti5.start_date} đến {dataNoti5.end_date}</div>
                    </div>
                </>
                : ''
            }
            {dataNoti6 && topic?.status?.status_id < 5 ?
                <>
                    <div>
                        <div><b>{dataNoti6.name}</b></div>
                        <div>{dataNoti6.content}</div>
                        <div>Thời hạn từ {dataNoti6.start_date} đến {dataNoti6.end_date}</div>
                    </div>
                </>
                : ''
            }
            {topic?.status?.status_id === 6 ?
                <>
                    <div>
                        <div><b>Thông báo từ Trường Công nghệ Thông tin và Truyền thông</b></div>
                        <div>Đề tài được duyệt bởi Trường Công nghệ thông tin và Truyền thông</div>
                        <div>Chờ công văn duyệt của Trường Đại học Cần Thơ</div>
                    </div>
                </>
                : ''
            }
            {topic?.status?.status_id === 7 ?
                <>
                    <div>
                        <div><b>Thông báo từ Trường Đại học Cần Thơ</b></div>
                        <div>Đề tài được duyệt bởi Trường Đại học Cần Thơ kèm theo công văn
                            <br></br>
                            (đã gửi cho chủ nhiệm các đề tài qua email)</div>
                    </div>
                </>
                : ''
            }
            {topic?.status?.status_id === 10 ?
                <>
                    <div>
                        <div><b>Thông báo</b></div>
                        <div>Giáo viên hướng dẫn đã duyệt đơn xin nghiệm thu của bạn
                            <br></br>
                            Chờ phòng quản lí khoa học Đại học Cần Thơ duyệt</div>
                    </div>
                </>
                : ''
            }
            {topic?.status?.status_id === 11 ?
                <>
                    <div>
                        <div><b>Thông báo</b></div>
                        <div>Phòng quản lí khoa học Đại học Cần Thơ đã duyệt đơn xin nghiệm thu của bạn
                        </div>
                    </div>
                </>
                : ''
            }
            {topic?.status?.status_id === 12 ?
                <>
                    <div>
                        <div><b>Thông báo</b></div>
                        <div>Phòng quản lí khoa học Đại học Cần Thơ đã gửi
                            <br></br>
                            quyết định nghiệm thu cho chủ nhiệm đề tài
                        </div>
                    </div>
                </>
                : ''
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
            <div className="header-page" >
                <Row  >
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
                                    <span onClick={() => backtoHome()}>Về nghiên cứu khoa học</span>
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
                                        <span onClick={() => navigate('/topic')}>Đề tài</span>
                                    </Popover>
                                </div>
                            </div>

                            <div className='header-button' >
                                <div style={{ marginTop: 0 }} >
                                    <Popover placement="bottomLeft" content={contentLecturer}  >
                                        <LaptopOutlined style={{ marginRight: 6, marginLeft: 2 }} />
                                        <span>Tìm giảng viên</span>
                                    </Popover>
                                </div>
                            </div>
                            <div className='header-button' >
                                <div style={{ marginTop: 0 }} onClick={checkNoti}>
                                    <Badge count={countNoti} size='small' offset={[8, 2]}>
                                        <Popover placement="bottomLeft" content={contentNoti} trigger="click">
                                            <NotificationOutlined style={{ marginRight: 6, marginLeft: 2 }} />
                                            <span>Thông báo</span>
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