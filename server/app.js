import express from 'express'
import httpProxy from 'http-proxy'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import config from '../config'

const app = express()
const targetUrl = `${config.host}:${config.proxyPort}`
const proxy = httpProxy.createProxyServer({
    target: targetUrl
})

app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json())
mongoose.connect(`mongodb://${config.host}:27017/dotography`);
const Schema = mongoose.Schema
const Todo = mongoose.model('Todo', new Schema({
    title: String,
    desc: String,
    created: { type: Date, default: Date.now },
    updated: { type: Date },
    done: { type:Boolean, default:false }
}));

app.get('/api/v1/todos', (req, res) => {
    let filter = req.query.filter,
        obj = {};
    switch (filter) {
        case 'remain': obj = { done: false }; break;
        case 'done': obj = { done: true }; break;
    }
    Todo.find(obj, (err, todos) => {
        if(err) {
            res.send(500, err);
        }
        res.send(todos)
    })
})

app.get('/api/v1/todos/:id', (req, res) => {
    Todo.find({ _id: req.params.id }, (err, todo) => {
        if(err) {
            res.send(500, err);
        }
        res.send(todo)
    })
})

app.post('/api/v1/todos', (req, res) => {
    var todo = new Todo(req.body);
    todo.save((err, todo) => {
        if(err) {
            res.send(500, err)
        }
        res.send({data: todo, message: 'Create success'})
    })
})

app.put('/api/v1/todos/:id', (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if(err) {
            res.send(500, err)
        }
        todo.title = req.body.title;
        todo.desc = req.body.desc;
        todo.done = req.body.done;
        todo.save((err, todo) => {
            if(err) {
                res.send(500, err)
            }
            res.send({data: todo, message: 'Update success'})
        })
    })
})


app.delete('/api/v1/todos/:id', (req, res) => {
    Todo.remove({_id: req.params.id}, (err, todo) => {
        if(err) {
            res.send(500, err)
        }
        res.send({data: req.params.id, message: 'Delete success'})
    })
})

app.use('/api', (req, res) => {
    proxy.web(req, res, { target: `${targetUrl/api}` })
})

app.listen(config.serverPort, error => {
    if(error) throw error
    console.log(`App listening on port ${config.serverPort}`)
})