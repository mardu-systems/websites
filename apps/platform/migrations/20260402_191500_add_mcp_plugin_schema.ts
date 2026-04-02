import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres';
import { sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "payload_mcp_api_keys" (
      "id" serial PRIMARY KEY NOT NULL,
      "user_id" integer NOT NULL,
      "label" varchar,
      "description" varchar,
      "blog_posts_find" boolean DEFAULT true,
      "blog_posts_create" boolean DEFAULT true,
      "blog_posts_update" boolean DEFAULT true,
      "blog_posts_delete" boolean DEFAULT true,
      "integrations_find" boolean DEFAULT true,
      "integrations_create" boolean DEFAULT true,
      "integrations_update" boolean DEFAULT true,
      "integrations_delete" boolean DEFAULT true,
      "enable_api_key" boolean DEFAULT true,
      "api_key" varchar,
      "api_key_index" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'payload_mcp_api_keys_user_id_users_id_fk'
      ) THEN
        ALTER TABLE "payload_mcp_api_keys"
          ADD CONSTRAINT "payload_mcp_api_keys_user_id_users_id_fk"
          FOREIGN KEY ("user_id")
          REFERENCES "public"."users"("id")
          ON DELETE cascade
          ON UPDATE no action;
      END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS "payload_mcp_api_keys_user_idx"
      ON "payload_mcp_api_keys" USING btree ("user_id");
    CREATE INDEX IF NOT EXISTS "payload_mcp_api_keys_updated_at_idx"
      ON "payload_mcp_api_keys" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "payload_mcp_api_keys_created_at_idx"
      ON "payload_mcp_api_keys" USING btree ("created_at");
    CREATE UNIQUE INDEX IF NOT EXISTS "payload_mcp_api_keys_api_key_index_idx"
      ON "payload_mcp_api_keys" USING btree ("api_key_index");

    ALTER TABLE "payload_preferences_rels"
      ADD COLUMN IF NOT EXISTS "payload_mcp_api_keys_id" integer;

    ALTER TABLE "payload_locked_documents_rels"
      ADD COLUMN IF NOT EXISTS "payload_mcp_api_keys_id" integer;

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'payload_preferences_rels_payload_mcp_api_keys_fk'
      ) THEN
        ALTER TABLE "payload_preferences_rels"
          ADD CONSTRAINT "payload_preferences_rels_payload_mcp_api_keys_fk"
          FOREIGN KEY ("payload_mcp_api_keys_id")
          REFERENCES "public"."payload_mcp_api_keys"("id")
          ON DELETE cascade
          ON UPDATE no action;
      END IF;
    END $$;

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'payload_locked_documents_rels_payload_mcp_api_keys_fk'
      ) THEN
        ALTER TABLE "payload_locked_documents_rels"
          ADD CONSTRAINT "payload_locked_documents_rels_payload_mcp_api_keys_fk"
          FOREIGN KEY ("payload_mcp_api_keys_id")
          REFERENCES "public"."payload_mcp_api_keys"("id")
          ON DELETE cascade
          ON UPDATE no action;
      END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS "payload_preferences_rels_payload_mcp_api_keys_id_idx"
      ON "payload_preferences_rels" USING btree ("payload_mcp_api_keys_id");

    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_payload_mcp_api_keys_id_idx"
      ON "payload_locked_documents_rels" USING btree ("payload_mcp_api_keys_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "payload_locked_documents_rels_payload_mcp_api_keys_id_idx";
    DROP INDEX IF EXISTS "payload_preferences_rels_payload_mcp_api_keys_id_idx";

    ALTER TABLE "payload_locked_documents_rels"
      DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_payload_mcp_api_keys_fk";

    ALTER TABLE "payload_preferences_rels"
      DROP CONSTRAINT IF EXISTS "payload_preferences_rels_payload_mcp_api_keys_fk";

    ALTER TABLE "payload_locked_documents_rels"
      DROP COLUMN IF EXISTS "payload_mcp_api_keys_id";

    ALTER TABLE "payload_preferences_rels"
      DROP COLUMN IF EXISTS "payload_mcp_api_keys_id";

    DROP INDEX IF EXISTS "payload_mcp_api_keys_api_key_index_idx";
    DROP INDEX IF EXISTS "payload_mcp_api_keys_created_at_idx";
    DROP INDEX IF EXISTS "payload_mcp_api_keys_updated_at_idx";
    DROP INDEX IF EXISTS "payload_mcp_api_keys_user_idx";

    ALTER TABLE "payload_mcp_api_keys"
      DROP CONSTRAINT IF EXISTS "payload_mcp_api_keys_user_id_users_id_fk";

    DROP TABLE IF EXISTS "payload_mcp_api_keys" CASCADE;
  `);
}
