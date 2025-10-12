CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`xp` integer NOT NULL,
	`bumps` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_id_unique` ON `users` (`id`);