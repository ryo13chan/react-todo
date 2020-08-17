import React, { Component } from 'react';
import { connect } from 'react-redux';
import { readTodos } from '../actions/todo'
import { Link as RouterLink } from 'react-router-dom'
import { Button, Link, TableContainer, Table, TableRow, TableCell, TableHead, TableBody } from '@material-ui/core';

class TodoList extends Component {
  componentDidMount() {
    this.props.readTodos()
  }

  renderTodos() {
    return (
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>内容</TableCell>
              <TableCell>作成日</TableCell>
              <TableCell>期限日</TableCell>
              <TableCell>状態</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.todos.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell component="th">
                  {row.text}
                </TableCell>
                <TableCell>{row.created_at}</TableCell>
                <TableCell>{row.limited_at}</TableCell>
                <TableCell>{row.isDone ? '完了' : '未完了'}</TableCell>
                <TableCell>
                  <Link component={RouterLink} to={`/todos/${row.id}`}>
                    <Button variant="outlined" color="primary">編集</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  render() {
    return (
      <div>
        <h2>TODO一覧</h2>
        {this.renderTodos()}
        <Link component={RouterLink} to={`/todos/new`}>
          <Button variant="contained" color="primary">新規作成</Button>
        </Link>
      </div>
      
    )
  }
}

const mapStateToProps = state => ({ todos: state.todo })

const mapDispatchToProps = dispatch => ({ readTodos: () => dispatch(readTodos()) })

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);