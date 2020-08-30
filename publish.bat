cd %~dp0
git commit -am "publish" && git push
aws s3 sync . s3://sso-demo/ --exclude="*" --include="*.html"
az storage blob sync -s . -c fficaas --account-name p21d11107027001 --include-pattern "*.html"
