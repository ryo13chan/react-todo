import React, { Component } from 'react'
import { Field, reduxForm } from "redux-form";
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom'
import { readTodos, editTodo, deleteTodo } from '../actions/todo'
import { Button, TextField, Link, Checkbox, FormControlLabel } from '@material-ui/core';

class TodoShow extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  componentDidMount() {
    this.props.readTodos()
  }

  renderField(field) {
    const { input, label, type, disabled, meta: { touched, error } } = field
    if (type === 'checkbox') {
      return (
        <div>
          <FormControlLabel
            label={label}
            control={<Checkbox { ...input} name={input.name} />}
            labelPlacement="end"
          />
        </div>
      )
    }
    return (
      <div>
        <TextField label={label} { ...input} type={type} helperText={ touched && error } disabled={disabled}/>
      </div>
    )
  }

  onSubmit(values) {
    this.props.editTodo(values)
    this.props.history.push('/')
  }

  onDeleteClick() {
    this.props.deleteTodo(this.props.match.params.id)
    this.props.history.push('/')
  }

  render() {
    const { handleSubmit, pristine, submitting, reset } = this.props
    return (
      <div>
        <h2>TODO編集</h2>
        <Link component={RouterLink} to={`/`}>
          <Button variant="outlined" color="primary">一覧に戻る</Button>
        </Link>
        { !this.props.todo
          ? <p>TODOが存在しません</p> 
          : <form onSubmit={handleSubmit(this.onSubmit)}>
              <Field label="ID" name="id" type="text" component={this.renderField} props={{ disabled: true }} />
              <Field label="内容" name="text" type="text" component={this.renderField} />
              <Field label="作成日" name="created_at" type="date" component={this.renderField} props={{ disabled: true }} />
              <Field label="期限日" name="limited_at" type="date" component={this.renderField} />
              <Field label="完了の場合はチェック" name="isDone" type="checkbox" component={this.renderField} />
              <div>
                <Button variant="contained" color="primary" type="submit" disabled={pristine || submitting}>更新する</Button>
                <Button variant="outlined" onClick={reset} disabled={pristine || submitting}>クリア</Button>
                <Button variant="contained" color="secondary" onClick={this.onDeleteClick} disabled={pristine || submitting} >削除する</Button>
              </div>
            </form>
        }
      </div>
    )
  }
}

const validate = values => {
  const errors = {}
  if (!values.text) errors.text = "内容を入力してください。"

  return errors
}

const mapStateToProps = (state, ownProps) => {
  const todo = state.todo.length ? state.todo.find(todo => Number(todo.id) === Number(ownProps.match.params.id)) : {}
  return { initialValues: todo, todo }
}

const mapDispatchToProps = ({ readTodos, editTodo, deleteTodo })

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    validate,
    form: 'todoShowForm'
  })(TodoShow)
)