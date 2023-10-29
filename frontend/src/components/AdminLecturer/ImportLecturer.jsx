import { Modal, Table, Upload, message, notification } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { useState } from "react";
import * as XLSX from 'xlsx'
import { callCreateBulkLecturer, callCreateBulkUser, callGetLecturer, callGetUser } from "../../../services/api";



const ImportLecturer = (props) => {
    const { Dragger } = Upload;
    const { openModalImport, setOpenModalImport, reload, setReload } = props
    const [dataExcel, setDataExcel] = useState()
    const [dataExcelLength, setDataExcelLength] = useState(0)

    const handleCancel = () => {
        setOpenModalImport(false);
        setDataExcel([])
        setDataExcelLength(0)
    };

    //customRequest
    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 1000)
    }

    //props for Dragger
    const upload = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        customRequest: dummyRequest,
        accept: "text/csv",
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log('cloading', info.file, info.fileList);
            }
            if (status === 'done') {

                message.success(`${info.file.name} file đã được chọn`);

                let file = info.fileList[0].originFileObj
                const reader = new FileReader();
                reader.onload = function (e) {
                    let data = new Uint8Array(e.target.result);
                    let workbook = XLSX.read(data, { type: 'array' });
                    // find the name of your sheet in the workbook first
                    let worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    // convert to json format
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                        header: ["Họ tên", "Học hàm", "Chức vụ", "Email", "Nơi làm việc"],
                        range: 1
                    });
                    if (jsonData && jsonData.length > 0) {
                        setDataExcel(jsonData)
                        setDataExcelLength(jsonData.length)
                    }
                };
                reader.readAsArrayBuffer(file);

            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);

        },
    }

    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'Họ tên',
        },
        {
            title: 'Học hàm',
            dataIndex: 'Học hàm',
        },

        {
            title: 'Chức vụ',
            dataIndex: 'Chức vụ',

        },
        {
            title: 'Email',
            dataIndex: 'Email',

        },
        {
            title: 'Nơi làm việc',
            dataIndex: 'Nơi làm việc',

        },
    ];

    const handleImport = async () => {
        let dataUser = []
        let data = []
        dataExcel.map(item => {
            let object = {}
            object.lecturer_name = item["Họ tên"]
            object.position = item["Chức vụ"]
            object.degree = item["Học hàm"]
            object.email = item["Email"]
            if (item["Nơi làm việc"] === 'Khoa Công nghệ thông tin') {
                object.work_place_id = 'CNTT'
            }
            if (item["Nơi làm việc"] === 'Khoa khoa học máy tính') {
                object.work_place_id = 'KHMT'
            }
            if (item["Nơi làm việc"] === 'Khoa hệ thống thông tin') {
                object.work_place_id = 'HTTT'
            }
            if (item["Nơi làm việc"] === 'Khoa mạng máy tính và truyền thông') {
                object.work_place_id = 'MMTVTT'
            }
            if (item["Nơi làm việc"] === 'Khoa truyền thông đa phương tiện') {
                object.work_place_id = 'TTDPT'
            }
            if (item["Nơi làm việc"] === 'Khoa công nghệ phần mềm') {
                object.work_place_id = 'CNPM'
            }
            data.push(object)
        })

        data.map(item => {
            let object = {}
            object.email = item.email
            object.password = 123456
            object.role = 2
            dataUser.push(object)
        })

        const resUser = await callGetUser()
        const resLecturer = await callGetLecturer()
        let user = resUser?.data?.payload?.items
        let lecturer = resLecturer?.data?.payload?.items

        user.map(user => {
            dataUser.map(dataUser1 => {
                if (user.email === dataUser1.email) {
                    dataUser = dataUser.filter(dataUser => dataUser.email !== dataUser1.email)
                }
            })
        })

        lecturer.map(lecturer => {
            data.map(data1 => {
                if (lecturer.email === data1.email) {
                    data = data.filter(data => data.email !== data1.email)
                }
            })
        })


        const bulkUser = await callCreateBulkUser(dataUser)

        let listUser = bulkUser.data.payload
        let userId = []
        listUser.map(item => {
            userId.push(item.id)
        })

        for (let i = 0; i < data.length; i++) {
            data[i].user_id = userId[i]
        }
        const bulkLecturer = await callCreateBulkLecturer(data)
        if (bulkUser && bulkLecturer) {
            setDataExcel([])
            setReload(!reload)
            setOpenModalImport(false)
            notification.success({
                message: 'Tạo nhiều tài khoản giảng viên thành công',
                duration: 2
            })
        }
        console.log('chekc user', data)
    }
    const onRemoveFile = () => {
        setDataExcel([])
    }
    return (
        <div>
            <Modal
                title="Import Student"
                open={openModalImport}
                onOk={handleImport}
                onCancel={handleCancel}
                maskClosable={false}
                cancelButtonProps={{ style: { display: 'none' } }}
                width={850}
                okText="Import"



            >
                <Dragger {...upload}
                    style={{ marginTop: 30 }}
                    showUploadList={dataExcelLength > 0}
                    onRemove={onRemoveFile}

                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Bấm vào đây hoặc kéo thả file vào để tải lên</p>
                    <p className="ant-upload-hint">
                        Chấp nhận file csv
                    </p>
                </Dragger>

                <Table
                    style={{ marginTop: 40 }}
                    columns={columns}
                    dataSource={dataExcel}
                    pagination={false}
                />
            </Modal>
        </div>
    )
}

export default ImportLecturer