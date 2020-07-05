module.exports={
    //tcp优化
    tcp:{
        done:false,
        need:false,
        options:{
            finTimeout:30,
            orphanRetries:2,
            retries2:5,
        }
    },
    //最大文件打开数
    fileOpenLimit:{
        done:false,
        need:false,
        options:{
            fileMax:100000,
            ulimit:100000,
        }
    },
    //mongodb
    mongodb:{
        done:false,
        need:true,
        options:{
            url:'https://repo.mongodb.org/apt/debian/dists/stretch/mongodb-org/4.2/main/binary-amd64/mongodb-org-server_4.2.8_amd64.deb',
            bindIp:'0.0.0.0',
            port:'27017',
            auth:{
                user:'admin',
                password:'333221abc',
            }
        }
    },
    //开机启动
    systemRun:{
        done:false,
        need:false,
    }
}