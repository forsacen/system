const {spawn}=require('child_process')
const {spawnSync}=require('child_process')

function exec(cmd,args,options){
    if(!args){
        args=[]
    }
    const cp=spawn(cmd,args,options)
    cp.stdout.on('data', (data) => {
        console.log(data.toString())
    })
    cp.stderr.on('error', (err) => {
        console.error(err)
    })
    cp.on('close', (code) => {
        console.log(`子进程退出，退出码 ${code}`)
    })
    return cp
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
        const cp=spawn(cmd,args,options)
        cp.stdout.on('data', (data) => {
            console.log(data.toString())
        })
        cp.stderr.on('error', (err) => {
            console.error(err)
            if(!ignoreErr){
                reject(err)
            }
        })
        cp.on('close', (code) => {
            console.log(`子进程退出，退出码 ${code}`)
            resolve(cp)
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
    const cp=spawn(cmd,args,options)
    cp.stdout.on('data', (data) => {
        console.log(data.toString())
    })
    cp.stderr.on('error', (err) => {
        console.error(err)
    })
    cp.on('close', (code) => {
        console.log(`子进程退出，退出码 ${code}`)
    })
}

module.exports={
    exec:exec,
    execSync:execSync,
    execPromsify:execPromsify,
    execBackgrand:execBackgrand,
}