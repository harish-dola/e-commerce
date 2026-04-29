variable "environment" {
    description = "The deployment environment (e.g., dev, staging, prod)."
    type        = string
  
}
variable "app_image" {
    description = "The Docker image URI for the application container."
    type        = string
    default = "nginx:latest" # Placeholder for initial creation
}

variable "backend_image" {
    description = "The Docker image URI for the backend container."
    type        = string
    default = "nginx:latest" # Placeholder for initial creation
  
}

variable "database_url" {
    description = "The database connection URL for the backend service."
    type        = string
}

variable "secret_key" {
    description = "A secret key for the backend service, used for cryptographic operations."
    type        = string
}