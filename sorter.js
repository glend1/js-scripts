const FS = require('fs');
const PATH = require('path');
const SPAWN = require('child_process');

const baseDir = 'D:\\Media\\keep\\process';

var i = 1;

function getExt(path) {
	return PATH.parse(path).ext;
};

function log(type, path, obj) {
	console.log(`${i++}. ${type}: ${path} - ${JSON.stringify(obj)}`)
};

function contains(path) {
	if (!path.toLowerCase().includes(".zip")) {
		if (path.toLowerCase().includes("contact") || path.toLowerCase().includes("thumb") || path.toLowerCase().includes("screen") || path.toLowerCase().includes("preview") || path.toLowerCase().includes("cover")) {
			return true;
		};
	};
	return false;
};

function moveAndDelete(path, files) {
	let dirs = path.split(PATH.sep);
	let newName = dirs.pop();
	dirs[0] = `${dirs[0]}\\`;
	let oldName = files[0].name;
	newName = `${newName}${getExt(oldName)}`;
	let newPath = PATH.resolve(...dirs, newName);
	let oldPath = PATH.resolve(path, oldName);
	/*FS.access(oldPath, FS.constants.F_OK, (err) => {
	  console.log(`${oldPath} ${err ? 'does not exist' : 'exists'}`);
	});
	console.log(`move ${oldPath} to ${newPath}`);*/

	FS.renameSync(oldPath, newPath);
	FS.rmSync(path);
};

function zip(path) {
	let dirs = path.split(PATH.sep);
	let newName = dirs.pop();
	dirs[0] = `${dirs[0]}\\`;
	let zip = (i - 1).toString(10);
	let ext = ".zip"
	let file = PATH.resolve(...dirs, zip);
	let newFile = PATH.resolve(...dirs, `${newName}${ext}`);
	let oldFile = `${file}${ext}`
	let command = `\"C:\\Program Files\\7-Zip\\7z.exe\" a \"${oldFile}\" \"${path}\"`;
	SPAWN.execSync(command);
	FS.renameSync(oldFile, newFile);
	//console.log(result.toString('utf8'));
	FS.rmSync(path, { recursive: true });
};

function folder(path) {
	FS.readdir(path, { withFileTypes: true }, function (err, files) {
		let fileTypes = {};
		let isEmpty = true;
		let count = 0;
		files.forEach(function (file) {
			isEmpty = false;
			let currPath = `${path}\\${file.name}`;
			if (contains(file.name)) {
				log("FILES", currPath, null);
			};
			if (file.isDirectory()) {
				folder(currPath);
			} else if (file.isFile()) {
				let ext = getExt(currPath);
				if (!fileTypes[ext]) {
					fileTypes[ext] = 0;
					count++;
				};
				fileTypes[ext]++;
			};
		});
		if (isEmpty) {
			//nothing to do here
			//checks for no files specifically, there could still be folders
			log("EMPTY", path, fileTypes);
			//} else if (contains(path)) {
			//log("INCLUDES", path, fileTypes);
		} else if (files.length <= 1) {
			if (fileTypes[".zip"] == 1) {
				//E:\porn\downloaded photos\models
				//1 zip 
				log("INZIP1", path, fileTypes);
				//	PROCCESS THIS
				//moveAndDelete(path, files);



			} else {
				log("1THING", path, fileTypes);
			};
		} else if (JSON.stringify(fileTypes) === JSON.stringify({})) {
			//nothing to do here
			//these are folders with something in
			//log("NOT EMPTY", path, fileTypes);
		} else if (count >= 2) {
			log("MULTIPLE", path, fileTypes);
		} else if (fileTypes[".zip"] == 2) {
			//E:\porn\downloaded photos\castingcouch-x\pix\August Featuring August Ames
			//2 zips
			//log("ZIP2", path, fileTypes);
		} else if (fileTypes[".zip"]) {
			//nothing to do here
			//checks for zips
			//log("ZIP", path, fileTypes);
		} else if (fileTypes[".rar"]) {
			//nothing to do here
			//log("RAR", path, fileTypes);
		} else if (fileTypes[".7z"]) {
			//nothing to do here
			//checks for 7z
			//log("7Z", path, fileTypes);
		} else if (fileTypes[".jpg"] < 10 || fileTypes[".JPG"] < 10) {
			//lots of work here
			//less than 10 jpg
			//these have jpg images
			log("JPG10", path, fileTypes);
		} else if (fileTypes[".txt"]) {
			//nothing to do here
			log("TXT", path, fileTypes);
		} else if (fileTypes[".png"]) {
			//nothing to do here
			log("PNG", path, fileTypes);
		} else if (fileTypes[".jpg"] || fileTypes[".JPG"] || fileTypes[".jpeg"]) {
			//folders full of jpgs
			log("JPG", path, fileTypes);
			//	PROCCESS THIS
			zip(path);


		} else {
			log("ELSE", path, fileTypes);
		};
	});
};

folder(baseDir);