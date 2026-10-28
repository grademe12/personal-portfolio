import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.enum(['net', 'cloud', 'auto', 'obs', 'dev']),
    // 예: '개인 프로젝트', '팀 프로젝트 5인'
    team: z.string(),
    period: z.string(),
    tools: z.array(z.string()).default([]),
    repo: z.string().optional(),
    // 홈 화면 타일 크기: lead는 왼쪽 큰 칸, wide는 한 줄 전체
    size: z.enum(['lead', 'wide', 'normal']).default('normal'),
    // 상세 페이지 위쪽에 넣을 구성도 (src/components의 *Diagram.astro)
    diagram: z.enum(['homelab', 'pearl']).optional(),
    // 팀 프로젝트에서 본인이 한 일. 타일과 상세 페이지에 표시됩니다.
    roles: z.array(z.object({ title: z.string(), items: z.array(z.string()) })).default([]),
    // 숫자가 작을수록 앞에 표시됩니다.
    order: z.number().default(100),
    draft: z.boolean().default(false),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, posts };
