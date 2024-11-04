SET SQL_SAFE_UPDATES = 0;

INSERT INTO Configurations(Section,`Key`,Value,ExtraValue) VALUES 
('ordenes', 'propinas-en-porcentaje', '0,10,15,20,25,30,50', null),
('ordenes', 'costo-de-envío', '30', null);

INSERT INTO Configurations(Section,`Key`,Value,ExtraValue) VALUES 
('información', 'nombre', 'Bisgetti', null),
('información', 'teléfono', '911,01-800-SEVCEC', null),
('información', 'dirección', 'Avenida Siempreviva 742', null),
('información', 'horario', 'Lunes a Viernes de 8 a.m. a 4 p.m.', null);

INSERT INTO Configurations(Section,`Key`,Value,ExtraValue) VALUES 
('tienda', 'activo', 'False', null);

SELECT * FROM Configurations;