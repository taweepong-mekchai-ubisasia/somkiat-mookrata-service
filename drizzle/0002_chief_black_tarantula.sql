CREATE TABLE `table_reservations` (
	`id` char(36) NOT NULL,
	`table_id` char(36) NOT NULL,
	`customer_name` varchar(120) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`date` varchar(20) NOT NULL,
	`time` varchar(10) NOT NULL,
	`guests` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `table_reservations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `tables` ADD `seats` int DEFAULT 4 NOT NULL;--> statement-breakpoint
ALTER TABLE `tables` ADD `qr_code` varchar(500);