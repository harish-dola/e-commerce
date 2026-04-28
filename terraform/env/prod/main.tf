terraform {
  required_providers {
    aws ={
        version = "~>6.0.0"
    }
  }
}

provider "aws" {
  region = var.region
}