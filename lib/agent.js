class agentClass {
    static agentData = []
    static skillData = []
    static types = ['Attack', 'Anomaly', 'Stun', 'Defense', 'Support']
    static ranks = ['S', 'A']
    static rangeLimits = {
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
    static enemy = {
        defCalc: function() { return this.defClass * (agentClass.levelCoefficient[(this.level > 60 ? 60 : this.level) - 1] * 100) /100 },
        _defClass: 60,
        get defClass() { return this._defClass },
        set defClass(val) {
            this._defClass = val
            this.def = this.defCalc()
        },
        _level: 60,
        get level() { return this._level },
        set level(val) {
            this._level = val
            this.def = this.defCalc()
        },
        _def: 952.8,
        get def() { return this._def},
        set def(val) { this._def = val < 0 ? 0 : val },
        _defDebuff: 0,
        get defDebuff() { return this._defDebuff },
        set defDebuff(val) { this._defDebuff = val < 0 ? 0 : val },
        weak: {attribute: '', rate: 0},
        resist: {attribute: '', rate: 0},
        _breakRate: 100,
        get breakRate() { return this._breakRate },
        set breakRate(val) { this._breakRate = val < 100 ? 100 : val }
    }
    static selector = {
        type: agentClass.types[0],
        rank: agentClass.ranks[0]
    }

    static {
        agentClass.agentData = agentDataCSV.trim().split('\n')
            .map(line => line.split(',')
                .map(item => item
                    ? isNaN(Number(item))
                        ? item
                        : Math.round(Number(item) * 10) / 10
                    : undefined
                )
            )
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
    name = {en: '', jp: ''}
    short = {en: '', jp: ''}
    type = ''
    rank = ''
    attribute = {primary: '', secondary: ''}
    _mindscape = 0
    get mindscape() {
        return this._mindscape
    }
    set mindscape(val) {
        if(val < 3) {
            this.skills.levelLimit = 12
        } else if(val < 5) {
            this.skills.levelLimit = 14
        } else {
            this.skills.levelLimit = 16
        }
        this._mindscape = val
    }
    promotion = 5
    level = 60
    _coreLevel = 6
    get coreLevel() {
        return this._coreLevel
    }
    set coreLevel(val) {
        this._coreLevel = val
        this.base.core[this.coreSkill.oddEffect.type] = (this.coreSkill.oddEffect.val * 10) * Math.round(this._coreLevel / 2) / 10,
        this.base.core[this.coreSkill.evenEffect.type] = (this.coreSkill.evenEffect.val * 10) * Math.floor(this._coreLevel / 2) / 10
    }

    base = {
        get hp  () {return this._hp + (this.core['hp'] ? this.core['hp'] : 0)},
        get atk () {return this._atk + (this.core.atk ? this.core.atk : 0)},
        get def () {return this._def + (this.core['def'] ? this.core['def'] : 0)},
        get imp () {return this._imp + (this.core['imp'] ? this.core['imp'] : 0)},
        get critR   () {return this._critR + (this.core['critR'] ? this.core['critR'] : 0)},
        get critD   () {return this._critD + (this.core['critD'] ? this.core['critD'] : 0)},
        get anmB    () {return this._anmB + (this.core['anmB'] ? this.core['anmB'] : 0)},
        get anmP    () {return this._anmP + (this.core['anmP'] ? this.core['anmP'] : 0)},
        get penR    () {return this._penR + (this.core['penR'] ? this.core['penR'] : 0)},
        get enReg   () {return this._enReg + (this.core['enReg'] ? this.core['enReg'] : 0)},
        _hp: 0,
        _atk: 0,
        _def: 0,
        _imp: 0,
        _critR: 5,
        _critD: 50,
        _anmB: 0,
        _anmP: 0,
        _penR: 0,
        _enReg: 1.2,
        core: {},
    }

    get hp() {
        return Math.floor(this.base.hp * (100 + this.equipment.wEngine.advSt['hp-p'] + this.equipment.discTotal['hp-p']) / 100) + this.equipment.discTotal['hp-v']
    }
    get atk() {
        return Math.floor((this.base.atk + this.equipment.wEngine.atk) * (100 + this.equipment.wEngine.advSt['atk-p'] + this.equipment.discTotal['atk-p']) / 100) + this.equipment.discTotal['atk-v']
    }
    get def() {
        return Math.floor(this.base.def * (100 + this.equipment.wEngine.advSt['def-p'] + this.equipment.discTotal['def-p']) / 100) + this.equipment.discTotal['def-v']
    }
    get imp() {
        return Math.floor(this.base.imp * (100 + this.equipment.wEngine.advSt['imp-p'] + this.equipment.discTotal['imp-p']) / 100)
    }
    get critR() {
        const result = (this.base.critR * 10 + this.equipment.wEngine.advSt['crit-r'] * 10 + this.equipment.discTotal['crit-r'] * 10) / 10
        return result > 100 ? 100 : result
    }
    get critD() {
        return this.base.critD + this.equipment.wEngine.advSt['crit-d'] + this.equipment.discTotal['crit-d']
    }
    get anmB() {
        return Math.floor(this.base.anmB * (100 + this.equipment.wEngine.advSt['anm-b'] + this.equipment.discTotal['anm-b']) / 100)
    }
    get anmP() {
        return this.base.anmP + this.equipment.wEngine.advSt['anm-p'] + this.equipment.discTotal['anm-p']
    }
    get penR() {
        const result = this.base.penR + this.equipment.wEngine.advSt['pen-r'] + this.equipment.discTotal['pen-r']
        return result > 100 ? 100 : result
    }
    get penV() {
        return this.equipment.wEngine.advSt['pen-v'] + this.equipment.discTotal['pen-v']
    }
    get enReg() {
        return Math.floor(this.base.enReg * 10 * (100 + this.equipment.wEngine.advSt['en-reg'] + this.equipment.discTotal['en-reg']) / 100) / 10
    }
    get bonusPhy() {
        return this.equipment.wEngine.advSt['bonus-phy'] + this.equipment.discTotal['bonus-phy']
    }
    get bonusFire() {
        return this.equipment.wEngine.advSt['bonus-fire'] + this.equipment.discTotal['bonus-fire']
    }
    get bonusIce() {
        return this.equipment.wEngine.advSt['bonus-ice'] + this.equipment.discTotal['bonus-ice']
    }
    get bonusEle() {
        return this.equipment.wEngine.advSt['bonus-ele'] + this.equipment.discTotal['bonus-ele']
    }
    get bonusEth() {
        return this.equipment.wEngine.advSt['bonus-eth'] + this.equipment.discTotal['bonus-eth']
    }
    get bonusDmg() {
        return this.equipment.wEngine.advSt['bonus-dmg']
    }

    coreSkill = {
        oddEffect: {
            type: '',
            val: 0
        },
        evenEffect: {
            type: '',
            val: 0
        },
    }

    skill

    skills = {
        _levelLimit : 12,
        get levelLimit () {
            return this._levelLimit
        },
        set levelLimit (val) {
            for(let key of define.skillType) {
                if(this[key].level > this._levelLimit) this[key].level = this._levelLimit 
            }
            if(this.levelBatch > val) this.levelBatch = val
            this._levelLimit = val
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
    equipment = {
        wEngine: {
            id: 0,
            type: '',
            rank: '',
            name: '',
            level: 60,
            promotion: 5,
            grade: 1,
            atk: 0,
            advSt: {
                '': 0
            },
            effect: {
                field: {
                    type: '',
                    val: [0,0,0,0,0]
                }
            }
        },
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
    buff = { // コアスキル、音動機、ディスクから得られる戦闘中バフのスロット
        activate: true,
        data: 0
    }
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
        const baseData = agentClass.agentData[charId]
        this.charId = charId
        this.type = baseData[1]
        this.rank = baseData[2]
        this.attribute.primary = baseData[3]
        this.attribute.secondary = baseData[4]
        this.name.en = baseData[5]
        this.name.jp = baseData[6]
        
        this.base._hp = baseData[7]
        this.base._atk = baseData[8]
        this.base._def = baseData[9]
        this.base._imp = baseData[10]
        this.base._critR = baseData[11]
        this.base._critD = baseData[12]
        this.base._anmB = baseData[13]
        this.base._anmP = baseData[14]
        this.base._penR = baseData[15]
        this.base._enReg = baseData[16]
        this.base.core = {}
        this.coreSkill.oddEffect.type = baseData[17]
        this.coreSkill.oddEffect.val = baseData[18]
        this.coreSkill.evenEffect.type = baseData[19]
        this.coreSkill.evenEffect.val = baseData[20]

        if(this.selector.wEngine.autoEquipment) this.setWEngine(baseData[21])
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
    }

    setWEngine(id) {
        Object.assign(this.equipment.wEngine, wEngineClass.pullData(id))
        for(const key of Object.keys(define.display)) {
            if(!this.equipment.wEngine.advSt[key]) {
                Object.assign(this.equipment.wEngine.advSt, {[key]: 0})
            }
        }
        this.equipment.wEngine.id = id
        //console.log(this.equipment.wEngine)
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

    calcDmg(param, level, mode = '') {
        //console.log('related data:', param, level, mode)
        
        // ダメージ倍率計算関数
        const multiplier = () => {
            return ((param.multiplier * 10) + ((param.growth * 10) * (level - 1))) / 10
        }
        if(mode == 'multiplier') return multiplier()

        let result

        // フィールド上でのバフ込み攻撃力計算
        const atkInField = this.atk * (100 + agentClass.activeBuff.rate) / 100 + agentClass.activeBuff.int
        //('atk(with activeBuff) : ' + atkInField)
        // スキルの属性に対応するダメージボーナスを代入
        const attrBonus = (() => {
            switch(param.attribute) {
                case 'Physical' : return this.bonusPhy
                case 'Fire'     : return this.bonusFire
                case 'Ice'      : return this.bonusIce
                case 'Electric' : return this.bonusEle
                case 'Ether'    : return this.bonusEth
            }
        })()
        // 攻撃力 * スキル倍率 * ダメージボーナス
        result = atkInField * multiplier() * (100 + this.bonusDmg + attrBonus) / 10000
        // 敵耐性補正計算
        if(param.attribute == agentClass.enemy.resist.attribute) {
            result = result * (100 - agentClass.enemy.resist.rate) / 100
            //console.log('with resist : ' + result)
        } else if(param.attribute == agentClass.enemy.weak.attribute) {
            result = result * (100 + agentClass.enemy.weak.rate) / 100
            //console.log(result)
        }
        // 防御補正計算
        let enemyDefence = (agentClass.enemy.def * (100 - agentClass.enemy.defDebuff) * (100 - this.penR)) / 10000 - this.penV
        if(enemyDefence < 0) enemyDefence = 0
        const attackerCoefficient = 50 * agentClass.levelCoefficient[this.level - 1]
        const defCorrection = attackerCoefficient / (attackerCoefficient + enemyDefence) * 100
        result = result * agentClass.enemy.breakRate * defCorrection / 10000
        console.log(result)

        // 計算結果出力
        const normalDmg = Math.floor(result)
        if(mode == 'normal') {
            //console.log('Base Damege Output : ' + normalDmg)
            return normalDmg
        }
        result = Math.floor(result * (100 + this.critD) / 100)
        const criticalDmg = Math.floor(result)
        if(mode == 'critical') {
            //console.log('Critical Damage Output : ' + criticalDmg)
            return criticalDmg
        }
        const expectedDmg = Math.floor((normalDmg * (100 - this.critR) + criticalDmg * this.critR) / 100)
        if(mode == 'expected') {
            //console.log('expeted Damage Output : ' + expectedDmg)
            return expectedDmg
        }
    }
}