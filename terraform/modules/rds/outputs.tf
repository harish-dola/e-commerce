output "db_instance_endpoint" {
    description = "The Connection endpoint for this RDS instance"
    value = module.db.db_instance_endpoint
  
}

output "db_instance_id" {
    description = "The ID of the RDS instance"
    value = module.db.db_instance_resource_id
  
}