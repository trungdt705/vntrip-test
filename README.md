### Step by Step to start server

1. Create folder "postgres/data" inside Database folder
2. Create folder "redis/data" inside Database folder
3. Run command "docker-compose up -d" to start postgres and redis
4. Migrating database, run command:

    ts-node --transpile-only ./node_modules/typeorm/cli.js -f src/orm-migration.ts migration:run

5. Run command:

    npm run start

6. Server is listenning on port 3000!!
