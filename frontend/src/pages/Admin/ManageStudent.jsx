import { Button, Col, Drawer, Row, Table } from "antd";
import SearchStudent from "../../components/Admin/SearchStudent"
import { useEffect, useState } from "react";
import StudentDetail from "../../components/Admin/StudentDetail";
import AddStudent from "../../components/Admin/AddStudent";
import ImportStudent from "../../components/Admin/ImportStudent";
import * as XLSX from 'xlsx'
import { searchStudent } from "../../../services/api";

const ManageStudent = () => {

    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(20)
    const [pageSize, setPageSize] = useState(5)
    const [openDetail, setOpenDetail] = useState(false)
    const [detailStudent, setDetailStudent] = useState()
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [openModalImport, setOpenModalImport] = useState(false)
    const [dataStudent, setDataStudent] = useState()
    const [dataExport, setDataExport] = useState([])


    const columns = [
        {
            title: 'Mã số sinh viên',
            dataIndex: 'student_code',
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
            title: 'Tên sinh viên',
            dataIndex: 'student_name',
            sorter: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true
        },
        {
            title: 'Khóa',
            dataIndex: 'grade',
            // sorter: {
            //     compare: (a, b) => a.english - b.english,
            //     multiple: 1,
            // },
        },
        {
            title: 'Chuyên nghành',
            dataIndex: 'major_name',
            render: (text, record) =>
                <div>{record?.major?.major_name}</div>
            // sorter: {
            //     compare: (a, b) => a.math - b.math,
            //     multiple: 2,
            // },
        },
        {
            title: 'Lớp học',
            dataIndex: 'student_class',
            // sorter: {
            //     compare: (a, b) => a.math - b.math,
            //     multiple: 2,
            // },
        },
        {
            title: 'Đề tài',
            dataIndex: 'topic_name',
            render: (text, record) =>
                <div>{record?.topicInfo === null ? 'Chưa có đề tài' : record?.topicInfo?.topic_name}</div>


        },

    ];




    const handleSearch = (dataProps) => {
        setDataStudent(dataProps.items)
        setTotal(dataProps.meta.totalItems)
    }


    const getStudents = async () => {
        let keyword = ''
        const res = await searchStudent(`${keyword}`)
        // console.log('check meta', res.data.payload.meta)
        setTotal(res.data.payload.meta.totalItems)
        setDataStudent(res.data.payload.items)
    }
    useEffect(() => {
        if (dataStudent?.length > 0) {
            dataStudent.map((item, index) => {
                delete item.user_id,
                    delete item.role,
                    delete item.major,
                    delete item.topicInfo
            })
            setDataExport(dataStudent)
        }
        getStudents()
    }, [])



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
        const worksheet = XLSX.utils.json_to_sheet(dataExport);
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
            <SearchStudent
                handleSearch={handleSearch}
            />
            <Table
                title={tableUserHeader}
                dataSource={dataStudent}
                columns={columns}
                onChange={onChange}
                bordered={true}
                pagination={{
                    total: total,
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    pageSizeOptions: ['2', '5', '10', '20'],
                    showTotal: (total, range) => { return (<div>{range[0]} - {range[1]} trên {total} kết quả</div>) }
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