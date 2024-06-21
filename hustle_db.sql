-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 21, 2024 at 12:43 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hustle_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `candidates`
--

CREATE TABLE `candidates` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) DEFAULT NULL,
  `surname` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `cv_upload` varchar(200) DEFAULT NULL,
  `profile_pic` varchar(255) DEFAULT 'candidate_profile_pic_placeholder.png',
  `professional_title` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `dob` varchar(255) DEFAULT NULL,
  `national_id_no` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `country_id` bigint(20) UNSIGNED DEFAULT NULL,
  `email_verified_at` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `candidates`
--

INSERT INTO `candidates` (`id`, `email`, `fname`, `lname`, `surname`, `phone`, `password`, `cv_upload`, `profile_pic`, `professional_title`, `gender`, `dob`, `national_id_no`, `address`, `bio`, `country_id`, `email_verified_at`, `created_at`, `updated_at`) VALUES
(1, 'mike@gmail.com', 'Mike', 'Ruddy', 'Jones', '0790788767', '1234', '646fd1a2e9353.pdf', 'p1.jpeg', 'Software Engineer', '1', '1989-08-23', '12345678', 'Limuru', 'I am an android developer', NULL, NULL, '2023-05-18 05:20:42', '2023-05-25 18:22:42'),
(2, 'ben@gmail.com', 'Ben', 'Kabaka', 'Daudi', '0793818787', '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'p2.jpeg', 'Software Developer', '1', '1999-08-23', '12345677', 'Limuru', 'I\'m Ignacio Ben, and I recently graduated with an advanced certificate for MODCOM Institute. I\'m seeking an internship where I can apply my skills in content creation and increase my experience in digital marketing.', NULL, NULL, '2023-05-18 05:20:42', '2023-06-05 10:53:51'),
(3, 'ken@gmail.com', 'Ken', 'Steven', 'Boone', '0712345678', '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'p3.jpg', 'Database Engineer', '1', '2000-01-01', '22345678', 'Limuru', 'This is my bio :)', NULL, NULL, '2023-05-18 05:20:43', '2023-05-18 15:03:39'),
(4, 'lin@gmail.com', 'Winnie', 'Josephine', 'Lin', '0722345678', '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'p4.jpg', 'Cisco Certified Network Associate', '2', '2000-01-01', '13345678', 'Limuru', 'THis is my bio :)', NULL, NULL, '2023-05-18 05:20:43', '2023-05-18 15:05:24'),
(5, 'caron@gmail.com', 'Caron', 'Ranada', 'Lynn', '0733345678', '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'p5.jpg', 'Graphics Designer', '1', '2000-01-01', '12445678', 'Limuru', 'THis is my bio :)', NULL, NULL, '2023-05-18 05:20:43', '2023-05-18 15:08:56'),
(6, 'boris@gmail.com', 'Boris', NULL, 'Johnson', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'p1.jpeg', 'Data Analyst', NULL, NULL, NULL, 'Bungoma', NULL, NULL, NULL, '2023-05-18 05:20:43', '2023-05-18 15:10:03'),
(7, 'meg@gmail.com', 'Megan', NULL, 'Markle', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'p3.jpg', 'Data Entry Clerk', NULL, NULL, NULL, 'Machakos', NULL, NULL, NULL, '2023-05-18 05:20:43', '2023-05-18 15:10:45'),
(8, 'james@gmail.com', 'James', NULL, 'Corden', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'p1.jpeg', 'IT Specialist', NULL, NULL, NULL, 'Mandera', NULL, NULL, NULL, '2023-05-18 05:20:43', '2023-05-18 15:11:34'),
(9, 'smith@gmail.com', 'Will', NULL, 'Smith', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'profile_04.jpg', 'Video Editor', NULL, NULL, NULL, 'Nanyuki', NULL, NULL, NULL, '2023-05-18 05:20:43', '2023-05-18 15:12:46'),
(10, 'pink@gmail.com', 'Jaydah', NULL, 'Pinkett', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'p3.jpg', 'Photographer', NULL, NULL, NULL, 'Kapenguria', NULL, NULL, NULL, '2023-05-18 05:20:43', '2023-05-18 15:16:09'),
(11, 'landen.kub@walker.biz', 'Delphine', NULL, 'Leuschke', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'p1.jpeg', 'Coil Winders', NULL, NULL, NULL, 'Nyeri', NULL, NULL, NULL, '2023-05-18 05:20:43', '2023-05-18 05:20:43'),
(12, 'abe41@gmail.com', 'Joshua', NULL, 'Morissette', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'profile_05.jpg', 'Atmospheric and Space Scientist', NULL, NULL, NULL, 'Lamu', NULL, NULL, NULL, '2023-05-18 05:20:43', '2023-05-18 05:20:43'),
(13, 'douglas.roy@hotmail.com', 'Keara', NULL, 'Zboncak', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'profile_06.jpg', 'Foreign Language Teacher', NULL, NULL, NULL, 'Nyahururu', NULL, NULL, NULL, '2023-05-18 05:20:43', '2023-05-18 05:20:43'),
(14, 'kamille93@gmail.com', 'Jason', NULL, 'Lang', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'p3.jpg', 'Control Valve Installer', NULL, NULL, NULL, 'Kajiado', NULL, NULL, NULL, '2023-05-18 05:20:44', '2023-05-18 05:20:44'),
(15, 'river66@hotmail.com', 'Jarod', NULL, 'Conroy', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'p2.jpeg', 'Social Worker', NULL, NULL, NULL, 'Mombasa', NULL, NULL, NULL, '2023-05-18 05:20:44', '2023-05-18 05:20:44'),
(16, 'mark69@gmail.com', 'Moriah', NULL, 'Stoltenberg', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'p5.jpg', 'Audio and Video Equipment Technician', NULL, NULL, NULL, 'Moyale', NULL, NULL, NULL, '2023-05-18 05:20:44', '2023-05-18 05:20:44'),
(17, 'jerel00@yahoo.com', 'Austin', NULL, 'Hill', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'profile_07.jpg', 'Carpenter Assembler and Repairer', NULL, NULL, NULL, 'Mutomo', NULL, NULL, NULL, '2023-05-18 05:20:44', '2023-05-18 05:20:44'),
(18, 'gibson.layla@leannon.org', 'Paolo', NULL, 'Gutmann', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'p5.jpg', 'Postsecondary Teacher', NULL, NULL, NULL, 'Kapsabet', NULL, NULL, NULL, '2023-05-18 05:20:44', '2023-05-18 05:20:44'),
(19, 'ecronin@hotmail.com', 'Demetrius', NULL, 'Tromp', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'p4.jpg', 'Music Arranger and Orchestrator', NULL, NULL, NULL, 'Lodwar', NULL, NULL, NULL, '2023-05-18 05:20:44', '2023-05-18 05:20:44'),
(20, 'eichmann.corrine@schmitt.org', 'Karen', NULL, 'Torphy', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'p3.jpg', 'Electrical Engineering Technician', NULL, NULL, NULL, 'Kisumu', NULL, NULL, NULL, '2023-05-18 05:20:44', '2023-05-18 05:20:44'),
(21, 'hfarrell@kemmer.com', 'Adolf', NULL, 'Gislason', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'p2.jpeg', 'Fiberglass Laminator and Fabricator', NULL, NULL, NULL, 'Keroka', NULL, NULL, NULL, '2023-05-18 05:20:44', '2023-05-18 05:20:44'),
(22, 'electa21@turcotte.com', 'Amparo', NULL, 'Kassulke', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'p1.jpeg', 'Marine Architect', NULL, NULL, NULL, 'Litein', NULL, NULL, NULL, '2023-05-18 05:20:44', '2023-05-18 05:20:44'),
(23, 'owhite@hotmail.com', 'Gene', NULL, 'Donnelly', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'p4.jpg', 'Chemistry Teacher', NULL, NULL, NULL, 'Homa Bay', NULL, NULL, NULL, '2023-05-18 05:20:44', '2023-05-18 05:20:44'),
(24, 'rfadel@bernier.org', 'Citlalli', NULL, 'McKenzie', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'p5.jpg', 'Railroad Conductors', NULL, NULL, NULL, 'Diani', NULL, NULL, NULL, '2023-05-18 05:20:44', '2023-05-18 05:20:44'),
(25, 'salma86@yahoo.com', 'Mandy', NULL, 'Hettinger', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'profile_08.jpg', 'Physicist', NULL, NULL, NULL, 'Thika', NULL, NULL, NULL, '2023-05-18 05:20:44', '2023-05-18 05:20:44'),
(26, 'tiffany72@marquardt.com', 'Mariane', NULL, 'Dickinson', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'candidate_profile_pic_placeholder.png', 'Dental Hygienist', NULL, NULL, NULL, 'Homa Bay', NULL, NULL, NULL, '2023-05-18 05:20:44', '2023-05-18 05:20:44'),
(27, 'sbeier@schimmel.com', 'Johan', NULL, 'Steuber', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'candidate_profile_pic_placeholder.png', 'Cafeteria Cook', NULL, NULL, NULL, 'Migori', NULL, NULL, NULL, '2023-05-18 05:20:44', '2023-05-18 05:20:44'),
(28, 'qhand@hotmail.com', 'Antwon', NULL, 'Rosenbaum', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'candidate_profile_pic_placeholder.png', 'Engineering Technician', NULL, NULL, NULL, 'Migori', NULL, NULL, NULL, '2023-05-18 05:20:45', '2023-05-18 05:20:45'),
(29, 'zkuhic@watsica.info', 'Madge', NULL, 'Wuckert', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'candidate_profile_pic_placeholder.png', 'Desktop Publisher', NULL, NULL, NULL, 'Bungoma', NULL, NULL, NULL, '2023-05-18 05:20:45', '2023-05-18 05:20:45'),
(30, 'dach.wiley@yahoo.com', 'Dario', NULL, 'Mueller', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'candidate_profile_pic_placeholder.png', 'Marine Cargo Inspector', NULL, NULL, NULL, 'Murang\'a', NULL, NULL, NULL, '2023-05-18 05:20:45', '2023-05-18 05:20:45'),
(31, 'yupton@hotmail.com', 'Eryn', NULL, 'Predovic', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'candidate_profile_pic_placeholder.png', 'Gaming Supervisor', NULL, NULL, NULL, 'Marsabit', NULL, NULL, NULL, '2023-05-18 05:20:45', '2023-05-18 05:20:45'),
(32, 'cweissnat@gmail.com', 'Damaris', NULL, 'Morissette', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'candidate_profile_pic_placeholder.png', 'Cost Estimator', NULL, NULL, NULL, 'Kapsabet', NULL, NULL, NULL, '2023-05-18 05:20:45', '2023-05-18 05:20:45'),
(33, 'colby.runolfsson@hotmail.com', 'Carmella', NULL, 'Hirthe', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'candidate_profile_pic_placeholder.png', 'HR Manager', NULL, NULL, NULL, 'Chuka', NULL, NULL, NULL, '2023-05-18 05:20:45', '2023-05-18 05:20:45'),
(34, 'reba39@hane.info', 'Justen', NULL, 'Grimes', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'candidate_profile_pic_placeholder.png', 'System Administrator', NULL, NULL, NULL, 'Rongo', NULL, NULL, NULL, '2023-05-18 05:20:45', '2023-05-18 05:20:45'),
(35, 'elise55@yahoo.com', 'Fidel', NULL, 'Terry', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'candidate_profile_pic_placeholder.png', 'Dancer', NULL, NULL, NULL, 'Wajir', NULL, NULL, NULL, '2023-05-18 05:20:45', '2023-05-18 05:20:45'),
(36, 'senger.levi@yahoo.com', 'Lucile', NULL, 'Rohan', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'candidate_profile_pic_placeholder.png', 'Fiber Product Cutting Machine Operator', NULL, NULL, NULL, 'Lamu', NULL, NULL, NULL, '2023-05-18 05:20:45', '2023-05-18 05:20:45'),
(37, 'adrianna16@gmail.com', 'Fanny', NULL, 'Shields', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'candidate_profile_pic_placeholder.png', 'Employment Interviewer', NULL, NULL, NULL, 'Maua', NULL, NULL, NULL, '2023-05-18 05:20:45', '2023-05-18 05:20:45'),
(38, 'laverna.wiegand@rath.com', 'Elfrieda', NULL, 'Schaefer', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'candidate_profile_pic_placeholder.png', 'Transit Police OR Railroad Police', NULL, NULL, NULL, 'Bungoma', NULL, NULL, NULL, '2023-05-18 05:20:45', '2023-05-18 05:20:45'),
(39, 'qtoy@larson.info', 'Constantin', NULL, 'Grant', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'candidate_profile_pic_placeholder.png', 'Landscape Architect', NULL, NULL, NULL, 'Kajiado', NULL, NULL, NULL, '2023-05-18 05:20:45', '2023-05-18 05:20:45'),
(40, 'hdoyle@gmail.com', 'Annamae', NULL, 'Ledner', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'candidate_profile_pic_placeholder.png', 'Outdoor Power Equipment Mechanic', NULL, NULL, NULL, 'Mandera', NULL, NULL, NULL, '2023-05-18 05:20:46', '2023-05-18 05:20:46'),
(41, 'cwalsh@rogahn.com', 'Novella', NULL, 'Satterfield', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'candidate_profile_pic_placeholder.png', 'Physical Scientist', NULL, NULL, NULL, 'Chuka', NULL, NULL, NULL, '2023-05-18 05:20:46', '2023-05-18 05:20:46'),
(42, 'rosalia.runte@bednar.com', 'Lyric', NULL, 'Harvey', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'candidate_profile_pic_placeholder.png', 'Architectural Drafter', NULL, NULL, NULL, 'Maralal', NULL, NULL, NULL, '2023-05-18 05:20:46', '2023-05-18 05:20:46'),
(43, 'nickolas28@hane.com', 'Deron', NULL, 'Hill', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'candidate_profile_pic_placeholder.png', 'Bill and Account Collector', NULL, NULL, NULL, 'Murang\'a', NULL, NULL, NULL, '2023-05-18 05:20:46', '2023-05-18 05:20:46'),
(44, 'ardella.bernhard@lemke.com', 'Deondre', NULL, 'Rosenbaum', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'candidate_profile_pic_placeholder.png', 'Obstetrician', NULL, NULL, NULL, 'Murang\'a', NULL, NULL, NULL, '2023-05-18 05:20:46', '2023-05-18 05:20:46'),
(45, 'kerluke.audreanne@labadie.com', 'Marjolaine', NULL, 'Reilly', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'candidate_profile_pic_placeholder.png', 'Deburring Machine Operator', NULL, NULL, NULL, 'Litein', NULL, NULL, NULL, '2023-05-18 05:20:46', '2023-05-18 05:20:46'),
(46, 'kovacek.austen@gmail.com', 'Joy', NULL, 'Adams', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'candidate_profile_pic_placeholder.png', 'Conservation Scientist', NULL, NULL, NULL, 'Wajir', NULL, NULL, NULL, '2023-05-18 05:20:46', '2023-05-18 05:20:46'),
(47, 'treutel.flo@gmail.com', 'Sven', NULL, 'Denesik', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'candidate_profile_pic_placeholder.png', 'Forest Fire Inspector', NULL, NULL, NULL, 'Kwale', NULL, NULL, NULL, '2023-05-18 05:20:46', '2023-05-18 05:20:46'),
(48, 'xpacocha@gmail.com', 'Isadore', NULL, 'Gislason', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'candidate_profile_pic_placeholder.png', 'Logging Worker', NULL, NULL, NULL, 'Kabarnet', NULL, NULL, NULL, '2023-05-18 05:20:46', '2023-05-18 05:20:46'),
(49, 'blanche.wiegand@hotmail.com', 'Chandler', NULL, 'Powlowski', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'candidate_profile_pic_placeholder.png', 'Photographer', NULL, NULL, NULL, 'Garissa', NULL, NULL, NULL, '2023-05-18 05:20:46', '2023-05-18 05:20:46'),
(50, 'mvonrueden@koss.com', 'Matilda', NULL, 'Wilkinson', NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', '', 'candidate_profile_pic_placeholder.png', 'Financial Services Sales Agent', NULL, NULL, NULL, 'Taveta', NULL, NULL, NULL, '2023-05-18 05:20:46', '2023-05-18 05:20:46'),
(51, 'j@gmail.com', 'Jman', NULL, 'manJay', NULL, '$2y$10$IKFkLnAQXQ.9RqVA7zWNEuoJSYAbXAMXhzLBy9TM9CZVfM8Dc.HS6', '', 'candidate_profile_pic_placeholder.png', NULL, NULL, NULL, NULL, 'Kisumu', NULL, NULL, NULL, '2023-05-18 08:29:22', '2023-05-18 08:29:22'),
(52, 'newman@gmail.com', 'New', NULL, 'Man', NULL, '$2y$10$p3zj.MkT5jYQT/9nI.ASAOPQgpc4iY0PRf/2pnvqirLV0qJAmk.U6', NULL, 'candidate_profile_pic_placeholder.png', NULL, NULL, NULL, NULL, 'Lodwar', NULL, NULL, NULL, '2023-06-07 20:39:53', '2023-06-07 20:39:53');

-- --------------------------------------------------------

--
-- Table structure for table `candidates_languages`
--

CREATE TABLE `candidates_languages` (
  `candidate_id` bigint(20) UNSIGNED NOT NULL,
  `language_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `candidates_rating`
--

CREATE TABLE `candidates_rating` (
  `rating_id` int(50) NOT NULL,
  `candidate_id` int(50) NOT NULL,
  `rating` int(50) NOT NULL,
  `job_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `candidates_rating`
--

INSERT INTO `candidates_rating` (`rating_id`, `candidate_id`, `rating`, `job_id`) VALUES
(1, 4, 3, 15),
(2, 6, 2, 5),
(3, 8, 5, 23),
(4, 3, 1, 14),
(5, 7, 4, 8),
(6, 2, 2, 22),
(7, 5, 5, 20),
(8, 9, 1, 3),
(9, 1, 3, 11),
(10, 9, 5, 19),
(11, 6, 1, 6),
(12, 4, 5, 12),
(13, 3, 3, 10),
(14, 7, 5, 24),
(15, 8, 3, 17),
(16, 2, 1, 1),
(17, 5, 2, 21),
(18, 1, 3, 16),
(19, 8, 4, 7),
(20, 4, 2, 13);

-- --------------------------------------------------------

--
-- Table structure for table `candidates_softskills`
--

CREATE TABLE `candidates_softskills` (
  `candidate_id` bigint(20) UNSIGNED NOT NULL,
  `softskill_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `candidates_technicalskills`
--

CREATE TABLE `candidates_technicalskills` (
  `candidate_id` bigint(20) UNSIGNED NOT NULL,
  `skill_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `candidates_technicalskills`
--

INSERT INTO `candidates_technicalskills` (`candidate_id`, `skill_id`, `created_at`, `updated_at`) VALUES
(1, 24, NULL, NULL),
(1, 22, NULL, NULL),
(1, 25, NULL, NULL),
(1, 27, NULL, NULL),
(2, 24, NULL, NULL),
(2, 22, NULL, NULL),
(2, 25, NULL, NULL),
(2, 27, NULL, NULL),
(5, 24, NULL, NULL),
(5, 22, NULL, NULL),
(5, 25, NULL, NULL),
(5, 27, NULL, NULL),
(7, 24, NULL, NULL),
(7, 22, NULL, NULL),
(7, 25, NULL, NULL),
(7, 27, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `certifications`
--

CREATE TABLE `certifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `candidate_id` bigint(20) UNSIGNED NOT NULL,
  `certification_name` varchar(255) NOT NULL,
  `date_awarded` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `company_email` varchar(255) NOT NULL,
  `company_logo` varchar(255) DEFAULT 'image_placeholder.png',
  `company_phone` varchar(255) DEFAULT NULL,
  `admin_fname` varchar(255) DEFAULT NULL,
  `admin_lname` varchar(255) DEFAULT NULL,
  `admin_surname` varchar(255) DEFAULT NULL,
  `admin_phone` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `company_name`, `company_email`, `company_logo`, `company_phone`, `admin_fname`, `admin_lname`, `admin_surname`, `admin_phone`, `password`, `remember_token`, `email_verified_at`, `created_at`, `updated_at`) VALUES
(1, 'Everydayapps', 'contact@eda.com', 'logo_01.jpg', NULL, NULL, NULL, NULL, NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', NULL, NULL, '2023-05-18 05:20:42', '2023-05-18 05:20:42'),
(2, 'Cellulant', 'contact@cellulant.com', 'logo_02.jpg', NULL, NULL, NULL, NULL, NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', NULL, NULL, '2023-05-18 05:20:42', '2023-05-18 05:20:42'),
(3, 'Codesign', 'contact@codesign.com', 'logo_03.jpg', NULL, NULL, NULL, NULL, NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', NULL, NULL, '2023-05-18 05:20:42', '2023-05-18 05:20:42'),
(4, 'XCETRA', 'contact@xcetra.com', 'logo_04.jpg', NULL, NULL, NULL, NULL, NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', NULL, NULL, '2023-05-18 05:20:42', '2023-05-18 05:20:42'),
(5, 'TECHBEAST', 'contact@techbeast.com', 'logo_05.jpg', NULL, NULL, NULL, NULL, NULL, '$2y$10$/R.g.d/comQEx8G7J8DmjOh5AcAcXerW7y/7D12PWooSPDb24Xh8m', NULL, NULL, '2023-05-18 05:20:42', '2023-05-18 05:20:42'),
(6, 'Design Village', 'k@gmail.com', 'logo_06.jpg', NULL, NULL, NULL, NULL, NULL, '$2y$10$6/nlfGC.7oAzrkbzC.LRrecey4EBq8WIXbMzu5M0XcYVUuk/zzLJ2', NULL, NULL, '2023-05-18 08:31:37', '2023-05-18 08:31:37');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobtypes`
--

CREATE TABLE `jobtypes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `jobtype_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jobtypes`
--

INSERT INTO `jobtypes` (`id`, `jobtype_name`, `created_at`, `updated_at`) VALUES
(1, 'Contract', '2023-05-18 05:20:47', '2023-05-18 05:20:47'),
(2, 'Full Time', '2023-05-18 05:20:47', '2023-05-18 05:20:47'),
(3, 'Intern', '2023-05-18 05:20:47', '2023-05-18 05:20:47'),
(4, 'Remote', '2023-05-18 05:20:47', '2023-05-18 05:20:47');

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `language` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`id`, `language`, `created_at`, `updated_at`) VALUES
(1, 'English', '2023-05-18 10:21:44', '2023-05-18 10:21:44'),
(2, 'Swahili', '2023-05-18 10:21:44', '2023-05-18 10:21:44'),
(3, 'French', '2023-05-18 10:21:44', '2023-05-18 10:21:44'),
(4, 'Arabic', '2023-05-18 10:21:45', '2023-05-18 10:21:45'),
(5, 'German', '2023-05-18 10:21:45', '2023-05-18 10:21:45');

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `location_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `location_name`, `created_at`, `updated_at`) VALUES
(1, 'Westlands, Nairobi', '2023-05-18 05:20:48', '2023-05-18 05:20:48'),
(2, 'Kilimani, Nairobi', '2023-05-18 05:20:48', '2023-05-18 05:20:48'),
(3, 'Kileleshwa, Nairobi', '2023-05-18 05:20:48', '2023-05-18 05:20:48'),
(4, 'Nairobi CBD, Nairobi', '2023-05-18 05:20:48', '2023-05-18 05:20:48'),
(5, 'Upper Hill, Nairobi', '2023-05-18 05:20:48', '2023-05-18 05:20:48');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(109, '2014_10_12_000000_create_users_table', 1),
(110, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(111, '2019_08_19_000000_create_failed_jobs_table', 1),
(112, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(113, '2023_04_18_133105_create_admins_table', 1),
(114, '2023_04_18_145005_create_companies_table', 1),
(115, '2023_04_20_051524_create_candidates_table', 1),
(116, '2023_05_10_064300_create_skills_table', 1),
(117, '2023_05_10_065543_create_postedjobs_table', 1),
(118, '2023_05_10_070648_create_postedjobs_skills_table', 1),
(119, '2023_05_10_114223_create_jobtypes_table', 1),
(120, '2023_05_10_114246_create_locations_table', 1),
(121, '2023_05_10_114302_create_salaryranges_table', 1),
(122, '2023_05_15_061243_create_postedjobs_candidates_table', 1),
(123, '2023_05_17_111511_create_soft_skills_table', 1),
(124, '2023_05_17_121407_create_languages_table', 1),
(125, '2023_05_17_121509_create_workexperiences_table', 1),
(126, '2023_05_17_121741_create_certifications_table', 1),
(127, '2023_05_17_122225_create_candidates_softskills_table', 1),
(128, '2023_05_17_122254_create_candidates_languages_table', 1),
(129, '2023_05_17_140552_create_candidates_technicalskills_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `postedjobs`
--

CREATE TABLE `postedjobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `job_title` varchar(255) NOT NULL,
  `jobtype_id` varchar(255) NOT NULL,
  `job_location_id` varchar(255) NOT NULL,
  `salary_range_id` varchar(255) NOT NULL,
  `job_description` text NOT NULL,
  `company_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `postedjobs`
--

INSERT INTO `postedjobs` (`id`, `job_title`, `jobtype_id`, `job_location_id`, `salary_range_id`, `job_description`, `company_id`, `created_at`, `updated_at`) VALUES
(1, 'Database Admin', '1', '1', '1', 'We need an expert with over 8 years working experience', 1, '2023-05-18 05:20:48', '2023-05-18 05:20:48'),
(2, 'Web Developer', '2', '2', '2', 'Requiring a seasoned php programmer to join our team.', 1, '2023-05-18 05:20:49', '2023-05-18 05:20:49'),
(3, 'Android_Developer', '1', '1', '4', 'We require a skilled Android developer with over 5 years experience and a degree in Computer science', 6, '2023-05-18 08:40:19', '2023-05-18 08:40:19'),
(4, 'Database Admin', '1', '1', '2', 'We are seeking a versatile and dynamic individual to join our team as a Web Designer, B2B E-commerce Specialist & Digital Marketer. In this role, you will be responsible for designing and optimizing our website to enhance user experience and drive traffic, as well as implementing digital marketing strategies to promote our brand and products/se ..', 1, '2024-06-11 14:17:49', '2024-06-11 14:17:49'),
(5, 'Computerized Secretary\r\n', '1', '3', '3', 'An established learning institution in Nairobi is seeking qualified and experienced individuals to fill the above position. The ideal candidate will efficiently manage administrative tasks, ensuring smooth day-to-day operations. ', 2, '2024-06-11 14:20:13', '2024-06-11 14:20:13'),
(6, 'Junior Software Engineer\r\n', '3', '4', '3', 'We are looking for a product minded software engineer (Front End Focus) not only a coder. We\'re seeking a builder who will bridge technical expertise with product strategy. Work from home as standard. 40 hours a week, with 2 days off your normal work days (paid) a month for career development. While applying, please tell us your favorite color ', 5, '2024-06-12 08:59:03', '2024-06-12 08:59:03'),
(7, 'Full Stack Developer\r\n', '3', '3', '3', 'Medbill is a Durable Medical Equipment Billing Company based in the US. We are looking for a Full Stack Developer for contract work to assist in our development department that is comfortable working remotely. The Full Stack Developer contractor will work remotely with the Medbill development team to design, develop, install, and support software. ', 5, '2024-06-12 11:46:51', '2024-06-12 11:46:51'),
(8, 'Web/Mobile Applications Developer\n', '1', '2', '2', 'Applicants must be graduate IT professionals with certification and minimum 3 years relevant experience. The job description will include web/mobile spatial programming and database management in a GIS environment. ', 4, '2024-06-12 11:47:49', '2024-06-12 11:47:49'),
(9, 'UX_Engineer\n', '2', '3', '5', 'A UX Engineer creates intuitive and enjoyable digital experiences by understanding user needs, designing interfaces, and optimizing interactions to enhance usability and satisfaction. They are the ones who are keen to design details, responsible for crafting user interfaces and are conscious of the overall user experience of an application', 1, '2024-06-12 11:49:36', '2024-06-12 11:49:36');

-- --------------------------------------------------------

--
-- Table structure for table `postedjobs_candidates`
--

CREATE TABLE `postedjobs_candidates` (
  `postedjob_id` bigint(20) UNSIGNED NOT NULL,
  `candidate_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `postedjobs_skills`
--

CREATE TABLE `postedjobs_skills` (
  `posted_job_id` bigint(20) UNSIGNED NOT NULL,
  `skill_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `postedjobs_skills`
--

INSERT INTO `postedjobs_skills` (`posted_job_id`, `skill_id`, `created_at`, `updated_at`) VALUES
(3, 23, NULL, NULL),
(3, 24, NULL, NULL),
(3, 25, NULL, NULL),
(3, 26, NULL, NULL),
(3, 27, NULL, NULL),
(3, 28, NULL, NULL),
(3, 29, NULL, NULL),
(3, 30, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `salaryranges`
--

CREATE TABLE `salaryranges` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `salary_range` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `salaryranges`
--

INSERT INTO `salaryranges` (`id`, `salary_range`, `created_at`, `updated_at`) VALUES
(1, 'Ksh 20,000 - Ksh 40,000', '2023-05-18 05:20:47', '2023-05-18 05:20:47'),
(2, 'Ksh 41,000 - Ksh 60,000', '2023-05-18 05:20:47', '2023-05-18 05:20:47'),
(3, 'Ksh 61,000 - Ksh 80,000', '2023-05-18 05:20:47', '2023-05-18 05:20:47'),
(4, 'Ksh 81,000 - Ksh 100,000', '2023-05-18 05:20:47', '2023-05-18 05:20:47'),
(5, 'Ksh 101,000 - Ksh 120,000', '2023-05-18 05:20:47', '2023-05-18 05:20:47');

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE `skills` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `skill_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`id`, `skill_name`, `created_at`, `updated_at`) VALUES
(21, 'Jinja', '2023-05-18 08:38:56', '2023-05-18 08:38:56'),
(22, 'Javascript', '2023-05-18 08:38:57', '2023-05-18 08:38:57'),
(23, 'Cyber Security', '2023-05-18 08:38:57', '2023-05-18 08:38:57'),
(24, 'Bootstrap', '2023-05-18 08:38:57', '2023-05-18 08:38:57'),
(25, 'Data Science', '2023-05-18 08:38:57', '2023-05-18 08:38:57'),
(26, 'HTML/CSS', '2023-05-18 08:38:57', '2023-05-18 08:38:57'),
(27, 'Android', '2023-05-18 08:38:57', '2023-05-18 08:38:57'),
(28, 'Python', '2023-05-18 08:38:57', '2023-05-18 08:38:57'),
(29, 'Flask', '2023-05-18 08:38:57', '2023-05-18 08:38:57'),
(30, 'MySQL', '2023-05-18 08:38:58', '2023-05-18 08:38:58');

-- --------------------------------------------------------

--
-- Table structure for table `soft_skills`
--

CREATE TABLE `soft_skills` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `skill_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `soft_skills`
--

INSERT INTO `soft_skills` (`id`, `skill_name`, `created_at`, `updated_at`) VALUES
(1, 'Humble', '2023-05-18 10:21:45', '2023-05-18 10:21:45'),
(2, 'Attention to Details', '2023-05-18 10:21:45', '2023-05-18 10:21:45');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `workexperiences`
--

CREATE TABLE `workexperiences` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `candidate_id` bigint(20) UNSIGNED NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `job_title` varchar(255) NOT NULL,
  `from_date` varchar(255) NOT NULL,
  `to_date` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `candidates`
--
ALTER TABLE `candidates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `candidates_email_unique` (`email`),
  ADD UNIQUE KEY `candidates_phone_unique` (`phone`);

--
-- Indexes for table `candidates_languages`
--
ALTER TABLE `candidates_languages`
  ADD KEY `candidates_languages_candidate_id_foreign` (`candidate_id`),
  ADD KEY `candidates_languages_language_id_foreign` (`language_id`);

--
-- Indexes for table `candidates_rating`
--
ALTER TABLE `candidates_rating`
  ADD PRIMARY KEY (`rating_id`);

--
-- Indexes for table `candidates_softskills`
--
ALTER TABLE `candidates_softskills`
  ADD KEY `candidates_softskills_candidate_id_foreign` (`candidate_id`),
  ADD KEY `candidates_softskills_softskill_id_foreign` (`softskill_id`);

--
-- Indexes for table `candidates_technicalskills`
--
ALTER TABLE `candidates_technicalskills`
  ADD KEY `candidates_technicalskills_candidate_id_foreign` (`candidate_id`),
  ADD KEY `candidates_technicalskills_skill_id_foreign` (`skill_id`);

--
-- Indexes for table `certifications`
--
ALTER TABLE `certifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `companies_company_name_unique` (`company_name`),
  ADD UNIQUE KEY `companies_company_email_unique` (`company_email`),
  ADD UNIQUE KEY `companies_company_phone_unique` (`company_phone`),
  ADD UNIQUE KEY `companies_admin_phone_unique` (`admin_phone`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobtypes`
--
ALTER TABLE `jobtypes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `postedjobs`
--
ALTER TABLE `postedjobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `postedjobs_candidates`
--
ALTER TABLE `postedjobs_candidates`
  ADD KEY `postedjobs_candidates_postedjob_id_foreign` (`postedjob_id`),
  ADD KEY `postedjobs_candidates_candidate_id_foreign` (`candidate_id`);

--
-- Indexes for table `postedjobs_skills`
--
ALTER TABLE `postedjobs_skills`
  ADD KEY `postedjobs_skills_posted_job_id_foreign` (`posted_job_id`),
  ADD KEY `postedjobs_skills_skill_id_foreign` (`skill_id`);

--
-- Indexes for table `salaryranges`
--
ALTER TABLE `salaryranges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `soft_skills`
--
ALTER TABLE `soft_skills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `workexperiences`
--
ALTER TABLE `workexperiences`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `candidates`
--
ALTER TABLE `candidates`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `candidates_rating`
--
ALTER TABLE `candidates_rating`
  MODIFY `rating_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `certifications`
--
ALTER TABLE `certifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobtypes`
--
ALTER TABLE `jobtypes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `postedjobs`
--
ALTER TABLE `postedjobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `salaryranges`
--
ALTER TABLE `salaryranges`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `soft_skills`
--
ALTER TABLE `soft_skills`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `workexperiences`
--
ALTER TABLE `workexperiences`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `candidates_languages`
--
ALTER TABLE `candidates_languages`
  ADD CONSTRAINT `candidates_languages_candidate_id_foreign` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `candidates_languages_language_id_foreign` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `candidates_softskills`
--
ALTER TABLE `candidates_softskills`
  ADD CONSTRAINT `candidates_softskills_candidate_id_foreign` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `candidates_softskills_softskill_id_foreign` FOREIGN KEY (`softskill_id`) REFERENCES `soft_skills` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `candidates_technicalskills`
--
ALTER TABLE `candidates_technicalskills`
  ADD CONSTRAINT `candidates_technicalskills_candidate_id_foreign` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `candidates_technicalskills_skill_id_foreign` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `postedjobs_candidates`
--
ALTER TABLE `postedjobs_candidates`
  ADD CONSTRAINT `postedjobs_candidates_candidate_id_foreign` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `postedjobs_candidates_postedjob_id_foreign` FOREIGN KEY (`postedjob_id`) REFERENCES `postedjobs` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `postedjobs_skills`
--
ALTER TABLE `postedjobs_skills`
  ADD CONSTRAINT `postedjobs_skills_posted_job_id_foreign` FOREIGN KEY (`posted_job_id`) REFERENCES `postedjobs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `postedjobs_skills_skill_id_foreign` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
