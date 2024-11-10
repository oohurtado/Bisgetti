SET SQL_SAFE_UPDATES = 0;

INSERT INTO Configurations(Section,`Key`,Value,ExtraValue) VALUES 
('ordenes', 'propinas', '0,10,20,30', null),
('ordenes', 'envío', '30', null),
('ordenes', 'abierto', 'True', null);

INSERT INTO Configurations(Section,`Key`,Value,ExtraValue) VALUES 
('información', 'nombre', 'Bisgetti', null),
('información', 'teléfono', '911,01-800-SEVCEC', null),
('información', 'dirección', 'Avenida Siempreviva 742', null),
('información', 'horario', 'Lunes a Viernes de 8 a.m. a 4 p.m.', null);

SELECT * FROM Configurations;