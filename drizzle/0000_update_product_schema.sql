CREATE TABLE `order_items` (
	`id` char(36) NOT NULL,
	`order_id` char(36) NOT NULL,
	`product_id` char(36) NOT NULL,
	`qty` decimal NOT NULL,
	`price_snapshot` decimal(10,2) NOT NULL,
	CONSTRAINT `order_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` char(36) NOT NULL,
	`table_id` char(36) NOT NULL,
	`status` varchar(20) NOT NULL DEFAULT 'pending',
	`total_price` decimal(10,2),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `permissions` (
	`key` varchar(60) NOT NULL,
	CONSTRAINT `permissions_key` PRIMARY KEY(`key`)
);
--> statement-breakpoint
CREATE TABLE `role_permissions` (
	`role` varchar(20) NOT NULL,
	`permission_key` varchar(60) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` char(36) NOT NULL,
	`name` varchar(120) NOT NULL,
	`category` varchar(60) NOT NULL,
	`description` text,
	`price` decimal(10,2) NOT NULL,
	`is_available` boolean NOT NULL DEFAULT true,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `table_sessions` (
	`id` char(36) NOT NULL,
	`table_id` char(36) NOT NULL,
	`expires_at` timestamp NOT NULL,
	CONSTRAINT `table_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `staff` (
	`id` char(36) NOT NULL,
	`fullname` varchar(120) NOT NULL,
	`username` varchar(60) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	`role` varchar(20) NOT NULL,
	`permissions` json NOT NULL DEFAULT ('{"dashboard":true,"tables":false,"products":false,"orders":true,"staff":false}'),
	`is_active` boolean NOT NULL DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `staff_id` PRIMARY KEY(`id`),
	CONSTRAINT `staff_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `tables` (
	`id` char(36) NOT NULL,
	`name` varchar(40) NOT NULL,
	`qr_token` varchar(120) NOT NULL,
	`status` varchar(20) NOT NULL DEFAULT 'available',
	CONSTRAINT `tables_id` PRIMARY KEY(`id`),
	CONSTRAINT `tables_qr_token_unique` UNIQUE(`qr_token`)
);
--> statement-breakpoint
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_order_id_orders_id_fk` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_table_id_tables_id_fk` FOREIGN KEY (`table_id`) REFERENCES `tables`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_permission_key_permissions_key_fk` FOREIGN KEY (`permission_key`) REFERENCES `permissions`(`key`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `table_sessions` ADD CONSTRAINT `table_sessions_table_id_tables_id_fk` FOREIGN KEY (`table_id`) REFERENCES `tables`(`id`) ON DELETE no action ON UPDATE no action;