REM This bat file should be run only in command prompt [cmd]; will fail in PowerShell
REM Run the MySQL container, with a database named 'users' and credentials
REM for a users-service user which can access it.
echo "Starting DB..."  
docker run --name db -d ^
  -e MYSQL_ROOT_PASSWORD=123 ^
  -e MYSQL_DATABASE=users -e MYSQL_USER=users_service -e MYSQL_PASSWORD=123 ^
  -p 3306:3306 ^
  mysql:latest

REM Wait for the database service to start up.
echo "Waiting for DB to start up..."  
docker exec db mysqladmin --silent --wait=50 -uusers_service -p123 ping || exit 1

REM Run the setup script.
echo "Setting up initial data..."  
docker exec -i db mysql -uusers_service -p123 users < setup.sql  