# 포트폴리오 사이트

Astro로 만든 정적 포트폴리오입니다. 서버와 DB가 없고, 글과 설정은 모두 이 저장소의 파일입니다.
**Git이 곧 백업**이라 사이트를 망가뜨려도 이전 커밋으로 되돌리면 됩니다.

## 로컬에서 보기

```bash
npm install
npm run dev      # http://localhost:4321
```

## 내 정보로 바꾸기

`src/config.ts` 한 파일에 이름, 첫 화면 문구, 이메일, GitHub, 다루는 도구 표, 걸어온 길이 모여 있습니다.

## 프로젝트 추가

`src/content/projects/` 에 마크다운 파일을 하나 만듭니다. 파일 이름이 주소가 됩니다. (`my-lab.md` → `/projects/my-lab/`)

```markdown
---
title: 프로젝트 이름
summary: 두세 줄 요약 (홈 화면 타일에 표시)
category: cloud          # net, cloud, auto, obs 중 하나 (랜선 색)
team: 개인 프로젝트       # 또는 '팀 프로젝트 5인'
period: '2026.01 – 2026.03'   # 따옴표 필수 (없으면 숫자로 읽힘)
tools: [Terraform, EKS]
repo: https://github.com/...  # 선택
size: normal             # lead(왼쪽 큰 칸), wide(한 줄 전체), normal
order: 1                 # 작을수록 앞에
roles:                   # 팀 프로젝트에서 내가 한 일 (선택)
  - title: '인프라'
    items: [EKS IRSA 구성]
draft: false             # true면 숨김
---

본문은 상세 페이지의 "자세히" 영역에 들어갑니다.
```

첫 화면 구성도는 `src/components/PearlDiagram.astro` 의 SVG입니다.

## 블로그 켜기

1. `src/config.ts` 에서 `showBlog: true`
2. `src/content/posts/` 에 글을 씁니다. `draft: true` 인 글은 공개되지 않습니다.

블로그가 꺼져 있으면 메뉴에서 사라지고, `/blog/` 는 홈으로 이동합니다.

## 배포 (Cloudflare Pages)

1. 이 저장소를 GitHub에 push
2. Cloudflare 대시보드 → Workers & Pages → Create → Pages → Git 저장소 연결
3. 빌드 설정
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Output directory: `dist`
   - 환경 변수 `NODE_VERSION` = `22`
4. Custom domains에서 도메인 연결 (도메인 DNS가 Cloudflare에 있으면 자동 설정)
5. `astro.config.mjs` 의 `site` 를 실제 도메인으로 변경

이후로는 `main` 에 push할 때마다 자동 배포되고, PR마다 미리보기 URL이 생깁니다.
`.github/workflows/build.yml` 은 push/PR마다 빌드가 깨지지 않았는지 확인합니다.

## 구조

```
src/
  config.ts              # 개인 정보, 스택, 블로그 on/off
  content/projects/      # 프로젝트 글 (마크다운)
  content/posts/         # 블로그 글 (마크다운)
  pages/                 # 라우트
  layouts/Base.astro     # 헤더, 푸터, 공통 레이아웃
  styles/global.css      # 색상(라이트/다크), 타이포그래피
public/                  # favicon, 이미지
```
