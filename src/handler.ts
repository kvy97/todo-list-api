import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { todoService } from './services/todo';
import { CreateTodoDTO, UpdateTodoDTO } from './services/todo/types';
import { dbClient } from './dbClient';

export const getTodos = async (): Promise<APIGatewayProxyResult> => {
  await dbClient.connect()
  const todos = await todoService.getTodos()
  await dbClient.clean()

  return {
    statusCode: 200,
    body: JSON.stringify(
      todos
    )
  }
}

export const getTodo = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.id

  await dbClient.connect()
  const todo = await todoService.getTodo(id)
  await dbClient.clean()

  return {
    statusCode: 200,
    body: JSON.stringify(
      todo
    )
  }
}

export const createTodo = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const payload: CreateTodoDTO = JSON.parse(event.body)

  await dbClient.connect()
  const todo = await todoService.createTodo(payload)
  await dbClient.clean()

  return {
    statusCode: 200,
    body: JSON.stringify(
      todo
    )
  }
}

export const updateTodo = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const payload: UpdateTodoDTO = JSON.parse(event.body)
  payload.id = event.pathParameters.id

  await dbClient.connect()
  const todo = await todoService.updateTodo(payload)
  await dbClient.clean()

  return {
    statusCode: 200,
    body: JSON.stringify(
      todo
    )
  }
}

export const deleteTodo = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.id

  await dbClient.connect()
  const result = await todoService.deleteTodo(id)
  await dbClient.clean()

  return {
    statusCode: 200,
    body: JSON.stringify(
      result
    )
  }
}

export const initDatabase = async(): Promise<APIGatewayProxyResult> => {
  await dbClient.connect()
  const result = await todoService.initTables()
  await dbClient.clean()

  return {
    statusCode: 200,
    body: JSON.stringify(
      result
    )
  }
}
