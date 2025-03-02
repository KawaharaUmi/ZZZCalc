class agentClass {
    static agentData = []
    static skillData = []
    static types = ['Attack', 'Anomaly', 'Stun', 'Defense', 'Support']
    static ranks = ['S', 'A']
    static valuesRange = {
        level: {min: 1, max: 60},
        promotion: {min: 0, max: 5},
        mindscape: {min: 0, max: 6},
        critR: 100,
        penR: 100,
        skills: {
            core: {min: 0, max: 6},
            active: {min: 1, max: 16}
        }
    }

    static selector = {
        type: agentClass.types[0],
        rank: agentClass.ranks[0]
    }

    static {
        agentClass.agentData = agentDataCSV.trim().split('\n').map((line) => line.split(',').map(item => item ? isNaN(Number(item)) ? item : Math.round(Number(item) * 10) / 10 : undefined))
        agentClass.skillData = skillDataCSV.trim().split('\n').map((line) => line.split(',').map(item => item ? isNaN(Number(item)) ? item : Math.round(Number(item) * 10) / 10 : undefined))
    }

    charId = 0
    name = {en: '', jp: ''}
    short = {en: '', jp: ''}
    type = ''
    rank = ''
    attribute = {primary: '', secondary: ''}
    mindscape = 0
    promotion = 5
    level = 60

    base = {
        get hp  () {return this._hp + (this.core['hp'] ? this.core['hp'] : 0)},
        get atk () {return this._atk + (this.core['atk'] ? this.core['atk'] : 0)},
        get def () {return this._def + (this.core['def'] ? this.core['def'] : 0)},
        get imp () {return this._imp + (this.core['imp'] ? this.core['imp'] : 0)},
        get critR   () {return this._critR + (this.core['critR'] ? this.core['critR'] : 0)},
        get critD   () {return this._critD + (this.core['critD'] ? this.core['critD'] : 0)},
        get anmB    () {return this._anmB + (this.core['anmB'] ? this.core['anmB'] : 0)},
        get anmP    () {return this._anmP + (this.core['anmP'] ? this.core['anmP'] : 0)},
        get enReg   () {return this._enReg + (this.core['enReg'] ? this.core['enReg'] : 0)},
        _hp: 0,
        _atk: 0,
        _def: 0,
        _imp: 0,
        _critR: 5,
        _critD: 50,
        _anmB: 0,
        _anmP: 0,
        _enReg: 1.2,
        core: {},
    }

    total = {
        hp: 0,
        atk: 0,
        def: 0,
        imp: 0,
        critR: 0,
        critD: 0,
        anmB: 0,
        anmP: 0,
        penR: 0,
        penV: 0,
        enReg: 0,
        bonusPhy: 0,
        bonusFire: 0,
        bonusIce: 0,
        bonusEle: 0,
        bonusEth: 0,
        bonusDmg: 0
    }
    skills = {
        core: {
            level: 6,
            oddEffect: {
                type: '',
                val: 0
            },
            evenEffect: {
                type: '',
                val: 0
            },
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
                    {type: null, level: 0},
                    {type: null, level: 0},
                    {type: null, level: 0},
                    {type: null, level: 0}
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
    selector = {
        type: agentClass.types[0],
        rank: agentClass.ranks[0]
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
            this.equipment.disc[i].sub = [
                {type: null, level: 0},
                {type: null, level: 0},
                {type: null, level: 0},
                {type: null, level: 0}
            ]
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
        console.log(this.base._hp)
        this.base._atk = baseData[8]
        this.base._def = baseData[9]
        this.base._imp = baseData[10]
        this.base._critR = baseData[11]
        this.base._critD = baseData[12]
        this.base._anmB = baseData[13]
        this.base._anmP = baseData[14]
        this.base._penR = baseData[15]
        this.base._enReg = baseData[16]
        this.skills.core.oddEffect.type = baseData[17]
        this.skills.core.oddEffect.val = baseData[18]
        this.skills.core.evenEffect.type = baseData[19]
        this.skills.core.evenEffect.val = baseData[20]

        this.equipment.wEngine.type = this.type
        this.equipment.wEngine.rank = this.rank
        this.equipment.wEngine.id = baseData[21]

        this.calcCoreSkillEffect()
        this.setWEngine(baseData[21])
        this.calcDiscTotal()
        this.setSkillData()
    }

    calcCoreSkillEffect() {
        this.base.core = {
            [this.skills.core.oddEffect.type] : (this.skills.core.oddEffect.val * 10) * Math.round(this.skills.core.level / 2) / 10,
            [this.skills.core.evenEffect.type] : (this.skills.core.evenEffect.val * 10) * Math.floor(this.skills.core.level / 2) / 10
        }
        console.log('core effect', this.base.core)
    }

    setSkillData() {
        for(const val of define.skillType) {
            const groupArray = agentClass.skillData.filter(line => line[1] == this.charId && line[2] == val)
            this.skills[val].data = []
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
                const keys = ['type', 'attribute', 'multiplier', 'number', 'growth' ]
                let newParam = new Map
                for(let i = 7; skillData[i]; i++) {
                    newParam.set(keys[(i - 7) % keys.length], skillData[i])
                    if((i - 7) % keys.length == keys.length - 1) {
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
        console.log(this.equipment.wEngine)
    }

    calcDiscTotal() {
        this.clearDiscTotal()
        this.equipment.discPattern = this.equipment.discSet[2] != null ? 1 : 0
        const total = this.equipment.discTotal
        this.equipment.disc.forEach(item => {
            total[item.main] = ((total[item.main] * 10) + (discClass.getMainStat(item.main, item.level) * 10)) / 10
            item.sub.forEach(sub => {
                total[sub.type] = ((total[sub.type] * 10) + (discClass.getSubStat(sub.type, sub.level) * 10)) / 10
            })
        })
        for(const val of this.equipment.discSet) {
            if(val === null) continue
            total[discClass.data[val][3]] += discClass.data[val][4]
        }
        this.calcStatusTotal()
    }

    clearDiscTotal() {
        for(let key of Object.keys(this.equipment.discTotal)) {
            this.equipment.discTotal[key] = 0
        }
    }

    calcStatusTotal() {
        //this.clearStatusTotal()
        const total = this.total
        const base = this.base
        const engine = this.equipment.wEngine
        const disc = this.equipment.discTotal

        total.hp    =   Math.floor(base.hp * (100 + engine.advSt['hp-p'] + disc['hp-p']) / 100) + disc['hp-v']
        total.atk   =   Math.floor((base.atk + engine.atk) * (100 + engine.advSt['atk-p'] + disc['atk-p']) / 100) + disc['atk-v']
        total.def   =   Math.floor(base.def * (100 + engine.advSt['def-p'] + disc['def-p']) / 100) + disc['def-v']
        total.imp   =   Math.floor(base.imp * (100 + engine.advSt['imp-p'] + disc['imp-p']) / 100)
        total.critR =   base.critR + engine.advSt['crit-r'] + disc['crit-r']
        total.critD =   base.critD + engine.advSt['crit-d'] + disc['crit-d']
        total.anmB  =   Math.floor(base.anmB * (100 + engine.advSt['anm-b'] + disc['anm-b']) / 100)
        total.anmP  =   base.anmP + engine.advSt['anm-p'] + disc['anm-p']
        total.penR  =   base.penR + engine.advSt['pen-r'] + disc['pen-r']
        total.penV  =   engine.advSt['pen-v'] + disc['pen-v']
        total.enReg =   Math.floor(base.enReg * 10 * (100 + engine.advSt['en-reg'] + disc['en-reg']) / 100) / 10
        total.bonusPhy  = engine.advSt['bonus-phy'] + disc['bonus-phy']
        total.bonusFire = engine.advSt['bonus-fire'] + disc['bonus-fire']
        total.bonusIce  = engine.advSt['bonus-ice'] + disc['bonus-ice']
        total.bonusEle  = engine.advSt['bonus-ele'] + disc['bonus-ele']
        total.bonusEth  = engine.advSt['bonus-eth'] + disc['bonus-eth']
        total.bonusDmg  = engine.advSt['bonus-dmg']
    }

    static activeBuff = {rate: 0, increase: 0}
    static enemyStatus = {
        breakRate: 100,
        enemyDef: 100,
        weak: {attribute: '', rate: 0},
        resist: {attribute: '', rate: 0}
    }

    calcDmg(data, key, mode = '') {
        const param = data.params[key]
        const multiplier = () => {
            return ((param.multiplier * 10) + ((param.growth * 10) * this.skills[data.group.primary].level)) / 10
        }
        const normaldmg = () => {
            return Math.floor(this.total.atk * multiplier() / 100)
        }
        const criticaldmg = () => {
            return Math.floor(this.total.atk * multiplier() * (100 + this.total.critD) / 10000)
        }
        let result

        if(mode == 'multiplier') return multiplier()
        
        const atkInField = this.total.atk * (100 + agentClass.activeBuff.rate) / 100 + agentClass.activeBuff.increase
        console.log('atk(with activeBuff) : ' + atkInField)
        const attrBonus = (() => {
            switch(param.attribute) {
                case 'Physical' : return this.total.bonusPhy
                case 'Fire'     : return this.total.bonusFire
                case 'Ice'      : return this.total.bonusIce
                case 'Electric' : return this.total.bonusEle
                case 'Ether'    : return this.total.bonusEth
            }
        })()
        result = atkInField * multiplier() * (100 + this.total.bonusDmg + attrBonus) / 10000
        if(param.attribute == agentClass.enemyStatus.resist.attribute) {
            result = result * (100 - agentClass.enemyStatus.resist.rate) / 100
            console.log('with resist : ' + result)
        } else if(param.attribute == agentClass.enemyStatus.weak.attribute) {
            result = result * (100 + agentClass.enemyStatus.weak.rate) / 100
            console.log(result)
        }
        result = result * agentClass.enemyStatus.breakRate * agentClass.enemyStatus.enemyDef / 10000
        const normalDmg = Math.floor(result)
        if(mode == 'normal') {
            console.log('Base Damege Output : ' + normalDmg)
            return normalDmg
        }
        result = Math.floor(result * (100 + this.total.critD) / 100)
        const criticalDmg = Math.floor(result)
        if(mode == 'critical') {
            console.log('Critical Damage Output : ' + criticalDmg)
            return criticalDmg
        }
        const expectedDmg = Math.floor((normalDmg * (100 - this.total.critR) + criticalDmg * this.total.critR) / 100)
        if(mode == 'expected') {
            console.log('expeted Damage Output : ' + expectedDmg)
            return expectedDmg
        }
    }
}