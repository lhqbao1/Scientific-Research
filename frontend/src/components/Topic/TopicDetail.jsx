import { Badge, Button, Collapse, Descriptions, Drawer, Modal } from "antd"
import { useState } from "react"
import { useEffect } from "react"
import { Buffer } from 'buffer';
import { callGetTranscriptAccByTopicId } from "../../../services/api";



const TopicDetail = (props) => {
    const { openDetail, setOpenDetail, topicDetail } = props
    const [dataTranscript, setDataTranscript] = useState([])
    const [isModalAccOpen, setIsModalAccOpen] = useState(false)



    const item = [
        {

            key: '1',
            label: dataTranscript[0]?.lecturerInfo?.lecturer_name,
            children:
                [
                    <div>
                        <table style={{ width: '100%', marginBottom: 30 }}>
                            <tr style={{ backgroundColor: '#E0E0E0', border: '1px solid #E0E0E0', borderRadius: 10 }}>
                                <th style={{ border: '1px solid #E0E0E0' }}></th>
                                <th style={{ height: 40, border: '1px solid #E0E0E0' }}>Điểm</th>
                                <th style={{ border: '1px solid #E0E0E0' }}>Nhận xét</th>
                            </tr >
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Tổng quan tình hình nghiên cứu, lý do chọn đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[0]?.scoreInfo?.score1}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[0]?.commentInfo?.comment1}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Mục tiêu đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[0]?.scoreInfo?.score2}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[0]?.commentInfo?.comment2}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Phương pháp nghiên cứu</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[0]?.scoreInfo?.score3}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[0]?.commentInfo?.comment3}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Nội dung khoa họcNội dung khoa học</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[0]?.scoreInfo?.score4}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[0]?.commentInfo?.comment4}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Đóng góp về mặt kinh tế - xã hội, giáo dục và đào tạo, an ninh, quốc phòng</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[0]?.scoreInfo?.score5}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[0]?.commentInfo?.comment5}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Hình thức trình bày báo cáo tổng kết đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[0]?.scoreInfo?.score6}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[0]?.commentInfo?.comment6}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Thời gian và tiến độ thực hiện đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[0]?.scoreInfo?.score7}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[0]?.commentInfo?.comment7}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Điểm thưởng</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[0]?.scoreInfo?.score8}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}></td>
                            </tr>
                        </table >
                        <span style={{ marginBottom: 30 }}><b>Ý kiến của hội đồng về kết quả của đề tài: </b>{dataTranscript[0]?.commentInfo?.comment8}</span>
                        <br></br>
                        <span><b>Những tồn tại và đề xuất hướng hoặc biện pháp để giải quyết: </b>{dataTranscript[0]?.commentInfo?.comment9}</span>

                    </div>

                ],
        },
        {
            key: '2',
            label: dataTranscript[1]?.lecturerInfo?.lecturer_name,
            children:
                [
                    <div>

                        <table style={{ width: '100%', marginBottom: 30 }}>
                            <tr style={{ backgroundColor: '#E0E0E0', border: '1px solid #E0E0E0', borderRadius: 10 }}>
                                <th style={{ border: '1px solid #E0E0E0' }}></th>
                                <th style={{ height: 40, border: '1px solid #E0E0E0' }}>Điểm</th>
                                <th style={{ border: '1px solid #E0E0E0' }}>Nhận xét</th>
                            </tr >
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Tổng quan tình hình nghiên cứu, lý do chọn đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[1]?.scoreInfo?.score1}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[1]?.commentInfo?.comment1}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Mục tiêu đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[1]?.scoreInfo?.score2}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[1]?.commentInfo?.comment2}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Phương pháp nghiên cứu</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[1]?.scoreInfo?.score3}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[1]?.commentInfo?.comment3}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Nội dung khoa họcNội dung khoa học</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[1]?.scoreInfo?.score4}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[1]?.commentInfo?.comment4}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Đóng góp về mặt kinh tế - xã hội, giáo dục và đào tạo, an ninh, quốc phòng</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[1]?.scoreInfo?.score5}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[1]?.commentInfo?.comment5}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Hình thức trình bày báo cáo tổng kết đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[1]?.scoreInfo?.score6}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[1]?.commentInfo?.comment6}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Thời gian và tiến độ thực hiện đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[1]?.scoreInfo?.score7}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[1]?.commentInfo?.comment7}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Điểm thưởng</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[1]?.scoreInfo?.score8}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}></td>
                            </tr>
                        </table >
                        <span style={{ marginBottom: 30 }}><b>Ý kiến của hội đồng về kết quả của đề tài: </b>{dataTranscript[1]?.commentInfo?.comment8}</span>
                        <br></br>
                        <span><b>Những tồn tại và đề xuất hướng hoặc biện pháp để giải quyết: </b>{dataTranscript[1]?.commentInfo?.comment9}</span>

                    </div>

                ],
        },
        {
            key: '3',
            label: dataTranscript[2]?.lecturerInfo?.lecturer_name,
            children:
                [
                    <div>

                        <table style={{ width: '100%', marginBottom: 30 }}>
                            <tr style={{ backgroundColor: '#E0E0E0', border: '1px solid #E0E0E0', borderRadius: 10 }}>
                                <th style={{ border: '1px solid #E0E0E0' }}></th>
                                <th style={{ height: 40, border: '1px solid #E0E0E0' }}>Điểm</th>
                                <th style={{ border: '1px solid #E0E0E0' }}>Nhận xét</th>
                            </tr >
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Tổng quan tình hình nghiên cứu, lý do chọn đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[2]?.scoreInfo?.score1}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[2]?.commentInfo?.comment1}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Mục tiêu đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[2]?.scoreInfo?.score2}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[2]?.commentInfo?.comment2}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Phương pháp nghiên cứu</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[2]?.scoreInfo?.score3}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[2]?.commentInfo?.comment3}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Nội dung khoa họcNội dung khoa học</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[2]?.scoreInfo?.score4}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[2]?.commentInfo?.comment4}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Đóng góp về mặt kinh tế - xã hội, giáo dục và đào tạo, an ninh, quốc phòng</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[2]?.scoreInfo?.score5}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[2]?.commentInfo?.comment5}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Hình thức trình bày báo cáo tổng kết đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[2]?.scoreInfo?.score6}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[2]?.commentInfo?.comment6}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Thời gian và tiến độ thực hiện đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[2]?.scoreInfo?.score7}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[2]?.commentInfo?.comment7}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Điểm thưởng</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[2]?.scoreInfo?.score8}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}></td>
                            </tr>
                        </table >
                        <span style={{ marginBottom: 30 }}><b>Ý kiến của hội đồng về kết quả của đề tài: </b>{dataTranscript[2]?.commentInfo?.comment8}</span>
                        <br></br>
                        <span><b>Những tồn tại và đề xuất hướng hoặc biện pháp để giải quyết: </b>{dataTranscript[2]?.commentInfo?.comment9}</span>

                    </div>

                ],
        },
        {
            key: '4',
            label: dataTranscript[3]?.lecturerInfo?.lecturer_name,
            children:
                [
                    <div>

                        <table style={{ width: '100%', marginBottom: 30 }}>
                            <tr style={{ backgroundColor: '#E0E0E0', border: '1px solid #E0E0E0', borderRadius: 10 }}>
                                <th style={{ border: '1px solid #E0E0E0' }}></th>
                                <th style={{ height: 40, border: '1px solid #E0E0E0' }}>Điểm</th>
                                <th style={{ border: '1px solid #E0E0E0' }}>Nhận xét</th>
                            </tr >
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Tổng quan tình hình nghiên cứu, lý do chọn đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[3]?.scoreInfo?.score1}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[3]?.commentInfo?.comment1}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Mục tiêu đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[3]?.scoreInfo?.score2}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[3]?.commentInfo?.comment2}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Phương pháp nghiên cứu</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[3]?.scoreInfo?.score3}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[3]?.commentInfo?.comment3}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Nội dung khoa họcNội dung khoa học</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[3]?.scoreInfo?.score4}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[3]?.commentInfo?.comment4}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Đóng góp về mặt kinh tế - xã hội, giáo dục và đào tạo, an ninh, quốc phòng</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[3]?.scoreInfo?.score5}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[3]?.commentInfo?.comment5}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Hình thức trình bày báo cáo tổng kết đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[3]?.scoreInfo?.score6}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[3]?.commentInfo?.comment6}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Thời gian và tiến độ thực hiện đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[3]?.scoreInfo?.score7}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[3]?.commentInfo?.comment7}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Điểm thưởng</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[3]?.scoreInfo?.score8}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}></td>
                            </tr>
                        </table >
                        <span style={{ marginBottom: 30 }}><b>Ý kiến của hội đồng về kết quả của đề tài: </b>{dataTranscript[3]?.commentInfo?.comment8}</span>
                        <br></br>
                        <span><b>Những tồn tại và đề xuất hướng hoặc biện pháp để giải quyết: </b>{dataTranscript[3]?.commentInfo?.comment9}</span>

                    </div>

                ],
        },
        {
            key: '5',
            label: dataTranscript[4]?.lecturerInfo?.lecturer_name,
            children:
                [
                    <div>

                        <table style={{ width: '100%', marginBottom: 30 }}>
                            <tr style={{ backgroundColor: '#E0E0E0', border: '1px solid #E0E0E0', borderRadius: 10 }}>
                                <th style={{ border: '1px solid #E0E0E0' }}></th>
                                <th style={{ height: 40, border: '1px solid #E0E0E0' }}>Điểm</th>
                                <th style={{ border: '1px solid #E0E0E0' }}>Nhận xét</th>
                            </tr >
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Tổng quan tình hình nghiên cứu, lý do chọn đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[4]?.scoreInfo?.score1}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[4]?.commentInfo?.comment1}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Mục tiêu đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[4]?.scoreInfo?.score2}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[4]?.commentInfo?.comment2}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Phương pháp nghiên cứu</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[4]?.scoreInfo?.score3}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[4]?.commentInfo?.comment3}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Nội dung khoa họcNội dung khoa học</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[4]?.scoreInfo?.score4}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[4]?.commentInfo?.comment4}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Đóng góp về mặt kinh tế - xã hội, giáo dục và đào tạo, an ninh, quốc phòng</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[4]?.scoreInfo?.score5}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[4]?.commentInfo?.comment5}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Hình thức trình bày báo cáo tổng kết đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[4]?.scoreInfo?.score6}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[4]?.commentInfo?.comment6}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Thời gian và tiến độ thực hiện đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[4]?.scoreInfo?.score7}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[4]?.commentInfo?.comment7}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Điểm thưởng</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[4]?.scoreInfo?.score8}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}></td>
                            </tr>
                        </table >
                        <span style={{ marginBottom: 30 }}><b>Ý kiến của hội đồng về kết quả của đề tài: </b>{dataTranscript[4]?.commentInfo?.comment8}</span>
                        <br></br>
                        <span><b>Những tồn tại và đề xuất hướng hoặc biện pháp để giải quyết: </b>{dataTranscript[4]?.commentInfo?.comment9}</span>

                    </div>

                ],
        },
        {
            key: '6',
            label: dataTranscript[5]?.lecturerInfo?.lecturer_name,
            children:
                [
                    <div>

                        <table style={{ width: '100%', marginBottom: 30 }}>
                            <tr style={{ backgroundColor: '#E0E0E0', border: '1px solid #E0E0E0', borderRadius: 10 }}>
                                <th style={{ border: '1px solid #E0E0E0' }}></th>
                                <th style={{ height: 40, border: '1px solid #E0E0E0' }}>Điểm</th>
                                <th style={{ border: '1px solid #E0E0E0' }}>Nhận xét</th>
                            </tr >
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Tổng quan tình hình nghiên cứu, lý do chọn đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[5]?.scoreInfo?.score1}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[5]?.commentInfo?.comment1}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Mục tiêu đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[5]?.scoreInfo?.score2}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[5]?.commentInfo?.comment2}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Phương pháp nghiên cứu</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[5]?.scoreInfo?.score3}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[5]?.commentInfo?.comment3}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Nội dung khoa họcNội dung khoa học</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[5]?.scoreInfo?.score4}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[5]?.commentInfo?.comment4}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Đóng góp về mặt kinh tế - xã hội, giáo dục và đào tạo, an ninh, quốc phòng</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[5]?.scoreInfo?.score5}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[5]?.commentInfo?.comment5}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Hình thức trình bày báo cáo tổng kết đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[5]?.scoreInfo?.score6}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[5]?.commentInfo?.comment6}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Thời gian và tiến độ thực hiện đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[5]?.scoreInfo?.score7}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[5]?.commentInfo?.comment7}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Điểm thưởng</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{dataTranscript[5]?.scoreInfo?.score8}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}></td>
                            </tr>
                        </table >
                        <span style={{ marginBottom: 30 }}><b>Ý kiến của hội đồng về kết quả của đề tài: </b>{dataTranscript[5]?.commentInfo?.comment8}</span>
                        <br></br>
                        <span><b>Những tồn tại và đề xuất hướng hoặc biện pháp để giải quyết: </b>{dataTranscript[5]?.commentInfo?.comment9}</span>

                    </div>

                ],
        },
    ];

    const onClose = () => {
        setOpenDetail(false)
    }
    const getFile = (file) => {
        console.log(topicDetail)
        let fileBase64 = new Buffer(file?.file_url, 'base64').toString('binary')

        const linkSource = fileBase64;
        const downloadLink = document.createElement("a");
        const fileName = `${file?.file_name}`;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }
    const openModalTranscriptAcc = async () => {
        const res = await callGetTranscriptAccByTopicId(topicDetail.topic_id)
        let data = res.data.payload
        let arrData = []
        data.map(item => {
            let object = {}
            object.lecturer = item.lecturerInfo.lecturer_name
            object.comment1 = item.commentInfo.comment1
            object.score1 = item.scoreInfo.score1
            object.comment2 = item.commentInfo.comment2
            object.score2 = item.scoreInfo.score2
            object.comment3 = item.commentInfo.comment3
            object.score3 = item.scoreInfo.score3
            object.comment4 = item.commentInfo.comment4
            object.score4 = item.scoreInfo.score4
            object.comment5 = item.commentInfo.comment5
            object.score5 = item.scoreInfo.score5
            object.comment6 = item.commentInfo.comment6
            object.score6 = item.scoreInfo.score6
            object.comment7 = item.commentInfo.comment7
            object.score7 = item.scoreInfo.score7
            object.comment8 = item.commentInfo.comment8
            object.score8 = item.scoreInfo.score8
            object.comment9 = item.commentInfo.comment9

            arrData.push(object)
        })
        // console.log(arrData)
        setDataTranscript(res.data.payload)

        setIsModalAccOpen(true)
    }

    const handleCancelAcc = () => {
        setIsModalAccOpen(false)
    }

    return (
        <div>
            <Drawer title={topicDetail?.topic_name} placement="right" onClose={onClose} open={openDetail} width={1000} >
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Lĩnh vực nghiên cứu" span={2}>{topicDetail?.research_area}</Descriptions.Item>
                    <Descriptions.Item label="Mô tả ngắn gọn" span={2}>{topicDetail?.basic_description}</Descriptions.Item>
                    <Descriptions.Item label="Thời gian thực hiện" span={4}>{topicDetail?.duration}</Descriptions.Item>
                    <Descriptions.Item label="Mã số đề tài" span={4}>
                        {topicDetail?.topic_code}
                    </Descriptions.Item>
                    <Descriptions.Item label="Thành viên">
                        {topicDetail ?
                            topicDetail?.student?.map(item => {
                                return (
                                    <>{item?.student_name} ({item?.role})</>
                                )
                            })
                            : ''}
                    </Descriptions.Item>
                    <Descriptions.Item label="Giáo viên hướng dẫn">
                        {topicDetail?.lecturer?.lecturer_name}
                    </Descriptions.Item>
                    <Descriptions.Item label="File đã nộp">
                        {topicDetail ?
                            topicDetail?.file?.map(item => {
                                let type = ''
                                if (item?.file_type === 'explanation') {
                                    type = 'File thuyết minh'
                                }
                                if (item?.file_type === 'edit explanation') {
                                    type = 'File chỉnh sửa sau thuyết minh'
                                }
                                if (item?.file_type === 'acceptance') {
                                    type = 'File đơn xin nghiệm thu'
                                }
                                if (item?.file_type === 'letter') {
                                    type = 'File báo cáo nghiệm thu'
                                }
                                if (item?.file_type === 'report-decide') {
                                    type = 'File quyết định nghiệm thu'
                                }
                                if (item?.file_type === 'report-finalreport') {
                                    type = 'File báo cáo đề tài'
                                }
                                if (item?.file_type === 'report-assessmentform') {
                                    type = 'File phiếu nhận xét đề tài'
                                }
                                return (
                                    <div style={{ marginBottom: 5 }}>{type}:<a onClick={() => getFile(item)}> {item?.file_name}</a></div>
                                )
                            })
                            : ''}
                    </Descriptions.Item>
                    <Descriptions.Item label="Nhận xét của hội đồng nghiệm thu" span={2}><Button type='primary' onClick={() => openModalTranscriptAcc()}>Xem nhận xét</Button></Descriptions.Item>



                </Descriptions>
            </Drawer>
            <Modal
                title="Nhận xét của hội đồng nghiệm thu"
                style={{
                    marginTop: -80,
                    height: 780,
                    overflow: 'scroll',
                    borderRadius: 10
                }}
                maskClosable={false}
                open={isModalAccOpen}
                onCancel={handleCancelAcc}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                width={1000}

            >
                <Collapse
                    items={
                        item
                    }
                    defaultActiveKey={['1']}
                    style={{ marginTop: 25 }}

                />
            </Modal>
        </div>
    )
}

export default TopicDetail