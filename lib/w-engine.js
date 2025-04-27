class wEngineClass {
    // 【攻撃力】
    // 基礎値は[32,40,42,46,48,50]のいずれか。
    // Lv1ごとの上昇値は基礎値の15.666%に相当。
    // Lv上限開放1回につき基礎値の89.4%相当の上昇。
    // 【上級ステータス】
    // Lv上限解放1回につき、初期値の30%上昇する。
    // 初期値は5段階開放時の値の40%

    static data = []
    static types = ['Attack', 'Anomaly', 'Stun', 'Defense', 'Support']
    static ranks = ['S', 'A', 'B']
    static valuesLimit = {
        level: 60,
        promotion: 5,
        grade: 5
    }
    static selector = {
        types: wEngineClass.types[0],
        ranks: wEngineClass.ranks[0]
    }
    static {
        const list = wEngineDataCSV.trim().split('\n')
            .map((line) => line.split(',')
            .map(item => isNaN(Number(item)) ? item : Number(item)))
        
        for(let line of list) {
            const obj = {
                id: line[0],
                type: line[1],
                rank: line[2],
                name: {jp: line[4], en: line[3]},
                atk: line[6],
                advSt: {[line[7]]: line[8]},
                buff: {
                    title: line[9],
                    desc: line[10],
                    include: line[11] == 'TRUE' ? true : false,
                    effect: [],
                }
            }
            for(let i = 0; i < line.length - 11 ;i ++) {
                const param = line.slice(12 + (13 * i), 12 + (13 * i) + 13)
                if(param.find((val) => val)) {
                    obj.buff.effect.push(
                        {
                            active: param[0],
                            range: param[1],
                            stack: param[2],
                            comparison: {left: param[3], operator: param[4], right: String(param[5]).split(' ')},
                            stat: param[7],
                            val: param.slice(8),
                        }
                    )
                }
            }
            wEngineClass.data.push(obj)
        }
        console.log(wEngineClass.data)
    }
    static pullItemList(type, rank) {
        return wEngineClass.data.filter(obj => (type == '*' ? true : obj.type == type) && (rank == '*' ? true : obj.rank == rank))
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
                [line[7]]: line[8]
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

