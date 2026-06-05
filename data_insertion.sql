use roadreadyspringimpl_db;

-- 1. Users
INSERT INTO users (name, email, password, phone_number, role) VALUES
('Essha', 'essha@example.com', 'pass123', '9876543210', 'Customer'),
('Bhavna', 'bhavna@example.com', 'pass123', '8765432109', 'Customer'),
('Admin User', 'admin@roadready.com', 'admin123', '7654321098', 'Admin'),
('Agent Smith', 'agent@roadready.com', 'agent123', '6543210987', 'Agent'),
('Rahul', 'rahul@example.com', 'pass123', '5432109876', 'Customer');

-- 2. Brands
INSERT INTO brands (brand_name) VALUES
('Hyundai'), ('Maruti Suzuki'), ('Honda'), ('Tata'), ('Mahindra');

-- 3. Vehicles
INSERT INTO vehicles (brand_id, model, location, specifications, pricing_per_day, availability_status, image_url) VALUES
(1, 'Creta', 'Chennai Airport', 'SUV, Automatic, 5 Seater', 2000.00, 'Available', 'creta.jpg'),
(4, 'Nexon', 'Chennai Central', 'Compact SUV, Manual, 5 Seater', 1500.00, 'Available', 'nexon.jpg'),
(2, 'Swift', 'Adyar, Chennai', 'Hatchback, Manual, 5 Seater', 1000.00, 'Rented', 'swift.jpg'),
(3, 'City', 'OMR, Chennai', 'Sedan, Automatic, 5 Seater', 1800.00, 'Available', 'city.jpg'),
(5, 'Thar', 'Tambaram, Chennai', '4x4, Manual, 4 Seater', 2500.00, 'Available', 'thar.jpg');

-- 4. Reservations
INSERT INTO reservations (user_id, vehicle_id, pickup_datetime, dropoff_datetime, total_amount, status) VALUES
(1, 3, '2026-06-01 10:00:00', '2026-06-03 10:00:00', 2000.00, 'Confirmed'),
(2, 1, '2026-06-05 09:00:00', '2026-06-06 09:00:00', 2000.00, 'Pending'),
(5, 4, '2026-05-20 08:00:00', '2026-05-22 08:00:00', 3600.00, 'Completed'),
(1, 2, '2026-06-10 10:00:00', '2026-06-12 10:00:00', 3000.00, 'Confirmed'),
(2, 5, '2026-07-01 08:00:00', '2026-07-05 08:00:00', 10000.00, 'Pending');

-- 5. Payments
INSERT INTO payments (reservation_id, amount, payment_method, payment_status) VALUES
(1, 2000.00, 'Credit Card', 'Success'),
(2, 2000.00, 'UPI', 'Pending'),
(3, 3600.00, 'Debit Card', 'Success'),
(4, 3000.00, 'Credit Card', 'Success'),
(5, 10000.00, 'Net Banking', 'Pending');

-- 6. Reviews
INSERT INTO reviews (user_id, vehicle_id, rating, review_text) VALUES
(5, 4, 5, 'Excellent car, very smooth ride.'),
(1, 3, 4, 'Good condition, but pickup was slightly delayed.'),
(2, 1, 5, 'Clean interior and great mileage.'),
(5, 2, 4, 'Value for money.'),
(1, 5, 5, 'Perfect for off-roading!');