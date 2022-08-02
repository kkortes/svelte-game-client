import fs from 'node:fs';
import util from 'util';
import child_process from 'child_process';
const exec = util.promisify(child_process.exec);

const [path, name] = process.argv.slice(2);

if (!path) {
	console.error(
		`Error: no path to package submitted\n\nUse format:\nnode ./script/heroku-create.js PATH/TO/PACKAGE APPNAME`
	);
	process.exit(0);
}

if (!name) {
	console.error(
		`Error: no app name submitted\n\nUse format:\nnode ./script/heroku-create.js PATH/TO/PACKAGE APPNAME`
	);
	process.exit(0);
}

if (!fs.existsSync(path)) {
	console.error(`Error: there is no package on "${path}"`);
	process.exit(0);
}

const commands = [
	`heroku create ${name} --region eu`,
	`heroku buildpacks:add -a ${name} https://github.com/lstoll/heroku-buildpack-monorepo`,
	`heroku buildpacks:add -a ${name} heroku/nodejs`,
	`heroku config:add -a ${name} APP_BASE=${path}`,
	`heroku git:remote -a ${name}`,
	`git remote rename heroku ${name}`
];

(async () => {
	try {
		let i = 0;
		for (const command of commands) {
			const { stdout } = await exec(command);
			console.info(`→ ${command}\n${stdout}`);
			i++;
		}

		console.info(
			`🎉 Heroku setup successful! 🎉\n\nPush changes:\n→ git push ${name} master\n\nDelete app:\n→ heroku apps:destroy ${name}`
		);
	} catch (e) {
		console.error(e);
	}
})();
