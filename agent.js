class agentClass {
    name = 'Ellen Joe'
    type = 'Attack'
    element = 'Ice'
    mindscape = 0
    promotion = 5
    level = 60
    status = {
        base: {
            hp: 7673,
            atk: 863,
            def: 606,
            imp: 86,
            critR: 5,
            critD: 50,
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
        },
        total: {
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
    }
    skills = {
        core: 6,
        basic: 11,
        dodge: 11,
        assist: 11,
        special: 11,
        chain: 11
    }
    equipment = {
        wEngine: {
            id: 0,
            class: '',
            rank: '',
            name: '',
            level: 60,
            promotion: 5,
            atk: 0,
            advSt: '',
            advVal: 0,
            buffSt: '',
            buffVal: 0
        },
        discPattern: 0, // 0: 4piece+2piece, 1: 2piece*3set, 2: Free
        discSet: [0,0,0],
        disc: [
            {
                id: 0,
                level: 15,
                main: 'hp-v',
                sub: [
                    {type: 'atk-p', level: 0},
                    {type: 'def-p', level: 0},
                    {type: 'crit-r', level: 0},
                    {type: 'crit-d', level: 0}
                ]
            }
        ],
        total: {
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
            'pen-p': 0,
            'pen-v': 0,
            'en-reg': 0,
            'bonus-phy': 0,
            'bonus-fire': 0,
            'bonus-ice': 0,
            'bonus-ele': 0,
            'bonus-eth': 0
        }
    }

    constructor (charID, charLv, wEngineID) {

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
                {type: 'def-p', level: 0},
                {type: 'crit-r', level: 0},
                {type: 'crit-d', level: 0}
            ]
        }
        console.log(this.equipment)
    }

    calcEquipmentTotal() {
        this.clearEquipmentTotal()
    }

    clearEquipmentTotal() {
        for(let key of Object.keys(this.equipment.total)) {
            this.equipment.total[key] = 0
        }
    }

    setEngineData (obj) {
        Object.assign(this.equipment.wEngine, obj)
        console.log(this.equipment.wEngine)
    }
}