import { Col, Drawer, message, Row, Table } from "antd"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header"
import { callCreateInvitation, callGetInvitationById, callGetLecturerByWorkPlace, callGetTopicById } from "../../../services/api";

const LecturerCNPM = () => {

    const [openDrawer, setOpenDrawer] = useState()
    const [hasLecturer, setHasLecturer] = useState(false)
    const [dataLecturer, setDataLecturer] = useState([])
    const student = useSelector(state => state.student.user)
    const workPlace = useSelector(state => state.workplace.place)
    let place = ''
    switch (workPlace) {
        case 'CNTT':
            place = 'CÔNG NGHỆ THÔNG TIN'
            break;
        case 'CNPM':
            place = 'CÔNG NGHỆ PHẦN MỀM'
            break;
        case 'HTTT':
            place = 'HỆ THỐNG THÔNG TIN'
            break;
        case 'KHMT':
            place = 'KHOA HỌC MÁY TÍNH'
            break;
        case 'MMTVTT':
            place = 'MẠNG MÁY TÍNH VÀ TRUYỀN THÔNG'
            break;
        case 'TTDPT':
            place = 'TRUYỀN THÔNG ĐA PHƯƠNG TIỆN'
            break;

    }

    useEffect(() => {
        getLecturer()
    }, [workPlace])


    const getLecturer = async () => {
        const res = await callGetLecturerByWorkPlace(workPlace)
        if (res) {
            setDataLecturer(res.data.payload)
        }
    }

    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'lecturer_name',
            render: (text, record) => <button
                onClick={() => showLecturerDetail(text, record)}
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
            render: (text, record) => <button
                disabled={hasLecturer}
                onClick={() => doInviteLecturer(text, record)}
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
            </button >,
        },
    ];



    // const getInvitation = async () => {

    // }


    const showLecturerDetail = (text, record) => {
        setOpenDrawer(true);
        console.log(record)
    }

    const doInviteLecturer = async (text, record) => {

        const topic = await callGetTopicById(student.topic_id)
        if (topic && topic.data.payload.lecturer_id !== null) {
            message.error('Bạn đã có giáo viên hướng dẫn cho đề tài!')
        } else {
            // console.log('check recored', record)
            // console.log('check student', student)
            const checkInvitation = await callGetInvitationById(student.student_id)
            if (checkInvitation.data?.payload?.lecturer !== record.lecturer_id) {
                const invitation = await callCreateInvitation(student.student_id, record.lecturer_id, student.topic_id)
                message.success(`Gửi lời mời thành công đến giảng viên ${record.lecturer_name}`)
            } else {
                message.error(`Bạn đã gửi lời mời cho giảng viên ${record.lecturer_name}! `)
            }


        }
        // console.log('check topic', topic)
        // console.log(student)
    }
    const onClose = () => {
        setOpenDrawer(false);
    };

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    return (
        <>
            <div style={{ backgroundColor: '#efefef', marginLeft: -8, marginRight: -8, marginTop: 8 }}>
                <div style={{ minHeight: 570 }}>
                    <Row>
                        <Col span={5}></Col>
                        <Col span={14} style={{ height: '50%', backgroundColor: 'white', borderRadius: 10, padding: 15, fontSize: 14 }}>
                            <div>
                                <h3>DANH SÁCH CÁC GIẢNG VIÊN THUỘC KHOA {place}</h3>
                                <Table
                                    bordered={true}
                                    pagination={false}
                                    columns={columns}
                                    dataSource={dataLecturer}
                                    onChange={onChange} />
                            </div>
                        </Col>
                        <Col span={5}>

                        </Col>
                    </Row>
                </div>
            </div>
            <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={openDrawer}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </>
    )
}

export default LecturerCNPM