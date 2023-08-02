import { Button, Col, Form, Input, Row } from "antd"
import { useSearchParams } from "react-router-dom"

const SearchStudent = () => {

    const [searchParam, setSearchParam] = useSearchParams()

    const onFinish = (dataSearch) => {
        // console.log('Success:', dataSearch);
        // let param = ""
        // if (dataSearch.student_name) {
        //     param += `&student_name=${dataSearch.student_name}`
        // }
        // setSearchParam(param)
        console.log('hehe', searchParam.get('sort'))
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
                    <Col span={6} >
                        <Form.Item
                            label="Student name"
                            name="student_name"
                            rules={[
                                {
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={3}></Col>
                    <Col span={6}>
                        <Form.Item
                            label="Student grade"
                            name="studentGrade"
                            rules={[
                                {
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={3}></Col>

                    <Col span={6}>
                        <Form.Item
                            label="Student ID"
                            name="studentID"
                            rules={[
                                {
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                    </Col>
                </Row>





                <Form.Item
                    wrapperCol={{
                        offset: 18,
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

export default SearchStudent