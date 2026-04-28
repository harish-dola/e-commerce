terraform {
  required_providers {
    aws ={
        version = "~>6.28.0"
    }
  }
  backend "s3" {
      bucket         = "ecommerce-dev-bucket-123456789"
      key            = "ecommerce/terraform.tfstate"
      region         = "us-east-1"
      encrypt        = true
      dynamodb_table = "tf-locks-dev"
    }
}

provider "aws" {
  region = var.region
}

module "rds" {
    source = "../../modules/rds"
    db_password = var.db_password
}

module "ecr" {
    source = "../../modules/ecr"
    services = ["frontend", "backend"]
}

module "backend" {
    source = "../../modules/backend"
    environment = "dev"
  
}
