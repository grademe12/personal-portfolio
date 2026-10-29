---
title: 'Stagelog: Terraform과 GitOps로 만든 EKS 기반 MSA 인프라'
summary: 공연 후기 커뮤니티 서비스를 MSA로 나누고 EKS 위에 올린 프로젝트입니다. 인프라는 수명주기에 따라 permanent, eks, ephemeral 스택으로 나눠, 클러스터를 내려도 DNS와 인증서와 데이터는 남게 했습니다.
category: auto
team: 팀 프로젝트 5인
period: '2026.01 – 2026.03'
tools: [Terraform, EKS, ArgoCD, Karpenter, API Gateway, Django]
repo: https://github.com/Goorm-Team-Project/stagelog-infra
size: lead
order: 1
roles:
  - title: '백엔드: 서비스 분리'
    items:
      - 모놀리식 Django를 auth, posts, events, notifications 4개 서비스와 outbox-worker 등 워커로 분리 (서비스 저장소 7개 대부분 직접 작성)
      - 서비스 간 직접 DB 참조를 없애고 내부 API로 전환, RDS 한 대 안에서 스키마 3개로 격리
      - Outbox 패턴과 shared 패키지로 정합성과 내부 API 계약 관리
      - 섞여 있던 user와 auth를 나누고, auth는 Lambda로 분리해 API Gateway Authorizer에서 JWT 검증
  - title: '인프라: stagelog-infra 커밋 수 1위'
    items:
      - EKS IRSA와 STS VPC Endpoint 구성
      - API Gateway를 VPC Link로 internal ALB에 연결하고 Lambda authorizer 연동
      - .env 파일 배포 대신 서비스별 SSM Parameter Store로 전환
      - auth Lambda CI/CD와 ECR 푸시용 IAM 역할
      - 배포와 삭제를 한 번에 하는 스크립트(Makefile, Discord 알림)를 만들어 개발 서버를 평일 업무 시간에만 운영
      - 프로젝트 AWS 계정을 운영하고 팀원에게 IAM 계정 발급
short: Stagelog
featured: true
metric:
  value: '73%'
  label: 개발 서버 가동 시간 감소, 평일 업무 시간에만 운영
highlights:
  - 모놀리식 Django를 4개 서비스와 워커로 분리하고 Outbox 패턴으로 정합성 확보
  - auth를 Lambda로 떼어 내 API Gateway Authorizer에서 JWT 검증
  - 수명주기별 Terraform 스택에서 EKS IRSA, STS VPC Endpoint, API Gateway VPC Link 구성
  - .env 배포를 서비스별 SSM Parameter Store로 전환
  - 배포, 삭제 자동화로 개발 서버를 평일 09:00~18:00에만 운영 (stagelog-infra 커밋 팀 내 1위)
---

구름 클라우드 네이티브 엔지니어링 과정의 마지막 팀 프로젝트(2026.02.27 – 2026.03.30)입니다. 같은 서비스를 1차(AWS 배포), 2차(보안 취약점 진단과 대응), 3차(MSA와 EKS)로 이어서 발전시켰고, 이 페이지는 3차를 중심으로 정리했습니다.

## 왜 했나

- 수동으로 인프라를 만들면 사람 실수가 나고, MSA처럼 구성 요소가 많아지면 관리가 어렵습니다.
- 인스턴스 단위 비용만 봐서는 서비스별로 자원을 얼마나 쓰는지 알 수 없습니다.
- 모놀리식 구조는 코드 한 줄을 고쳐도 전체를 다시 배포해야 합니다.

## 인프라를 수명주기로 나누기

`stagelog-infra`는 Terraform 스택을 얼마나 오래 사는지에 따라 나눴습니다. EKS를 내렸다 다시 올려도 DNS, 인증서, 데이터 저장소 같은 기반은 그대로 남습니다.

이 구조 덕분에 개발 서버를 **평일 업무 시간(09:00~18:00)에만** 운영할 수 있었습니다. 아침에 `deploy_all.sh`로 재생성 계층을 올리고 저녁에 `destroy_all.sh`로 내리고, 주말에는 올리지 않았습니다. 시간당 과금되는 EKS, 노드, NAT 게이트웨이가 일주일 168시간 중 45시간만 돌아가서, 상시 운영과 비교하면 가동 시간이 약 73% 줄어듭니다. 두 스크립트는 Makefile로 순서를 묶고, 끝나면 Discord로 알림이 오게 만들었습니다.

### 얼마나 아꼈나 (추정)

재생성 계층에 들어 있는 자원을 서울 리전 온디맨드 정가로 계산했습니다.

| 자원 | 구성 | 시간당 |
|---|---|---|
| EKS 컨트롤 플레인 | 1개 | $0.100 |
| 관리형 노드 | t3.large × 2 | $0.208 |
| NAT 게이트웨이와 공인 IP | 1개 | $0.064 |
| Interface VPC Endpoint | 6종 × AZ 2개 | $0.156 |
| 내부 ALB | 1개 | $0.023 |
| Bastion | t3.micro × 1 | $0.013 |
| **합계** | | **약 $0.56** |

| 운영 방식 | 한 달 가동 시간 | 한 달 비용 |
|---|---|---|
| 상시 운영 | 약 730시간 | 약 $410 |
| 평일 09:00~18:00 | 약 196시간 | 약 $110 |

한 달에 약 $300을 줄인 셈입니다. Karpenter가 부하에 따라 더 띄운 노드와 데이터 전송료는 빠져 있어서, 실제 차이는 이보다 큽니다.

프로젝트 AWS 계정은 제 계정 하나에 팀원들을 IAM 사용자로 붙여 썼기 때문에, 청구서가 곧 팀 전체 사용량입니다. 3월 청구서의 EKS 요금을 시간으로 바꾸면 약 110시간인데, EKS를 처음 올린 3월 중순 이후 평일 약 12일 × 9시간과 거의 같습니다. 상시 운영이었다면 같은 기간에 약 440시간이 찍혔을 것이라, 실제로 일정대로 운영했다는 것도 청구서로 확인됩니다.

| 스택 | 담는 것 |
|---|---|
| `0-ssm-params` | 서비스별 SSM 파라미터 (환경변수의 단일 원천) |
| `1-permanent` | VPC, S3, CloudFront, Route 53, ACM, WAF, Redis, DynamoDB, EventBridge, SQS, auth Lambda |
| `2-eks` | EKS, 노드 그룹, IRSA, ALB Controller, ArgoCD, Karpenter, Interface VPC Endpoint |
| `3-ephemeral` | API Gateway, VPC Link, Lambda authorizer |

배포 순서는 SSM 파라미터, 기반 인프라, EKS, ArgoCD로 앱 배포, 마지막으로 internal ALB를 upstream으로 하는 API Gateway입니다. CloudFront는 `3-ephemeral`의 출력이 있을 때만 `/api/*` 경로를 연결합니다.

## 팀 전체가 만든 것

- **GitOps:** ArgoCD App of Apps, sync-wave로 배포 순서 제어, Argo Rollouts 블루-그린 배포
- **확장:** Karpenter 노드 확장과 Consolidation, 파드별 Spot과 On-Demand 배치, CPU 기준 HPA
- **관측:** kube-prometheus-stack, Fluent Bit에서 Loki로 로그 수집, Alertmanager에서 Discord 알림, Kubecost로 비용 확인
- **비동기 알림:** EventBridge, SQS, DynamoDB 파이프라인
- **부하 테스트:** k6로 사용자를 4,000명까지 올려 HPA가 파드를 최대 5개로 늘리고, 자원이 모자라자 Karpenter가 노드를 추가하는 것을 확인했습니다. 부하가 빠지면 Consolidation으로 노드가 다시 줄어듭니다.

## 아쉬웠던 점

발표 때 제가 맡은 백엔드에서 직접 짚은 두 가지입니다.

### API Gateway의 위치가 애매했다

인증을 Authorizer로 떼어 내려고 API Gateway를 넣었지만, 결과적으로는 단순히 라우팅만 하고 있었습니다. 그 역할의 상당 부분은 ALB로도 할 수 있었습니다. 게다가 API Gateway의 기본 주소(`execute-api`)로 직접 접근할 수 있는 경로가 남아 있었습니다.

### 알림 메시지가 사라질 수 있었다

Outbox로 정합성을 챙겼지만, 그 뒤 EventBridge 단계에 빈틈이 있었습니다. 이벤트가 어떤 룰과도 맞지 않으면 그대로 버려지고, 룰을 잘못 고치는 실수 하나로 알림이 영구히 유실될 수 있었습니다. 별도의 재처리 경로와 모니터링을 붙여야 막을 수 있는 부분이었습니다.

## 이전 단계에서 한 것

2차 프로젝트에서는 운영 중인 서비스를 직접 공격해 보고 고쳤습니다. WAF 레이트 제한으로 무차별 요청 139건을 차단했고, ACM으로 TLS를 적용한 뒤 Wireshark로 핸드셰이크를 확인했습니다. S3 직링크를 막고 CloudFront OAC로만 읽게 바꿨고, ASG로 p95 응답을 3.79초에서 1.98초로 줄였습니다.
