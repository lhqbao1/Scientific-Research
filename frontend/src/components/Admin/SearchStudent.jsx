import { Button, Col, Form, Input, Row } from "antd"
import { useState } from "react";
import { useSearchParams } from "react-router-dom"
import { searchStudent } from "../../../services/api";

const SearchStudent = (props) => {

    const [userSearch, setUserSearch] = useState()

    const onFinish = async (dataSearch) => {
        let keyword = '';
        keyword = dataSearch?.student_name
        const res = await searchStudent(`${keyword}`)
        console.log('check search', res)
        setUserSearch(res.data.payload.items)
        if (res && res.data) {
            props.handleSearch(res.data.payload)

        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            <Form
                name="basic"
                labelCol={{
                    span: 24,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Row>
                    <Col span={7} >
                        <Form.Item
                            label="Tìm sinh viên (tên hoặc mã số sinh viên)"
                            name="student_name"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={3}></Col>
                    <Col span={3}></Col>
                </Row>
                <Form.Item
                    wrapperCol={{
                        offset: 0,
                        span: 24,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Tìm
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default SearchStudent