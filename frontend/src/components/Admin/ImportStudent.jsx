import { Modal, Table, Upload, message, notification } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { useState } from "react";
import * as XLSX from 'xlsx'
import { callCreateBulkStudent, callCreateBulkUser, callGetStudents, callGetUser } from "../../../services/api";



const ImportStudent = (props) => {
    const { Dragger } = Upload;
    const { openModalImport, setOpenModalImport } = props
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
        accept: ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
        // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log('cloading', info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);

                let file = info.fileList[0].originFileObj
                const reader = new FileReader();
                reader.onload = function (e) {
                    let data = new Uint8Array(e.target.result);
                    let workbook = XLSX.read(data, { type: 'array' });
                    // find the name of your sheet in the workbook first
                    let worksheet = workbook.Sheets[workbook.SheetNames[0]];

                    // convert to json format
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                        header: ["student_name", "student_code", "email", "major_id", "student_class", "grade"],
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
            title: 'Tên sinh viên',
            dataIndex: 'student_name',
        },
        {
            title: 'Mã số sinh viên',
            dataIndex: 'student_code',
        },

        {
            title: 'Email',
            dataIndex: 'email',

        },
        {
            title: 'Chuyên nghành',
            dataIndex: 'major_id',

        },
        {
            title: 'Lớp học',
            dataIndex: 'student_class',
        },
        {
            title: 'Khóa học',
            dataIndex: 'grade',
        }



    ];

    const handleImport = async () => {
        let data = []
        let dataExcelMap = []
        dataExcelMap.push(dataExcel)
        dataExcel.map((item, index) => {
            let object = {}
            object.email = item.email
            data.push(object)
        });
        data.map(item => {
            item.password = 123456,
                item.role = 1
        })

        const student = await callGetStudents()
        const user = await callGetUser()
        // console.log('check student', student.data.payload.items)
        // console.log('check user', user.data.payload.items)
        // console.log('check data', dataExcel)


        student.data.payload.items.map(student => {
            data.map(data1 => {
                if (data1.email === student.email) {
                    data = data.filter(data => data.email !== data1.email)
                }
            })
        })


        user.data.payload.items.map(user => {
            dataExcelMap[0].map(dataExcelMap1 => {
                if (dataExcelMap1.email === user.email) {
                    dataExcelMap[0] = dataExcelMap[0].filter(dataExcelMap => dataExcelMap.email !== dataExcelMap1.email)
                }
            })
        })

        // console.log('check user', data)
        const bulkUser = await callCreateBulkUser(data)
        // console.log('chcek data', bulkUser)
        let userInfo = bulkUser?.data?.payload
        let studentId = []
        userInfo.map((item, index) => {
            let object = {}
            object.user_id = item.id
            studentId.push(object)
        })
        // console.log('check id', studentId)
        for (let i = 0; i < studentId.length; i++) {
            // console.log('check id loop', studentId[i].user_id)
            dataExcelMap[0][i].user_id = studentId[i].user_id
        }
        const bulkStudent = await callCreateBulkStudent(dataExcelMap[0])
        if (bulkStudent?.data?.payload.length > 0) {
            setDataExcel([])
            notification.success({
                message: 'Nhập thông tin sinh viên thành công',
                duration: 2
            })
        }
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
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                        banned files.
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

export default ImportStudent