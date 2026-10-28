import { getCollection } from 'astro:content';
import { SITE } from '../config';

export async function getProjects() {
  const all = await getCollection('projects', ({ data }) => !data.draft);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getPosts() {
  if (!SITE.showBlog) return [];
  const all = await getCollection('posts', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}
