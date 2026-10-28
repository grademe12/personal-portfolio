---
title: Containerlab으로 만든 BGP 랩 + Ansible 자동화
summary: (예시) YAML 한 파일로 재현 가능한 멀티 AS 토폴로지를 띄우고, Ansible로 설정 배포와 검증을 자동화.
tags: [Containerlab, BGP, FRRouting, Ansible, CI]
order: 3
featured: true
---

> ✏️ 예시 글입니다. 실제로 만든 내용으로 바꿔 주세요.

## 토폴로지

```yaml
name: bgp-lab
topology:
  nodes:
    r1: { kind: linux, image: quay.io/frrouting/frr:10.2.1 }
    r2: { kind: linux, image: quay.io/frrouting/frr:10.2.1 }
  links:
    - endpoints: ["r1:eth1", "r2:eth1"]
```

## 실행 방법

```bash
sudo containerlab deploy -t bgp-lab.clab.yml
ansible-playbook -i inventory.yml site.yml
```

## 검증

GitHub Actions에서 랩을 띄우고, 모든 BGP 세션이 Established인지 자동으로 확인합니다.

## 배운 점

적어 주세요.
