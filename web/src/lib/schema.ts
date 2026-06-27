import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const projects = sqliteTable('projects', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  description: text('description'),
  language: text('language'),
  isbn: text('isbn'),
  categories: text('categories'), // JSON array
  keywords: text('keywords'), // JSON array
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
  coverImage: text('cover_image'),
  settings: text('settings'), // JSON string
  settingsTheme: text('settings_theme'),
  settingsPageFormat: text('settings_page_format'),
  settingsFontFamily: text('settings_font_family'),
  settingsFontSize: integer('settings_font_size'),
  settingsLineHeight: text('settings_line_height'),
  settingsMarginTop: text('settings_margin_top'),
  settingsMarginBottom: text('settings_margin_bottom'),
  settingsMarginInner: text('settings_margin_inner'),
  settingsMarginOuter: text('settings_margin_outer'),
});

export const chapters = sqliteTable('chapters', {
  id: text('id').primaryKey(),
  projectId: text('project_id').notNull().references(() => projects.id),
  type: text('type').notNull(),
  subType: text('sub_type'),
  partId: text('part_id'),
  number: integer('number').notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  wordCount: integer('word_count').notNull(),
  tags: text('tags'), // JSON array
  status: text('status'),
  notes: text('notes'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const characters = sqliteTable('characters', {
  id: text('id').primaryKey(),
  projectId: text('project_id').notNull().references(() => projects.id),
  name: text('name').notNull(),
  description: text('description'),
  physicalTraits: text('physical_traits'),
  personality: text('personality'),
  motivations: text('motivations'),
  relationships: text('relationships'), // JSON array
  imageUrl: text('image_url'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const locations = sqliteTable('locations', {
  id: text('id').primaryKey(),
  projectId: text('project_id').notNull().references(() => projects.id),
  name: text('name').notNull(),
  description: text('description'),
  type: text('type').notNull(),
  imageUrl: text('image_url'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const timelineEvents = sqliteTable('timeline_events', {
  id: text('id').primaryKey(),
  projectId: text('project_id').notNull().references(() => projects.id),
  title: text('title').notNull(),
  description: text('description'),
  date: text('date'),
  chapterId: text('chapter_id'),
  characterIds: text('character_ids'), // JSON array
  locationId: text('location_id'),
  order: integer('order').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});
