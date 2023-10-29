import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons"
import { Button, Drawer, Modal, Table } from "antd"
import { useEffect, useState } from "react"
import { Document, Page, pdfjs } from 'react-pdf';
import { Buffer } from 'buffer';
import "react-pdf/dist/esm/Page/TextLayer.css";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const DrawerListFile = (props) => {
    const { isOpenDrawerListFile, setIsOpenDrawerListFile, drawerTopic } = props
    const [isModalOpenView, setIsModalOpenView] = useState(false)
    const [filePreview, setFilePreview] = useState(null)
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);



    let fileArr = []
    if (drawerTopic) {
        drawerTopic?.file?.map(item => {
            if (item?.file_type === 'explanation') {
                item.type = 'File thuyết minh'
            }
            if (item?.file_type === 'explantion-contract') {
                item.type = 'File hợp đồng'
            }
            if (item?.file_type === 'explantion-estimate') {
                item.type = 'File dự toán'
            }
            if (item?.file_type === 'edit explanation') {
                item.type = 'File giải trình chỉnh sửa'
            }
            if (item?.file_type === 'acceptance') {
                item.type = 'File đơn xin nghiệm thu'
            }
            if (item?.file_type === 'report-decide') {
                item.type = 'File quyết định nghiệm thu'
            }
            if (item?.file_type === 'report-finalreport') {
                item.type = 'File bản báo cáo tổng kết'
            }
            if (item?.file_type === 'report-assessmentform') {
                item.type = 'File phiếu nhận xét'
            }
            fileArr.push(item)
        })
    }

    const onClose = () => {
        setIsOpenDrawerListFile(false)
    }

    const seeFile = (file) => {
        setIsModalOpenView(true)
        if (file) {
            let fileBase64 = new Buffer(file?.file_url, 'base64').toString('binary')
            setFilePreview(fileBase64)

        }
    }
    const columns = [
        {
            title: 'Loại file',
            dataIndex: 'type',
            key: 'name',
        },
        {
            title: 'Tên file',
            dataIndex: 'file_name',
            key: 'age',
        },
        {
            title: '',
            render: (text, record) => <Button
                // onClick={() => showLecturerDetail(text, record)}
                type="primary"
                onClick={() => seeFile(record)}
            >
                Xem file
            </Button>,
        },
    ];

    const prevPage = () => {
        setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1)
    }

    const nextPage = () => {
        setPageNumber(pageNumber + 1 >= numPages ? pageNumber : pageNumber + 1)
    }

    const handleCancelView = () => {
        setIsModalOpenView(false)
    }

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    return (
        <>
            <Drawer title="Danh sách file của đề tài" placement="right" onClose={onClose} open={isOpenDrawerListFile} width={1000}>
                <Table dataSource={fileArr} columns={columns} bordered={true} pagination={false} />
            </Drawer>
            <Modal
                open={isModalOpenView}
                onCancel={handleCancelView}
                width={650}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                style={{
                    marginTop: -80,
                    height: 780,
                    overflow: 'scroll',
                    borderRadius: 10
                }}
            >
                <div style={{ marginLeft: 280 }}>
                    <CaretLeftOutlined onClick={prevPage} style={{ fontSize: 30 }} />
                    <CaretRightOutlined onClick={nextPage} style={{ fontSize: 30 }} />
                </div>
                <Document
                    file={filePreview}
                    onLoadSuccess={onDocumentLoadSuccess}
                    noData={''}
                    loading={''}
                >
                    <Page pageNumber={pageNumber} renderAnnotationLayer={true} renderTextLayer={true}></Page>

                </Document>
            </Modal>
        </>
    )
}
export default DrawerListFile