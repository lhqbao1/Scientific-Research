import { Col, Row } from 'antd'
import './HomePage.scss'

const HomePage = () => {
    return (
        <div style={{ backgroundColor: '#efefef', marginLeft: -8, marginRight: -8, marginTop: 8 }}>
            <div className="homepage-page">
                <Row>
                    <Col span={5}></Col>
                    <Col span={14} style={{ height: '100%', backgroundColor: 'white', borderRadius: 10, padding: 15, fontSize: 14 }}>
                        <div>
                            <h3>NGHIÊN CỨU KHOA HỌC LÀ GÌ ?</h3>
                            <span>Nghiên cứu khoa học là một hoạt động xã hội, hướng vào việc tìm kiếm những điều mà khoa học chưa biết: hoặc là phát hiện bản chất sự vật, phát triển nhận thức khoa học về thế giới; hoặc là sáng tạo phương pháp mới và phương tiện kĩ thuật mới.</span>
                            <br></br>
                            <br></br>
                            <span>Hoạt động nghiên cứu khoa học ở Đại học Cần Thơ nói chung và Trường Công nghệ thông tin và Truyền thông nói riêng nhằm giúp sinh viên phát triển tư duy, tìm tỏi, học hỏi và vận dụng để tạo ra những đề tài mang tính sáng tạo, thực tiễn. Đề tài nghiên cứu khoa học ở Trường Công nghệ thông tin và Truyền thông có thể thuộc về nhiều lĩnh vực như web, máy học, trí tuệ nhân tạo, lập trình nhúng, IOT,...</span>
                            <h3>QUY ĐỊNH QUẢN LÝ NHIỆM VỤ KHOA HỌC VÀ CÔNG NGHỆ TRƯỜNG ĐẠI HỌC CẦN THƠ</h3>
                            <h4>1. QUY ĐỊNH CHUNG</h4>
                            <ul>
                                <li>Phạm vi và đối tượng áp dụng</li>
                                <li>Giải thích từ ngữ</li>
                                <li>Các loại nhiệm vụ KH&CN</li>
                                <li><a>Tiêu chuẩn chủ nhiệm nhiệm vụ KH&CN</a></li>
                                <li><a>Quyền hạn và trách nhiệm của cá nhân, đơn vị thực hiện nhiệm vụ KH&CN</a></li>
                                <li><a>Nhiệm vụ của cá nhân, đơn vị trong việc thực hiện nhiệm vụ KH&CN</a></li>
                            </ul>
                            <h4>2. ĐĂNG KÝ, TUYỂN CHỌN VÀ THỰC HIỆN NHIỆM VỤ KHOA HỌC VÀ CÔNG NGHÊ</h4>
                            <ul>
                                <li><a>Đăng ký nhiệm vụ KH&CN </a></li>
                                <li><a>Xét chọn và tuyển chọn nhiệm vụ KH&CN </a></li>
                                <li><a>Phê duyệt và giao nhiệm vụ KH&CN </a></li>
                                <li><a>Thực hiện nhiệm vụ KH&CN</a></li>
                            </ul>

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