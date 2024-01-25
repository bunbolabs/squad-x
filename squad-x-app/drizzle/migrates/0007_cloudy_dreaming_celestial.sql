CREATE TABLE IF NOT EXISTS "squads" (
	"name" text DEFAULT '' NOT NULL,
	"motto" text DEFAULT '' NOT NULL,
	"owner" text DEFAULT '' NOT NULL,
	"account" text PRIMARY KEY DEFAULT '' NOT NULL,
	"badge" text DEFAULT 'Dreamers' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "badge" text DEFAULT 'Newbie' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "account" text DEFAULT '' NOT NULL;