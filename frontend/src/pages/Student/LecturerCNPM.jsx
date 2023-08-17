import { Col, Drawer, message, Row, Table } from "antd"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header"

const LecturerCNPM = () => {

    const [openDrawer, setOpenDrawer] = useState()
    const [hasLecturer, setHasLecturer] = useState(false)
    const checkHasLecturer = useSelector(state => state.account.user.status)
    useEffect(() => {
        if (checkHasLecturer === 'active') {
            setHasLecturer(true)
        }
    }, [checkHasLecturer])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
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
            title: 'Position',
            dataIndex: 'position',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
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
                {text}
            </button >,
        },


    ];

    const data = [
        {
            key: '1',
            name: 'TS. Trương Minh Thái',
            position: 'Trưởng khoa',
            email: 'tmthai@cit.ctu.edu.vn',
            action: 'Invite'
        },
        {
            key: '2',
            name: 'Jim Green',
            position: 98,
            email: 66,
        },
        {
            key: '3',
            name: 'Joe Black',
            position: 98,
            email: 90,
        },
        {
            key: '4',
            name: 'Jim Red',
            position: 88,
            email: 99,
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
            <Header />
            <div style={{ backgroundColor: '#efefef', marginLeft: -8, marginRight: -8, marginTop: 8 }}>
                <div style={{ minHeight: 570 }}>
                    <Row>
                        <Col span={5}></Col>
                        <Col span={14} style={{ height: '50%', backgroundColor: 'white', borderRadius: 10, padding: 15, fontSize: 14 }}>
                            <div>
                                <h3>DANH SÁCH CÁC GIẢNG VIÊN THUỘC KHOA CÔNG NGHỆ PHẦN MỀM</h3>
                                <Table
                                    bordered={true}
                                    pagination={false}
                                    columns={columns}
                                    dataSource={data}
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