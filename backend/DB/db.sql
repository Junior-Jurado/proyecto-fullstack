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
    availability_status VARCHAR(15) DEFAULT 'Reservado' CHECK (availability_status IN ('Reservado', 'En uso', 'Finalizado')),
    image VARCHAR(200)
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
    description VARCHAR(255),
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

INSERT INTO Vehicles (brand, model, year, category, daily_price, availability_status, image)
VALUES
    ('Toyota', 'Corolla', 2020, 'Sedan', 45.99, 'available', 'https://cdn.motor1.com/images/mgl/6ZzYpG/s1/toyota-corolla-hybrid-2024.webp'),
    ('Honda', 'Civic', 2019, 'Sedan', 50.00, 'available', 'https://www.elcarrocolombiano.com/wp-content/uploads/2016/07/20160719-HONDA-CIVIC-01.jpg.webp'),
    ('Ford', 'Mustang', 2021, 'Coupe', 120.00, 'available', 'https://autodigital.com.co/wp-content/uploads/2024/04/Ford-Mstang-GT-toma-aire-Autodigital.jpg'),
    ('Chevrolet', 'Impala', 2018, 'Sedan', 55.75, 'available', 'https://storagegohistorics.blob.core.windows.net/stock/4029-0-medium.jpg?v=63847393114330'),
    ('BMW', 'X5', 2022, 'SUV', 150.00, 'available', 'https://acnews.blob.core.windows.net/imgnews/extralarge/NAZ_2fb92f06d2224e88aace8d73c850884e.jpg'),
    ('Audi', 'A4', 2020, 'Sedan', 70.50, 'available', 'https://autos93.com/cdn/shop/files/7F9A0CD5-C65A-4E3F-AD9D-90AB5F1ADA82_1024x1024@2x.jpg?v=1715120167'),
    ('Mercedes-Benz', 'E-Class', 2021, 'Sedan', 85.00, 'available', 'https://www.autoblog.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_376/MjA5MDg5MjQ3MTczODc5NDA4/image-placeholder-title.webp'),
    ('Nissan', 'Altima', 2017, 'Sedan', 40.00, 'available', 'https://www.elcarrocolombiano.com/wp-content/webp-express/webp-images/uploads/2022/06/20220609-NISSAN-ALTIMA-2023-PORTADA.jpg.webp'),
    ('Kia', 'Sportage', 2023, 'SUV', 65.00, 'available', 'https://metrokia.co/wp-content/uploads/2022/08/sportage-nq5-1.png'),
    ('Hyundai', 'Sonata', 2019, 'Sedan', 49.99, 'available', 'https://vehicle-images.dealerinspire.com/3a4a-110005802/KMHL54JJ7RA098704/62e6914ce2836d0424df134da34e2476.jpg');

