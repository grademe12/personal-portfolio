terraform {
  required_version = ">= 1.6"

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.0"
    }
  }
}

# 토큰은 CLOUDFLARE_API_TOKEN 환경 변수로 넣습니다. 코드와 tfvars에는 두지 않습니다.
provider "cloudflare" {}
