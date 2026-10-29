---
title: 여러 쿠버네티스 클러스터를 한 화면에서 보는 모니터
summary: 네이버 클라우드에 Terraform으로 VPC, NKS, DB를 만들고, 클러스터를 등록하면 지표를 모아 보여주는 앱을 올렸습니다. 클러스터 토큰 암호화, GitHub Actions 배포, Ingress HTTPS까지 혼자 했습니다.
category: cloud
team: 개인 프로젝트
period: '2025.10'
tools: [NCP NKS, Terraform, NestJS, Next.js]
repo: https://github.com/grademe12/k8s-multi-cloud-monitor
order: 3
short: 멀티 클러스터 모니터
featured: false
metric:
  value: '82'
  label: 커밋, 인프라부터 앱과 배포까지 혼자
highlights:
  - Terraform으로 NCP에 VPC, NKS, PostgreSQL 구성
  - NestJS 백엔드가 등록된 클러스터의 지표를 수집하고, 접근 토큰은 암호화해 저장
  - GitHub Actions로 NKS에 배포하고 Ingress에 HTTPS 적용
---

여러 클라우드에 흩어진 쿠버네티스 클러스터를 등록하고, 지표를 한곳에서 보는 웹 앱입니다. 앱과 그 앱이 돌아갈 인프라를 모두 혼자 만들었습니다.

## 구성

- **인프라:** 네이버 클라우드(NCP)에 Terraform으로 네트워크, NKS 클러스터, PostgreSQL을 만들었습니다. `network.tf`, `nks.tf`, `db.tf`로 나눴습니다.
- **백엔드:** NestJS와 TypeORM. `@kubernetes/client-node`로 등록된 클러스터에서 지표를 가져옵니다.
- **프론트엔드:** Next.js
- **배포:** 백엔드와 프론트엔드 각각 GitHub Actions 워크플로로 NKS에 배포합니다. Dockerfile은 멀티 스테이지 빌드로 바꿨습니다.

## 신경 쓴 부분

- 사용자가 등록하는 클러스터 접근 토큰은 저장할 때 암호화합니다.
- 같은 지표가 중복으로 쌓이는 문제가 있어 수집 작업에 뮤텍스를 걸었습니다.
- Ingress 리스너를 443으로 바꿔 프론트엔드를 HTTPS로 서비스했습니다.

## 막혔던 것

- NKS용 IAM 역할 설정과 DB 접근 제어(ACG)를 Terraform으로 다루다가, DB 인바운드 규칙은 결국 콘솔에서 따로 열어야 했습니다. 코드 밖에 남은 설정이라 저장소에 기록해 두었습니다.
