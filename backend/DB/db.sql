-- Table Customer
DROP TABLE IF EXISTS Customers CASCADE;
CREATE TABLE Customers (
    customer_id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    address VARCHAR(255),
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Table Vehicle
DROP TABLE IF EXISTS Vehicles CASCADE;
CREATE TABLE Vehicles (
    vehicle_id BIGSERIAL PRIMARY KEY,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT CHECK (year >= 1900 AND year <= EXTRACT(YEAR FROM CURRENT_DATE)),
    category VARCHAR(50),
    daily_price NUMERIC(10, 2) NOT NULL,
    availability_status VARCHAR(15) DEFAULT 'available' CHECK (availability_status IN ('available', 'unavailable'))
);

-- Table Administrator
DROP TABLE IF EXISTS Administrators CASCADE;
CREATE TABLE Administrators (
    admin_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    password VARCHAR(255) NOT NULL -- Added the password field
);

-- Table Booking
DROP TABLE IF EXISTS Bookings CASCADE;
CREATE TABLE Bookings (
    booking_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    pickup_location VARCHAR(100),
    dropoff_location VARCHAR(100),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (vehicle_id) REFERENCES Vehicles(vehicle_id) ON DELETE SET NULL
);

-- Table Message
DROP TABLE IF EXISTS Messages CASCADE;
CREATE TABLE Messages (
    message_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    content TEXT NOT NULL,
    sent_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE CASCADE
);

-- Table Rating
DROP TABLE IF EXISTS Ratings CASCADE;
CREATE TABLE Ratings (
    rating_id SERIAL PRIMARY KEY,
    booking_id INT NOT NULL,
    customer_id INT NOT NULL,
    score INT CHECK (score BETWEEN 1 AND 5),
    comment TEXT,
    FOREIGN KEY (booking_id) REFERENCES Bookings(booking_id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE CASCADE
);


INSERT INTO Customers (
    first_name,
    last_name, 
    email, 
    phone, 
    address, 
    username, 
    password
)
VALUES (
    'John', 
    'Doe', 
    'john.doe@example.com', 
    '1234567890', 
    '123 Elm Street', 
    'johndoe', 
    'password123'
);