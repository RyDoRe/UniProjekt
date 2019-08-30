-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 30. Aug 2019 um 19:50
-- Server-Version: 10.3.16-MariaDB
-- PHP-Version: 7.1.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `taskman`
--
CREATE DATABASE IF NOT EXISTS `taskman` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `taskman`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `boards`
--

CREATE TABLE `boards` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `boards`
--

INSERT INTO `boards` (`id`, `name`) VALUES
('40b858a7-aaf8-4cce-b0dd-a58f2548d655', 'TestProjekt1'),
('25f6f501-e140-4a01-a582-40b729ad01b2', 'TestProjekt2'),
('0a656085-bd1c-4098-9fe6-297a0a75f68c', 'TestProjekt3');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `boards_pages_relation`
--

CREATE TABLE `boards_pages_relation` (
  `boardId` varchar(255) NOT NULL,
  `pageId` varchar(255) NOT NULL,
  `displayOrder` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `boards_pages_relation`
--

INSERT INTO `boards_pages_relation` (`boardId`, `pageId`, `displayOrder`) VALUES
('40b858a7-aaf8-4cce-b0dd-a58f2548d655', '306c0f94-c9e7-11e9-a32f-2a2ae2dbcce4', 0),
('40b858a7-aaf8-4cce-b0dd-a58f2548d655', '36e02a81-8017-4d10-bc75-8f4e0a5e258f', 1),
('40b858a7-aaf8-4cce-b0dd-a58f2548d655', 'be14ead6-76c3-49bd-a226-72f284b82d67', 2),
('25f6f501-e140-4a01-a582-40b729ad01b2', '306c0f94-c9e7-11e9-a32f-2a2ae2dbcce4', 0),
('25f6f501-e140-4a01-a582-40b729ad01b2', '36e02a81-8017-4d10-bc75-8f4e0a5e258f', 1),
('25f6f501-e140-4a01-a582-40b729ad01b2', 'be14ead6-76c3-49bd-a226-72f284b82d67', 2),
('0a656085-bd1c-4098-9fe6-297a0a75f68c', '306c0f94-c9e7-11e9-a32f-2a2ae2dbcce4', 0),
('0a656085-bd1c-4098-9fe6-297a0a75f68c', '36e02a81-8017-4d10-bc75-8f4e0a5e258f', 1),
('0a656085-bd1c-4098-9fe6-297a0a75f68c', 'be14ead6-76c3-49bd-a226-72f284b82d67', 2);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `pages`
--

CREATE TABLE `pages` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `isDefault` tinyint(1) NOT NULL,
  `defaultDisplayOrder` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `pages`
--

INSERT INTO `pages` (`id`, `name`, `state`, `isDefault`, `defaultDisplayOrder`) VALUES
('306c0f94-c9e7-11e9-a32f-2a2ae2dbcce4', 'TODO', 'todo', 1, 0),
('36e02a81-8017-4d10-bc75-8f4e0a5e258f', 'In Progress', 'In Progress', 1, 1),
('be14ead6-76c3-49bd-a226-72f284b82d67', 'Done', 'Done', 1, 2),
('9f1f4908-765a-47fe-9dc4-b5f7e02dd6cc', 'TestPage1', 'TestPage1', 0, 0),
('a91d75a1-4b8b-464a-b2b4-4a8176c9e4dd', 'TestPage2', 'TestPage2', 0, 0),
('1230039d-31f2-458a-a8b4-f5451f1c9feb', 'TestPage3', 'TestPage3', 0, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `tasks`
--

CREATE TABLE `tasks` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `startDate` bigint(20) DEFAULT NULL,
  `endDate` bigint(20) DEFAULT NULL,
  `userId` varchar(255) NOT NULL,
  `pageId` varchar(255) NOT NULL,
  `boardId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `tasks`
--

INSERT INTO `tasks` (`id`, `name`, `description`, `startDate`, `endDate`, `userId`, `pageId`, `boardId`) VALUES
('09895dc9-eb8b-43c8-aa43-5c8ab223273e', 'Aufgabe1', 'Aufgabe1_Beschreibung', 1567186972948, 1567186972948, 'f1d179d4-82b9-4ffc-abc7-4e3f1c41fd50', '306c0f94-c9e7-11e9-a32f-2a2ae2dbcce4', '40b858a7-aaf8-4cce-b0dd-a58f2548d655'),
('1bfeccb7-13cf-4c2c-990c-bfe2e086b843', 'Aufgabe2', 'Aufgabe2_Beschreibung', 1567186988210, 1567186988210, 'f1d179d4-82b9-4ffc-abc7-4e3f1c41fd50', '306c0f94-c9e7-11e9-a32f-2a2ae2dbcce4', '40b858a7-aaf8-4cce-b0dd-a58f2548d655'),
('b27e2f3b-d72c-4563-abdf-8150a4e7ab95', 'TestProjekt2Aufgabe1', 'TestProjekt2Aufgabe1', 1567187102201, 1567187102201, 'c6a3a994-66dd-4ac5-ba24-8ac23fb9faad', '306c0f94-c9e7-11e9-a32f-2a2ae2dbcce4', '25f6f501-e140-4a01-a582-40b729ad01b2'),
('4d9ec181-3c5c-4a62-95bf-e891bc1e34df', 'TestProjekt2Aufgabe2', 'TestProjekt2Aufgabe2', 1567187154825, 1567187154825, 'a0ddb352-b39d-45f5-add7-0dad0444590c', '306c0f94-c9e7-11e9-a32f-2a2ae2dbcce4', '25f6f501-e140-4a01-a582-40b729ad01b2');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `userPassword` varchar(255) NOT NULL,
  `accessToken` varchar(255) DEFAULT NULL,
  `userRole` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `username`, `userPassword`, `accessToken`, `userRole`) VALUES
('a0ddb352-b39d-45f5-add7-0dad0444590c', '', '', 'Testuser1', '1234', '', 'USER'),
('c6a3a994-66dd-4ac5-ba24-8ac23fb9faad', '', '', 'Admin', 'admin', '', 'USER'),
('f1d179d4-82b9-4ffc-abc7-4e3f1c41fd50', 'Dominik', 'Renz', 'Dominik', '1234', 'eec94aca-7252-4237-b066-4fe5307fa26b', 'ADMIN');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`id`),
  ADD UNIQUE KEY `uuid_2` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
