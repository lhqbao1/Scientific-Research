import { Col, Drawer, message, Row, Table } from "antd"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header"
import { callGetLecturerByWorkPlace } from "../../../services/api";

const LecturerCNPM = () => {

    const [openDrawer, setOpenDrawer] = useState()
    const [hasLecturer, setHasLecturer] = useState(false)
    const [dataLecturer, setDataLecturer] = useState([])
    const checkHasLecturer = useSelector(state => state.account.user.status)
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
        if (checkHasLecturer === 'active') {
            setHasLecturer(true)
        }
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
                {text}
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



    const showLecturerDetail = (text, record) => {
        setOpenDrawer(true);
        console.log(record)
    }

    const doInviteLecturer = () => {
        console.log('hehe', checkHasLecturer)
        if (checkHasLecturer === 'active') {
            message.error('Bạn đã có giáo viên hướng dẫn cho đề tài !!')
        } else {
            message.success('jeje')
        }
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