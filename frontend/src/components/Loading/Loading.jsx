import { Button, Result } from "antd"

const Loading = () => {
    return (
        <>
            <Result
                status="404"
                title="404"
                subTitle="Bạn không thể truy cập vào đường dẫn này."
                extra={<Button type="primary" onClick={() => history.back()}> Quay lại</Button>}
            />
        </>
    )
}

export default Loading