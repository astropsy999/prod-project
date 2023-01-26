cd prod-project
npm run build:prod
cd ../..
rm -rf var/www/prod-project/html
mv prod-project/build var/www/prod-project/html
