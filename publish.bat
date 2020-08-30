cd %~dp0
git commit -am "publish" && git push
aws s3 sync . s3://sso-demo/ --recursive --exclude="*" --include="*.html"
