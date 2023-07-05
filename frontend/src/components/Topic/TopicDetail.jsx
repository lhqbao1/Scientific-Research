import { Badge, Descriptions, Drawer } from "antd"



const TopicDetail = (props) => {
    const { openDetail, setOpenDetail, topicDetail } = props
    const onClose = () => {
        setOpenDetail(false)
    }


    return (
        <div>
            <Drawer title="Student detail" placement="right" onClose={onClose} open={openDetail} width={1000}>
                <Descriptions bordered>
                    <Descriptions.Item label="Student ID" span={2}>{topicDetail?.topicID}</Descriptions.Item>
                    <Descriptions.Item label="Student name" span={2}>{topicDetail?.topicName}</Descriptions.Item>
                    <Descriptions.Item label="Student grade" span={4}>{topicDetail?.topicMajor}</Descriptions.Item>
                    <Descriptions.Item label="Topic" span={4}>
                        {topicDetail?.topicManager}
                    </Descriptions.Item>
                    <Descriptions.Item label="Student major">{topicDetail?.topicInstructor}</Descriptions.Item>
                    <Descriptions.Item label="Student major">
                        <Badge status="processing" text={topicDetail?.status} />
                    </Descriptions.Item>


                </Descriptions>
            </Drawer>

        </div>
    )
}

export default TopicDetail