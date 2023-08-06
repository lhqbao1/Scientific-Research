import { Col, Row } from "antd"
import Header from "../../components/Header/Header"

const StudentLecturer = () => {
    return (
        <>
            <Header />
            <div style={{ backgroundColor: '#efefef', marginLeft: -8, marginRight: -8, marginTop: 8 }}>
                <div className="homepage-page">
                    <Row>
                        <Col span={5}></Col>
                        <Col span={14} style={{ height: '100%', backgroundColor: 'white', borderRadius: 10, padding: 15, fontSize: 14 }}>
                            <div>
                                <h3>DANH SÁCH CÁC GIẢNG VIÊN THUỘC TRƯỜNG CÔNG NGHỆ THÔNG TIN VÀ TRUYỀN THÔNG</h3>
                                <a>Khoa công nghệ phần mềm</a>
                                <a>Khoa công nghệ phần mềm</a>
                                <a>Khoa công nghệ phần mềm</a>
                                <a>Khoa công nghệ phần mềm</a>

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

export default StudentLecturer