-- (Re)create the table

DROP TABLE IF EXISTS notes;
CREATE TABLE notes (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(500) NOT NULL,
    date VARCHAR(100)
    );

INSERT INTO notes (text, date)
VALUES
    ("Hello there! I miss you!", "2022-08-01"),
    ("Testing yo yo yo... 
    You alive?", "2022-09-11");

DROP TABLE IF EXISTS files;
CREATE TABLE files (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  filename VARCHAR(500)
);