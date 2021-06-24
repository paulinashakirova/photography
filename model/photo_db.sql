SET foreign_key_checks = 0;

DROP TABLE IF EXISTS `cart_items`;
DROP TABLE IF EXISTS `topic`;
DROP TABLE IF EXISTS `photo`;


SET foreign_key_checks = 1;


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

ALTER TABLE `photo` ADD CONSTRAINT `photo_fk0` FOREIGN KEY (`topic_id`) REFERENCES `topic`(`topic_id`);


