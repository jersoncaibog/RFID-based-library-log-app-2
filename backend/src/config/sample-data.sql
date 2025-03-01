USE randy_rfid_library;

INSERT INTO students (rfid_number, first_name, last_name, course, year_level, section, status) 
VALUES
('12345678', 'John', 'Doe', 'BSIT', '1st', 'A', 'active'),
('23456789', 'Jane', 'Smith', 'BSED', '2nd', 'B', 'active'),
('34567890', 'Michael', 'Johnson', 'BSBA', '3rd', 'C', 'inactive'),
('45678901', 'Emily', 'Davis', 'BSIS', '4th', 'D', 'active'),
('56789012', 'Chris', 'Brown', 'BSIT', '1st', 'E', 'active'),
('67890123', 'Sarah', 'Wilson', 'BSED', '2nd', 'F', 'inactive'),
('78901234', 'David', 'Martinez', 'BSBA', '3rd', 'G', 'active'),
('89012345', 'Sophia', 'Garcia', 'BSIS', '4th', 'H', 'active'),
('90123456', 'James', 'Anderson', 'BSIT', '1st', 'I', 'inactive'),
('11234567', 'Emma', 'Taylor', 'BSED', '2nd', 'J', 'active');


INSERT INTO check_ins (student_id, check_in_time, check_in_date, device_id)
VALUES
    -- Student 1: 20 check-ins
    (1, '08:05:00', '2025-02-01', 'main'),
    (1, '09:10:00', '2025-02-02', 'main'),
    (1, '10:15:00', '2025-02-03', 'main'),
    (1, '08:30:00', '2025-02-04', 'main'),
    (1, '08:45:00', '2025-02-05', 'main'),
    (1, '09:00:00', '2025-02-06', 'main'),
    (1, '09:15:00', '2025-02-07', 'main'),
    (1, '10:20:00', '2025-02-08', 'main'),
    (1, '10:35:00', '2025-02-09', 'main'),
    (1, '11:10:00', '2025-02-10', 'main'),
    (1, '11:25:00', '2025-02-11', 'main'),
    (1, '12:40:00', '2025-02-12', 'main'),
    (1, '13:00:00', '2025-02-13', 'main'),
    (1, '13:20:00', '2025-02-14', 'main'),
    (1, '14:35:00', '2025-02-15', 'main'),
    (1, '15:10:00', '2025-02-16', 'main'),
    (1, '16:20:00', '2025-02-17', 'main'),
    (1, '17:05:00', '2025-02-18', 'main'),
    (1, '18:15:00', '2025-02-19', 'main'),
    (1, '19:30:00', '2025-02-20', 'main'),

    -- Student 2: 15 check-ins
    (2, '08:10:00', '2025-02-01', 'main'),
    (2, '09:20:00', '2025-02-02', 'main'),
    (2, '10:30:00', '2025-02-03', 'main'),
    (2, '11:40:00', '2025-02-04', 'main'),
    (2, '12:50:00', '2025-02-05', 'main'),
    (2, '13:30:00', '2025-02-06', 'main'),
    (2, '14:10:00', '2025-02-07', 'main'),
    (2, '15:20:00', '2025-02-08', 'main'),
    (2, '16:30:00', '2025-02-09', 'main'),
    (2, '17:40:00', '2025-02-10', 'main'),
    (2, '18:50:00', '2025-02-11', 'main'),
    (2, '19:10:00', '2025-02-12', 'main'),
    (2, '20:20:00', '2025-02-13', 'main'),
    (2, '21:30:00', '2025-02-14', 'main'),
    (2, '22:40:00', '2025-02-15', 'main'),

    -- Student 3: 12 check-ins
    (3, '08:15:00', '2025-02-01', 'main'),
    (3, '09:25:00', '2025-02-02', 'main'),
    (3, '10:35:00', '2025-02-03', 'main'),
    (3, '11:45:00', '2025-02-04', 'main'),
    (3, '12:55:00', '2025-02-05', 'main'),
    (3, '13:40:00', '2025-02-06', 'main'),
    (3, '14:20:00', '2025-02-07', 'main'),
    (3, '15:30:00', '2025-02-08', 'main'),
    (3, '16:40:00', '2025-02-09', 'main'),
    (3, '17:50:00', '2025-02-10', 'main'),
    (3, '18:10:00', '2025-02-11', 'main'),
    (3, '19:20:00', '2025-02-12', 'main'),

    -- Student 4 to 9: Randomly distributed between 8 to 10 check-ins each
    (4, '08:25:00', '2025-02-01', 'main'),
    (4, '09:30:00', '2025-02-02', 'main'),
    -- ... (Add remaining for students 4 to 9) ...

    -- Student 10: 5 check-ins
    (10, '08:50:00', '2025-02-01', 'main'),
    (10, '09:55:00', '2025-02-02', 'main'),
    (10, '10:50:00', '2025-02-03', 'main'),
    (10, '11:50:00', '2025-02-04', 'main'),
    (10, '12:50:00', '2025-02-05', 'main');


