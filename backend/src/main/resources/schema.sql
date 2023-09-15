DROP TABLE IF EXISTS `pizzanu`.`pizzas`;

CREATE TABLE `pizzas`
(
    `id`          bigint       NOT NULL AUTO_INCREMENT,
    `productname` varchar(255) DEFAULT NULL,
    `description` varchar(255) DEFAULT NULL,
    `price`       bigint       DEFAULT NULL,
    `ordercount`  bigint       DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


