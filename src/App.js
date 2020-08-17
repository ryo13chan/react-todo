import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import TodoList from './components/todo_list.js'
import TodoNew from './components/todo_new.js'
import TodoShow from './components/todo_show.js'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={TodoList} />
        <Route exact path="/todos" component={TodoList} />
        <Route path="/todos/new" component={TodoNew} />
        <Route path="/todos/:id" component={TodoShow} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
