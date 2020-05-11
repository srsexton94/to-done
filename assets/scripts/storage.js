'use strict'

const todosTemplate = require('./templates/todos.handlebars')
const helpers = require('./helpers')

const onSubmit = event => {
  event.preventDefault() // prevents page refresh

  // retrieve the values of the entered form's inputs
  const data = Object.entries(event.target.elements).map(input => {
    // `elements` returns 2d array, selects 2nd item in subarray to get value
    return input[1].value
  })

  data.pop() // removes the value of the submit input (ie the button text)

  if (helpers.dataValidate(data) && localStorage.length < 15) {
    helpers.postTodo(data)
    loadList()
    $('#submission').trigger('reset')
  } else {
    // sets a failure alert
    $('#alert')
      .text('Sorry, your due date is too soon or url invalid, please try again')
      .addClass('alert')
    // clears the failure message after 2 seconds
    setTimeout(() => {
      $('#alert').text('').removeClass('alert')
    }, 2000)
  }
}

const markComplete = event => {
  const id = $(event.target).data('id')
  if ($(event.target).prop('checked')) {
    helpers.updateTodo(id, true)
    loadList()
  } else {
    helpers.updateTodo(id, false)
    loadList()
  }
}

const clearStorage = () => {
  localStorage.clear()
  loadList()
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
  $('#list').on('click', '.check', markComplete)
  $('#clear').on('click', clearStorage)
}

module.exports = {
  loadList,
  addHandlers
}
