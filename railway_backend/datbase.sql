swathi swathi2003 @gmail.com swathi @2003 create database railway;

use railway
CREATE TABLE admin (
    username varchar(20), email varchar(20), password varchar(20)
);

INSERT INTO
    admin (username, email, password)
VALUES (
        'swathi', 'swathi2003@gmail.com', 'swathi@2003'
    );

CREATE TABLE contacts (
    contact_id int NOT NULL AUTO_INCREMENT, firstName varchar(255) NOT NULL, email varchar(255) NOT NULL, subject varchar(255), message text NOT NULL, PRIMARY KEY (contact_id)
);

CREATE TABLE passenger (
    email varchar(20), phone char(12), pname varchar(20), pid int NOT NULL AUTO_INCREMENT, age int, gender enum('female', 'male', 'other'), PRIMARY KEY (pid)
);

INSERT INTO
    passenger (
        email, phone, pname, pid, age, gender
    )
VALUES (
        'shashe@gmail.com', '987654321', 'shashe', 1, 28, 'male'
    ),
    (
        'akash@gmail.com', '4445556666', 'akash', 2, 35, 'male'
    ),
    (
        'aishu@gmail.com', '7778889999', 'aishwarya', 3, 22, 'female'
    );

CREATE TABLE trains (
    train_num int NOT NULL, train_name varchar(20), class1A decimal(10, 2), class2A decimal(10, 2), class3A decimal(10, 2), sleeper decimal(10, 2), general decimal(10, 2), origin varchar(20), destination varchar(20), arrival time, departure time, mon tinyint(1), tue tinyint(1), wed tinyint(1), thu tinyint(1), fri tinyint(1), sat tinyint(1), sun tinyint(1), vacancy_1A int, vacancy_2A int, vacancy_3A int, vacancy_sl int, vacancy_gl int, PRIMARY KEY (train_num)
);

INSERT INTO
    trains (
        train_num, train_name, class1A, class2A, class3A, sleeper, general, origin, destination, arrival, departure, mon, tue, wed, thu, fri, sat, sun, vacancy_1A, vacancy_2A, vacancy_3A, vacancy_sl, vacancy_gl
    )
VALUES (
        1, 'Express One', 150.00, 100.00, 80.00, 50.00, 30.00, 'Mangalore', 'Bangalore', '08:00:00', '12:00:00', 1, 1, 1, 1, 1, 0, 0, 50, 49, 50, 50, 50
    ),
    (
        2, 'Super Fast Two', 200.00, 120.00, 100.00, 70.00, 40.00, 'mumbai', 'Bangalore', '10:00:00', '14:00:00', 1, 1, 0, 1, 0, 1, 1, 50, 50, 50, 50, 50
    ),
    (
        3, 'Local Three', 80.00, 60.00, 40.00, 30.00, 15.00, 'Mangalore', 'kundapur', '12:00:00', '16:00:00', 1, 1, 1, 1, 1, 0, 0, 10, 20, 30, 40, 50
    ),
    (
        17, 'Express Train', 100.50, 75.25, 50.75, 25.00, 10.00, 'Station A', 'Station B', '12:00:00', '15:00:00', 1, 0, 1, 0, 1, 0, 1, 50, 30, 20, 100, 50
    );

CREATE TABLE route (
    serial_no int NOT NULL, train_num int, time time, city varchar(20), cost_1A decimal(10, 2) DEFAULT '0.00', cost_2A decimal(10, 2) DEFAULT '0.00', cost_3A decimal(10, 2) DEFAULT '0.00', cost_sleeper decimal(10, 2) DEFAULT '0.00', cost_general decimal(10, 2) DEFAULT '0.00', KEY train_num_fk (train_num), CONSTRAINT train_num_fk FOREIGN KEY (train_num) REFERENCES trains (train_num) ON DELETE CASCADE
);

INSERT INTO
    route (
        serial_no, train_num, time, city, cost_1A, cost_2A, cost_3A, cost_sleeper, cost_general
    )
VALUES (
        1, 1, '08:00:00', 'Mangaluru CNTL', 150.00, 100.00, 80.00, 50.00, 30.00
    ),
    (
        2, 1, '08:30:00', 'Mangaluru Jn', 150.00, 100.00, 80.00, 60.00, 50.00
    ),
    (
        3, 1, '09:30:00', 'Bantawala', 150.00, 100.00, 80.00, 60.00, 50.00
    ),
    (
        4, 1, '10:00:00', 'Kabakaputtur', 250.00, 150.00, 100.00, 80.00, 50.00
    ),
    (
        5, 1, '10:30:00', 'Kabakaputtur', 250.00, 150.00, 100.00, 80.00, 50.00
    ),
    (
        6, 1, '02:00:00', 'Sakleshpur (SKLR)', 250.00, 150.00, 100.00, 80.00, 50.00
    ),
    (
        7, 1, '04:00:00', 'Hassan (HAS)', 500.00, 250.00, 200.00, 100.00, 60.00
    ),
    (
        8, 1, '06:00:00', 'Channarayapatna', 500.00, 250.00, 200.00, 100.00, 60.00
    ),
    (
        9, 1, '08:00:00', 'Shravanabelagola', 500.00, 250.00, 200.00, 100.00, 60.00
    ),
    (
        10, 1, '09:00:00', 'B.G. Naga', 500.00, 250.00, 200.00, 100.00, 60.00
    ),
    (
        11, 1, '09:30:00', 'Kunigal', 1000.00, 250.00, 200.00, 100.00, 60.00
    ),
    (
        12, 1, '10:30:00', 'Yesvantpur Jn', 1000.00, 250.00, 200.00, 100.00, 60.00
    ),
    (
        13, 1, '12:00:00', 'Bangalore', 1000.00, 250.00, 200.00, 100.00, 60.00
    );

CREATE TABLE booking (
    journey_date date, coach varchar(10), fare decimal(10, 2), seatsbooked int, train_num int, bid int NOT NULL AUTO_INCREMENT, PRIMARY KEY (bid), KEY train_numb_fk (train_num), CONSTRAINT train_numb_fk FOREIGN KEY (train_num) REFERENCES trains (train_num) ON DELETE CASCADE
);

INSERT INTO
    booking (
        journey_date, coach, fare, seatsbooked, train_num, bid
    )
VALUES (
        '2024-03-10', 'class1A', 450.00, 3, 1, 1
    );

CREATE TABLE booking_passenger (
    bid int NOT NULL, pid int NOT NULL, PRIMARY KEY (pid, bid), KEY bid_fk (bid), CONSTRAINT bid_fk FOREIGN KEY (bid) REFERENCES booking (bid) ON DELETE CASCADE, CONSTRAINT pid_fk FOREIGN KEY (pid) REFERENCES passenger (pid) ON DELETE CASCADE
);

CREATE VIEW search_trains_view AS
SELECT
    t.train_num AS train_num,
    t.train_name AS train_name,
    t.class1A AS class1A,
    t.class2A AS class2A,
    t.class3A AS class3A,
    t.sleeper AS sleeper,
    t.general AS general,
    t.origin AS origin,
    t.destination AS destination,
    t.arrival AS arrival,
    t.departure AS departure,
    t.mon AS mon,
    t.tue AS tue,
    t.wed AS wed,
    t.thu AS thu,
    t.fri AS fri,
    t.sat AS sat,
    t.sun AS sun,
    r.time AS route_time,
    r.city AS route_city
FROM trains t
    JOIN route r ON t.train_num = r.train_num;

CREATE TRIGGER after_booking_insert AFTER INSERT ON 
booking FOR EACH ROW 
BEGIN 
DECLARE
	seats_booked INT;
	SET seats_booked = NEW.seatsbooked;
	 CASE NEW . coach WHEN 'class1A' THEN UPDATE trains SET vacancy_1A = vacancy_1A - seats_booked WHERE train_num = NEW . train_num;
	WHEN 'class2A' THEN
	UPDATE trains
	SET
	    vacancy_2A = vacancy_2A - seats_booked
	WHERE
	    train_num = NEW.train_num;
	WHEN 'class3A' THEN
	UPDATE trains
	SET
	    vacancy_3A = vacancy_3A - seats_booked
	WHERE
	    train_num = NEW.train_num;
	WHEN 'sleeper' THEN
	UPDATE trains
	SET
	    vacancy_sl = vacancy_sl - seats_booked
	WHERE
	    train_num = NEW.train_num;
	WHEN 'general' THEN
	UPDATE trains
	SET
	    vacancy_gl = vacancy_gl - seats_booked
	WHERE
	    train_num = NEW.train_num;
END
	CASE;
END; 