module "ecr" {
    source = "terraform-aws-modules/ecr/aws"
    version = "~>3.2"
    
    for_each = toset(var.services)
    repository_name = "ecommerce/${each.value}"

    repository_image_tag_mutability = "IMMUTABLE"
    repository_image_scan_on_push = true

    repository_lifecycle_policy = jsonencode(
    {
        "rules": [
            {
                "rulePriority": 1,
                "description": "Expire untagged images older than 2 days",
                "selection": {
                    "tagStatus": "untagged",
                    "countType": "sinceImagePushed",
                    "countUnit": "days",
                    "countNumber": 2
                },
                "action": {
                    "type": "expire"
                }
            }
        ]
    })
}
