import { Col, Row } from 'antd'
import './HomePage.scss'

const HomePage = () => {
    return (
        <div style={{ backgroundColor: '#efefef', marginLeft: -8, marginRight: -8, marginTop: 8 }}>
            <div className="homepage-page">
                <Row>
                    <Col span={5}></Col>
                    <Col span={14} style={{ height: '100px', backgroundColor: 'white', borderRadius: 10 }}>
                        <div style={{}}>

                        </div>
                    </Col>
                    <Col span={5}>

                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default HomePage