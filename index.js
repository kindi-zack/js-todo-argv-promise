const Controller = require('./controllers/controller')

const command = process.argv[2]
const params = process.argv.slice(3)
const id = params[0]

switch(command) {
    case 'list':
        Controller.list()
    break;

    case 'add' :
        Controller.addTodo(params[0])
    break;

    case 'edit' :
        // gimana kalau input yg dimasukkan bukan number
        let inputs = params.slice(0, 2)
        
        Controller.editTodo(inputs)
    break;

    case 'find' :
        Controller.findById(id)
    break;

    case 'delete':
        Controller.deltTodo(id)
    break;

    default:
        console.log('default try again')
    break
}