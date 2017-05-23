echo "DB_NAME=$APP_DB_NAME" >> .env
    echo "DB_TEST_NAME=$APP_DB_TEST_NAME" >> .env
    echo "DB_PROTOCOL=postgres" >> .env
    echo "DB_USERNAME=$APP_DB_USER" >> .env
    echo "DB_PASSWORD=$APP_DB_PASS" >> .env
    echo "DB_HOST=localhost" >> .env
    echo "DB_PORT=5432" >> .env
    echo "DB_DEBUG=true" >> .env
    echo "DB_POOL_MAX=50" >> .env
    echo "REDIS_HOST=localhost" >> .env
    echo "REDIS_PORT=6379" >> .env
    echo "REDIS_DB=0" >> .env
    echo "REDIS_POOL_MAX=50" >> .env
    echo "API_CACHE=true" >> .env
    echo "SESSION_SECRET=7Cr02c0Q00281fxDAr1OuC25nBK6E8j7" >> .env
    echo "SERVER_ADDRESS=localhost" >> .env
    echo "SERVER_PORT=3000" >> .env

