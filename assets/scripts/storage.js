'use strict'

// const getFormFields = require('../../lib/get-form-fields.js')
const todosTemplate = require('./templates/todos.handlebars')

// const createTodoObj = () => {
//   const myDate = new Date()
//   const obj = {
//     title: 'My 2nd todo item',
//     date: myDate
//   }
//   const strObj = JSON.stringify(obj)
//   const id = 'todo' + (localStorage.length + 1).toString()
//   localStorage.setItem(id, strObj)
// }

const urlValidate = str => {
  // try making a new URL obj with the provided string
  try {
    new URL(str)
  } catch (_) {
    return false // return false if it fails
  }
  return true // return true on success
}

const dataValidate = data => {
  // return true if data does *not* meet these failure cases
  return !((Date.parse(data[1]) < Date.now()) || (data[2] && !urlValidate(data[2])))
}

const onSubmit = event => {
  event.preventDefault() // prevents page refresh
  // retrieve the values of the entered form's inputs
  const data = Object.entries(event.target.elements).map(input => {
    // `elements` method returns 2d array with indexed keys
    // must select second item in each subarray
    return input[1].value
  })
  data.pop() // remove the value of the submit input (ie the button text)
  console.log(dataValidate(data))
}

const loadList = () => {
  const storageArr = Object.values(localStorage).map(str => {
    return JSON.parse(str)
  })
  const todosHtml = todosTemplate({ todos: storageArr })
  $('#list').html(todosHtml)
}

const addHandlers = () => {
  $('#submission').on('submit', onSubmit)
}

module.exports = {
  loadList,
  addHandlers
}
