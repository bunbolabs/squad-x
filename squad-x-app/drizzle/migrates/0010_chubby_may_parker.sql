ALTER TABLE "users" ADD COLUMN "picture" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "dinos" DROP COLUMN IF EXISTS "picture";