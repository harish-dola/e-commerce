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
variable "database_url" {
    description = "The database connection URL for the backend service."
    type        = string
  
}

variable "secret_key" {
    description = "A secret key for the backend service, used for cryptographic operations."
    type        = string
  
}