const express = require("express")
const path = require("path")
const {readdir, stat, readFile} = require("fs").promises
const chokidar = require("chokidar")
const app = express()
const vhost = require("vhost")
const server = require("./server/dist/app")

const watcher = chokidar.watch(path.join(__dirname, '/sites'), {ignored: /^\./, persistent: true})
const notFoundPage = (...args) => {
    args[1].send('Page Not Found')
}
watcher.on('addDir', (path) => {
    if(path.indexOf('debug') === -1) {
        return
    }
    console.log(path, 'Path has been added')
    const notFound = app._router.stack.slice(-1).pop()
    console.log(notFound)
    if(notFound.name === 'notFoundPage') {
        app._router.stack = app._router.stack.slice(0, -1)
    }
    app.use(vhost('testplace.io', (req, res) => {
        res.send('Route added afterwards')
    }))
    app.use(notFoundPage)
    console.log(app._router.stack)
}).on('change', err => console.log(err)).on('unlink', path => console.log(path))



const dirs = async pathy => {
    let dirs = []
    for(const file of await readdir(pathy)) {
        console.log('Siting', pathy)
        if((await stat(path.join(pathy, file))).isDirectory()) {
            try {
                await readFile(path.join(`${pathy}/${file}/site.config.json`))
                console.log('Checking for: ', path.join(`${pathy}/${file}/site.config.js`))
                dirs = [...dirs, {config: path.join(`${pathy}/${file}/site.config.json`), dir: path.join(`${pathy}/${file}/`) }]
            } catch(err) {
                console.log('Checking for: ', path.join(`/${pathy}/${file}/site.config.js`), err)
                continue
            }
        }
    }
    return dirs
}



(async () => {
    try {
        const sites = await dirs(path.join(__dirname, 'sites'))
        console.log('SITES ARE: ', sites)
        for(const site of sites) {
            const rawConfig = await readFile(site.config)
            const jsonConfig = JSON.parse(rawConfig.toString())
            let tmpRoute = []
            let siteCount = 0
                //console.log(csite)
                tmpRoute[siteCount] = express.Router()
                tmpRoute[siteCount].use(express.static(`${site.dir}${jsonConfig.folder}/`))
                tmpRoute[siteCount].all(/.*/, (req, res, next) => res.sendFile(`${site.dir}${jsonConfig.folder}/${jsonConfig.entry}`))
                app.use(vhost(jsonConfig.domain, tmpRoute[siteCount]))
        }
        const mainRouter = express.Router()
        mainRouter.use('/api', server.app)
        mainRouter.use(express.static(`${__dirname}/dist`))
        mainRouter.all(/.*/, (req, res, next) => res.sendFile(`${__dirname}/dist/index.html`))
        app.use(vhost('adminapp.com', mainRouter))
        app.use(notFoundPage)
    } catch(err) {
        console.log('ERROR', err)
        return err
    }
})()
console.log('Setting 404')

app.listen(80, e => console.log('Listening'))