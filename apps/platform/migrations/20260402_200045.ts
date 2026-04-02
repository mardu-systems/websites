import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_blog_posts_sites" AS ENUM('mardu-de', 'mardu-space', 'platform');
  CREATE TYPE "public"."enum_blog_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__blog_posts_v_version_sites" AS ENUM('mardu-de', 'mardu-space', 'platform');
  CREATE TYPE "public"."enum__blog_posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_legal_pages_sites" AS ENUM('mardu-de', 'mardu-space', 'platform');
  CREATE TYPE "public"."enum_legal_pages_slug" AS ENUM('privacy', 'publisher');
  CREATE TYPE "public"."enum_legal_pages_page_kind" AS ENUM('privacy', 'publisher');
  CREATE TYPE "public"."enum_legal_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__legal_pages_v_version_sites" AS ENUM('mardu-de', 'mardu-space', 'platform');
  CREATE TYPE "public"."enum__legal_pages_v_version_slug" AS ENUM('privacy', 'publisher');
  CREATE TYPE "public"."enum__legal_pages_v_version_page_kind" AS ENUM('privacy', 'publisher');
  CREATE TYPE "public"."enum__legal_pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_integration_protocols_badge_style" AS ENUM('neutral', 'success', 'warn', 'info');
  CREATE TYPE "public"."enum_integrations_sites" AS ENUM('mardu-de', 'mardu-space', 'platform');
  CREATE TYPE "public"."enum_integrations_availability_status" AS ENUM('available', 'beta', 'planned');
  CREATE TYPE "public"."enum_integrations_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__integrations_v_version_sites" AS ENUM('mardu-de', 'mardu-space', 'platform');
  CREATE TYPE "public"."enum__integrations_v_version_availability_status" AS ENUM('available', 'beta', 'planned');
  CREATE TYPE "public"."enum__integrations_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_newsletter_subscribers_site" AS ENUM('mardu-de', 'mardu-space');
  CREATE TYPE "public"."enum_newsletter_subscribers_role" AS ENUM('newsletter', 'whitepaper');
  CREATE TYPE "public"."enum_newsletter_subscribers_status" AS ENUM('pending', 'confirmed', 'unsubscribed');
  CREATE TYPE "public"."enum_newsletter_subscribers_consent_model" AS ENUM('double-opt-in');
  CREATE TYPE "public"."enum_newsletter_subscribers_twenty_sync_status" AS ENUM('pending', 'synced', 'failed', 'skipped');
  CREATE TYPE "public"."enum_contact_leads_site" AS ENUM('mardu-de', 'mardu-space');
  CREATE TYPE "public"."enum_contact_leads_source" AS ENUM('contact-form', 'configurator', 'admin-software');
  CREATE TYPE "public"."enum_contact_leads_email_delivery_status" AS ENUM('pending', 'sent', 'failed');
  CREATE TYPE "public"."enum_contact_leads_twenty_sync_status" AS ENUM('pending', 'synced', 'failed', 'skipped');
  CREATE TYPE "public"."enum_preorder_requests_site" AS ENUM('mardu-de', 'mardu-space');
  CREATE TYPE "public"."enum_preorder_requests_status" AS ENUM('received');
  CREATE TYPE "public"."enum_preorder_requests_email_delivery_status" AS ENUM('pending', 'sent', 'failed');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "blog_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "blog_authors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"avatar_id" integer,
  	"role" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "blog_posts_sites" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_blog_posts_sites",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "blog_posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"excerpt" varchar,
  	"cover_image_id" integer,
  	"content" jsonb,
  	"published_at" timestamp(3) with time zone,
  	"featured" boolean DEFAULT false,
  	"author_id" integer,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_blog_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "blog_posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"blog_categories_id" integer
  );
  
  CREATE TABLE "_blog_posts_v_version_sites" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__blog_posts_v_version_sites",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_blog_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_excerpt" varchar,
  	"version_cover_image_id" integer,
  	"version_content" jsonb,
  	"version_published_at" timestamp(3) with time zone,
  	"version_featured" boolean DEFAULT false,
  	"version_author_id" integer,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__blog_posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_blog_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"blog_categories_id" integer
  );
  
  CREATE TABLE "legal_pages_sites" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_legal_pages_sites",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "legal_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" "enum_legal_pages_slug",
  	"page_kind" "enum_legal_pages_page_kind" DEFAULT 'privacy',
  	"summary" varchar,
  	"updated_label" varchar,
  	"content_markdown" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"canonical_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_legal_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_legal_pages_v_version_sites" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__legal_pages_v_version_sites",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_legal_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" "enum__legal_pages_v_version_slug",
  	"version_page_kind" "enum__legal_pages_v_version_page_kind" DEFAULT 'privacy',
  	"version_summary" varchar,
  	"version_updated_label" varchar,
  	"version_content_markdown" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_canonical_url" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__legal_pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "integration_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "integration_protocols" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"badge_style" "enum_integration_protocols_badge_style" DEFAULT 'neutral' NOT NULL,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "integrations_use_cases" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "integrations_supported_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "integrations_sites" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_integrations_sites",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "integrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"short_description" varchar,
  	"description" jsonb,
  	"availability_status" "enum_integrations_availability_status" DEFAULT 'planned',
  	"vendor" varchar,
  	"logo_id" integer,
  	"hero_image_id" integer,
  	"featured" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"coming_at" timestamp(3) with time zone,
  	"docs_url" varchar,
  	"request_url" varchar,
  	"compatibility_notes" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_integrations_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "integrations_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"integration_categories_id" integer,
  	"integration_protocols_id" integer
  );
  
  CREATE TABLE "_integrations_v_version_use_cases" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_integrations_v_version_supported_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_integrations_v_version_sites" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__integrations_v_version_sites",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_integrations_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_short_description" varchar,
  	"version_description" jsonb,
  	"version_availability_status" "enum__integrations_v_version_availability_status" DEFAULT 'planned',
  	"version_vendor" varchar,
  	"version_logo_id" integer,
  	"version_hero_image_id" integer,
  	"version_featured" boolean DEFAULT false,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_coming_at" timestamp(3) with time zone,
  	"version_docs_url" varchar,
  	"version_request_url" varchar,
  	"version_compatibility_notes" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__integrations_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_integrations_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"integration_categories_id" integer,
  	"integration_protocols_id" integer
  );
  
  CREATE TABLE "newsletter_subscribers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"subscription_key" varchar NOT NULL,
  	"site" "enum_newsletter_subscribers_site" DEFAULT 'mardu-de' NOT NULL,
  	"email" varchar NOT NULL,
  	"role" "enum_newsletter_subscribers_role" DEFAULT 'newsletter' NOT NULL,
  	"status" "enum_newsletter_subscribers_status" DEFAULT 'pending' NOT NULL,
  	"first_name" varchar,
  	"last_name" varchar,
  	"company" varchar,
  	"consent_model" "enum_newsletter_subscribers_consent_model" DEFAULT 'double-opt-in',
  	"confirmed_at" timestamp(3) with time zone,
  	"unsubscribed_at" timestamp(3) with time zone,
  	"last_confirmation_sent_at" timestamp(3) with time zone,
  	"twenty_sync_status" "enum_newsletter_subscribers_twenty_sync_status" DEFAULT 'pending' NOT NULL,
  	"twenty_last_synced_at" timestamp(3) with time zone,
  	"twenty_last_error" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contact_leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site" "enum_contact_leads_site" DEFAULT 'mardu-de' NOT NULL,
  	"source" "enum_contact_leads_source" DEFAULT 'contact-form' NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"company" varchar,
  	"phone" varchar,
  	"message" varchar,
  	"consent" boolean DEFAULT false,
  	"newsletter_opt_in" boolean DEFAULT false,
  	"config" jsonb,
  	"newsletter_subscriber_id" integer,
  	"email_delivery_status" "enum_contact_leads_email_delivery_status" DEFAULT 'pending' NOT NULL,
  	"twenty_sync_status" "enum_contact_leads_twenty_sync_status" DEFAULT 'pending' NOT NULL,
  	"twenty_last_synced_at" timestamp(3) with time zone,
  	"twenty_last_error" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "preorder_requests" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site" "enum_preorder_requests_site" DEFAULT 'mardu-de' NOT NULL,
  	"email" varchar NOT NULL,
  	"status" "enum_preorder_requests_status" DEFAULT 'received' NOT NULL,
  	"email_delivery_status" "enum_preorder_requests_email_delivery_status" DEFAULT 'pending' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_mcp_api_keys" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"label" varchar,
  	"description" varchar,
  	"blog_posts_find" boolean DEFAULT false,
  	"blog_posts_create" boolean DEFAULT false,
  	"blog_posts_update" boolean DEFAULT false,
  	"blog_posts_delete" boolean DEFAULT false,
  	"integrations_find" boolean DEFAULT false,
  	"integrations_create" boolean DEFAULT false,
  	"integrations_update" boolean DEFAULT false,
  	"integrations_delete" boolean DEFAULT false,
  	"legal_pages_find" boolean DEFAULT false,
  	"legal_pages_create" boolean DEFAULT false,
  	"legal_pages_update" boolean DEFAULT false,
  	"legal_pages_delete" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"enable_a_p_i_key" boolean,
  	"api_key" varchar,
  	"api_key_index" varchar
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"blog_categories_id" integer,
  	"blog_authors_id" integer,
  	"blog_posts_id" integer,
  	"legal_pages_id" integer,
  	"integration_categories_id" integer,
  	"integration_protocols_id" integer,
  	"integrations_id" integer,
  	"newsletter_subscribers_id" integer,
  	"contact_leads_id" integer,
  	"preorder_requests_id" integer,
  	"payload_mcp_api_keys_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"payload_mcp_api_keys_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_authors" ADD CONSTRAINT "blog_authors_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts_sites" ADD CONSTRAINT "blog_posts_sites_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_author_id_blog_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."blog_authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_blog_categories_fk" FOREIGN KEY ("blog_categories_id") REFERENCES "public"."blog_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_version_sites" ADD CONSTRAINT "_blog_posts_v_version_sites_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_parent_id_blog_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_version_author_id_blog_authors_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."blog_authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_rels" ADD CONSTRAINT "_blog_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_rels" ADD CONSTRAINT "_blog_posts_v_rels_blog_categories_fk" FOREIGN KEY ("blog_categories_id") REFERENCES "public"."blog_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "legal_pages_sites" ADD CONSTRAINT "legal_pages_sites_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_legal_pages_v_version_sites" ADD CONSTRAINT "_legal_pages_v_version_sites_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_legal_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_legal_pages_v" ADD CONSTRAINT "_legal_pages_v_parent_id_legal_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."legal_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "integrations_use_cases" ADD CONSTRAINT "integrations_use_cases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."integrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "integrations_supported_actions" ADD CONSTRAINT "integrations_supported_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."integrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "integrations_sites" ADD CONSTRAINT "integrations_sites_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."integrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "integrations" ADD CONSTRAINT "integrations_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "integrations" ADD CONSTRAINT "integrations_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "integrations" ADD CONSTRAINT "integrations_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "integrations_rels" ADD CONSTRAINT "integrations_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."integrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "integrations_rels" ADD CONSTRAINT "integrations_rels_integration_categories_fk" FOREIGN KEY ("integration_categories_id") REFERENCES "public"."integration_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "integrations_rels" ADD CONSTRAINT "integrations_rels_integration_protocols_fk" FOREIGN KEY ("integration_protocols_id") REFERENCES "public"."integration_protocols"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_integrations_v_version_use_cases" ADD CONSTRAINT "_integrations_v_version_use_cases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_integrations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_integrations_v_version_supported_actions" ADD CONSTRAINT "_integrations_v_version_supported_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_integrations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_integrations_v_version_sites" ADD CONSTRAINT "_integrations_v_version_sites_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_integrations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_integrations_v" ADD CONSTRAINT "_integrations_v_parent_id_integrations_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."integrations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_integrations_v" ADD CONSTRAINT "_integrations_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_integrations_v" ADD CONSTRAINT "_integrations_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_integrations_v" ADD CONSTRAINT "_integrations_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_integrations_v_rels" ADD CONSTRAINT "_integrations_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_integrations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_integrations_v_rels" ADD CONSTRAINT "_integrations_v_rels_integration_categories_fk" FOREIGN KEY ("integration_categories_id") REFERENCES "public"."integration_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_integrations_v_rels" ADD CONSTRAINT "_integrations_v_rels_integration_protocols_fk" FOREIGN KEY ("integration_protocols_id") REFERENCES "public"."integration_protocols"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_leads" ADD CONSTRAINT "contact_leads_newsletter_subscriber_id_newsletter_subscribers_id_fk" FOREIGN KEY ("newsletter_subscriber_id") REFERENCES "public"."newsletter_subscribers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_mcp_api_keys" ADD CONSTRAINT "payload_mcp_api_keys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_categories_fk" FOREIGN KEY ("blog_categories_id") REFERENCES "public"."blog_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_authors_fk" FOREIGN KEY ("blog_authors_id") REFERENCES "public"."blog_authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_legal_pages_fk" FOREIGN KEY ("legal_pages_id") REFERENCES "public"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_integration_categories_fk" FOREIGN KEY ("integration_categories_id") REFERENCES "public"."integration_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_integration_protocols_fk" FOREIGN KEY ("integration_protocols_id") REFERENCES "public"."integration_protocols"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_integrations_fk" FOREIGN KEY ("integrations_id") REFERENCES "public"."integrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_newsletter_subscribers_fk" FOREIGN KEY ("newsletter_subscribers_id") REFERENCES "public"."newsletter_subscribers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_leads_fk" FOREIGN KEY ("contact_leads_id") REFERENCES "public"."contact_leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_preorder_requests_fk" FOREIGN KEY ("preorder_requests_id") REFERENCES "public"."preorder_requests"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_mcp_api_keys_fk" FOREIGN KEY ("payload_mcp_api_keys_id") REFERENCES "public"."payload_mcp_api_keys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_payload_mcp_api_keys_fk" FOREIGN KEY ("payload_mcp_api_keys_id") REFERENCES "public"."payload_mcp_api_keys"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "blog_categories_slug_idx" ON "blog_categories" USING btree ("slug");
  CREATE INDEX "blog_categories_updated_at_idx" ON "blog_categories" USING btree ("updated_at");
  CREATE INDEX "blog_categories_created_at_idx" ON "blog_categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "blog_authors_slug_idx" ON "blog_authors" USING btree ("slug");
  CREATE INDEX "blog_authors_avatar_idx" ON "blog_authors" USING btree ("avatar_id");
  CREATE INDEX "blog_authors_updated_at_idx" ON "blog_authors" USING btree ("updated_at");
  CREATE INDEX "blog_authors_created_at_idx" ON "blog_authors" USING btree ("created_at");
  CREATE INDEX "blog_posts_sites_order_idx" ON "blog_posts_sites" USING btree ("order");
  CREATE INDEX "blog_posts_sites_parent_idx" ON "blog_posts_sites" USING btree ("parent_id");
  CREATE UNIQUE INDEX "blog_posts_slug_idx" ON "blog_posts" USING btree ("slug");
  CREATE INDEX "blog_posts_cover_image_idx" ON "blog_posts" USING btree ("cover_image_id");
  CREATE INDEX "blog_posts_featured_idx" ON "blog_posts" USING btree ("featured");
  CREATE INDEX "blog_posts_author_idx" ON "blog_posts" USING btree ("author_id");
  CREATE INDEX "blog_posts_meta_meta_image_idx" ON "blog_posts" USING btree ("meta_image_id");
  CREATE INDEX "blog_posts_updated_at_idx" ON "blog_posts" USING btree ("updated_at");
  CREATE INDEX "blog_posts_created_at_idx" ON "blog_posts" USING btree ("created_at");
  CREATE INDEX "blog_posts__status_idx" ON "blog_posts" USING btree ("_status");
  CREATE INDEX "blog_posts_rels_order_idx" ON "blog_posts_rels" USING btree ("order");
  CREATE INDEX "blog_posts_rels_parent_idx" ON "blog_posts_rels" USING btree ("parent_id");
  CREATE INDEX "blog_posts_rels_path_idx" ON "blog_posts_rels" USING btree ("path");
  CREATE INDEX "blog_posts_rels_blog_categories_id_idx" ON "blog_posts_rels" USING btree ("blog_categories_id");
  CREATE INDEX "_blog_posts_v_version_sites_order_idx" ON "_blog_posts_v_version_sites" USING btree ("order");
  CREATE INDEX "_blog_posts_v_version_sites_parent_idx" ON "_blog_posts_v_version_sites" USING btree ("parent_id");
  CREATE INDEX "_blog_posts_v_parent_idx" ON "_blog_posts_v" USING btree ("parent_id");
  CREATE INDEX "_blog_posts_v_version_version_slug_idx" ON "_blog_posts_v" USING btree ("version_slug");
  CREATE INDEX "_blog_posts_v_version_version_cover_image_idx" ON "_blog_posts_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_blog_posts_v_version_version_featured_idx" ON "_blog_posts_v" USING btree ("version_featured");
  CREATE INDEX "_blog_posts_v_version_version_author_idx" ON "_blog_posts_v" USING btree ("version_author_id");
  CREATE INDEX "_blog_posts_v_version_meta_version_meta_image_idx" ON "_blog_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_blog_posts_v_version_version_updated_at_idx" ON "_blog_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_blog_posts_v_version_version_created_at_idx" ON "_blog_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_blog_posts_v_version_version__status_idx" ON "_blog_posts_v" USING btree ("version__status");
  CREATE INDEX "_blog_posts_v_created_at_idx" ON "_blog_posts_v" USING btree ("created_at");
  CREATE INDEX "_blog_posts_v_updated_at_idx" ON "_blog_posts_v" USING btree ("updated_at");
  CREATE INDEX "_blog_posts_v_latest_idx" ON "_blog_posts_v" USING btree ("latest");
  CREATE INDEX "_blog_posts_v_rels_order_idx" ON "_blog_posts_v_rels" USING btree ("order");
  CREATE INDEX "_blog_posts_v_rels_parent_idx" ON "_blog_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_blog_posts_v_rels_path_idx" ON "_blog_posts_v_rels" USING btree ("path");
  CREATE INDEX "_blog_posts_v_rels_blog_categories_id_idx" ON "_blog_posts_v_rels" USING btree ("blog_categories_id");
  CREATE INDEX "legal_pages_sites_order_idx" ON "legal_pages_sites" USING btree ("order");
  CREATE INDEX "legal_pages_sites_parent_idx" ON "legal_pages_sites" USING btree ("parent_id");
  CREATE UNIQUE INDEX "legal_pages_slug_idx" ON "legal_pages" USING btree ("slug");
  CREATE INDEX "legal_pages_updated_at_idx" ON "legal_pages" USING btree ("updated_at");
  CREATE INDEX "legal_pages_created_at_idx" ON "legal_pages" USING btree ("created_at");
  CREATE INDEX "legal_pages__status_idx" ON "legal_pages" USING btree ("_status");
  CREATE INDEX "_legal_pages_v_version_sites_order_idx" ON "_legal_pages_v_version_sites" USING btree ("order");
  CREATE INDEX "_legal_pages_v_version_sites_parent_idx" ON "_legal_pages_v_version_sites" USING btree ("parent_id");
  CREATE INDEX "_legal_pages_v_parent_idx" ON "_legal_pages_v" USING btree ("parent_id");
  CREATE INDEX "_legal_pages_v_version_version_slug_idx" ON "_legal_pages_v" USING btree ("version_slug");
  CREATE INDEX "_legal_pages_v_version_version_updated_at_idx" ON "_legal_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_legal_pages_v_version_version_created_at_idx" ON "_legal_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_legal_pages_v_version_version__status_idx" ON "_legal_pages_v" USING btree ("version__status");
  CREATE INDEX "_legal_pages_v_created_at_idx" ON "_legal_pages_v" USING btree ("created_at");
  CREATE INDEX "_legal_pages_v_updated_at_idx" ON "_legal_pages_v" USING btree ("updated_at");
  CREATE INDEX "_legal_pages_v_latest_idx" ON "_legal_pages_v" USING btree ("latest");
  CREATE UNIQUE INDEX "integration_categories_slug_idx" ON "integration_categories" USING btree ("slug");
  CREATE INDEX "integration_categories_updated_at_idx" ON "integration_categories" USING btree ("updated_at");
  CREATE INDEX "integration_categories_created_at_idx" ON "integration_categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "integration_protocols_slug_idx" ON "integration_protocols" USING btree ("slug");
  CREATE INDEX "integration_protocols_updated_at_idx" ON "integration_protocols" USING btree ("updated_at");
  CREATE INDEX "integration_protocols_created_at_idx" ON "integration_protocols" USING btree ("created_at");
  CREATE INDEX "integrations_use_cases_order_idx" ON "integrations_use_cases" USING btree ("_order");
  CREATE INDEX "integrations_use_cases_parent_id_idx" ON "integrations_use_cases" USING btree ("_parent_id");
  CREATE INDEX "integrations_supported_actions_order_idx" ON "integrations_supported_actions" USING btree ("_order");
  CREATE INDEX "integrations_supported_actions_parent_id_idx" ON "integrations_supported_actions" USING btree ("_parent_id");
  CREATE INDEX "integrations_sites_order_idx" ON "integrations_sites" USING btree ("order");
  CREATE INDEX "integrations_sites_parent_idx" ON "integrations_sites" USING btree ("parent_id");
  CREATE UNIQUE INDEX "integrations_slug_idx" ON "integrations" USING btree ("slug");
  CREATE INDEX "integrations_logo_idx" ON "integrations" USING btree ("logo_id");
  CREATE INDEX "integrations_hero_image_idx" ON "integrations" USING btree ("hero_image_id");
  CREATE INDEX "integrations_featured_idx" ON "integrations" USING btree ("featured");
  CREATE INDEX "integrations_meta_meta_image_idx" ON "integrations" USING btree ("meta_image_id");
  CREATE INDEX "integrations_updated_at_idx" ON "integrations" USING btree ("updated_at");
  CREATE INDEX "integrations_created_at_idx" ON "integrations" USING btree ("created_at");
  CREATE INDEX "integrations__status_idx" ON "integrations" USING btree ("_status");
  CREATE INDEX "integrations_rels_order_idx" ON "integrations_rels" USING btree ("order");
  CREATE INDEX "integrations_rels_parent_idx" ON "integrations_rels" USING btree ("parent_id");
  CREATE INDEX "integrations_rels_path_idx" ON "integrations_rels" USING btree ("path");
  CREATE INDEX "integrations_rels_integration_categories_id_idx" ON "integrations_rels" USING btree ("integration_categories_id");
  CREATE INDEX "integrations_rels_integration_protocols_id_idx" ON "integrations_rels" USING btree ("integration_protocols_id");
  CREATE INDEX "_integrations_v_version_use_cases_order_idx" ON "_integrations_v_version_use_cases" USING btree ("_order");
  CREATE INDEX "_integrations_v_version_use_cases_parent_id_idx" ON "_integrations_v_version_use_cases" USING btree ("_parent_id");
  CREATE INDEX "_integrations_v_version_supported_actions_order_idx" ON "_integrations_v_version_supported_actions" USING btree ("_order");
  CREATE INDEX "_integrations_v_version_supported_actions_parent_id_idx" ON "_integrations_v_version_supported_actions" USING btree ("_parent_id");
  CREATE INDEX "_integrations_v_version_sites_order_idx" ON "_integrations_v_version_sites" USING btree ("order");
  CREATE INDEX "_integrations_v_version_sites_parent_idx" ON "_integrations_v_version_sites" USING btree ("parent_id");
  CREATE INDEX "_integrations_v_parent_idx" ON "_integrations_v" USING btree ("parent_id");
  CREATE INDEX "_integrations_v_version_version_slug_idx" ON "_integrations_v" USING btree ("version_slug");
  CREATE INDEX "_integrations_v_version_version_logo_idx" ON "_integrations_v" USING btree ("version_logo_id");
  CREATE INDEX "_integrations_v_version_version_hero_image_idx" ON "_integrations_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_integrations_v_version_version_featured_idx" ON "_integrations_v" USING btree ("version_featured");
  CREATE INDEX "_integrations_v_version_meta_version_meta_image_idx" ON "_integrations_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_integrations_v_version_version_updated_at_idx" ON "_integrations_v" USING btree ("version_updated_at");
  CREATE INDEX "_integrations_v_version_version_created_at_idx" ON "_integrations_v" USING btree ("version_created_at");
  CREATE INDEX "_integrations_v_version_version__status_idx" ON "_integrations_v" USING btree ("version__status");
  CREATE INDEX "_integrations_v_created_at_idx" ON "_integrations_v" USING btree ("created_at");
  CREATE INDEX "_integrations_v_updated_at_idx" ON "_integrations_v" USING btree ("updated_at");
  CREATE INDEX "_integrations_v_latest_idx" ON "_integrations_v" USING btree ("latest");
  CREATE INDEX "_integrations_v_rels_order_idx" ON "_integrations_v_rels" USING btree ("order");
  CREATE INDEX "_integrations_v_rels_parent_idx" ON "_integrations_v_rels" USING btree ("parent_id");
  CREATE INDEX "_integrations_v_rels_path_idx" ON "_integrations_v_rels" USING btree ("path");
  CREATE INDEX "_integrations_v_rels_integration_categories_id_idx" ON "_integrations_v_rels" USING btree ("integration_categories_id");
  CREATE INDEX "_integrations_v_rels_integration_protocols_id_idx" ON "_integrations_v_rels" USING btree ("integration_protocols_id");
  CREATE UNIQUE INDEX "newsletter_subscribers_subscription_key_idx" ON "newsletter_subscribers" USING btree ("subscription_key");
  CREATE INDEX "newsletter_subscribers_email_idx" ON "newsletter_subscribers" USING btree ("email");
  CREATE INDEX "newsletter_subscribers_updated_at_idx" ON "newsletter_subscribers" USING btree ("updated_at");
  CREATE INDEX "newsletter_subscribers_created_at_idx" ON "newsletter_subscribers" USING btree ("created_at");
  CREATE INDEX "contact_leads_email_idx" ON "contact_leads" USING btree ("email");
  CREATE INDEX "contact_leads_newsletter_subscriber_idx" ON "contact_leads" USING btree ("newsletter_subscriber_id");
  CREATE INDEX "contact_leads_updated_at_idx" ON "contact_leads" USING btree ("updated_at");
  CREATE INDEX "contact_leads_created_at_idx" ON "contact_leads" USING btree ("created_at");
  CREATE INDEX "preorder_requests_email_idx" ON "preorder_requests" USING btree ("email");
  CREATE INDEX "preorder_requests_updated_at_idx" ON "preorder_requests" USING btree ("updated_at");
  CREATE INDEX "preorder_requests_created_at_idx" ON "preorder_requests" USING btree ("created_at");
  CREATE INDEX "payload_mcp_api_keys_user_idx" ON "payload_mcp_api_keys" USING btree ("user_id");
  CREATE INDEX "payload_mcp_api_keys_updated_at_idx" ON "payload_mcp_api_keys" USING btree ("updated_at");
  CREATE INDEX "payload_mcp_api_keys_created_at_idx" ON "payload_mcp_api_keys" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_blog_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_categories_id");
  CREATE INDEX "payload_locked_documents_rels_blog_authors_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_authors_id");
  CREATE INDEX "payload_locked_documents_rels_blog_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_posts_id");
  CREATE INDEX "payload_locked_documents_rels_legal_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("legal_pages_id");
  CREATE INDEX "payload_locked_documents_rels_integration_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("integration_categories_id");
  CREATE INDEX "payload_locked_documents_rels_integration_protocols_id_idx" ON "payload_locked_documents_rels" USING btree ("integration_protocols_id");
  CREATE INDEX "payload_locked_documents_rels_integrations_id_idx" ON "payload_locked_documents_rels" USING btree ("integrations_id");
  CREATE INDEX "payload_locked_documents_rels_newsletter_subscribers_id_idx" ON "payload_locked_documents_rels" USING btree ("newsletter_subscribers_id");
  CREATE INDEX "payload_locked_documents_rels_contact_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_leads_id");
  CREATE INDEX "payload_locked_documents_rels_preorder_requests_id_idx" ON "payload_locked_documents_rels" USING btree ("preorder_requests_id");
  CREATE INDEX "payload_locked_documents_rels_payload_mcp_api_keys_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_mcp_api_keys_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_rels_payload_mcp_api_keys_id_idx" ON "payload_preferences_rels" USING btree ("payload_mcp_api_keys_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "blog_categories" CASCADE;
  DROP TABLE "blog_authors" CASCADE;
  DROP TABLE "blog_posts_sites" CASCADE;
  DROP TABLE "blog_posts" CASCADE;
  DROP TABLE "blog_posts_rels" CASCADE;
  DROP TABLE "_blog_posts_v_version_sites" CASCADE;
  DROP TABLE "_blog_posts_v" CASCADE;
  DROP TABLE "_blog_posts_v_rels" CASCADE;
  DROP TABLE "legal_pages_sites" CASCADE;
  DROP TABLE "legal_pages" CASCADE;
  DROP TABLE "_legal_pages_v_version_sites" CASCADE;
  DROP TABLE "_legal_pages_v" CASCADE;
  DROP TABLE "integration_categories" CASCADE;
  DROP TABLE "integration_protocols" CASCADE;
  DROP TABLE "integrations_use_cases" CASCADE;
  DROP TABLE "integrations_supported_actions" CASCADE;
  DROP TABLE "integrations_sites" CASCADE;
  DROP TABLE "integrations" CASCADE;
  DROP TABLE "integrations_rels" CASCADE;
  DROP TABLE "_integrations_v_version_use_cases" CASCADE;
  DROP TABLE "_integrations_v_version_supported_actions" CASCADE;
  DROP TABLE "_integrations_v_version_sites" CASCADE;
  DROP TABLE "_integrations_v" CASCADE;
  DROP TABLE "_integrations_v_rels" CASCADE;
  DROP TABLE "newsletter_subscribers" CASCADE;
  DROP TABLE "contact_leads" CASCADE;
  DROP TABLE "preorder_requests" CASCADE;
  DROP TABLE "payload_mcp_api_keys" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_blog_posts_sites";
  DROP TYPE "public"."enum_blog_posts_status";
  DROP TYPE "public"."enum__blog_posts_v_version_sites";
  DROP TYPE "public"."enum__blog_posts_v_version_status";
  DROP TYPE "public"."enum_legal_pages_sites";
  DROP TYPE "public"."enum_legal_pages_slug";
  DROP TYPE "public"."enum_legal_pages_page_kind";
  DROP TYPE "public"."enum_legal_pages_status";
  DROP TYPE "public"."enum__legal_pages_v_version_sites";
  DROP TYPE "public"."enum__legal_pages_v_version_slug";
  DROP TYPE "public"."enum__legal_pages_v_version_page_kind";
  DROP TYPE "public"."enum__legal_pages_v_version_status";
  DROP TYPE "public"."enum_integration_protocols_badge_style";
  DROP TYPE "public"."enum_integrations_sites";
  DROP TYPE "public"."enum_integrations_availability_status";
  DROP TYPE "public"."enum_integrations_status";
  DROP TYPE "public"."enum__integrations_v_version_sites";
  DROP TYPE "public"."enum__integrations_v_version_availability_status";
  DROP TYPE "public"."enum__integrations_v_version_status";
  DROP TYPE "public"."enum_newsletter_subscribers_site";
  DROP TYPE "public"."enum_newsletter_subscribers_role";
  DROP TYPE "public"."enum_newsletter_subscribers_status";
  DROP TYPE "public"."enum_newsletter_subscribers_consent_model";
  DROP TYPE "public"."enum_newsletter_subscribers_twenty_sync_status";
  DROP TYPE "public"."enum_contact_leads_site";
  DROP TYPE "public"."enum_contact_leads_source";
  DROP TYPE "public"."enum_contact_leads_email_delivery_status";
  DROP TYPE "public"."enum_contact_leads_twenty_sync_status";
  DROP TYPE "public"."enum_preorder_requests_site";
  DROP TYPE "public"."enum_preorder_requests_status";
  DROP TYPE "public"."enum_preorder_requests_email_delivery_status";`)
}
