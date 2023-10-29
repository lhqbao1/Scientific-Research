import { Badge, Button, DatePicker, Divider, Form, Input, InputNumber, Modal, notification, Radio, Select, Space, Table, Upload } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { callApproveAccTopic, callApproveTopic, callApproveTopicCtu, callCreateCoucil, callCreateNotificationDate, callGetAllTopics, callGetCoucil, callGetExplanationByid, callGetExplanationCoucilById, callGetTopicAccById, callGetTopicById, callGetTopicEditExFile, callGetTopicWithStatus, callGetTranscriptByTopicId, callSendEmailNotification, callSetDateTopic, callSetTopicAccBoard, callSetTopicBoard, callSetTopicCost, callUpdateBoard, callUpdateTopic, callUpdateTopicCostBulk, callUpdateTopicStatus, callUpdateTopicStatusBulk, callUpdateTopicStatusBulkTrue, callUpdateTopicStatusStartBulk } from "../../../services/api";
import TopicDetail from "../../components/Topic/TopicDetail";
const { RangePicker } = DatePicker;
import * as XLSX from 'xlsx'
import { useSelector } from "react-redux";
import Dragger from "antd/es/upload/Dragger";
import { CaretLeftOutlined, CaretRightOutlined, InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Page } from "react-pdf";
import { useForm } from "antd/es/form/Form";
import ModalApproveTopicReport from "../../components/ModalCtu/ModalApproveTopicReport";
import ModalApproveTopic from "../../components/ModalCit/ModalApproveTopic";



const ManageTopic = () => {
    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(10)
    const [pageSize, setPageSize] = useState(5)
    const [openDetail, setOpenDetail] = useState(false)
    const [topicDetail, setTopicDetail] = useState([])
    const [topicData, setTopicData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalApproveOpen, setIsModalApproveOpen] = useState(false)
    const [isModalOpenAcc, setIsOpenModalAcc] = useState(false)
    const [isOpenModalNotification, setIsOpenModalNotification] = useState(false)
    const [listBoard, setListBoard] = useState([])
    const [selectedTopic, setSelectedTopic] = useState()
    const [selectTopics, setSelectTopics] = useState([])
    const [transcriptInfo, setTranscriptInfo] = useState([])
    const [topicScore, setTopicScore] = useState()
    const [choosedTopic, setChoosedTopic] = useState()
    const [accBoardData, setAccBoardData] = useState()
    const [date, setDate] = useState()
    const [choosedBoard, setChoosedBoard] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [dataCsv, setDataCsv] = useState([])
    const [openApproveCtu, setOpenApproveCtu] = useState(false)
    const [form] = Form.useForm()
    const [formApprove] = Form.useForm()
    const [valueInput, setValueInput] = useState([])
    const [isChoosed, setIsChoosed] = useState(false)
    const [pdfFile, setPdfFile] = useState()
    const [csvFile, setCsvFile] = useState()
    const [defaultFileListCsv, setDeFaultFileListCsv] = useState([])
    const [defaultFileListPdf, setDeFaultFileListPdf] = useState([])
    const [editExFile, setEditExFile] = useState([])
    const [value, setValue] = useState(1)
    const [formApproveEx] = Form.useForm();
    const [openModalApproveTopicReport, setOpenModalApproveTopicReport] = useState(false)
    const [explanationBoard, setExplanationBoard] = useState()



    let reload = false



    const subRole = useSelector(state => state.accountAdmin.user.subRole)


    useEffect(() => {
        if (subRole === 'admin') {
            getAllTopics()
        }
        if (subRole === 'admin-ctu') {
            getTopicCtu()
        }
        getListBoard()
    }, [reload])

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const fileType = ['text/csv']
    const chooseFile = (e) => {
        let file = e.file.originFileObj
        if (file && fileType.includes(file.type)) {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                console.log('check file', e.target.result)
                setCsvFile(e.target.result)
            }
            setDeFaultFileListCsv(e.fileList)
        } else {
            setDeFaultFileListCsv([])
            notification.error({
                message: 'File phải ở định dạng csv',
                duration: 2
            })
            setCsvFile(null)
        }

    }

    const fileTypePdf = ['application/pdf']
    const chooseFilePdf = (e) => {
        let file = e.file.originFileObj
        if (file && fileTypePdf.includes(file.type)) {
            setDeFaultFileListPdf(e.fileList)
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                // console.log('check file', e.target.result)
                setPdfFile(e.target.result)
            }
        } else {
            setDeFaultFileListPdf([])
            notification.error({
                message: 'File phải ở định dạng pdf',
                duration: 2
            })
            setPdfFile(null)
        }
    }

    const handleSendNotification = async () => {
        let studentEmail = []
        let idArr = []
        const res = await callGetTopicWithStatus(7)

        let topic = res.data.payload.items

        topic.map(topic => {
            idArr.push(topic?.topic_id)
            topic?.student.map(student => {
                if (student.role === 'chủ nhiệm đề tài') {
                    studentEmail.push(student.email)
                }
            })
        })

        if (studentEmail.length > 0 && pdfFile && csvFile) {
            const resEmail = await callSendEmailNotification(studentEmail, csvFile, pdfFile)
            if (resEmail) {
                const updateTopic = await callUpdateTopicStatusStartBulk(idArr)
                notification.success({
                    message: 'Gửi file đến các chủ nhiệm đề tài thành công',
                    duration: 2
                })
                setIsOpenModalNotification(false)
                setDeFaultFileListCsv([])
                setDeFaultFileListPdf([])
            }
        } else {
            notification.error({
                message: 'Bạn chưa chọn file',
                duration: 2
            })
        }

        console.log(studentEmail)
    }

    const handleCancelNotification = () => {
        setIsOpenModalNotification(false)
    }




    const getListBoard = async () => {
        const res = await callGetCoucil()
        if (res.data.payload) {
            setListBoard(res.data.payload.items)
        }
    }

    const getTopicCtu = async () => {
        const res = await callGetAllTopics()
        let dataTopic = res.data.payload.items
        let i = 0
        dataTopic.map(item => {
            // console.log(dataTopic.length)
            item.key = ++i
        })
        // console.log('check asd', dataTopic)
        // setTopic(dataTopic)
        setTopicData(dataTopic)
        // console.log(res.data.payload)
        if (res.data.payload) {
            let data = res?.data?.payload?.items
            // console.log('check asdacxz', data)
            let studentData = {}

            data.map(item => {
                item?.student?.map(student => {
                    if (student.role === 'chủ nhiệm đề tài') {
                        studentData = student
                    }
                })

                item.topic_manager = studentData?.student_name
                item.lecturer_name = item?.lecturer?.lecturer_name
            })

            setDataCsv(data)
        }
    }




    const getAllTopics = async () => {
        const res = await callGetAllTopics()
        let dataTopic = res.data.payload.items
        let i = 0
        dataTopic.map(item => {
            // console.log(dataTopic.length)
            item.key = ++i
        })
        // console.log('check asd', dataTopic)
        // setTopic(dataTopic)
        setTopicData(dataTopic)
        console.log(res.data.payload)
        if (res.data.payload) {
            let data = res?.data?.payload?.items
            console.log('check asdacxz', data)
            let studentData = {}

            data.map(item => {
                item?.student?.map(student => {
                    if (student.role === 'chủ nhiệm đề tài') {
                        studentData = student
                    }
                })

                item.topic_manager = studentData?.student_name
                item.lecturer_name = item?.lecturer?.lecturer_name
            })

            setDataCsv(data)
        }
    }

    let columns = []

    if (subRole === 'admin') {
        columns = [
            {
                title: 'Tên đề tài',
                dataIndex: 'topic_name',
                span: 2,
                render: (text, record) => <div
                    style={{
                        border: 'none',
                        color: 'black',
                    }}
                >
                    {text}
                </div>,
            },

            {
                title: 'Mã số đề tài',
                dataIndex: 'topic_code',
                render: (text, record) => <div
                    style={{
                        border: 'none',
                        color: 'black',
                    }}
                >
                    {record?.topic_code === null ? 'Đề tài chưa được cấp mã số' : record.topic_code}
                </div>,

            },
            {
                title: 'Chủ nhiệm đề tài',
                dataIndex: 'student',
                render: (text, record) => <div
                    style={{
                        border: 'none',
                        color: 'black',
                        width: 160
                    }}
                >

                    {record?.topic_manager}
                </div>,
            },
            {
                title: 'Giáo viên hướng dẫn',
                dataIndex: 'lecturer_id',
                render: (text, record) => <div
                    style={{
                        border: 'none',
                        color: 'black',
                    }}
                >
                    {record?.lecturer_name ? record?.lecturer_name : 'chưa có giáo viên hướng dẫn'}
                </div>,
            },
            {
                title: 'Thời hạn thực hiện',
                dataIndex: 'duration',
                render: (text, record) => <div
                    style={{
                        border: 'none',
                        color: 'black',
                    }}
                >
                    {record?.duration}
                </div>,
            },
            {
                title: 'Kinh phí',
                dataIndex: 'cost',
                render: (text, record) => <div
                    style={{
                        border: 'none',
                        color: 'black',
                    }}
                >
                    {record?.cost ? record?.cost : 'Đề tài chưa được cấp kinh phí'}
                </div>,
            },
            {
                title: 'Tác vụ',
                dataIndex: 'action',
                width: 200,
                render: (text, record) =>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        {record?.status?.status_id === 17 ?
                            <div>
                                <button
                                    onClick={() => ApproveTopic(record)}
                                    style={{
                                        backgroundColor: "#1677ff",
                                        border: 'none',
                                        color: 'white',
                                        cursor: "pointer",
                                        padding: 10,
                                        borderRadius: 7
                                    }}
                                >
                                    Xét duyệt
                                </button>
                            </div>

                            : ''
                        }
                    </div>

            },

        ];
    }

    if (subRole === 'admin-ctu') {
        columns = [
            {
                title: 'Tên đề tài',
                dataIndex: 'topic_name',
                span: 2,
                render: (text, record) => <div
                    style={{
                        border: 'none',
                        color: 'black',
                    }}
                >
                    <a onClick={() => openDetailTopic(record)}>
                        {text}
                    </a>
                </div>,
            },

            {
                title: 'Mã số đề tài',
                dataIndex: 'topic_code',
                render: (text, record) => <div
                    style={{
                        border: 'none',
                        color: 'black',
                    }}
                >
                    {record?.topic_code === null ? 'Đề tài chưa được cấp mã số' : record.topic_code}
                </div>,

            },
            {
                title: 'Chủ nhiệm đề tài',
                dataIndex: 'student',
                render: (text, record) => <div
                    style={{
                        border: 'none',
                        color: 'black',
                        width: 160
                    }}
                >

                    {record?.topic_manager}
                </div>,
            },
            {
                title: 'Giáo viên hướng dẫn',
                dataIndex: 'lecturer_id',
                render: (text, record) => <div
                    style={{
                        border: 'none',
                        color: 'black',
                    }}
                >
                    {record?.lecturer_name ? record?.lecturer_name : 'chưa có giáo viên hướng dẫn'}
                </div>,
            },
            {
                title: 'Thời hạn thực hiện',
                dataIndex: 'duration',
                render: (text, record) => <div
                    style={{
                        border: 'none',
                        color: 'black',
                    }}
                >
                    {record?.duration}
                </div>,
            },
            {
                title: 'Kinh phí',
                dataIndex: 'cost',
                render: (text, record) => <div
                    style={{
                        border: 'none',
                        color: 'black',
                    }}
                >
                    {record?.cost ? record?.cost : 'Đề tài chưa được cấp kinh phí'}
                </div>,
            },
            {
                title: 'Thao tác',
                dataIndex: 'approve',
                render: (text, record) => <div
                    style={{
                        border: 'none',
                        color: 'black',
                        width: 150
                    }}
                >
                    {record.topic_status !== 6 ? '' :
                        <Button
                            type="primary"
                            onClick={() => getSelectTopis(record)}>Duyệt thuyết minh</Button>
                    }
                    {record.topic_status === 15 ? 'Chưa báo cáo' :
                        ''
                    }
                    {record.topic_status === 10 ?
                        <Button
                            type="primary"
                            onClick={() => openConfirmBoard(record)}>Duyệt nghiệm thu
                        </Button>
                        : ''
                    }


                </div>,
            },
        ];
    }

    const openDetailTopic = (topic) => {
        console.log('jeje', topic)
        setOpenDetail(true)
        setTopicDetail(topic)
    }



    const getSelectTopis = (record) => {
        if (isChoosed === false) {
            selectTopics.push(record)
        }
        // console.log(selectTopics)
        setOpenApproveCtu(true)
    }

    const ApproveTopic = async (record) => {

        const resEditEx = await callGetTopicEditExFile(choosedTopic?.topic_id)
        const board = await callGetExplanationCoucilById(choosedTopic?.explanationboard)
        let boardInfo = board?.data?.payload?.items
        setExplanationBoard(boardInfo)

        if (resEditEx.data.payload.items.length > 0) {
            let fileData = resEditEx.data.payload.items
            fileData.map(item => {
                setEditExFile(item)
            })
        }

        setChoosedBoard(record)
        if (record.explanationboard === null) {
            notification.error({
                message: 'Đề tài chưa có hội đồng thuyết minh',
                duration: 2
            })
            return;
        }

        setIsModalApproveOpen(true)
        setChoosedTopic(record)
        const res = await callGetTranscriptByTopicId(record.topic_id)
        if (res.data.payload.length > 0) {
            setTranscriptInfo(res.data.payload)
            let totalScore = 0
            let data = res.data.payload
            console.log('chcek data', data)
            if (data?.length >= 3) {
                data.map(item => {
                    totalScore += item.score
                })
                setTopicScore(totalScore / data.length)
            }

        }
        if (record.explanationboard !== null) {
            setIsModalApproveOpen(true)
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
    const handleCancelAcc = () => {
        setIsOpenModalAcc(false)
        setSelectTopics([])
    }

    const onFinish = async (values) => {
        console.log('Success:', values);
        const res = await callSetTopicBoard(selectedTopic.topic_id, values.board)
        if (res.data.payload) {
            form.resetFields()
            setIsModalOpen(false)
            notification.success({
                message: 'Phân công hội đồng thành công',
                duration: 2
            })
        }
    };

    const openConfirmBoard = async (record) => {
        if (selectTopics?.length === 0) {
            notification.error({
                message: 'Bạn chưa chọn đề tài',
                duration: 2
            })
        } else {
            setIsOpenModalAcc(true)
        }
    }

    const handleConfirmAcc = async () => {
        let idArr = []
        selectTopics.map(item => {
            idArr.push(item.topic_id)
        })
        const res = await callUpdateTopicStatusBulkTrue(idArr, 11)
        if (res) {
            notification.success({
                message: 'Duyệt yêu cầu nghiệm thu',
                duration: 2
            })
            setIsOpenModalAcc(false)
            reload = !reload
        }
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };





    const chooseDate = (date, dateString) => {
        setDate(dateString)
    };

    const handleExportData = () => {
        let studentData = {}
        var key1 = 'Tên đề tài'
        var key2 = 'Mã số đề tài'
        var key3 = 'Chủ nhiệm đề tài'
        var key4 = 'Giáo viên hướng dẫn'
        var key5 = 'Thời hạn thực hiện'
        var key6 = 'Kinh phí'

        dataCsv.map(item => {
            item[key1] = item.topic_name
            item[key2] = item.topic_code
            item[key3] = item.topic_manager
            item[key4] = item.lecturer_name
            item[key5] = item.duration
            item[key6] = item.cost

            item?.student?.map(student => {
                if (student.role === 'chủ nhiệm đề tài') {
                    studentData = student
                }
            })
            delete item.topic_name
            delete item.topic_code
            delete item.topic_manager
            delete item.lecturer_name
            delete item.duration
            delete item.cost

            delete item.student
            delete item.topic_id,
                delete item.acceptanceboard
            delete item.acceptancedate
            delete item.key
            delete item.basic_description,
                delete item.explanationboard,
                delete item.lecturer_id,
                delete item.phase
            delete item.research_area
            delete item.status
            delete item.topic_status
            delete item.lecturer
            delete item.student
            delete item.lecturer
            delete item.student
            delete item.status
            delete item.accBoard
            delete item.acceptanceplace
            delete item.file

        })


        const worksheet = XLSX.utils.json_to_sheet(dataCsv);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet2");
        XLSX.writeFile(workbook, "Danh sach de tai.csv");
    }

    const chooseStatus = async (e) => {
        setValue(e.target.value);

        if (e?.target?.value === 1) {
            const resAll = await callGetAllTopics()
            let dataTopic = resAll.data.payload.items
            let i = 0
            dataTopic.map(item => {
                item.key = ++i
            })

            setTopicData(dataTopic)
            let data = resAll?.data?.payload?.items
            let studentData = {}

            data.map(item => {
                item?.student?.map(student => {
                    if (student.role === 'chủ nhiệm đề tài') {
                        studentData = student
                    }
                })

                item.topic_manager = studentData?.student_name
                item.lecturer_name = item?.lecturer?.lecturer_name
            })
            setDataCsv(data)
            return;
        }
        const res = await callGetTopicWithStatus(e?.target?.value)
        let dataTopic = res.data.payload.items
        let i = 0
        dataTopic.map(item => {
            item.key = ++i
        })

        setTopicData(dataTopic)
        let data = res?.data?.payload?.items
        let studentData = {}

        data.map(item => {
            item?.student?.map(student => {
                if (student.role === 'chủ nhiệm đề tài') {
                    studentData = student
                }
            })

            item.topic_manager = studentData?.student_name
            item.lecturer_name = item?.lecturer?.lecturer_name
        })
        setDataCsv(data)
    }

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log('selectedRows: ', selectedRows);
            setIsChoosed(true)
            setSelectTopics(selectedRows)

        },
        getCheckboxProps: (record) => ({
            disabled: record.topic_name === 'Disabled User',
            name: record.topic_name,
        }),
    };

    const handleApproveTopicCtu = async (topic) => {
        // console.log(valueInput)
        valueInput[1] = `${valueInput[1]}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

        console.log('topic', topic)
        const res = await callApproveTopicCtu(topic.topic_id, valueInput[0], valueInput[1], 7)
        if (res.data.payload) {
            notification.success({
                message: 'Duyệt đề tài thành công',
                duration: 2
            })
            setIsChoosed(false)
            setOpenApproveCtu(false)
            setSelectTopics([])
            reload = !reload
            formApproveEx.resetFields()
        }
    }
    let input = []
    const getValue = (changedFields, allFields) => {
        allFields.map(item => {
            input.push(item.value)
        })
        setValueInput(input)
    }

    const handleCancelApproveCtu = () => {
        setOpenApproveCtu(false)
        setIsChoosed(false)
        setSelectTopics([])
        formApproveEx.resetFields()
    }



    const openModalApproveReport = () => {
        if (selectTopics.length > 0) {
            setOpenModalApproveTopicReport(true)
        } else {
            notification.error({
                message: 'Chưa chọn đề tài để gửi thông báo',
                duration: 2
            })
        }
    }


    return (
        <div>
            <Button style={{ marginBottom: 20 }} onClick={handleExportData} type="primary">Xuất file danh sách đề tài</Button>

            {subRole === 'admin-ctu' && value === 7 ?
                <Button style={{ marginBottom: 20, marginLeft: 20 }} onClick={() => setIsOpenModalNotification(true)} type="primary">Gửi email duyệt thuyết minh</Button>
                : ''}
            {subRole === 'admin-ctu' && value === 11 ?
                <Button style={{ marginBottom: 20, marginLeft: 20 }} onClick={openModalApproveReport} type="primary">Gửi email duyệt nghiệm thu</Button>
                : ''}


            {subRole === 'admin' ?
                <div>
                    <Radio.Group
                        onChange={chooseStatus}
                        value={value}
                    >
                        <Radio value={1}>Tất cả</Radio>
                        <Radio value={15}>Chờ báo cáo thuyết minh</Radio>
                        <Radio value={17}>Chờ duyệt file giải trình thuyết minh</Radio>
                        <Radio value={6}>Chờ duyệt thuyết minh</Radio>
                        <Radio value={7}>Đang thực hiện</Radio>
                        <Radio value={10}>Chờ duyệt nghiệm thu</Radio>
                        <Radio value={11}>Đã duyệt nghiệm thu</Radio>
                        <Radio style={{ marginTop: 10 }} value={12}>Đã có quyết định nghiệm thu</Radio>
                        <Radio style={{ marginTop: 10 }} value={20}>Đã nghiệm thu</Radio>
                    </Radio.Group>

                    <Divider />
                </div>
                : ''}
            {subRole === 'admin-ctu' ?
                <div>
                    <Radio.Group
                        onChange={chooseStatus}
                        value={value}
                    >
                        <Radio value={1}>Tất cả</Radio>
                        <Radio value={15}>Chờ báo cáo thuyết minh</Radio>
                        <Radio value={17}>Chờ duyệt file giải trình thuyết minh</Radio>
                        <Radio value={6}>Chờ duyệt thuyết minh</Radio>
                        <Radio value={7}>Đang thực hiện</Radio>
                        <Radio value={10}>Chờ duyệt nghiệm thu</Radio>
                        <Radio value={11}>Đã duyệt nghiệm thu</Radio>
                        <Radio style={{ marginTop: 10 }} value={12}>Đã có quyết định nghiệm thu</Radio>
                        <Radio style={{ marginTop: 10 }} value={20}>Đã nghiệm thu</Radio>
                    </Radio.Group>

                    <Divider />
                </div>
                : ''}

            <Table
                dataSource={topicData}
                columns={columns}
                onChange={onChange}
                bordered={true}
                pagination={{
                    total: topicData.length,
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    pageSizeOptions: ['2', '5', '10', '20'],
                    showTotal: (total, range) => { return (<div>{range[0]} - {range[1]} trên {total} kết quả</div>) }
                }}
                rowSelection={subRole === 'admin-ctu' && value !== 1 ?
                    {
                        type: 'checkbox',
                        ...rowSelection,
                    }
                    : ''}
            />
            <TopicDetail
                openDetail={openDetail}
                setOpenDetail={setOpenDetail}
                topicDetail={topicDetail}
            />

            <Modal
                title="Phân công hội đồng"
                open={isModalOpen} onOk={handleOk}
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 0,
                    }}
                    wrapperCol={{
                        span: 16,
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
                >
                    <Form.Item
                        label="Hội đồng"
                        name="board"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa chọn hội đồng!',
                            },
                        ]}
                    >

                        <select style={{ padding: 10, borderRadius: 10 }}>
                            <option style={{ marginTop: 50 }} value=''></option>
                            {listBoard.map((item, index) => {
                                return (
                                    <option value={item.id}>{item.name + ' ' + item.phase}</option>

                                )
                            })}
                        </select>

                    </Form.Item>



                    <Form.Item
                        wrapperCol={{
                            offset: 0,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Phân công
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <ModalApproveTopic
                isModalApproveOpen={isModalApproveOpen}
                setIsModalApproveOpen={setIsModalApproveOpen}
                transcriptInfo={transcriptInfo}
                editExFile={editExFile}
                topicScore={topicScore}
                subRole={subRole}
                explanationBoard={explanationBoard}
                choosedTopic={choosedTopic}
            />

            <Modal title='Thông báo duyệt đề tài' open={isOpenModalNotification}
                onOk={handleSendNotification}
                okText='Gửi thông báo'
                cancelText='Xem xét'
                onCancel={handleCancelNotification}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <div
                    style={{ marginBottom: 30 }}>
                    <Upload
                        customRequest={dummyRequest}
                        onChange={chooseFile}
                        fileList={defaultFileListCsv}
                        accept='text/csv'
                    >
                        <Button
                            icon={<UploadOutlined />}  >
                            Chọn file danh sách đề tài (csv)
                        </Button>
                    </Upload>
                </div>

                <Upload
                    customRequest={dummyRequest}
                    onChange={chooseFilePdf}
                    fileList={defaultFileListPdf}
                    accept='application/pdf'
                >
                    <Button icon={<UploadOutlined />}  >
                        Chọn file bản quyết định phê duyệt (pdf)
                    </Button>
                </Upload>

            </Modal>

            <ModalApproveTopicReport
                openModalApproveTopicReport={openModalApproveTopicReport}
                setOpenModalApproveTopicReport={setOpenModalApproveTopicReport}
                selectTopics={selectTopics}
                setSelectTopics={setSelectTopics}
            />


            <Modal open={isModalOpenAcc}
                onOk={handleConfirmAcc}
                okText='Duyệt'
                cancelText='Xem xét'
                onCancel={handleCancelAcc}
                width={800}
            >
                {selectTopics.map(item => {
                    return (
                        <>
                            <h3>{item?.accBoard?.name} ({item?.accBoard?.phase})  </h3>
                            <p>Chủ tịch: {item?.accBoard?.presidentInfo?.lecturer_name}</p>
                            <p>Thư ký: {item?.accBoard?.secretaryInfo?.lecturer_name}</p>
                            {item?.accBoard?.counter.map(counter => {
                                return (
                                    <p>Phản biện: {counter?.lecturerInfo?.lecturer_name}</p>
                                )

                            })}
                            {item?.accBoard?.commissioners.map(com => {
                                return (
                                    <p>Ủy viên: {com?.lecturerInfo?.lecturer_name}</p>
                                )

                            })}

                        </>
                    )
                })}

            </Modal>

            <Modal title='Duyệt đề tài' open={openApproveCtu}
                okText='Duyệt'
                cancelText='Xem xét'
                onCancel={handleCancelApproveCtu}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >

                {selectTopics.map((item, index) => {
                    return (
                        <>
                            <p>Đề tài: {item?.topic_name}</p>
                            <Form
                                form={formApproveEx}
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
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                                onFieldsChange={getValue}
                            >
                                <Form.Item
                                    label="Mã số đề tài"
                                    name="topic_code"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nhập mã số đề tài!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Kinh phí"
                                    name="cost"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Nhập kinh phí cấp cho đề tài!',
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        addonAfter="VND"
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                        style={{
                                            width: 200,
                                        }}                                    // onChange={onChange}
                                    />
                                </Form.Item>
                                <Form.Item
                                    wrapperCol={{
                                        offset: 0,
                                        span: 16,
                                    }}
                                >
                                    <Button type="primary" onClick={() => handleApproveTopicCtu(item)}>
                                        Duyệt đề tài
                                    </Button>
                                </Form.Item>
                            </Form>
                        </>

                    )
                })}

            </Modal>

        </div >
    )
}

export default ManageTopic