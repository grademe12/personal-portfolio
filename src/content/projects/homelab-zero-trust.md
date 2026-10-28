---
title: 포트 0개로 운영하는 홈랩
summary: (예시) 공유기 포트포워딩을 전부 닫고 Cloudflare Tunnel과 Access로만 홈랩 서비스를 외부에 노출.
tags: [Cloudflare Tunnel, Zero Trust, Docker, Grafana]
order: 2
featured: true
---

> ✏️ 예시 글입니다. 실제로 만든 내용으로 바꿔 주세요.

## 목표

- 공유기 인바운드 포트 **0개**
- 관리용 페이지에는 로그인(Cloudflare Access) 필수
- 집 공인 IP 노출 없음

## 아키텍처

<!-- 다이어그램 이미지는 public/images/ 에 넣고 ![설명](/images/파일명.png) 로 첨부 -->

## 설계 이유

왜 VPN이 아니라 터널을 골랐는지, 대안과 비교해서 적어 주세요.

## 트러블슈팅

막혔던 문제, 원인, 해결 과정을 적어 주세요.

## 결과

포트를 닫기 전과 후의 인바운드 차단 로그 같은 수치를 넣으면 좋습니다.
