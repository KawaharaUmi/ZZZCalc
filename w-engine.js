class wEngineClass {
    // 【攻撃力】
    // 基礎値は[32,40,42,46,48,50]のいずれか。
    // Lv1ごとの上昇値は基礎値の15.666%に相当。
    // Lv上限開放1回につき基礎値の89.4%相当の上昇。
    // 【上級ステータス】
    // Lv上限解放1回につき、初期値の30%上昇する。
    // 初期値は5段階開放時の値の40%

    data = []
    className = ''
    rank = ''

    constructor() {
        const csv = wEngineDataText
        this.data = csv.trim().split('\n').map((line) => line.split(','))
        console.log(this.data)
    }

    calcAtk() {
        return
    }

    async load(path) {
        let csv = ''
        try {
            const res = await fetch(path)
            csv = res.text()
        } catch(e) {
            console.log(e.status)
            csv = wEngineDataText
        } finally {
            this.data = csv.trim().split('\n').map((line) => line.split(','))
        }
        console.log(this.data)
    }

    searchData(className, rank) {
        return this.data.filter((line) => line[0] == className && line[1] == rank)
    }

    getData(id) {
        const obj = {
            id: id,
            class: this.data[id][0],
            rank: this.data[id][1],
            name: this.data[id][2],
            nameJP: this.data[id][3],
            atk: this.data[id][4],
            atkMax: this.data[id][5],
            advSt: this.data[id][6],
            advVal: this.data[id][7],
            clsSt: this.data[id][8],
            clsI1: this.data[id][9],
            clsI5: this.data[id][10],
        }
        return obj
    }
}