# Worker 자체는 Cloudflare의 Git 연동이 배포합니다(wrangler.jsonc).
# 여기서는 그 Worker에 도메인을 붙이는 부분과 존 설정만 코드로 둡니다.

# Route가 아니라 Custom Domain으로 붙입니다.
# Custom Domain은 DNS 레코드와 인증서를 Cloudflare가 함께 만들어 줘서,
# 손으로 만든 레코드와 섞여 꼬이는 일이 없습니다.
resource "cloudflare_workers_custom_domain" "site" {
  account_id = var.account_id
  zone_id    = var.zone_id
  hostname   = var.hostname
  service    = var.worker_name
}

resource "cloudflare_zone_setting" "always_use_https" {
  zone_id    = var.zone_id
  setting_id = "always_use_https"
  value      = "on"
}

resource "cloudflare_zone_setting" "min_tls_version" {
  zone_id    = var.zone_id
  setting_id = "min_tls_version"
  value      = "1.2"
}
