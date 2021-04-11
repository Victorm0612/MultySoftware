DROP TABLE IF EXISTS Usuario CASCADE;
CREATE TABLE Usuario(
    id_usuario SERIAL PRIMARY KEY,
    tipoDocumento INT,
    noDocumento INTEGER UNIQUE NOT NULL,
    nombre TEXT,
    apellido TEXT,
    sexo VARCHAR(255),
    telefono VARCHAR(255),
    fechaNacimiento DATE
);

DROP TABLE IF EXISTS MedioPago CASCADE;
CREATE TABLE MedioPago(
    codMedioPago SERIAL PRIMARY KEY,
    descripcion TEXT,
    fecha DATE,
    hora TIME,
    activo BOOLEAN
);
-- en boolean 0 es falso, cualquier otro valor es true
DROP TABLE IF EXISTS Entidad CASCADE;
CREATE TABLE Entidad(
    codEntidad SERIAL PRIMARY KEY,
    nombreEntidad VARCHAR(255)
);

DROP TABLE IF EXISTS TarjetaDebito CASCADE;
CREATE TABLE TarjetaDebito(
    codMedioPago INT PRIMARY KEY,
    noTarjeta INT,
    tipoCuenta VARCHAR(255),
    entidad INT,
    CONSTRAINT fkMedioPago FOREIGN KEY (codMedioPago) REFERENCES MedioPago(codMedioPago),
    CONSTRAINT fkEntidad FOREIGN KEY (entidad) REFERENCES Entidad(codEntidad)
);

DROP TABLE IF EXISTS Efectivo CASCADE;
CREATE TABLE Efectivo(
    codMedioPago INT PRIMARY KEY,
    monto INT,
    CONSTRAINT fkMedioPago FOREIGN KEY (codMedioPago) REFERENCES MedioPago(codMedioPago)
);

DROP TABLE IF EXISTS TarjetaCredito CASCADE;
CREATE TABLE TarjetaCredito(
    codMedioPago SERIAL PRIMARY KEY,
    noTarjeta INT,
    noAprobacion INT,
    entidad int,
    noCuotas int,
    CONSTRAINT fkMedioPago FOREIGN KEY (codMedioPago) REFERENCES MedioPago(codMedioPago),
    CONSTRAINT fkEntidad FOREIGN KEY (entidad) REFERENCES Entidad(codEntidad)
);

DROP TABLE IF EXISTS Sede CASCADE;
CREATE TABLE Sede(
    codSede SERIAL PRIMARY KEY,
    nombre VARCHAR(255),
    direccion VARCHAR(255),
    telefono VARCHAR(255),
    horarioAtencion VARCHAR(255),
    activa BOOLEAN
);



DROP TABLE IF EXISTS Venta CASCADE;
CREATE TABLE Venta(
    noVenta SERIAL PRIMARY KEY,
    fecha DATE,
    hora TIME,
    tipoDocId INT,
    docId INT,
    codSede INT,
    activa BOOLEAN,
    --CONSTRAINT fkTipoDoc FOREIGN KEY (tipoDocId) REFERENCES Usuario(tipoDocumento),
    CONSTRAINT fkDocId FOREIGN KEY (docId) REFERENCES Usuario(noDocumento),
    CONSTRAINT fkSede FOREIGN KEY (codSede) REFERENCES  Sede(codSede)
);

DROP TABLE IF EXISTS Descuento CASCADE;
CREATE TABLE Descuento(
    codDescuento SERIAL PRIMARY KEY,
    titulo VARCHAR(255),
    descripcion TEXT,
    fechaini DATE,
    fechafin DATE,
    activo BOOLEAN,
    porDescuento DOUBLE PRECISION
);

DROP TABLE IF EXISTS Categoria CASCADE;
CREATE TABLE Categoria(
    codCategoria SERIAL PRIMARY KEY,
    nombre VARCHAR(255),
    descripcion TEXT,
    activa BOOLEAN
);


DROP TABLE IF EXISTS Producto CASCADE;
CREATE TABLE Producto(
    codProducto SERIAL PRIMARY KEY,
    descripcion TEXT,
    imagen VARCHAR(255),
    precioVenta INT,
    codCategoria INT,
    codDescuento INT,
    activo BOOLEAN,
    porcentajeIva DOUBLE PRECISION,
    CONSTRAINT fkCategoria FOREIGN KEY (codCategoria) REFERENCES Categoria(codCategoria),
    CONSTRAINT fkDescuento FOREIGN KEY (codDescuento) REFERENCES Descuento(codDescuento)
);

DROP TABLE IF EXISTS Ingrediente CASCADE;
CREATE TABLE Ingrediente(
    codIngrediente SERIAL PRIMARY KEY,
    nombre VARCHAR(255),
    precio INT
);

DROP TABLE IF EXISTS itemIngrediente CASCADE;
CREATE TABLE itemIngrediente(
    codIngrediente INT,
    codProducto INT,
    cantidad INT,
    CONSTRAINT fkIngrediente FOREIGN KEY (codIngrediente) REFERENCES Ingrediente(codIngrediente),
    CONSTRAINT fkProducto FOREIGN KEY (codProducto) REFERENCES Producto(codProducto)
);

DROP TABLE IF EXISTS Promocion CASCADE;
CREATE TABLE Promocion(
    codPromocion SERIAL PRIMARY KEY,
    fechaIni DATE,
    fechaFin DATE,
    nombre VARCHAR(255),
    descripcion TEXT
);

DROP TABLE IF EXISTS ItemPromocion CASCADE;
CREATE TABLE ItemPromocion(
    codPromocion INT,
    codProducto INT,
    cantidad INT,
    CONSTRAINT fkPromocion FOREIGN KEY (codPromocion) REFERENCES Promocion(codPromocion),
    CONSTRAINT fkProducto FOREIGN KEY (codProducto) REFERENCES Producto(codProducto)
);

DROP TABLE IF EXISTS ItemVenta CASCADE;
CREATE TABLE ItemVenta(
    noItemVenta SERIAL PRIMARY KEY,
    noVenta INT,
    cantidad INT,
    totalIva INT,
    subtotal INT,
    totalItel INT,
    totalDescuento INT,
    codProducto INT,
    CONSTRAINT fkProducto FOREIGN KEY (codProducto) REFERENCES Producto(codProducto),
    CONSTRAINT fkVenta FOREIGN KEY (noVenta) REFERENCES Venta(noVenta)
);

DROP TABLE IF EXISTS Factura CASCADE;
CREATE TABLE Factura(
    noFactura SERIAL PRIMARY KEY,
    nit INT,
    noVenta INT,
    codMedioPago INT,
    hora TIME,
    fecha DATE,
    subtotal DOUBLE PRECISION,
    totalIVA DOUBLE PRECISION,
    totalDescuento DOUBLE PRECISION,
    totalPago DOUBLE PRECISION,
    activa boolean,
    CONSTRAINT fkVenta FOREIGN KEY (noVenta) REFERENCES Venta(noVenta),
    CONSTRAINT fkMedioPago FOREIGN KEY (codMedioPago) REFERENCES MedioPago(codMedioPago)
);
