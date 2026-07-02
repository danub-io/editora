import { sqliteTable, text, integer, index, AnySQLiteColumn } from 'drizzle-orm/sqlite-core';

export const projects = sqliteTable('projects', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  coverImage: text('cover_image'),
});

export const chapters = sqliteTable('chapters', {
  id: text('id').primaryKey(),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  parentId: text('parent_id').references((): AnySQLiteColumn => chapters.id, { onDelete: 'cascade' }), // For nested folders/documents
  title: text('title').notNull(),
  content: text('content'),
  synopsis: text('synopsis'), // Corkboard / Inspector synopsis
  notes: text('notes'), // Document notes
  status: text('status'), // e.g., 'To Do', 'First Draft', 'Revised'
  label: text('label'), // e.g., 'Concept', 'Chapter', color codes
  isFolder: integer('is_folder', { mode: 'boolean' }).default(false), // Scrivener allows anything to be a folder, but we track intent
  order: integer('order').notNull(),
  tags: text('tags'), // We can map this to keywords
  type: text('type'), // Keep for backward compatibility or special types like 'front_matter', 'trash', 'research'
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
}, (table) => {
  return {
    projectIdx: index('chapter_project_idx').on(table.projectId),
    parentIdx: index('chapter_parent_idx').on(table.parentId),
  }
});

export const characters = sqliteTable('characters', {
  id: text('id').primaryKey(),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  role: text('role'),
  relationships: text('relationships'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
}, (table) => {
  return {
    projectIdx: index('character_project_idx').on(table.projectId),
  }
});

export const locations = sqliteTable('locations', {
  id: text('id').primaryKey(),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
}, (table) => {
  return {
    projectIdx: index('location_project_idx').on(table.projectId),
  }
});

export const timelineEvents = sqliteTable('timeline_events', {
  id: text('id').primaryKey(),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  date: text('date'),
  order: integer('order').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
}, (table) => {
  return {
    projectIdx: index('timeline_event_project_idx').on(table.projectId),
  }
});
