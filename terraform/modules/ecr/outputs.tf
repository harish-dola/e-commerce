# 1. Output a map of all repository URLs
# Usage in pipeline: $(terraform output -json ecr_repository_urls)
output "ecr_repository_urls" {
  description = "Map of repository names to their full URLs"
  value       = { for k, v in module.ecr : k => v.repository_url }
}

# 2. Output a map of all repository ARNs (Useful for IAM policies)
output "ecr_repository_arns" {
  description = "Map of repository names to their ARNs"
  value       = { for k, v in module.ecr : k => v.repository_arn }
}

# 3. Output the Registry ID (Often needed for Docker login)
# Since all repos share the same registry/account, we just take the first one
output "ecr_registry_id" {
  description = "The AWS Account ID/Registry ID"
  value       = values(module.ecr)[0].repository_registry_id
}