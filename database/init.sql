CREATE DATABASE IF NOT EXISTS ensolvers_challenge;

USE ensolvers_challenge;

CREATE TABLE IF NOT EXISTS Notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    dateEdited DATE,
    archived BOOLEAN DEFAULT false,
    categories JSON,
    createdAt datetime,
    updatedAt datetime
);