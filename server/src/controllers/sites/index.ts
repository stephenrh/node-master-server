import { Request, Response, NextFunction } from 'express'
import path from 'path'
import fs from 'fs'
import unzip from 'unzip'
import { inspect } from 'util'
import { promises, readdir } from 'fs'
import fstream from 'fs'
import rimraf from 'rimraf'
import { UploadedFile } from 'express-fileupload';
class SiteController {

    public get = async (...args: [Request, Response, NextFunction]) => {
        return args[1].send(await this.installedSites())
    }

    public post = async(...args: [Request, Response, NextFunction]) => {
        const request = inspect(args[0])
        const file = args[0].files!.file as UploadedFile
        if(file.mimetype !== 'application/x-zip-compressed') {
            return args[1].status(400).json('Incorrect File Type')
        }
        await file.mv('./tmp.zip')
        const fileStream = fs.createReadStream('./tmp.zip')
        fileStream.pipe(unzip.Extract({path: './sites/test.site.io'})).on('close', (...args: any[]) => {
            fs.readdir('./sites/test.site.io', (err, files) => {
                if(files.indexOf('site.config.json') === -1) {
                   rimraf('./sites/test.site.io', err => {
                       console.log('Unlinked')
                   })
                }
            })
        })
    }


    private async installedSites(): Promise<any> {
        const siteDir = './sites'
        const dirs = await promises.readdir(siteDir)
        let rootSites: ISites[] = []
        let subSites: any[] = []
        let rootSiteCount = 0
        for(const dir of dirs) {
            let siteObj: ISites = {root: null, sub: []}
            const configFile = path.join(`${siteDir}/${dir}/site.config.json`)
            try {
                const rawConfig = await promises.readFile(configFile)
                const jsonConfig = JSON.parse(rawConfig.toString())
                siteObj.root = jsonConfig
                const subDirs = await promises.readdir(`${siteDir}/${dir}`)
                for(const subDir of subDirs) {
                    if((await promises.stat(path.join(`${siteDir}/${dir}/${subDir}`))).isDirectory()) {
                        try {
                            console.log('READING IN: ', `${siteDir}/${dir}/${subDir}/site.config.json`)
                            const rawSubConfig = await promises.readFile(`${siteDir}/${dir}/${subDir}/site.config.json`)
                            const jsonSubConfig = JSON.parse(rawSubConfig.toString())
                            console.log('Adding sub to: ', rootSites[rootSiteCount])
                            siteObj.sub!.push(jsonSubConfig)
                        } catch (err) {
                            console.log('must be something else...', err)
                            continue
                        }
                    } else {
                        console.log(`Looks like ${subDir} is a file`)
                    }
                }
                console.log(subDirs)
            } catch(err) {
                console.log(err)
                continue
            }
            rootSites.push(siteObj)
            rootSiteCount++
        }
        return { rootSites }
    }
}

module.exports = new SiteController()

interface ISites {
    root: any
    sub: any[]
}