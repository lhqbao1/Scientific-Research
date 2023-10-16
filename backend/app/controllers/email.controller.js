const config = require("../config/config");
// const Buffer = require("node:buffer")
const nodemailer = require("nodemailer");
const Buffer = require("buffer")

// const Invoice = db.invoice;

responsePayload = (status, message, payload) => ({
    status,
    message,
    payload,
});

exports.sendEmailApprove = async (req, res) => {
    try {
        const receiver = req.body.receiver
        const file = req.body.file
        const pdfFile = req.body.pdfFile

        console.log(receiver)
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: 'luonghoangquocbao@gmail.com',
                pass: 'fvlx vrkq jpru nozw'
            }
        });

        const info = await transporter.sendMail({
            from: 'Trường đại học cần thơ', // sender address
            to: receiver, // list of receivers
            subject: "Gửi sinh viên thực hiện nghiên cứu khoa học", // Subject line
            // text: "Hello world?", // plain text body
            html: `
            <div>
            Kính gửi quý Thầy Cô là Trợ lý NCKH và CBHD! Các em học sinh thân mến!
            <div style="margin-left: 40px; margin-top: 20px; margin-bottom: 20px">Xin được gửi đến quý Thầy Cô file scan Quyết định Phê duyệt Danh mục đề tài NCKH của SV CLC trường Công nghệ thông tin và truyền thông năm 2023 để sử dụng khi cần</div>
            <div>Chào thân ái.</div>
            <div>-------------------------------</div>
            <div>Lương Hoàng Quốc Bảo</div>
            </div>
               `,
            attachments: [
                {   // data uri as an attachment
                    filename: 'Danh sach de tai duoc duyet.csv',
                    path: file
                },
                {   // data uri as an attachment
                    filename: 'Quyet dinh phe duyet de tai.pdf',
                    path: pdfFile
                },
            ]
        });

        res.json(
            responsePayload(
                true,
                "Gửi mail thành công!",
                info
            )
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.sendEmailApproveReport = async (req, res) => {
    try {
        const receiver = req.body.receiver
        const title = req.body.title
        const content = req.body.content
        const pdfFile = req.body.pdfFile


        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: 'luonghoangquocbao@gmail.com',
                pass: 'fvlx vrkq jpru nozw'
            }
        });

        const info = await transporter.sendMail({
            from: 'Trường đại học cần thơ', // sender address
            to: receiver, // list of receivers
            subject: `${title}`, // Subject line
            // text: "Hello world?", // plain text body
            html: `
            <div>
            Gửi các chủ nhiệm đề tài nghiên cứu khoa học năm 2023!
            <div style="margin-left: 40px; margin-top: 20px; margin-bottom: 20px">
            ${content}           
             </div>
            <div>Chào thân ái.</div>
            <div>-------------------------------</div>
            <div>Lương Hoàng Quốc Bảo</div>
            </div>
               `,
            attachments: [
                {   // data uri as an attachment
                    filename: 'Quyet dinh phe duyet de tai.pdf',
                    path: pdfFile
                },
            ]
        });



        res.json(
            responsePayload(
                true,
                "Gửi mail thành công!",
                info
            )
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

