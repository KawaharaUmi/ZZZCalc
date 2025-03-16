define = {
    class: [
        'Attack', // 0
        'Anomaly', // 1
        'Stun', // 2
        'Defense', // 3
        'Support' // 4
    ],
    attribute: [
        'Physical',
        'Fire',
        'Ice',
        'Electric',
        'Ether'
    ],
    rank: [
        'S','A','B'
    ],
    skillType: [
        'basic',
        'dodge',
        'assist',
        'special',
        'chain'
    ],
    skillGroupName: {
        jp: {
            primary: {
                basic: '通常',
                dodge: '回避',
                assist: '支援',
                special: '特殊',
                chain: '連携'
            },
            basic: {
                normal:'通常攻撃',
                derived: '通常攻撃(派生)',
                enhance: '通常攻撃(強化)',
                charge: '通常攻撃(チャージ)'
            },
            dodge: {
                dash: 'ダッシュ攻撃',
                counter: '回避反撃'
            },
            assist: {
                quick: 'クイック支援',
                follow: '支援突撃',
            },
            special: {
                normal: '特殊スキル',
                enhance: '強化特殊スキル'
            },
            chain: {
                chain: '連携スキル',
                ultimate: '終結スキル'
            }
        }
    },
    display: {
        "hp-p": 'HP%',
        "hp-v": 'HP',
        "atk-p": 'ATK%',
        "atk-v": 'ATK',
        "def-p": 'DEF%',
        "def-v": 'DEF',
        "imp-p": 'Impact',
        "crit-r": 'CRIT Rate',
        "crit-d": 'CRIT DMG',
        "anm-p": 'ANOM Prof.',
        "anm-b": 'ANOM Buildup',
        "pen-r": 'PEN Ratio',
        'pen-v': 'PEN',
        "en-reg": 'Energy Regen',
        "bonus-phy": 'Bonus(Phy)',
        'bonus-fire': 'Bonus(Fire)',
        'bonus-ice': 'Bonus(Ice)',
        'bonus-ele': 'Bonus(Ele)',
        'bonus-eth': 'Bonus(Ether)',
        'bonus-dmg': 'Bonus DMG'
    },
    skill: {
        
    }
}

text = {
    control: {
        title: {jp:'表示', en:'Display'},
        result: {jp:'結果のみ', en: 'Result'},
        both: {jp:'両方表示', en: 'Both'},
        setting: {jp:'設定のみ', en: 'Setting'}
    },
    agent: {jp:'エージェント', en:'Agent'},
    engine: {jp:'音動機', en:'W-Engine'},
    driver: {jp:'ドライバ', en:'Driver'},
    status: {
        hp: {jp:'HP', en:'HP'},
        atk: {jp:'攻撃力', en:'ATK'},
        def: {jp:'防御力', en:'DEF'},
        imp: {jp:'衝撃力', en:'IMP'},
        critR: {jp:'会心率', en:'CRIT Rate'},
        critD: {jp:'会心ダメージ', en:'CRIT DMG'},
        anmB: {jp:'異常掌握', en:'Anomaly Buildup'},
        anmP: {jp:'異常マスタリー', en:'Anomaly Proficiency'},
        penR: {jp:'貫通率', en:'PEN Ratio'},
        penV: {jp:'貫通値', en:'PEN'},
        enReg: {jp:'EN回復', en:'EN Regen'}
    },
    attribute: {
        phys: {jp:'物理', en:'Phys.'},
        fire: {jp:'炎', en:'Fire'},
        ice: {jp:'氷', en:'Ice'},
        elec: {jp:'電気', en:'Elec.'},
        ether: {jp:'エーテル', en:'Ether'}
    }
}
