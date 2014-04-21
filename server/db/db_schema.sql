-- Скрипт сгенерирован Devart dbForge Studio for MySQL, Версия 6.0.622.0
-- Домашняя страница продукта: http://www.devart.com/ru/dbforge/mysql/studio
-- Дата скрипта: 22.04.2014 1:11:31
-- Версия сервера: 5.5.25
-- Версия клиента: 4.1

USE cashbalance;

CREATE TABLE category (
  ID int(11) NOT NULL AUTO_INCREMENT,
  CategoryName varchar(50) NOT NULL,
  IsIncome tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (ID)
)
ENGINE = INNODB
AUTO_INCREMENT = 6
AVG_ROW_LENGTH = 3276
CHARACTER SET utf8
COLLATE utf8_general_ci;

CREATE TABLE balanceline (
  ID int(11) NOT NULL AUTO_INCREMENT,
  CategoryId int(11) NOT NULL,
  Sum decimal(19, 2) NOT NULL,
  Date datetime NOT NULL,
  Note varchar(255) DEFAULT NULL,
  PRIMARY KEY (ID),
  CONSTRAINT FK_balanceline_category_ID FOREIGN KEY (CategoryId)
  REFERENCES category (ID) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE = INNODB
AUTO_INCREMENT = 15
AVG_ROW_LENGTH = 1260
CHARACTER SET utf8
COLLATE utf8_general_ci;