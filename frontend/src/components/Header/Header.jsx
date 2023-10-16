import './Header.scss'
import { Badge, Button, Col, Popover, Row, message, Space } from 'antd'
import { HomeOutlined, UserOutlined, LaptopOutlined, NotificationOutlined, BookOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { doLogoutAction } from '../../redux/account/accountSlice';
import { doGetWorkplace } from '../../redux/workplace/workplaceSlice';
import { doClearStudentInfo } from '../../redux/account/studentSlice';
import { useEffect } from 'react';
import { callGetAcceptedInvitation, callGetLecturerById, callGetNotification, callGetNotificationAddFile, callGetNotificationAddFilePhase2, callGetNotificationPhase2, callGetRefusedInvitation } from '../../../services/api';


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



    const navigate = useNavigate()
    const userInfo = useSelector(state => state.student.user)
    // const userRole = useSelector(state => state.account.user.role)
    // const checkHasLecturer = useSelector(state => state.account.user.status)
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
            let dataNotiCreate = ''
            let dataNotiAddFile = ''

            let data = []
            let data2 = []
            // let data3 = []
            // let data4 = []

            dataNotiAddFile = res3.data.payload.items
            dataNotiCreate = res.data.payload.items
            if (dataNotiCreate.length > 0) {
                let today = new Date()
                let todayInt = today.getTime()
                dataNotiCreate.map(item => {
                    // console.log(todayInt)
                    // console.log(+item.start_date)
                    // console.log(+item.end_date)

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
                    // console.log(todayInt)
                    // console.log(+item.start_date)
                    // console.log(+item.end_date)

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

            // console.log('cjeck res 2', res2.data.payload.items.length)
            // if (res.data.payload.items.length > 0) {
            //     setCountNoti(1)

            //     console.log('check today', todayInt)
            //     console.log('check staet', +res.data.payload.items[0].start_date)
            //     console.log('check staet', +res.data.payload.items[0].end_date)



            // }

            // if (res2?.data?.payload?.items.length > 0) {
            //     setCountNoti(1)
            //     let today = new Date()
            //     let todayInt = today.getTime()
            //     console.log('check today', todayInt)
            //     console.log('check start', +res2.data.payload.items[0].start_date)
            //     console.log('check end', +res2.data.payload.items[[0].end_date])

            //     if (todayInt >= +res2.data.payload.items[0].start_date && todayInt <= +res2.data.payload.items[0].end_date) {
            //         data2.push(res2.data.payload.items)
            //         data2[0].map(item => {
            //             item.start_date = (new Date(+item.start_date)).toLocaleDateString()
            //             item.end_date = (new Date(+item.end_date)).toLocaleDateString()

            //         })
            //         setDataNoti2(data2[0])
            //         // console.log('check data 2', data2[0])
            //     } else {
            //         setDataNoti2([])
            //     }

            // }

            // if (res3?.data?.payload?.items.length > 0) {
            //     setCountNoti(1)
            //     let today = new Date()
            //     let todayInt = today.getTime()
            //     console.log('check today', todayInt)
            //     console.log('check start', +res2.data.payload.items[0].start_date)
            //     console.log('check end', +res2.data.payload.items[[0].end_date])

            //     if (todayInt >= +res3.data.payload.items[0].start_date && todayInt <= +res3.data.payload.items[0].end_date) {
            //         data3.push(res3.data.payload.items)
            //         data3[0].map(item => {
            //             item.start_date = (new Date(+item.start_date)).toLocaleDateString()
            //             item.end_date = (new Date(+item.end_date)).toLocaleDateString()

            //         })
            //         setDataNoti3(data3[0])
            //         // console.log('check data 2', data2[0])
            //     } else {
            //         setDataNoti3([])
            //     }

            // }

            // if (res4?.data?.payload?.items.length > 0) {
            //     setCountNoti(1)
            //     let today = new Date()
            //     let todayInt = today.getTime()
            //     // console.log('check today', todayInt)
            //     // console.log('check start', +res4.data.payload.items[0].start_date)
            //     // console.log('check end', +res4.data.payload.items[[0].end_date])

            //     if (todayInt >= +res4.data.payload.items[0].start_date && todayInt <= +res4.data.payload.items[0].end_date) {
            //         data4.push(res4.data.payload.items)
            //         data4[0].map(item => {
            //             item.start_date = (new Date(+item.start_date)).toLocaleDateString()
            //             item.end_date = (new Date(+item.end_date)).toLocaleDateString()

            //         })
            //         setDataNoti4(data4[0])
            //         // console.log('check data 2', data2[0])
            //     } else {
            //         setDataNoti4([])
            //     }

            // }

            // console.log(data[0])


        }

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
            {invitationInfo === 2 ?
                <div style={{ marginBottom: 15 }}>
                    <div><b>Thông báo về giảng viên hướng dẫn</b></div>
                    <div>Giảng viên <b>{lecturerInfo?.lecturer_name} </b> đã chấp nhận yêu cầu hướng dẫn nghiên cứu khoa học của bạn.</div>
                </div>
                :
                <p></p>
            }
            {refusedInvitation.length > 0 ?
                <div>
                    <p>Giảng viên <b>{refusedInvitation[0]?.lecturerInfo?.lecturer_name} </b> đã từ chối yêu cầu hướng dẫn nghiên cứu khoa học của bạn, hãy chọn giảng viên khác.</p>
                </div>
                : ''
            }
            {dataNoti ?
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

            {dataNoti3 ?
                <>

                    <div>
                        <div><b>{dataNoti3.name}</b></div>
                        <div>{dataNoti3.content}</div>
                        <div>Thời hạn từ {dataNoti3.start_date} đến {dataNoti3.end_date}</div>
                    </div>

                </>
                : ''
            }
            {dataNoti4 ?
                <>
                    <div>
                        <div><b>{dataNoti4.name}</b></div>
                        <div>{dataNoti4.content}</div>
                        <div>Thời hạn từ {dataNoti4.start_date} đến {dataNoti4.end_date}</div>
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