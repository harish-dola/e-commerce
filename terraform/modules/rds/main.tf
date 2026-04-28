module "db" {
    source = "terraform-aws-modules/rds/aws"
    version = "~>6.0"

    identifier = "ecommerce-db"
    engine = "postgres"
    engine_version = "16.13"
    instance_class = "db.t3.micro"  
    family = "postgres16"
    major_engine_version = "16" 
    allocated_storage = 5
    storage_type = "gp2"
    storage_encrypted = true

    db_name = "ecommerce"
    username = "db_admin"
    password = var.db_password
    port = 5432

    manage_master_user_password = false

    backup_retention_period = 1
    skip_final_snapshot = true
    deletion_protection = false

    tags = {
        Environment = "production"
        Project     = "ecommerce-app"
        ManagedBy    = "Terraform"
    }

}