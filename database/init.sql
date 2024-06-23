CREATE DATABASE IF NOT EXISTS inventory;

USE inventory;

CREATE TABLE IF NOT EXISTS `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(45) NOT NULL,
  `create_date` datetime NOT NULL,
  `category` varchar(45) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `product_name_UNIQUE` (`product_name`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO `product`
(`product_id`,`product_name`,
`create_date`,
`category`,
`description`)
VALUES
(1, "iphone","2024-06-07 00:00:00", "phone","a phone"),
(2, "samsung","1970-01-01 00:00:00", "phone","a korea phone"),
(3, "test product","2024-06-12 13:02:25", "test product","test product"),
(4, "test product1","2024-06-12 13:03:11", "test product1","test product1"),
(5, "tsetstes","2024-06-12 13:15:37", "sdfsdf","fsdfsdfsdffs"),
(6, "sdasd","2024-06-12 13:16:06", "asdsada","dsadasdsads"),
(7, "sdasdsadas","2024-06-12 13:17:20", "dasdasd","asdasdasdasdas"),
(8, "vbbnmmn","2024-06-12 13:18:33", "bnmbnmbn","nmbnmbmnb"),
(9, "new Product","2024-06-12 14:28:06", "aspdlasd","asdadsadasd"),
(10, "new iphone","2024-06-12 14:30:15", "sdad","sadasdasdad"),
(11, ",mbnvn","2024-06-12 14:31:36", "vbnvbnbv","nvbnvbn"),
(12, "hhh","2024-06-12 14:33:42", "hhh","hhh"),
(13, "vbcbcvb","2024-06-12 14:34:57", "cbcv","bcvbcvbcvbb");

CREATE TABLE IF NOT EXISTS `sku` (
  `sku_id` varchar(45) NOT NULL,
  `product_id` int NOT NULL,
  `created_date` datetime NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`sku_id`),
  UNIQUE KEY `sku_id_UNIQUE` (`sku_id`),
  KEY `peoduct_id_idx` (`product_id`),
  CONSTRAINT `peoduct_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `sku`
(`sku_id`,
`product_id`,
`created_date`,
`description`)
VALUES
("asdsadasd", 6, "2024-06-12 13:16:06","asdsadsadad"),
 ("bnbvn", 8, "2024-06-12 13:18:33","bnbm"),
 ("cxczcx", 7, "2024-06-12 13:17:20","zczxcz"),
 ("IPHONE_64", 1, "2024-06-12 14:15:47","test"),
 ("IPHONE_BLACK", 1, "2024-06-07 00:00:00","black color"),
 ("IPHONE_WHITE", 1, "2024-06-07 00:00:00","a white phone"),
 ("sadad", 5, "2024-06-12 13:15:37","asdasd"),
 ("SAMSUNG_GOLD", 2, "2024-06-07 00:00:00","a goldren Phone"),
 ("test product", 3, "2024-06-12 13:02:25","test product"),
 ("test product1", 4, "2024-06-12 13:03:11","test product1"),
 ("test product2", 4, "2024-06-12 13:03:11","test product2"),
 ("\u0e1f\u0e01\u0e01", 11, "2024-06-12 14:36:52","\u0e1f\u0e01\u0e01");

CREATE TABLE IF NOT EXISTS `batch` (
  `batch_id` int NOT NULL AUTO_INCREMENT,
  `sku_id` varchar(45) NOT NULL,
  `cost` decimal(10,0) NOT NULL,
  `qty` int NOT NULL,
  `created_date` datetime NOT NULL,
  PRIMARY KEY (`batch_id`),
  KEY `batch_sku_id_idx` (`sku_id`),
  CONSTRAINT `batch_sku_id` FOREIGN KEY (`sku_id`) REFERENCES `sku` (`sku_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `inventory`.`batch`
(`batch_id`,
`sku_id`,
`cost`,
`qty`,
`created_date`)
VALUES
(1, "IPHONE_BLACK", 10000.0, 0, "1970-01-01 00:00:00"),
 (2, "SAMSUNG_GOLD", 9000.0, 120, "1970-01-01 00:00:00"),
 (3, "IPHONE_WHITE", 3000.0, 30, "1970-01-01 00:00:00"),
 (4, "IPHONE_WHITE", 2500.0, 25, "1970-01-01 00:00:00"),
 (5, "IPHONE_WHITE", 2500.0, 40, "1970-01-01 00:00:00"),
 (6, "IPHONE_BLACK", 1000.0, 0, "2024-06-12 05:38:48"),
 (7, "IPHONE_WHITE", 10000.0, 120, "2024-06-12 05:41:58"),
 (8, "IPHONE_BLACK", 9.0, 0, "2024-06-12 05:43:07"),
 (9, "IPHONE_BLACK", 5.0, 0, "2024-06-12 07:05:30"),
 (10, "IPHONE_BLACK", 5.0, 0, "2024-06-12 07:05:32"),
 (11, "IPHONE_BLACK", 5.0, 0, "2024-06-12 07:05:33"),
 (12, "IPHONE_BLACK", 2.0, 0, "2024-06-12 11:17:52"),
 (13, "IPHONE_BLACK", 5.0, 3, "2024-06-12 11:21:50"),
 (14, "IPHONE_BLACK", 4.0, 2, "2024-06-12 12:11:30"),
 (15, "IPHONE_BLACK", 3.0, 1, "2024-06-12 12:12:41"),
 (16, "SAMSUNG_GOLD", 3.0, 5, "2024-06-12 12:13:10"),
 (17, "\u0e1f\u0e01\u0e01", 3.0, 3, "2024-06-12 14:37:03");

CREATE TABLE IF NOT EXISTS `receipt` (
  `receipt_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `sku_id` varchar(45) NOT NULL,
  `batch_id` int NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `qty` int DEFAULT NULL,
  `cost` decimal(10,0) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`receipt_id`),
  KEY `sku_id_idx` (`sku_id`),
  KEY `receipt_sku_id_idx` (`sku_id`),
  KEY `product_id_idx` (`product_id`),
  KEY `receipt_batch_idx` (`batch_id`),
  CONSTRAINT `receipt_batch` FOREIGN KEY (`batch_id`) REFERENCES `batch` (`batch_id`),
  CONSTRAINT `receipt_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `receipt_sku_id` FOREIGN KEY (`sku_id`) REFERENCES `sku` (`sku_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `inventory`.`receipt`
(`receipt_id`,
`product_id`,
`sku_id`,
`batch_id`,
`created_date`,
`qty`,
`cost`,
`title`,
`description`)
VALUES
(1, 1, "IPHONE_BLACK", 1, "2024-06-07 00:00:00", 200, 10000.0, "add ihpone to store","iphone is black"),
 (2, 2, "SAMSUNG_GOLD", 2, "2024-06-07 00:00:00", 120, 9000.0, "add goldren phone to store","a goldren phone"),
 (3, 1, "IPHONE_WHITE", 3, "2024-06-07 00:00:00", 30, 3000.0, "add white iphone 1","a white phone1 "),
 (4, 1, "IPHONE_WHITE", 4, "2024-06-07 00:00:00", 25, 2500.0, "add white iphone 2","a white phone2"),
 (5, 1, "IPHONE_WHITE", 5, "2024-06-07 00:00:00", 40, 2500.0, "add white iphone 3","a white iphone 3"),
 (6, 1, "IPHONE_BLACK", 6, "2024-06-12 05:38:48", 10, 1000.0, "asdasd","asdasd"),
 (7, 1, "IPHONE_WHITE", 7, "2024-06-12 05:41:58", 120, 10000.0, "test","test "),
 (8, 1, "IPHONE_BLACK", 8, "2024-06-12 05:43:07", 3, 9.0, "tsates","123"),
 (9, 1, "IPHONE_BLACK", 9, "2024-06-12 07:05:30", 7, 5.0, "das","teasr"),
 (10, 1, "IPHONE_BLACK", 10, "2024-06-12 07:05:32", 7, 5.0, "das","teasr"),
 (11, 1, "IPHONE_BLACK", 11, "2024-06-12 07:05:33", 7, 5.0, "das","teasr"),
 (12, 1, "IPHONE_BLACK", 12, "2024-06-12 11:17:52", 2, 2.0, "tewst","asdasd"),
 (13, 1, "IPHONE_BLACK", 13, "2024-06-12 11:21:50", 4, 5.0, "test","setest"),
 (14, 1, "IPHONE_BLACK", 14, "2024-06-12 12:11:30", 2, 4.0, "asdas","dasdasd"),
 (15, 1, "IPHONE_BLACK", 15, "2024-06-12 12:12:41", 1, 3.0, "dasdas","dadasd"),
 (16, 2, "SAMSUNG_GOLD", 16, "2024-06-12 12:13:10", 5, 3.0, "dsadasdas","dsdadasdas"),
 (17, 11, "\u0e1f\u0e01\u0e01", 17, "2024-06-12 14:37:03", 3, 3.0, "\u0e2b\u0e01\u0e1f\u0e2b\u0e01\u0e1f\u0e01","\u0e1f\u0e2b\u0e01\u0e1f\u0e2b\u0e01\u0e1f\u0e2b\u0e01\u0e1f\u0e2b\u0e01");

CREATE TABLE IF NOT EXISTS `requisition` (
  `requisition_id` int NOT NULL AUTO_INCREMENT,
  `sku_id` varchar(45) NOT NULL,
  `product_id` int NOT NULL,
  `created_on` datetime DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`requisition_id`),
  KEY `product_id_idx` (`product_id`),
  KEY `sku_id_idx` (`sku_id`),
  CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `sku_id` FOREIGN KEY (`sku_id`) REFERENCES `sku` (`sku_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `inventory`.`requisition`
(`requisition_id`,
`sku_id`,
`product_id`,
`created_on`,
`title`,
`description`)
VALUES
(1, "IPHONE_BLACK", 1, "2024-06-10 00:00:00", "get iphone to sell","sell black iphone "),
 (3, "IPHONE_BLACK", 1, "2024-06-12 06:59:05", "test","test"),
 (4, "IPHONE_BLACK", 1, "2024-06-12 07:02:51", "export to sell ","asdasdad"),
 (5, "IPHONE_BLACK", 1, "2024-06-12 07:03:14", "test","test"),
 (6, "IPHONE_BLACK", 1, "2024-06-12 07:04:12", "test","test"),
 (7, "IPHONE_BLACK", 1, "2024-06-12 07:05:45", "asdasd","asdasd"),
 (8, "IPHONE_BLACK", 1, "2024-06-12 11:44:38", "test","tset"),
 (9, "IPHONE_BLACK", 1, "2024-06-12 11:44:47", "test","tset"),
 (10, "IPHONE_BLACK", 1, "2024-06-12 11:49:03", "test","wadad");

CREATE TABLE IF NOT EXISTS `requisition_item` (
  `requisition_item_id` int NOT NULL AUTO_INCREMENT,
  `requisition_id` int NOT NULL,
  `batch_id` int NOT NULL,
  `qty` int NOT NULL,
  `cost` decimal(10,0) NOT NULL,
  PRIMARY KEY (`requisition_item_id`),
  KEY `reauisition_id_idx` (`requisition_id`),
  KEY `batch_idx` (`batch_id`),
  CONSTRAINT `batch` FOREIGN KEY (`batch_id`) REFERENCES `batch` (`batch_id`),
  CONSTRAINT `requisition_id` FOREIGN KEY (`requisition_id`) REFERENCES `requisition` (`requisition_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `inventory`.`requisition_item`
(`requisition_item_id`,
`requisition_id`,
`batch_id`,
`qty`,
`cost`)
VALUES
(1, 1, 1, 20, 10000.0),
 (2, 3, 1, 10, 10000.0),
 (3, 4, 1, 10, 10000.0),
 (4, 5, 1, 140, 10000.0),
 (5, 5, 6, 10, 1000.0),
 (6, 6, 8, 3, 9.0),
 (7, 7, 9, 7, 5.0),
 (8, 7, 10, 7, 5.0),
 (9, 7, 11, 7, 5.0),
 (10, 8, 12, 1, 2.0),
 (11, 9, 12, 1, 2.0),
 (12, 10, 13, 1, 5.0);