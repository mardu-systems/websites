import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_solutions_content_blocks_image_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_solutions_sites" AS ENUM('mardu-de', 'mardu-space', 'platform');
  CREATE TYPE "public"."enum_solutions_theme_tone" AS ENUM('forest', 'sand', 'mist', 'clay', 'ink');
  CREATE TYPE "public"."enum_solutions_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__solutions_v_version_content_blocks_image_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__solutions_v_version_sites" AS ENUM('mardu-de', 'mardu-space', 'platform');
  CREATE TYPE "public"."enum__solutions_v_version_theme_tone" AS ENUM('forest', 'sand', 'mist', 'clay', 'ink');
  CREATE TYPE "public"."enum__solutions_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_product_categories_sites" AS ENUM('mardu-de', 'mardu-space', 'platform');
  CREATE TYPE "public"."enum_product_categories_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__product_categories_v_version_sites" AS ENUM('mardu-de', 'mardu-space', 'platform');
  CREATE TYPE "public"."enum__product_categories_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_product_technologies_sites" AS ENUM('mardu-de', 'mardu-space', 'platform');
  CREATE TYPE "public"."enum_product_technologies_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__product_technologies_v_version_sites" AS ENUM('mardu-de', 'mardu-space', 'platform');
  CREATE TYPE "public"."enum__product_technologies_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_product_carriers_sites" AS ENUM('mardu-de', 'mardu-space', 'platform');
  CREATE TYPE "public"."enum_product_carriers_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__product_carriers_v_version_sites" AS ENUM('mardu-de', 'mardu-space', 'platform');
  CREATE TYPE "public"."enum__product_carriers_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_products_sites" AS ENUM('mardu-de', 'mardu-space', 'platform');
  CREATE TYPE "public"."enum_products_availability" AS ENUM('available', 'lead-time', 'project');
  CREATE TYPE "public"."enum_products_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_version_sites" AS ENUM('mardu-de', 'mardu-space', 'platform');
  CREATE TYPE "public"."enum__products_v_version_availability" AS ENUM('available', 'lead-time', 'project');
  CREATE TYPE "public"."enum__products_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_product_variants_sites" AS ENUM('mardu-de', 'mardu-space', 'platform');
  CREATE TYPE "public"."enum_product_variants_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__product_variants_v_version_sites" AS ENUM('mardu-de', 'mardu-space', 'platform');
  CREATE TYPE "public"."enum__product_variants_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "solutions_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "solutions_content_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"body" varchar,
  	"image_url" varchar,
  	"image_alt" varchar,
  	"image_id" integer,
  	"image_side" "enum_solutions_content_blocks_image_side"
  );
  
  CREATE TABLE "solutions_sites" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_solutions_sites",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "solutions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"badge" varchar,
  	"tagline" varchar,
  	"summary" varchar,
  	"theme_tone" "enum_solutions_theme_tone",
  	"hero_title" varchar,
  	"hero_intro" varchar,
  	"problem_title" varchar,
  	"problem_body" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"image_url" varchar,
  	"image_alt" varchar,
  	"image_id" integer,
  	"hero_image_url" varchar,
  	"hero_image_alt" varchar,
  	"hero_image_id" integer,
  	"detail_markdown" varchar,
  	"published_at" timestamp(3) with time zone,
  	"featured" boolean DEFAULT false,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_solutions_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_solutions_v_version_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_solutions_v_version_content_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"body" varchar,
  	"image_url" varchar,
  	"image_alt" varchar,
  	"image_id" integer,
  	"image_side" "enum__solutions_v_version_content_blocks_image_side",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_solutions_v_version_sites" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__solutions_v_version_sites",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_solutions_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_badge" varchar,
  	"version_tagline" varchar,
  	"version_summary" varchar,
  	"version_theme_tone" "enum__solutions_v_version_theme_tone",
  	"version_hero_title" varchar,
  	"version_hero_intro" varchar,
  	"version_problem_title" varchar,
  	"version_problem_body" varchar,
  	"version_cta_label" varchar,
  	"version_cta_href" varchar,
  	"version_image_url" varchar,
  	"version_image_alt" varchar,
  	"version_image_id" integer,
  	"version_hero_image_url" varchar,
  	"version_hero_image_alt" varchar,
  	"version_hero_image_id" integer,
  	"version_detail_markdown" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_featured" boolean DEFAULT false,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__solutions_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "product_categories_sites" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_product_categories_sites",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "product_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"eyebrow" varchar,
  	"description" varchar,
  	"image_url" varchar,
  	"image_alt" varchar,
  	"image_id" integer,
  	"featured" boolean,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_product_categories_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "product_categories_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "_product_categories_v_version_sites" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__product_categories_v_version_sites",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_product_categories_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_eyebrow" varchar,
  	"version_description" varchar,
  	"version_image_url" varchar,
  	"version_image_alt" varchar,
  	"version_image_id" integer,
  	"version_featured" boolean,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__product_categories_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_product_categories_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "product_technologies_sites" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_product_technologies_sites",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "product_technologies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"description" varchar,
  	"visual_label" varchar,
  	"image_url" varchar,
  	"image_alt" varchar,
  	"image_id" integer,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_product_technologies_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_product_technologies_v_version_sites" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__product_technologies_v_version_sites",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_product_technologies_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_description" varchar,
  	"version_visual_label" varchar,
  	"version_image_url" varchar,
  	"version_image_alt" varchar,
  	"version_image_id" integer,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__product_technologies_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "product_carriers_sites" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_product_carriers_sites",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "product_carriers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"description" varchar,
  	"visual_label" varchar,
  	"technology_label" varchar,
  	"image_url" varchar,
  	"image_alt" varchar,
  	"image_id" integer,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_product_carriers_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_product_carriers_v_version_sites" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__product_carriers_v_version_sites",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_product_carriers_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_description" varchar,
  	"version_visual_label" varchar,
  	"version_technology_label" varchar,
  	"version_image_url" varchar,
  	"version_image_alt" varchar,
  	"version_image_id" integer,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__product_carriers_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "products_feature_groups_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "products_feature_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "products_spec_groups_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "products_spec_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "products_sites" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_products_sites",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"summary" varchar,
  	"tagline" varchar,
  	"badge" varchar,
  	"eyebrow" varchar,
  	"description" varchar,
  	"hero_description" varchar,
  	"overview" varchar,
  	"detail_markdown" varchar,
  	"breadcrumb_label" varchar,
  	"price_from_label" varchar,
  	"availability" "enum_products_availability" DEFAULT 'available',
  	"availability_label" varchar,
  	"image_url" varchar,
  	"image_alt" varchar,
  	"image_id" integer,
  	"price_from" numeric,
  	"technologies_heading" varchar,
  	"technologies_intro" varchar,
  	"carriers_heading" varchar,
  	"carriers_intro" varchar,
  	"primary_cta_label" varchar,
  	"secondary_cta_label" varchar,
  	"featured" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_products_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"product_variants_id" integer,
  	"product_categories_id" integer,
  	"product_technologies_id" integer,
  	"product_carriers_id" integer,
  	"products_id" integer
  );
  
  CREATE TABLE "_products_v_version_feature_groups_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_feature_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_spec_groups_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_spec_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_sites" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__products_v_version_sites",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_products_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_summary" varchar,
  	"version_tagline" varchar,
  	"version_badge" varchar,
  	"version_eyebrow" varchar,
  	"version_description" varchar,
  	"version_hero_description" varchar,
  	"version_overview" varchar,
  	"version_detail_markdown" varchar,
  	"version_breadcrumb_label" varchar,
  	"version_price_from_label" varchar,
  	"version_availability" "enum__products_v_version_availability" DEFAULT 'available',
  	"version_availability_label" varchar,
  	"version_image_url" varchar,
  	"version_image_alt" varchar,
  	"version_image_id" integer,
  	"version_price_from" numeric,
  	"version_technologies_heading" varchar,
  	"version_technologies_intro" varchar,
  	"version_carriers_heading" varchar,
  	"version_carriers_intro" varchar,
  	"version_primary_cta_label" varchar,
  	"version_secondary_cta_label" varchar,
  	"version_featured" boolean DEFAULT false,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__products_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_products_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"product_variants_id" integer,
  	"product_categories_id" integer,
  	"product_technologies_id" integer,
  	"product_carriers_id" integer,
  	"products_id" integer
  );
  
  CREATE TABLE "product_variants_attributes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "product_variants_sites" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_product_variants_sites",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "product_variants" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"slug" varchar,
  	"summary" varchar,
  	"price_from_label" varchar,
  	"availability_label" varchar,
  	"recommendation" varchar,
  	"image_id" integer,
  	"image_url" varchar,
  	"image_alt" varchar,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_product_variants_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_product_variants_v_version_attributes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_product_variants_v_version_sites" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__product_variants_v_version_sites",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_product_variants_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_label" varchar,
  	"version_slug" varchar,
  	"version_summary" varchar,
  	"version_price_from_label" varchar,
  	"version_availability_label" varchar,
  	"version_recommendation" varchar,
  	"version_image_id" integer,
  	"version_image_url" varchar,
  	"version_image_alt" varchar,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__product_variants_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "_roadmap_items_v" ALTER COLUMN "version_status" DROP DEFAULT;
  ALTER TABLE "_roadmap_items_v" ALTER COLUMN "version_status" SET DATA TYPE "public"."enum_roadmap_items_roadmap_status" USING "version_status"::text::"public"."enum_roadmap_items_roadmap_status";
  ALTER TABLE "_roadmap_items_v" ALTER COLUMN "version_status" SET DEFAULT 'planned';
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "solutions_find" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "solutions_create" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "solutions_update" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "solutions_delete" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "product_categories_find" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "product_categories_create" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "product_categories_update" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "product_categories_delete" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "product_technologies_find" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "product_technologies_create" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "product_technologies_update" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "product_technologies_delete" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "product_carriers_find" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "product_carriers_create" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "product_carriers_update" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "product_carriers_delete" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "products_find" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "products_create" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "products_update" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "products_delete" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "product_variants_find" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "product_variants_create" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "product_variants_update" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "product_variants_delete" boolean DEFAULT false;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "solutions_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "product_categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "product_technologies_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "product_carriers_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "product_variants_id" integer;
  ALTER TABLE "solutions_features" ADD CONSTRAINT "solutions_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_content_blocks" ADD CONSTRAINT "solutions_content_blocks_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "solutions_content_blocks" ADD CONSTRAINT "solutions_content_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_sites" ADD CONSTRAINT "solutions_sites_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions" ADD CONSTRAINT "solutions_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "solutions" ADD CONSTRAINT "solutions_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "solutions" ADD CONSTRAINT "solutions_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_solutions_v_version_features" ADD CONSTRAINT "_solutions_v_version_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_solutions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_version_content_blocks" ADD CONSTRAINT "_solutions_v_version_content_blocks_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_solutions_v_version_content_blocks" ADD CONSTRAINT "_solutions_v_version_content_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_solutions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_version_sites" ADD CONSTRAINT "_solutions_v_version_sites_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_solutions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v" ADD CONSTRAINT "_solutions_v_parent_id_solutions_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."solutions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_solutions_v" ADD CONSTRAINT "_solutions_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_solutions_v" ADD CONSTRAINT "_solutions_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_solutions_v" ADD CONSTRAINT "_solutions_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_categories_sites" ADD CONSTRAINT "product_categories_sites_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_categories_rels" ADD CONSTRAINT "product_categories_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_categories_rels" ADD CONSTRAINT "product_categories_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_product_categories_v_version_sites" ADD CONSTRAINT "_product_categories_v_version_sites_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_product_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_product_categories_v" ADD CONSTRAINT "_product_categories_v_parent_id_product_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_product_categories_v" ADD CONSTRAINT "_product_categories_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_product_categories_v_rels" ADD CONSTRAINT "_product_categories_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_product_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_product_categories_v_rels" ADD CONSTRAINT "_product_categories_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_technologies_sites" ADD CONSTRAINT "product_technologies_sites_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."product_technologies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_technologies" ADD CONSTRAINT "product_technologies_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_product_technologies_v_version_sites" ADD CONSTRAINT "_product_technologies_v_version_sites_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_product_technologies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_product_technologies_v" ADD CONSTRAINT "_product_technologies_v_parent_id_product_technologies_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."product_technologies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_product_technologies_v" ADD CONSTRAINT "_product_technologies_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_carriers_sites" ADD CONSTRAINT "product_carriers_sites_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."product_carriers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_carriers" ADD CONSTRAINT "product_carriers_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_product_carriers_v_version_sites" ADD CONSTRAINT "_product_carriers_v_version_sites_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_product_carriers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_product_carriers_v" ADD CONSTRAINT "_product_carriers_v_parent_id_product_carriers_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."product_carriers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_product_carriers_v" ADD CONSTRAINT "_product_carriers_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_feature_groups_items" ADD CONSTRAINT "products_feature_groups_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_feature_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_feature_groups" ADD CONSTRAINT "products_feature_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_spec_groups_specs" ADD CONSTRAINT "products_spec_groups_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_spec_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_spec_groups" ADD CONSTRAINT "products_spec_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_sites" ADD CONSTRAINT "products_sites_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_product_variants_fk" FOREIGN KEY ("product_variants_id") REFERENCES "public"."product_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_product_technologies_fk" FOREIGN KEY ("product_technologies_id") REFERENCES "public"."product_technologies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_product_carriers_fk" FOREIGN KEY ("product_carriers_id") REFERENCES "public"."product_carriers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_feature_groups_items" ADD CONSTRAINT "_products_v_version_feature_groups_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_feature_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_feature_groups" ADD CONSTRAINT "_products_v_version_feature_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_spec_groups_specs" ADD CONSTRAINT "_products_v_version_spec_groups_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_spec_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_spec_groups" ADD CONSTRAINT "_products_v_version_spec_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_sites" ADD CONSTRAINT "_products_v_version_sites_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_parent_id_products_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_product_variants_fk" FOREIGN KEY ("product_variants_id") REFERENCES "public"."product_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_product_technologies_fk" FOREIGN KEY ("product_technologies_id") REFERENCES "public"."product_technologies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_product_carriers_fk" FOREIGN KEY ("product_carriers_id") REFERENCES "public"."product_carriers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_variants_attributes" ADD CONSTRAINT "product_variants_attributes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_variants_sites" ADD CONSTRAINT "product_variants_sites_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."product_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_product_variants_v_version_attributes" ADD CONSTRAINT "_product_variants_v_version_attributes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_product_variants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_product_variants_v_version_sites" ADD CONSTRAINT "_product_variants_v_version_sites_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_product_variants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_product_variants_v" ADD CONSTRAINT "_product_variants_v_parent_id_product_variants_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."product_variants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_product_variants_v" ADD CONSTRAINT "_product_variants_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "solutions_features_order_idx" ON "solutions_features" USING btree ("_order");
  CREATE INDEX "solutions_features_parent_id_idx" ON "solutions_features" USING btree ("_parent_id");
  CREATE INDEX "solutions_content_blocks_order_idx" ON "solutions_content_blocks" USING btree ("_order");
  CREATE INDEX "solutions_content_blocks_parent_id_idx" ON "solutions_content_blocks" USING btree ("_parent_id");
  CREATE INDEX "solutions_content_blocks_image_idx" ON "solutions_content_blocks" USING btree ("image_id");
  CREATE INDEX "solutions_sites_order_idx" ON "solutions_sites" USING btree ("order");
  CREATE INDEX "solutions_sites_parent_idx" ON "solutions_sites" USING btree ("parent_id");
  CREATE UNIQUE INDEX "solutions_slug_idx" ON "solutions" USING btree ("slug");
  CREATE INDEX "solutions_image_idx" ON "solutions" USING btree ("image_id");
  CREATE INDEX "solutions_hero_image_idx" ON "solutions" USING btree ("hero_image_id");
  CREATE INDEX "solutions_meta_meta_image_idx" ON "solutions" USING btree ("meta_image_id");
  CREATE INDEX "solutions_updated_at_idx" ON "solutions" USING btree ("updated_at");
  CREATE INDEX "solutions_created_at_idx" ON "solutions" USING btree ("created_at");
  CREATE INDEX "solutions__status_idx" ON "solutions" USING btree ("_status");
  CREATE INDEX "_solutions_v_version_features_order_idx" ON "_solutions_v_version_features" USING btree ("_order");
  CREATE INDEX "_solutions_v_version_features_parent_id_idx" ON "_solutions_v_version_features" USING btree ("_parent_id");
  CREATE INDEX "_solutions_v_version_content_blocks_order_idx" ON "_solutions_v_version_content_blocks" USING btree ("_order");
  CREATE INDEX "_solutions_v_version_content_blocks_parent_id_idx" ON "_solutions_v_version_content_blocks" USING btree ("_parent_id");
  CREATE INDEX "_solutions_v_version_content_blocks_image_idx" ON "_solutions_v_version_content_blocks" USING btree ("image_id");
  CREATE INDEX "_solutions_v_version_sites_order_idx" ON "_solutions_v_version_sites" USING btree ("order");
  CREATE INDEX "_solutions_v_version_sites_parent_idx" ON "_solutions_v_version_sites" USING btree ("parent_id");
  CREATE INDEX "_solutions_v_parent_idx" ON "_solutions_v" USING btree ("parent_id");
  CREATE INDEX "_solutions_v_version_version_slug_idx" ON "_solutions_v" USING btree ("version_slug");
  CREATE INDEX "_solutions_v_version_version_image_idx" ON "_solutions_v" USING btree ("version_image_id");
  CREATE INDEX "_solutions_v_version_version_hero_image_idx" ON "_solutions_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_solutions_v_version_meta_version_meta_image_idx" ON "_solutions_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_solutions_v_version_version_updated_at_idx" ON "_solutions_v" USING btree ("version_updated_at");
  CREATE INDEX "_solutions_v_version_version_created_at_idx" ON "_solutions_v" USING btree ("version_created_at");
  CREATE INDEX "_solutions_v_version_version__status_idx" ON "_solutions_v" USING btree ("version__status");
  CREATE INDEX "_solutions_v_created_at_idx" ON "_solutions_v" USING btree ("created_at");
  CREATE INDEX "_solutions_v_updated_at_idx" ON "_solutions_v" USING btree ("updated_at");
  CREATE INDEX "_solutions_v_latest_idx" ON "_solutions_v" USING btree ("latest");
  CREATE INDEX "product_categories_sites_order_idx" ON "product_categories_sites" USING btree ("order");
  CREATE INDEX "product_categories_sites_parent_idx" ON "product_categories_sites" USING btree ("parent_id");
  CREATE UNIQUE INDEX "product_categories_slug_idx" ON "product_categories" USING btree ("slug");
  CREATE INDEX "product_categories_image_idx" ON "product_categories" USING btree ("image_id");
  CREATE INDEX "product_categories_updated_at_idx" ON "product_categories" USING btree ("updated_at");
  CREATE INDEX "product_categories_created_at_idx" ON "product_categories" USING btree ("created_at");
  CREATE INDEX "product_categories__status_idx" ON "product_categories" USING btree ("_status");
  CREATE INDEX "product_categories_rels_order_idx" ON "product_categories_rels" USING btree ("order");
  CREATE INDEX "product_categories_rels_parent_idx" ON "product_categories_rels" USING btree ("parent_id");
  CREATE INDEX "product_categories_rels_path_idx" ON "product_categories_rels" USING btree ("path");
  CREATE INDEX "product_categories_rels_products_id_idx" ON "product_categories_rels" USING btree ("products_id");
  CREATE INDEX "_product_categories_v_version_sites_order_idx" ON "_product_categories_v_version_sites" USING btree ("order");
  CREATE INDEX "_product_categories_v_version_sites_parent_idx" ON "_product_categories_v_version_sites" USING btree ("parent_id");
  CREATE INDEX "_product_categories_v_parent_idx" ON "_product_categories_v" USING btree ("parent_id");
  CREATE INDEX "_product_categories_v_version_version_slug_idx" ON "_product_categories_v" USING btree ("version_slug");
  CREATE INDEX "_product_categories_v_version_version_image_idx" ON "_product_categories_v" USING btree ("version_image_id");
  CREATE INDEX "_product_categories_v_version_version_updated_at_idx" ON "_product_categories_v" USING btree ("version_updated_at");
  CREATE INDEX "_product_categories_v_version_version_created_at_idx" ON "_product_categories_v" USING btree ("version_created_at");
  CREATE INDEX "_product_categories_v_version_version__status_idx" ON "_product_categories_v" USING btree ("version__status");
  CREATE INDEX "_product_categories_v_created_at_idx" ON "_product_categories_v" USING btree ("created_at");
  CREATE INDEX "_product_categories_v_updated_at_idx" ON "_product_categories_v" USING btree ("updated_at");
  CREATE INDEX "_product_categories_v_latest_idx" ON "_product_categories_v" USING btree ("latest");
  CREATE INDEX "_product_categories_v_rels_order_idx" ON "_product_categories_v_rels" USING btree ("order");
  CREATE INDEX "_product_categories_v_rels_parent_idx" ON "_product_categories_v_rels" USING btree ("parent_id");
  CREATE INDEX "_product_categories_v_rels_path_idx" ON "_product_categories_v_rels" USING btree ("path");
  CREATE INDEX "_product_categories_v_rels_products_id_idx" ON "_product_categories_v_rels" USING btree ("products_id");
  CREATE INDEX "product_technologies_sites_order_idx" ON "product_technologies_sites" USING btree ("order");
  CREATE INDEX "product_technologies_sites_parent_idx" ON "product_technologies_sites" USING btree ("parent_id");
  CREATE UNIQUE INDEX "product_technologies_slug_idx" ON "product_technologies" USING btree ("slug");
  CREATE INDEX "product_technologies_image_idx" ON "product_technologies" USING btree ("image_id");
  CREATE INDEX "product_technologies_updated_at_idx" ON "product_technologies" USING btree ("updated_at");
  CREATE INDEX "product_technologies_created_at_idx" ON "product_technologies" USING btree ("created_at");
  CREATE INDEX "product_technologies__status_idx" ON "product_technologies" USING btree ("_status");
  CREATE INDEX "_product_technologies_v_version_sites_order_idx" ON "_product_technologies_v_version_sites" USING btree ("order");
  CREATE INDEX "_product_technologies_v_version_sites_parent_idx" ON "_product_technologies_v_version_sites" USING btree ("parent_id");
  CREATE INDEX "_product_technologies_v_parent_idx" ON "_product_technologies_v" USING btree ("parent_id");
  CREATE INDEX "_product_technologies_v_version_version_slug_idx" ON "_product_technologies_v" USING btree ("version_slug");
  CREATE INDEX "_product_technologies_v_version_version_image_idx" ON "_product_technologies_v" USING btree ("version_image_id");
  CREATE INDEX "_product_technologies_v_version_version_updated_at_idx" ON "_product_technologies_v" USING btree ("version_updated_at");
  CREATE INDEX "_product_technologies_v_version_version_created_at_idx" ON "_product_technologies_v" USING btree ("version_created_at");
  CREATE INDEX "_product_technologies_v_version_version__status_idx" ON "_product_technologies_v" USING btree ("version__status");
  CREATE INDEX "_product_technologies_v_created_at_idx" ON "_product_technologies_v" USING btree ("created_at");
  CREATE INDEX "_product_technologies_v_updated_at_idx" ON "_product_technologies_v" USING btree ("updated_at");
  CREATE INDEX "_product_technologies_v_latest_idx" ON "_product_technologies_v" USING btree ("latest");
  CREATE INDEX "product_carriers_sites_order_idx" ON "product_carriers_sites" USING btree ("order");
  CREATE INDEX "product_carriers_sites_parent_idx" ON "product_carriers_sites" USING btree ("parent_id");
  CREATE UNIQUE INDEX "product_carriers_slug_idx" ON "product_carriers" USING btree ("slug");
  CREATE INDEX "product_carriers_image_idx" ON "product_carriers" USING btree ("image_id");
  CREATE INDEX "product_carriers_updated_at_idx" ON "product_carriers" USING btree ("updated_at");
  CREATE INDEX "product_carriers_created_at_idx" ON "product_carriers" USING btree ("created_at");
  CREATE INDEX "product_carriers__status_idx" ON "product_carriers" USING btree ("_status");
  CREATE INDEX "_product_carriers_v_version_sites_order_idx" ON "_product_carriers_v_version_sites" USING btree ("order");
  CREATE INDEX "_product_carriers_v_version_sites_parent_idx" ON "_product_carriers_v_version_sites" USING btree ("parent_id");
  CREATE INDEX "_product_carriers_v_parent_idx" ON "_product_carriers_v" USING btree ("parent_id");
  CREATE INDEX "_product_carriers_v_version_version_slug_idx" ON "_product_carriers_v" USING btree ("version_slug");
  CREATE INDEX "_product_carriers_v_version_version_image_idx" ON "_product_carriers_v" USING btree ("version_image_id");
  CREATE INDEX "_product_carriers_v_version_version_updated_at_idx" ON "_product_carriers_v" USING btree ("version_updated_at");
  CREATE INDEX "_product_carriers_v_version_version_created_at_idx" ON "_product_carriers_v" USING btree ("version_created_at");
  CREATE INDEX "_product_carriers_v_version_version__status_idx" ON "_product_carriers_v" USING btree ("version__status");
  CREATE INDEX "_product_carriers_v_created_at_idx" ON "_product_carriers_v" USING btree ("created_at");
  CREATE INDEX "_product_carriers_v_updated_at_idx" ON "_product_carriers_v" USING btree ("updated_at");
  CREATE INDEX "_product_carriers_v_latest_idx" ON "_product_carriers_v" USING btree ("latest");
  CREATE INDEX "products_feature_groups_items_order_idx" ON "products_feature_groups_items" USING btree ("_order");
  CREATE INDEX "products_feature_groups_items_parent_id_idx" ON "products_feature_groups_items" USING btree ("_parent_id");
  CREATE INDEX "products_feature_groups_order_idx" ON "products_feature_groups" USING btree ("_order");
  CREATE INDEX "products_feature_groups_parent_id_idx" ON "products_feature_groups" USING btree ("_parent_id");
  CREATE INDEX "products_spec_groups_specs_order_idx" ON "products_spec_groups_specs" USING btree ("_order");
  CREATE INDEX "products_spec_groups_specs_parent_id_idx" ON "products_spec_groups_specs" USING btree ("_parent_id");
  CREATE INDEX "products_spec_groups_order_idx" ON "products_spec_groups" USING btree ("_order");
  CREATE INDEX "products_spec_groups_parent_id_idx" ON "products_spec_groups" USING btree ("_parent_id");
  CREATE INDEX "products_sites_order_idx" ON "products_sites" USING btree ("order");
  CREATE INDEX "products_sites_parent_idx" ON "products_sites" USING btree ("parent_id");
  CREATE UNIQUE INDEX "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX "products_image_idx" ON "products" USING btree ("image_id");
  CREATE INDEX "products_meta_meta_image_idx" ON "products" USING btree ("meta_image_id");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX "products__status_idx" ON "products" USING btree ("_status");
  CREATE INDEX "products_rels_order_idx" ON "products_rels" USING btree ("order");
  CREATE INDEX "products_rels_parent_idx" ON "products_rels" USING btree ("parent_id");
  CREATE INDEX "products_rels_path_idx" ON "products_rels" USING btree ("path");
  CREATE INDEX "products_rels_product_variants_id_idx" ON "products_rels" USING btree ("product_variants_id");
  CREATE INDEX "products_rels_product_categories_id_idx" ON "products_rels" USING btree ("product_categories_id");
  CREATE INDEX "products_rels_product_technologies_id_idx" ON "products_rels" USING btree ("product_technologies_id");
  CREATE INDEX "products_rels_product_carriers_id_idx" ON "products_rels" USING btree ("product_carriers_id");
  CREATE INDEX "products_rels_products_id_idx" ON "products_rels" USING btree ("products_id");
  CREATE INDEX "_products_v_version_feature_groups_items_order_idx" ON "_products_v_version_feature_groups_items" USING btree ("_order");
  CREATE INDEX "_products_v_version_feature_groups_items_parent_id_idx" ON "_products_v_version_feature_groups_items" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_feature_groups_order_idx" ON "_products_v_version_feature_groups" USING btree ("_order");
  CREATE INDEX "_products_v_version_feature_groups_parent_id_idx" ON "_products_v_version_feature_groups" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_spec_groups_specs_order_idx" ON "_products_v_version_spec_groups_specs" USING btree ("_order");
  CREATE INDEX "_products_v_version_spec_groups_specs_parent_id_idx" ON "_products_v_version_spec_groups_specs" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_spec_groups_order_idx" ON "_products_v_version_spec_groups" USING btree ("_order");
  CREATE INDEX "_products_v_version_spec_groups_parent_id_idx" ON "_products_v_version_spec_groups" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_sites_order_idx" ON "_products_v_version_sites" USING btree ("order");
  CREATE INDEX "_products_v_version_sites_parent_idx" ON "_products_v_version_sites" USING btree ("parent_id");
  CREATE INDEX "_products_v_parent_idx" ON "_products_v" USING btree ("parent_id");
  CREATE INDEX "_products_v_version_version_slug_idx" ON "_products_v" USING btree ("version_slug");
  CREATE INDEX "_products_v_version_version_image_idx" ON "_products_v" USING btree ("version_image_id");
  CREATE INDEX "_products_v_version_meta_version_meta_image_idx" ON "_products_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_products_v_version_version_updated_at_idx" ON "_products_v" USING btree ("version_updated_at");
  CREATE INDEX "_products_v_version_version_created_at_idx" ON "_products_v" USING btree ("version_created_at");
  CREATE INDEX "_products_v_version_version__status_idx" ON "_products_v" USING btree ("version__status");
  CREATE INDEX "_products_v_created_at_idx" ON "_products_v" USING btree ("created_at");
  CREATE INDEX "_products_v_updated_at_idx" ON "_products_v" USING btree ("updated_at");
  CREATE INDEX "_products_v_latest_idx" ON "_products_v" USING btree ("latest");
  CREATE INDEX "_products_v_rels_order_idx" ON "_products_v_rels" USING btree ("order");
  CREATE INDEX "_products_v_rels_parent_idx" ON "_products_v_rels" USING btree ("parent_id");
  CREATE INDEX "_products_v_rels_path_idx" ON "_products_v_rels" USING btree ("path");
  CREATE INDEX "_products_v_rels_product_variants_id_idx" ON "_products_v_rels" USING btree ("product_variants_id");
  CREATE INDEX "_products_v_rels_product_categories_id_idx" ON "_products_v_rels" USING btree ("product_categories_id");
  CREATE INDEX "_products_v_rels_product_technologies_id_idx" ON "_products_v_rels" USING btree ("product_technologies_id");
  CREATE INDEX "_products_v_rels_product_carriers_id_idx" ON "_products_v_rels" USING btree ("product_carriers_id");
  CREATE INDEX "_products_v_rels_products_id_idx" ON "_products_v_rels" USING btree ("products_id");
  CREATE INDEX "product_variants_attributes_order_idx" ON "product_variants_attributes" USING btree ("_order");
  CREATE INDEX "product_variants_attributes_parent_id_idx" ON "product_variants_attributes" USING btree ("_parent_id");
  CREATE INDEX "product_variants_sites_order_idx" ON "product_variants_sites" USING btree ("order");
  CREATE INDEX "product_variants_sites_parent_idx" ON "product_variants_sites" USING btree ("parent_id");
  CREATE UNIQUE INDEX "product_variants_slug_idx" ON "product_variants" USING btree ("slug");
  CREATE INDEX "product_variants_image_idx" ON "product_variants" USING btree ("image_id");
  CREATE INDEX "product_variants_updated_at_idx" ON "product_variants" USING btree ("updated_at");
  CREATE INDEX "product_variants_created_at_idx" ON "product_variants" USING btree ("created_at");
  CREATE INDEX "product_variants__status_idx" ON "product_variants" USING btree ("_status");
  CREATE INDEX "_product_variants_v_version_attributes_order_idx" ON "_product_variants_v_version_attributes" USING btree ("_order");
  CREATE INDEX "_product_variants_v_version_attributes_parent_id_idx" ON "_product_variants_v_version_attributes" USING btree ("_parent_id");
  CREATE INDEX "_product_variants_v_version_sites_order_idx" ON "_product_variants_v_version_sites" USING btree ("order");
  CREATE INDEX "_product_variants_v_version_sites_parent_idx" ON "_product_variants_v_version_sites" USING btree ("parent_id");
  CREATE INDEX "_product_variants_v_parent_idx" ON "_product_variants_v" USING btree ("parent_id");
  CREATE INDEX "_product_variants_v_version_version_slug_idx" ON "_product_variants_v" USING btree ("version_slug");
  CREATE INDEX "_product_variants_v_version_version_image_idx" ON "_product_variants_v" USING btree ("version_image_id");
  CREATE INDEX "_product_variants_v_version_version_updated_at_idx" ON "_product_variants_v" USING btree ("version_updated_at");
  CREATE INDEX "_product_variants_v_version_version_created_at_idx" ON "_product_variants_v" USING btree ("version_created_at");
  CREATE INDEX "_product_variants_v_version_version__status_idx" ON "_product_variants_v" USING btree ("version__status");
  CREATE INDEX "_product_variants_v_created_at_idx" ON "_product_variants_v" USING btree ("created_at");
  CREATE INDEX "_product_variants_v_updated_at_idx" ON "_product_variants_v" USING btree ("updated_at");
  CREATE INDEX "_product_variants_v_latest_idx" ON "_product_variants_v" USING btree ("latest");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_solutions_fk" FOREIGN KEY ("solutions_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_technologies_fk" FOREIGN KEY ("product_technologies_id") REFERENCES "public"."product_technologies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_carriers_fk" FOREIGN KEY ("product_carriers_id") REFERENCES "public"."product_carriers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_variants_fk" FOREIGN KEY ("product_variants_id") REFERENCES "public"."product_variants"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_solutions_id_idx" ON "payload_locked_documents_rels" USING btree ("solutions_id");
  CREATE INDEX "payload_locked_documents_rels_product_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("product_categories_id");
  CREATE INDEX "payload_locked_documents_rels_product_technologies_id_idx" ON "payload_locked_documents_rels" USING btree ("product_technologies_id");
  CREATE INDEX "payload_locked_documents_rels_product_carriers_id_idx" ON "payload_locked_documents_rels" USING btree ("product_carriers_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_product_variants_id_idx" ON "payload_locked_documents_rels" USING btree ("product_variants_id");
  DROP TYPE "public"."enum__roadmap_items_v_version_roadmap_status";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum__roadmap_items_v_version_roadmap_status" AS ENUM('planned', 'in-progress', 'beta', 'done');
  ALTER TABLE "solutions_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "solutions_content_blocks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "solutions_sites" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "solutions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_solutions_v_version_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_solutions_v_version_content_blocks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_solutions_v_version_sites" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_solutions_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_categories_sites" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_categories_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_product_categories_v_version_sites" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_product_categories_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_product_categories_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_technologies_sites" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_technologies" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_product_technologies_v_version_sites" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_product_technologies_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_carriers_sites" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_carriers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_product_carriers_v_version_sites" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_product_carriers_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_feature_groups_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_feature_groups" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_spec_groups_specs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_spec_groups" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_sites" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_feature_groups_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_feature_groups" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_spec_groups_specs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_spec_groups" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_sites" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_variants_attributes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_variants_sites" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_variants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_product_variants_v_version_attributes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_product_variants_v_version_sites" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_product_variants_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "solutions_features" CASCADE;
  DROP TABLE "solutions_content_blocks" CASCADE;
  DROP TABLE "solutions_sites" CASCADE;
  DROP TABLE "solutions" CASCADE;
  DROP TABLE "_solutions_v_version_features" CASCADE;
  DROP TABLE "_solutions_v_version_content_blocks" CASCADE;
  DROP TABLE "_solutions_v_version_sites" CASCADE;
  DROP TABLE "_solutions_v" CASCADE;
  DROP TABLE "product_categories_sites" CASCADE;
  DROP TABLE "product_categories" CASCADE;
  DROP TABLE "product_categories_rels" CASCADE;
  DROP TABLE "_product_categories_v_version_sites" CASCADE;
  DROP TABLE "_product_categories_v" CASCADE;
  DROP TABLE "_product_categories_v_rels" CASCADE;
  DROP TABLE "product_technologies_sites" CASCADE;
  DROP TABLE "product_technologies" CASCADE;
  DROP TABLE "_product_technologies_v_version_sites" CASCADE;
  DROP TABLE "_product_technologies_v" CASCADE;
  DROP TABLE "product_carriers_sites" CASCADE;
  DROP TABLE "product_carriers" CASCADE;
  DROP TABLE "_product_carriers_v_version_sites" CASCADE;
  DROP TABLE "_product_carriers_v" CASCADE;
  DROP TABLE "products_feature_groups_items" CASCADE;
  DROP TABLE "products_feature_groups" CASCADE;
  DROP TABLE "products_spec_groups_specs" CASCADE;
  DROP TABLE "products_spec_groups" CASCADE;
  DROP TABLE "products_sites" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "products_rels" CASCADE;
  DROP TABLE "_products_v_version_feature_groups_items" CASCADE;
  DROP TABLE "_products_v_version_feature_groups" CASCADE;
  DROP TABLE "_products_v_version_spec_groups_specs" CASCADE;
  DROP TABLE "_products_v_version_spec_groups" CASCADE;
  DROP TABLE "_products_v_version_sites" CASCADE;
  DROP TABLE "_products_v" CASCADE;
  DROP TABLE "_products_v_rels" CASCADE;
  DROP TABLE "product_variants_attributes" CASCADE;
  DROP TABLE "product_variants_sites" CASCADE;
  DROP TABLE "product_variants" CASCADE;
  DROP TABLE "_product_variants_v_version_attributes" CASCADE;
  DROP TABLE "_product_variants_v_version_sites" CASCADE;
  DROP TABLE "_product_variants_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_solutions_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_product_categories_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_product_technologies_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_product_carriers_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_products_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_product_variants_fk";
  
  DROP INDEX "payload_locked_documents_rels_solutions_id_idx";
  DROP INDEX "payload_locked_documents_rels_product_categories_id_idx";
  DROP INDEX "payload_locked_documents_rels_product_technologies_id_idx";
  DROP INDEX "payload_locked_documents_rels_product_carriers_id_idx";
  DROP INDEX "payload_locked_documents_rels_products_id_idx";
  DROP INDEX "payload_locked_documents_rels_product_variants_id_idx";
  ALTER TABLE "_roadmap_items_v" ALTER COLUMN "version_status" DROP DEFAULT;
  ALTER TABLE "_roadmap_items_v" ALTER COLUMN "version_status" SET DATA TYPE "public"."enum__roadmap_items_v_version_roadmap_status" USING "version_status"::text::"public"."enum__roadmap_items_v_version_roadmap_status";
  ALTER TABLE "_roadmap_items_v" ALTER COLUMN "version_status" SET DEFAULT 'planned';
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "solutions_find";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "solutions_create";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "solutions_update";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "solutions_delete";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "product_categories_find";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "product_categories_create";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "product_categories_update";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "product_categories_delete";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "product_technologies_find";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "product_technologies_create";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "product_technologies_update";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "product_technologies_delete";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "product_carriers_find";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "product_carriers_create";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "product_carriers_update";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "product_carriers_delete";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "products_find";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "products_create";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "products_update";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "products_delete";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "product_variants_find";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "product_variants_create";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "product_variants_update";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "product_variants_delete";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "solutions_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "product_categories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "product_technologies_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "product_carriers_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "products_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "product_variants_id";
  DROP TYPE "public"."enum_solutions_content_blocks_image_side";
  DROP TYPE "public"."enum_solutions_sites";
  DROP TYPE "public"."enum_solutions_theme_tone";
  DROP TYPE "public"."enum_solutions_status";
  DROP TYPE "public"."enum__solutions_v_version_content_blocks_image_side";
  DROP TYPE "public"."enum__solutions_v_version_sites";
  DROP TYPE "public"."enum__solutions_v_version_theme_tone";
  DROP TYPE "public"."enum__solutions_v_version_status";
  DROP TYPE "public"."enum_product_categories_sites";
  DROP TYPE "public"."enum_product_categories_status";
  DROP TYPE "public"."enum__product_categories_v_version_sites";
  DROP TYPE "public"."enum__product_categories_v_version_status";
  DROP TYPE "public"."enum_product_technologies_sites";
  DROP TYPE "public"."enum_product_technologies_status";
  DROP TYPE "public"."enum__product_technologies_v_version_sites";
  DROP TYPE "public"."enum__product_technologies_v_version_status";
  DROP TYPE "public"."enum_product_carriers_sites";
  DROP TYPE "public"."enum_product_carriers_status";
  DROP TYPE "public"."enum__product_carriers_v_version_sites";
  DROP TYPE "public"."enum__product_carriers_v_version_status";
  DROP TYPE "public"."enum_products_sites";
  DROP TYPE "public"."enum_products_availability";
  DROP TYPE "public"."enum_products_status";
  DROP TYPE "public"."enum__products_v_version_sites";
  DROP TYPE "public"."enum__products_v_version_availability";
  DROP TYPE "public"."enum__products_v_version_status";
  DROP TYPE "public"."enum_product_variants_sites";
  DROP TYPE "public"."enum_product_variants_status";
  DROP TYPE "public"."enum__product_variants_v_version_sites";
  DROP TYPE "public"."enum__product_variants_v_version_status";`)
}
