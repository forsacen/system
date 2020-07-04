const {spawn}=require('child_process')
const {spawnSync}=require('child_process')

function exec(cmd,args,options){
    if(!args){
        args=[]
    }
    const shell=spawn(cmd,args,options)
    shell.stdout.on('data', (data) => {
        console.log(data.toString())
    })
    shell.stderr.on('data', (data) => {
        console.error(data.toString())
    })
    shell.on('close', (code) => {
        console.log(`子进程退出，退出码 ${code}`)
    })
}

function execSync(cmd,args,options){
    if(!args){
        args=[]
    }
    return spawnSync(cmd,args,options)
}

function execPromsify(cmd,args,options,ignoreErr=false){
    return new Promise(function (resolve,reject) {
        if(!args){
            args=[]
        }
        const shell=spawn(cmd,args,options)
        shell.stdout.on('data', (data) => {
            console.log(data.toString())
        })
        shell.stderr.on('data', (data) => {
            console.error(data.toString())
            if(ignoreErr){
                reject()
            }
        })
        shell.on('close', (code) => {
            console.log(`子进程退出，退出码 ${code}`)
            resolve()
        })
    })
}

function execBackgrand(cmd,args,options){
    if(!args){
        args=[]
    }
    if(!options){
        options={}
    }
    args.unshift(cmd)
    args.push('&')
    cmd='nohup'
    options.detached=true
    const shell=spawn(cmd,args,options)
    shell.stdout.on('data', (data) => {
        console.log(data.toString())
    })
    shell.stderr.on('data', (data) => {
        console.error(data.toString())
    })
    shell.on('close', (code) => {
        console.log(`子进程退出，退出码 ${code}`)
    })
}

module.exports={
    exec:exec,
    execSync:execSync,
    execPromsify:execPromsify,
    execBackgrand:execBackgrand,
}