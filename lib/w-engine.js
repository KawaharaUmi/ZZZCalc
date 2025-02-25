class wEngineClass {
    // 【攻撃力】
    // 基礎値は[32,40,42,46,48,50]のいずれか。
    // Lv1ごとの上昇値は基礎値の15.666%に相当。
    // Lv上限開放1回につき基礎値の89.4%相当の上昇。
    // 【上級ステータス】
    // Lv上限解放1回につき、初期値の30%上昇する。
    // 初期値は5段階開放時の値の40%

    static data = []
    static {
        wEngineClass.data = wEngineDataCSV.trim().split('\n').map((line) => line.split(',').map(item => isNaN(Number(item)) ? item : Number(item)))
    }

    className = ''
    rank = ''

    searchData(className, rank) {
        return this.data.filter((line) => line[0] == className && line[1] == rank)
    }

    static pullData(id) {
        const line = wEngineClass.data[id]
        const obj = {
            id: id,
            type: line[0],
            rank: line[1],
            name: line[3],
            atk: line[5],
            subType: line[6],
            subVal: line[7],
            clsSt: line[8],
            clsI1: line[9],
            clsI5: line[10],
        }
        return obj
    }
}