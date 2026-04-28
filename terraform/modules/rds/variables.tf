variable "db_password" {
    description = "Password for the RDS database, injected from azure key vault"
    type        = string
    sensitive   = true
}

