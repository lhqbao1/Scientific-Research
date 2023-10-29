import { Button, Collapse, Modal } from "antd"

const ModalExplanationTranscript = (props) => {
    const { isModalExplanationOpen, setIsModalExplanationOpen, exTranscript, drawerTopicTranscript } = props

    let explanationBoard = drawerTopicTranscript?.board
    const handleCancel = () => {
        setIsModalExplanationOpen(false)
    }

    var arr = [];
    var len = exTranscript?.length;
    for (var i = 0; i < len; i++) {
        arr.push({
            key: i + 1,
            label: [
                <div>
                    {explanationBoard?.presidentInfo?.lecturer_name === exTranscript[i]?.lecturerInfo?.lecturer_name ?
                        <>                        Chủ tịch: {explanationBoard?.presidentInfo?.lecturer_name}
                        </>
                        : ''}
                    {explanationBoard?.secretaryInfo?.lecturer_name === exTranscript[i]?.lecturerInfo?.lecturer_name ?
                        <>                        Thư ký: {explanationBoard?.secretaryInfo?.lecturer_name}
                        </>
                        : ''}
                    {explanationBoard?.commissioners.map(item => {
                        if (item?.lecturerInfo?.lecturer_name === exTranscript[i]?.lecturerInfo?.lecturer_name) {
                            return (
                                <>
                                    Ủy viên: {item?.lecturerInfo?.lecturer_name}
                                </>
                            )
                        }
                    })}
                </div>
            ],
            children:
                [
                    <div>
                        <>
                            <table style={{ width: '100%', marginBottom: 30 }}>
                                <tr style={{ backgroundColor: '#E0E0E0', border: '1px solid #E0E0E0', borderRadius: 10 }}>
                                    <th style={{ border: '1px solid #E0E0E0' }}>Nội dung đánh giá</th>
                                    <th style={{ height: 40, border: '1px solid #E0E0E0' }}>Điểm</th>
                                </tr >
                                <tr >
                                    <td style={{ width: 800, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Tổng quan tình hình nghiên cứu thuộc lĩnh vực đề tài</b></td>
                                    <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{exTranscript[i]?.scoreInfo?.score1}</td>
                                </tr>
                                <tr >
                                    <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Mục tiêu đề tài</b></td>
                                    <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{exTranscript[i]?.scoreInfo?.score2}</td>
                                </tr>
                                <tr >
                                    <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Phương pháp nghiên cứu</b></td>
                                    <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{exTranscript[i]?.scoreInfo?.score3}</td>
                                </tr>
                                <tr >
                                    <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Nội dung khoa họcNội dung khoa học</b></td>
                                    <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{exTranscript[i]?.scoreInfo?.score4}</td>
                                </tr>
                                <tr >
                                    <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Đóng góp về mặt kinh tế - xã hội, giáo dục và đào tạo, an ninh, quốc phòng</b></td>
                                    <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{exTranscript[i]?.scoreInfo?.score5}</td>
                                </tr>
                                <tr >
                                    <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Hình thức trình bày báo cáo tổng kết đề tài</b></td>
                                    <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{exTranscript[i]?.scoreInfo?.score6}</td>
                                </tr>
                                <tr >
                                    <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Thời gian và tiến độ thực hiện đề tài</b></td>
                                    <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{exTranscript[i]?.scoreInfo?.score7}</td>
                                </tr>
                                <tr >
                                    <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Điểm thưởng</b></td>
                                    <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{exTranscript[i]?.scoreInfo?.score8}</td>
                                </tr>
                            </table >
                            <span style={{ marginBottom: 30 }}><b>- Ý kiến của hội đồng về kết quả của đề tài: </b>{exTranscript[i]?.comment}</span>
                        </>
                    </div>

                ],
        });
    }

    return (
        <>
            <Modal
                title="Nhận xét của hội đồng thuyết minh"
                open={isModalExplanationOpen}
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                style={{
                    marginTop: -80,
                    height: 780,
                    overflow: 'scroll',
                    borderRadius: 10
                }}
                width={1000}
            >
                <Collapse
                    items={
                        arr
                    }
                    defaultActiveKey={['1']}
                    style={{ marginTop: 25 }}

                />
            </Modal>
        </>
    )
}

export default ModalExplanationTranscript