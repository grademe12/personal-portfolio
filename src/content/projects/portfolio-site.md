---
title: 정적 포트폴리오 사이트 + 자동 배포
summary: Astro 정적 사이트를 Git push만으로 Cloudflare Pages에 배포. 서버·DB 없이 글과 설정을 전부 Git으로 관리합니다.
tags: [Astro, Cloudflare Pages, GitHub Actions, DNS]
repo: https://github.com/your-id/portfolio
order: 1
featured: true
---

> 지금 보고 계신 이 사이트입니다.

## 배경

이전에는 미니 PC에 워드프레스를 직접 올려 운영했지만, 두 가지 문제가 있었습니다.

- 공유기 포트를 열어둔 탓에 봇 스캔과 로그인 시도가 끊이지 않았습니다.
- 설정 실수 한 번에 DB가 망가지며 글을 모두 잃었습니다. 백업이 없었습니다.

## 설계

```
[로컬에서 마크다운 작성] --git push--> [GitHub]
                                        |
                                        v
                             [Cloudflare Pages 빌드]
                                        |
                                        v
                         [Cloudflare CDN] <-- 방문자 (HTTPS)
```

- **콘텐츠 = 마크다운 파일 = Git 저장소.** 모든 글과 설정에 변경 이력이 남고, 어떤 상태로든 되돌릴 수 있습니다.
- **서버가 없음.** 열린 포트도, 패치할 PHP나 플러그인도 없습니다.
- **PR마다 미리보기 URL**이 생겨서, 배포 전에 확인할 수 있습니다.

## 배운 점

- "백업이 있다"와 "복구해 봤다"는 다릅니다. 이번에는 저장소를 새로 클론해서 빌드하는 것으로 복구를 확인했습니다.
- 공격 표면을 줄이는 가장 쉬운 방법은 운영할 것을 줄이는 것입니다.
