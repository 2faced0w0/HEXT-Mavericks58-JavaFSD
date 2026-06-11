 use cms_db;

select * from incident;

select * from user_info;

select * from officer;

select * from station;

SELECT * FROM station_head;

INSERT INTO station_head (name, user_id)
VALUES ('Agent Bond', 6);



INSERT INTO station (station_title, address, station_head_id)
VALUES ('Central Station', '123 Main Street, Chennai', 2);

SELECT id, name FROM station_head;


INSERT INTO user_info (username, password, role, created_at, updated_at)
VALUES ('agent_bond', 'password007', 'STATION_HEAD', NOW(), NOW());

INSERT INTO station_head (name, user_id)
VALUES ('Central Station Head', 1);

SHOW COLUMNS FROM user_info LIKE 'role';

ALTER TABLE user_info
MODIFY role ENUM('OFFICER', 'STATION_HEAD');
