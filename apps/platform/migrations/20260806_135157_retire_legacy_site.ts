import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$
   DECLARE
     table_name text;
   BEGIN
     FOREACH table_name IN ARRAY ARRAY[
       'blog_posts_sites',
       '_blog_posts_v_version_sites',
       'legal_pages_sites',
       '_legal_pages_v_version_sites',
       'roadmap_items_sites',
       '_roadmap_items_v_version_sites',
       'integrations_sites',
       '_integrations_v_version_sites',
       'solutions_sites',
       '_solutions_v_version_sites',
       'product_categories_sites',
       '_product_categories_v_version_sites',
       'product_technologies_sites',
       '_product_technologies_v_version_sites',
       'product_carriers_sites',
       '_product_carriers_v_version_sites',
       'products_sites',
       '_products_v_version_sites',
       'product_variants_sites',
       '_product_variants_v_version_sites'
     ]
     LOOP
       EXECUTE format(
         'DELETE FROM %I AS retired USING %I AS active WHERE retired.value::text = %L AND active.value::text = %L AND retired.parent_id = active.parent_id',
         table_name,
         table_name,
         'mardu-space',
         'mardu-de'
       );
       EXECUTE format(
         'UPDATE %I SET value = %L WHERE value::text = %L',
         table_name,
         'mardu-de',
         'mardu-space'
       );
     END LOOP;
   END $$;

  DELETE FROM "newsletter_subscribers" AS retired
  USING "newsletter_subscribers" AS active
  WHERE retired."site"::text = 'mardu-space'
    AND active."site"::text = 'mardu-de'
    AND active."subscription_key" = replace(retired."subscription_key", 'mardu-space:', 'mardu-de:');
  UPDATE "newsletter_subscribers"
  SET "site" = 'mardu-de',
      "subscription_key" = replace("subscription_key", 'mardu-space:', 'mardu-de:')
  WHERE "site"::text = 'mardu-space';
  UPDATE "contact_leads" SET "site" = 'mardu-de' WHERE "site"::text = 'mardu-space';
  UPDATE "preorder_requests" SET "site" = 'mardu-de' WHERE "site"::text = 'mardu-space';

  ALTER TABLE "blog_posts_sites" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_blog_posts_sites";
  CREATE TYPE "public"."enum_blog_posts_sites" AS ENUM('mardu-de', 'platform');
  ALTER TABLE "blog_posts_sites" ALTER COLUMN "value" SET DATA TYPE "public"."enum_blog_posts_sites" USING "value"::"public"."enum_blog_posts_sites";
  ALTER TABLE "_blog_posts_v_version_sites" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum__blog_posts_v_version_sites";
  CREATE TYPE "public"."enum__blog_posts_v_version_sites" AS ENUM('mardu-de', 'platform');
  ALTER TABLE "_blog_posts_v_version_sites" ALTER COLUMN "value" SET DATA TYPE "public"."enum__blog_posts_v_version_sites" USING "value"::"public"."enum__blog_posts_v_version_sites";
  ALTER TABLE "legal_pages_sites" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_legal_pages_sites";
  CREATE TYPE "public"."enum_legal_pages_sites" AS ENUM('mardu-de', 'platform');
  ALTER TABLE "legal_pages_sites" ALTER COLUMN "value" SET DATA TYPE "public"."enum_legal_pages_sites" USING "value"::"public"."enum_legal_pages_sites";
  ALTER TABLE "_legal_pages_v_version_sites" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum__legal_pages_v_version_sites";
  CREATE TYPE "public"."enum__legal_pages_v_version_sites" AS ENUM('mardu-de', 'platform');
  ALTER TABLE "_legal_pages_v_version_sites" ALTER COLUMN "value" SET DATA TYPE "public"."enum__legal_pages_v_version_sites" USING "value"::"public"."enum__legal_pages_v_version_sites";
  ALTER TABLE "roadmap_items_sites" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_roadmap_items_sites";
  CREATE TYPE "public"."enum_roadmap_items_sites" AS ENUM('mardu-de', 'platform');
  ALTER TABLE "roadmap_items_sites" ALTER COLUMN "value" SET DATA TYPE "public"."enum_roadmap_items_sites" USING "value"::"public"."enum_roadmap_items_sites";
  ALTER TABLE "_roadmap_items_v_version_sites" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum__roadmap_items_v_version_sites";
  CREATE TYPE "public"."enum__roadmap_items_v_version_sites" AS ENUM('mardu-de', 'platform');
  ALTER TABLE "_roadmap_items_v_version_sites" ALTER COLUMN "value" SET DATA TYPE "public"."enum__roadmap_items_v_version_sites" USING "value"::"public"."enum__roadmap_items_v_version_sites";
  ALTER TABLE "integrations_sites" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_integrations_sites";
  CREATE TYPE "public"."enum_integrations_sites" AS ENUM('mardu-de', 'platform');
  ALTER TABLE "integrations_sites" ALTER COLUMN "value" SET DATA TYPE "public"."enum_integrations_sites" USING "value"::"public"."enum_integrations_sites";
  ALTER TABLE "_integrations_v_version_sites" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum__integrations_v_version_sites";
  CREATE TYPE "public"."enum__integrations_v_version_sites" AS ENUM('mardu-de', 'platform');
  ALTER TABLE "_integrations_v_version_sites" ALTER COLUMN "value" SET DATA TYPE "public"."enum__integrations_v_version_sites" USING "value"::"public"."enum__integrations_v_version_sites";
  ALTER TABLE "newsletter_subscribers" ALTER COLUMN "site" SET DATA TYPE text;
  ALTER TABLE "newsletter_subscribers" ALTER COLUMN "site" SET DEFAULT 'mardu-de'::text;
  DROP TYPE "public"."enum_newsletter_subscribers_site";
  CREATE TYPE "public"."enum_newsletter_subscribers_site" AS ENUM('mardu-de');
  ALTER TABLE "newsletter_subscribers" ALTER COLUMN "site" SET DEFAULT 'mardu-de'::"public"."enum_newsletter_subscribers_site";
  ALTER TABLE "newsletter_subscribers" ALTER COLUMN "site" SET DATA TYPE "public"."enum_newsletter_subscribers_site" USING "site"::"public"."enum_newsletter_subscribers_site";
  ALTER TABLE "contact_leads" ALTER COLUMN "site" SET DATA TYPE text;
  ALTER TABLE "contact_leads" ALTER COLUMN "site" SET DEFAULT 'mardu-de'::text;
  DROP TYPE "public"."enum_contact_leads_site";
  CREATE TYPE "public"."enum_contact_leads_site" AS ENUM('mardu-de');
  ALTER TABLE "contact_leads" ALTER COLUMN "site" SET DEFAULT 'mardu-de'::"public"."enum_contact_leads_site";
  ALTER TABLE "contact_leads" ALTER COLUMN "site" SET DATA TYPE "public"."enum_contact_leads_site" USING "site"::"public"."enum_contact_leads_site";
  ALTER TABLE "preorder_requests" ALTER COLUMN "site" SET DATA TYPE text;
  ALTER TABLE "preorder_requests" ALTER COLUMN "site" SET DEFAULT 'mardu-de'::text;
  DROP TYPE "public"."enum_preorder_requests_site";
  CREATE TYPE "public"."enum_preorder_requests_site" AS ENUM('mardu-de');
  ALTER TABLE "preorder_requests" ALTER COLUMN "site" SET DEFAULT 'mardu-de'::"public"."enum_preorder_requests_site";
  ALTER TABLE "preorder_requests" ALTER COLUMN "site" SET DATA TYPE "public"."enum_preorder_requests_site" USING "site"::"public"."enum_preorder_requests_site";
  ALTER TABLE "solutions_sites" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_solutions_sites";
  CREATE TYPE "public"."enum_solutions_sites" AS ENUM('mardu-de', 'platform');
  ALTER TABLE "solutions_sites" ALTER COLUMN "value" SET DATA TYPE "public"."enum_solutions_sites" USING "value"::"public"."enum_solutions_sites";
  ALTER TABLE "_solutions_v_version_sites" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum__solutions_v_version_sites";
  CREATE TYPE "public"."enum__solutions_v_version_sites" AS ENUM('mardu-de', 'platform');
  ALTER TABLE "_solutions_v_version_sites" ALTER COLUMN "value" SET DATA TYPE "public"."enum__solutions_v_version_sites" USING "value"::"public"."enum__solutions_v_version_sites";
  ALTER TABLE "product_categories_sites" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_product_categories_sites";
  CREATE TYPE "public"."enum_product_categories_sites" AS ENUM('mardu-de', 'platform');
  ALTER TABLE "product_categories_sites" ALTER COLUMN "value" SET DATA TYPE "public"."enum_product_categories_sites" USING "value"::"public"."enum_product_categories_sites";
  ALTER TABLE "_product_categories_v_version_sites" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum__product_categories_v_version_sites";
  CREATE TYPE "public"."enum__product_categories_v_version_sites" AS ENUM('mardu-de', 'platform');
  ALTER TABLE "_product_categories_v_version_sites" ALTER COLUMN "value" SET DATA TYPE "public"."enum__product_categories_v_version_sites" USING "value"::"public"."enum__product_categories_v_version_sites";
  ALTER TABLE "product_technologies_sites" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_product_technologies_sites";
  CREATE TYPE "public"."enum_product_technologies_sites" AS ENUM('mardu-de', 'platform');
  ALTER TABLE "product_technologies_sites" ALTER COLUMN "value" SET DATA TYPE "public"."enum_product_technologies_sites" USING "value"::"public"."enum_product_technologies_sites";
  ALTER TABLE "_product_technologies_v_version_sites" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum__product_technologies_v_version_sites";
  CREATE TYPE "public"."enum__product_technologies_v_version_sites" AS ENUM('mardu-de', 'platform');
  ALTER TABLE "_product_technologies_v_version_sites" ALTER COLUMN "value" SET DATA TYPE "public"."enum__product_technologies_v_version_sites" USING "value"::"public"."enum__product_technologies_v_version_sites";
  ALTER TABLE "product_carriers_sites" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_product_carriers_sites";
  CREATE TYPE "public"."enum_product_carriers_sites" AS ENUM('mardu-de', 'platform');
  ALTER TABLE "product_carriers_sites" ALTER COLUMN "value" SET DATA TYPE "public"."enum_product_carriers_sites" USING "value"::"public"."enum_product_carriers_sites";
  ALTER TABLE "_product_carriers_v_version_sites" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum__product_carriers_v_version_sites";
  CREATE TYPE "public"."enum__product_carriers_v_version_sites" AS ENUM('mardu-de', 'platform');
  ALTER TABLE "_product_carriers_v_version_sites" ALTER COLUMN "value" SET DATA TYPE "public"."enum__product_carriers_v_version_sites" USING "value"::"public"."enum__product_carriers_v_version_sites";
  ALTER TABLE "products_sites" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_products_sites";
  CREATE TYPE "public"."enum_products_sites" AS ENUM('mardu-de', 'platform');
  ALTER TABLE "products_sites" ALTER COLUMN "value" SET DATA TYPE "public"."enum_products_sites" USING "value"::"public"."enum_products_sites";
  ALTER TABLE "_products_v_version_sites" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum__products_v_version_sites";
  CREATE TYPE "public"."enum__products_v_version_sites" AS ENUM('mardu-de', 'platform');
  ALTER TABLE "_products_v_version_sites" ALTER COLUMN "value" SET DATA TYPE "public"."enum__products_v_version_sites" USING "value"::"public"."enum__products_v_version_sites";
  ALTER TABLE "product_variants_sites" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_product_variants_sites";
  CREATE TYPE "public"."enum_product_variants_sites" AS ENUM('mardu-de', 'platform');
  ALTER TABLE "product_variants_sites" ALTER COLUMN "value" SET DATA TYPE "public"."enum_product_variants_sites" USING "value"::"public"."enum_product_variants_sites";
  ALTER TABLE "_product_variants_v_version_sites" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum__product_variants_v_version_sites";
  CREATE TYPE "public"."enum__product_variants_v_version_sites" AS ENUM('mardu-de', 'platform');
  ALTER TABLE "_product_variants_v_version_sites" ALTER COLUMN "value" SET DATA TYPE "public"."enum__product_variants_v_version_sites" USING "value"::"public"."enum__product_variants_v_version_sites";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_blog_posts_sites" ADD VALUE 'mardu-space' BEFORE 'platform';
  ALTER TYPE "public"."enum__blog_posts_v_version_sites" ADD VALUE 'mardu-space' BEFORE 'platform';
  ALTER TYPE "public"."enum_legal_pages_sites" ADD VALUE 'mardu-space' BEFORE 'platform';
  ALTER TYPE "public"."enum__legal_pages_v_version_sites" ADD VALUE 'mardu-space' BEFORE 'platform';
  ALTER TYPE "public"."enum_roadmap_items_sites" ADD VALUE 'mardu-space' BEFORE 'platform';
  ALTER TYPE "public"."enum__roadmap_items_v_version_sites" ADD VALUE 'mardu-space' BEFORE 'platform';
  ALTER TYPE "public"."enum_integrations_sites" ADD VALUE 'mardu-space' BEFORE 'platform';
  ALTER TYPE "public"."enum__integrations_v_version_sites" ADD VALUE 'mardu-space' BEFORE 'platform';
  ALTER TYPE "public"."enum_newsletter_subscribers_site" ADD VALUE 'mardu-space';
  ALTER TYPE "public"."enum_contact_leads_site" ADD VALUE 'mardu-space';
  ALTER TYPE "public"."enum_preorder_requests_site" ADD VALUE 'mardu-space';
  ALTER TYPE "public"."enum_solutions_sites" ADD VALUE 'mardu-space' BEFORE 'platform';
  ALTER TYPE "public"."enum__solutions_v_version_sites" ADD VALUE 'mardu-space' BEFORE 'platform';
  ALTER TYPE "public"."enum_product_categories_sites" ADD VALUE 'mardu-space' BEFORE 'platform';
  ALTER TYPE "public"."enum__product_categories_v_version_sites" ADD VALUE 'mardu-space' BEFORE 'platform';
  ALTER TYPE "public"."enum_product_technologies_sites" ADD VALUE 'mardu-space' BEFORE 'platform';
  ALTER TYPE "public"."enum__product_technologies_v_version_sites" ADD VALUE 'mardu-space' BEFORE 'platform';
  ALTER TYPE "public"."enum_product_carriers_sites" ADD VALUE 'mardu-space' BEFORE 'platform';
  ALTER TYPE "public"."enum__product_carriers_v_version_sites" ADD VALUE 'mardu-space' BEFORE 'platform';
  ALTER TYPE "public"."enum_products_sites" ADD VALUE 'mardu-space' BEFORE 'platform';
  ALTER TYPE "public"."enum__products_v_version_sites" ADD VALUE 'mardu-space' BEFORE 'platform';
  ALTER TYPE "public"."enum_product_variants_sites" ADD VALUE 'mardu-space' BEFORE 'platform';
  ALTER TYPE "public"."enum__product_variants_v_version_sites" ADD VALUE 'mardu-space' BEFORE 'platform';`)
}
