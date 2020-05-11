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

const postTodo = data => {
  const id = 'todo' + (localStorage.length + 1)
  const obj = {
    title: data[0],
    date: data[1],
    url: data[2],
    id: id,
    complete: false
  }
  const strObj = JSON.stringify(obj)
  return localStorage.setItem(id, strObj)
}

module.exports = {
  dataValidate,
  postTodo
}
