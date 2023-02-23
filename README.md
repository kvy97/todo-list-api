# TODOS API on AWS Lambda

A simple todos API using the serverless framework.

## Deployment

```
$ serverless deploy
```

After deploying, you should see output similar to:

```bash
Deploying todos-api to stage dev (eu-west-3)
Compiling with Typescript...
Using local tsconfig.json - ./tsconfig.json
Typescript compiled.

✔ Service deployed to stack todos-api-dev (108s)

endpoints:
  GET - https://jc1a2gb7e5.execute-api.eu-west-3.amazonaws.com/todos
  GET - https://jc1a2gb7e5.execute-api.eu-west-3.amazonaws.com/todos/{id}
  POST - https://jc1a2gb7e5.execute-api.eu-west-3.amazonaws.com/todos
  PUT - https://jc1a2gb7e5.execute-api.eu-west-3.amazonaws.com/todos/{id}
  DELETE - https://jc1a2gb7e5.execute-api.eu-west-3.amazonaws.com/todos/{id}
  POST - https://jc1a2gb7e5.execute-api.eu-west-3.amazonaws.com/setup
functions:
  getTodos: todos-api-dev-getTodos (601 kB)
  getTodo: todos-api-dev-getTodo (601 kB)
  createTodo: todos-api-dev-createTodo (601 kB)
  updateTodo: todos-api-dev-updateTodo (601 kB)
  deleteTodo: todos-api-dev-deleteTodo (601 kB)
  initDatabase: todos-api-dev-initDatabase (601 kB)
```

## Local development

### Setup

1 - Create a `.env` file to configure the database :
```
DB_HOST: XXX
DB_PORT: 5432
DB_USER: XXX
DB_PASSWORD: XXX
DB_NAME: XXX
```

2 - Run the setup to initialize the database
```bash
serverless invoke local --function initDatabase
```
### Run the server

You can emulate the API Gateway and Lambda locally by using `serverless-offline` plugin.

Use the following command:

```bash
serverless offline
```
