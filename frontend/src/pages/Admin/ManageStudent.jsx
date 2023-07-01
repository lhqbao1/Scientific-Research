import { Button, Col, Drawer, Row, Table } from "antd";
import SearchStudent from "../../components/Admin/SearchStudent"
import { useState } from "react";
import StudentDetail from "../../components/Admin/StudentDetail";
import AddStudent from "../../components/Admin/AddStudent";
import ImportStudent from "../../components/Admin/ImportStudent";
import * as XLSX from 'xlsx'


const ManageStudent = () => {

    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(10)
    const [pageSize, setPageSize] = useState(2)
    const [openDetail, setOpenDetail] = useState(false)
    const [detailStudent, setDetailStudent] = useState()
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [openModalImport, setOpenModalImport] = useState(false)


    const columns = [
        {
            title: 'Student ID',
            dataIndex: 'studentID',
            render: (text, record) => <button
                onClick={() => showDetailStudent(text, record)}
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
            title: 'Name',
            dataIndex: 'name',
            sorter: true
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true
        },
        {
            title: 'Grade',
            dataIndex: 'grade',
            // sorter: {
            //     compare: (a, b) => a.english - b.english,
            //     multiple: 1,
            // },
        },
        {
            title: 'Major',
            dataIndex: 'major',
            // sorter: {
            //     compare: (a, b) => a.math - b.math,
            //     multiple: 2,
            // },
        },
        {
            title: 'Topic',
            dataIndex: 'topic',
            // sorter: {
            //     compare: (a, b) => a.english - b.english,
            //     multiple: 1,
            // },
        },

    ];
    const data = [
        {
            key: '1',
            name: 'Luong Hoang Quoc Bao',
            studentID: 'B1910616',
            grade: 'K45',
            major: 'Information and Technology High Quality',
            topic: 'Scientific Research',
            email: 'baob1910616@student.ctu.edu.vn'
        },
        {
            key: '2',
            name: 'Nguyễn Trâm Anh',
            studentID: 'B1910699',
            grade: 'K45',
            major: 'International Bussiness High Quality',
            topic: 'Scientific Research',
            email: 'anhb1910699@student.ctu.edu.vn'

        },
        {
            key: '3',
            name: 'Luong Hoang Quoc Bao',
            studentID: 'B1910616',
            grade: 'K45',
            major: 'Information and Technology High Quality',
            topic: 'Scientific Research',

        },
        {
            key: '4',
            name: 'Luong Hoang Quoc Bao',
            studentID: 'B1910616',
            grade: 'K45',
            major: 'Information and Technology High Quality',
            topic: 'Scientific Research',

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

    const showDetailStudent = (text, record) => {
        // console.log(record, text)
        setOpenDetail(true);
        setDetailStudent(record)
    }


    const onClose = () => {
        setOpenDetail(false);
    };

    const openAddStudent = () => {
        setOpenModalAdd(true)
    }

    const openImportStudent = () => {
        setOpenModalImport(true)
    }
    const downloadFile = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
        //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(workbook, "DataStudent.csv");
    }
    const tableUserHeader = () => {
        return (
            <div style={{ marginLeft: 23 }}>
                <Row>
                    <Col span={18}></Col>
                    <Col span={6} style={{ display: "flex", gap: 15 }}>
                        <Button type="primary" style={{ minWidth: 80 }} onClick={openAddStudent}>Add</Button>
                        <AddStudent
                            openModalAdd={openModalAdd}
                            setOpenModalAdd={setOpenModalAdd}
                        />
                        <Button type="primary" style={{ minWidth: 80 }} onClick={openImportStudent}>Import</Button>
                        <ImportStudent
                            openModalImport={openModalImport}
                            setOpenModalImport={setOpenModalImport}
                        />
                        <Button type="primary" style={{ minWidth: 80 }} onClick={downloadFile}>Export</Button>
                    </Col>
                </Row>
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
            <StudentDetail
                openDetail={openDetail}
                setOpenDetail={setOpenDetail}
                detailStudent={detailStudent}
            />

        </div>
    )
}

export default ManageStudent