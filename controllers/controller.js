const {Model} = require('../models/model')
const View = require('../views/view')

class Controller {
    static list() {
        Model.list()
        .then(data => {
            View.list(data)
        })
        .catch(err => {
            View.showErr(err)
        })
    }

    static findById(id) {
        Model.findById(id)
        .then(data => {
            View.findById(data)
        })
        .catch(err => {
            View.showErr(err)
        })     
    }

    static addTodo(todo) {
        Model.addTodo(todo)
        .then(data => {
            View.addTodo(data)
        })
        .catch(err => {
            View.showErr(err)
        })
    }

    static deltTodo(id) {
        Model.deltTodo(id)
        .then(delData => {
            View.deltTodo(delData)
        })
        .catch(err => {
           View.showErr(err)
        })
    }

    static editTodo(inputs) {
        Model.editTodo(inputs)
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(err)
            console.log('### ERROR ###')
        })
    }


}

module.exports = Controller