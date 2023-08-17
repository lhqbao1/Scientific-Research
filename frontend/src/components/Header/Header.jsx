import './Header.scss'
import { Badge, Button, Col, Popover, Row, message } from 'antd'
import { HomeOutlined, UserOutlined, LaptopOutlined, NotificationOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const Header = () => {
    const [countNoti, setCountNoti] = useState(1)
    const navigate = useNavigate()
    const userInfo = useSelector(state => state.account.user)
    const checkHasLecturer = useSelector(state => state.account.user.status)
    console.log('cehcek sind', userInfo)
    const text = <span>Title</span>;
    const content = (
        <div>
            <p>Content</p>
            <p>Content</p>
        </div>
    );

    const contentLecturer = (
        <div >
            <div style={{ marginBottom: 5 }}><a href='/lecturer/khoa-cong-nghe-phan-mem' style={{ color: 'black', textTransform: 'uppercase' }}>Khoa công nghệ phần mềm</a>
            </div>
            <div style={{ marginBottom: 5 }}><a href='/lecturer/khoa-cong-nghe-thong-tin' style={{ color: 'black', textTransform: 'uppercase' }}>Khoa công nghệ thông tin</a></div>
            <div style={{ marginBottom: 5 }}><a href='/lecturer/khoa-he-thong-thong-tin' style={{ color: 'black', textTransform: 'uppercase' }}>Khoa hệ thống thông tin</a>
            </div>
            <div style={{ marginBottom: 5 }}><a href='/lecturer/khoa-khoa-hoc-may-tinh' style={{ color: 'black', textTransform: 'uppercase' }}>Khoa khoa học máy tính</a>
            </div>
            <div style={{ marginBottom: 5 }}><a href='/lecturer/khoa-mang-may-tinh-va-truyen-thong' style={{ color: 'black', textTransform: 'uppercase' }}>Khoa mạng máy tính và truyền thông</a>
            </div>
            <div style={{ marginBottom: 5 }}><a href='/lecturer/khoa-truyen-thong-da-phuong-tien' style={{ color: 'black', textTransform: 'uppercase' }}>Khoa truyền thông đa phương tiện</a>
            </div>

        </div>
    )

    const contentNoti = (
        <div>
            <p>Giảng viên abc đã chấp nhận yêu cầu hướng dẫn nghiên cứu khoa học của bạn.</p>
        </div>
    );

    const checkNoti = () => {
        setCountNoti(0)
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
                                    <span>Home</span>
                                </div>
                            </div>
                            <div className='header-button' >
                                <div style={{ marginTop: 0 }}>
                                    <Popover placement="bottomLeft" title={text} content={content}  >
                                        <UserOutlined style={{ marginRight: 6, marginLeft: 2 }} />
                                        <span>Quoc Bao</span>
                                    </Popover>
                                </div>
                            </div>
                            <div className='header-button' >
                                <div style={{ marginTop: 0 }}>
                                    <Popover placement="bottomLeft" title={text} content={content}  >
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
                                    <Popover placement="bottomLeft" content={contentLecturer}  >
                                        <LaptopOutlined style={{ marginRight: 6, marginLeft: 2 }} />
                                        <span>Lecturer</span>
                                    </Popover>
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