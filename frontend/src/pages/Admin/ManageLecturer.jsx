import { Button, Col, Drawer, Form, Input, message, Modal, notification, Row, Select, Space, Table } from "antd";
import { useEffect, useState } from "react";
import StudentDetail from "../../components/Admin/StudentDetail";
import AddStudent from "../../components/Admin/AddStudent";
import ImportStudent from "../../components/Admin/ImportStudent";
import * as XLSX from 'xlsx'
import { callGetCoucil, callGetExplanationCoucilById, callGetLecturer, callSetLecturerCoucil, callUpdateBoard } from "../../../services/api";
import SearchLecturer from "../../components/AdminLecturer/SearchLecturer";
import AddLecturer from "../../components/AdminLecturer/AddLecturer";
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listCoucil, setListCoucil] = useState([])
    const [choosedLecturer, setChoosedLecturer] = useState()
    const [form] = Form.useForm();

    const columns = [
        {
            title: 'Họ và tên',
            dataIndex: 'lecturer_name',
            sorter: true,
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
            sorter: true
        },

        {
            title: 'Nơi công tác',
            dataIndex: 'work_place_id',
            render: (text, record) => <button
                onClick={() => console.log(record)}
                style={{
                    backgroundColor: "white",
                    border: 'none',
                    color: '#1677ff',
                    cursor: "pointer"
                }}
            >
                {record?.workplace?.workplace_name}
            </button>,
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            render: (text, record) => <button
                onClick={() => handleGetAction(record)}
                style={{
                    backgroundColor: "#1677ff",
                    border: 'none',
                    color: 'white',
                    cursor: "pointer",
                    padding: 10,
                    borderRadius: 7
                }}
            >
                Phân công
            </button>,
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

    const getLecturer = async () => {
        const res = await callGetLecturer()
        console.log(res.data)
        if (res && res.data) {
            setDataLecturer(res?.data?.payload?.items)
        }
    }

    const handleGetAction = (record) => {

        setIsModalOpen(true)
        setChoosedLecturer(record)
    }

    const handleSearch = (dataProps) => {
        setDataLecturer(dataProps.items)
        setTotal(dataProps.meta.totalItems)
    }

    useEffect(() => {
        getLecturer()
        getListCoucil()
    }, [])


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


    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields()
    };

    const onFinish = async (values) => {
        console.log(values)
        const checkExist = await callGetExplanationCoucilById(values.coucil)
        let existedBoard = checkExist.data.payload.items
        console.log('check exist', existedBoard)
        if (choosedLecturer.lecturer_id === checkExist.data.payload.items.president
            || choosedLecturer.lecturer_id === checkExist.data.payload.items.secretary
            || choosedLecturer.lecturer_id === checkExist.data.payload.items.couter
            || choosedLecturer.lecturer_id === checkExist.data.payload.items.commissioner1
            || choosedLecturer.lecturer_id === checkExist.data.payload.items.commissioner2
            || choosedLecturer.lecturer_id === checkExist.data.payload.items.commissioner3
        ) {
            notification.error({
                message: 'Giảng viên đã nằm trong hội đồng này'
            })
            return;
        } else {
            if (values.role === 'Chủ tịch hội đồng') {
                const res = await callUpdateBoard(values.coucil, choosedLecturer.lecturer_id, existedBoard.secretary, existedBoard.couter, existedBoard.commissioner1, existedBoard.commissioner2, existedBoard.commissioner3)
                notification.success({
                    message: 'Phân công thành công',
                    duration: 2
                })
                form.resetFields()
                setIsModalOpen(false)
            }
            if (values.role === 'Thư ký') {
                const res = await callUpdateBoard(values.coucil, existedBoard.president, choosedLecturer.lecturer_id, existedBoard.couter, existedBoard.commissioner1, existedBoard.commissioner2, existedBoard.commissioner3)
                notification.success({
                    message: 'Phân công thành công',
                    duration: 2
                })
                form.resetFields()
                setIsModalOpen(false)

            }
            if (values.role === 'Ủy viên') {
                if (checkExist.data.payload.items.commissioner1 === null) {
                    const res = await callUpdateBoard(values.coucil, existedBoard.president, existedBoard.secretary, existedBoard.couter, choosedLecturer.lecturer_id, existedBoard.commissioner2, existedBoard.commissioner3)
                    notification.success({
                        message: 'Phân công thành công',
                        duration: 2
                    })
                    form.resetFields()
                    setIsModalOpen(false)

                } else {
                    if (checkExist.data.payload.items.commissioner2 === null) {
                        const res = await callUpdateBoard(values.coucil, existedBoard.president, existedBoard.secretary, existedBoard.couter, existedBoard.commissioner1, choosedLecturer.lecturer_id, existedBoard.commissioner3)
                        notification.success({
                            message: 'Phân công thành công',
                            duration: 2
                        })
                        form.resetFields()
                        setIsModalOpen(false)

                    } else {
                        if (checkExist.data.payload.items.commissioner3 === null) {
                            const res = await callUpdateBoard(values.coucil, existedBoard.president, existedBoard.secretary, existedBoard.couter, existedBoard.commissioner1, existedBoard.commissioner2, choosedLecturer.lecturer_id)
                            notification.success({
                                message: 'Phân công thành công',
                                duration: 2
                            })
                            form.resetFields()
                            setIsModalOpen(false)

                        }
                    }
                }
            }


        }
        // if (choosedLecturer.explanationboard === values.coucil) {
        //     message.error('!')
        // } else {
        //     const res = await callGetExplanationCoucilById(values.coucil)
        //     let listLecturer = res.data.payload.items.lecturer
        //     // console.log(values.role)
        //     if (values.role === 'Chủ tịch hội đồng') {
        //         listLecturer.map(item => {
        //             if (item.explanationrole === 'Chủ tịch hội đồng') {
        //                 notification.error({
        //                     message: 'Đề tài đã có chủ tịch',
        //                     duration: 2
        //                 })
        //             }
        //             return;
        //         })
        //         return;
        //     }
        //     const res1 = await callSetLecturerCoucil(choosedLecturer.lecturer_id, values.coucil, values.role)
        //     if (res) {
        //         form.resetFields()
        //         message.success('Phân công thành công')
        //     }
        // }
        // console.log(values)
        // console.log(choosedLecturer)


    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    const onClose = () => {
        setOpenDetail(false);
    };

    const openAddLecturer = () => {
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

    const handleChooseCoucil = (value) => {
        // setWorkplaceSelected(value)
        console.log(`selected ${value}`);
    };
    const handleChooseRole = (value) => {
        console.log(`selected ${value}`);
    }

    const tableUserHeader = () => {
        return (
            <div style={{ marginLeft: 23 }}>
                <Row>
                    <Col span={18}></Col>
                    <Col span={6} style={{ display: "flex", gap: 15 }}>
                        <Button type="primary" style={{ minWidth: 80 }} onClick={openAddLecturer}>Add</Button>
                        <AddLecturer
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
                    showTotal: (total, range) => { return (<div>{range[0]} - {range[1]} on {total} results</div>) }
                }}
            />
            <Modal
                title="Phân công công việc"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    style={{
                        maxWidth: 600,
                        marginTop: 20
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Hội đồng"
                        name="coucil"
                        rules={[
                            {
                                required: true,
                                message: 'Please choose coucil!',
                            },
                        ]}
                    >
                        <Select
                            // defaultValue="lucy"
                            style={{
                                width: 373,
                            }}
                            onChange={handleChooseCoucil}
                        >
                            {listCoucil.map((item, index) => {
                                return (
                                    <Option value={item.id} label={item.id}>
                                        <Space>
                                            {item.name}({item.phase})
                                        </Space>
                                    </Option>
                                )
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Vai trò"
                        name="role"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn vai trò của giảng viên trong hội đồng',
                            },
                        ]}
                    >
                        <Select
                            // defaultValue="lucy"
                            style={{
                                width: 200,
                            }}
                            onChange={handleChooseRole}
                            options={[
                                {
                                    value: 'Chủ tịch hội đồng',
                                    label: 'Chủ tịch hội đồng',
                                },
                                {
                                    value: 'Thư ký',
                                    label: 'Thư ký',
                                },
                                {
                                    value: 'Ủy viên',
                                    label: 'Ủy viên',
                                },

                            ]}
                        />
                    </Form.Item>


                    <Form.Item
                        wrapperCol={{
                            offset: 19,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Phân công
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <StudentDetail
                openDetail={openDetail}
                setOpenDetail={setOpenDetail}
                detailStudent={detailStudent}
            />

        </div>
    )
}

export default ManageLecturer