import { Col, Row } from "antd"

const Topic = () => {
    return (
        <>
            <div style={{ backgroundColor: '#efefef', marginLeft: -8, marginRight: -8, marginTop: 8 }}>
                <div style={{ minHeight: 570 }}>
                    <Row>
                        <Col span={5}></Col>
                        <Col span={14} style={{ height: '50%', backgroundColor: 'white', borderRadius: 10, padding: 15, fontSize: 14 }}>
                            <div>
                                <h3>THÔNG TIN ĐỀ TÀI CỦA BẠN</h3>
                            </div>
                        </Col>
                        <Col span={5}>

                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default Topic