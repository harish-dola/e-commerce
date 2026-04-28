terraform {
  required_providers {
    aws ={
        version = "~>6.28.0"
    }
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