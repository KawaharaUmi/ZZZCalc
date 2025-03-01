class discClass {
    static data = []
    static {
        discClass.data = discDataCSV.trim().split('\n').map((line) => line.split(',').map(item => item ? isNaN(Number(item)) ? item : Math.round(Number(item) * 10) / 10 : undefined))
    }
    static valuesRange = {
        level: {min: 0, max: 15},
        subLevel: {min: 0, max: 5}
    }

    static main = {
        "hp-p": 7.5,
        "hp-v": 550,
        "atk-p": 7.5,
        "atk-v": 79,
        "def-p": 12,
        "def-v": 46,
        "imp-p": 4.5,
        "crit-r": 6,
        "crit-d": 12,
        "anm-p": 23,
        "anm-b": 7.5,
        "pen-r": 6,
        "en-reg": 15,
        "bonus-phy": 7.5,
        'bonus-fire': 7.5,
        'bonus-ice': 7.5,
        'bonus-ele': 7.5,
        'bonus-eth': 7.5
    }

    static mainTable = [
        'hp-v',     // Partition 1
        'atk-v',    // Partition 2
        'def-v',    // Partition 3
        ['hp-p','atk-p','def-p','crit-r','crit-d','anm-p'],
        ['hp-p','atk-p','def-p','pen-r','bonus-phy','bonus-fire','bonus-ice','bonus-ele','bonus-eth'],
        ['hp-p','atk-p','def-p','imp-p','anm-b','en-reg']
    ]

    static sub = {
        "hp-p": 3,
        "hp-v": 112,
        "atk-p": 3,
        "atk-v": 19,
        "def-p": 4.8,
        "def-v": 15,
        "crit-r": 2.4,
        "crit-d": 4.8,
        "anm-p": 9,
        "pen-v": 9
    }

    static getDiscType() {

    }

    getData(id) {
        const obj = {
            id: id,
            name: this.data[id][0],
            nameJP: this.data[id][1],
            setSt: this.data[id][2],
            setVal: this.data[id][3]
        }
        return obj
    }

    static getMainStat(name, level) {
        const base = discClass.main[name]
        const incrace = base * 0.2 * level
        return Math.floor(base + incrace)
    }

    static getSubStat(name, level) {
        const base = discClass.sub[name] * 10
        return base * (Number(level)+1) / 10
    }
}