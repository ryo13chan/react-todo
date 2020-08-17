import React, { Component } from 'react'
import { Field, reduxForm } from "redux-form";
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom'
import { addTodo } from '../actions/todo'
import { Button, Link, TextField } from '@material-ui/core';

class TodoNew extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  renderField(field) {
    const { input, label, type, meta: { touched, error } } = field
    return (
      <div>
        <TextField label={label} { ...input} type={type} helperText={ touched && error }/>
      </div>
    )
  }

  onSubmit(values) {
    this.props.addTodo(values)
    this.props.history.push('/')
  }

  render() {
    const { handleSubmit, pristine, submitting, reset } = this.props
    return (
      <div>
        <h2>TODO新規作成</h2>
        <Link component={RouterLink} to={`/`}>
          <Button variant="outlined" color="primary">一覧に戻る</Button>
        </Link>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field label="内容" name="text" type="text" component={this.renderField} />
          <Field label="期限日" name="limited_at" type="date" component={this.renderField} />
          <div>
            <Button variant="contained" color="primary"　type="submit" disabled={pristine || submitting} >作成する</Button>
            <Button variant="outlined" onClick={reset} disabled={pristine || submitting}>クリア</Button>
          </div>
        </form>
      </div>
    )
  }
}

const validate = values => {
  const errors = {}
  if (!values.text) errors.text = "内容を入力してください。"

  return errors
}

function formatDate(date) {
  const y = date.getFullYear()
  let m = ('0' + (date.getMonth() + 1)).slice(-2)
  let d = ('0' + (date.getDate())).slice(-2)
  return [y, m, d].join('-')
}

const mapDispatchToProps = ({ addTodo })

export default connect(null, mapDispatchToProps)(
  reduxForm({
    validate,
    form: 'todoNewForm',
    initialValues: { limited_at: formatDate(new Date()) }
  })(TodoNew)
)