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
