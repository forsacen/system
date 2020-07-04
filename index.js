const cfg=require('./config')
const shell=require('./shell')
const fs=require('fs')
const process=require('process')
async function optimizeTcp(){

}

async function changeFileOpenLimit(){
    
}

async function installMongodb(){
    try {
        await shell.execPromsify('wget',['-O','mongodb.deb',cfg.mongodb.options.url],{cwd:__dirname})
        await shell.execPromsify('dpkg',['-i','mongodb.deb'],{cwd:__dirname})
        await shell.execPromsify('rm',['mongodb.deb'],{cwd:__dirname})
        await shell.execPromsify('sed',['-i',`s/bindIp: 127.0.0.1/bindIp: ${cfg.mongodb.options.bindIp}/g`,'/etc/mongod.conf'])
        if(cfg.mongodb.options.port !=='27017'){
            await shell.execPromsify('sed',['-i',`s/port: 27017/port: ${cfg.mongodb.options.port}/g`,'/etc/mongod.conf'])
        }
    }catch (e) {
        process.exit(1)
    }
}

async function setSystemRun() {

}

;(async function(){
    if(!cfg.mongodb.done && cfg.mongodb.need){
        await installMongodb()
    }
})()