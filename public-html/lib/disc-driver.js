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
    
    static driverEffect = {
        0: {
            name: 'スイング・ジャズ',
            primary: [
                {
                    desc: 'エネルギー自動回復+20%',
                    type: 'stat-up',
                    target: ['en-reg'],
                    value: 20,
                },
            ],
            secondary: [
                {
                    desc: '『連携スキル』または『終結スキル』発動時、チーム全体の与ダメージ+15%、継続時間12秒。同じパッシブ効果は重ね掛け不可。',
                    condition: 'select',
                    type: 'team-buff',
                    target: ['bonus-dmg'],
                    value: 15,
                }
            ]
        },
        1: {
            name: 'ウッドペッカー・エレクトロ',
            primary: [
                {
                    desc: '会心率+8%',
                    type: 'stat-up',
                    target: ['crit-r'],
                    value: 8,
                }
            ],
            secondary: [
                {
                    desc: '『通常攻撃』、『回避反撃』または『強化特殊スキル』が敵に命中し、なおかつ会心が出た時、それぞれ装備者にバフ効果を1重与える。バフ効果1重につき、装備者の攻撃力+9%、継続時間6秒。バフ効果の継続時間はスキルごとに計算される。',
                    condition: 'select',
                    type: 'self-buff',
                    stack: 3,
                    target: ['atk-p'],
                    value: 9,
                }
            ]
        },
        2: {
            name: 'パファー・エレクトロ',
            primary: [
                {
                    desc: '貫通率+8%',
                    type: 'stat-up',
                    target: ['pen-r'],
                    value: 8,
                }
            ],
            secondary: [
                {
                    desc: '『終結スキル』の与ダメージ+20%',
                    condition: 'auto',
                    type: 'skill-enhance',
                    target: ['chain-ultimate'],
                    value: 20,
                },
                {
                    desc: '『終結スキル』発動時、装備者の攻撃力+15%、継続時間12秒。',
                    condition: 'select',
                    type: 'self-buff',
                    target: 'bonus-dmg',
                    value: 15,
                }
            ]
        },
        3: {
            name: 'ショックスター・ディスコ',
            primary: [
                {
                    desc: '衝撃力+6%',
                    type: 'stat-up',
                    target: 'imp-p',
                    value: 6,
                }
            ],
            secondary: [
                {
                    desc: '『通常攻撃』、『ダッシュ攻撃』、『回避反撃』がメインターゲットに与えるブレイク値+20%',
                    condition: '-',
                },
            ]
        },
        4: {
            name: 'フリーダム・ブルース',
            primary: [
                {
                    desc: '異常マスタリー+30Pt',
                    type: 'stat-up',
                    target: 'anm-p',
                    value: 30,
                }
            ],
            secondary: [
                {
                    desc: '『強化特殊スキル』が敵に命中すると、装備者の属性に応じて、ターゲットの対応する状態異常蓄積耐性-20%、継続時間8秒。同属性での重ね掛けは不可。',
                    condition: '-',
                },
            ]
        },
        5: {
            name: 'ホルモン・パンク',
            primary: [
                {
                    desc: '攻撃力+10%',
                    type: 'stat-up',
                    target: 'atk-p',
                    value: 10,
                }
            ],
            secondary: [
                {
                    desc: '接敵状態突入時、または出場した時、装備者の攻撃力+25%、継続時間10秒。20秒に1回のみ発動可能。',
                    condition: 'select',
                    type: 'self-buff',
                    target: 'atk-p',
                    value: 25,
                },
            ]
        },
        6: {
            name: 'ソウル・ロック',
            primary: [
                {
                    desc: '防御力+16%',
                    type: 'stat-up',
                    target: 'def-p',
                    value: 16,
                }
            ],
            secondary: [
                {
                    desc: '敵の攻撃を受け、かつHPが減少した時、装備者の被ダメージ-40%、継続時間2.5秒。15秒に1回のみ発動可能。',
                    condition: '-',
                },
            ]
        },
        7: {
            name: '炎獄のヘヴィメタル',
            primary: [
                {
                    desc: '炎属性ダメージ+10%',
                    type: 'stat-up',
                    target: 'bonus-fire',
                    value: 10,
                }
            ],
            secondary: [
                {
                    desc: '[熱傷]状態の敵に攻撃が命中した時、装備者の会心率+28%、継続時間8秒。',
                    condition: 'select',
                    type: 'self-buff',
                    target: 'crit-r',
                    value: 28,
                },
            ]
        },
        8: {
            name: '混沌のヘヴィメタル',
            primary: [
                {
                    desc: 'エーテル属性ダメージ+10%',
                    type: 'stat-up',
                    target: 'bonus-eth',
                    value: 10,
                }
            ],
            secondary: [
                {
                    desc: '装備者の会心ダメージ+20%',
                    condition: 'auto',
                    type: 'self-buff',
                    target: 'crit-d',
                    value: 20,
                },
                {
                    desc: '任意のメンバーによって[侵蝕]効果の追加ダメージが発生した時、追加で上記バフ効果+5.5%、最大6重まで重ね掛け可能、継続時間8秒。重複して発動すると継続時間が更新される。',
                    condition: 'select',
                    type: 'self-buff',
                    stack: 6,
                    target: 'crit-d',
                    value: 5.5,
                }
            ]
        },
        9: {
            name: '霹靂のヘヴィメタル',
            primary: [
                {
                    desc: '電気属性ダメージ+10%',
                    type: 'stat-up',
                    target: 'bonus-ele',
                    value: 10,
                }
            ],
            secondary: [
                {
                    desc: 'フィールド上に[感電]状態の敵がいる時、装備者の攻撃力+28%',
                    condition: 'select',
                    type: 'self-buff',
                    target: 'atk-p',
                    value: 28,
                },
            ]
        },
        10: {
            name: '極地のヘヴィメタル',
            primary: [
                {
                    desc: '氷属性ダメージ+10%',
                    type: 'stat-up',
                    target: 'bonus-ice',
                    value: 10,
                }
            ],
            secondary: [
                {
                    desc: '『通常攻撃』と『ダッシュ攻撃』の与ダメージ+20%',
                    condition: 'auto',
                    type: 'skill-enhance',
                    target: ['basic', 'dodge-dash'],
                    value: 20,
                },
                {
                    desc: '任意のメンバーが敵に[凍結]効果を付与した時、または[砕氷]効果を発動した時、追加で上記バフ効果+20%、継続時間12秒。',
                    condition: 'select',
                    type: 'skill-enhance',
                    target: ['basic', 'dodge-dash'],
                    value: 20,
                }
            ]
        },
        11: {
            name: '獣牙のヘヴィメタル',
            primary: [
                {
                    desc: '物理属性ダメージ+10%',
                    type: 'stat-up',
                    target: 'bonus-phy',
                    value: 10,
                }
            ],
            secondary: [
                {
                    desc: '任意のメンバーが敵に[強撃]効果を付与した時、装備者がターゲットに与えるダメージ+35%、継続時間12秒。',
                    condition: 'select',
                    type: 'self-buff',
                    target: ['bonus-dmg'],
                    value: 35,
                },
            ]
        },
        12: {
            name: 'プロト・パンク',
            primary: [
                {
                    desc: 'シールド生成量+15%',
                    type: '-',
                }
            ],
            secondary: [
                {
                    desc: '任意のメンバーが『パリィ支援』または『回避支援』を発動した時、チーム全体の与ダメージ+15%、継続時間10秒。同じパッシブ効果は重ね掛け不可。',
                    condition: 'select',
                    type: 'team-buff',
                    target: ['bonus-dmg'],
                    value: 15,
                },
            ]
        },
        13: {
            name: 'ケイオス・ジャズ',
            primary: [
                {
                    desc: '異常マスタリー+30Pt',
                    type: 'stat-up',
                    target: 'anm-p',
                    value: 30,
                }
            ],
            secondary: [
                {
                    desc: '炎属性ダメージおよび電気属性ダメージ+15%',
                    condition: 'auto',
                    type: 'self-buff',
                    target: ['bonus-fire', 'bonus-ele'],
                    value: 15,
                },
                {
                    desc: '控えにいる時、『強化特殊スキル』と『支援攻撃』の与ダメージ+20%。出場した後も効果は5秒継続する。この効果継続は7.5秒に1回のみ発動可能。',
                    condition: 'select',
                    type: 'skill-enhance',
                    target: ['special-enhance', 'assist'],
                    value: 20,
                }
            ]
        },
        14: {
            name: '折枝の刀歌',
            primary: [
                {
                    desc: '会心ダメージ+16%',
                    type: 'stat-up',
                    target: 'crit-d',
                    value: 16,
                }
            ],
            secondary: [
                {
                    desc: '異常掌握が115Pt以上の時、装備者の会心ダメージ+30%',
                    condition: 'auto',
                    type: 'self-buff',
                    target: ['crit-d'],
                    value: 30,
                    func: () => { this.anmB >= 115 ? true : false }
                },
                {
                    desc: '任意のメンバーが敵に[凍結]効果を付与した時、または[砕氷]効果を発動した時、装備者の会心率+12%、継続時間15秒。',
                    condition: 'select',
                    type: 'self-buff',
                    target: ['crit-r'],
                    value: 12,
                }
            ]
        },
        15: {
            name: '静寂のアストラ',
            primary: [
                {
                    desc: '攻撃力+10%',
                    type: 'stat-up',
                    target: 'atk-p',
                    value: 10,
                }
            ],
            secondary: [
                {
                    desc: '任意のメンバーが『クイック支援』で出場した時、チーム全体が「天籟」を1重獲得する。最大3重まで重ね掛け可能、継続時間15秒、重複して発動すると継続時間が更新される。「天籟」1重につき、『クイック支援』で出場したメンバーの与ダメージ+8%、該当効果はチーム内でひとつしか有効にならない。',
                    condition: 'select',
                    type: 'team-buff',
                    stack: 3,
                    target: ['bonus-dmg'],
                    value: 8,
                },
            ]
        },
        16: {
            name: 'パエトーンの歌',
            primary: [
                {
                    desc: '異常掌握+8%',
                    type: 'stat-up',
                    target: 'anm-b',
                    value: 8,
                }
            ],
            secondary: [
                {
                    desc: '任意のメンバーが『強化特殊スキル』を発動した時、装備者の異常マスタリー+45Pt、継続時間8秒。',
                    condition: 'select',
                    type: 'self-buff',
                    target: ['anm-p'],
                    value: 45,
                },
                {
                    desc: '『強化特殊スキル』を発動したエージェントが装備者本人でない場合、装備者によるエーテル属性ダメージ+25%',
                    condition: 'select',
                    type: 'self-buff',
                    target: ['bonus-eth'],
                    value: 25,
                }
            ]
        },
        17: {
            name: 'シャドウハーモニー',
            primary: [
                {
                    desc: '『追加攻撃』と『ダッシュ攻撃』の与ダメージ+15%',
                    type: 'skill-enhance',
                    target: ['addtional', 'dodge-dash'],
                    value: 15,
                }
            ],
            secondary: [
                {
                    desc: '『追加攻撃』または『ダッシュ攻撃』が敵に命中した時、与えたダメージが装備者の属性と一致している場合、バフ効果を1重獲得する、1回のスキルにおいて1回のみ発動可能。バフ効果1重につき、装備者の攻撃力+4%、会心率+4%。最大3重まで重ね掛け可能、継続時間15秒、重複して発動すると継続時間が更新される。',
                    condition: 'select',
                    type: 'self-buff',
                    stack: 3,
                    target: ['atk-p', 'crit-r'],
                    value: 4,
                },
            ]
        }
    }
}