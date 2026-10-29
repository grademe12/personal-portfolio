# infra

woosupar.dev 도메인을 Worker에 붙이는 설정과 존 설정을 Terraform으로 관리합니다.

예전 블로그는 DNS 레코드를 대시보드에서 손으로 만지다가 잃었습니다([회고](https://woosupar.dev/blog/wordpress-postmortem/)). 지금은 도메인이 어디에 어떻게 연결되는지를 이 디렉터리의 코드로 남깁니다.

| 무엇 | 어디서 관리 |
|---|---|
| Worker 코드와 정적 파일 배포 | Cloudflare Git 연동 (`main` push, `wrangler.jsonc`) |
| Worker에 woosupar.dev 연결 (Custom Domain) | `main.tf` |
| HTTPS 강제, 최소 TLS 1.2 | `main.tf` |
| 형식과 문법 검사 | GitHub Actions (`.github/workflows/terraform.yml`) |

## 처음 한 번: 이미 있는 설정을 가져오기

도메인 연결은 대시보드에서 먼저 만들어 두었기 때문에, 새로 만들지 않고 상태로 가져옵니다.

1. Cloudflare에서 API 토큰을 만듭니다. 필요한 권한은 다음과 같습니다.
   - Account: Workers Scripts 편집
   - Zone (woosupar.dev): Zone Settings 편집, DNS 편집, Workers Routes 편집
2. 변수를 채웁니다.

   ```bash
   cd infra
   cp terraform.tfvars.example terraform.tfvars   # account_id, zone_id 입력
   export CLOUDFLARE_API_TOKEN=...
   terraform init
   ```

3. Custom Domain의 ID를 찾아 가져옵니다.

   ```bash
   ACCOUNT_ID=...   # tfvars와 같은 값
   ZONE_ID=...
   DOMAIN_ID=$(curl -s -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
     "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/domains?hostname=woosupar.dev" \
     | jq -r '.result[0].id')

   terraform import cloudflare_workers_custom_domain.site "$ACCOUNT_ID/$DOMAIN_ID"
   terraform import cloudflare_zone_setting.always_use_https "$ZONE_ID/always_use_https"
   terraform import cloudflare_zone_setting.min_tls_version "$ZONE_ID/min_tls_version"
   ```

4. `terraform plan`을 돌려 바뀌는 게 없는지 확인합니다. 존 설정이 지금 값과 다르면 그 두 줄만 변경으로 나옵니다.

## 상태 파일

`terraform.tfstate`는 로컬에만 두고 저장소에 올리지 않습니다(`.gitignore`). 혼자 관리하는 작은 설정이라 원격 백엔드 없이 시작했습니다.
