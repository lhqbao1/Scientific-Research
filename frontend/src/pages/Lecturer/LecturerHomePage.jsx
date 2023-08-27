import { Col, Modal, Row } from 'antd'
import './LecturerHomePage.scss'

const LecturerHomePage = () => {


    return (
        <div style={{ backgroundColor: '#efefef', marginLeft: -8, marginRight: -8, marginTop: 8 }}>
            <div className="LecturerHomePage-page">
                <Row>
                    <Col span={5}></Col>
                    <Col span={14} style={{ height: '100%', backgroundColor: 'white', borderRadius: 10, padding: 15, fontSize: 14 }}>
                        <div>
                            <h3>CÁC ĐỀ TÀI ĐANG PHỤ TRÁCH HƯỚNG DẪN</h3>
                        </div>
                    </Col>
                    <Col span={5}>

                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default LecturerHomePage