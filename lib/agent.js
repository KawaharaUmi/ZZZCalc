export default class agentClass {
    static agentData = charData
    static skillData = []
    static types = ['Attack', 'Anomaly', 'Stun', 'Defense', 'Support']
    static ranks = ['S', 'A']
    static rangeLimits = { // エージェントの各プロパティにおける最小値と最大値
        level: {min: 1, max: 60},
        promotion: {min: 0, max: 5},
        mindscape: {min: 0, max: 6},
        coreLevel: {min: 0, max: 6},
        critR: 100,
        penR: 100,
        skills: {
            active: {min: 1, max: 16}
        },
        discLevel: {
            main: {min: 0, max: 15},
            sub: {min: 0, max: 5}
        }
    }
    static levelCoefficient = levelCoefficient
    static activeBuff = {rate: 0, int: 0}
    static selector = {
        type: agentClass.types[0],
        rank: agentClass.ranks[0]
    }

    static {
        /*
        agentClass.agentData = agentDataCSV.trim().split('\n')
            .map(line => line.split(',')
                .map(item => item
                    ? isNaN(Number(item))
                        ? item
                        : Math.round(Number(item) * 10) / 10
                    : undefined
                )
            )
                */
        agentClass.skillData = skillDataCSV.trim().split('\n')
        .map(line => line.split(',')
            .map(item => item
                ? isNaN(Number(item))
                    ? item
                    : Math.round(Number(item) * 10) / 10
                : undefined
            )
        )
    }

    charId = 0
    get name () { return agentClass.agentData[this.charId].name }
    get type () { return agentClass.agentData[this.charId].type }
    get rank () { return agentClass.agentData[this.charId].rank }
    get attribute () {
        return {primary: agentClass.agentData[this.charId].attr.primary,
            secondary: agentClass.agentData[this.charId].attr.secondary}
    }
    get mindscape () {
        return agentClass.agentData[this.charId].mindscape
    }
    _mindscapeLevel = 0
    get mindscapeLevel() {
        return this._mindscapeLevel
    }
    set mindscapeLevel(val) {
        if(val < 3) {
            this.skills.levelLimit = 12
        } else if(val < 5) {
            this.skills.levelLimit = 14
        } else {
            this.skills.levelLimit = 16
        }
        this._mindscapeLevel = val
    }
    promotion = 5
    level = 60

    get core () { return agentClass.agentData[this.charId].core }
    coreLevel = 6

    get base () {
        const core = {
            [this.core.odd.stat]: (this.core.odd.val * 10) * Math.round(this.coreLevel / 2) / 10,
            [this.core.even.stat]: (this.core.even.val * 10) * Math.floor(this.coreLevel / 2) / 10,
        }
        const hp = agentClass.agentData[this.charId].status.hp + (core.hp ? core.hp : 0)
        const atk = agentClass.agentData[this.charId].status.atk + (core.atk ? core.atk : 0)
        const def = agentClass.agentData[this.charId].status.def + (core.def ? core.def : 0)
        const imp = agentClass.agentData[this.charId].status.imp + (core.imp ? core.imp : 0)
        const critR = agentClass.agentData[this.charId].status.critR + (core.critR ? core.critR : 0)
        const critD = agentClass.agentData[this.charId].status.critD + (core.critD ? core.critD : 0)
        const anmB = agentClass.agentData[this.charId].status.anmB + (core.anmB ? core.anmB : 0)
        const anmP = agentClass.agentData[this.charId].status.anmP + (core.anmP ? core.anmP : 0)
        const penR = agentClass.agentData[this.charId].status.penR + (core.penR ? core.penR : 0)
        const enReg = agentClass.agentData[this.charId].status.enReg + (core.enReg ? core.enReg : 0)
        return {hp: hp, atk: atk, def: def, imp: imp, critR: critR, critD: critD, anmB: anmB, anmP: anmP, penR: penR, enReg: enReg}
    }

    get hp() {
        return Math.floor(this.base.hp * (100 + (this.wEngine.data.advSt['hp-p'] ? this.wEngine.data.advSt['hp-p'] : 0) + this.equipment.discTotal['hp-p']) / 100) + this.equipment.discTotal['hp-v']
    }
    get atk() {
        return Math.floor((this.base.atk + this.wEngine.data.atk) * (100 + (this.wEngine.data.advSt['atk-p'] ? this.wEngine.data.advSt['atk-p'] : 0) + this.equipment.discTotal['atk-p']) / 100) + this.equipment.discTotal['atk-v']
    }
    get def() {
        return Math.floor(this.base.def * (100 + (this.wEngine.data.advSt['def-p'] ? this.wEngine.data.advSt['def-p'] : 0) + this.equipment.discTotal['def-p']) / 100) + this.equipment.discTotal['def-v']
    }
    get imp() {
        return Math.floor(this.base.imp * (100 + (this.wEngine.data.advSt['imp-p'] ? this.wEngine.data.advSt['imp-p'] : 0) + this.equipment.discTotal['imp-p']) / 100)
    }
    get critR() {
        const result = (this.base.critR * 10 + (this.wEngine.data.advSt['crit-r'] ? this.wEngine.data.advSt['crit-r'] : 0) * 10 + this.equipment.discTotal['crit-r'] * 10) / 10
        return result > 100 ? 100 : result
    }
    get critD() {
        return this.base.critD + (this.wEngine.data.advSt['crit-d'] ? this.wEngine.data.advSt['crit-d'] : 0) + this.equipment.discTotal['crit-d']
    }
    get anmB() {
        return Math.floor(this.base.anmB * (100 + (this.wEngine.data.advSt['anm-b'] ? this.wEngine.data.advSt['anm-b'] : 0) + this.equipment.discTotal['anm-b']) / 100)
    }
    get anmP() {
        return this.base.anmP + (this.wEngine.data.advSt['anm-p'] ? this.wEngine.data.advSt['anm-p'] : 0) + this.equipment.discTotal['anm-p']
    }
    get penR() {
        const result = this.base.penR + (this.wEngine.data.advSt['pen-r'] ? this.wEngine.data.advSt['pen-r'] : 0) + this.equipment.discTotal['pen-r']
        return result > 100 ? 100 : result
    }
    get penV() {
        return (this.wEngine.data.advSt['pen-v'] ? this.wEngine.data.advSt['pen-v'] : 0) + this.equipment.discTotal['pen-v']
    }
    get enReg() {
        return Math.floor(this.base.enReg * 10 * (100 + (this.wEngine.data.advSt['en-reg'] ? this.wEngine.data.advSt['en-reg'] : 0) + this.equipment.discTotal['en-reg']) / 100) / 10
    }
    get bonusPhy() {
        return (this.wEngine.data.advSt['bonus-phy'] ? this.wEngine.data.advSt['bonus-phy'] : 0) + this.equipment.discTotal['bonus-phy']
    }
    get bonusFire() {
        return (this.wEngine.data.advSt['bonus-fire'] ? this.wEngine.data.advSt['bonus-fire'] : 0) + this.equipment.discTotal['bonus-fire']
    }
    get bonusIce() {
        return (this.wEngine.data.advSt['bonus-ice'] ? this.wEngine.data.advSt['bonus-ice'] : 0) + this.equipment.discTotal['bonus-ice']
    }
    get bonusEle() {
        return (this.wEngine.data.advSt['bonus-ele'] ? this.wEngine.data.advSt['bonus-ele'] : 0) + this.equipment.discTotal['bonus-ele']
    }
    get bonusEth() {
        return (this.wEngine.data.advSt['bonus-eth'] ? this.wEngine.data.advSt['bonus-eth'] : 0) + this.equipment.discTotal['bonus-eth']
    }
    get bonusDmg() {
        return (this.wEngine.data.advSt['bonus-dmg'] ? this.wEngine.data.advSt['bonus-dmg'] : 0)
    }

    buffs = {}

    skills = {
        _levelLimit : 12,
        get levelLimit () {
            return this._levelLimit
        },
        set levelLimit (val) {
            this._levelLimit = val
            for(let key of define.skillType) {
                if(this[key].level > this._levelLimit) this[key].level = this._levelLimit 
            }
            if(this.levelBatch > val) this.levelBatch = val
        },
        _levelBatch : 11,
        get levelBatch() {
            return this._levelBatch
        },
        set levelBatch(val) {
            for(let key of define.skillType) {
                this[key].level = val
            }
            this._levelBatch = val
        },
        basic: {
            level: 11,
            data: []
        },
        dodge: {
            level: 11,
            data: []
        },
        assist: {
            level: 11,
            data: []
        },
        special: {
            level: 11,
            data: []
        },
        chain: {
            level: 11,
            data: []
        }
    }
    wEngine = {
        id: 0,
        level: 60,
        grade: 5,
        get data() {return wEngineClass.data[this.id]},

    }
    equipment = {
        discPattern: 0, // 0: 4pieces+2pieces, 1: 2pieces*3sets, 2: Free
        discSet: [0,1,null],
        disc: [
            {
                id: 0,
                level: 15,
                main: 'hp-v',
                sub: [
                    {type: 'atk-p', level: 0},
                    {type: 'crit-r', level: 0},
                    {type: 'crit-d', level: 0},
                    {type: 'anm-p', level: 0}
                ]
            }
        ],
        discTotal: {
            'hp-p': 0,
            'hp-v': 0,
            'atk-p': 0,
            'atk-v': 0,
            'def-p': 0,
            'def-v': 0,
            'imp-p': 0,
            'crit-r': 0,
            'crit-d': 0,
            'anm-p': 0,
            'anm-b': 0,
            'pen-r': 0,
            'pen-v': 0,
            'en-reg': 0,
            'bonus-phy': 0,
            'bonus-fire': 0,
            'bonus-ice': 0,
            'bonus-ele': 0,
            'bonus-eth': 0
        }
    }

    // 計算対象の敵オブジェクト
    targetEnemy = 0

    // エージェント変更用の変数
    selector = {
        type: agentClass.types[0],
        rank: agentClass.ranks[0],
        wEngine: {
            autoEquipment: true,
            type: wEngineClass.types[0],
            rank: wEngineClass.ranks[0]
        }
    }

    constructor (charId) {
        this.charId = charId
        for (let i = 1; i < 6; i++) {
            this.equipment.disc.push(Object.assign({},this.equipment.disc[0]))
            switch(i) {
                case 1:
                    this.equipment.disc[i].main = 'atk-v'
                    break
                case 2:
                    this.equipment.disc[i].main = 'def-v'
                    break
                case 3:
                    this.equipment.disc[i].main = 'crit-r'
                    break
                case 4:
                    this.equipment.disc[i].main = 'atk-p'
                    break
                case 5:
                    this.equipment.disc[i].main = 'atk-p'
                    break
            }
            this.equipment.disc[i].sub = []
            for(let j = 0; j < 4; j++) {
                this.equipment.disc[i].sub.push(Object.assign({},this.equipment.disc[0].sub[j]))
            }
        }
        this.initAgent(charId)
    }

    initAgent(charId) {
        this.charId = charId
        if(this.selector.wEngine.autoEquipment) this.setWEngine(agentClass.agentData[charId].motif)
        this.calcDiscTotal()
        this.setSkillData()
    }
    
    setSkillData() {
        for(const val of define.skillType) {
            const groupArray = agentClass.skillData.filter(line => line[1] == this.charId && line[2] == val)
            this.skills[val].data = []
            const paramStart = 7
            for(const skillData of groupArray) {
                const result = {
                    id: skillData[0],
                    charId: skillData[1],
                    group: {
                        primary: skillData[2],
                        secondary: skillData[3]
                    },
                    name: {
                        en: skillData[4],
                        jp: skillData[5]
                    },
                    combo: skillData[6],
                    params: []
                }
                const keys = ['type', 'attribute', 'multiplier', 'number', 'growth']
                let newParam = new Map
                for(let i = paramStart; skillData[i]; i++) {
                    newParam.set(keys[(i - paramStart) % keys.length], skillData[i])
                    if((i - paramStart) % keys.length == keys.length - 1) {
                        result.params.push(Object.fromEntries(newParam))
                        newParam.clear()
                    }
                }
                this.skills[val].data.push(result)
            }
        }
        //console.log(this.skills)
    }

    setBuff(sourceType, sourceId, buffData) {
        if(buffData.include) {
            for(let key in buffData.effect) {
                const obj = this.buffs[sourceType + '-' + sourceId + '-' + key] = {}
                obj.sourceType = sourceType
                obj.sourceId = sourceId
                obj.effectId = key
                obj.enable = true
                obj.stack = buffData.effect[key].stack
            }
        }
    }

    deleteBuff(sourceType, sourceId = undefined) {

    }

    setWEngine(id) {
        this.wEngine.id = id
        this.setBuff('wEngine', id, this.wEngine.data.buff)
        this.selector.wEngine.type = this.wEngine.data.type
        //console.log(this.wEngine)
    }

    calcDiscTotal() {
        this.clearDiscTotal()
        this.equipment.discPattern = this.equipment.discSet[2] != null ? 1 : 0
        const total = this.equipment.discTotal
        this.equipment.disc.forEach(item => {
            total[item.main] = ((total[item.main] * 10) + (discClass.getMainStat(item.main, item.level) * 10)) / 10
            item.sub.forEach(sub => {
                if(sub.type != item.main) {
                    total[sub.type] = ((total[sub.type] * 10) + (discClass.getSubStat(sub.type, sub.level) * 10)) / 10
                } else {
                    sub.type = ''
                }
            })
        })
        for(const val of this.equipment.discSet) {
            if(val === null) continue
            total[discClass.data[val][3]] += discClass.data[val][4]
        }
    }

    clearDiscTotal() {
        for(let key of Object.keys(this.equipment.discTotal)) {
            this.equipment.discTotal[key] = 0
        }
    }

    calcAnomalyDmg() {
        let result

        // フィールド上でのバフ込み攻撃力計算
        const atkInField = this.atk * (100 + agentClass.activeBuff.rate) / 100 + agentClass.activeBuff.int

        const anmMultiplier = (() => {
            switch(this.attribute.primary.toLowerCase()) { // 属性別異常倍率補正
                case 'physical' : return 713
                case 'fire'     : return 50
                case 'ice'      : return 500
                case 'electric' : return 125
                case 'ether'    : return 62.5
            }
        })()
        result = atkInField * this.anmP / 100 // 異常マスタリー補正
        result *= anmMultiplier / 100 // 異常倍率補正
        result *= 1 + (this.level - 1) / (agentClass.rangeLimits.level.max - 1) // 付与側レベル補正

        return result
    }

    calcSkillDmg(type, target) { // [type]:計算対象のスキルグループ名 , target:計算に使用する敵オブジェクト
        console.log(agentClass.agentData[this.charId].name.jp, '/', type, '---------------------')
        // フィールド上でのバフ込み攻撃力計算
        const atkBuff = {
            rate: agentClass.activeBuff.rate,
            value: agentClass.activeBuff.int
        }
        const atkInField = this.atk * (100 + atkBuff.rate) / 100 + atkBuff.value

        if(type == 'summary') return Math.floor(atkInField)

        // 返り値用変数宣言
        const resultArray = []

        // スキルデータごとの処理開始
        //console.log(this.skills[type].data)
        for(let skill of this.skills[type].data) {
            const result = {}
            result.secondary = skill.group.secondary
            result.name = {jp: skill.name.jp, en: skill.name.en}
            result.lines = []

            for(let param of skill.params) {
                const line = {}
                line.type = param.type
                line.attribute = param.attribute
                line.multiplier = ((param.multiplier * 10) + ((param.growth * 10) * (this.skills[skill.group.primary].level - 1))) / 10
                let temp = atkInField * line.multiplier / 100 // 一時計算結果変数宣言と倍率補正計算

                const attrBonus = (() => { // 属性に対応するダメージボーナスの代入
                    switch(param.attribute.toLowerCase()) {
                        case 'physical' : return this.bonusPhy
                        case 'fire'     : return this.bonusFire
                        case 'ice'      : return this.bonusIce
                        case 'electric' : return this.bonusEle
                        case 'ether'    : return this.bonusEth
                    }
                })()

                const buffValue = {}
                if(this.core.passive.include) { // コアスキルに計算対象となるバフがあるか確認
                    //console.log('Buff include')
                    const skillBuff = this.core.passive.effect.filter((data) => data.targetType == 'skill')
                    if(skillBuff) {
                        for(let buff of skillBuff) {
                            //console.log(buff.stat)
                        }
                    }
                }

                // 音動機のバフ
                /*
                for(let effect of this.buffs.wEngine) {
                    if(!effect.enable) continue // 無効に設定されていたらスキップ
                    if(effect.data.active == 'stack' && !effect.stack) continue // スタック制かつスタック0の場合はスキップ
                    effect.data.comparison.right.forEach((group) => { // 適用対象すべてに対し
                        let primary, secondary
                        [primary, secondary] = group.split('-')
                        switch(effect.data.comparison.left) { // 条件チェック
                            case 'skill': // スキル分類が条件に設定されている
                                if(primary != skill.group.primary) { // スキル第一分類が一致しないなら次のループへ
                                    return false
                                } else if(secondary && secondary != skill.group.secondary) { // スキル第二分類があり、かつ一致しないならば次のループへ
                                    return false
                                }
                                break
                            case 'stack': // スタック数が条件に設定されている
                                
                                break
                            case 'attr': // 属性が条件に設定されている
                                if(primary != param.attribute) { // 属性が一致しないなら次のループへ
                                    return false
                                }
                                break
                            case 'enemy': // 敵の状態が条件に設定されている
                                
                                break
                            default:
                                break
                        }
                        // 以上で終了されなければ、バフ効果値を追加
                        buffValue[effect.data.stat] = buffValue[effect.data.stat] ? buffValue[effect.data.stat] + effect.data.val[this.wEngine.grade-1]*(effect.stack ? effect.stack : 1) : effect.data.val[this.wEngine.grade-1]*(effect.stack ? effect.stack : 1)
                    })

                }
                console.log(skill.group.primary, skill.group.secondary, buffValue)
                */
                let totalDmgBonus = this.bonusDmg + attrBonus // ステータス上のボーナス値を合算
                switch(param.attribute.toLowerCase()) {
                    case 'physical':    totalDmgBonus += (buffValue['bonus-phy'] ? buffValue['bonus-phy'] : 0); break
                    case 'fire':        totalDmgBonus += (buffValue['bonus-fire'] ? buffValue['bonus-fire'] : 0); break
                    case 'ice':         totalDmgBonus += (buffValue['bonus-ice'] ? buffValue['bonus-ice'] : 0); break
                    case 'electric':    totalDmgBonus += (buffValue['bonus-ele'] ? buffValue['bonus-ele'] : 0); break
                    case 'ether':       totalDmgBonus += (buffValue['bonus-eth'] ? buffValue['bonus-eth'] : 0); break
                }
                totalDmgBonus += (buffValue['bonus-dmg'] ? buffValue['bonus-dmg'] : 0)
                
                // ダメージボーナスによる乗算
                temp = temp * (100 + totalDmgBonus) / 100

                // 敵耐性補正による乗算
                temp = temp * target.resistValue[param.attribute.toLowerCase()] / 100
                // console.log('resist', temp)

                // 防御補正計算
                let enemyDefence = (target.def * (100 - this.penR)) / 10000 - this.penV
                if(enemyDefence < 0) enemyDefence = 0
                const attackerCoefficient = 50 * agentClass.levelCoefficient[this.level - 1]
                const defCorrection = attackerCoefficient / (attackerCoefficient + enemyDefence) * 100
                temp = temp * target.breakRate * defCorrection / 10000

                // 通常ダメージ結果出力
                line.normal = Math.floor(temp)
                // 会心ダメージ結果出力
                line.critical = Math.floor(temp * (100 + this.critD + (target.state == 3 ? 10 : 0)) / 100)
                // ダメージ期待値出力
                line.expected = Math.floor((line.normal * (100 - this.critR) + line.critical * this.critR) / 100)

                result.lines.push(line)
            }
            resultArray.push(result)
        }

        return resultArray
        //console.log(result)
    }
}