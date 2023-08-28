import { Col, Descriptions, Row } from "antd"
import { useDispatch, useSelector } from "react-redux"

const Topic = () => {

    const topic = useSelector(state => state.student.user.topic)
    console.log(topic)
    const items = [
        {
            key: '1',
            label: 'Tên đề tài',
            children: topic.topic_name,
            span: '16'
        },
        {
            key: '2',
            label: 'Lĩnh vực nghiên cứu',
            children: topic.research_area,
            span: '16'
        },
        {
            key: '3',
            label: 'Mô tả cơ bản',
            children: topic.basic_description,
            span: '16'
        }
    ]
    return (
        <>
            <div style={{ backgroundColor: '#efefef', marginLeft: -8, marginRight: -8, marginTop: 8 }}>
                <div style={{ minHeight: 570 }}>
                    <Row>
                        <Col span={5}></Col>
                        <Col span={14} style={{ height: '50%', backgroundColor: 'white', borderRadius: 10, padding: 15, fontSize: 14 }}>
                            <div>
                                <h3>THÔNG TIN ĐỀ TÀI CỦA BẠN</h3>

                                <Descriptions bordered items={items} />
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