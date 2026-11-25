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

variable "resume_hostname" {
  description = "이력서 사이트 주소"
  type        = string
  default     = "resume.woosupar.dev"
}

variable "resume_worker_name" {
  description = "이력서 레포 wrangler.jsonc의 name과 같아야 합니다"
  type        = string
  default     = "resume"
}
