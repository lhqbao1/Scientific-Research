import { Button, DatePicker, Descriptions, Form, Input, InputNumber, Modal, notification, Select, Space } from "antd"
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { useEffect } from "react"
import { callCreateNotification, callCreateNotificationAddFile, callGetNotification, callGetNotificationAddFile, callGetNotificationAddFileExplanation, callGetNotificationAddFilePhase2, callGetNotificationPhase2, callGetNotificationStartReport, callUpdateNotification, callUpdateNotificationAddFile, callUpdateNotificationAddFileExplanation } from "../../../services/api";
import ModalCreateNotificationAddExplanation from "./ModalManageSchedule/ModalCreateNotificationAddExplanation";
import ModalCreateNotificationStartReport from "./ModalManageSchedule/ModalCreateNotificationStartReport";
const { RangePicker } = DatePicker;

const ManageSchedule = () => {
    const [openModalCreateTopic, setOpenModalCreateTopic] = useState(false)
    const [openModalUpdateTopic, setOpenModalUpdateTopic] = useState(false)

    const [openModalCreateFile, setOpenModalCreateFile] = useState(false)
    const [openModalUpdateFile, setOpenModalUpdateFile] = useState(false)

    const [openModalCreateNotificationAddExplanation, setOpenModalCreateNotificationAddExplanation] = useState(false)
    const [openModalEditNotificationAddExplanation, setOpenModalEditNotificationAddExplanation] = useState(false)

    const [openModalCreateNotificationStartReport, setOpenModalCreateNotificationStartReport] = useState(false)

    const [dataNoti, setDataNoti] = useState([])
    const [dataNotiAdd, setDataNotiAdd] = useState([])
    const [dataNotiAddExplanation, setDataNotiAddExplanation] = useState([])
    const [dataNotiStartReport, setDataNotiStartReport] = useState([])

    const [form] = Form.useForm();

    const [formUpdate] = Form.useForm();

    const [formFile] = Form.useForm();
    const [formUpdateFile] = Form.useForm();
    const [formUpdateAddFileExplanation] = Form.useForm();


    const [choosedNotiCreate, setChoosedNotiCreate] = useState([])
    const [choosedNotiAddFileExplanation, setChoosedNotiAddFileExplanation] = useState()
    const [change, setChange] = useState(false)


    useEffect(() => {
        const getNotification = async () => {
            const res = await callGetNotification()
            let data = []
            if (res.data.payload.items.length > 0) {
                data.push(res.data.payload.items)
            }
            if (data[0]?.length > 0) {
                data[0].map(item => {
                    item.start_date = (new Date(+item.start_date)).toLocaleDateString()
                    item.end_date = (new Date(+item.end_date)).toLocaleDateString()

                })
                setDataNoti(data[0])
            }


        }
        const getNotificationAddFile = async () => {
            const res = await callGetNotificationAddFile()
            let data = []
            if (res.data.payload.items.length > 0) {
                data.push(res.data.payload.items)
            }
            if (data[0]?.length > 0) {
                data[0].map(item => {
                    item.start_date = (new Date(+item.start_date)).toLocaleDateString()
                    item.end_date = (new Date(+item.end_date)).toLocaleDateString()
                })
                setDataNotiAdd(data[0])
            }
        }

        const getNotiAddFileExplanation = async () => {
            const res = await callGetNotificationAddFileExplanation()
            let data = []
            if (res.data.payload.items.length > 0) {
                data.push(res.data.payload.items)
            }
            if (data[0]?.length > 0) {
                data[0].map(item => {
                    item.start_date = (new Date(+item.start_date)).toLocaleDateString()
                    item.end_date = (new Date(+item.end_date)).toLocaleDateString()
                })
                setDataNotiAddExplanation(data[0])
            }
        }

        const getNotiStartReport = async () => {
            const res = await callGetNotificationStartReport()
            let data = []
            if (res.data.payload.items.length > 0) {
                data.push(res.data.payload.items)
            }
            if (data[0]?.length > 0) {
                data[0].map(item => {
                    item.start_date = (new Date(+item.start_date)).toLocaleDateString()
                    item.end_date = (new Date(+item.end_date)).toLocaleDateString()
                })
                setDataNotiStartReport(data[0])
            }
        }

        getNotiStartReport()
        getNotification()
        getNotificationAddFile()
        getNotiAddFileExplanation()
    }, [change])

    const hanleOpenModalCreateTopic = () => {
        setOpenModalCreateTopic(true)
    }

    const handleCancel = () => {
        setOpenModalCreateTopic(false);
    };

    const handleCancelUpdate = () => {
        setOpenModalUpdateTopic(false);
    };


    const onFinish = async (values) => {
        const getExist = await callGetNotification()
        let existNoti = getExist?.data?.payload?.items
        let start = values.rangeTime[0].$d.getTime()
        let end = values.rangeTime[1].$d.getTime()

        let create = true
        if (existNoti.length === 0) {
            create = true
        }

        for (let i = 0; i < existNoti.length; i++) {
            if (existNoti[i].type === values.phase) {
                create = false;
                break;
            }
        }


        if (create === true) {
            if (start, end) {
                const res = await callCreateNotification(values.name, values.content, start, end, values.students, values.phase)
                if (res.data.payload) {
                    notification.success({
                        message: 'Tạo thông báo thành công',
                        duration: 2
                    })
                    setChange(!change)
                    form.resetFields()
                    setOpenModalCreateTopic(false)
                }
            } else {
                notification.error({
                    message: 'Chưa chọn thời hạn đăng kí đề tài',
                    duration: 2
                })
            }
        } else {
            notification.error({
                message: `Thông báo ${values.phase} đã được tạo, hãy dùng chức năng chỉnh sửa!`,
                duration: 2
            })
        }


    };


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    const onFinishFailedUpdate = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const hanleOpenModalUpdateTopic = (data) => {
        setChoosedNotiCreate(data)
        setOpenModalUpdateTopic(true)
    }

    const onFinishUpdate = async (values) => {
        let start = values.rangeTime[0].$d.getTime()
        let end = values.rangeTime[1].$d.getTime()

        if (start && end) {
            const res = await callUpdateNotification(choosedNotiCreate.id, values.name, values.content, start, end, values.students)
            console.log(res.data.payload)
            if (res.data.payload) {
                setChange(!change)
                notification.success({
                    message: 'Sửa thông tin đề tài thành công',
                    duration: 2
                })
                formUpdate.resetFields()
                setOpenModalUpdateTopic(false)
            }
        } else {
            notification.error({
                message: 'Hãy nhập thời hạn!',
                duration: 2
            })
        }

    }




    const hanleOpenModalCreatelFile = () => {
        setOpenModalCreateFile(true)
    }

    const hanleOpenModaUpdatelFile = (data) => {
        setChoosedNotiCreate(data)
        setOpenModalUpdateFile(true)
    }
    const handleCancelCreateFile = () => {
        setOpenModalCreateFile(false)
        formFile.resetFields()
    }



    const onFinishCreateFile = async (values) => {
        // console.log('check file', values)
        let notiType = ''
        if (values.phase === 'đợt 1') {
            notiType = 'nghiệm thu và báo cáo đợt 1'
        }
        if (values.phase === 'đợt 2') {
            notiType = 'nghiệm thu và báo cáo đợt 2'
        }

        let start = values.rangeTime[0].$d.getTime()
        let end = values.rangeTime[1].$d.getTime()

        const existNoti = await callGetNotificationAddFile()
        let checkExist = existNoti.data.payload.items
        let create = false

        if (checkExist.length === 0) {
            create = true
        }

        for (let i = 0; i < checkExist.length; i++) {
            if (checkExist[i].type === notiType) {
                create = false;
                break;
            }
        }

        if (create === true) {
            if (start, end) {
                const res = await callCreateNotificationAddFile(values.name, values.content, start, end, notiType)
                if (res) {
                    notification.success({
                        message: 'Tạo thông báo thành công',
                        duration: 2
                    })
                    setChange(!change)
                    setOpenModalCreateFile(false)
                    formFile.resetFields()
                }
            } else {
                notification.error({
                    message: 'Chưa chọn thời hạn nộp file',
                    duration: 2
                })
            }
        } else {
            notification.error({
                message: `Thông báo ${notiType} đã được tạo, hãy dùng chức năng chỉnh sửa!`,
                duration: 2
            })
        }

    }

    const onFinishFailedCreateFile = (err) => {
        console.log(err)
    }





    const handleCancelUpdateFile = () => {
        setOpenModalUpdateFile(false)
        formUpdateFile.resetFields()
    }

    const handleCancelUpdateAddFileExplanation = () => {
        setOpenModalEditNotificationAddExplanation(false)
        formUpdateAddFileExplanation.resetFields()
    }



    const onFinishUpdateFile = async (values) => {
        let start = values.rangeTime[0].$d.getTime()
        let end = values.rangeTime[1].$d.getTime()
        if (start && end) {
            const res = await callUpdateNotificationAddFile(choosedNotiCreate.id, values.name, values.content, start, end)
            if (res) {
                notification.success({
                    message: 'Sửa thông báo thành công',
                    duration: 2
                })
                setChange(!change)
                formUpdateFile.resetFields()
                setOpenModalUpdateFile(false)
            }
        } else {
            notification.error({
                message: 'Hãy nhập thời hạn',
                duration: 2
            })
        }
    }

    const onFinishFailedUpdateFile = (err) => {
        console.log(err)
    }

    const openModalEditAddFileExplanation = (data) => {
        setChoosedNotiAddFileExplanation(data)
        setOpenModalEditNotificationAddExplanation(true)
    }


    const rangeConfig = {
        rules: [
            {
                type: 'array',
                required: true,
                message: 'Please select time!',
            },
        ],
    };

    const onFinishUpdateAddFileExplanation = async (values) => {
        let start = values.rangeTime[0].$d.getTime()
        let end = values.rangeTime[1].$d.getTime()
        if (start && end) {
            const res = await callUpdateNotificationAddFileExplanation(choosedNotiAddFileExplanation.id, values.name, values.content, start, end)
            if (res) {
                notification.success({
                    message: 'Sửa thông báo thành công',
                    duration: 2
                })
                setChange(!change)
                formUpdateAddFileExplanation.resetFields()
                setOpenModalEditNotificationAddExplanation(false)
            }
        } else {
            notification.error({
                message: 'Hãy nhập thời hạn',
                duration: 2
            })
        }
    }





    return (
        <div>
            <div>

                <div style={{ display: 'flex' }}>
                    <h3 style={{ marginTop: 5 }}>Thông báo đăng kí đề tài</h3>
                    <Button style={{ marginLeft: 10 }} type="primary" onClick={hanleOpenModalCreateTopic}>Tạo thông báo</Button>
                </div>

                {dataNoti.map((item, index) => {
                    return (
                        <>
                            <Descriptions bordered={true} column={1} style={{ marginTop: 20 }}>
                                <Descriptions.Item style={{ width: 300 }} span={1} label="Tiêu đề">{item?.name} {item?.type}</Descriptions.Item>
                                <Descriptions.Item style={{ width: 300 }} span={1} label="Thông báo">{item?.content}</Descriptions.Item>
                                <Descriptions.Item span={1} label="Số lượng sinh viên tối đa">{item?.students} sinh viên</Descriptions.Item>
                                <Descriptions.Item span={1} label="Thời hạn"> Từ {item?.start_date} đến {item?.end_date}</Descriptions.Item>
                                <Descriptions.Item span={1} label="Chỉnh sửa">
                                    <Button type="primary" onClick={() => hanleOpenModalUpdateTopic(item)}>Chỉnh sửa </Button>
                                </Descriptions.Item>
                            </Descriptions>

                        </>
                    )
                })}

                <div style={{ display: 'flex', marginTop: 30, marginBottom: 20 }}>
                    <h3 style={{ marginTop: 5 }}>Thông báo nộp hồ sơ thuyết minh</h3>
                    <Button style={{ marginLeft: 10 }} type="primary" onClick={() => setOpenModalCreateNotificationAddExplanation(true)}>Tạo thông báo</Button>
                </div>

                {dataNotiAddExplanation.map((item, index) => {
                    return (
                        <>
                            <Descriptions bordered={true} column={1} style={{ marginTop: 20 }}>
                                <Descriptions.Item style={{ width: 300 }} span={1} label="Tiêu đề">{item?.name} {item?.type}</Descriptions.Item>
                                <Descriptions.Item style={{ width: 300 }} span={1} label="Thông báo">{item?.content}</Descriptions.Item>
                                <Descriptions.Item span={1} label="Thời hạn"> Từ {item?.start_date} đến {item?.end_date}</Descriptions.Item>
                                <Descriptions.Item span={1} label="Chỉnh sửa">
                                    <Button type="primary" onClick={() => openModalEditAddFileExplanation(item)}>Chỉnh sửa </Button>
                                </Descriptions.Item>
                            </Descriptions>

                        </>
                    )
                })}


                <div style={{ display: 'flex', marginTop: 30, marginBottom: 20 }}>
                    <h3 style={{ marginTop: 5 }}>Thông báo bắt đầu nghiệm thu</h3>
                    <Button style={{ marginLeft: 10 }} type="primary" onClick={() => setOpenModalCreateNotificationStartReport(true)}>Tạo thông báo</Button>
                </div>

                {dataNotiStartReport.map((item, index) => {
                    return (
                        <>
                            <Descriptions bordered={true} column={1} style={{ marginTop: 20 }}>
                                <Descriptions.Item style={{ width: 300 }} span={1} label="Tiêu đề">{item?.name} {item?.type}</Descriptions.Item>
                                <Descriptions.Item style={{ width: 300 }} span={1} label="Thông báo">{item?.content}</Descriptions.Item>
                                <Descriptions.Item span={1} label="Thời hạn"> Từ {item?.start_date} đến {item?.end_date}</Descriptions.Item>
                                <Descriptions.Item span={1} label="Chỉnh sửa">
                                    <Button type="primary" onClick={() => openModalEditAddFileExplanation(item)}>Chỉnh sửa </Button>
                                </Descriptions.Item>
                            </Descriptions>

                        </>
                    )
                })}

                <div style={{ display: 'flex', marginTop: 30, marginBottom: 20 }}>
                    <h3 style={{ marginTop: 5 }}>Thông báo nộp đơn xin nghiệm thu</h3>
                    <Button style={{ marginLeft: 10 }} type="primary" onClick={hanleOpenModalCreatelFile}>Tạo thông báo</Button>
                </div>

                {dataNotiAdd.length > 0 ?
                    dataNotiAdd.map((item, index) => {
                        return (
                            <>
                                <Descriptions bordered={true} column={1} style={{ marginBottom: 20 }}>
                                    <Descriptions.Item style={{ width: 300 }} span={1} label="Tiêu đề">{item?.name}</Descriptions.Item>
                                    <Descriptions.Item span={1} label="Thông báo">{item?.content}</Descriptions.Item>
                                    <Descriptions.Item span={1} label="Thời hạn"> Từ {item?.start_date} đến {item?.end_date}</Descriptions.Item>
                                    <Descriptions.Item span={1} label="Chỉnh sửa">
                                        <Button type="primary" onClick={() => hanleOpenModaUpdatelFile(item)}>Chỉnh sửa </Button>
                                    </Descriptions.Item>
                                </Descriptions>

                            </>
                        )
                    })
                    :
                    <Descriptions.Item >Chưa có thông báo nộp đơn xin nghiệm thu</Descriptions.Item>
                }


                <Modal title="Tạo thông báo đăng kí đề tài"
                    open={openModalCreateTopic}
                    onCancel={handleCancel}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    okButtonProps={{ style: { display: 'none' } }}
                >
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{
                            span: 24,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        fields={[
                            {
                                name: ["name"],
                                value: 'Thông báo đăng kí đề tài',
                            },
                        ]}
                    >
                        <Form.Item
                            label="Tiêu đề"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tiêu đề!',
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
                                    message: 'Hãy nhập đợt thông báo!',
                                },
                            ]}
                        >
                            <Select
                                // defaultValue="lucy"
                                style={{
                                    width: 120,
                                }}
                                options={[
                                    {
                                        value: 'đợt 1',
                                        label: 'Đợt 1',
                                    },
                                    {
                                        value: 'đợt 2',
                                        label: 'Đợt 2',
                                    },
                                ]}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Nội dung"
                            name="content"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập nội dung!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Số lượng sinh viên tối đa"
                            name="students"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập số lượng sinh viên tối đa!',
                                },
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            label="Chọn thời hạn"
                            name="rangeTime"
                            {...rangeConfig}
                        >
                            <RangePicker
                                showTime={{
                                    format: 'HH:mm',
                                }}
                                format="YYYY-MM-DD HH:mm"
                            />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 0,
                                span: 24,
                            }}
                        >
                            <Button style={{ marginTop: 20 }} type="primary" htmlType="submit">
                                Tạo thông báo
                            </Button>
                        </Form.Item>
                    </Form>

                </Modal>

                <Modal title="Sửa thông báo đăng kí đề tài"
                    open={openModalUpdateTopic}
                    onCancel={handleCancelUpdate}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    okButtonProps={{ style: { display: 'none' } }}
                >
                    <Form
                        form={formUpdate}
                        name="basic"
                        labelCol={{
                            span: 24,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinishUpdate}
                        onFinishFailed={onFinishFailedUpdate}
                        autoComplete="off"
                        fields={[
                            {
                                name: ["name"],
                                value: choosedNotiCreate?.name,
                            },
                            {
                                name: ["content"],
                                value: choosedNotiCreate?.content,
                            },
                            {
                                name: ["students"],
                                value: choosedNotiCreate?.students,
                            },
                        ]}

                    >
                        <Form.Item
                            label="Tiêu đề"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tiêu đề!',
                                },
                            ]}
                        >
                            <Input placeholder={choosedNotiCreate?.name} />
                        </Form.Item>

                        <Form.Item
                            label="Nội dung"
                            name="content"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập nội dung!',
                                },
                            ]}
                        >
                            <Input placeholder={choosedNotiCreate?.content} />
                        </Form.Item>
                        <Form.Item
                            label="Số lượng sinh viên tối đa"
                            name="students"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập số lượng sinh viên tối thiểu!',
                                },
                            ]}
                        >
                            <InputNumber placeholder={choosedNotiCreate?.students} />
                        </Form.Item>
                        <Form.Item
                            label="Chọn thời hạn"
                            name="rangeTime"
                            {...rangeConfig}
                        >
                            <RangePicker
                                showTime={{
                                    format: 'HH:mm',
                                }}
                                format="YYYY-MM-DD HH:mm"
                            />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 0,
                                span: 24,
                            }}
                        >
                            <Button style={{ marginTop: 20 }} type="primary" htmlType="submit">
                                Sửa thông tin
                            </Button>
                        </Form.Item>
                    </Form>


                </Modal>

                <Modal title="Tạo thông báo nộp đơn xin nghiệm thu"
                    open={openModalCreateFile}
                    onCancel={handleCancelCreateFile}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    okButtonProps={{ style: { display: 'none' } }}
                >
                    <Form
                        form={formFile}
                        name="basic"
                        labelCol={{
                            span: 24,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinishCreateFile}
                        onFinishFailed={onFinishFailedCreateFile}
                        autoComplete="off"
                        fields={[
                            {
                                name: ["name"],
                                value: 'Thông báo nộp đơn xin nghiệm thu',
                            },
                        ]}
                    >
                        <Form.Item
                            label="Tiêu đề"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tiêu đề!',
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
                                    message: 'Hãy nhập đợt thông báo!',
                                },
                            ]}
                        >
                            <Select
                                style={{
                                    width: 120,
                                }}
                                options={[
                                    {
                                        value: 'đợt 1',
                                        label: 'Đợt 1',
                                    },
                                    {
                                        value: 'đợt 2',
                                        label: 'Đợt 2',
                                    },
                                ]}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Nội dung"
                            name="content"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập nội dung!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Chọn thời hạn"
                            name="rangeTime"
                            {...rangeConfig}
                        >
                            <RangePicker
                                showTime={{
                                    format: 'HH:mm',
                                }}
                                format="YYYY-MM-DD HH:mm"
                            />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 0,
                                span: 24,
                            }}
                        >
                            <Button style={{ marginTop: 20 }} type="primary" htmlType="submit">
                                Tạo thông báo
                            </Button>
                        </Form.Item>
                    </Form>

                </Modal>

                <Modal title="Sửa thông báo nộp đơn xin nghiệm thu"
                    open={openModalUpdateFile}
                    onCancel={handleCancelUpdateFile}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    okButtonProps={{ style: { display: 'none' } }}
                >
                    <Form
                        form={formUpdateFile}
                        name="basic"
                        labelCol={{
                            span: 24,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinishUpdateFile}
                        onFinishFailed={onFinishFailedUpdateFile}
                        autoComplete="off"
                        fields={[
                            {
                                name: ["name"],
                                value: choosedNotiCreate?.name,
                            },
                            {
                                name: ["content"],
                                value: choosedNotiCreate?.content,
                            },
                        ]}
                    >
                        <Form.Item
                            label="Tiêu đề"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tiêu đề!',
                                },
                            ]}
                        >
                            <Input placeholder={choosedNotiCreate?.name} />
                        </Form.Item>

                        <Form.Item
                            label="Nội dung"
                            name="content"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập nội dung!',
                                },
                            ]}
                        >
                            <Input placeholder={choosedNotiCreate?.content} />
                        </Form.Item>
                        <Form.Item
                            label="Chọn thời hạn"
                            name="rangeTime"
                            {...rangeConfig}
                        >
                            <RangePicker
                                showTime={{
                                    format: 'HH:mm',
                                }}
                                format="YYYY-MM-DD HH:mm"
                            />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 0,
                                span: 24,
                            }}
                        >
                            <Button style={{ marginTop: 20 }} type="primary" htmlType="submit">
                                Sửa thông tin
                            </Button>
                        </Form.Item>
                    </Form>


                </Modal>

                <Modal title="Sửa thông báo nộp hồ sơ thuyết minh"
                    open={openModalEditNotificationAddExplanation}
                    onCancel={handleCancelUpdateAddFileExplanation}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    okButtonProps={{ style: { display: 'none' } }}
                >
                    <Form
                        form={formUpdateAddFileExplanation}
                        name="basic"
                        labelCol={{
                            span: 24,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinishUpdateAddFileExplanation}
                        onFinishFailed={onFinishFailedUpdate}
                        autoComplete="off"
                        fields={[
                            {
                                name: ["name"],
                                value: choosedNotiAddFileExplanation?.name,
                            },
                            {
                                name: ["content"],
                                value: choosedNotiAddFileExplanation?.content,
                            },
                        ]}

                    >
                        <Form.Item
                            label="Tiêu đề"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tiêu đề!',
                                },
                            ]}
                        >
                            <Input placeholder={choosedNotiCreate?.name} />
                        </Form.Item>

                        <Form.Item
                            label="Nội dung"
                            name="content"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập nội dung!',
                                },
                            ]}
                        >
                            <Input placeholder={choosedNotiCreate?.content} />
                        </Form.Item>
                        <Form.Item
                            label="Chọn thời hạn"
                            name="rangeTime"
                            {...rangeConfig}
                        >
                            <RangePicker
                                showTime={{
                                    format: 'HH:mm',
                                }}
                                format="YYYY-MM-DD HH:mm"
                            />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 0,
                                span: 24,
                            }}
                        >
                            <Button style={{ marginTop: 20 }} type="primary" htmlType="submit">
                                Sửa thông tin
                            </Button>
                        </Form.Item>
                    </Form>


                </Modal>

                <ModalCreateNotificationAddExplanation
                    openModalCreateNotificationAddExplanation={openModalCreateNotificationAddExplanation}
                    setOpenModalCreateNotificationAddExplanation={setOpenModalCreateNotificationAddExplanation}
                />

                <ModalCreateNotificationStartReport
                    openModalCreateNotificationStartReport={openModalCreateNotificationStartReport}
                    setOpenModalCreateNotificationStartReport={setOpenModalCreateNotificationStartReport}
                />


            </div>


        </div >

    )
}

export default ManageSchedule