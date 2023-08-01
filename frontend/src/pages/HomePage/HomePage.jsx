import { Col, Modal, Row } from 'antd'
import './HomePage.scss'

const HomePage = () => {
    const info11 = () => {
        Modal.info({
            title: 'Phạm vi và đối tượng áp dụng',
            content: (
                <div style={{ marginLeft: -30 }}>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Quy định này áp dụng cho tổ chức, công chức, viên chức, người lao động, nghiên cứu
                        sinh, học viên cao học và sinh viên tham gia và thực hiện các nhiệm vụ khoa học và công
                        nghệ (KH&CN) do Trường Đại học Cần Thơ là cơ quan chủ quản hoặc chủ trì. Quy định này
                        chỉ áp dụng cho nhiệm vụ KH&CN trong nước và thông qua Nghị định thư.
                    </p>
                </div>
            ),
            width: 800,
            okText: 'Đã hiểu',
            onOk() { },
        });
    };
    const info12 = () => {
        Modal.info({
            title: 'Giải thích từ ngữ',
            content: (
                <div style={{ marginLeft: -30 }}>
                    <p>1. Đơn vị: Đơn vị trong quy định này là các khoa, viện, trung tâm, bộ môn và phòng ban
                        trực thuộc Trường, nơi có tổ chức và cá nhân tham gia hoặc thực hiện nhiệm vụ
                        KH&CN
                    </p>
                    <p>2. Nhiệm vụ KH&CN: Nhiệm vụ KH&CN trong quy định này bao gồm các đề tài, dự án
                        KH&CN, hội nghị, hội thảo, báo cáo chuyên đề khoa học (CĐKH) trong nước và nhiệm
                        vụ KH&CN theo Nghị định thư, không bao gồm các nhiệm vụ có yếu tố nước ngoài
                        khác.
                    </p>
                    <p>
                        3. Tổ chức: Tổ chức trong quy định này là bộ phận điều phối thực hiện nhiệm vụ
                        KH&CN.
                    </p>
                    <p>4. Cá nhân: Cá nhân trong quy định này là người chủ nhiệm hoặc tham gia thực hiện
                        nhiệm vụ KH&CN được giao bao gồm các công chức, viên chức, người lao động
                        nghiên cứu sinh, học viên cao học và sinh viên trong trường.
                    </p>
                    <p>5. Báo cáo chuyên đề khoa học (CĐKH) trong quy định này là sinh hoạt học thuật theo
                        lĩnh vực chuyên môn tại các đơn vị hoặc ở cấp trường hay còn gọi là báo cáo seminar.
                    </p>
                </div>
            ),
            width: 800,
            okText: 'Đã hiểu',
            onOk() { },
        });
    };
    const info13 = () => {
        Modal.info({
            title: 'Các loại nhiệm vụ KH&CN',
            content: (
                <div style={{ marginLeft: -30 }}>
                    <p>1. Nhiệm vụ KH&CN cấp Nhà nước: Do Bộ trưởng Bộ KH&CN trực tiếp phê duyệt và
                        giao cho cá nhân hoặc cơ quan chủ trì thực hiện.
                    </p>
                    <p>2. Nhiệm vụ KH&CN cấp Bộ: Do Bộ trưởng Bộ Giáo dục và Đào tạo (GD&ĐT) trực tiếp
                        phê duyệt và giao cho tổ chức, cá nhân thực hiện.
                    </p>
                    <p>
                        3. Nhiệm vụ KH&CN cấp Bộ ngành khác: Do Bộ trưởng tương ứng trực tiếp phê duyệt và
                        giao cho tổ chức, cá nhân thực hiện.
                    </p>
                    <p>4. Nhiệm vụ KH&CN thuộc Quỹ NAFOSTED: Do Giám đốc Quỹ Phát triển KH&CN
                        Quốc Gia (NAFOSTED) trực tiếp phê duyệt và giao cho tổ chức, cá nhân thực hiện
                    </p>
                    <p>5. Nhiệm vụ KH&CN cấp tỉnh: Bao gồm chương trình KH&CN; đề án khoa học cấp tỉnh;
                        đề tài KH&CN; dự án KH&CN; dự án sản xuất thử nghiệm; đề tài, dự án KH&CN tiềm
                        năng cấp tỉnh do các cơ quan cấp tỉnh quản lý và được Ủy ban Nhân dân cấp tỉnh phê
                        duyệt và giao cho tổ chức, cá nhân thực hiện.
                    </p>
                    <p>6. Nhiệm vụ KH&CN cấp cơ sở: Bao gồm các đề tài, dự án KH&CN cấp Trường (không
                        bao gồm luận văn, đồ án tốt nghiệp đại học) do Hiệu Trưởng phê duyệt giao cho tổ
                        chức, cá nhân (công chức, viên chức, người lao động, nghiên cứu sinh, học viên cao học
                        và sinh viên) thực hiện; nhiệm vụ KH&CN hợp tác với doanh nghiệp và địa phương
                        (không thuộc nhiệm vụ KH&CN cấp tỉnh) do các cơ sở sản xuất và địa phương chủ
                        quản.
                    </p>
                    <p>7. Nhiệm vụ KH&CN theo Nghị định thư: Nhiệm vụ KH&CN hợp tác quốc tế theo Nghị
                        định thư do Bộ trưởng Bộ KH&CN trực tiếp phê duyệt và giao cho cá nhân hoặc cơ quan
                        chủ trì thực hiện.
                    </p>
                    <p>8. Nhiệm vụ KH&CN khác: Hội nghị, hội thảo khoa học trong nước và quốc tế do tổ
                        chức, cá nhân tham dự hoặc tổ chức; báo cáo CĐKH cấp cơ sở hoặc cấp Trường do
                        Hiệu trưởng phê duyệt giao nhiệm vụ thực hiện.
                    </p>
                </div>
            ),
            width: 800,
            okText: 'Đã hiểu',
            onOk() { },
        });
    };
    const info14 = () => {
        Modal.info({
            title: 'Tiêu chuẩn chủ nhiệm nhiệm vụ KH&CN',
            content: (
                <div style={{ marginLeft: -30 }}>
                    <p>1. Nhiệm vụ KH&CN cấp Nhà nước, nhiệm vụ KH&CN theo Nghị định thư: Chủ nhiệm
                        là công chức, viên chức, người lao động có trình độ từ đại học trở lên, có chuyên môn
                        phù hợp, có các tiêu chí khác theo quy định của Thông tư liên quan và có khả năng tổ
                        chức thực hiện.
                    </p>
                    <p>2. Nhiệm vụ KH&CN cấp Bộ (Bộ GD&ĐT): Chủ nhiệm là công chức, viên chức, người
                        lao động có trình độ từ đại học trở lên, có chuyên môn phù hợp, có các tiêu chí khác
                        theo quy định của Thông tư liên quan và có khả năng tổ chức thực hiện.
                    </p>
                    <p>
                        3. Nhiệm vụ KH&CN cấp Bộ ngành khác, nhiệm vụ KH&CN thuộc Quỹ Phát triển
                        KH&CN quốc gia (gọi tắt là NAFOSTED): Theo các quy định của Bộ ngành liên quan
                        và Quỹ NAFOSTED.

                    </p>
                    <p>4. Nhiệm vụ KH&CN cấp tỉnh: Chủ nhiệm là công chức, viên chức, người lao động có
                        trình độ từ đại học trở lên, có chuyên môn hoặc vị trí công tác phù hợp và đáp ứng các
                        yêu cầu khác theo Thông tư liên quan đồng thời đang hoạt động trong cùng lĩnh vực
                        khoa học với nhiệm vụ trong 05 năm gần đây, tính đến thời điểm nộp hồ sơ.
                    </p>
                    <p>5. Nhiệm vụ KH&CN cấp cơ sở:
                        <br></br>
                        &nbsp;&nbsp;&nbsp; a. Đề tài, dự án KH&CN cấp Trường (tối đa gồm 5 thành viên, kể cả chủ nhiệm):
                        - Đề tài, dự án KH&CN do công chức, viên chức, người lao động thực hiện: Chủ
                        nhiệm có trình độ từ đại học trở lên (không bao gồm người có chức danh giáo
                        sư, phó giáo sư), có chuyên môn phù hợp và có khả năng tổ chức thực hiện đề
                        tài, dự án KH&CN.
                        - Đề tài, dự án KH&CN do sinh viên thực hiện: Chủ nhiệm là sinh viên (không
                        phân biệt năm học) có đủ trình độ và thuộc chuyên ngành phù hợp, có khả năng
                        tổ chức thực hiện đề tài, dự án KH&CN và có cán bộ hướng dẫn là công chức,
                        viên chức của Trường.
                        <br></br>
                        &nbsp;&nbsp;&nbsp;b. Nhiệm vụ KH&CN hợp tác với doanh nghiệp và địa phương (không thuộc nhiệm vụ
                        KH&CN cấp tỉnh): Chủ nhiệm có trình độ từ đại học trở lên, có chuyên môn phù hợp và có khả năng tổ chức thực hiện nhiệm vụ KH&CN.
                    </p>
                </div>
            ),
            width: 800,
            okText: 'Đã hiểu',
            onOk() { },
        });
    };
    const info15 = () => {
        Modal.info({
            title: 'Quyền hạn và trách nhiệm của cá nhân, đơn vị thực hiện nhiệm vụ KH&CN',
            content: (
                <div style={{ marginLeft: -30 }}>
                    <p>1. Được quyền lựa chọn và ký hợp đồng mời các thành viên và các cơ quan hữu quan tham
                        gia thực hiện nội dung nhiệm vụ KH&CN (trường hợp mời thành viên và cơ quan ngoài
                        Trường phải thông qua Trường và thực hiện thủ tục mời cấp Trường).

                    </p>
                    <p>2. Yêu cầu Trường và Bộ ngành liên quan cấp kinh phí đúng thời hạn và tạo điều kiện
                        thuận lợi trong việc sử dụng kinh phí đã được duyệt cấp cho nhiệm vụ KH&CN.
                    </p>
                    <p>
                        3. Yêu cầu Trường và Bộ ngành liên quan tổ chức đánh giá nghiệm thu sau khi đã nộp đủ
                        các hồ sơ nghiệm thu và sản phẩm theo quy định cụ thể của các cơ quan có thẩm quyền.
                    </p>
                    <p>4. Được quyền sử dụng các trang thiết bị theo quy định tại các phòng thí nghiệm trong
                        Trường.
                    </p>
                    <p>5. Trong cùng một thời gian, mỗi cán bộ chỉ được quyền làm chủ nhiệm 01 nhiệm vụ
                        KH&CN cấp Bộ của Bộ GD&ĐT, 01 nhiệm vụ KH&CN cấp Trường và nhiều nhiệm
                        vụ KH&CN khác. Cán bộ được quyền tham gia thêm nhiều nhiệm vụ KH&CN của các
                        Bộ ngành khác theo quy định của Bộ ngành.
                    </p>
                    <p>6. Chủ nhiệm có trách nhiệm thực hiện đầy đủ và đúng các quy định về tạm ứng, sử dụng
                        và thanh quyết toán kinh phí hàng năm, báo cáo tiến độ và nghiệm thu kết quả thực hiện
                        đúng thời hạn hợp đồng.
                    </p>
                    <p>7. Đơn vị tham dự hoặc tổ chức hội nghị, hội thảo các cấp phải thực hiện đầy đủ và đúng
                        các quy định về tạm ứng, sử dụng và thanh quyết toán kinh phí và thời gian đăng ký.
                    </p>
                    <p>8. Cá nhân và đơn vị tổ chức báo cáo CĐKH phải thực hiện nghiêm túc, đảm bảo chất
                        lượng và đúng các quy định theo hướng dẫn.
                    </p>
                </div>
            ),
            width: 800,
            okText: 'Đã hiểu',
            onOk() { },
        });
    };
    const info16 = () => {
        Modal.info({
            title: 'Nhiệm vụ của cá nhân, đơn vị trong việc thực hiện nhiệm vụ KH&CN',
            content: (
                <div style={{ marginLeft: -30 }}>
                    <p>1. Hội đồng Khoa học và Đào tạo (KH&ĐT) Trường có nhiệm vụ đề xuất định hướng
                        NCKH và xét chọn nhiệm vụ KH&CN các cấp để tư vấn cho Hiệu trưởng phê duyệt và
                        giao nhiệm vụ.
                    </p>
                    <p>2. Hội đồng đơn vị: Có nhiệm vụ tổ chức xét chọn và đề xuất các nhiệm vụ KH&CN cho
                        Hội đồng KH&ĐT Trường xét chọn giao nhiệm vụ.
                    </p>
                    <p>
                        3. Chủ nhiệm: Xây dựng thuyết minh; ký hợp đồng; tổ chức thực hiện; báo cáo tiến độ
                        triển khai; thực hiện thanh, quyết toán kinh phí; báo cáo kết quả thực hiện trước các Hội
                        đồng nghiệm thu và hoàn thành hồ sơ theo quy định.
                    </p>
                    <p>4. Phòng Quản lý Khoa học (QLKH): Có trách nhiệm xây dựng kế hoạch thực hiện các
                        nhiệm vụ KH&CN hàng năm. Quản lý và kiểm tra nội dung thực hiện các nhiệm vụ
                        KH&CN. Lập quyết định nghiệm thu cấp cơ sở các nhiệm vụ KH&CN cấp Bộ và tương
                        đương, lập quyết định nghiệm thu chính thức nhiệm vụ KH&CN cấp cơ sở. Phối hợp
                        với các phòng ban chức năng liên quan hướng dẫn và hỗ trợ chủ nhiệm thực hiện đúng
                        các quy định được ban hành.
                    </p>
                    <p>5. Phòng Tài Vụ (TV) và Phòng Quản trị Thiết bị (QTTB): Có trách nhiệm cấp kinh phí
                        đúng thời hạn và hỗ trợ chủ nhiệm lập dự toán, hoàn thành các thủ tục thanh quyết toán kinh phí thực hiện nhiệm vụ KH&CN và hướng dẫn các thủ tục mua sắm, sử dụng và
                        quản lý trang thiết bị theo các quy định, quy trình hiện hành.
                    </p>
                    <p>6. Ban Thẩm định dự toán kính phí thực hiện đề tài, dự án KH&CN: có nhiệm vụ xem xét
                        dự toán kinh phí của nhiệm vụ KH&CN các cấp được quy định tại các Quy định, Quy
                        chế và Thông tư của Bộ ngành và của Trường hiện hành; tư vấn cho Hội đồng KH&ĐT
                        Trường xét chọn và tuyển chọn các nhiệm vụ KH&CN.
                    </p>
                    <p>7. Các đơn vị có tập thể, cá nhân thực hiện nhiệm vụ KH&CN phải tổ chức trích thu tiền
                        điện và nước từ kinh phí thực hiện nhiệm vụ để đóng góp các khoản chi liên quan của
                        nhà trường.
                    </p>
                </div>
            ),
            width: 800,
            okText: 'Đã hiểu',
            onOk() { },
        });
    };
    const info17 = () => {
        Modal.info({
            title: 'Đăng ký nhiệm vụ KH&CN',
            content: (
                <div style={{ marginLeft: -30 }}>
                    <p>1. Các nhiệm vụ KH&CN được đăng ký theo thông báo của Phòng QLKH:
                        <br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;- Đối với nhiệm vụ KH&CN cấp Bộ của Bộ GD&ĐT được đăng ký trước tháng 3
                        của năm trước năm kế hoạch.
                        <br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;- Đối với nhiệm vụ KH&CN cấp cơ sở (tổ chức hội nghị, hội thảo, các hoạt động
                        tham dự hội nghị, hội thảo trong và ngoài nước và các nhiệm vụ khác không bao
                        gồm đề tài, dự án KH&CN) được đăng ký trước tháng 4 của năm trước năm kế
                        hoạch.
                        <br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;- Đối với nhiệm vụ KH&CN cấp cơ sở do sinh viên thực hiện (đề tài, dự án
                        KH&CN) được đăng ký trước tháng 3 của năm kế hoạch.
                        <br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;- Đối với nhiệm vụ KH&CN cấp cơ sở (đề tài, dự án KH&CN) do công chức, viên
                        chức, người lao động thực hiện được đăng ký trước tháng 10 của năm trước năm kế
                        hoạch.
                        <br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;- Các nhiệm vụ KH&CN khác, tùy vào yêu cầu của Trường, tuyển chọn của Bộ
                        ngành và địa phương sẽ có thông báo hướng dẫn riêng.
                    </p>
                    <p>2. Hội đồng đơn vị có trách nhiệm tổ chức xét/tuyển chọn và gởi hồ sơ đăng ký cho phòng
                        QLKH, theo các biểu mẫu quy định và hướng dẫn cụ thể cho từng loại nhiệm vụ
                        KH&CN.
                    </p>
                    <p>
                        3. Đăng ký báo cáo CĐKH được chia thành hai đợt đăng ký: tháng 12 cho đợt 01 và tháng
                        6 cho đợt 02 hằng năm theo hướng dẫn.
                    </p>
                </div>
            ),
            width: 800,
            okText: 'Đã hiểu',
            onOk() { },
        });
    };
    const info18 = () => {
        Modal.info({
            title: 'Xét chọn và tuyển chọn nhiệm vụ KH&CN',
            content: (
                <div style={{ marginLeft: -30 }}>
                    <p>1. Các nhiệm vụ KH&CN được xét chọn và tuyển chọn tại Hội đồng đơn vị.
                    </p>
                    <p>2. Hội đồng đơn vị xem xét thông qua danh mục đề xuất của đơn vị.
                    </p>
                    <p>
                        3. Đề tài, dự án KH&CN cấp Trường: Phòng QLKH và Tiểu ban Chuyên môn tổ chức cho
                        chủ nhiệm bảo vệ đề cương, Thường trực Hội đồng KH&ĐT Trường xét/tuyển chọn,
                        Ban Thẩm định kinh phí đề tài, dự án KH&CN thẩm định dự toán kinh phí thực hiện đề
                        tài, dự án KH&CN.
                    </p>
                    <p>4. Đề tài KH&CN cấp Bộ của Bộ GD&ĐT được giao cho Trường xác định danh mục đề
                        xuất và tuyển chọn đề tài qua các Hội đồng chuyên ngành tại Trường và gửi kết quả cho
                        Hội đồng của Bộ GD&ĐT thẩm định.
                    </p>
                    <p>5. Nhiệm vụ KH&CN hợp tác với doanh nghiệp và địa phương (không thuộc nhiệm vụ
                        KH&CN cấp tỉnh): Khi có yêu cầu, Thường trực Hội đồng KH&ĐT Trường sẽ đánh
                        giá, góp ý và xét duyệt đề cương trước khi gởi cho địa phương và doanh nghiệp tuyển
                        chọn.
                    </p>
                    <p>6. Nhiệm vụ KH&CN cấp tỉnh: Khi có yêu cầu, Thường trực Hội đồng KH&ĐT Trường
                        sẽ đánh giá, góp ý và xét duyệt đề cương trước khi gởi tỉnh tuyển chọn.
                    </p>
                    <p>7. Các nhiệm vụ KH&CN cấp Nhà nước, cấp Bộ ngành khác được các Bộ ngành tương
                        ứng tổ chức tuyển chọn.
                    </p>
                </div>
            ),
            width: 800,
            okText: 'Đã hiểu',
            onOk() { },
        });
    };
    const info19 = () => {
        Modal.info({
            title: 'Phê duyệt và giao nhiệm vụ KH&CN',
            content: (
                <div style={{ marginLeft: -30 }}>
                    <p>1. Các nhiệm vụ KH&CN cấp Nhà nước, cấp Bộ ngành khác, nhiệm vụ KH&CN theo
                        Nghị định thư và nhiệm vụ KH&CN của Bộ GD&ĐT không phải là đề tài: Nhà trường
                        xác lập hồ sơ nhiệm vụ được tuyển chọn gửi cho Bộ ngành phê duyệt.
                    </p>
                    <p>2. Đề tài KH&CN cấp Bộ của Bộ GD&ĐT: Phòng QLKH dựa vào Biên bản thẩm định
                        của Hội đồng thẩm định của Bộ GD&ĐT hỗ trợ các chủ nhiệm đề tài hoàn chỉnh Thuyết
                        minh và hồ sơ để gửi cho Bộ GD&ĐT phê duyệt và giao nhiệm vụ.
                    </p>
                    <p>
                        3. Nhiệm vụ KH&CN cấp tỉnh: Nhà trường xác lập hồ sơ nhiệm vụ được tuyển chọn gửi
                        cho tỉnh phê duyệt theo quy định của tỉnh chủ quản.
                    </p>
                    <p>4. Nhiệm vụ KH&CN cấp cơ sở:
                        <br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;- Đề tài, dự án KH&CN cấp Trường:
                        <br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ Đề tài, dự án KH&CN do công chức, viên chức, người lao động thực hiện: Hiệu
                        trưởng phê duyệt giao nhiệm vụ dựa trên kết quả xét/tuyển chọn của Hội đồng
                        KH&ĐT Trường, thẩm định của Ban Thẩm định kinh phí đề tài dự án KH&CN
                        và tham mưu của phòng QLKH.
                        <br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+  Đề tài, dự án KH&CN do nghiên cứu sinh, học viên cao học và sinh viên thực
                        hiện: Hiệu trưởng phê duyệt giao nhiệm vụ dựa trên kết quả xét/tuyển chọn của
                        Tiểu ban Chuyên môn, thẩm định của Ban Thẩm định kinh phí đề tài dự án
                        KH&CN và tham mưu của phòng QLKH.
                        <br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;- Nhiệm vụ KH&CN hợp tác với doanh nghiệp và địa phương (không thuộc nhiệm
                        vụ KH&CN cấp tỉnh): Nhà trường xác lập hồ sơ nhiệm vụ được tuyển chọn gửi
                        cho cho địa phương và doanh nghiệp phê duyệt.
                        <br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;- Báo cáo CĐKH: Các đơn vị đăng ký, mỗi đơn vị được phép tổ chức tối đa 40
                        chuyên đề trong năm, đối với số lượng đăng ký nhiều hơn, tùy trường hợp Ban
                        Giám hiệu sẽ xem xét phê duyệt giao nhiệm vụ.
                        <br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;- Hoạt động tham dự hội nghị, hội thảo trong và ngoài nước: Ban Giám hiệu phê
                        duyệt giao nhiệm vụ. Ưu tiên xét duyệt những trường hợp hội thảo trong và ngoài
                        nước có liên quan đến việc triển khai thực hiện đề tài, dự án KH&CN tại đơn vị
                        hoặc hội nghị, hội thảo có mời cá nhân báo cáo, tham luận.
                    </p>
                </div>
            ),
            width: 800,
            okText: 'Đã hiểu',
            onOk() { },
        });
    };
    const info20 = () => {
        Modal.info({
            title: 'Thực hiện nhiệm vụ KH&CN',
            content: (
                <div style={{ marginLeft: -30 }}>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tổ chức hoặc cá nhân được giao nhiệm vụ phải ký kết hợp đồng trước khi thực hiện.
                        Thời gian thực hiện nhiệm vụ KH&CN được tính theo năm tài chính, tính từ khi được phê
                        duyệt và được thể hiện trong thuyết minh và hợp đồng.
                    </p>
                    <p>1. Trong quá trình thực hiện, nếu có thay đổi so với thuyết minh đã được phê duyệt, chủ
                        nhiệm phải thực hiện các thủ tục theo quy định và phải thông qua phòng QLKH việc
                        thay đổi này.
                    </p>
                    <p>
                        2. Đối với hoạt động báo cáo CĐKH, báo cáo viên phải thực hiện đúng theo nội dung và
                        thời gian đã được Ban Giám hiệu phê duyệt giao nhiệm vụ.
                    </p>
                    <p>3. Đối với hội nghị, hội thảo của đơn vị hoặc cấp Trường đã được Trường phê duyệt phải
                        thực hiện theo đúng thời gian và nguồn kinh phí được phân giao.
                    </p>
                    <p>4. Tổ chức hoặc cá nhân được giao nhiệm vụ phải gởi báo cáo tiến độ thực hiện nhiệm vụ
                        KH&CN các cấp định kỳ 06 tháng/01 lần cho phòng QLKH theo mẫu quy định.
                    </p>
                    <p>5. Phòng QLKH định kỳ mỗi năm một lần (trong quý IV của năm) thành lập đoàn kiểm tra
                        hoạt động KH&CN các cấp thuộc phạm vi của quy định này đang được triển khai tại
                        các đơn vị.
                    </p>
                </div>
            ),
            width: 800,
            okText: 'Đã hiểu',
            onOk() { },
        });
    };
    const info21 = () => {
        Modal.info({
            title: 'Tổ chức nghiệm thu nhiệm vụ KH&CN được giao thực hiện',
            content: (
                <div style={{ marginLeft: -30 }}>
                    <p>1. Nhiệm vụ KH&CN cấp Nhà nước: Được đánh giá nghiệm thu cấp cơ sở và cấp nhà
                        nước theo Thông tư liên quan.
                    </p>
                    <p>
                        2. Nhiệm vụ KH&CN cấp Bộ của Bộ GD&ĐT: Được đánh giá nghiệm thu cấp cơ sở và
                        cấp Bộ theo các Thông tư và Quy định liên quan.
                    </p>
                    <p>3. Đề tài, dự án KH&CN cấp Trường: Được đánh giá nghiệm thu 01 lần chính thức. Hội
                        đồng nghiệm thu gồm 05 thành viên.
                    </p>
                    <p>4. Nhiệm vụ KH&CN cấp tỉnh được đánh giá nghiệm thu cấp cơ sở tại Trường theo quyết
                        định của Hiệu trưởng và sau đó được đánh giá nghiệm thu chính thức (cấp tỉnh) tại tỉnh
                        do UBND tỉnh chủ quản quy định.
                    </p>
                    <p>5. Các nhiệm vụ KH&CN khác tùy thuộc vào yêu cầu của cơ quan chủ quản các Hội đồng
                        nghiệm thu sẽ được thành lập.
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Ba tháng trước khi hết hạn thực hiện nhiệm vụ KH&CN, phòng QLKH có trách nhiệm
                        thông báo thời hạn kết thúc nhiệm vụ KH&CN cho đơn vị có tập thể và cá nhân tham gia
                        hoặc chủ nhiệm nhiệm vụ KH&CN.</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Chủ nhiệm gửi hồ sơ đề nghị nghiệm thu cấp cơ sở (đối với nhiệm vụ KH&CN cấp Bộ
                        trở lên) và nghiệm thu chính thức (đối với nhiệm vụ KH&CN cấp cơ sở) bao gồm:
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Đơn đề nghị đánh giá nghiệm thu và đề xuất danh sách Hội đồng nghiệm thu
                        cấp cơ sở (đối với nhiệm vụ KH&CN cấp Bộ trở lên) và Hội đồng nghiệm thu
                        chính thức (đối với nhiệm vụ KH&CN cấp cơ sở) đã thông qua sự phê duyệt
                        của đơn vị;</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Báo cáo tổng kết và báo cáo tóm tắt;</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Các sản phẩm theo Thuyết minh.</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Căn cứ trên hồ sơ và tư vấn của phòng QLKH, Hiệu trưởng ra Quyết định thành lập
                        Hội đồng nghiệm thu. Số thành viên Hội đồng gồm 5 (hoặc 7 thành viên) trở lên, gồm chủ
                        tịch, 2 phản biện, các ủy viên và thư ký khoa học. Trong đó có ít nhất 2 thành viên ngoài
                        Trường đối với đề tài cấp Trường, hoặc theo số lượng quy định của cơ quan chủ quản đối với
                        nhiệm vụ KH&CN cấp Bộ trở lên. Phòng QLKH sẽ đề cử người làm thư ký hành chính để hỗ
                        trợ hội đồng về các hồ sơ, thủ tục thực hiện. </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Trong vòng 30 ngày kể từ ngày ký Quyết định thành lập Hội đồng nghiệm thu, chủ
                        nhiệm có trách nhiệm tiến hành báo cáo nghiệm thu và hoàn thành thủ tục nghiệm thu trong
                        vòng 20 ngày kể từ ngày họp Hội đồng nghiệm thu. Phòng QLKH phối hợp với đơn vị có
                        trách nhiệm tổ chức nghiệm thu và chủ nhiệm hoàn thành hồ sơ theo quy định của cấp quản
                        lý gởi cho Phòng QLKH đúng thời hạn. Phòng QLKH có trách nhiệm thông tin và phối hợp
                        với chủ nhiệm đề tài, đơn vị có nhiệm vụ KH&CN và Trung Tâm Dịch vụ và Chuyển giao
                        Công nghệ (đơn vị đầu mối chuyển giao công nghệ và thương mại hóa sản phẩm) khai thác
                        kết quả NCKH của nhiệm vụ. </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Đối với nhiệm vụ KH&CN cấp Bộ trở lên, chủ nhiệm và đơn vị có trách nhiệm hoàn
                        thành hồ sơ theo quy định gửi cho phòng QLKH để đề nghị đánh giá nghiệm thu cấp Bộ/cấp
                        Nhà nước theo đúng quy định.</p>
                </div>
            ),
            width: 800,
            okText: 'Đã hiểu',
            onOk() { },
        });
    };
    const info22 = () => {
        Modal.info({
            title: 'Công nhận kết quả nghiên cứu khoa học',
            content: (
                <div style={{ marginLeft: -30 }}>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Các nhiệm vụ KH&CN không do Hội đồng KH&ĐT Trường tuyển chọn, do tổ chức
                        hoặc cá nhân thực hiện tạo ra các sản phẩm hoặc quy trình KHCN có giá trị khoa học, chủ
                        nhiệm đề tài có thể làm thủ tục đăng ký công nhận kết quả. Hồ sơ được lập theo nhiệm vụ
                        KH&CN cùng cấp đề nghị xét công nhận và gởi cho phòng QLKH.
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Phòng QLKH có trách nhiệm hướng dẫn chủ nhiệm hoàn thành thủ tục đăng ký xét
                        công nhận và cùng với Hội đồng đơn vị đề xuất danh sách Hội đồng nghiệm thu. Mọi chi phí
                        liên quan đến việc tổ chức xét công nhận do cá nhân chi trả theo mức nghiệm thu của nhiệm
                        vụ KH&CN cùng cấp được ban hành, riêng đề tài, dự án KH&CN cấp cơ sở nhà trường sẽ hỗ
                        trợ kinh phí nghiệm thu.
                    </p>
                </div>
            ),
            width: 800,
            okText: 'Đã hiểu',
            onOk() { },
        });
    };
    const info23 = () => {
        Modal.info({
            title: 'Kinh phí cho hoạt động xét chọn, tuyển chọn, thẩm định và nghiệm thu',
            content: (
                <div style={{ marginLeft: -30 }}>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Kinh phí cho hoạt động xét chọn, tuyển chọn, thẩm định kinh phí và nghiệm thu các
                        nhiệm vụ KH&CN của các Hội đồng do Trường tổ chức theo quy định được chi từ kinh phí
                        chi cho hoạt động KH&CN theo quy định hiện hành. Kinh phí chi cho hoạt động của các Hội
                        đồng nghiệm thu chính thức (nhiệm vụ KH&CN cấp cơ sở) và Hội đồng nghiệm thu cấp cơ
                        sở (nhiệm vụ KH&CN cấp Bộ trở lên) được chi từ kinh phí thực hiện nhiệm vụ KH&CN.
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Các nhiệm vụ KH&CN cấp Bộ của Bộ GD&ĐT và nhiệm vụ KH&CN cấp cơ sở áp
                        dụng định mức theo Thông tư liên tịch số 55/2015/TTLT-BTC-BKHCN ngày 22/04/2015 của
                        Bộ Tài chính và Bộ Khoa học và Công nghệ tại trường Đại học Cần Thơ và theo Quy chế chi
                        tiêu nội bộ (đối với nhiệm vụ KH&CN cấp cơ sở).
                    </p>
                    <p>
                        &nbsp;&nbsp;&nbsp;&nbsp;Các nhiệm vụ KH&CN khác thực hiện theo quy định của cơ quan chủ quản liên quan.
                    </p>
                </div>
            ),
            width: 800,
            okText: 'Đã hiểu',
            onOk() { },
        });
    };
    const info24 = () => {
        Modal.info({
            title: 'Định mức các khoản chi của nhiệm vụ KH&CN',
            content: (
                <div style={{ marginLeft: -30 }}>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Khoán chi được áp dụng theo Thông tư liên tịch số 93/2006/TTLT-BTC-BKHCN
                        ngày 04/10/2006 của Bộ Tài chính và Bộ Khoa học và Công nghệ và định mức chi theo
                        Thông tư liên tịch số 55/2015/TTLT-BTC-BKHCN ngày 22/04/2015 của Bộ Tài chính và Bộ
                        Khoa học và Công nghệ cho các đề tài, dự án KH&CN cấp Bộ hoặc tương đương cấp Bộ trở
                        lên; đề tài, dự án KH&CN cấp Trường khoán chi theo phụ lục của quy định này và theo Quy
                        chế chi tiêu nội bộ hiện hành của Trường.
                    </p>
                </div>
            ),
            width: 800,
            okText: 'Đã hiểu',
            onOk() { },
        });
    };
    const info25 = () => {
        Modal.info({
            title: 'Sử dụng và thanh toán kinh phí thực hiện nhiệm vụ KH&CN',
            content: (
                <div style={{ marginLeft: -30 }}>
                    <p>1. Tạm ứng và sử dụng kinh phí: Chủ nhiệm được tạm ứng kinh phí nhiều đợt. Để được
                        cấp kinh phí lần tiếp theo, chủ nhiệm phải có báo cáo tiến độ thực hiện nhiệm vụ
                        KH&CN và số kinh phí được cấp lần ngay trước đó đã sử dụng còn lại không vượt quá
                        20%. Định mức kinh phí thanh toán được thực hiện theo quy định tại phụ lục của quy
                        định này. Chủ nhiệm có quyền tự cân đối kinh phí sử dụng trong nhóm chi được giao
                        khoán, nếu chênh lệch không vượt quá 10% giữa các nội dung chi trong nhóm giao
                        khoán so với dự toán kinh phí. Khi mức chênh lệch trên 10% phải làm lại dự toán để
                        được xét duyệt lại.
                    </p>
                    <p>2. Thanh, quyết toán kinh phí thực hiện nhiệm vụ KH&CN theo Thông tư liên tịch số
                        93/2006/TTLT-BTC-BKHCN ngày 04/10/2006 của Bộ Tài chính và Bộ Khoa học và
                        Công nghệ. Quyết toán hàng năm theo niên độ ngân sách, tổng hợp lũy kế quyết toán từ
                        năm đầu thực hiện nhiệm vụ KH&CN.
                    </p>
                </div>
            ),
            width: 800,
            okText: 'Đã hiểu',
            onOk() { },
        });
    };
    const info26 = () => {
        Modal.info({
            title: 'Quy định về quản lý phí nhiệm vụ KH&CN',
            content: (
                <div style={{ marginLeft: -30 }}>
                    <p>1. Mỗi nhiệm vụ KH&CN phải dự toán hoặc trích chi quản lý phí:</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;a. Nhiệm vụ KH&CN cấp tỉnh, nhiệm vụ KH&CN hợp tác với địa phương hoặc doanh
                        nghiệp: 3% trên tổng giá trị thực hiện nhiệm vụ KH&CN.</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;b. Nhiệm vụ KH&CN cấp cơ sở, cấp Bộ và cấp Nhà nước: áp dụng Thông tư Liên tịch
                        số 55/2015/TTLT-BTC-BKHCN ngày 22/04/2015 của Bộ Tài chính và Bộ Khoa học
                        và Công nghệ và theo quy định của Trường Đại học Cần Thơ (cụ thể nêu trong phụ
                        lục đính kèm).</p>

                    <p>2. Nội dung sử dụng quản lý phí nhiệm vụ KH&CN</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Quản lý phí nhiệm vụ KH&CN được sử dụng chi các khoản chi phí hành chính và các
                        hoạt động liên quan đảm bảo triển khai nhiệm vụ KH&CN của nhà trường do hiệu trưởng phê</p>
                </div>
            ),
            width: 800,
            okText: 'Đã hiểu',
            onOk() { },
        });
    }
    const info27 = () => {
        Modal.info({
            title: 'Quy định về cơ sở vật chất thực hiện nhiệm vụ KH&CN',
            content: (
                <div style={{ marginLeft: -30 }}>
                    <p>1. Chủ nhiệm được quyền đăng ký sử dụng các trang thiết bị tại các phòng thí nghiệm của
                        các đơn vị trong Trường và thực hiện theo “Quy định về tổ chức, quản lý và sử dụng
                        phòng thí nghiệm, phòng thực hành”.
                    </p>
                    <p>2. Quản lý và mua sắm các trang thiết bị thực hiện nhiệm vụ KH&CN được thực hiện theo
                        “Quy định về quản lý tài sản cố định, tài sản công cụ và vật liệu trong Trường; Quy
                        trình tiếp nhận hàng viện trợ; Trình tự thủ tục mua sắm, bảo dưỡng sửa chữa, điều động
                        và thanh lý tài sản cố định, tài sản công cụ trong Trường” hiện hành.
                    </p>
                </div>
            ),
            width: 800,
            okText: 'Đã hiểu',
            onOk() { },
        });
    };
    const info28 = () => {
        Modal.info({
            title: 'Khen thưởng và quyền lợi của cá nhân thực hiện nhiệm vụ KH&CN',
            content: (
                <div style={{ marginLeft: -30 }}>
                    <p>1. Khen thưởng:</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Tổ chức hoặc cá nhân thực hiện nhiệm vụ KH&CN đạt kết quả tốt, được ứng dụng vào
                        sản xuất, chuyển giao công nghệ, mang lại hiệu quả cao cho sự phát triển kinh tế - xã
                        hội và phát triển Trường, ngoài tác quyền được hưởng sẽ được xem xét khen thưởng
                        cấp Trường hoặc trình Bộ trưởng Bộ GD&ĐT khen thưởng.</p>
                    <p>2. Quyền lợi:</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Chủ nhiệm sau khi hoàn thành nhiệm vụ KH&CN sẽ được hưởng các quyền lợi sau:</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;- &nbsp;&nbsp;&nbsp;&nbsp;Nhiệm vụ KH&CN được quy thành giờ chuẩn (giờ G) công tác chuyên môn (thực
                        hiện theo Quy định về quản lý công tác chuyên môn đối với giảng viên của
                        Trường Đại học Cần Thơ). Riêng đối với nhiệm vụ KH&CN cấp tỉnh, nhiệm vụ
                        KH&CN hợp tác với địa phương/doanh nghiệp chủ nhiệm chỉ được kê khai giờ
                        công tác chuyên môn khi Trường là cơ quan chủ trì (Trường hợp đơn vị trực thuộc
                        Trường hoặc cơ quan khác ngoài Trường đứng tên chủ trì và công chức, viên chức
                        của Trường là chủ nhiệm thì nhiệm vụ KH&CN sẽ không được quy chuẩn thành
                        giờ công tác chuyên môn).
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;- &nbsp;&nbsp;&nbsp;&nbsp;Được tích lũy điểm công trình theo quy định của Hội đồng Chức danh Giáo sư
                        Nhà nước, và được tính giờ chuẩn (giờ G) cho mỗi bài báo theo quy định về Quản
                        lý công tác chuyên môn đối với đối với giảng viên Trường Đại học Cần Thơ.
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;- &nbsp;&nbsp;&nbsp;&nbsp;Được ưu tiên xem xét nâng lương sớm trước thời hạn nếu hội đủ các điều kiện
                        khác liên quan (theo quy định xét nâng lương hàng năm của Bộ và Trường).
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;- &nbsp;&nbsp;&nbsp;&nbsp;Được hưởng thù lao bản quyền từ các sản phẩm của công trình NCKH theo Quy
                        định “Về chế độ tài chính cho hoạt động sở hữu trí tuệ” và “Về khai thác thương
                        mại các tài sản trí tuệ và thực thi quyền sở hữu trí tuệ” trong Trường Đại học Cần
                        Thơ hiện hành.
                    </p>
                </div>
            ),
            width: 800,
            okText: 'Đã hiểu',
            onOk() { },
        });
    };
    const info29 = () => {
        Modal.info({
            title: 'Xử lý trễ hạn và vi phạm hợp đồng thực hiện nhiệm vụ KH&CN',
            content: (
                <div style={{ marginLeft: -30 }}>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Chủ nhiệm thực hiện nhiệm vụ KH&CN cấp cơ sở và cấp Bộ không hoàn thành nhiệm
                        vụ được giao theo thuyết minh đề tài và hợp đồng, trễ hạn quá 06 tháng và không có lý do sẽ
                        bị xử lý theo hình thức thanh lý và phải bồi hoàn kinh phí được cấp cụ thể như sau:
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;+ &nbsp;&nbsp;&nbsp;&nbsp;Thu hồi toàn bộ kinh phí chưa sử dụng tính tại thời điểm quá hạn;</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;+ &nbsp;&nbsp;&nbsp;&nbsp;Nộp phạt tối thiểu 30% (do nguyên nhân chủ quan) và tối đa 10% (do nguyên nhân
                        khách quan) của phần kinh phí NSNN đã sử dụng.</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Đối với các nhiệm vụ KH&CN chậm trễ có lý do, chủ nhiệm phải làm báo cáo gửi cho
                        phòng QLKH 01 tháng trước thời hạn kết thúc, nếu sau thời gian này không có báo cáo xem
                        như trễ hạn không có lý do.
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Chủ nhiệm thực hiện nhiệm vụ KH&CN cấp tỉnh, hoặc nhiệm vụ KH&CN hợp tác với
                        địa phương/doanh nghiệp không hoàn thành nhiệm vụ được giao theo thuyết minh và hợp
                        đồng, trễ hạn không được sự chấp thuận của cơ quan chủ quản sẽ bị xử lý theo quy định hiện
                        hành của cơ quan chủ quản. Trường ĐHCT với tư cách là cơ quan chủ trì chịu trách nhiệm
                        phối hợp xử lý.
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Chủ nhiệm nhiệm vụ KH&CN khác không hoàn thành nhiệm vụ theo thuyết minh và
                        hợp đồng, sẽ bị xử lý theo quy định của Bộ ngành chủ quản và nhà nước hiện hành.
                    </p>
                </div>
            ),
            width: 800,
            okText: 'Đã hiểu',
            onOk() { },
        });
    };
    const info30 = () => {
        Modal.info({
            title: 'Xử lý các trường hợp không hoàn thành nhiệm vụ KH&CN hoặc không chấphành quy định ban hành',
            content: (
                <div style={{ marginLeft: -30 }}>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Trường hợp không hoàn thành nhiệm vụ KH&CN (nhiệm vụ KH&CN không được
                        nghiệm thu, phải thanh lý) do các nguyên nhân chủ quan sẽ không được giao nhiệm vụ
                        KH&CN các cấp ít nhất trong 01 năm tiếp theo.
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Đối với các cá nhân không chấp hành đúng “Quy định Quản lý nhiệm vụ khoa học và
                        công nghệ Trường Đại học Cần Thơ” sẽ bị xử lý tùy theo mức độ vi phạm, ảnh hưởng và
                        không được giao vị trí chủ nhiệm thực hiện nhiệm vụ KH&CN các cấp ít nhất trong thời gian
                        03 năm.</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Đối với hoạt động báo cáo CĐKH, báo cáo viên không thực hiện đúng nội dung và
                        thời gian đăng ký đã được Ban Giám hiệu phê duyệt sẽ bị xử lý tùy theo mức độ và không
                        được tham gia đăng ký ở đợt tiếp theo.</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Trường hợp hội nghị, hội thảo đã được phê duyệt không thực hiện trong năm kế hoạch
                        sẽ không được xem xét và chuyển đổi kinh phí ở năm tiếp theo.
                    </p>
                </div>
            ),
            width: 800,
            okText: 'Đã hiểu',
            onOk() { },
        });
    };
    const info31 = () => {
        Modal.info({
            title: 'Hiệu lực thực hiện Quy định',
            content: (
                <div style={{ marginLeft: -30 }}>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Quy định này có hiệu lực thi hành kể từ ngày ký Quyết định ban hành và thay thế cho
                        Quyết định số 1678/QĐ-ĐHCT-QLKH ngày 13/11/2008 của Hiệu trưởng Trường Đại học
                        Cần Thơ ban hành “Quy định Quản lý đề tài NCKH và CGCN Trường Đại học Cần Thơ”.
                        Đối với các nhiệm vụ KH&CN đã được phê duyệt thuyết minh và dự toán trước ngày Quy
                        định này có hiệu lực, thì tiếp tục thực hiện theo dự toán đã được phê duyệt.
                    </p>
                </div>
            ),
            width: 800,
            okText: 'Đã hiểu',
            onOk() { },
        });
    };

    return (
        <div style={{ backgroundColor: '#efefef', marginLeft: -8, marginRight: -8, marginTop: 8 }}>
            <div className="homepage-page">
                <Row>
                    <Col span={5}></Col>
                    <Col span={14} style={{ height: '100%', backgroundColor: 'white', borderRadius: 10, padding: 15, fontSize: 14 }}>
                        <div>
                            <h3>NGHIÊN CỨU KHOA HỌC LÀ GÌ ?</h3>
                            <span>Nghiên cứu khoa học là một hoạt động xã hội, hướng vào việc tìm kiếm những điều mà khoa học chưa biết: hoặc là phát hiện bản chất sự vật, phát triển nhận thức khoa học về thế giới; hoặc là sáng tạo phương pháp mới và phương tiện kĩ thuật mới.</span>
                            <br></br>
                            <br></br>
                            <span>Hoạt động nghiên cứu khoa học ở Đại học Cần Thơ nói chung và Trường Công nghệ thông tin và Truyền thông nói riêng nhằm giúp sinh viên phát triển tư duy, tìm tỏi, học hỏi và vận dụng để tạo ra những đề tài mang tính sáng tạo, thực tiễn. Đề tài nghiên cứu khoa học ở Trường Công nghệ thông tin và Truyền thông có thể thuộc về nhiều lĩnh vực như web, máy học, trí tuệ nhân tạo, lập trình nhúng, IOT,...</span>
                            <h3>QUY ĐỊNH QUẢN LÝ NHIỆM VỤ KHOA HỌC VÀ CÔNG NGHỆ TRƯỜNG ĐẠI HỌC CẦN THƠ</h3>
                            <h4>1. QUY ĐỊNH CHUNG</h4>
                            <ul>
                                <li onClick={info11}><a>Phạm vi và đối tượng áp dụng</a></li>
                                <li onClick={info12}><a>Giải thích từ ngữ</a></li>
                                <li onClick={info13}><a>Các loại nhiệm vụ KH&CN</a></li>
                                <li onClick={info14}><a>Tiêu chuẩn chủ nhiệm nhiệm vụ KH&CN</a></li>
                                <li onClick={info15}><a>Quyền hạn và trách nhiệm của cá nhân, đơn vị thực hiện nhiệm vụ KH&CN</a></li>
                                <li onClick={info16}><a>Nhiệm vụ của cá nhân, đơn vị trong việc thực hiện nhiệm vụ KH&CN</a></li>
                            </ul>
                            <h4>2. ĐĂNG KÝ, TUYỂN CHỌN VÀ THỰC HIỆN NHIỆM VỤ KHOA HỌC VÀ CÔNG NGHÊ</h4>
                            <ul>
                                <li onClick={info17}><a>Đăng ký nhiệm vụ KH&CN </a></li>
                                <li onClick={info18}><a>Xét chọn và tuyển chọn nhiệm vụ KH&CN </a></li>
                                <li onClick={info19}><a>Phê duyệt và giao nhiệm vụ KH&CN </a></li>
                                <li onClick={info20}><a>Thực hiện nhiệm vụ KH&CN</a></li>
                            </ul>
                            <h4>3. TỔ CHỨC NGHIỆM THU CÔNG NHẬN KẾT QUẢ THỰC HIỆN NHIỆM VỤ KHOA HỌC VÀ CÔNG NGHÊ</h4>
                            <ul>
                                <li onClick={info21}><a>Tổ chức nghiệm thu nhiệm vụ KH&CN được giao thực hiện</a></li>
                                <li onClick={info22}><a>Công nhận kết quả nghiên cứu khoa học</a></li>
                            </ul>
                            <h4>4. KINH PHÍ VÀ CƠ SỞ VẬT CHẤT THỰC HIỆN NHIỆM VỤ KHOA HỌC VÀ CÔNG NGHÊ</h4>
                            <ul>
                                <li onClick={info23}><a>Kinh phí cho hoạt động xét chọn, tuyển chọn, thẩm định và nghiệm thu</a></li>
                                <li onClick={info24}><a>Định mức các khoản chi của nhiệm vụ KH&CN</a></li>
                                <li onClick={info25}><a>Sử dụng và thanh toán kinh phí thực hiện nhiệm vụ KH&CN</a></li>
                                <li onClick={info26}><a>Quy định về quản lý phí nhiệm vụ KH&CN</a></li>
                                <li onClick={info27}><a>Quy định về cơ sở vật chất thực hiện nhiệm vụ KH&CN</a></li>
                            </ul>
                            <h4>5. KHEN THƯỞNG VÀ XỬ LÝ VI PHẠM</h4>
                            <ul>
                                <li onClick={info28}><a>Khen thưởng và quyền lợi của cá nhân thực hiện nhiệm vụ KH&CN</a></li>
                                <li onClick={info29}><a>Xử lý trễ hạn và vi phạm hợp đồng thực hiện nhiệm vụ KH&CN</a></li>
                                <li onClick={info30}><a>Xử lý các trường hợp không hoàn thành nhiệm vụ KH&CN hoặc không chấp hành quy định ban hành</a></li>
                            </ul>
                            <h4>6. ĐIỀU KHOẢN THI HÀNH</h4>
                            <ul>
                                <li onClick={info31}><a>Hiệu lực thực hiện Quy định</a></li>
                            </ul>
                        </div>
                    </Col>
                    <Col span={5}>

                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default HomePage