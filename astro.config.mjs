import { defineConfig } from 'astro/config';

export default defineConfig({
  // 도메인을 연결하면 실제 주소로 바꾸세요.
  site: 'https://example.com',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
