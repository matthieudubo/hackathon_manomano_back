CREATE DATABASE hackathon_mano;

USE hackathon_mano;

CREATE TABLE products
(
  id_product INT NOT NULL AUTO_INCREMENT,
  img VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  price INT NOT NULL,
  PRIMARY KEY (id_product)
);

INSERT INTO products (img, name, price)
VALUES
("https://cdn.manomano.com/perceuse-visseuse-m18cbldd-502c-milwaukee-4933464556-P-12938589-49217394_1.jpg",
"Perceuse visseuse M18CBLDD-502C MILWAUKEE - 4933464556",
183.4),
("https://cdn.manomano.com/vis-ttpc-25-x-35-mm-semin-pour-la-fixation-des-plaques-de-platre-sur-lossature-boite-de-1000-P-7117406-14131300_1.jpg",
"Vis auto perceuse Semin pour la fixation des plaques de plâtre sur l'ossature - intérieur - 25 mm x 3.5 mm - boîte de 1000 pièces",
6.65),
("https://cdn.manomano.com/facom-marteau-manche-graphite-40mm-200c40pb-P-3248867-6700920_1.jpg",
"Marteau manche graphite FACOM marteau rivoir 200C.40 40",
31.28),
("https://cdn.manomano.com/pointe-tete-plate-dimos-24-x-50-2650-par-boites-P-8566508-15321436_1.jpg",
"Pointe tête plate DIMOS Ø 2,4 x 50 - 2650 par boites",
9.36),
("https://cdn.manomano.com/caisse-a-outis-plastique-15l-facom-bpc16pb-P-20900248-39129316_1.jpg",
"Boîte à Outils Plastique 16'' fermeture automatique FACOM BP.C16NPB",
16.3),
("https://cdn.manomano.com/parasol-jardin-deporte-en-aluminium-sun-4-rectangulaire-3-x-4-m-ecru-P-36784-526076_1.jpg",
"Parasol jardin déporté Alu - Rectangle - 3 x 4 m - Ecru",
149.17),
("https://cdn.manomano.com/scie-380mm-1-20-119-P-20900248-39129169_1.jpg",
"Niveau Tubulaire - 120 cm - 3 Fioles - FATMAX Pro - STANLEY, 0-43-648",
47.48),
("https://cdn.manomano.com/scie-sauteuse-makita-650w-en-coffret-mak-pac-jv0600j-P-8566508-15322078_1.jpg",
"Scie sauteuse MAKITA 650W En coffret MAK-PAC - JV0600J",
97.17),
("https://cdn.manomano.com/3-rouleaux-detancheite-teflon-longeur-12m-largeur-12mm-noyon-thiebault-P-5536067-29409418_1.jpg",
"3 rouleaux d'étanchéité Téflon® longeur 12m largeur 12mm NOYON & THIEBAULT",
1.5),
("https://cdn.manomano.com/haemmerlin-betonniere-non-tractable-160l-700w-bt-pro-170-P-273920-1442888_1.jpg",
"BÉTONNIÈRE ÉLECTRIQUE HAEMMERLIN PROFESSIONNELLE BT PRO 190 - 315519001--",
568.37);

CREATE TABLE orders
(
  id_order INT NOT NULL AUTO_INCREMENT,
  total_price INT NOT NULL,
  date VARCHAR(50) NOT NULL,
  PRIMARY KEY (id_order)
);

CREATE TABLE products_orders
(
  id_product_order INT NOT NULL AUTO_INCREMENT,
  id_order INT NOT NULL,
  id_product INT NOT NULL,
  PRIMARY KEY (id_product_order),
  FOREIGN KEY (id_order) REFERENCES orders(id_order),
  FOREIGN KEY (id_product) REFERENCES products(id_product)
);
