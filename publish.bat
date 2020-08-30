git commit -am "publish" && git push
aws s3 cp . s3://sso-demo/ --recursive --exclude="*" --include="*.html"
