'use strict'

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

const logStore = () => {
  const storageArr = Object.values(localStorage).map(str => {
    return JSON.parse(str)
  })
  const todosHtml = todosTemplate({ todos: storageArr })
  console.log(todosHtml)
}

$(() => {
  logStore()
})
