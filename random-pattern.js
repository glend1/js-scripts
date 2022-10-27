function randomWeight(
	options,
	defaultValue
) {
	let random = Math.random();
	let total = 0;
	let { acc, array } = normalizeArray(
		options,
		(total, item) => {
			return (total += item.percent);
		},
		(i, total) => {
			return { ...i, percent: (i.percent *= 1 / total) };
		}
	);
	if (acc > 1) {
		options = array;
	}
	for (let i = 0; i < options.length; i++) {
		total += options[i].percent;
		if (total >= random) {
			return options[i].value;
		}
	}
	return defaultValue;
}

function normalizeArray(
	array,
	reduce,
	mapAndTotal
) {
	const arrCopy = JSON.parse(JSON.stringify(array));
	let acc = arrCopy.reduce(reduce, 0);
	return {
		acc,
		array: arrCopy.map((item) => {
			return mapAndTotal(item, acc);
		}),
	};
}

const arr = []
let rand
let i = 0;
const beats = 8;
while (i < beats) {
	rand = randomWeight([{ percent: 20, value: "r" }, { percent: 10, value: "dr" }, { percent: 50, value: "1" }, { percent: 30, value: "2" }, { percent: 10, value: "3" }], "1")
	if (rand == "r") {
		i += 1
	} else if (rand == "dr") {
		i += 2
	} else {
		i += parseInt(rand)
	}
	if (i > beats) {
		console.log("too big", i, beats)
		let last = i - beats
		if (rand == "r" | rand == "dr") {
			if (last == 1) {
				rand = "r"
			} else if (last == 2) {
				rand = "dr"
			} else {
				console.log("what", last)
			}
		} else {
			console.log(last, rand, "overwrite")
			rand = (parseInt(rand) - last).toString()
		}
	}
	arr.push(rand)
}

console.log(arr)