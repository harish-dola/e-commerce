variable "region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "db_password" {
    description = "Password for the RDS database, injected from azure key vault"
    type        = string
    sensitive   = true
}