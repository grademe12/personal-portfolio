---
title: 집에서 운영하는 홈랩
summary: 미니 PC, 라즈베리파이, 데스크톱, 맥북, 휴대폰을 Tailnet 하나로 묶고, 공유기 포트는 하나도 열지 않았습니다. 서비스는 대부분 미니 PC에서 Docker로 돌리고, 라즈베리파이는 정전 뒤에도 알아서 켜지는 원격 WoL 허브로 씁니다. 공개 사이트는 집 밖으로 옮겼습니다.
category: net
team: 개인 프로젝트
period: '운영 중'
tools: [Debian, Docker, Tailscale, Gitea, Samba, Wake-on-LAN, Sunshine]
diagram: homelab
size: wide
order: 2
short: 홈랩
featured: true
metric:
  value: '0'
  label: 공유기에 열린 인바운드 포트
highlights:
  - 미니 PC(Debian)에서 Docker로 Gitea와 Samba NAS 운영
  - 정전 뒤 알아서 켜지는 라즈베리파이로 미니 PC와 데스크톱을 원격 WoL
  - SSH와 원격 데스크톱(Sunshine, Moonlight)도 Tailnet 안에서만
  - 공개 사이트는 집 밖 Cloudflare로 분리
---

집에 있는 장비로 직접 운영하는 환경입니다. 개인 프로젝트를 올려 보고, 망가뜨리고, 다시 세우는 곳입니다.

## 장비와 역할

| 장비 | 하는 일 |
|---|---|
| 미니 PC | Debian에서 대부분의 서비스를 Docker로 운영합니다. 개인 Git 서버(Gitea)와 Samba로 공유하는 NAS가 여기 있습니다. |
| 라즈베리파이 | 밖에서 미니 PC와 데스크톱을 깨우는 WoL 허브입니다. 아직 자원이 남아 있어 다른 용도도 붙일 수 있습니다. |
| 데스크톱 | 평소에 켜 두고 Sunshine을 돌립니다. 밖에서는 맥북의 Moonlight로 접속해 원격으로 작업합니다. 꺼져 있으면 라즈베리파이로 깨웁니다. |
| 맥북, 휴대폰 | 밖에서 Tailnet으로 집 장비에 접속합니다. 맥북은 Moonlight 클라이언트로도 씁니다. |

## 왜 이렇게 나눴나

- **라즈베리파이를 허브로 쓰는 이유:** 전력이 적게 들고, 정전 뒤 전기가 다시 들어오면 알아서 켜집니다. 늘 켜져 있어야 하는 역할을 맡기기에 맞습니다. 이 장비만 살아 있으면 미니 PC와 데스크톱은 밖에서 깨울 수 있습니다.
- **포트를 열지 않는 이유:** 공유기에 열어 둔 포트는 하나도 없습니다. 모든 기기가 같은 Tailnet에 있어서, 집 밖에서도 포트포워딩 없이 집 장비에 접근할 수 있습니다. SSH도 Tailnet 안에서만 열려 있어서 인터넷 쪽에서는 보이지 않습니다. 예전에 포트를 열어 둔 워드프레스 서버에 봇이 몰려들던 것과 정반대 구조입니다.
- **원격 작업도 Tailnet 위에서:** 데스크톱의 화면은 Sunshine으로 스트리밍하고, 밖에서는 맥북의 Moonlight로 받습니다. 이 연결도 Tailnet 안에서만 오가서, 원격 데스크톱용 포트를 따로 열 필요가 없습니다.
- **Gitea를 직접 운영하는 이유:** 운영 설정이나 실험 중인 코드처럼 공개하기 어려운 저장소를 둡니다. [dm-roleplaying](/projects/dm-roleplaying/)도 전체 코드는 여기 있고, 공개할 부분만 GitHub로 분리했습니다.

## 내린 것: 워드프레스 블로그

예전에는 미니 PC에서 워드프레스 블로그를 `woosupar.dev`로 직접 서비스했습니다. 도메인이 집 IP를 가리키고 있었고, 봇이 끊임없이 두드려 댔습니다. 그러다 설정 실수로 데이터까지 날아가서 내렸습니다.

지금 `woosupar.dev`는 집이 아니라 Cloudflare Workers에서 서비스하는 정적 사이트입니다. 공개하는 것은 집 밖에, 개인 장비는 Tailnet 안에 두고, 집으로 들어오는 포트는 모두 닫았습니다. 자세한 과정은 [블로그 글](/blog/wordpress-postmortem/)에 적었습니다.

## 지금 상태

Tailscale은 아직 기기를 잇는 기본 연결만 쓰고 있습니다. 라즈베리파이에도 자원이 남아 있어서, 홈랩은 계속 손보는 중입니다.
