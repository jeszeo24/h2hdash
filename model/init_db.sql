-- (Re)create the table

DROP TABLE IF EXISTS notes;
CREATE TABLE notes (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(255) NOT NULL,
    date DATE NULL
    );

INSERT INTO notes (text, date)
VALUES
    ("Hello there!", "2022-08-01"),
    ("Testing", "2022-09-11");