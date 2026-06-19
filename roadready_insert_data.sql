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
-- 4. Insert Brands
-- ==========================================================
INSERT INTO brands (brand_name) VALUES
('Toyota'),
('Honda'),
('Ford'),
('BMW'),
('Tesla'),
('Yamaha'),
('Vespa');

-- ==========================================================
-- 5. Insert Vehicles
-- ==========================================================
INSERT INTO vehicles (brand_id, agent_id, model, specifications, pricing_per_day, is_available, image_url, location, vehicle_type, sub_type) VALUES
(1, 1, 'Camry', 'Automatic, Petrol, 5 Seats', 55.00, TRUE, 'camry.jpg', 'Downtown Center, NY', '4 Wheeler', 'Petrol'),
(2, 2, 'CR-V', 'Automatic, Hybrid, 5 Seats', 70.00, TRUE, 'crv.jpg', 'Airport Terminal, NY', '4 Wheeler', 'Petrol'),
(3, 3, 'Mustang', 'Manual, Petrol, 4 Seats', 95.00, TRUE, 'mustang.jpg', 'Downtown Center, NY', '4 Wheeler', 'Petrol'),
(4, 4, '3 Series', 'Automatic, Petrol, 5 Seats', 110.00, TRUE, '3series.jpg', 'Uptown Branch, NY', '4 Wheeler', 'Petrol'),
(5, 5, 'Model 3', 'Automatic, Electric, 5 Seats', 85.00, FALSE, 'model3.jpg', 'Airport Terminal, NY', '4 Wheeler', 'EV'),
(6, 1, 'YZF R3', 'Manual, Petrol, 2 Seats', 40.00, TRUE, 'r3.jpg', 'Downtown Center, NY', '2 Wheeler', 'Bike'),
(7, 2, 'GTS 300', 'Automatic, Petrol, 2 Seats', 30.00, TRUE, 'vespa.jpg', 'Downtown Center, NY', '2 Wheeler', 'Scooty');

-- ==========================================================
-- 6. Insert Reservations
-- ==========================================================
INSERT INTO reservations (customer_id, vehicle_id, pickup_time, dropoff_time, optional_extras, booking_status) VALUES
(1, 1, '2026-06-10 10:00:00', '2026-06-12 10:00:00', 'Child Seat', 'CONFIRMED'),
(2, 5, '2026-06-01 09:00:00', '2026-06-05 09:00:00', 'None', 'ACTIVE'),
(3, 3, '2026-06-15 14:00:00', '2026-06-16 14:00:00', 'GPS', 'PENDING'),
(1, 4, '2026-05-10 08:00:00', '2026-05-12 08:00:00', 'None', 'COMPLETED'),
(4, 2, '2026-04-01 10:00:00', '2026-04-03 10:00:00', 'Extra Insurance', 'COMPLETED'),
(5, 3, '2026-05-15 09:00:00', '2026-05-20 09:00:00', 'None', 'COMPLETED');

-- ==========================================================
-- 7. Insert Payments
-- ==========================================================
-- Reservation 1: 2 days @ 55/day = 110
INSERT INTO payments (reservation_id, amount, payment_method, payment_status) VALUES
(1, 110.00, 'CREDIT_CARD', 'SUCCESS');

-- Reservation 2: 4 days @ 85/day = 340
INSERT INTO payments (reservation_id, amount, payment_method, payment_status) VALUES
(2, 340.00, 'PAYPAL', 'SUCCESS');

-- Reservation 3: 1 day @ 95/day = 95
INSERT INTO payments (reservation_id, amount, payment_method, payment_status) VALUES
(3, 95.00, 'CREDIT_CARD', 'PENDING');

-- Reservation 4: 2 days @ 110/day = 220
INSERT INTO payments (reservation_id, amount, payment_method, payment_status) VALUES
(4, 220.00, 'DEBIT_CARD', 'SUCCESS');

-- Reservation 5: 2 days @ 70/day = 140
INSERT INTO payments (reservation_id, amount, payment_method, payment_status) VALUES
(5, 140.00, 'CREDIT_CARD', 'SUCCESS');

-- Reservation 6: 5 days @ 95/day = 475
INSERT INTO payments (reservation_id, amount, payment_method, payment_status) VALUES
(6, 475.00, 'PAYPAL', 'SUCCESS');

-- ==========================================================
-- 8. Insert Reviews
-- ==========================================================
-- Only putting a review for the COMPLETED reservation (Reservation 4)
INSERT INTO reviews (reservation_id, rating, comments) VALUES
(4, 5, 'Absolutely loved the BMW! Smooth handover and clean interior.'),
(1, 4, 'Great Camry, but the child seat was a bit hard to install.'),
(2, 5, 'The Model 3 was incredible to drive.'),
(5, 4, 'The CR-V was perfect for our weekend trip.'),
(6, 5, 'Driving a Mustang for 5 days was a dream come true!');

-- ==========================================================
-- 9. Insert Requests
-- ==========================================================
INSERT INTO requests (request_type, status, requested_by, vehicle_id, description, created_at, resolved_at) VALUES
('PASSWORD_RESET', 'PENDING', 1, NULL, NULL, NOW(), NULL),
('PASSWORD_RESET', 'PENDING', 2, NULL, NULL, NOW(), NULL),
('MAINTENANCE', 'PENDING', 11, 1, 'Oil change needed', NOW(), NULL),
('MAINTENANCE', 'PENDING', 12, 3, 'Brake pads worn out', NOW(), NULL),
('MAINTENANCE', 'RESOLVED', 13, 4, 'Routine checkup completed', '2026-06-10 10:00:00', '2026-06-16 10:00:00');

