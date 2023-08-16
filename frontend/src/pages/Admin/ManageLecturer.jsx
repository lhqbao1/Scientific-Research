import { Button, Col, Drawer, Row, Table } from "antd";
import SearchStudent from "../../components/Admin/SearchStudent"
import { useEffect, useState } from "react";
import StudentDetail from "../../components/Admin/StudentDetail";
import AddStudent from "../../components/Admin/AddStudent";
import ImportStudent from "../../components/Admin/ImportStudent";
import * as XLSX from 'xlsx'
import { callGetStudents, searchStudent } from "../../../services/api";

const ManageLecturer = () => {

    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(10)
    const [pageSize, setPageSize] = useState(5)
    const [openDetail, setOpenDetail] = useState(false)
    const [detailStudent, setDetailStudent] = useState()
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [openModalImport, setOpenModalImport] = useState(false)
    const [dataStudent, setDataStudent] = useState()


    const columns = [
        {
            title: 'Mã cán bộ',
            dataIndex: 'lecturer_code',
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
            title: 'Họ và tên',
            dataIndex: 'lecturer_name',
            sorter: true,
        },
        {
            title: 'Chức danh',
            dataIndex: 'lecturer_title',
            // sorter: {
            //     compare: (a, b) => a.english - b.english,
            //     multiple: 1,
            // },
        },
        {
            title: 'Chức vụ',
            dataIndex: 'lecturer_position',
            // sorter: {
            //     compare: (a, b) => a.english - b.english,
            //     multiple: 1,
            // },
        },
        {
            title: 'Email',
            dataIndex: 'lecturer_email',
            sorter: true
        },

        {
            title: 'Nơi công tác',
            dataIndex: 'lecturer_employment',
            // sorter: {
            //     compare: (a, b) => a.math - b.math,
            //     multiple: 2,
            // },
        },


    ];
    const data = [
        {
            key: '1',
            lecturer_code: '123',
            lecturer_name: 'Luong Hoang Quoc Bao',
            lecturer_position: 'Trưởng khoa',
            lecturer_employment: 'Khoa công nghệ thông tin và truyền thông',
            lecturer_title: 'Tiến sĩ',
            lecturer_email: 'baob1910616@student.ctu.edu.vn'
        },

    ];

    const getStudents = async () => {
        let keyword = ''
        const res = await searchStudent(`${keyword}`)
        console.log(res.data)
        if (res && res.data) {
            setDataStudent(res.data.payload.items)
        }
        // console.log('hehehe', res.data.payload)
    }

    const handleSearch = (dataProps) => {
        setDataStudent(dataProps.items)
        setTotal(dataProps.meta.totalItems)
    }

    useEffect(() => {
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
            <SearchStudent
                handleSearch={handleSearch}
            />
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

export default ManageLecturer