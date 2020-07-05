module.exports={
	"tcp": {
		"done": false,
		"need": false,
		"options": {
			"finTimeout": 30,
			"orphanRetries": 2,
			"retries2": 5
		}
	},
	"fileOpenLimit": {
		"done": false,
		"need": false,
		"options": {
			"fileMax": 100000,
			"ulimit": 100000
		}
	},
	"mongodb": {
		"done": false,
		"need": true,
		"options": {
			"url": "https://repo.mongodb.org/apt/debian/dists/stretch/mongodb-org/4.2/main/binary-amd64/mongodb-org-server_4.2.8_amd64.deb",
			"bindIp": "0.0.0.0",
			"port": 27017,
			"auth": {
				"user": "admin",
				"password": "333221abc"
			}
		}
	},
	"systemRun": {
		"done": false,
		"need": true,
		"command": [
			"nohup mongod --config /etc/mongod.conf &"
		]
	}
}