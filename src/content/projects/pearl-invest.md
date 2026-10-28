---
title: 'Pearl Invest: 홈랩 하이브리드 인프라와 스마트공장 시뮬레이션'
summary: K3s에 모든 프로세스를 몰아넣은 v1.0을 진단하고 장비 단위로 나눈 v2.0으로 재구성했습니다. Teleport와 K3s RBAC를 연동했고, 이어서 MQTT over TLS 센서 파이프라인, Modbus를 OPC-UA로 바꾸는 게이트웨이, Kinesis와 Firehose를 거쳐 S3로 백업하는 구성을 Terraform으로 붙였습니다.
category: net
team: 개인 프로젝트
period: '2025.09'
tools: [K3s, Teleport, MQTT, OPC-UA, Terraform, Kinesis]
repo: https://github.com/grademe12/Pearl-Invest
size: wide
order: 4
---

집에 있는 미니 PC와 라즈베리파이로 시작한 개인 프로젝트입니다. 처음에는 MSA 기반 투자 포트폴리오 서비스였고, 접근 제어까지 마친 뒤 스마트공장 인프라 시뮬레이션으로 방향을 바꿨습니다.

## v1.0을 진단하다

라즈베리파이 K3s에서 파드 하나에 앱, NGINX, Teleport 에이전트를 `supervisor`로 함께 띄웠습니다. 빨리 만들기엔 좋았지만 문제가 쌓였습니다.

- 컨테이너 하나가 앱, 웹 서버, 보안 에이전트 역할을 모두 맡았습니다.
- 백엔드 파드마다 NGINX와 Teleport 에이전트가 중복으로 돌았습니다.
- Teleport 버전만 올리려 해도 모든 백엔드 이미지를 다시 빌드해야 했습니다.
- 라즈베리파이의 SD카드 I/O로는 Next.js 개발 서버가 너무 느렸습니다.

## v2.0: 장비 단위로 나누기

- **미니 PC (Debian):** Docker Compose로 Next.js(BFF)와 NGINX 리버스 프록시. 사용자 요청을 받아 백엔드로 넘깁니다.
- **라즈베리파이 (K3s):** auth, trading, portfolio API가 각각 독립 파드. NodePort로 미니 PC에 노출합니다.
- **EC2 (Teleport 18.2):** 관리자가 인프라에 들어올 때 RBAC와 단기 인증서로 통제합니다.

Teleport에서 K3s로 권한이 넘어가는 흐름은, 사용자 요청을 Teleport가 먼저 검토하고 에이전트의 ServiceAccount가 impersonation으로 쿠버네티스 인가에 넘기는 구조였습니다. 파드 이름 기준 접근 제어는 성공했고, 라벨 기준 제어는 아직 원인을 찾지 못했습니다.

## 스마트공장 시뮬레이션

- **MQTT 파이프라인:** 라즈베리파이가 센서 역할로 온도, 습도, 진동, 압력, 생산량을 발행하고, 미니 PC의 Mosquitto가 받습니다. QoS 1로 유실을 막고, LWT로 센서가 끊기면 바로 알 수 있게 했습니다.
- **TLS 적용:** OpenSSL로 CA와 서버 인증서를 만들어 1883 평문 포트를 8883 TLS로 바꾸고, 사용자 인증과 ACL을 걸었습니다. 처음엔 클라이언트가 TLS 없이 8883에 붙어 `wrong version number` 오류가 났습니다.
- **관제:** Telegraf, InfluxDB, Grafana(TIG)로 실시간 대시보드를 만들었습니다.
- **OPC-UA 게이트웨이:** Modbus TCP 데이터를 OPC-UA로 바꿔 주는 게이트웨이를 만들었습니다 ([factory-OPCUA](https://github.com/grademe12/factory-OPCUA)).
- **클라우드 백업:** 로컬 스택 전체를 Terraform으로 관리하고, Kinesis Data Stream과 Firehose를 거쳐 S3에 장기 보관하도록 붙였습니다 ([pearl_terraform](https://github.com/grademe12/pearl_terraform)).
