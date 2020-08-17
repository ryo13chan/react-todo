export const READ_TODOS = 'READ_TODOS'
export const ADD_TODO = 'ADD_TODO'
export const EDIT_TODO = 'EDIT_TODO'
export const DELETE_TODO = 'DELETE_TODO'

export const readTodos = () => {
  return {
    type: READ_TODOS
  }
}
export const addTodo = (values) => {
  return {
    type: ADD_TODO,
    text: values.text,
    limited_at: values.limited_at
  }
}
export const editTodo = (values) => {
  return {
    type: EDIT_TODO,
    id: values.id,
    text: values.text,
    limited_at: values.limited_at,
    isDone: values.isDone
  }
}
export const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    id
  }
}