'use strict'

// const getFormFields = require('../../lib/get-form-fields.js')
const todosTemplate = require('./templates/todos.handlebars')

// const add = () => {
//   const myDate = new Date()
//   const obj = {
//     title: 'My 2nd todo item',
//     date: myDate
//   }
//   const strObj = JSON.stringify(obj)
//   const id = 'todo' + (localStorage.length + 1).toString()
//   localStorage.setItem(id, strObj)
// }

const onSubmit = event => {
  event.preventDefault() // prevents page refresh
  // retrieve the values of the entered form's inputs
  const data = Object.entries(event.target.elements).map(input => {
    // `elements` method returns 2d array with indexed keys
    // must select second item in each subarray
    return input[1].value
  })
  data.pop() // remove the value of the submit input (ie the button text)
  console.log(data)
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
