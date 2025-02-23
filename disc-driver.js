class discDriverClass {
    data = []
    stat = {
        main: {
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
        },
        sub: {
            "hp-p": 3,
            "hp-v": 112,
            "atk-p": 3,
            "atk-v": 19,
            "def-p": 3,
            "def-v": 15,
            "crit-r": 2.4,
            "crit-d": 4.8,
            "anm-p": 9,
            "pen-v": 9
        }
    }

    constructor() {
        const csv = discDataText
        this.data = csv.trim().split('\n').map((line) => line.split(','))
        console.log(this.data)
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

    getMainStat(name, level) {
        const base = this.stat.main[name]
        const incrace = base * 0.2 * level
        return Math.floor(base + incrace)
    }
}