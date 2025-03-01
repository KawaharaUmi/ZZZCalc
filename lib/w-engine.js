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
    static valuesLimit = {
        level: 60,
        promotion: 5,
        grade: 5
    }

    className = ''
    rank = ''

    searchData(className, rank) {
        return this.data.filter((line) => line[0] == className && line[1] == rank)
    }

    static pullData(id) {
        const line = wEngineClass.data[id]
        const obj = {
            type: line[1],
            rank: line[2],
            name: line[4],
            atk: line[6],
            advSt: {
                type: line[7],
                val: line[8]
            },
            effect: {
                field: {
                    type: line[9],
                    val: line.slice(10,14)
                },

            }
        }
        return obj
    }
}