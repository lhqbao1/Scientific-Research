import './Header.scss'
import { Button, Col, Popover, Row } from 'antd'
import { HomeOutlined, UserOutlined, LaptopOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const navigate = useNavigate()
    const userInfo = useSelector(state => state.account.user)
    console.log(userInfo)
    const text = <span>Title</span>;
    const content = (
        <div>
            <p>Content</p>
            <p>Content</p>
        </div>
    );

    const contentLecturer = (
        <div >
            <div ><a href='/lecturer/khoa-cong-nghe-phan-mem' style={{ color: 'black', textTransform: 'uppercase' }}>Khoa công nghệ phần mềm</a>
            </div>
            <div><a style={{ color: 'black' }}>Khoa công nghệ thông tin</a></div>
            <div><a style={{ color: 'black' }}>Khoa hệ thống thông tin</a>
            </div>
            <div><a style={{ color: 'black' }}>Khoa khoa học máy tính</a>
            </div>
            <div><a style={{ color: 'black' }}>Khoa mạng máy tính và truyền thông</a>
            </div>
            <div><a style={{ color: 'black' }}>Khoa truyền thông đa phương tiện</a>
            </div>

        </div>
    )

    return (
        <div style={{ backgroundColor: '#efefef', margin: '-8px' }}>
            <div className="header-page">
                <Row>
                    <Col span={5} ></Col>

                    <Col span={14}>
                        <Row>
                            {/* <div style={{  }} > */}
                            <img
                                style={{ height: 130, width: '100%', backgroundColor: 'white', padding: 10, marginTop: 5, borderRadius: 10 }}
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
                                        <span>Your topic</span>
                                    </Popover>
                                </div>
                            </div>
                            <div className='header-button' >
                                <div style={{ marginTop: 0 }} >
                                    <Popover placement="bottomLeft" content={contentLecturer}  >

                                        <LaptopOutlined style={{ marginRight: 6, marginLeft: 2 }} />
                                        <span>Lecturer</span>
                                    </Popover>
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