import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "newsletter_subscribers_email_idx";
  DROP INDEX "contact_leads_email_idx";
  DROP INDEX "preorder_requests_email_idx";
  ALTER TABLE "products" DROP COLUMN "hero_description";
  ALTER TABLE "_products_v" DROP COLUMN "version_hero_description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products" ADD COLUMN "hero_description" varchar;
  ALTER TABLE "_products_v" ADD COLUMN "version_hero_description" varchar;
  CREATE INDEX "newsletter_subscribers_email_idx" ON "newsletter_subscribers" USING btree ("email");
  CREATE INDEX "contact_leads_email_idx" ON "contact_leads" USING btree ("email");
  CREATE INDEX "preorder_requests_email_idx" ON "preorder_requests" USING btree ("email");`)
}
