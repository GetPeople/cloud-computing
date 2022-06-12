CREATE DATABASE db_get_people;
SET GLOBAL time_zone = "+7:00";


USE db_get_people;


CREATE TABLE IF NOT EXISTS `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` enum('petugas','pengguna') NOT NULL DEFAULT 'pengguna',
  `id_petugas` varchar(255) DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `users` (`id`, `username`, `email`, `password`, `name`, `role`, `id_petugas`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
('1ba40d76-46fd-4ffb-8818-06c92b54cd48', 'kurniyatul', 'kurniyatul@gmail.com', '$2b$10$1v3JXwvVIjbvOGdgsozuKu43MJAKFNTf8sGzxFGhzvxW4CuHMz2BW', 'nia', 'petugas', 'petugas12', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiIxYmE0MGQ3Ni00NmZkLTRmZmItODgxOC0wNmM5MmI1NGNkNDgiLCJ1c2VybmFtZSI6Imt1cm5peWF0dWwiLCJlbWFpbCI6Imt1cm5peWF0dWxAZ21haWwuY29tIiwibmFtZSI6Im5pYSIsInJvbGUiOiJwZXR1Z2FzIiwiaWRfcGV0dWdhcyI6InBldHVnYXMxMiIsImlhdCI6MTY1NDc1ODg3MCwiZXhwIjoxNjU0ODQ1MjcwfQ.3KkZafJb4nO4-WSvXtsf-Ml7BEDl1zlv4b-JzvrEpeY', '2022-06-01 18:09:29', '2022-06-09 07:14:30'),
('5040cd90-7c14-4183-b58c-4611fabc49f8', 'kurniyatul', 'kurniyatul1@gmail.com', '$2b$10$L2FqpiLDlgbRJpNLqwI41uGb3jo6wgHfFoJ/Vd9hqjmnShRQanjpu', 'nia', 'petugas', 'petugas12', NULL, '2022-06-03 14:51:48', '2022-06-03 14:51:48'),
('5ea7427a-ff49-4817-b14d-7c6320a39e53', 'nia', 'kurniyatul555@gmail.com', '$2b$10$gnWoCdktKV4Pn0qcZgqPl.JQ7oMJHBg0IohCZ75YcHMCVDChMcEHy', 'kurniyatul', 'petugas', '55555', NULL, '2022-06-07 15:59:20', '2022-06-07 15:59:20'),
('868776d8-e7bf-43d2-a1ef-ffa25b0f48db', 'kurniyatul', 'kurniyatul25@gmail.com', '$2b$10$QbveymjirpypVLBHq0OnM.SYiFunJp0vpvt.7J6MJ0LkKF.Sz6mMS', 'nia', 'petugas', 'petugas12', NULL, '2022-06-01 16:17:51', '2022-06-01 16:17:51');


CREATE TABLE `victims` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `image` text NOT NULL,
  `posko` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `gender` enum('Laki-Laki','Perempuan') DEFAULT NULL,
  `birthPlace` varchar(255) DEFAULT NULL,
  `birthDate` varchar(255) DEFAULT NULL,
  `momName` varchar(255) DEFAULT NULL,
  `nik` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `victims` (`id`, `image`, `posko`, `contact`, `name`, `gender`, `birthPlace`, `birthDate`, `momName`, `nik`, `createdAt`, `updatedAt`) VALUES
('444606c2-7833-40f1-b9bf-b7fe792a7259', 'https://storage.googleapis.com/get-people-model-project/database_wajah/5.jpg', 'Gambir', '085233225979', 'Fauzi Anggoro', 'Laki-Laki', 'Yogyakarta', '19/11/2000', 'Arum Sekarsari', '3904321911000004', '2022-06-12 08:21:32', '2022-06-12 08:21:32'),
('4f646194-a9ac-4fbd-9901-b4d339ab18d4', 'https://storage.googleapis.com/get-people-model-project/database_wajah/9.jpeg', 'Kemayoran', '085233225979', 'Aulia Annisa', 'Perempuan', 'Tanggerang', '15/06/2001', 'Kusuma Wardani', '3827195506010002', '2022-06-12 08:27:50', '2022-06-12 08:27:50'),
('53a8f0d0-14ab-4c82-b937-5e853447b803', 'https://storage.googleapis.com/get-people-model-project/database_wajah/4.png', 'Kemayoran', '085233225979', 'Yuli Permatasari', 'Perempuan', 'Malang', '05/05/2001', 'Hana Puspita', '4827034505010003', '2022-06-12 08:13:03', '2022-06-12 08:13:03'),
('80e79f1e-6ae2-4cd6-92ca-c500c2c60e09', 'https://storage.googleapis.com/get-people-model-project/database_wajah/6.jpg', 'Gambir', '085233225979', 'Hersanda Apriliani', 'Perempuan', 'Bogor', '15/09/2000', 'Ajeng Utari', '2934785509000009', '2022-06-12 08:23:25', '2022-06-12 08:23:25'),
('8538c280-b957-4738-91a5-5605b9665ae1', 'https://storage.googleapis.com/get-people-model-project/database_wajah/2.png', 'Tanah Abang', '085233225979', 'Kurniyatul Ainiyah', 'Perempuan', 'Sampang', '12/09/2001', 'Ratih Darminah', '3518035209010008', '2022-06-12 08:15:10', '2022-06-12 08:15:10'),
('8f578e3e-7eeb-48da-a257-765853c54da6', 'https://storage.googleapis.com/get-people-model-project/database_wajah/8.jpg', 'Tanah Abang', '085233225979', 'Kintan Kayla', 'Perempuan', 'Bogor', '10/11/2001', 'Kartini Pramudita', '2839105011010008', '2022-06-12 08:26:14', '2022-06-12 08:26:14'),
('a2e1752c-26d1-41ef-b1d0-380feea63e36', 'https://storage.googleapis.com/get-people-model-project/database_wajah/7.png', 'Kemayoran', '085233225979', 'Rizki Fitriani', 'Perempuan', 'Malang', '12/03/2001', 'Ani Astutiningtyas', '3847395203010003', '2022-06-12 08:24:44', '2022-06-12 08:24:44'),
('c566873a-cb05-4143-a98a-863fa2971b0d', 'https://storage.googleapis.com/get-people-model-project/database_wajah/1.png', 'Gambir', '085233225979', 'Yoga Pramudana', 'Laki-Laki', 'Pamekasan', '24/05/2001', 'Endang Kusumaningsih', '3528042405010007', '2022-06-12 08:19:12', '2022-06-12 08:19:12'),
('fff56c47-5b79-4a48-9b68-7e954449a91f', 'https://storage.googleapis.com/get-people-model-project/database_wajah/3.png', 'Tanah Abang', '085233225979', 'Fara Pertiwi', 'Perempuan', 'Malang', '28/06/2001', 'Elok Widyawati', '4529036806010004', '2022-06-12 08:16:56', '2022-06-12 08:16:56');

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

ALTER TABLE `victims`
  ADD PRIMARY KEY (`id`);
COMMIT;

