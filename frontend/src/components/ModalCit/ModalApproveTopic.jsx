import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons"
import { Button, Collapse, Modal, notification } from "antd"
import { Document, Page, pdfjs } from 'react-pdf';

import { useState } from "react"
import { callUpdateTopicStatus } from "../../../services/api";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;


const ModalApproveTopic = (props) => {

    const { isModalApproveOpen, setIsModalApproveOpen, transcriptInfo, editExFile, topicScore, subRole, explanationBoard, choosedTopic } = props
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const handleCancelApprove = () => {
        setIsModalApproveOpen(false)
    }

    const downloadFile = () => {
        const linkSource = editExFile.file_url;
        const downloadLink = document.createElement("a");
        const fileName = "File giai trinh thuyet minh.pdf";
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }
    const handleApprove = async (values) => {
        console.log(choosedTopic)
        const status = await callUpdateTopicStatus(choosedTopic?.topic_id, 6)
        if (status) {
            setIsModalApproveOpen(false)
            notification.success({
                message: 'Duyệt đề tài thành công',
                duration: 2
            })
        }
    }

    const prevPage = () => {
        setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1)
    }

    const nextPage = () => {
        setPageNumber(pageNumber + 1 >= numPages ? pageNumber : pageNumber + 1)
    }

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    var arr = [];
    var len = transcriptInfo?.length;
    for (var i = 0; i < len; i++) {
        arr.push({
            key: i + 1,
            label: [
                <div>
                    {explanationBoard?.presidentInfo?.lecturer_name === transcriptInfo[i]?.lecturerInfo?.lecturer_name ?
                        <>                        Chủ tịch: {explanationBoard?.presidentInfo?.lecturer_name}
                        </>
                        : ''}
                    {explanationBoard?.secretaryInfo?.lecturer_name === transcriptInfo[i]?.lecturerInfo?.lecturer_name ?
                        <>                        Thư ký: {explanationBoard?.secretaryInfo?.lecturer_name}
                        </>
                        : ''}
                    {explanationBoard?.commissioners.map(item => {
                        if (item?.lecturerInfo?.lecturer_name === transcriptInfo[i]?.lecturerInfo?.lecturer_name) {
                            return (
                                <>
                                    Ủy viên: {item?.lecturerInfo?.lecturer_name}
                                </>
                            )
                        }
                    })}
                </div>
            ],
            children:
                [
                    <div>
                        {transcriptInfo[i]?.lecturerInfo?.lecturer_name === explanationBoard?.presidentInfo?.lecturer_name}
                        <>
                            <table style={{ width: '100%', marginBottom: 30 }}>
                                <tr style={{ backgroundColor: '#E0E0E0', border: '1px solid #E0E0E0', borderRadius: 10 }}>
                                    <th style={{ border: '1px solid #E0E0E0' }}>Nội dung đánh giá</th>
                                    <th style={{ height: 40, border: '1px solid #E0E0E0' }}>Điểm</th>
                                </tr >
                                <tr >
                                    <td style={{ width: 800, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Tổng quan tình hình nghiên cứu thuộc lĩnh vực đề tài</b></td>
                                    <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{transcriptInfo[i]?.scoreInfo?.score1}</td>
                                </tr>
                                <tr >
                                    <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Mục tiêu đề tài</b></td>
                                    <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{transcriptInfo[i]?.scoreInfo?.score2}</td>
                                </tr>
                                <tr >
                                    <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Phương pháp nghiên cứu</b></td>
                                    <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{transcriptInfo[i]?.scoreInfo?.score3}</td>
                                </tr>
                                <tr >
                                    <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Nội dung khoa họcNội dung khoa học</b></td>
                                    <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{transcriptInfo[i]?.scoreInfo?.score4}</td>
                                </tr>
                                <tr >
                                    <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Đóng góp về mặt kinh tế - xã hội, giáo dục và đào tạo, an ninh, quốc phòng</b></td>
                                    <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{transcriptInfo[i]?.scoreInfo?.score5}</td>
                                </tr>
                                <tr >
                                    <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Hình thức trình bày báo cáo tổng kết đề tài</b></td>
                                    <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{transcriptInfo[i]?.scoreInfo?.score6}</td>
                                </tr>
                                <tr >
                                    <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Thời gian và tiến độ thực hiện đề tài</b></td>
                                    <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{transcriptInfo[i]?.scoreInfo?.score7}</td>
                                </tr>
                                <tr >
                                    <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Điểm thưởng</b></td>
                                    <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{transcriptInfo[i]?.scoreInfo?.score8}</td>
                                </tr>
                            </table >
                            <span style={{ marginBottom: 30 }}><b>- Ý kiến của hội đồng về kết quả của đề tài: </b>{transcriptInfo[i]?.comment}</span>
                        </>
                    </div>

                ],
        });
    }
    arr.push({
        key: len + 1,
        label: 'File giải trình thuyết minh',
        children: [
            <div>
                <div style={{ textAlign: 'center' }}>
                    <CaretLeftOutlined onClick={prevPage} style={{ fontSize: 30 }} />
                    <CaretRightOutlined onClick={nextPage} style={{ fontSize: 30 }} />
                </div>
                <div style={{ float: 'center', marginLeft: 150 }}>
                    <Document
                        file={editExFile?.file_url}
                        onLoadSuccess={onDocumentLoadSuccess}
                        noData={''}
                        loading={''}
                    >
                        <Page pageNumber={pageNumber} renderAnnotationLayer={true} renderTextLayer={true}></Page>
                    </Document>
                </div>
            </div>
        ]
    })
    return (
        <>
            <Modal
                title="Nhận xét thuyết minh đề tài"
                open={isModalApproveOpen}
                onCancel={handleCancelApprove}
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}
                okText={'Duyệt đề tài'}
                style={{
                    marginTop: -80,
                    height: 780,
                    overflow: 'scroll',
                    borderRadius: 10
                }}
                width={1000}
                maskClosable={false}
            >
                <Collapse
                    items={
                        arr
                    }
                    defaultActiveKey={['1']}
                    style={{ marginTop: 25 }}

                />

                {subRole === 'admin' ?
                    <Button type="primary" onClick={handleApprove}>Duyệt đề tài</Button>

                    : ''}

            </Modal>
        </>
    )
}

export default ModalApproveTopic