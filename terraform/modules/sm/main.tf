resource "aws_secretsmanager_secret" "infra_metadata" {
    name = "ecommerce-${var.environment}-metadata"
    description = "Stores metadata for the ecommerce application, such as resource identifiers and configuration details."

    tags = {
        Environment = var.environment
        ManagedBy    = "Terraform"
    }
  
}

resource "aws_secretsmanager_secret_version" "infra_metadata_values" {
    # Reference the ID of the secret resource created in the same module
    secret_id     = aws_secretsmanager_secret.infra_metadata.id 
    secret_string = jsonencode({
        db_instance_id      = var.db_instance_id
        db_endpoint         = var.db_endpoint
        ecr_repository_uris = var.ecr_repository_uris
    })
}