variable "environment" {
    description = "Deployment environment (e.g., production, staging)"
    type        = string
    default = "development"
  
}
variable "db_instance_id" { type = string }
variable "db_endpoint" { type = string }
variable "ecr_repository_uris" { type = map(string) }
