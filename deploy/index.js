const scpClient = require("scp2");
const ora = require("ora");
const chalk = require("chalk");
const servers = require("./products");
const server = servers[0];
const spinner = ora("正在发布到" + (process.env.NODE_ENV === "production" ? "生产" : "测试" + "服务器。。。。"));
const Client = require("ssh2").Client;

const conn = new Client();

conn
	.on("ready", function () {
		// *rm 删除 web 文件，\n 是换行，执行换行
		let dels = "";
		server.del.forEach(item => {
			dels += `rm -rf ${item}\n`;
		});

		conn.exec(dels, function (err, stream) {
			if (err) throw err;
			stream
				.on("close", function (code, signal) {
					console.log(chalk.gray(code, signal));
					// 在执行 shell 命令后，将部署的代码放在此处
					spinner.start();
					scpClient.scp(
						"web/",
						{
							host: server.host,
							port: server.port,
							username: server.username,
							password: server.password,
							path: server.path
						},
						function (err) {
							spinner.stop();
							if (err) {
								console.log(chalk.red("部署失败。。。"));
								throw err;
							} else {
								console.log(
									chalk.green("Success! 成功发布到" + (process.env.NODE_ENV === "production" ? "生产" : "测试" + "服务器！\n"))
								);
							}
						}
					);
					conn.end();
				})
				.on("data", function (data) {
					console.log("STDOUT: " + data);
				})
				.stderr("data", function (data) {
					console.log("STDERR: " + data);
				});
		});
	})
	.connect({
		host: server.host,
		port: server.port,
		username: server.username,
		password: server.password
	});
