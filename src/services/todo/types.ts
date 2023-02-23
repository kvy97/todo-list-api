export type Todo = {
  id: string
  title: string
  done: boolean
  createdAt: Date
}

export type CreateTodoDTO = Pick<Todo, 'title'>
export type UpdateTodoDTO = {
  id: string
  title?: string
  done?: boolean
}