import { Button, Col, Form, Input, Row } from "antd"
import { useState } from "react";
import { useSearchParams } from "react-router-dom"
import { callSearchLecturer } from "../../../services/api";
// import { SearchLecturer } from "../../../services/api";

const SearchLecturer = (props) => {

    const [keyword, setKeyword] = useState()
    const [userSearch, setUserSearch] = useState()

    const onFinish = async (dataSearch) => {
        let keyword = '';
        keyword = dataSearch?.lecturer_name
        console.log(keyword)
        if (keyword) {
            const res = await callSearchLecturer(`${keyword}`)
            setUserSearch(res.data.payload.items)
            if (res && res.data) {
                props.handleSearch(res.data.payload)

            }
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
                            label="Find lecturer (lecturer name)"
                            name="lecturer_name"

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
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default SearchLecturer