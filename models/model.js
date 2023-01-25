const fs = require('fs')

class Todo {
    constructor(id, todo, complete, createdAt) {
        this.id = +id
        this.todo = todo
        this.complete = complete || "❌"
        this.createdAt = createdAt || new Date()
    }
}

class Model {
    static readJson() {
        // //CARA PENDEK
        // return fs.promises.readFile('./data.json', 'utf8')

        // //CARA PANJANG
        return new Promise((resoleve, rejects) => {
            fs.promises.readFile('./data.json', 'utf-8')
            .then(data => {
                return resoleve(data)
            })
            .catch(err => {
                return rejects(err)
            })
        })
    }

    static list() {
        return new Promise((resolve, rejcets) => {
            this.readJson()
            .then(data => {
                data = JSON.parse(data)
                data = data.map(el => {
                    return new Todo(el.id, el.todo, el.complete, el.createdAt)
                })
                return resolve(data)
            })
            .catch(err => {
                return rejcets(err)
            })
        })
    }

    static findById(id) {
        return new Promise((resolve, rejects) => {
            this.list()
            .then(todos => {
                let data;
                todos.map(item => {
                    if(item.id == id) data = item
                })

                return resolve(data)
            })
            .catch(err => {
                return rejects(err)
            })
        })
    }

    static writeToDb(data) {

        data = JSON.stringify(data, null, 2)
        return fs.promises.writeFile('./data.json',data, null, 2)

    }

    static addTodo(todo) {
        return new Promise((resoleve, rejects) => {
            if(!todo) return rejects('Masukkan Input')
            
            this.list()
            .then(dataJson => {
                let id = dataJson.length === 0 ? 1: dataJson[dataJson.length - 1].id + 1 
                let instTodo = new Todo(id, todo)
                dataJson.push(instTodo)

                this.writeToDb(dataJson)
                return instTodo
            })
            .then((instTodo) => {
                return resoleve(instTodo) 
            })
            .catch(err => {
                return rejects(err)
            })
        })
    }

    static deltTodo(id) {
        id = +id
        return new Promise((resoleve, rejects) => {
            if(!id) return rejects('Masukkan id yg ingin didelete')

            this.list()
            .then(dbJson => {
                let delTodo;
                let newDb = []
                dbJson.map(item => {
                    if(item.id == id) {
                        delTodo = item
                    }else {
                        newDb.push(item)
                    }
                })

                if (!delTodo) return rejects(`id ${id} tidak ada dalam database`)

                this.writeToDb(newDb)
                return delTodo
            })
            .then(deltTodo => {
                return resoleve(deltTodo)
            })
            .catch(err => {
                rejects(err)
            })

        })
    }

    static editTodo(inputs) {
        return new Promise((resoleve, rejects) => {
            let [id, newTodo] = inputs
            id = +id
            if(!id || !newTodo) return rejects("Insert id and new Todo") 

            this.list()
            .then(dataJson => {
                let oldTodo;

                dataJson = dataJson.map(item => {
                    if(item.id === id) {
                        oldTodo = item
                        return new Todo (id, newTodo)
                    }else {
                        return item
                    }
                })
                
                if(!oldTodo) return rejects(`id ${id} tidak tersedia dalam database`)
                this.writeToDb(dataJson)

                return resoleve(oldTodo)
            })
            .catch(err => {
                return rejects(err)
            })
        })
    }
}

module.exports = {Model, Todo}