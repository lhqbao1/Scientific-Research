-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th8 22, 2023 lúc 09:47 AM
-- Phiên bản máy phục vụ: 10.4.24-MariaDB
-- Phiên bản PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `scientific_research`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `advisors`
--

CREATE TABLE `advisors` (
  `advisor_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `advisor_name` text NOT NULL,
  `major_id` int(11) NOT NULL,
  `advisor_degree` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `defense`
--

CREATE TABLE `defense` (
  `defense_id` int(11) NOT NULL,
  `registration_id` int(11) NOT NULL,
  `report_document` text NOT NULL,
  `request_document` text NOT NULL,
  `decision` text NOT NULL,
  `evaluation` text NOT NULL,
  `defense_coucil_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `defenserequest`
--

CREATE TABLE `defenserequest` (
  `request_id` int(11) NOT NULL,
  `registration_id` int(11) NOT NULL,
  `request_document` text NOT NULL,
  `request_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `invoiceitems`
--

CREATE TABLE `invoiceitems` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `total` float DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `invoiceId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `invoices`
--

CREATE TABLE `invoices` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `total` float DEFAULT NULL,
  `subTotal` float DEFAULT NULL,
  `totalPaid` float DEFAULT NULL,
  `status` varchar(255) DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lecturers`
--

CREATE TABLE `lecturers` (
  `lecturer_id` int(11) NOT NULL,
  `lecturer_name` text NOT NULL,
  `position` text NOT NULL,
  `degree` text NOT NULL,
  `email` text NOT NULL,
  `work_place_id` varchar(11) NOT NULL,
  `topic_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `lecturers`
--

INSERT INTO `lecturers` (`lecturer_id`, `lecturer_name`, `position`, `degree`, `email`, `work_place_id`, `topic_id`) VALUES
(8, 'Tran xuan Anh', 'pos1', 'de 1', 'tranxuananh@gmail.com', 'CNTT', 1),
(9, 'Nguyen Van B', 'Professor', 'Ph.D.', 'nguyenvanbsd@example.com', 'CNTT', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `major`
--

CREATE TABLE `major` (
  `major_id` int(11) NOT NULL,
  `major_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `major`
--

INSERT INTO `major` (`major_id`, `major_name`) VALUES
(1, 'Information and Technology High Quality'),
(2, 'International Bussiness High Quality');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `meetingschedule`
--

CREATE TABLE `meetingschedule` (
  `schedule_id` int(11) NOT NULL,
  `defense_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `categoryCode` varchar(255) DEFAULT NULL,
  `subCategoryCode` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `price` float DEFAULT 0,
  `quantity` int(11) DEFAULT 0,
  `size` varchar(255) DEFAULT 'small',
  `material` varchar(255) DEFAULT NULL,
  `event` varchar(255) DEFAULT NULL,
  `style` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `rate` float DEFAULT NULL,
  `status` varchar(255) DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `productsaveds`
--

CREATE TABLE `productsaveds` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `rattings`
--

CREATE TABLE `rattings` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `rating` int(11) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `registrations`
--

CREATE TABLE `registrations` (
  `registration_id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `group_info` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `roles`
--

CREATE TABLE `roles` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `roleCode` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `roles`
--

INSERT INTO `roles` (`id`, `name`, `roleCode`, `createdAt`, `updatedAt`) VALUES
('37dcfe4d-c74a-469b-9a25-61961e568ce1', 'student', 'student', '2023-06-24 01:06:31', '2023-06-24 01:06:31'),
('401fee95-3ff9-11ee-a609-7c10c9849ff6', 'lecturer', 'lecturer', '2023-08-21 10:03:34', '2023-08-21 10:03:34'),
('516385d8-3c2d-11ee-bbca-2cf05dd63cb7', 'student', 'student', '2023-08-16 14:06:17', '2023-08-16 14:06:17'),
('82705bfa-cede-46e4-afca-5541b6068671', 'Admin', 'admin', '2023-06-24 01:06:31', '2023-06-24 01:06:31');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `students`
--

CREATE TABLE `students` (
  `student_id` int(11) NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `class` text NOT NULL,
  `student_name` text NOT NULL,
  `grade` text NOT NULL,
  `major_id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `student_code` int(11) NOT NULL,
  `email` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `students`
--

INSERT INTO `students` (`student_id`, `user_id`, `class`, `student_name`, `grade`, `major_id`, `topic_id`, `student_code`, `email`) VALUES
(1, 'b0204010-746e-4ccf-93b6-2dc81028ff87', 'Class A', 'Tran Van Cuong edit', 'K45', 1, 1, 34213, 'tranvancuong@gmail.com'),
(2, 'b0204010-746e-4ccf-93b6-2dc81028ff87', 'Class A', 'Tran Van Tung', 'K45', 1, 1, 34215, 'tranvantung@gmail.com'),
(3, 'b8d3ffa6-93a5-4de2-8987-0ce569b77ec7', 'Class A', 'Tran Van Test', 'K45', 1, 1, 423232, 'a1@gmail.com'),
(4, 'b8d3ffa6-93a5-4de2-8987-0ce569b77ec7', 'Class A', 'Tran Van Test2', 'K45', 1, 1, 2131232, 'a2@gmail.com'),
(6, 'b8d3ffa6-93a5-4de2-8987-0ce569b77ec7', 'Class A', 'Tran Van Test4', 'K45', 1, 1, 5232, 'a3@gmail.com'),
(7, 'b8d3ffa6-93a5-4de2-8987-0ce569b77ec7', 'Class A', 'Tran Van Test5', 'K45', 1, 1, 12322, 'a6@gmail.com'),
(8, 'b8d3ffa6-93a5-4de2-8987-0ce569b77ec7', 'Class A', 'Tran Van Test6', 'K45', 1, 1, 12312312, 'a5@gmail.com'),
(11, 'b0204010-746e-4ccf-93b6-2dc81028ff87', '', 'Tran Van Thang', 'K45', 1, 1, 34212, 'tranvanthang@gmail.com'),
(12, 'b0204010-746e-4ccf-93b6-2dc81028ff87', '', 'Tran Van Tuong', 'K45', 1, 1, 342121, 'tranvantuong@gmail.com');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thesis`
--

CREATE TABLE `thesis` (
  `thesis_id` int(11) NOT NULL,
  `registration_id` int(11) NOT NULL,
  `submission_date` date NOT NULL,
  `thesis_document` text NOT NULL,
  `thesis_council_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thesisreports`
--

CREATE TABLE `thesisreports` (
  `report_id` int(11) NOT NULL,
  `registration_id` int(11) NOT NULL,
  `report_document` text NOT NULL,
  `report_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `topics`
--

CREATE TABLE `topics` (
  `topic_id` int(11) NOT NULL,
  `topic_name` text NOT NULL,
  `research_area` text NOT NULL,
  `basic_description` text NOT NULL,
  `topic_code` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `topics`
--

INSERT INTO `topics` (`topic_id`, `topic_name`, `research_area`, `basic_description`, `topic_code`) VALUES
(1, 'Scientific Research', 'research', 'researchresearchresearchresearch', NULL),
(2, 'Scientific Research', 'Scientific ResearchScientific ResearchScientific Research', 'Scientific ResearchScientific ResearchScientific ResearchScientific Research', NULL),
(3, 'Scientific Research 2', 'Scientific Research 2Scientific Research 2', 'Scientific Research 2Scientific Research 2Scientific Research 2', NULL),
(4, '\"q1\"', '\"q1 q1\"', '\"q1 q1 q1\"', NULL),
(5, '\"q1\"', '\"q1 q1\"', '\"q1 q1 q1\"', NULL),
(6, 'a', 'b', 'c', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `createdAt`, `updatedAt`, `roleId`) VALUES
('75d1415b-8748-4325-a4ec-caecb1348c24', 'bao@gmail.com', '$2a$08$HCgOoMEV04CvQ5FcOmsw4ud0LnxxnCE/AuBek3ckvNebLMtYErsE.', '2023-08-22 06:18:51', '2023-08-22 06:18:51', '37dcfe4d-c74a-469b-9a25-61961e568ce1'),
('b0204010-746e-4ccf-93b6-2dc81028ff87', 'quocdai072@gmail.com', '$2a$08$SqMUiWE6nZeLsf97agjReuEjf.IgpjiC6xQ70Y6uX4zk7ZCc0LBQe', '2023-07-05 03:12:29', '2023-07-05 03:13:07', '37dcfe4d-c74a-469b-9a25-61961e568ce1'),
('b1d949fb-1365-42fb-a5be-d3f7024a30d7', 'devcuongbui2@gmail.com', '$2a$08$miF/mV9d3w7oN/sixl5EIOwZV01W/pH9Jp9B6r.DHRUsDm.8/E9f6', '2023-08-21 08:03:48', '2023-08-21 08:03:48', '401fee95-3ff9-11ee-a609-7c10c9849ff6'),
('b8d3ffa6-93a5-4de2-8987-0ce569b77ec7', 'devcuongbui1@gmail.com', '$2a$08$ketnf96siz8UJPyFh8rZLOXA15sJyJvYcEIz60fUe0DKmBT6cykQu', '2023-07-06 08:53:28', '2023-07-06 08:53:28', '37dcfe4d-c74a-469b-9a25-61961e568ce1'),
('fd454667-9ff6-4834-83dc-28a2f5b8fd85', 'admin@gmail.com', '$2a$08$Hlr.fi/nQWGKFxdS5PtG8.AaiXaSqRMgfJwcSoebkdxowAb.0cHBK', '2023-08-22 06:18:33', '2023-08-22 06:18:33', '82705bfa-cede-46e4-afca-5541b6068671');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `workplace`
--

CREATE TABLE `workplace` (
  `id` varchar(11) NOT NULL,
  `workplace_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `workplace`
--

INSERT INTO `workplace` (`id`, `workplace_name`) VALUES
('CNPM', 'Khoa công nghệ phần mềm'),
('CNTT', 'Công nghệ thông tin'),
('KTVT', 'Kinh tế vận tải');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `advisors`
--
ALTER TABLE `advisors`
  ADD PRIMARY KEY (`advisor_id`),
  ADD KEY `FK_Advisor_major` (`major_id`),
  ADD KEY `FK_Advisor_topic` (`topic_id`);

--
-- Chỉ mục cho bảng `defense`
--
ALTER TABLE `defense`
  ADD PRIMARY KEY (`defense_id`),
  ADD KEY `FK_defense_res` (`registration_id`);

--
-- Chỉ mục cho bảng `defenserequest`
--
ALTER TABLE `defenserequest`
  ADD PRIMARY KEY (`request_id`),
  ADD KEY `FK_res_defen` (`registration_id`);

--
-- Chỉ mục cho bảng `invoiceitems`
--
ALTER TABLE `invoiceitems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoiceId` (`invoiceId`),
  ADD KEY `productId` (`productId`);

--
-- Chỉ mục cho bảng `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Chỉ mục cho bảng `lecturers`
--
ALTER TABLE `lecturers`
  ADD PRIMARY KEY (`lecturer_id`),
  ADD KEY `FK_topic_lecturer` (`topic_id`),
  ADD KEY `FK_lec_wp` (`work_place_id`);

--
-- Chỉ mục cho bảng `major`
--
ALTER TABLE `major`
  ADD PRIMARY KEY (`major_id`);

--
-- Chỉ mục cho bảng `meetingschedule`
--
ALTER TABLE `meetingschedule`
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `fk_defense_sche` (`defense_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `productsaveds`
--
ALTER TABLE `productsaveds`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `productId` (`productId`);

--
-- Chỉ mục cho bảng `rattings`
--
ALTER TABLE `rattings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`),
  ADD KEY `userId` (`userId`);

--
-- Chỉ mục cho bảng `registrations`
--
ALTER TABLE `registrations`
  ADD PRIMARY KEY (`registration_id`),
  ADD KEY `FK_topic_res` (`topic_id`);

--
-- Chỉ mục cho bảng `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`),
  ADD UNIQUE KEY `student_code` (`student_code`),
  ADD UNIQUE KEY `student_email` (`email`) USING HASH,
  ADD KEY `FK_student_user_2` (`user_id`),
  ADD KEY `FK_student_major` (`major_id`),
  ADD KEY `FK_student_topic` (`topic_id`);

--
-- Chỉ mục cho bảng `thesis`
--
ALTER TABLE `thesis`
  ADD PRIMARY KEY (`thesis_id`),
  ADD KEY `FK_thesis_res` (`registration_id`);

--
-- Chỉ mục cho bảng `thesisreports`
--
ALTER TABLE `thesisreports`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `FK_thesisrp_res` (`registration_id`);

--
-- Chỉ mục cho bảng `topics`
--
ALTER TABLE `topics`
  ADD PRIMARY KEY (`topic_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roleId` (`roleId`);

--
-- Chỉ mục cho bảng `workplace`
--
ALTER TABLE `workplace`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `advisors`
--
ALTER TABLE `advisors`
  MODIFY `advisor_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `defense`
--
ALTER TABLE `defense`
  MODIFY `defense_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `defenserequest`
--
ALTER TABLE `defenserequest`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `lecturers`
--
ALTER TABLE `lecturers`
  MODIFY `lecturer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `major`
--
ALTER TABLE `major`
  MODIFY `major_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `meetingschedule`
--
ALTER TABLE `meetingschedule`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `registrations`
--
ALTER TABLE `registrations`
  MODIFY `registration_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `thesis`
--
ALTER TABLE `thesis`
  MODIFY `thesis_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `thesisreports`
--
ALTER TABLE `thesisreports`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `topics`
--
ALTER TABLE `topics`
  MODIFY `topic_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `advisors`
--
ALTER TABLE `advisors`
  ADD CONSTRAINT `FK_Advisor_major` FOREIGN KEY (`major_id`) REFERENCES `major` (`major_id`),
  ADD CONSTRAINT `FK_Advisor_topic` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`topic_id`);

--
-- Các ràng buộc cho bảng `defense`
--
ALTER TABLE `defense`
  ADD CONSTRAINT `FK_defense_res` FOREIGN KEY (`registration_id`) REFERENCES `registrations` (`registration_id`);

--
-- Các ràng buộc cho bảng `defenserequest`
--
ALTER TABLE `defenserequest`
  ADD CONSTRAINT `FK_res_defen` FOREIGN KEY (`registration_id`) REFERENCES `registrations` (`registration_id`);

--
-- Các ràng buộc cho bảng `invoiceitems`
--
ALTER TABLE `invoiceitems`
  ADD CONSTRAINT `invoiceitems_ibfk_1` FOREIGN KEY (`invoiceId`) REFERENCES `invoices` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `invoiceitems_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `lecturers`
--
ALTER TABLE `lecturers`
  ADD CONSTRAINT `FK_lec_wp` FOREIGN KEY (`work_place_id`) REFERENCES `workplace` (`id`),
  ADD CONSTRAINT `FK_topic_lecturer` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`topic_id`);

--
-- Các ràng buộc cho bảng `meetingschedule`
--
ALTER TABLE `meetingschedule`
  ADD CONSTRAINT `fk_defense_sche` FOREIGN KEY (`defense_id`) REFERENCES `defense` (`defense_id`);

--
-- Các ràng buộc cho bảng `productsaveds`
--
ALTER TABLE `productsaveds`
  ADD CONSTRAINT `productsaveds_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `productsaveds_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `rattings`
--
ALTER TABLE `rattings`
  ADD CONSTRAINT `rattings_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `rattings_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `registrations`
--
ALTER TABLE `registrations`
  ADD CONSTRAINT `FK_topic_res` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`topic_id`);

--
-- Các ràng buộc cho bảng `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `FK_student_major` FOREIGN KEY (`major_id`) REFERENCES `major` (`major_id`),
  ADD CONSTRAINT `FK_student_topic` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`topic_id`),
  ADD CONSTRAINT `FK_student_user_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `thesis`
--
ALTER TABLE `thesis`
  ADD CONSTRAINT `FK_thesis_res` FOREIGN KEY (`registration_id`) REFERENCES `registrations` (`registration_id`);

--
-- Các ràng buộc cho bảng `thesisreports`
--
ALTER TABLE `thesisreports`
  ADD CONSTRAINT `FK_thesisrp_res` FOREIGN KEY (`registration_id`) REFERENCES `registrations` (`registration_id`);

--
-- Các ràng buộc cho bảng `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
