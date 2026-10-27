-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 26, 2026 at 07:32 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `qetero`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `branch` varchar(50) NOT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'admin',
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`, `branch`, `role`, `date`) VALUES
(19, 'mainadmin@gmail.com', '$2b$10$iHqxypBpSX6srpjOtsbW0e6/M51DuBxq6V2McqKP4x6IgXFE5JIHy', 'Main Admin', 'main', '2026-08-08 16:09:39'),
(20, 'addisketema@gmail.com', '$2b$10$1qpjfCGSqRKlnBN6Nr71Y.1aRvuSfCzEnX2l0RnD3I1Jk8aiM2N1.', 'Addis Ketema', 'admin', '2026-08-08 16:10:42'),
(21, 'bole@gmail.com', '$2b$10$yBnoRz3zghUENBQEqDAa5e7Bz6hjCRw0OWZdPl4.sHFRyliL4VAAm', 'Bole', 'admin', '2026-08-08 16:11:05'),
(22, 'kality@gmail.com', '$2b$10$GpRa8DIGIpmOrG.ok7Lnd.vZ7hLW.kemGBzwf0ae67RcRkYR0.C6G', 'Kality', 'admin', '2026-08-08 16:12:12'),
(23, 'megenagna@gmail.com', '$2b$10$rF1s90nQPrF17shW2chpUOr2pRChgGATKmrvB3czPA7j4cFPpe1wS', 'Megenagna', 'admin', '2026-08-08 16:12:59'),
(24, 'mekanisa@gmail.com', '$2b$10$ilVuehK8Z.SuUtMHhrhuRumcvs1t1f7eVumYnpc4aujF/UcJ0aSpS', 'Mekanisa', 'admin', '2026-08-08 16:13:42');

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `id` int(10) NOT NULL,
  `userId` int(10) NOT NULL,
  `service` varchar(50) NOT NULL,
  `branch` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `time` time(6) NOT NULL,
  `appointmentFor` varchar(100) DEFAULT NULL,
  `queueNumber` int(50) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'waiting',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`id`, `userId`, `service`, `branch`, `date`, `time`, `appointmentFor`, `queueNumber`, `status`, `createdAt`) VALUES
(53, 2, 'Other Service', 'Addis Ketema', '2026-07-07', '05:00:00.000000', NULL, 1, 'completed', '2026-07-12 09:14:40'),
(54, 1, 'Ownership Transfer', 'Addis Ketema', '2026-07-10', '02:30:00.000000', NULL, 1, 'completed', '2026-07-12 09:15:26'),
(55, 2, 'Licesnse Renewal', 'Addis Ketema', '2026-07-14', '02:30:00.000000', NULL, 1, 'completed', '2026-07-23 09:25:55'),
(56, 2, 'Vehicle Registration', 'Kality', '2026-07-12', '03:00:00.000000', NULL, 1, 'waiting', '2026-07-12 08:20:43'),
(57, 1, 'Ownership Transfer', 'Addis Ketema', '2026-07-12', '05:00:00.000000', NULL, 1, 'completed', '2026-07-12 10:05:35'),
(58, 2, 'Other Service', 'Addis Ketema', '2026-07-12', '05:00:00.000000', NULL, 2, 'completed', '2026-07-23 09:25:52'),
(59, 1, 'Vehicle Registration', 'Addis Ketema', '2026-07-17', '04:00:00.000000', NULL, 1, 'completed', '2026-07-23 09:25:59'),
(60, 1, 'Vehicle Registration', 'Addis Ketema', '2026-07-12', '02:30:00.000000', NULL, 3, 'completed', '2026-07-23 08:32:12'),
(61, 1, 'Other Service', 'Mekanisa', '2026-07-12', '03:00:00.000000', NULL, 1, 'waiting', '2026-07-12 10:09:25'),
(62, 1, 'Other Service', 'Addis Ketema', '2026-07-12', '10:00:00.000000', NULL, 4, 'completed', '2026-07-23 09:25:53'),
(63, 1, 'Vehicle Registration', 'Bole', '2026-07-14', '04:00:00.000000', NULL, 1, 'waiting', '2026-07-12 10:59:01'),
(64, 2, 'Vehicle Inspection', 'Addis Ketema', '2026-07-14', '02:30:00.000000', NULL, 2, 'completed', '2026-07-23 09:25:56'),
(65, 1, 'Vehicle Inspection', 'Addis Ketema', '2026-07-23', '02:30:00.000000', NULL, 1, 'completed', '2026-07-23 09:26:00'),
(66, 1, 'Vehicle Inspection', 'Addis Ketema', '2026-07-23', '10:00:00.000000', NULL, 2, 'completed', '2026-07-23 09:26:01'),
(67, 2, 'Ownership Transfer', 'Addis Ketema', '2026-07-28', '02:30:00.000000', 'user 3', 1, 'completed', '2026-07-28 04:56:27'),
(68, 1, 'License Issuance', 'Addis Ketema', '2026-07-28', '02:30:00.000000', 'user 3', 2, 'completed', '2026-07-28 05:44:03'),
(69, 1, 'License Issuance', 'Addis Ketema', '2026-08-10', '04:00:00.000000', ' ', 1, 'completed', '2026-10-16 15:10:16'),
(70, 1, 'Licesnse Renewal', 'Addis Ketema', '2026-08-09', '04:00:00.000000', 'customer 1', 1, 'completed', '2026-10-17 09:36:01'),
(71, 1, 'Ownership Transfer', 'Addis Ketema', '2026-08-11', '02:30:00.000000', 'customer 1', 1, 'completed', '2026-10-23 04:43:33'),
(72, 1, 'Ownership Transfer', 'Addis Ketema', '2026-10-17', '02:30:00.000000', 'sara mo', 1, 'completed', '2026-10-23 04:43:34'),
(73, 1, 'Ownership Transfer', 'Addis Ketema', '2026-10-17', '02:30:00.000000', 'self-appointment', 2, 'completed', '2026-10-16 15:10:12'),
(74, 2, 'Licesnse Renewal', 'Kality', '2026-10-19', '02:30:00.000000', 'self-appointment', 1, 'waiting', '2026-10-18 08:30:50'),
(75, 1, 'Ownership Transfer', 'Kality', '2026-10-19', '02:30:00.000000', 'self-appointment', 2, 'waiting', '2026-10-18 08:31:29'),
(76, 1, 'Vehicle Registration', 'Kality', '2026-10-19', '02:30:00.000000', 'other  1', 3, 'waiting', '2026-10-18 09:03:36'),
(77, 1, 'Vehicle Registration', 'Kality', '2026-10-19', '02:30:00.000000', 'other  1', 4, 'waiting', '2026-10-18 09:03:36'),
(78, 1, 'Licesnse Renewal', 'Addis Ketema', '2026-10-19', '02:30:00.000000', 'other 1', 1, 'completed', '2026-10-23 04:43:36'),
(79, 2, 'Licesnse Renewal', 'Addis Ketema', '2026-10-19', '02:30:00.000000', 'self-appointment', 2, 'completed', '2026-10-23 04:43:37'),
(80, 1, 'Vehicle Registration', 'Addis Ketema', '2026-10-19', '02:30:00.000000', 'self-appointment', 3, 'completed', '2026-10-23 04:43:38'),
(81, 2, 'Vehicle Inspection', 'Addis Ketema', '2026-10-19', '02:30:00.000000', 'self-appointment', 4, 'completed', '2026-10-23 04:43:39'),
(82, 1, 'Other Service', 'Addis Ketema', '2026-10-19', '02:30:00.000000', 'self-appointment', 5, 'completed', '2026-10-23 04:43:42'),
(83, 1, 'License Issuance', 'Bole', '2026-10-20', '02:30:00.000000', 'self-appointment', 1, 'waiting', '2026-10-20 18:13:46'),
(84, 1, 'Licesnse Renewal', 'Addis Ketema', '2026-10-21', '03:00:00.000000', 'self-appointment', 1, 'completed', '2026-10-23 04:43:31'),
(85, 1, 'Licesnse Renewal', 'Bole', '2026-10-21', '03:00:00.000000', 'self-appointment', 1, 'waiting', '2026-10-20 18:40:04'),
(86, 1, 'Vehicle Registration', 'Bole', '2026-10-21', '03:00:00.000000', 'self-appointment', 2, 'waiting', '2026-10-20 18:41:39'),
(87, 1, 'Licesnse Renewal', 'Kality', '2026-10-20', '03:00:00.000000', 'other 2', 1, 'waiting', '2026-10-20 19:42:20'),
(88, 1, 'Licesnse Renewal', 'Bole', '2026-10-21', '03:00:00.000000', 'other 2', 3, 'waiting', '2026-10-21 07:55:27'),
(89, 1, 'Licesnse Renewal', 'Bole', '2026-10-21', '03:00:00.000000', 'for-other-appointment', 4, 'waiting', '2026-10-21 16:50:28'),
(90, 1, 'Ownership Transfer', 'Bole', '2026-10-21', '02:30:00.000000', 'for-other-appointment', 5, 'waiting', '2026-10-21 16:51:39'),
(91, 1, 'Licesnse Renewal', 'Addis Ketema', '2026-10-23', '02:30:00.000000', 'self-appointment', 1, 'completed', '2026-10-23 04:55:20'),
(92, 2, 'Ownership Transfer', 'Addis Ketema', '2026-10-23', '02:30:00.000000', 'self-appointment', 2, 'completed', '2026-10-23 04:55:21'),
(93, 1, 'Licesnse Renewal', 'Addis Ketema', '2026-10-24', '02:30:00.000000', 'self-appointment', 1, 'completed', '2026-10-23 04:55:22'),
(94, 2, 'Vehicle Inspection', 'Addis Ketema', '2026-10-24', '02:30:00.000000', 'for-other-appointment', 2, 'completed', '2026-10-23 04:55:23'),
(95, 1, 'Licesnse Renewal', 'Addis Ketema', '2026-10-23', '02:30:00.000000', 'self-appointment', 3, 'completed', '2026-10-23 08:00:24'),
(96, 2, 'Vehicle Registration', 'Addis Ketema', '2026-10-24', '03:00:00.000000', 'self-appointment', 3, 'completed', '2026-10-23 08:00:21'),
(97, 1, 'Other Service', 'Addis Ketema', '2026-10-23', '02:30:00.000000', 'user 1', 4, 'completed', '2026-10-23 08:00:23'),
(98, 1, 'License Issuance', 'Addis Ketema', '2026-10-24', '03:00:00.000000', 'user 1', 4, 'completed', '2026-10-25 11:35:23'),
(99, 1, 'License Issuance', 'Addis Ketema', '2026-10-23', '04:00:00.000000', 'user 1', 5, 'completed', '2026-10-23 08:46:50'),
(100, 2, 'License Issuance', 'Addis Ketema', '2026-10-24', '03:00:00.000000', 'sara mohammed', 5, 'completed', '2026-10-25 11:35:25'),
(101, 2, 'Licesnse Renewal', 'Addis Ketema', '2026-10-24', '03:00:00.000000', 'other user', 6, 'completed', '2026-10-25 11:35:26'),
(102, 2, 'Ownership Transfer', 'Addis Ketema', '2026-10-24', '03:00:00.000000', NULL, 7, 'completed', '2026-10-25 11:35:40'),
(103, 2, 'Ownership Transfer', 'Addis Ketema', '2026-10-27', '03:00:00.000000', 'other 5', 1, 'completed', '2026-10-25 11:35:42'),
(104, 1, 'License Issuance', 'Addis Ketema', '2026-10-25', '02:30:00.000000', NULL, 1, 'completed', '2026-10-25 11:38:17'),
(105, 1, 'Licesnse Renewal', 'Addis Ketema', '2026-10-25', '03:00:00.000000', 'other 1', 2, 'completed', '2026-10-25 11:38:19'),
(106, 2, 'Other Service', 'Addis Ketema', '2026-10-26', '03:00:00.000000', NULL, 1, 'completed', '2026-10-25 11:38:21'),
(107, 1, 'Licesnse Renewal', 'Addis Ketema', '2026-10-27', '02:30:00.000000', NULL, 2, 'completed', '2026-10-26 05:32:33'),
(108, 2, 'Vehicle Inspection', 'Addis Ketema', '2026-10-26', '02:30:00.000000', NULL, 2, 'completed', '2026-10-26 05:24:58');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `phone`, `password`, `date`) VALUES
(1, 'user', '1', '910101010', '$2b$10$rD9ovf2uFaXq5txKXaio8epznef77QzwH4Q8EokVd3n9VleLAecyC', '2026-06-22 19:22:29'),
(2, 'sara', 'mohammed', '920202020', '$2b$10$zTWEG6j30VYFz6ncWMQKhOPzJsIzAdKi4.gD.7LwaeBwrvhalHvFC', '2026-06-30 10:04:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`id`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointment`
--
ALTER TABLE `appointment`
  ADD CONSTRAINT `appointment_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
