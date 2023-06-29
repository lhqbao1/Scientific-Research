import './Header.scss'
import { Button, Col, Popover, Row } from 'antd'
import { HomeOutlined, UserOutlined, LaptopOutlined } from "@ant-design/icons";


const Header = () => {

    const text = <span>Title</span>;
    const content = (
        <div>
            <p>Content</p>
            <p>Content</p>
        </div>
    );

    return (
        <div style={{ backgroundColor: '#efefef', margin: '-8px' }}>
            <div className="header-page">
                <Row>
                    <Col span={5} ></Col>
                    <Col span={14}>
                        <div style={{ backgroundColor: 'white', padding: 10, marginTop: 5, borderRadius: 10 }} >
                            <img
                                style={{ height: 130, width: '100%' }}
                                src="https://cit.ctu.edu.vn/encict/images/update2023/banner/banner_cict.jpg"
                            />
                        </div>

                    </Col>
                    <Col span={5}>
                        <Row>
                            <Col style={{ width: 120 }}>
                                <div style={{ backgroundColor: 'white', height: 20, marginTop: 5, borderRadius: 10, marginLeft: 10, padding: 10, fontSize: 16, width: 80 }}>
                                    <div style={{ marginTop: 0 }}>
                                        <HomeOutlined style={{ marginRight: 6, marginLeft: 7 }} />
                                        <span>Home</span>
                                    </div>

                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ width: 130 }}>
                                <div style={{ backgroundColor: 'white', height: 20, marginTop: 18, marginLeft: 10, borderRadius: 10, padding: 10, fontSize: 16, cursor: 'pointer' }}>
                                    <Popover placement="bottomLeft" title={text} content={content}  >
                                        <UserOutlined style={{ marginRight: 6, marginLeft: 2 }} />
                                        <span>Quoc Bao</span>
                                    </Popover>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ minWidth: 120 }}>
                                <div style={{ backgroundColor: 'white', height: 20, marginTop: 17, marginLeft: 10, borderRadius: 10, padding: 10, fontSize: 16, cursor: 'pointer' }}>
                                    <Popover placement="bottomLeft" title={text} content={content}  >
                                        <LaptopOutlined style={{ marginRight: 6, marginLeft: 2 }} />
                                        <span>Your topic</span>
                                    </Popover>
                                </div>
                            </Col>
                        </Row>
                    </Col>




                </Row>

            </div>
        </div>
    )
}

export default Header