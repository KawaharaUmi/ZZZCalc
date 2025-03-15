class discClass {
    static data = []
    static {
        discClass.data = discDataCSV.trim().split('\n').map((line) => line.split(',').map(item => item ? isNaN(Number(item)) ? item : Math.round(Number(item) * 10) / 10 : undefined))
    }
    static valuesRange = {
        level: {min: 0, max: 15},
        subLevel: {min: 0, max: 5}
    }

    static main = {
        "hp-p": 7.5,
        "hp-v": 550,
        "atk-p": 7.5,
        "atk-v": 79,
        "def-p": 12,
        "def-v": 46,
        "imp-p": 4.5,
        "crit-r": 6,
        "crit-d": 12,
        "anm-p": 23,
        "anm-b": 7.5,
        "pen-r": 6,
        "en-reg": 15,
        "bonus-phy": 7.5,
        'bonus-fire': 7.5,
        'bonus-ice': 7.5,
        'bonus-ele': 7.5,
        'bonus-eth': 7.5
    }

    static mainTable = [
        'hp-v',     // Partition 1
        'atk-v',    // Partition 2
        'def-v',    // Partition 3
        ['hp-p','atk-p','def-p','crit-r','crit-d','anm-p'],
        ['hp-p','atk-p','def-p','pen-r','bonus-phy','bonus-fire','bonus-ice','bonus-ele','bonus-eth'],
        ['hp-p','atk-p','def-p','imp-p','anm-b','en-reg']
    ]

    static sub = {
        "hp-p": 3,
        "hp-v": 112,
        "atk-p": 3,
        "atk-v": 19,
        "def-p": 4.8,
        "def-v": 15,
        "crit-r": 2.4,
        "crit-d": 4.8,
        "anm-p": 9,
        "pen-v": 9
    }

    static getDiscType() {

    }

    getData(id) {
        const obj = {
            id: id,
            name: this.data[id][0],
            nameJP: this.data[id][1],
            setSt: this.data[id][2],
            setVal: this.data[id][3]
        }
        return obj
    }

    static getMainStat(name, level) {
        const base = discClass.main[name]
        const incrace = base * 0.2 * level
        return Math.floor(base + incrace)
    }

    static getSubStat(name, level) {
        const base = discClass.sub[name] * 10
        return base * (Number(level)+1) / 10
    }
    
    static disc4pieceEffect = {
        0: { // スイング・ジャズ
            description: '『連携スキル』または『終結スキル』発動時、チーム全体の与ダメージ+15%、継続時間12秒。同じパッシブ効果は重ね掛け不可。',
        },
        1: { // ウッドペッカー・エレクトロ
            description: '『通常攻撃』、『回避反撃』または『強化特殊スキル』が敵に命中し、なおかつ会心が出た時、それぞれ装備者にバフ効果を1重与える。バフ効果1重につき、装備者の攻撃力+9%、継続時間6秒。バフ効果の継続時間はスキルごとに計算される。',
            effect: [
                {
                    condition: 'select',
                    stackMax: 3,
                    targetStat: 'atk-p',
                    value: 9,
                }
            ],
        },
        2: { // パファー・エレクトロ
            description: '『終結スキル』の与ダメージ+20%。『終結スキル』発動時、装備者の攻撃力+15%、継続時間12秒。',
            effect: [
                {
                    condition: 'auto',
                    targetSkill: [
                        ['chain', 'ultimate']
                    ],
                    targetStat: 'bonus-dmg',
                    value: 20,
                },
                {
                    condition: 'select',
                    targetStat: 'atk-p',
                    value: 15,
                }
            ]
        },
        3: { // ショックスター・ディスコ
            description: '『通常攻撃』、『ダッシュ攻撃』、『回避反撃』がメインターゲットに与えるブレイク値+20%。',
            effect: [
    
            ]
        },
        4: { // フリーダム・ブルース
            description: '『強化特殊スキル』が敵に命中すると、装備者の属性に応じて、ターゲットの対応する状態異常蓄積耐性-20%、継続時間8秒。同属性での重ね掛けは不可。',
            effect: [
    
            ]
        },
        5: { // ホルモン・パンク
            description: '接敵状態突入時、または出場した時、装備者の攻撃力+25%、継続時間10秒。20秒に1回のみ発動可能。',
            effect: [
                {
                    condition: 'select',
                    targetStat: 'atk-p',
                    value: 25,
                }
            ]
        },
        6: { // ソウル・ロック
            description: '敵の攻撃を受け、かつHPが減少した時、装備者の被ダメージ-40%、継続時間2.5秒。15秒に1回のみ発動可能。',
            effect: [
    
            ]
        },
        7: { // 炎獄のヘヴィメタル
            description: '[熱傷]状態の敵に攻撃が命中した時、装備者の会心率+28%、継続時間8秒。',
            effect: [
                {
                    condition: 'select',
                    targetStat: 'crit-r',
                    value: 28,
                }
            ]
        },
        8: { // 混沌のヘヴィメタル
            description: '装備者の会心ダメージ+20%。任意のメンバーによって[侵蝕]効果の追加ダメージが発生した時、追加で上記バフ効果+5.5%、最大6重まで重ね掛け可能、継続時間8秒。重複して発動すると継続時間が更新される。',
            effect: [
                {
                    condition: 'auto',
                    targetStat: 'crit-d',
                    value: 20,
                },
                {
                    condition: 'select',
                    stackMax: 6,
                    targetStat: 'crit-d',
                    value: 5.5,
                }
            ]
        },
        9: { // 霹靂のヘヴィメタル
            description: 'フィールド上に[感電]状態の敵がいる時、装備者の攻撃力+28%。',
            effect: [
                {
                    condition: 'select',
                    targetStat: 'atk-p',
                    value: 28,
                }
            ]
        },
        10: { // 極地のヘヴィメタル
            description: '『通常攻撃』と『ダッシュ攻撃』の与ダメージ+20%。任意のメンバーが敵に[凍結]効果を付与した時、または[砕氷]効果を発動した時、追加で上記バフ効果+20%、継続時間12秒。',
            effect: [
                {
                    condition: 'auto',
                    targetSkill: [
                        ['basic'],
                        ['dodge', 'dash'],
                    ],
                    targetStat: 'bonus-dmg',
                    value: 20,
                },
                {
                    condition: 'select',
                    targetSkill: [
                        ['basic'],
                        ['dodge', 'dash'],
                    ],
                    targetStat: 'bonus-dmg',
                    value: 20,
                }
            ]
        },
        11: { // 獣牙のヘヴィメタル
            description: '任意のメンバーが敵に[強撃]効果を付与した時、装備者がターゲットに与えるダメージ+35%、継続時間12秒。',
            effect: [
                {
                    condition: 'select',
                    targetStat: 'bonus-dmg',
                    value: 35,
                }
            ]
        },
        12: { // プロト・パンク
            description: '任意のメンバーが『パリィ支援』または『回避支援』を発動した時、チーム全体の与ダメージ+15%、継続時間10秒。同じパッシブ効果は重ね掛け不可。',
            effect: [
                {
                    condition: 'select',
                    range: 'team',
                    targetStat: 'bonus-dmg',
                    value: 15,
                }
            ]
        },
        13: { // ケイオス・ジャズ
            description: '炎属性ダメージおよび電気属性ダメージ+15%。控えにいる時、『強化特殊スキル』と『支援攻撃』の与ダメージ+20%。出場した後も効果は5秒継続する。この効果継続は7.5秒に1回のみ発動可能。',
            effect: [
                {
                    condtion: 'auto',
                    targetStat: ['bonus-fire', 'bonus-ele'],
                    value: 15,
                },
                {
                    conditon: 'select',
                    targetSkill: [
                        ['special', 'enhance'],
                        ['assist']
                    ],
                    targetStat: 'bonus-dmg',
                    value: 20,
                }
            ]
        },
        14: { // 折枝の刀歌
            description: '異常掌握が115Pt以上の時、装備者の会心ダメージ+30%。任意のメンバーが敵に[凍結]効果を付与した時、または[砕氷]効果を発動した時、装備者の会心率+12%、継続時間15秒。',
            effect: [
                {
                    condition: 'auto',
                    targetStat: ['crit-d'],
                    value: 30,
                    func: function(val) {
                        if(val >= 115) return true
                        return false
                    }
                },
                {
                    condition: 'select',
                    targetStat: ['crit-r'],
                    value: 12
                }
            ]
        },
        15: { // 静寂のアストラ
            description: '任意のメンバーが『クイック支援』で出場した時、チーム全体が「天籟」を1重獲得する。最大3重まで重ね掛け可能、継続時間15秒、重複して発動すると継続時間が更新される。「天籟」1重につき、『クイック支援』で出場したメンバーの与ダメージ+8%、該当効果はチーム内でひとつしか有効にならない。',
            effect: [
                {
                    condition: 'select',
                    range: 'team',
                    stackMax: 3,
                    targetStat: ['bonus-dmg'],
                    value: 8,
                }
            ]
        },
        16: { // パエトーンの歌
            description: '任意のメンバーが『強化特殊スキル』を発動した時、装備者の異常マスタリー+45Pt、継続時間8秒。『強化特殊スキル』を発動したエージェントが装備者本人でない場合、装備者によるエーテル属性ダメージ+25%。',
            effect: [
                {
                    condition: 'select',
                    range: 'self',
                    targetStat: ['bonus-eth'],
                    value: 25
                }
            ]
        },
        17: {
            description: '',
            effect: [
                {
                    condtion: ''
                }
            ]
        }
    }
}