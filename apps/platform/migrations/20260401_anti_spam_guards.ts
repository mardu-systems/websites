import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres';
import { sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE "abuse_rate_limits" (
      "id" serial PRIMARY KEY NOT NULL,
      "endpoint" varchar NOT NULL,
      "ip_hash" varchar NOT NULL,
      "window_start" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "request_count" integer DEFAULT 1 NOT NULL,
      "last_seen_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE UNIQUE INDEX "abuse_rate_limits_endpoint_ip_hash_idx" ON "abuse_rate_limits" USING btree ("endpoint", "ip_hash");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE "abuse_rate_limits" CASCADE;
  `);
}
