DROP TABLE IF EXISTS Users CASCADE;
CREATE TABLE Users(
    userId SERIAL PRIMARY KEY,
    document_type INT,
    document_id INTEGER UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    gender VARCHAR(255),
    phone VARCHAR(255),
    birthday DATE,
    user_type INT,
    user_status BOOLEAN

);

DROP TABLE IF EXISTS Payment CASCADE;
CREATE TABLE Payment(
    payment_id SERIAL PRIMARY KEY,
    pay_description TEXT,
    payment_date DATE,
    pay_time TIME,
    pay_type VARCHAR(255),
    amount INTEGER,
    card_number VARCHAR(255),
    pay_status BOOLEAN
);
-- en boolean 0 es falso, cualquier otro valor es true
DROP TABLE IF EXISTS Bank CASCADE;
CREATE TABLE Bank(
    bank_id SERIAL PRIMARY KEY,
    bank_name VARCHAR(255)
);

DROP TABLE IF EXISTS Debit CASCADE;
CREATE TABLE Debit(
    debit_number VARCHAR(255) PRIMARY KEY,
    debit_type VARCHAR(255),
    bank INT,
    CONSTRAINT fkPayment FOREIGN KEY (debit_number) REFERENCES Payment(payment_id),
    CONSTRAINT fkBank FOREIGN KEY (bank) REFERENCES Bank(bank_id)
);


DROP TABLE IF EXISTS Credit CASCADE;
CREATE TABLE Credit(
    credit_number VARCHAR(255) PRIMARY KEY,
    approval_number INTEGER,
    bank INTEGER,
    fees_numbers INTEGER,
    CONSTRAINT fkPayment FOREIGN KEY (credit_number ) REFERENCES Payment(payment_id),
    CONSTRAINT fkBank FOREIGN KEY (bank) REFERENCES Bank(bank_id)
);

DROP TABLE IF EXISTS Restaurant CASCADE;
CREATE TABLE Restaurant(
    restaurant_id SERIAL PRIMARY KEY,
    restaurant_name VARCHAR(255),
    restaurant_address VARCHAR(255),
    phone VARCHAR(255),
    attention_time VARCHAR(255),
    restaurant_status BOOLEAN
);

DROP TABLE IF EXISTS Sale CASCADE;
CREATE TABLE Sale(
    sale_id SERIAL PRIMARY KEY,
    sale_date DATE,
    sale_time TIME,
    docId INT,
    restaurant_id INT,
    sale_status BOOLEAN,
    --CONSTRAINT fkTipoDoc FOREIGN KEY (tipoDocId) REFERENCES Usuario(tipoDocumento),
    CONSTRAINT fkDocId FOREIGN KEY (docId) REFERENCES Users(document_id),
    CONSTRAINT fkRestaurant FOREIGN KEY (restaurant_id) REFERENCES  Restaurant(restaurant_id)
);

DROP TABLE IF EXISTS Discount CASCADE;
CREATE TABLE Discount(
    discount_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    dis_description TEXT,
    ini_date DATE,
    final_date DATE,
    discount_status BOOLEAN,
    dis_value DOUBLE PRECISION
);

DROP TABLE IF EXISTS Category CASCADE;
CREATE TABLE Category(
    category_id SERIAL PRIMARY KEY,
    cat_name VARCHAR(255),
    cat_description TEXT,
    cat_status BOOLEAN
);

DROP TABLE IF EXISTS Product CASCADE;
CREATE TABLE Product(
    product_id SERIAL PRIMARY KEY,
    pro_description TEXT,
    pro_image VARCHAR(255),
    price INT,
    category_id INT,
    discount_id INT,
    pro_status BOOLEAN,
    percentage_Iva DOUBLE PRECISION,
    CONSTRAINT fkCategory FOREIGN KEY (category_id) REFERENCES Category(category_id),
    CONSTRAINT fkDiscount FOREIGN KEY (discount_id) REFERENCES Discount(discount_id)
);

DROP TABLE IF EXISTS Ingredient CASCADE;
CREATE TABLE Ingredient(
    ingredient_id SERIAL PRIMARY KEY,
    ingredient_name VARCHAR(255),
    price INT
);

DROP TABLE IF EXISTS IngredientItem CASCADE;
CREATE TABLE IngredientItem(
    ingredientItem_id SERIAL PRIMARY KEY,
    ingredient_id INT,
    product_id INT,
    amount INT,
    CONSTRAINT fkIngredient FOREIGN KEY (ingredient_id) REFERENCES Ingredient(ingredient_id),
    CONSTRAINT fkProduct FOREIGN KEY (product_id) REFERENCES Product(product_id)
);

DROP TABLE IF EXISTS Promo CASCADE;
CREATE TABLE Promo(
    promo_id SERIAL PRIMARY KEY,
    ini_date DATE,
    final_date DATE,
    promo_name VARCHAR(255),
    promo_description TEXT
);

DROP TABLE IF EXISTS PromoItem CASCADE;
CREATE TABLE PromoItem(
    promoItem_id SERIAL PRIMARY KEY,
    promo_id INT,
    product_id INT,
    amount INT,
    CONSTRAINT fkPromo FOREIGN KEY (promo_id) REFERENCES Promo(promo_id),
    CONSTRAINT fkProduct FOREIGN KEY (product_id) REFERENCES Product(product_id)
);

DROP TABLE IF EXISTS SaleItem CASCADE;
CREATE TABLE SaleItem(
    saleItem_id SERIAL PRIMARY KEY,
    sale_id INT,
    amount INT,
    totalIva INT,
    subtotal INT,
    item_total INT,
    total_discount INT,
    product_id INT,
    CONSTRAINT fkProduct FOREIGN KEY (product_id) REFERENCES Product(product_id),
    CONSTRAINT fkSale FOREIGN KEY (sale_id) REFERENCES Sale(sale_id)
);

DROP TABLE IF EXISTS Bill CASCADE;
CREATE TABLE Bill(
    bill_number SERIAL PRIMARY KEY,
    nit INT,
    sale_id INT,
    payment_id INT,
    bill_time TIME,
    bill_date DATE,
    subtotal DOUBLE PRECISION,
    totalIVA DOUBLE PRECISION,
    total_discount DOUBLE PRECISION,
    total_payment DOUBLE PRECISION,
    bill_status boolean,
    CONSTRAINT fkSale FOREIGN KEY (sale_id) REFERENCES Sale(sale_id),
    CONSTRAINT fkPayment FOREIGN KEY (payment_id) REFERENCES Payment(payment_id)
);
