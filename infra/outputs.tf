output "site_url" {
  value = "https://${cloudflare_workers_custom_domain.site.hostname}"
}

output "resume_url" {
  value = "https://${cloudflare_workers_custom_domain.resume.hostname}"
}
