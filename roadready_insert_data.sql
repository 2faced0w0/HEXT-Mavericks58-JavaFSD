-- Demo Data for Simplified RoadReady Car Rental Platform
-- Generated: June 1, 2026

USE roadready_db;

-- ==========================================================
-- 0. Insert Login Info (Shared Credentials)
-- ==========================================================
INSERT INTO login_info (email, password_hash, role, is_active) VALUES
-- Customers (IDs 1-5)
('john.doe@example.com', 'hashed_pass_123', 'CUSTOMER', TRUE),
('jane.smith@example.com', 'hashed_pass_456', 'CUSTOMER', TRUE),
('michael.j@example.com', 'hashed_pass_789', 'CUSTOMER', TRUE),
('emily.clark@example.com', 'hashed_pass_321', 'CUSTOMER', TRUE),
('robert.w@example.com', 'hashed_pass_654', 'CUSTOMER', TRUE),
-- Admins (IDs 6-10)
('admin@roadready.com', 'hashed_admin_pass', 'ADMIN', TRUE),
('bob@roadready.com', 'hashed_admin_pass2', 'ADMIN', TRUE),
('charlie@roadready.com', 'hashed_admin_pass3', 'ADMIN', TRUE),
('diana@roadready.com', 'hashed_admin_pass4', 'ADMIN', TRUE),
('ethan@roadready.com', 'hashed_admin_pass5', 'ADMIN', TRUE),
-- Rental Agents (IDs 11-15)
('tom@roadready.com', 'hashed_agent_1', 'AGENT', TRUE),
('sarah@roadready.com', 'hashed_agent_2', 'AGENT', TRUE),
('mike@roadready.com', 'hashed_agent_3', 'AGENT', TRUE),
('dave@roadready.com', 'hashed_agent_4', 'AGENT', TRUE),
('lisa@roadready.com', 'hashed_agent_5', 'AGENT', TRUE);

-- ==========================================================
-- 1. Insert Customers
-- ==========================================================
INSERT INTO customers (name, phone_number, user_id) VALUES
('John Doe', '+1-555-0101', 1),
('Jane Smith', '+1-555-0102', 2),
('Michael Johnson', '+1-555-0103', 3),
('Emily Clark', '+1-555-0104', 4),
('Robert Wilson', '+1-555-0105', 5);

-- ==========================================================
-- 2. Insert Admins
-- ==========================================================
INSERT INTO admins (name, phone_number, user_id) VALUES
('Alice Admin', '+1-555-0000', 6),
('Bob Admin', '+1-555-0001', 7),
('Charlie Admin', '+1-555-0002', 8),
('Diana Admin', '+1-555-0003', 9),
('Ethan Admin', '+1-555-0004', 10);

-- ==========================================================
-- 3. Insert Rental Agents
-- ==========================================================
INSERT INTO rental_agents (name, phone_number, admin_id, user_id) VALUES
('Tom Agent', '+1-555-1111', 1, 11),
('Sarah Agent', '+1-555-2222', 2, 12),
('Mike Agent', '+1-555-3333', 3, 13),
('Dave Agent', '+1-555-4444', 4, 14),
('Lisa Agent', '+1-555-5555', 5, 15);

-- ==========================================================
-- 4. Insert Brands (15 total)
-- ==========================================================
INSERT INTO brands (brand_name) VALUES
('Toyota'),
('Honda'),
('Ford'),
('BMW'),
('Tesla'),
('Yamaha'),
('Vespa'),
('Audi'),
('Mercedes-Benz'),
('Volkswagen'),
('Nissan'),
('Chevrolet'),
('Hyundai'),
('Kia'),
('Subaru');

-- ==========================================================
-- 5. Insert Vehicles (15 total)
-- ==========================================================
INSERT INTO vehicles (brand_id, agent_id, model, specifications, pricing_per_day, availability_status, image_url, location, vehicle_type, sub_type) VALUES
(1, 1, 'Camry', 'Automatic, Petrol, 5 Seats', 55.00, 'AVAILABLE', 'camry.jpg', 'Downtown Center, NY', '4 Wheeler', 'Petrol'),
(2, 2, 'CR-V', 'Automatic, Hybrid, 5 Seats', 70.00, 'AVAILABLE', 'crv.jpg', 'Airport Terminal, NY', '4 Wheeler', 'Petrol'),
(3, 3, 'Mustang', 'Manual, Petrol, 4 Seats', 95.00, 'AVAILABLE', 'mustang.jpg', 'Downtown Center, NY', '4 Wheeler', 'Petrol'),
(4, 4, '3 Series', 'Automatic, Petrol, 5 Seats', 110.00, 'AVAILABLE', '3series.jpg', 'Uptown Branch, NY', '4 Wheeler', 'Petrol'),
(5, 5, 'Model 3', 'Automatic, Electric, 5 Seats', 85.00, 'MAINTENANCE', 'model3.jpg', 'Airport Terminal, NY', '4 Wheeler', 'EV'),
(6, 1, 'YZF R3', 'Manual, Petrol, 2 Seats', 40.00, 'AVAILABLE', 'r3.jpg', 'Downtown Center, NY', '2 Wheeler', 'Bike'),
(7, 2, 'GTS 300', 'Automatic, Petrol, 2 Seats', 30.00, 'AVAILABLE', 'vespa.jpg', 'Downtown Center, NY', '2 Wheeler', 'Scooty'),
(8, 3, 'A4', 'Automatic, Petrol, 5 Seats', 100.00, 'AVAILABLE', 'a4.jpg', 'Airport Terminal, NY', '4 Wheeler', 'Petrol'),
(9, 4, 'C-Class', 'Automatic, Petrol, 5 Seats', 105.00, 'AVAILABLE', 'cclass.jpg', 'Downtown Center, NY', '4 Wheeler', 'Petrol'),
(10, 5, 'Golf', 'Manual, Petrol, 5 Seats', 50.00, 'AVAILABLE', 'golf.jpg', 'Uptown Branch, NY', '4 Wheeler', 'Petrol'),
(11, 1, 'Altima', 'Automatic, Petrol, 5 Seats', 52.00, 'AVAILABLE', 'altima.jpg', 'Downtown Center, NY', '4 Wheeler', 'Petrol'),
(12, 2, 'Silverado', 'Automatic, Diesel, 5 Seats', 80.00, 'AVAILABLE', 'silverado.jpg', 'Airport Terminal, NY', '4 Wheeler', 'Diesel'),
(13, 3, 'Elantra', 'Automatic, Petrol, 5 Seats', 48.00, 'AVAILABLE', 'elantra.jpg', 'Downtown Center, NY', '4 Wheeler', 'Petrol'),
(14, 4, 'Optima', 'Automatic, Petrol, 5 Seats', 49.00, 'AVAILABLE', 'optima.jpg', 'Uptown Branch, NY', '4 Wheeler', 'Petrol'),
(15, 5, 'Outback', 'Automatic, Petrol, 5 Seats', 65.00, 'AVAILABLE', 'outback.jpg', 'Airport Terminal, NY', '4 Wheeler', 'Petrol');

-- ==========================================================
-- 6. Insert Reservations (15 total)
-- ==========================================================
INSERT INTO reservations (customer_id, vehicle_id, pickup_time, dropoff_time, optional_extras, booking_status) VALUES
(1, 1, '2026-06-10 10:00:00', '2026-06-12 10:00:00', 'Child Seat', 'COMPLETED'),
(2, 5, '2026-06-01 09:00:00', '2026-06-05 09:00:00', 'None', 'ACTIVE'),
(3, 3, '2026-06-15 14:00:00', '2026-06-16 14:00:00', 'GPS', 'PENDING'),
(1, 4, '2026-05-10 08:00:00', '2026-05-12 08:00:00', 'None', 'COMPLETED'),
(4, 2, '2026-04-01 10:00:00', '2026-04-03 10:00:00', 'Extra Insurance', 'COMPLETED'),
(5, 3, '2026-05-15 09:00:00', '2026-05-20 09:00:00', 'None', 'COMPLETED'),
(2, 8, '2026-06-18 10:00:00', '2026-06-20 10:00:00', 'GPS', 'CONFIRMED'),
(3, 9, '2026-06-22 09:00:00', '2026-06-25 09:00:00', 'None', 'CONFIRMED'),
(4, 10, '2026-07-01 10:00:00', '2026-07-05 10:00:00', 'Child Seat', 'PENDING'),
(5, 11, '2026-07-10 08:00:00', '2026-07-12 08:00:00', 'None', 'PENDING'),
(1, 12, '2026-04-10 08:00:00', '2026-04-12 08:00:00', 'Extra Insurance', 'COMPLETED'),
(2, 13, '2026-03-01 10:00:00', '2026-03-03 10:00:00', 'None', 'COMPLETED'),
(3, 14, '2026-02-15 09:00:00', '2026-02-20 09:00:00', 'GPS', 'COMPLETED'),
(4, 15, '2026-01-10 08:00:00', '2026-01-12 08:00:00', 'None', 'COMPLETED'),
(5, 1, '2025-12-01 10:00:00', '2025-12-05 10:00:00', 'Child Seat', 'COMPLETED');

-- ==========================================================
-- 7. Insert Payments (15 total)
-- ==========================================================
INSERT INTO payments (reservation_id, amount, payment_method, payment_status) VALUES
(1, 110.00, 'CREDIT_CARD', 'SUCCESS'),
(2, 340.00, 'PAYPAL', 'SUCCESS'),
(3, 95.00, 'CREDIT_CARD', 'PENDING'),
(4, 220.00, 'DEBIT_CARD', 'SUCCESS'),
(5, 140.00, 'CREDIT_CARD', 'SUCCESS'),
(6, 475.00, 'PAYPAL', 'SUCCESS'),
(7, 200.00, 'CREDIT_CARD', 'SUCCESS'),
(8, 315.00, 'DEBIT_CARD', 'SUCCESS'),
(9, 200.00, 'PAYPAL', 'PENDING'),
(10, 104.00, 'CREDIT_CARD', 'PENDING'),
(11, 160.00, 'CREDIT_CARD', 'SUCCESS'),
(12, 96.00, 'PAYPAL', 'SUCCESS'),
(13, 245.00, 'DEBIT_CARD', 'SUCCESS'),
(14, 98.00, 'CREDIT_CARD', 'SUCCESS'),
(15, 220.00, 'PAYPAL', 'SUCCESS');

-- ==========================================================
-- 8. Insert Reviews (15 total)
-- ==========================================================
INSERT INTO reviews (reservation_id, rating, comments) VALUES
(4, 5, 'Absolutely loved the BMW! Smooth handover and clean interior.'),
(1, 4, 'Great Camry, but the child seat was a bit hard to install.'),
(2, 5, 'The Model 3 was incredible to drive.'),
(5, 4, 'The CR-V was perfect for our weekend trip.'),
(6, 5, 'Driving a Mustang for 5 days was a dream come true!'),
(7, 4, 'The Audi was great, very comfortable.'),
(8, 5, 'Loved the Mercedes, very luxurious!'),
(11, 4, 'Silverado is a beast! Great for moving stuff.'),
(12, 3, 'Elantra was okay, but a bit dirty.'),
(13, 2, 'Optima had a weird smell.'),
(14, 5, 'Outback was perfect for our camping trip!'),
(15, 4, 'Camry was reliable as always.'),
(3, 5, 'Will definitely rent the BMW again.'),
(9, 4, 'Good experience overall.'),
(10, 5, 'Mustang was so much fun!');

-- ==========================================================
-- 9. Insert Requests (15 total)
-- ==========================================================
INSERT INTO requests (request_type, status, requested_by, vehicle_id, description, days_since_last_service, created_at, resolved_at) VALUES
('PASSWORD_RESET', 'PENDING', 1, NULL, NULL, NULL, NOW(), NULL),
('PASSWORD_RESET', 'PENDING', 2, NULL, NULL, NULL, NOW(), NULL),
('MAINTENANCE', 'PENDING', 11, 1, 'Oil change needed', 45, NOW(), NULL),
('MAINTENANCE', 'PENDING', 12, 3, 'Brake pads worn out', 50, NOW(), NULL),
('MAINTENANCE', 'RESOLVED', 13, 4, 'Routine checkup completed', 38, '2026-06-10 10:00:00', '2026-06-16 10:00:00'),
('PASSWORD_RESET', 'RESOLVED', 3, NULL, NULL, NULL, '2026-06-01 10:00:00', '2026-06-02 10:00:00'),
('PASSWORD_RESET', 'RESOLVED', 4, NULL, NULL, NULL, '2026-06-05 10:00:00', '2026-06-06 10:00:00'),
('MAINTENANCE', 'PENDING', 14, 5, 'Battery check', 42, NOW(), NULL),
('MAINTENANCE', 'RESOLVED', 15, 6, 'Tire replacement', 55, '2026-05-10 10:00:00', '2026-05-12 10:00:00'),
('PASSWORD_RESET', 'PENDING', 5, NULL, NULL, NULL, NOW(), NULL),
('MAINTENANCE', 'PENDING', 11, 7, 'Scratch repair', 36, NOW(), NULL),
('MAINTENANCE', 'RESOLVED', 12, 8, 'Wiper fluid refill', 60, '2026-05-15 10:00:00', '2026-05-16 10:00:00'),
('PASSWORD_RESET', 'RESOLVED', 6, NULL, NULL, NULL, '2026-04-10 10:00:00', '2026-04-11 10:00:00'),
('MAINTENANCE', 'PENDING', 13, 9, 'Engine light on', 48, NOW(), NULL),
('MAINTENANCE', 'RESOLVED', 14, 10, 'Oil change', 39, '2026-03-10 10:00:00', '2026-03-12 10:00:00');

-- ==========================================================
-- 10. Insert Promotions (1 so banner can work)
-- ==========================================================
INSERT INTO promotions (promo_code, created_at, valid_till, discount_percentage, is_banner_active) VALUES
('SUMMER26', NOW(), '2026-09-01 00:00:00', 15, TRUE),
('WINTER26', NOW(), '2026-12-31 00:00:00', 10, FALSE);

