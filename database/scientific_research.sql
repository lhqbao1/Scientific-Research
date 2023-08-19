-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 19, 2023 at 08:28 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `scientific_research`
--

-- --------------------------------------------------------

--
-- Table structure for table `advisors`
--

CREATE TABLE `advisors` (
  `advisor_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `advisor_name` text NOT NULL,
  `major_id` int(11) NOT NULL,
  `advisor_degree` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `defense`
--

CREATE TABLE `defense` (
  `defense_id` int(11) NOT NULL,
  `registration_id` int(11) NOT NULL,
  `report_document` text NOT NULL,
  `request_document` text NOT NULL,
  `decision` text NOT NULL,
  `evaluation` text NOT NULL,
  `defense_coucil_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `defenserequest`
--

CREATE TABLE `defenserequest` (
  `request_id` int(11) NOT NULL,
  `registration_id` int(11) NOT NULL,
  `request_document` text NOT NULL,
  `request_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoiceitems`
--

CREATE TABLE `invoiceitems` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `total` float DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `invoiceId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lecturers`
--

CREATE TABLE `lecturers` (
  `lecturer_id` int(11) NOT NULL,
  `lecturer_name` text NOT NULL,
  `position` text NOT NULL,
  `degree` text NOT NULL,
  `email` text NOT NULL,
  `work_place` text NOT NULL,
  `topic_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lecturers`
--

INSERT INTO `lecturers` (`lecturer_id`, `lecturer_name`, `position`, `degree`, `email`, `work_place`, `topic_id`) VALUES
(4, 'Nguyen Van A', 'Professor', 'Ph.D.', 'nguyenvana@example.com', 'University of XYZ', 1),
(5, 'Nguyen Van B', 'Professor', 'Ph.D.', 'nguyenvanb@example.com', 'University of XYZ', NULL),
(6, 'Nguyen Van B', 'Professor', 'Ph.D.', 'nguyenvanbsd@example.com', 'University of XYZ', NULL),
(7, 'Nguyen Van B', 'Professor', 'Ph.D.', 'nguyenvanbsd@example.com', 'University of XYZ', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `major`
--

CREATE TABLE `major` (
  `major_id` int(11) NOT NULL,
  `major_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `major`
--

INSERT INTO `major` (`major_id`, `major_name`) VALUES
(1, 'Information and Technology High Quality'),
(2, 'International Bussiness High Quality');

-- --------------------------------------------------------

--
-- Table structure for table `meetingschedule`
--

CREATE TABLE `meetingschedule` (
  `schedule_id` int(11) NOT NULL,
  `defense_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `productsaveds`
--

CREATE TABLE `productsaveds` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rattings`
--

CREATE TABLE `rattings` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `rating` int(11) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `registrations`
--

CREATE TABLE `registrations` (
  `registration_id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `group_info` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `roleCode` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `roleCode`, `createdAt`, `updatedAt`) VALUES
('37dcfe4d-c74a-469b-9a25-61961e568ce1', 'User', 'user', '2023-06-24 01:06:31', '2023-06-24 01:06:31'),
('516385d8-3c2d-11ee-bbca-2cf05dd63cb7', 'Student', 'student', '2023-08-16 14:06:17', '2023-08-16 14:06:17'),
('82705bfa-cede-46e4-afca-5541b6068671', 'Admin', 'admin', '2023-06-24 01:06:31', '2023-06-24 01:06:31');

-- --------------------------------------------------------

--
-- Table structure for table `students`
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
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
(12, 'b0204010-746e-4ccf-93b6-2dc81028ff87', '', 'Tran Van Tuong', 'K45', 1, 1, 342121, 'tranvantuong@gmail.com'),
(13, '079c6270-3c2d-11ee-bbca-2cf05dd63cb7', 'F1', 'Lương Hoàng Quốc bảo', 'K45', 1, 1, 1910616, 'bao@gmail.com'),
(14, '6cc0e1ff-3c2d-11ee-bbca-2cf05dd63cb7', 'F1', 'Lê Duy Tân', 'K45', 1, 2, 1910699, 'tan@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `thesis`
--

CREATE TABLE `thesis` (
  `thesis_id` int(11) NOT NULL,
  `registration_id` int(11) NOT NULL,
  `submission_date` date NOT NULL,
  `thesis_document` text NOT NULL,
  `thesis_council_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `thesisreports`
--

CREATE TABLE `thesisreports` (
  `report_id` int(11) NOT NULL,
  `registration_id` int(11) NOT NULL,
  `report_document` text NOT NULL,
  `report_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `topics`
--

CREATE TABLE `topics` (
  `topic_id` int(11) NOT NULL,
  `topic_name` text NOT NULL,
  `research_area` text NOT NULL,
  `basic_description` text NOT NULL,
  `topic_code` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `topics`
--

INSERT INTO `topics` (`topic_id`, `topic_name`, `research_area`, `basic_description`, `topic_code`) VALUES
(1, 'Scientific Research', 'research', 'researchresearchresearchresearch', NULL),
(2, 'Scientific Research', 'Scientific ResearchScientific ResearchScientific Research', 'Scientific ResearchScientific ResearchScientific ResearchScientific Research', NULL),
(3, 'Scientific Research 2', 'Scientific Research 2Scientific Research 2', 'Scientific Research 2Scientific Research 2Scientific Research 2', NULL),
(4, '\"q1\"', '\"q1 q1\"', '\"q1 q1 q1\"', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `createdAt`, `updatedAt`, `roleId`) VALUES
('079c6270-3c2d-11ee-bbca-2cf05dd63cb7', 'bao@gmail.com', '123456', '2023-08-16 14:03:44', '2023-08-16 14:03:44', '37dcfe4d-c74a-469b-9a25-61961e568ce1'),
('6cc0e1ff-3c2d-11ee-bbca-2cf05dd63cb7', 'tan@gmail.com', '123456', '2023-08-16 14:06:38', '2023-08-16 14:06:38', '516385d8-3c2d-11ee-bbca-2cf05dd63cb7'),
('b0204010-746e-4ccf-93b6-2dc81028ff87', 'quocdai072@gmail.com', '$2a$08$SqMUiWE6nZeLsf97agjReuEjf.IgpjiC6xQ70Y6uX4zk7ZCc0LBQe', '2023-07-05 03:12:29', '2023-07-05 03:13:07', '37dcfe4d-c74a-469b-9a25-61961e568ce1'),
('b8d3ffa6-93a5-4de2-8987-0ce569b77ec7', 'devcuongbui1@gmail.com', '$2a$08$ketnf96siz8UJPyFh8rZLOXA15sJyJvYcEIz60fUe0DKmBT6cykQu', '2023-07-06 08:53:28', '2023-07-06 08:53:28', '37dcfe4d-c74a-469b-9a25-61961e568ce1'),
('c9692900-e657-450f-9c3c-761efabc532d', 'admin@gmail.com', '$2a$08$Jr/n6gIKQhtGjnf82jy1au6f21zuPyX9UBbTkOCBKHhRLK0y0yR7C', '2023-06-24 01:06:31', '2023-06-24 01:06:31', '82705bfa-cede-46e4-afca-5541b6068671');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `advisors`
--
ALTER TABLE `advisors`
  ADD PRIMARY KEY (`advisor_id`),
  ADD KEY `FK_Advisor_major` (`major_id`),
  ADD KEY `FK_Advisor_topic` (`topic_id`);

--
-- Indexes for table `defense`
--
ALTER TABLE `defense`
  ADD PRIMARY KEY (`defense_id`),
  ADD KEY `FK_defense_res` (`registration_id`);

--
-- Indexes for table `defenserequest`
--
ALTER TABLE `defenserequest`
  ADD PRIMARY KEY (`request_id`),
  ADD KEY `FK_res_defen` (`registration_id`);

--
-- Indexes for table `invoiceitems`
--
ALTER TABLE `invoiceitems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoiceId` (`invoiceId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `lecturers`
--
ALTER TABLE `lecturers`
  ADD PRIMARY KEY (`lecturer_id`),
  ADD KEY `FK_topic_lecturer` (`topic_id`);

--
-- Indexes for table `major`
--
ALTER TABLE `major`
  ADD PRIMARY KEY (`major_id`);

--
-- Indexes for table `meetingschedule`
--
ALTER TABLE `meetingschedule`
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `fk_defense_sche` (`defense_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productsaveds`
--
ALTER TABLE `productsaveds`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `rattings`
--
ALTER TABLE `rattings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `registrations`
--
ALTER TABLE `registrations`
  ADD PRIMARY KEY (`registration_id`),
  ADD KEY `FK_topic_res` (`topic_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`),
  ADD UNIQUE KEY `student_code` (`student_code`),
  ADD UNIQUE KEY `student_email` (`email`) USING HASH,
  ADD KEY `FK_student_user_2` (`user_id`),
  ADD KEY `FK_student_major` (`major_id`),
  ADD KEY `FK_student_topic` (`topic_id`);

--
-- Indexes for table `thesis`
--
ALTER TABLE `thesis`
  ADD PRIMARY KEY (`thesis_id`),
  ADD KEY `FK_thesis_res` (`registration_id`);

--
-- Indexes for table `thesisreports`
--
ALTER TABLE `thesisreports`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `FK_thesisrp_res` (`registration_id`);

--
-- Indexes for table `topics`
--
ALTER TABLE `topics`
  ADD PRIMARY KEY (`topic_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roleId` (`roleId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `advisors`
--
ALTER TABLE `advisors`
  MODIFY `advisor_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `defense`
--
ALTER TABLE `defense`
  MODIFY `defense_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `defenserequest`
--
ALTER TABLE `defenserequest`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lecturers`
--
ALTER TABLE `lecturers`
  MODIFY `lecturer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `major`
--
ALTER TABLE `major`
  MODIFY `major_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `meetingschedule`
--
ALTER TABLE `meetingschedule`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `registrations`
--
ALTER TABLE `registrations`
  MODIFY `registration_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `thesis`
--
ALTER TABLE `thesis`
  MODIFY `thesis_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `thesisreports`
--
ALTER TABLE `thesisreports`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `topics`
--
ALTER TABLE `topics`
  MODIFY `topic_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `advisors`
--
ALTER TABLE `advisors`
  ADD CONSTRAINT `FK_Advisor_major` FOREIGN KEY (`major_id`) REFERENCES `major` (`major_id`),
  ADD CONSTRAINT `FK_Advisor_topic` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`topic_id`);

--
-- Constraints for table `defense`
--
ALTER TABLE `defense`
  ADD CONSTRAINT `FK_defense_res` FOREIGN KEY (`registration_id`) REFERENCES `registrations` (`registration_id`);

--
-- Constraints for table `defenserequest`
--
ALTER TABLE `defenserequest`
  ADD CONSTRAINT `FK_res_defen` FOREIGN KEY (`registration_id`) REFERENCES `registrations` (`registration_id`);

--
-- Constraints for table `invoiceitems`
--
ALTER TABLE `invoiceitems`
  ADD CONSTRAINT `invoiceitems_ibfk_1` FOREIGN KEY (`invoiceId`) REFERENCES `invoices` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `invoiceitems_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `lecturers`
--
ALTER TABLE `lecturers`
  ADD CONSTRAINT `FK_topic_lecturer` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`topic_id`);

--
-- Constraints for table `meetingschedule`
--
ALTER TABLE `meetingschedule`
  ADD CONSTRAINT `fk_defense_sche` FOREIGN KEY (`defense_id`) REFERENCES `defense` (`defense_id`);

--
-- Constraints for table `productsaveds`
--
ALTER TABLE `productsaveds`
  ADD CONSTRAINT `productsaveds_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `productsaveds_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `rattings`
--
ALTER TABLE `rattings`
  ADD CONSTRAINT `rattings_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `rattings_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `registrations`
--
ALTER TABLE `registrations`
  ADD CONSTRAINT `FK_topic_res` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`topic_id`);

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `FK_student_major` FOREIGN KEY (`major_id`) REFERENCES `major` (`major_id`),
  ADD CONSTRAINT `FK_student_topic` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`topic_id`),
  ADD CONSTRAINT `FK_student_user_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `thesis`
--
ALTER TABLE `thesis`
  ADD CONSTRAINT `FK_thesis_res` FOREIGN KEY (`registration_id`) REFERENCES `registrations` (`registration_id`);

--
-- Constraints for table `thesisreports`
--
ALTER TABLE `thesisreports`
  ADD CONSTRAINT `FK_thesisrp_res` FOREIGN KEY (`registration_id`) REFERENCES `registrations` (`registration_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
