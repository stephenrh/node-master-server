import express from 'express'
import path from 'path'
import fileUpload from 'express-fileupload'
class Server {
    public app = express()
    autoRoutes = require('express-auto-routes')(this.app)
    constructor() {
        this.app.use(fileUpload())
        this.autoRoutes(path.join(__dirname, './controllers'))
    }
}

module.exports = new Server()
