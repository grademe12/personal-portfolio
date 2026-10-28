---
title: 이 사이트
summary: 워드프레스 블로그를 설정 실수로 잃은 뒤, 글과 설정을 Git에 두는 정적 사이트로 다시 만들었습니다.
category: auto
team: 개인 프로젝트
period: '2026.10'
tools: [Astro, Cloudflare Workers, GitHub Actions]
repo: https://github.com/grademe12/personal-portfolio
size: wide
order: 8
---

## 배경

이전에는 미니 PC에 워드프레스를 직접 올려 운영했습니다. 공유기 포트를 열어 둔 탓에 봇 스캔이 끊이지 않았고, 설정 실수 한 번에 글을 모두 잃었습니다. 백업이 없었습니다.

## 바꾼 것

- 글과 설정을 DB가 아니라 Git 저장소의 마크다운 파일로 관리합니다. 변경 이력이 남고 어떤 상태로든 되돌릴 수 있습니다.
- 서버를 직접 운영하지 않습니다. push하면 Cloudflare가 빌드해서 정적 자산으로 배포하고, `woosupar.dev` 도메인으로 서비스합니다.
