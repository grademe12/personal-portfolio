variable "account_id" {
  description = "Cloudflare 계정 ID"
  type        = string
}

variable "zone_id" {
  description = "woosupar.dev 존 ID"
  type        = string
}

variable "hostname" {
  description = "사이트 주소"
  type        = string
  default     = "woosupar.dev"
}

variable "worker_name" {
  description = "wrangler.jsonc의 name과 같아야 합니다"
  type        = string
  default     = "personal-portfolio"
}
