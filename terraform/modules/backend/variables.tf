variable "environment" {
    description = "Deployment environment (e.g., production, staging)"
    type        = string
    default = "development"
  
}

variable "project" {
    description = "Project name for tagging resources"
    type        = string
    default = "ecommerce-app"
  
}