CREATE DATABASE banner_db;

USE banner_db;

CREATE TABLE banner_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    link VARCHAR(255) NOT NULL,
    timer INT NOT NULL
);
