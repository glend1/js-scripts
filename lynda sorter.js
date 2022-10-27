const FS = require('fs');
const PATH = require('path');

const baseDir = 'E:\\Learning\\computer science\\administration\\Network Administration';

function isMp4(path) {
	return PATH.parse(path).ext == ".mp4";
};

function rename(path) {
	let dirs = path.split(PATH.sep);
	let fileName = dirs.pop();


	//dirs[0] = `${dirs[0]}`;
	let number = fileName.substring(fileName.length - 10, fileName.length - 4);
	let string = fileName.substring(0, fileName.length - 11);
	let newFileName = `\\${number} ${string}.mp4`;
	let newPath = PATH.join(...dirs, newFileName);
	console.log(newPath);
	//console.log("move " + path + " to " + newPath);
	//console.log(dirs);


	//let oldPath = PATH.resolve(path, oldName);

	/*FS.access(oldPath, FS.constants.F_OK, (err) => {
	  console.log(`${oldPath} ${err ? 'does not exist' : 'exists'}`);
	});
	console.log(`move ${oldPath} to ${newPath}`);*/

	FS.renameSync(path, newPath);
	//FS.rmdirSync(path);
};

function folder(path) {
	FS.readdir(path, { withFileTypes: true }, function (err, files) {
		let fileTypes = {};
		let isEmpty = true;
		let count = 0;
		files.forEach(function (file) {
			let currPath = `${path}\\${file.name}`;
			if (file.isDirectory()) {
				folder(currPath);
			} else if (file.isFile()) {
				if (isMp4(currPath)) {
					rename(currPath);
					//console.log(currPath);
				}
			}
		});
	})
};

folder(baseDir);