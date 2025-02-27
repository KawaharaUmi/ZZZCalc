class agentClass {
    static agentData = []
    static skillData = []
    static type = ['Attack', 'Anomaly', 'Stun', 'Defense', 'Support']
    static rank = ['S', 'A']

    static {
        agentClass.agentData = agentDataCSV.trim().split('\n').map((line) => line.split(',').map(item => item ? isNaN(Number(item)) ? item : Math.round(Number(item) * 10) / 10 : undefined))
        agentClass.skillData = skillDataCSV.trim().split('\n').map((line) => line.split(',').map(item => item ? isNaN(Number(item)) ? item : Math.round(Number(item) * 10) / 10 : undefined))
    }

    charId = 0
    name = {en: '', jp: ''}
    type = ''
    rank = ''
    element = {primary: '', secondary: ''}
    mindscape = 0
    promotion = 5
    level = 60

    base = {
        hp: 7673,
        atk: 863,
        def: 606,
        imp: 86,
        critR: 5,
        critD: 50,
        anmB: 0,
        anmP: 0,
        enReg: 1.2,
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
        bonusEth: 0
    }
    skills = {
        core: 6,
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
            atk: 0,
            subType: '',
            subVal: 0,
            clsSt: '',
            clsI1: 0,
            clsI5: 0
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
                {type: 'atk-p', level: 0},
                {type: 'crit-r', level: 0},
                {type: 'crit-d', level: 0},
                {type: 'anm-p', level: 0}
            ]
        }
        this.initAgent(charId)
    }

    initAgent(charId) {
        const baseData = agentClass.agentData[charId]
        this.type = baseData[1]
        this.rank = baseData[2]
        this.element.primary = baseData[3]
        this.element.secondary = baseData[4]
        this.name.en = baseData[5]
        this.name.jp = baseData[6]
        this.base.hp = baseData[7]
        this.base.atk = baseData[8]
        this.base.def = baseData[9]
        this.base.imp = baseData[10]
        this.base.critR = baseData[11]
        this.base.critD = baseData[12]
        this.base.anmB = baseData[13]
        this.base.anmP = baseData[14]
        this.base.penR = baseData[15]
        this.base.enReg = baseData[16]

        this.equipment.wEngine.type = this.type
        this.equipment.wEngine.rank = this.rank
        this.equipment.wEngine.id = baseData[21]

        this.setWEngine(baseData[21])
        this.calcDiscTotal()
        this.setSkillData()
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

        total.hp    =   Math.floor(base.hp * (100 + disc['hp-p']) / 100) + disc['hp-v']
        total.atk   =   Math.floor((base.atk + engine.atk) * (100 + disc['atk-p']) / 100) + disc['atk-v']
        total.def   =   Math.floor(base.def * (100 + disc['def-p']) / 100) + disc['def-v']
        total.imp   =   Math.floor(base.imp * (100 + disc['imp-p']) / 100)
        total.critR =   base.critR + disc['crit-r']
        total.critD =   base.critD + disc['crit-d']
        total.anmB  =   Math.floor(base.anmB * (100 + disc['anm-b']) / 100)
        total.anmP  =   base.anmP + disc['anm-p']
        total.penR  =   base.penR + disc['pen-r']
        total.penV  =   disc['pen-v']
        total.enReg =   Math.floor(base.enReg * 10 * (100 + disc['en-reg']) / 100) / 10
        total.bonusPhy = disc['bonus-phy']
        total.bonusFire = disc['bonus-fire']
        total.bonusIce  = disc['bonus-ice']
        total.bonusEle  = disc['bonus-ele']
        total.bonusEth  = disc['bonus-eth']
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
        
        switch(mode) {
            case 'multiplier':
                result = multiplier()
                break
            case 'normal':
                result = normaldmg()
                break
            case 'critical':
                result = criticaldmg()
                break
            case 'expected':
                result = Math.floor(normaldmg() * (1 + (this.total.critD / 100) * (this.total.critR / 100)))
        }
        return result
    }
}