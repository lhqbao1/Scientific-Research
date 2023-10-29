import { Button, Card, Col, Drawer, Form, Input, message, Modal, notification, Popconfirm, Radio, Row, Select, Space, Table } from "antd"
import { useForm } from "antd/es/form/Form"
import { useState } from "react"
import { useEffect } from "react"
import { callCreateCommissioner, callCreateCoucil, callGetCoucil, callGetExplanationCoucilById, callGetLecturerByWorkPlace, callGetTopicSetExplanation, callSetAccBoardPresident, callSetAccBoardSecretary, callUpdateTopicExplanationBulk, callUpdateTopicStatus, callUpdateTopicStatusBulk } from "../../../services/api"

const ManageExplanation = (props) => {
    const { openManageExplanation, setOpenManageExplanation, openManageLecturer, setOpenManageLecturer } = props
    const [coucil, setCoucil] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataLecturer, setDataLecturer] = useState([])
    const [value, setValue] = useState()
    const [open, setOpen] = useState(false);
    const [openTopic, setOpenTopic] = useState(false);
    const [topic, setTopic] = useState([])
    const [valueRole, setValueRole] = useState()
    const [choosedBoard, setChoosedBoard] = useState()
    const [choosedLecturer, setChoosedLecturer] = useState()
    const [idBoard, setIdBoard] = useState()
    const [selectedTopic, setSelectedTopic] = useState([])
    const [choosedCoucil, setChoosedCoucil] = useState()
    const [form] = Form.useForm()

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        getCoucil()
        getCoucilById()
        getTopicSetExplanation()
    }, [])

    const getTopicSetExplanation = async () => {
        const res = await callGetTopicSetExplanation()
        if (res?.data?.payload) {
            let dataTopic = res.data.payload.items
            let i = 0
            dataTopic.map(item => {
                // console.log(dataTopic.length)
                item.key = ++i
            })
            setTopic(dataTopic)
        }
    }

    const getCoucil = async () => {
        const res = await callGetCoucil()
        if (res) {
            console.log(res.data.payload.items)
            setCoucil(res?.data?.payload?.items)
        }
    }

    const getCoucilById = async () => {
        const res = await callGetExplanationCoucilById(idBoard)
        if (res) {
            // console.log('chcek xczczxczxc', res.data.payload.items)
            setChoosedBoard(res.data.payload.items)
        }
    }

    const onFinish = async (values) => {
        const totalPhase = values.phase + ' ' + values.year

        console.log('Success:', values.coucil, totalPhase);
        const res = await callCreateCoucil(values.coucil, totalPhase, 'hội đồng thuyết minh')
        if (res) {
            form.resetFields()
            message.success('Tạo hội đồng thành công')
            setIsModalOpen(false);
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const navigateLecturer = () => {
        setOpenManageExplanation(false)
        setOpenManageLecturer(true)
    }

    const onClose = () => {
        setOpen(false);
        setDataLecturer([])
        setValue('CNPM')
    };

    const chooseWorkPlace = async (e) => {
        setValue(e.target.value)
        const res = await callGetLecturerByWorkPlace(e.target.value)
        setDataLecturer(res.data.payload)
    }

    const chooseRole = (e) => {
        setValueRole(e.target.value);
    };
    const dataPop = 'Chọn vai trò trong hội đồng';
    const description = [
        <div>
            <Radio.Group onChange={chooseRole} value={valueRole}>
                <Space direction="vertical">
                    <Radio value={1}>Chủ tịch hội đồng</Radio>
                    <Radio value={2}>Thư ký</Radio>
                    <Radio value={3}>
                        Ủy viên
                    </Radio>
                </Space>
            </Radio.Group>
        </div>
    ];
    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'lecturer_name',
            render: (text, record) => <button
                // onClick={() => showLecturerDetail(text, record)}
                style={{
                    backgroundColor: "white",
                    border: 'none',
                    color: '#1677ff',
                    cursor: "pointer",
                }}
            >
                {record.degree} {text}
            </button>,
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
            title: 'Thao tác',
            dataIndex: 'action',
            render: (text, record) =>
                // {hasSent === false ? : ''}
                <Popconfirm
                    placement="bottomRight"
                    title={dataPop}
                    description={description}
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Mời"
                    cancelText="No"
                    cancelButtonProps={{ style: { display: 'none' } }}
                >
                    <button
                        // disabled={hasLecturer}
                        onClick={() => doInviteLecturer(record)}
                        style={{
                            backgroundColor: "#87d068",
                            border: 'none',
                            color: 'white',
                            cursor: "pointer",
                            padding: '10px 20px 10px 20px',
                            borderRadius: 5,
                            fontSize: 14,
                        }}
                    >
                        Mời giảng viên
                    </button >
                </Popconfirm>

        },
    ];


    const columnTopic = [
        {
            title: 'Tên đề tài',
            dataIndex: 'topic_name',
        },
        {
            title: 'Lĩnh vực nghiên cứu',
            dataIndex: 'research_area',
        },
        {
            title: 'Mô tả đề tài',
            dataIndex: 'basic_description',
        },
        {
            title: 'Chủ nhiệm đề tài',
            dataIndex: 'topic_manager',
            render: (text, record) =>
                <div>
                    {/* {record?.student?.role === 'chủ nhiệm đề tài' ? record?.student?.student_name : ''} */}
                    {record.student.map(item => {
                        if (item.role === 'chủ nhiệm đề tài') {
                            return (
                                <div>{item.student_name}</div>
                            )
                        }
                    })}
                </div>
        },
        {
            title: 'Giáo viên hướng dẫn',
            dataIndex: 'topic_advisor',
            render: (text, record) =>
                <div>
                    {/* {record?.student?.role === 'chủ nhiệm đề tài' ? record?.student?.student_name : ''} */}
                    {record?.lecturer?.lecturer_name}
                </div>
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log('selectedRows: ', selectedRows);
            setSelectedTopic(selectedRows)
            // selectedRows.map(item => {
            //     delete 
            // })
        },
        getCheckboxProps: (record) => ({
            disabled: record.topic_name === 'Disabled User',
            // Column configuration not to be checked
            name: record.topic_name,
        }),
    };

    const cancel = () => {
        message.info('Clicked on Yes.');
    };

    const doInviteLecturer = async (data) => {
        setChoosedLecturer(data)
    }

    const openDrawer = async (data) => {
        setOpen(true);
        setIdBoard(data.id)
        const res = await callGetLecturerByWorkPlace('CNPM')
        setDataLecturer(res.data.payload)
    }

    const confirm = async () => {
        console.log('check board', choosedBoard)
        let choosed = []
        choosedBoard?.commissioners.map(item => {
            if (choosedLecturer.lecturer_id === item.lecturer) {
                choosed.push(item)
            }
        })
        // console.log('check choosed', choosedBoard)

        if (choosed.length > 0 || choosedLecturer.lecturer_id === choosedBoard.president ||
            choosedLecturer.lecturer_id === choosedBoard.secretary) {

            notification.error({
                message: 'Giảng viên đã thuộc hội đồng này',
                duration: 2,
            })
        } else {
            if (valueRole === 1) {
                if (choosedBoard.president !== null) {
                    notification.error({
                        message: 'Đề tài đã có chủ tịch',
                        duration: 2
                    })
                } else {
                    const res = await callSetAccBoardPresident(choosedBoard.id, choosedLecturer.lecturer_id)
                    // const resTopic = await call
                    if (res.data.payload) {
                        notification.success({
                            message: 'Phân công chủ tịch cho hội đồng thành công',
                            duration: 2
                        })
                    }
                }
            }
            if (valueRole === 2) {
                if (choosedBoard.secretary !== null) {
                    notification.error({
                        message: 'Đề tài đã có thư ký',
                        duration: 2
                    })
                } else {
                    const res = await callSetAccBoardSecretary(choosedBoard.id, choosedLecturer.lecturer_id)
                    if (res.data.payload) {
                        notification.success({
                            message: 'Phân công thư ký cho hội đồng thành công',
                            duration: 2
                        })
                    }
                }
            }
            if (valueRole === 3) {

                const res = await callCreateCommissioner(choosedLecturer.lecturer_id, choosedBoard.id)
                if (res) {
                    notification.success({
                        message: 'Phân công ủy viên cho hội đồng thành công',
                        duration: 2
                    })
                }


            }
        }
    };

    const openDrawerTopic = (coucil) => {
        setOpenTopic(true)
        setChoosedCoucil(coucil)
    }

    const onCloseTopic = () => {
        setOpenTopic(false)
    }

    const setTopicEx = async () => {
        let arrayKey = []
        selectedTopic.map(item => {
            arrayKey.push(item.topic_id)
        })
        console.log(choosedCoucil)

        console.log('cec', arrayKey)
        const res = await callUpdateTopicExplanationBulk(arrayKey, choosedCoucil?.id)
        // console.log(res.data.payload)
        if (res.data.payload) {
            setOpenTopic(false)
            const status = await callUpdateTopicStatusBulk(arrayKey)
            notification.success({
                message: 'Phân công thành công',
                duration: 2
            })
        }

    }


    return (
        <>
            <h2 style={{ marginLeft: 35 }}>Các hội đồng thuyết minh</h2>
            <Button style={{ marginLeft: 35, marginBottom: 20 }} type='primary' onClick={showModal}>Tạo hội đồng mới</Button>

            <Row>
                {/* <Col span={4}></Col> */}
                {/* <Col span={16} > */}
                {coucil.map((coucil, index) => {
                    return (
                        <Col span={11} style={{ border: '0px solid black', marginBottom: 30, marginLeft: 35, padding: 10, borderRadius: '0% 0% 0% 0% / 0% 0% 0% 0%', boxShadow: '5px 5px  5px 6px  rgba(0,0,0,.15)', }}>
                            <Row>
                                <Col span={18}>
                                    <div style={{ fontSize: 15, marginBottom: 10 }}>{coucil.name} ({coucil.phase})</div>
                                </Col>
                                <Col span={6}>
                                    <Button type="dashed" onClick={() => openDrawer(coucil)} >Thêm thành viên</Button>
                                    <Button style={{ marginTop: 10 }} type="dashed" onClick={() => openDrawerTopic(coucil)} >Phân công đề tài</Button>

                                </Col>
                            </Row>
                            <Row>
                                <div style={{ fontSize: 15, marginBottom: 10 }}>Các thành viên của hội đồng:</div>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12} style={{ marginBottom: 17 }}>
                                    <Card title={coucil?.presidentInfo?.lecturer_name ? coucil?.presidentInfo?.lecturer_name : 'chưa có'} bordered={false}>
                                        Chủ tịch hội đồng
                                    </Card>
                                </Col>
                                <Col span={12} style={{ marginBottom: 17 }}>
                                    <Card title={coucil?.secretaryInfo?.lecturer_name ? coucil?.secretaryInfo?.lecturer_name : 'chưa có'} bordered={false}>
                                        Thư ký
                                    </Card>
                                </Col>
                                {coucil.commissioners.map((commissioner, index) => {
                                    return (
                                        <Col span={12} style={{ marginBottom: 17 }}>
                                            <Card title={commissioner?.lecturerInfo?.lecturer_name ? commissioner?.lecturerInfo?.lecturer_name : 'chưa có'} bordered={false}>
                                                Ủy viên
                                            </Card>
                                        </Col>
                                    )
                                })}


                            </Row>


                        </Col>
                    )
                })}
                {/* </Col> */}
            </Row>

            <Drawer title="Danh sách giảng viên" placement="right" onClose={onClose} open={open} width={1000}>
                {/* <Row> */}
                <Radio.Group
                    onChange={chooseWorkPlace}
                    value={value}
                    style={{
                        marginBottom: 8,
                    }}
                    defaultValue={'CNPM'}
                >
                    <Radio.Button style={{ marginBottom: 10 }} value="CNPM">Khoa công nghệ phần mềm</Radio.Button>

                    <Radio.Button value="CNTT">Khoa công nghệ thông tin</Radio.Button>
                    <Radio.Button value="HTTT">Khoa hệ thống thông tin</Radio.Button>
                    <Radio.Button value="KHMT">Khoa khoa học máy tính</Radio.Button>
                    <Radio.Button value="MMTVTT">Khoa mạng máy tính và truyền thông</Radio.Button>
                    <Radio.Button value="TTDPT">Khoa truyền thông đa phương tiện</Radio.Button>

                </Radio.Group>

                {/* </Row> */}
                <Table
                    style={{ marginTop: 20 }}
                    bordered={true}
                    pagination={false}
                    columns={columns}
                    dataSource={dataLecturer}
                // onChange={onChange} 
                />
            </Drawer>
            <Modal
                title="Tạo hội đồng mới"
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
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 16,
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
                        label="Tên hội đồng"
                        name="coucil"
                        rules={[
                            {
                                required: true,
                                message: 'Please input coucil name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Đợt"
                        name="phase"
                        rules={[
                            {
                                required: true,
                                message: 'Please input phase!',
                            },
                        ]}
                    >
                        <Select
                            style={{
                                width: 120,
                            }}
                            onChange={handleChange}
                            options={[
                                {
                                    value: 'Đợt 1',
                                    label: 'Đợt 1',
                                },
                                {
                                    value: 'Đợt 2',
                                    label: 'Đợt 2',
                                },

                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Năm"
                        name="year"
                        rules={[
                            {
                                required: true,
                                message: 'Please input year!',
                            },
                        ]}
                    >
                        <Select
                            style={{
                                width: 120,
                            }}
                            onChange={handleChange}
                            options={[
                                {
                                    value: 'năm 2023',
                                    label: '2023',
                                },
                                {
                                    value: 'năm 2024',
                                    label: '2024',
                                },

                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 16,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Tạo hội đồng
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Drawer title="Danh sách đề tài đủ điều kiện báo cáo thuyết minh" placement="right" onClose={onCloseTopic} open={openTopic} width={1000} bordered={true}>
                <Button type="primary" onClick={setTopicEx}>Phân công</Button>
                <Table
                    dataSource={topic}
                    columns={columnTopic}
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                />;

            </Drawer>
        </>
    )
}

export default ManageExplanation