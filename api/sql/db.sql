DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    id_cliente SERIAL PRIMARY KEY,
    document_id INTEGER UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    gender VARCHAR(255),
    phone VARCHAR(255),
    birthday DATE
);