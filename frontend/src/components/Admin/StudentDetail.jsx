import { Descriptions, Drawer } from "antd";

const StudentDetail = (props) => {
    const { openDetail, setOpenDetail, detailStudent } = props
    // console.log('check detail student', detailStudent)
    const onClose = () => {
        setOpenDetail(false);
    };
    return (
        <>
            <Drawer title="Student detail" placement="right" onClose={onClose} open={openDetail} width={1000}>
                <Descriptions bordered>
                    <Descriptions.Item label="Student ID" span={2}>{detailStudent?.student_code}</Descriptions.Item>
                    <Descriptions.Item label="Student name" span={2}>{detailStudent?.student_name}</Descriptions.Item>
                    <Descriptions.Item label="Student grade" span={4}>{detailStudent?.grade}</Descriptions.Item>
                    <Descriptions.Item label="Topic" span={4}>
                        {detailStudent?.topic_name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Student major">{detailStudent?.major_name}</Descriptions.Item>

                </Descriptions>
            </Drawer>
        </>
    )
}

export default StudentDetail