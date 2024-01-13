CREATE TABLE IF NOT EXISTS "admins" (
	"public_key" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"address" text PRIMARY KEY NOT NULL,
	"reference_id" text NOT NULL,
	"email" text NOT NULL,
	"username" text DEFAULT ''
);
