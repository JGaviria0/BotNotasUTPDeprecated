CREATE DATABASE database_bot;

USE database_bot;

CREATE TABLE users (
    id INT(11) NOT NULL,
    id_discord INT(20) NOT NULL,
    usename VARCHAR(20) NOT NULL,
    usename_discord VARCHAR(60) NOT NULL,
    password VARCHAR(60) NOT NULL   
);

ALTER TABLE users
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;
 
DESCRIBE users;