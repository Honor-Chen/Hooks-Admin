const SERVER_LIST = [
	{
		id: 0,
		name: "服务名称",
		host: "192.168.1.110", // *主机地址
		port: 8001,
		username: "root",
		password: "123456",
		path: "/data/web/xxx/web", // *服务器上，静态资源存放路径
		del: "" // *删除一些无法替换的模块
	}
];

module.exports = SERVER_LIST;
