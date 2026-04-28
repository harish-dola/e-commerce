output "s3_bucket_id" {
    description = "ID of the S3 bucket"
    value       = aws_s3_bucket.ecommerce_app_bucket.id
}

output "dynamodb_table_id" {
    description = "ID of the DynamoDB table"
    value       = aws_dynamodb_table.tf_locks.id
}