import { Button, Col, Drawer, notification, Row, Table } from "antd";
import SearchStudent from "../../components/Admin/SearchStudent"
import { useEffect, useState } from "react";
import StudentDetail from "../../components/Admin/StudentDetail";
import AddStudent from "../../components/Admin/AddStudent";
import ImportStudent from "../../components/Admin/ImportStudent";
import * as XLSX from 'xlsx'
import { callDeleteStudent, callDeleteUser, searchStudent } from "../../../services/api";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ModalEditStudent from "./ModalManageStudent/ModalEditStudent";

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
    const [reload, setReload] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [choosedStudent, setChoosedStudent] = useState()


    const deleteStudent = async (student) => {
        console.log(student)
        if (student.topic_id) {
            notification.error({
                message: 'Sinh viên đã tham gia đề tài, không thể xóa',
                duration: 2
            })
            return;
        }
        try {
            const res = await callDeleteStudent(student.student_id)
            const user = await callDeleteUser(student.user_id)

            if (res && user) {
                setReload(!reload)
                notification.success({
                    message: 'Xóa sinh viên thành công',
                    duration: 2
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const editStudent = async (student) => {
        console.log(student)
        setOpenModalEdit(true)
        setChoosedStudent(student)
    }

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
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Khóa',
            dataIndex: 'grade',
        },
        {
            title: 'Chuyên nghành',
            dataIndex: 'major_name',
            render: (text, record) =>
                <div>{record?.major?.major_name}</div>

        },
        {
            title: 'Lớp học',
            dataIndex: 'student_class',
        },
        {
            title: 'Thao tác',
            render: (text, record) =>
                <div>
                    <EditOutlined
                        style={{
                            cursor: 'pointer',
                            fontSize: 20,
                            marginRight: 20,
                            color: 'green'
                        }}
                        onClick={() => editStudent(record)}
                    />
                    <DeleteOutlined
                        style={{
                            cursor: 'pointer',
                            fontSize: 20,
                            color: 'red'
                        }}
                        onClick={() => deleteStudent(record)}
                    />
                </div>

        },
    ];

    const handleSearch = (dataProps) => {
        setDataStudent(dataProps.items)
        setTotal(dataProps.meta.totalItems)
    }

    const getStudents = async () => {
        let keyword = ''
        const res = await searchStudent(`${keyword}`)
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
    }, [reload])



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

    const openAddStudent = () => {
        setOpenModalAdd(true)
    }

    const openImportStudent = () => {
        setOpenModalImport(true)
    }
    const downloadFile = () => {
        dataExport.map(item => {
            item["Họ tên"] = item.student_name
            item["Mã số sinh viên"] = item.student_code
            item["Email"] = item.email
            if (item.major_id === 1) {
                item["Chuyên nghành"] = 'Công nghệ thông tin'
            }
            if (item.major_id === 7) {
                item["Chuyên nghành"] = 'Truyền thông đa phương tiện'
            }
            item["Lớp"] = item.student_class
            item["Niên khóa"] = item.grade
            delete item.topic_id
            delete item.student_name
            delete item.student_code
            delete item.email
            delete item.major_id
            delete item.student_class
            delete item.grade
            delete item.student_id
        })

        const worksheet = XLSX.utils.json_to_sheet(dataExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "Danh sach sinh vien.csv");
    }
    const tableUserHeader = () => {
        return (
            <div style={{ marginLeft: 23 }}>
                <Row>
                    <Col span={18}></Col>
                    <Col span={6} style={{ display: "flex", gap: 15 }}>
                        <Button type="primary" onClick={openAddStudent}>Thêm</Button>
                        <AddStudent
                            reload={reload}
                            setReload={setReload}
                            openModalAdd={openModalAdd}
                            setOpenModalAdd={setOpenModalAdd}
                        />
                        <Button type="primary" onClick={openImportStudent}>Thêm nhiều</Button>
                        <ImportStudent
                            reload={reload}
                            setReload={setReload}
                            openModalImport={openModalImport}
                            setOpenModalImport={setOpenModalImport}
                        />
                        <Button type="primary" onClick={downloadFile}>Xuất file</Button>
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

            <ModalEditStudent
                openModalEdit={openModalEdit}
                setOpenModalEdit={setOpenModalEdit}
                choosedStudent={choosedStudent}
                setReload={setReload}
                reload={reload}
            />

        </div>
    )
}

export default ManageStudent