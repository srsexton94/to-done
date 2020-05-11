'use strict'

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

const createTodo = (data, id, complete) => {
  // declare a default obj with data values
  const obj = {
    title: data[0],
    date: data[1],
    url: data[2],
    id: id,
    complete: false
  }

  // if passed a `complete` attribute, changes the obj complete value to true
  if (complete) {
    obj.complete = true
  }
  // make the object a string for localStorage
  return JSON.stringify(obj)
}

const postTodo = (data) => {
  // create an `id` to serve as key in localStorage
  const id = 'todo' + (localStorage.length + 1)
  // creates a stringified object of a yet-incomplete todo
  const strObj = createTodo(data, id, false)
  // post it to localStorage
  localStorage.setItem(id, strObj)
}

// takes the id string for the localStorage key & a boolean if its complete
const updateTodo = (id, complete) => {
  // retrieve the data for the `todo` item checked
  const item = localStorage.getItem(id)

  // create POJO of retrieved data
  const data = Object.entries(JSON.parse(item)).map(e => e[1])

  // use helper function to stringify a full updated object
  const strObj = createTodo(data, id, complete)

  // post it to update localStorage
  localStorage.setItem(id, strObj)
}

module.exports = {
  dataValidate,
  postTodo,
  updateTodo
}
