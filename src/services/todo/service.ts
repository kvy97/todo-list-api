import ServerlessPostgres = require('serverless-postgres');
import { CreateTodoDTO, Todo, UpdateTodoDTO } from './types';

export class TodoService {
  private tableName = 'todos'
  private dbClient: ServerlessPostgres

  constructor(dbClient: ServerlessPostgres) {
    this.dbClient = dbClient
  }

  async initTables() {
    await this.dbClient.query(`
      CREATE TABLE IF NOT EXISTS ${this.tableName} (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        title TEXT NOT NULL,
        done BOOL NOT NULL DEFAULT FALSE,
        created_at timestamptz NOT NULL DEFAULT now()
      );
    `)

    return true
  }

  async getTodos(): Promise<Todo[]> {
    const result = await this.dbClient.query(`SELECT * FROM ${this.tableName}`)
    return result.rows ?? []
  }

  async createTodo({ title }: CreateTodoDTO): Promise<Todo> {
    const result = await this.dbClient.query(`
      INSERT INTO ${this.tableName} (title)
      VALUES ($1)
      RETURNING *
    `, [title])

    return result.rows?.[0]
  }

  async updateTodo({ id, title, done }: UpdateTodoDTO): Promise<Todo> {
    const todo = await this.getTodo(id)

    const result = await this.dbClient.query(`
      UPDATE ${this.tableName}
      SET title = $1, done = $2
      WHERE id = $3
      RETURNING *
    `, [title ?? todo.title, done ?? todo.done, id])

    return result.rows?.[0]
  }

  async getTodo(id: string): Promise<Todo> {
    const result = await this.dbClient.query(`
      SELECT * FROM ${this.tableName}
      WHERE id = $1
    `, [id])

    const task = result.rows?.[0]

    if (!task) throw new Error('Todo not found')

    return task
  }


  async deleteTodo(id: string): Promise<boolean> {
    await this.getTodo(id)

    const result = await this.dbClient.query(`
      DELETE FROM ${this.tableName}
      where id = $1
    `, [id])

    console.log(result)

    return true
  }
}