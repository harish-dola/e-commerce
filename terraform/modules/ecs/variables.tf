variable "environment" {
    description = "The deployment environment (e.g., dev, staging, prod)."
    type        = string
  
}
variable "app_image" {
    description = "The Docker image URI for the application container."
    type        = string
    default = "nginx:latest" # Placeholder for initial creation
}