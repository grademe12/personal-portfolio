---
title: 모의 주식 거래소와 부하 측정
summary: Django 매칭 엔진의 주문 API를 k6로 재서 기준선을 남겼습니다. 초당 100건에서 p99 2.07ms, 실패 0%. GCE 백엔드와 로컬 PostgreSQL은 Tailscale 사설망으로 잇고, Prometheus와 Grafana로 봅니다.
category: obs
team: 개인 프로젝트
period: '2026.06 – 진행 중'
tools: [Django, k6, GCE, Tailscale, Prometheus]
repo: https://github.com/grademe12/stock-market
order: 4
short: 모의 주식 거래소
---

주식 거래 애플리케이션을 흉내 낸 학습용 프로젝트입니다. 단일 Django 매칭 엔진에서 시작해, 부하 제어와 테스트, 모니터링, 이벤트 파이프라인을 필요해지는 시점에 하나씩 붙이고 있습니다. 실제 증권사 주문은 넣지 않습니다.

## 부하 기준선

무언가를 바꾸기 전에 먼저 지금 성능을 재 두었습니다. 이후 레이트 제한, 관측, 비동기 처리를 넣을 때 이 숫자와 비교합니다.

- 대상: `POST /api/v1/orders/`, 단일 종목, 매수와 매도 교차
- 도구: k6 `constant-arrival-rate`, 각 30초
- 백엔드: Gunicorn worker 1개, thread 4개, CPU 1개, 메모리 4GiB 제한

| 목표 주문률 | 주문 수 | 평균 | p95 | p99 | 실패율 |
|---:|---:|---:|---:|---:|---:|
| 10/s | 300 | 1.99 ms | 2.31 ms | 2.60 ms | 0% |
| 50/s | 1,500 | 1.58 ms | 2.09 ms | 2.41 ms | 0% |
| 100/s | 3,000 | 1.45 ms | 1.80 ms | 2.07 ms | 0% |

호가창이 아직 메모리에 있고 잔고 검증도 없는 범위의 숫자라, 그 조건 안에서만 비교합니다.

## 배포 결정: Cloud SQL 대신 로컬 PostgreSQL

GCE에 백엔드를 올리면서 DB는 Cloud SQL이 아니라 집에 있는 PostgreSQL 17을 쓰고, 둘을 Tailscale 사설망으로 연결했습니다.

- 실제 서비스가 아니라서 GCP 자원은 실험할 때만 켭니다.
- 지금 DB에는 트레이더 프로필과 참조 데이터만 있고, 주문 경로에는 DB가 없습니다.
- 그래서 Cloud SQL 상시 비용보다 로컬에 데이터를 보존하는 쪽이 맞았습니다.

주문과 체결을 DB에 저장하는 단계가 오면 WAN 지연이 주문 경로에 직접 들어오므로, 그때 이 결정을 다시 검토하기로 문서에 적어 두었습니다.

## 짝 프로젝트

뉴스와 공시를 표준화된 시장 이벤트로 바꾸는 [market-event-analyzer](https://github.com/grademe12/market-event-analyzer)를 따로 만들고 있습니다. 이벤트의 의미는 분석기가, 거기에 어떻게 반응할지는 거래소가 정하도록 경계를 나눴습니다.
