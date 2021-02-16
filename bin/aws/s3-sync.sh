echo "AWS Account: $1"
echo "aws s3 sync build/ s3://sigo.hagatus.com.br --acl public-read --region sa-east-1 --profile tcc-td-puc-minas-admin"
aws s3 sync build/ s3://sigo.hagatus.com.br --acl public-read --region sa-east-1 --profile tcc-td-puc-minas-admin