CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"xp" integer NOT NULL,
	"bumps" integer NOT NULL,
	CONSTRAINT "users_id_unique" UNIQUE("id")
);
