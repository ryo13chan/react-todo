import { READ_TODOS, ADD_TODO, EDIT_TODO, DELETE_TODO } from '../actions/todo'

const initialState = [
  { id: 1, text: '掃除', created_at: formatDate(new Date('2020/4/1')), limited_at: formatDate(new Date('2020/4/1')), isDone: false },
  { id: 2, text: '買い物', created_at: formatDate(new Date('2020/4/2')), limited_at: formatDate(new Date('2020/4/3')), isDone: true },
  { id: 3, text: 'Reactアプリ完成させる', created_at: formatDate(new Date('2020/4/1')), limited_at: formatDate(new Date('2020/4/3')), isDone: false },
]

function formatDate(date) {
  const y = date.getFullYear()
  let m = ('0' + (date.getMonth() + 1)).slice(-2)
  let d = ('0' + (date.getDate())).slice(-2)
  return [y, m, d].join('-')
}

export default (todos = initialState, action) => {
  switch (action.type) {
    case READ_TODOS:
      return todos
    case ADD_TODO:
      let nextId = todos.length ? todos[todos.length - 1].id + 1 : 1;
      return [...todos, { 
        id: nextId, 
        text: action.text,
        created_at: formatDate(new Date()),
        limited_at: action.limited_at ? formatDate(new Date(action.limited_at)) : '',
        isDone: false
      }]
    case EDIT_TODO:
      return todos.map(todo => {
        if (todo.id === action.id) {
          todo.text = action.text
          todo.limited_at = action.limited_at
          todo.isDone = action.isDone
        }
        return todo
      })
    case DELETE_TODO:
      return todos.filter(todo => String(todo.id) !== action.id)
    default: 
      return todos
  }
}