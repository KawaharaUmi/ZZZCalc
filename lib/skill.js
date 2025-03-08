class skillClass {
    static typeTree = {
        'basic': {
            name: { jp: '通常', en: 'Basic' },
            secondary: {
                'normal': { name: { jp: '通常攻撃', en: '' }}
            },
        },
        'dodge': {
            name: { jp: '回避', en: 'Dodge'}
        },
        'assist': {
            name: { jp: '支援', en: 'Assist'}
        },
        'special': {
            name: { jp: '特殊', en: 'Special'}
        },
        'chain': {
            name: { jp: '連携', en: 'Chain & Ultimate'}
        }
    }
    static skillData = []
    static get primaryTypes() {
        return Object.keys(skillClass.typeTree)
    }
    static calc(agent, skillParam, skillLv, mode) {
        
    }
    static {
        console.log(skillClass.primaryTypes)
        skillClass.skillData = skillDataCSV.trim().split('\n')
            .map(line => line.split(',')
                .map(item => item
                    ? isNaN(Number(item))
                        ? item
                        : Math.round(Number(item) * 10) / 10
                    : undefined
                )
            )
        console.log(skillClass.skillData)
    }

    agent
    data = {}
    _levels
    get levels() {
        return {}
    }
    set levels(obj) {
        for(const group of skillClass.primaryTypes) {
            this._levels[group] = obj[group]
        }
    }
    result = {}

    get basic() {
    }

    constructor(charId) {
        for(const val of skillClass.primaryTypes) {
            const groupArray = agentClass.skillData.filter(line => line[1] == charId && line[2] == val)
            this.data[val] = []
            this.result[val] = []
            for(const skillData of groupArray) {
                const group = {
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
                const paramStart = 7
                const keys = ['type', 'attribute', 'multiplier', 'number', 'growth']
                let newParam = new Map
                for(let i = paramStart; skillData[i]; i++) {
                    newParam.set(keys[(i - paramStart) % keys.length], skillData[i])
                    if((i - paramStart) % keys.length == keys.length - 1) {
                        group.params.push(Object.fromEntries(newParam))
                        newParam.clear()
                    }
                }
                for(const data of group.params) {
                    const damage = {
                        get level() { return this.skills[result.group.primary].level},
                        get multiplier() {
                            return this.calcurator(data, this.level, 'multiplier')
                        },
                        get normal() {
                            return this.calcurator(data, this.level, 'normal')
                        },
                        get critical() {
                            return this.calcurator(data, this.level, 'critical')
                        },
                        get expected() {
                            return this.calcurator(data, this.level, 'expected')
                        }
                    }
                    this.result[val].push(damage)
                }
                this.data[val].push(group)
            }
        }
        console.log(this.data)
        console.log(this.result)
    }

    calcDamage(type, level) {
        const multiplier = (param) => {
            return ((param.multiplier * 10) + ((param.growth * 10) * level)) / 10
        }
        let result
        
        const atkInField = this.atk * (100 + agentClass.activeBuff.rate) / 100 + agentClass.activeBuff.increase
        //('atk(with activeBuff) : ' + atkInField)
        const attrBonus = (() => {
            switch(param.attribute) {
                case 'Physical' : return this.bonusPhy
                case 'Fire'     : return this.bonusFire
                case 'Ice'      : return this.bonusIce
                case 'Electric' : return this.bonusEle
                case 'Ether'    : return this.bonusEth
            }
        })()
        result = atkInField * multiplier() * (100 + this.bonusDmg + attrBonus) / 10000
        if(param.attribute == agentClass.enemyStatus.resist.attribute) {
            result = result * (100 - agentClass.enemyStatus.resist.rate) / 100
            //console.log('with resist : ' + result)
        } else if(param.attribute == agentClass.enemyStatus.weak.attribute) {
            result = result * (100 + agentClass.enemyStatus.weak.rate) / 100
            //console.log(result)
        }
        result = result * agentClass.enemyStatus.breakRate * agentClass.enemyStatus.enemyDef / 10000
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