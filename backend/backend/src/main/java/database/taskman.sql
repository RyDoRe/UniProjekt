-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 29. Aug 2019 um 17:31
-- Server-Version: 10.4.6-MariaDB
-- PHP-Version: 7.1.31

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
('0a6a7864-a38a-4183-88fc-1b55d91f948f', 'Tester'),
('ebf57399-b562-4827-b61a-51052811ae88', 'Tester1'),
('9977b9ed-78f0-4d1b-9dab-233acef15920', 'Teser2');

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
('0a6a7864-a38a-4183-88fc-1b55d91f948f', '36e02a81-8017-4d10-bc75-8f4e0a5e258f', 0),
('0a6a7864-a38a-4183-88fc-1b55d91f948f', '306c0f94-c9e7-11e9-a32f-2a2ae2dbcce4', 1),
('0a6a7864-a38a-4183-88fc-1b55d91f948f', 'be14ead6-76c3-49bd-a226-72f284b82d67', 2),
('ebf57399-b562-4827-b61a-51052811ae88', '306c0f94-c9e7-11e9-a32f-2a2ae2dbcce4', 0),
('ebf57399-b562-4827-b61a-51052811ae88', '36e02a81-8017-4d10-bc75-8f4e0a5e258f', 1),
('ebf57399-b562-4827-b61a-51052811ae88', 'be14ead6-76c3-49bd-a226-72f284b82d67', 2),
('9977b9ed-78f0-4d1b-9dab-233acef15920', '306c0f94-c9e7-11e9-a32f-2a2ae2dbcce4', 0),
('9977b9ed-78f0-4d1b-9dab-233acef15920', '36e02a81-8017-4d10-bc75-8f4e0a5e258f', 1),
('9977b9ed-78f0-4d1b-9dab-233acef15920', 'be14ead6-76c3-49bd-a226-72f284b82d67', 2);

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
('306c0f94-c9e7-11e9-a32f-2a2ae2dbcce4', 'TO-DO', 'TO-DO', 1, 0),
('36e02a81-8017-4d10-bc75-8f4e0a5e258f', 'In Progress', 'In Progress', 1, 1),
('be14ead6-76c3-49bd-a226-72f284b82d67', 'Done', 'Done', 1, 2);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `tasks`
--

CREATE TABLE `tasks` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `startDate` timestamp NULL DEFAULT NULL,
  `endDate` timestamp NULL DEFAULT NULL,
  `userId` varchar(255) NOT NULL,
  `pageId` varchar(255) NOT NULL,
  `boardId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
('382118fc-dfdf-4851-9af3-d0037cadac84', 'Gregor', 'Fritze', 'snowmee', '1234', 'a85cc5ee-39f6-4880-ab18-b2354220c282', 'ADMIN');

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
