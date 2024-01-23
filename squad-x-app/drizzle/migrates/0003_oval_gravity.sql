CREATE TABLE IF NOT EXISTS "dinos" (
	"address" text PRIMARY KEY NOT NULL,
	"user" text DEFAULT '' NOT NULL,
	"dino" text DEFAULT '' NOT NULL,
	"rank" text DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dinos" ADD CONSTRAINT "dinos_user_users_address_fk" FOREIGN KEY ("user") REFERENCES "users"("address") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
