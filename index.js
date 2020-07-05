const cfg=require('./config')
const shell=require('./shell')
const fs=require('fs')
const process=require('process')
const MongoClient=require('mongodb').MongoClient
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
        const cp=shell.exec('mongod',['--config','/etc/mongod.conf'],{cwd:__dirname})
        await new Promise(function (resolve) {
            setTimeout(resolve,2000)
        })
        var mongoClient=await MongoClient.connect(`mongodb://127.0.0.1:${cfg.mongodb.options.port}`,{ useUnifiedTopology: true})
        var db=mongoClient.db('admin')
        await db.addUser(cfg.mongodb.options.auth.user,cfg.mongodb.options.auth.password,
            {roles:[{role: "root", db: "admin"}]})
        cp.kill()
        await new Promise(function (resolve) {
            setTimeout(resolve,2000)
        })
        //await shell.execPromsify('sed',['-i','s/#security:/security:/g','/etc/mongod.conf'])
        //await shell.execPromsify('sed',['-i','/security:/ a\  authorization: enabled','/etc/mongod.conf'])
        //await
    }catch (e) {
        console.error(e)
        process.exit(1)
    }
}

async function SystemRun() {
    try{
        var fd=fs.openSync('/etc/systemd/system/rc-local.service','wx')
        fs.writeFileSync(fd,`[Unit]
Description=/etc/rc.local
ConditionPathExists=/etc/rc.local

[Service]
Type=forking
ExecStart=/etc/rc.local start
TimeoutSec=0
StandardOutput=tty
RemainAfterExit=yes
SysVStartPriority=99

[Install]
WantedBy=multi-user.target`)
    }catch (e) {
        console.log('/etc/systemd/system/rc-local.service exist')
    }finally {
        if (fd !== undefined)
            fs.closeSync(fd)
    }
    try{
        fd=fs.openSync('/etc/rc.local','wx')
        fs.writeFileSync(fd,`#!/bin/sh -e
#
# rc.local  
#
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "exit 0" on success or any other
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.

# bash /root/bindip.sh

exit 0`)
    }catch (e) {
        console.log('/etc/rc.local exist')
    }finally {
        if (fd !== undefined)
            fs.closeSync(fd)
    }
    for(let i=0;i<cfg.systemRun.command.length;i++){
        await shell.execPromsify('sed',['-i',`/exit 0/ i\\${cfg.systemRun.command[i]}`,'/etc/rc.local'])
    }
    /*try{
        await shell.execPromsify('chmod',['+x','/etc/rc.local'],{cwd:__dirname})
        await shell.execPromsify('systemctl',['enable','rc-local'],{cwd:__dirname})
        await shell.execPromsify('systemctl',['start','rc-local.service'],{cwd:__dirname})
    }catch (e) {
        console.error(e)
        process.exit(1)
    }*/
}

;(async function(){
    //if(!cfg.mongodb.done && cfg.mongodb.need){
        //await installMongodb()
    //}
    await SystemRun()
})()