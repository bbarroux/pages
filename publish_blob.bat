cd %~dp0
az storage blob sync -s . -c fficaas --account-name p21d11107027001 --include-pattern "*.html;*.js;*.png;*.css"
