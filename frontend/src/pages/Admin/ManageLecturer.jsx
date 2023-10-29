import { Button, Col, Drawer, Form, Input, message, Modal, notification, Row, Select, Space, Table } from "antd";
import { useEffect, useState } from "react";
import StudentDetail from "../../components/Admin/StudentDetail";
import AddStudent from "../../components/Admin/AddStudent";
import ImportStudent from "../../components/Admin/ImportStudent";
import * as XLSX from 'xlsx'
import { callGetCoucil, callGetExplanationCoucilById, callGetLecturer, callSetLecturerCoucil, callUpdateBoard } from "../../../services/api";
import SearchLecturer from "../../components/AdminLecturer/SearchLecturer";
import AddLecturer from "../../components/AdminLecturer/AddLecturer";
import ImportLecturer from "../../components/AdminLecturer/ImportLecturer";
// import SearchLecturer from "../../components/AdminLecturer/SearchLecturer";

const ManageLecturer = () => {

    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(10)
    const [pageSize, setPageSize] = useState(5)
    const [openDetail, setOpenDetail] = useState(false)
    const [detailStudent, setDetailStudent] = useState()
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [openModalImport, setOpenModalImport] = useState(false)
    const [dataLecturer, setDataLecturer] = useState([])
    const [listCoucil, setListCoucil] = useState([])
    const [form] = Form.useForm();
    const [reload, setReload] = useState(false)

    const columns = [
        {
            title: 'Họ và tên',
            dataIndex: 'lecturer_name',
        },
        {
            title: 'Chức danh',
            dataIndex: 'degree',

        },
        {
            title: 'Chức vụ',
            dataIndex: 'position',

        },
        {
            title: 'Email',
            dataIndex: 'email',
        },

        {
            title: 'Nơi công tác',
            dataIndex: 'work_place_id',
            render: (text, record) => <span>
                {record?.workplace?.workplace_name}
            </span>,
        },
    ];


    const getLecturer = async () => {
        const res = await callGetLecturer()
        console.log(res.data)
        if (res && res.data) {
            setTotal(res?.data?.payload?.items?.length)
            setDataLecturer(res?.data?.payload?.items)
        }
    }

    const handleSearch = (dataProps) => {
        setDataLecturer(dataProps.items)
        setTotal(dataProps.meta.totalItems)
    }

    useEffect(() => {
        getLecturer()
        getListCoucil()
    }, [reload])


    const getListCoucil = async () => {
        const res = await callGetCoucil()
        if (res) {
            setListCoucil(res.data.payload.items)
        }
    }

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
        if (pagination && pagination?.current) {
            setCurrent(pagination.current)
        }
        if (pagination && pagination?.pageSize) {
            setPageSize(pagination.pageSize)
        }
    };

    const openAddLecturer = () => {
        setOpenModalAdd(true)
    }

    const openImportStudent = () => {
        setOpenModalImport(true)
    }
    const downloadFile = () => {
        let data = []
        dataLecturer.map(item => {
            let object = {}
            object["Họ tên"] = item.lecturer_name
            object["Chức vụ"] = item.position
            object["Học hàm"] = item.degree
            object['Nơi công tác'] = item.workplace.workplace_name
            object["Email"] = item.email
            data.push(object)
        })

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "Danh sách giảng viên.csv");
    }



    const tableUserHeader = () => {
        return (
            <div >
                <Row>
                    <Col span={18}></Col>
                    <Col span={6} style={{ display: "flex", gap: 15 }}>
                        <Button type="primary" onClick={openAddLecturer}>Thêm</Button>
                        <AddLecturer
                            openModalAdd={openModalAdd}
                            setOpenModalAdd={setOpenModalAdd}
                        />

                        <Button type="primary" onClick={openImportStudent}>Thêm nhiều</Button>
                        <ImportLecturer
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
            <SearchLecturer
                handleSearch={handleSearch}
            />
            <Table
                title={tableUserHeader}
                dataSource={dataLecturer}
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

export default ManageLecturer