import { Badge, Table } from "antd";
import { useState } from "react";
import TopicDetail from "../../components/Topic/TopicDetail";

const ManageTopic = () => {
    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(10)
    const [pageSize, setPageSize] = useState(5)
    const [openDetail, setOpenDetail] = useState(false)
    const [topicDetail, setTopicDetail] = useState([])

    const columns = [
        {
            title: 'Topic ID',
            dataIndex: 'topicID',
            render: (text, record) => <button
                onClick={() => showDetailTopic(text, record)}
                style={{
                    backgroundColor: "white",
                    border: 'none',
                    color: '#1677ff',
                    cursor: "pointer"
                }}
            >
                {text}
            </button>,
        },
        {
            title: 'Topic name',
            dataIndex: 'topicName',
            sorter: true,
        },
        {
            title: 'Topic major',
            dataIndex: 'topicMajor',
            sorter: true
        },
        {
            title: 'Topic manager',
            dataIndex: 'topicManager',
            // sorter: {
            //     compare: (a, b) => a.english - b.english,
            //     multiple: 1,
            // },
        },
        {
            title: 'Topic advisor',
            dataIndex: 'topicAdvisor',
            // sorter: {
            //     compare: (a, b) => a.math - b.math,
            //     multiple: 2,
            // },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (text, record) => <Badge status="processing" text='In process' />
            ,
            // sorter: {
            //     compare: (a, b) => a.english - b.english,
            //     multiple: 1,
            // },
        },

    ];
    const data = [
        {
            topicID: 'THS-123',
            topicName: 'Scientific Research',
            topicMajor: 'Information and Technology High Quality',
            topicManager: 'Lương Hoàng Quốc Bảo',
            topicInstructor: 'Trần Minh Tân',
            status: 'in process',
        },
    ];
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
        if (pagination && pagination?.current) {
            setCurrent(pagination.current)
        }
        if (pagination && pagination?.pageSize) {
            setPageSize(pagination.pageSize)
        }
    };

    const showDetailTopic = (text, record) => {
        setOpenDetail(true)
        setTopicDetail(record)
    }

    return (
        <div>
            <Table
                // title={tableUserHeader}
                dataSource={data}
                columns={columns}
                onChange={onChange}
                bordered={true}
                pagination={{
                    total: total,
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    pageSizeOptions: ['2', '5', '10', '20'],
                    showTotal: (total, range) => { return (<div>{range[0]} - {range[1]} on {total} results</div>) }
                }}
            />
            <TopicDetail
                openDetail={openDetail}
                setOpenDetail={setOpenDetail}
                topicDetail={topicDetail}
            />
        </div>
    )
}

export default ManageTopic