cd frontend
npm install
cd ../backend
npm install

mysql -u root -e "CREATE DATABASE ensolvers_challenge"
mysql -u root ensolvers_challenge < ../database/init.sql

cd ../backend
npm run dev &
cd ../frontend
ng serve -o