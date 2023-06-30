import { Modal, Table, Upload, message } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { useState } from "react";
import * as XLSX from 'xlsx'



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
                        header: ["name", "studentID", "email", "grade", "major"],
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
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Student ID',
            dataIndex: 'studentID',
        },

        {
            title: 'Email',
            dataIndex: 'email',

        },
        {
            title: 'Grade',
            dataIndex: 'grade',

        },
        {
            title: 'Major',
            dataIndex: 'major',

        },



    ];

    const handleImport = () => {
        console.log('check data', dataExcel)
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