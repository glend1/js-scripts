var notes = [
    "A",
    "A#/Bb",
    "B",
    "C",
    "C#/Db",
    "D",
    "D#/Eb",
    "E",
    "F",
    "F#/Gb",
    "G",
    "G#/Ab"
];

function getNote(i) {
    return notes[i % notes.length];
};

class Mode {
    constructor(mode, number, root, intervals) {
        this.mode = mode;
        this.number = number;
        this.root = root;
        this.interval = intervals;
        this.findRoot = function () {
            let i = 0;
            while (i < notes.length) {
                if (getNote(i) == this.root) {
                    return i;
                };
                i++;
            };
        },
            this.makeScales = function () {
                let root = this.findRoot();
                let j = 0;
                while (j < notes.length) {
                    let scale = [];
                    let currentNote = root;
                    for (let i = 0; i < intervals.length; i++) {
                        scale.push(getNote(currentNote));
                        currentNote += intervals[i];
                    }
                    data.scales.push(new Scale(this.mode, getNote(root), scale));
                    root++;
                    j++;
                };
            };
    }
}

var modes = [
    new Mode("Ionian", 1, "C", [2,2,1,2,2,2,1]),
    new Mode("Dorian", 2, "D", [2,1,2,2,2,1,2]),
    new Mode("Phrygian", 3, "E", [1,2,2,2,1,2,2]),
    new Mode("Lydian", 4, "F", [2,2,2,1,2,2,1]),
    new Mode("Mixolydian", 5, "G", [2,2,1,2,2,1,2]),
    new Mode("Aeolian", 6, "A", [2,1,2,2,1,2,2]),
    new Mode("Locrian", 7, "B", [1,2,2,1,2,2,2])
];

class Scale {
    constructor(mode, root, scale) {
        this.mode = mode;
        this.root = root;
        this.scale = scale;
    }
}
;

class ScaleEntry {
    constructor(mode, root, scale) {
        this.mode = mode;
        this.root = root;
        this.scale = scale;
    }
}
;

class ScaleSort {
    constructor() {
        this.scales = new Array();
        this.getMode = function (mode) {
            let arr = [];
            for (let i = 0; i < this.scales.length; i++) {
                let scale = this.scales[i];
                if (scale.mode == mode) {
                    arr.push(scale);
                }
            }
            return arr;
        };
        this.getRoot = function (root) {
            let arr = [];
            for (let i = 0; i < this.scales.length; i++) {
                let scale = this.scales[i];
                if (scale.root == root) {
                    arr.push(scale);
                }
            }
            return arr;
        };
        this.getScale = function (mode, root) {
            let arr = [];
            for (let i = 0; i < this.scales.length; i++) {
                let scale = this.scales[i];
                if (scale.root == root && scale.mode == mode) {
                    arr.push(scale);
                }
            }
            return arr;
        };
        this.groupByScale = function () {
            var data = [];
            for (let i = 0; i < this.scales.length; i++) {
                let scale = this.scales[i];
                let sortedScale = scale.scale.sort();
                if (data[sortedScale] == null) {
                    data[sortedScale] = [];

                };
                data[sortedScale].push(new ScaleEntry(scale.mode, scale.root, scale.scale));
            }
            return data;
        };
    }
}

var data = new ScaleSort();

for (let i = 0; i < modes.length; i++) {
let mode = modes[i];
mode.makeScales();
};

//console.log(data.getMode("Phrygian"));
//console.log(data.getRoot("C"));
//console.log(data.getScale("Phrygian", "E"));

console.log(data.groupByScale());
