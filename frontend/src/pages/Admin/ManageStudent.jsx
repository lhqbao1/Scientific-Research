import { Table } from "antd";
import SearchStudent from "../../components/Admin/SearchStudent"
import { useState } from "react";

const ManageStudent = () => {

    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(10)
    const [pageSize, setPageSize] = useState(2)

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Chinese Score',
            dataIndex: 'chinese',
            sorter: {
                compare: (a, b) => a.chinese - b.chinese,
                multiple: 3,
            },
        },
        {
            title: 'Math Score',
            dataIndex: 'math',
            sorter: {
                compare: (a, b) => a.math - b.math,
                multiple: 2,
            },
        },
        {
            title: 'English Score',
            dataIndex: 'english',
            sorter: {
                compare: (a, b) => a.english - b.english,
                multiple: 1,
            },
        },
    ];
    const data = [
        {
            key: '1',
            name: 'John Brown',
            chinese: 98,
            math: 60,
            english: 70,
        },
        {
            key: '2',
            name: 'Jim Green',
            chinese: 98,
            math: 66,
            english: 89,
        },
        {
            key: '3',
            name: 'Joe Black',
            chinese: 98,
            math: 90,
            english: 70,
        },
        {
            key: '4',
            name: 'Jim Red',
            chinese: 88,
            math: 99,
            english: 89,
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

    const tableUserHeader = () => {
        return (
            <div>
                hehe
            </div>
        )
    }

    return (
        <div>
            <SearchStudent />
            <Table
                title={tableUserHeader}
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
        </div>
    )
}

export default ManageStudent