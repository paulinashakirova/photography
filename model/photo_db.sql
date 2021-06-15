DROP TABLE IF EXISTS `topic`;
DROP TABLE IF EXISTS `photo`;
DROP TABLE IF EXISTS `cart_items`;

CREATE TABLE `topic` (
	`topic_id` INT NOT NULL AUTO_INCREMENT,
	`theme` varchar(255) NOT NULL,
	`description` TEXT NOT NULL,
	`image` varchar(255) NOT NULL,
	PRIMARY KEY (`topic_id`)
);

CREATE TABLE `photo` (
	`photo_id` INT NOT NULL AUTO_INCREMENT,
	`title` varchar(255) NOT NULL,
	`description` TEXT NOT NULL,
	`image` varchar(255) NOT NULL,
	`price` INT NOT NULL,
	`topic_id` INT(255) NOT NULL,
	PRIMARY KEY (`photo_id`)
);

CREATE TABLE `cart_items` (
	`cart_item_id` INT NOT NULL AUTO_INCREMENT,
	`photo_id` INT(255) NOT NULL,
	`total` INT(255) NOT NULL,
	PRIMARY KEY (`cart_item_id`)
);

ALTER TABLE `photo` ADD CONSTRAINT `photo_fk0` FOREIGN KEY (`topic_id`) REFERENCES `topic`(`topic_id`);

ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_fk0` FOREIGN KEY (`photo_id`) REFERENCES `photo`(`photo_id`);

