import { sql } from '@payloadcms/db-postgres'
import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_roadmap_items_sites" AS ENUM('mardu-de', 'mardu-space', 'platform');
  CREATE TYPE "public"."enum_roadmap_items_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_roadmap_items_category" AS ENUM('software', 'hardware', 'platform', 'integrations');
  CREATE TYPE "public"."enum__roadmap_items_v_version_sites" AS ENUM('mardu-de', 'mardu-space', 'platform');
  CREATE TYPE "public"."enum__roadmap_items_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__roadmap_items_v_version_category" AS ENUM('software', 'hardware', 'platform', 'integrations');
  CREATE TABLE "roadmap_items_sites" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_roadmap_items_sites",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "roadmap_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"summary" varchar,
  	"phase_label" varchar,
  	"time_label" varchar,
  	"sort_order" numeric DEFAULT 0,
  	"status" "enum_roadmap_items_status" DEFAULT 'planned',
  	"category" "enum_roadmap_items_category" DEFAULT 'software',
  	"body_markdown" varchar,
  	"featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_roadmap_items_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_roadmap_items_v_version_sites" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__roadmap_items_v_version_sites",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_roadmap_items_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_summary" varchar,
  	"version_phase_label" varchar,
  	"version_time_label" varchar,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_status" "enum__roadmap_items_v_version_status" DEFAULT 'planned',
  	"version_category" "enum__roadmap_items_v_version_category" DEFAULT 'software',
  	"version_body_markdown" varchar,
  	"version_featured" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__roadmap_items_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "blog_categories_find" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "blog_categories_create" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "blog_categories_update" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "blog_categories_delete" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "blog_authors_find" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "blog_authors_create" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "blog_authors_update" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "blog_authors_delete" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "integration_categories_find" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "integration_categories_create" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "integration_categories_update" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "integration_categories_delete" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "integration_protocols_find" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "integration_protocols_create" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "integration_protocols_update" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "integration_protocols_delete" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "roadmap_items_find" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "roadmap_items_create" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "roadmap_items_update" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "roadmap_items_delete" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "media_find" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "newsletter_subscribers_find" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "newsletter_subscribers_create" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "newsletter_subscribers_update" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "contact_leads_find" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "contact_leads_create" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "contact_leads_update" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "preorder_requests_find" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "preorder_requests_create" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "preorder_requests_update" boolean DEFAULT false;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "roadmap_items_id" integer;
  ALTER TABLE "roadmap_items_sites" ADD CONSTRAINT "roadmap_items_sites_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."roadmap_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_roadmap_items_v_version_sites" ADD CONSTRAINT "_roadmap_items_v_version_sites_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_roadmap_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_roadmap_items_v" ADD CONSTRAINT "_roadmap_items_v_parent_id_roadmap_items_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."roadmap_items"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "roadmap_items_sites_order_idx" ON "roadmap_items_sites" USING btree ("order");
  CREATE INDEX "roadmap_items_sites_parent_idx" ON "roadmap_items_sites" USING btree ("parent_id");
  CREATE UNIQUE INDEX "roadmap_items_slug_idx" ON "roadmap_items" USING btree ("slug");
  CREATE INDEX "roadmap_items_featured_idx" ON "roadmap_items" USING btree ("featured");
  CREATE INDEX "roadmap_items_updated_at_idx" ON "roadmap_items" USING btree ("updated_at");
  CREATE INDEX "roadmap_items_created_at_idx" ON "roadmap_items" USING btree ("created_at");
  CREATE INDEX "roadmap_items__status_idx" ON "roadmap_items" USING btree ("_status");
  CREATE INDEX "_roadmap_items_v_version_sites_order_idx" ON "_roadmap_items_v_version_sites" USING btree ("order");
  CREATE INDEX "_roadmap_items_v_version_sites_parent_idx" ON "_roadmap_items_v_version_sites" USING btree ("parent_id");
  CREATE INDEX "_roadmap_items_v_parent_idx" ON "_roadmap_items_v" USING btree ("parent_id");
  CREATE INDEX "_roadmap_items_v_version_version_slug_idx" ON "_roadmap_items_v" USING btree ("version_slug");
  CREATE INDEX "_roadmap_items_v_version_version_featured_idx" ON "_roadmap_items_v" USING btree ("version_featured");
  CREATE INDEX "_roadmap_items_v_version_version_updated_at_idx" ON "_roadmap_items_v" USING btree ("version_updated_at");
  CREATE INDEX "_roadmap_items_v_version_version_created_at_idx" ON "_roadmap_items_v" USING btree ("version_created_at");
  CREATE INDEX "_roadmap_items_v_version_version__status_idx" ON "_roadmap_items_v" USING btree ("version__status");
  CREATE INDEX "_roadmap_items_v_created_at_idx" ON "_roadmap_items_v" USING btree ("created_at");
  CREATE INDEX "_roadmap_items_v_updated_at_idx" ON "_roadmap_items_v" USING btree ("updated_at");
  CREATE INDEX "_roadmap_items_v_latest_idx" ON "_roadmap_items_v" USING btree ("latest");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_roadmap_items_fk" FOREIGN KEY ("roadmap_items_id") REFERENCES "public"."roadmap_items"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_roadmap_items_id_idx" ON "payload_locked_documents_rels" USING btree ("roadmap_items_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "roadmap_items_sites" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "roadmap_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_roadmap_items_v_version_sites" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_roadmap_items_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "roadmap_items_sites" CASCADE;
  DROP TABLE "roadmap_items" CASCADE;
  DROP TABLE "_roadmap_items_v_version_sites" CASCADE;
  DROP TABLE "_roadmap_items_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_roadmap_items_fk";
  
  DROP INDEX "payload_locked_documents_rels_roadmap_items_id_idx";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "blog_categories_find";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "blog_categories_create";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "blog_categories_update";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "blog_categories_delete";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "blog_authors_find";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "blog_authors_create";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "blog_authors_update";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "blog_authors_delete";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "integration_categories_find";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "integration_categories_create";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "integration_categories_update";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "integration_categories_delete";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "integration_protocols_find";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "integration_protocols_create";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "integration_protocols_update";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "integration_protocols_delete";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "roadmap_items_find";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "roadmap_items_create";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "roadmap_items_update";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "roadmap_items_delete";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "media_find";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "newsletter_subscribers_find";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "newsletter_subscribers_create";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "newsletter_subscribers_update";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "contact_leads_find";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "contact_leads_create";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "contact_leads_update";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "preorder_requests_find";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "preorder_requests_create";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "preorder_requests_update";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "roadmap_items_id";
  DROP TYPE "public"."enum_roadmap_items_sites";
  DROP TYPE "public"."enum_roadmap_items_status";
  DROP TYPE "public"."enum_roadmap_items_category";
  DROP TYPE "public"."enum__roadmap_items_v_version_sites";
  DROP TYPE "public"."enum__roadmap_items_v_version_status";
  DROP TYPE "public"."enum__roadmap_items_v_version_category";`)
}
