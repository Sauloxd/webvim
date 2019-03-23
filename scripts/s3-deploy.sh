#!bin/sh
BUCKET_NAME=saulo.dev

~/.local/bin/aws s3 sync build s3://$BUCKET_NAME \
  --region=us-east-1 \
  --delete

~/.local/bin/aws s3 cp s3://$BUCKET_NAME/index.html s3://$BUCKET_NAME/index.html \
  --metadata-directive REPLACE \
  --cache-control max-age=0 \
  --region=us-east-1
