import { Button, Col, Form, Input, message, notification, Row, Select } from "antd"
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { callAddStudentTopic, callAddTopic, callGetNotification, callGetNotificationPhase2, callUpdateStudentRole } from "../../../../services/api";

const AddTopic = () => {
    const [hasNoti, setHasNoti] = useState(false)
    const [hasNoti2, setHasNoti2] = useState(false)

    const student_id = useSelector(state => state.student.user.student_id)
    const [form] = Form.useForm();


    useEffect(() => {
        const getNotification = async () => {
            const res = await callGetNotification()
            let dataNotiCreate = ''
            dataNotiCreate = res.data.payload.items
            console.log(dataNotiCreate)
            if (dataNotiCreate.length > 0) {
                let today = new Date()
                let todayInt = today.getTime()
                dataNotiCreate.map(item => {
                    // console.log(todayInt)
                    // console.log(+item.start_date)
                    // console.log(+item.end_date)

                    if (todayInt >= +item?.start_date && todayInt <= item.end_date) {
                        console.log('item', item)
                        if (item.type === 'đợt 2') {

                            setHasNoti2(true)
                        }
                        if (item.type === 'đợt 1') {

                            setHasNoti(true)
                        }
                        console.log('check data', data)
                    } else {
                        return
                    }
                })

            }


        }
        getNotification()
    }, [])

    const onFinish = async (values) => {
        console.log('check noti', hasNoti)
        if (hasNoti === false && hasNoti2 === false) {
            notification.error({
                message: 'Bạn không thể đăng kí đề tài lúc này, kiểm tra thời hạn ở thông báo!',
                duration: 2
            })
            return;
        }

        if (hasNoti === true) {
            const student = await callUpdateStudentRole(student_id, 'chủ nhiệm đề tài')
            const res = await callAddTopic(values.topic_name, values.research_area, values.basic_description, 3, '09/2023 đến 03/2024', 1)
            if (res && student) {
                // console.log(res.data.payload)
                const updateTopic = await callAddStudentTopic(student_id, res?.data?.payload?.topic_id)
                if (updateTopic) {
                    window.location.reload()
                    form.resetFields()
                    notification.success({
                        message: `Tạo đề tài ${values.topic_name} thành công`,
                        duration: 2
                    })
                }
            }
        }

        if (hasNoti2 === true) {
            const student = await callUpdateStudentRole(student_id, 'chủ nhiệm đề tài')
            const res = await callAddTopic(values.topic_name, values.research_area, values.basic_description, 3, '10/2023 đến 04/2024', 2)
            if (res && student) {
                // console.log(res.data.payload)
                const updateTopic = await callAddStudentTopic(student_id, res?.data?.payload?.topic_id)
                if (updateTopic) {
                    form.resetFields()
                    notification.success({
                        message: `Tạo đề tài ${values.topic_name} thành công`,
                        duration: 2
                    })
                }
            }
        }




    };



    return (
        <>
            <div style={{ backgroundColor: '#efefef', marginLeft: -8, marginRight: -8, marginTop: 8 }}>
                <div style={{ minHeight: 570 }}>
                    <Row>
                        <Col span={5}></Col>
                        <Col span={14} style={{ height: '50%', backgroundColor: 'white', borderRadius: 10, padding: 15, fontSize: 14 }}>
                            <div>
                                <h3>ĐĂNG KÝ ĐỀ TÀI NGHIÊN CỨU KHOA HỌC</h3>
                                <Form
                                    form={form}
                                    name="basic"
                                    labelCol={{
                                        span: 7,
                                    }}
                                    wrapperCol={{
                                        span: 12,
                                    }}
                                    style={{
                                        maxWidth: 600,
                                    }}
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={onFinish}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        label="Tên đề tài"
                                        name="topic_name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Hãy nhập tên đề tài!',
                                            },
                                        ]}
                                    >
                                        <TextArea
                                            // showCount
                                            // maxLength={100}
                                            style={{
                                                height: 56,
                                            }}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Lĩnh vực của đề tài"
                                        name="research_area"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Hãy nhập lĩnh vực nghiên cứu của đề tài!',
                                            },
                                        ]}
                                    >
                                        <Select
                                            // defaultValue="lucy"
                                            style={{
                                                width: 300,
                                            }}
                                            // onChange={handleChange}
                                            options={[
                                                {
                                                    value: 'Khoa học tự nhiên',
                                                    label: 'Khoa học tự nhiên',
                                                },
                                                {
                                                    value: 'Khoa học y dược',
                                                    label: 'Khoa học y dược',
                                                },
                                                {
                                                    value: 'Khoa học xã hội',
                                                    label: 'Khoa học xã hội',
                                                },
                                                {
                                                    value: 'Khoa học kỹ thuật và công nghệ',
                                                    label: 'Khoa học kỹ thuật và công nghệ',
                                                },
                                                {
                                                    value: 'Khoa học nông nghiệp',
                                                    label: 'Khoa học nông nghiệp',
                                                },
                                                {
                                                    value: 'Khoa học nhân văn',
                                                    label: 'Khoa học nhân văn',
                                                },
                                            ]}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Miêu tả cơ bản về đề tài"
                                        name="basic_description"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Hãy nhập mô tả cơ bản cho đề tài!',
                                            },
                                        ]}
                                    >
                                        {/* <Input.TextArea /> */}
                                        <TextArea
                                            showCount
                                            maxLength={200}
                                            style={{
                                                height: 120,
                                            }}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        wrapperCol={{
                                            offset: 7,
                                            span: 16,
                                        }}
                                    >
                                        <Button type="primary" htmlType="submit">
                                            Đăng kí đề tài
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </Col>
                        <Col span={5}>

                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default AddTopic