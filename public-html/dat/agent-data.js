/* Data Template
    { // ID:0 , Name
        charId: 0,
        type: 'Anomaly' 'Attack' 'Defense' 'Stun' 'Support',
        rank: 'S' 'A',
        name: {jp: '', en: ''},
        faction: 0,
        attr: {primary: 'ice', secondary: 'none'},
        motif: 0,
        status: {
            hp: 7500,
            atk: 583,
            def: 612,
            imp: 118,
            critR: 5, critD: 50,
            anmB: 94, anmP: 93,
            penR: 0,
            enReg: 1.2,
        },
        core: {
            odd: { stat:'imp', val:0 },
            even: { stat:'atk', val:25 },
            passive: {
                include: true,
                title: '',
                desc: '',
            },
            additional: {
                include: true,
                title: '',
                desc: '',
            }
        },
        mindscape: [
            {
                include: true,
                title: '',
                desc: '',
            },
            {
                include: true,
                title: '',
                desc: '',
            },
            {
                include: true,
                title: '',
                desc: '',
            },
            {
                include: true,
                title: '',
                desc: '',
            },
            {
                include: true,
                title: '',
                desc: '',
            },
            {
                include: true,
                title: '',
                desc: '',
            },
        ],
    },
*/

charData = []

charData[0] = { // ID:0 , Anby 
    charId: 0,
    type: 'Stun',
    rank: 'A',
    name: {jp: 'アンビー・デマラ', en: 'Anby'},
    faction: 0,
    attr: {primary: 'Electric', secondary: ''},
    motif: 0,
    status: {
        hp: 7500,
        atk: 583,
        def: 612,
        imp: 118,
        critR: 5, critD: 50,
        anmB: 94, anmP: 93,
        penR: 0,
        enReg: 1.2,
    },
    core: {
        odd: {stat:'imp',val:6},
        even: {stat:'atk',val:25},
        passive: {
            title: '波動電圧',
            desc: 'アンビーが『通常攻撃』3段目の後に、『通常攻撃：落雷』、『特殊スキル』または『強化特殊スキル』を発動した場合、スキルの与えるブレイク値が32/37.3/42.6/48/53.3/58.6/64%アップする。',
            include: false,
            effect: [
            ],
        },
        additional: {
            title: '並列回路',
            desc: 'チームに自身と同じ属性または同じ陣営のメンバーがいる時に発動：アンビーが発動した『回避反撃』が敵に命中した場合、エネルギーを追加で7.2Pt回復する。5秒に1回のみ発動可能。',
            include: false,
            effect: [
            ],
        }
    },
    mindscape: [
        {
            include: false,
            title: '急速充電モード',
            desc: '『通常攻撃』の4段目の斬撃が敵に命中した時、アンビーのエネルギー獲得効率が12%アップする、継続時間30秒。',
        },
        {
            include: true,
            title: '精密放電',
            desc: '『通常攻撃：落雷』がブレイク状態の敵に命中した時、スキルの与ダメージが30%アップする。『強化特殊スキル』がブレイク状態ではない敵に命中した時、スキルの与えるブレイク値が10%アップする。',
            effect: [
                {
                    active: 'auto',
                    condition: {target: 'enemy', state: 'broken'},
                    targetType: 'skill',
                    target: {primary: 'basic', secondary: 'derived'},
                    stat: 'bonus-dmg',
                    val: 30,
                },
            ],
        },
        {
            include: false,
            title: '訓練の成果',
            desc: '『通常攻撃』、『回避』、『支援スキル』、『特殊スキル』、『連携スキル』のスキルレベル+2',
        },
        {
            include: false,
            title: '電荷伝導',
            desc: '『連携スキル』または『終結スキル』を発動した時、控えの電気属性メンバーのエネルギーを3Pt回復する。アンビーのエネルギー獲得効率12%につき、回復量が追加で2Ptアップする、最大6Ptまで。',
        },
        {
            include: false,
            title: 'ストリートの経験',
            desc: '『通常攻撃』、『回避』、『支援スキル』、『特殊スキル』、『連携スキル』のスキルレベル+2',
        },
        {
            include: true,
            title: 'フィールドチャージ',
            desc: '『強化特殊スキル』を発動した時、アンビーはパワーを8重獲得する（最大8重）。『通常攻撃』または『ダッシュ攻撃』が敵に命中した時、パワーを1重消費することで、その攻撃の与ダメージが45%アップする。',
            effect: [
                {
                    active: 'select',
                    targetType: 'skill',
                    target: {primary: 'basic', secondary: '*'},
                    stat: 'bonus-dmg',
                    val: 45,
                },
                {
                    active: 'select',
                    targetType: 'skill',
                    target: {primary: 'dodge', secondary: 'dash'},
                    stat: 'bonus-dmg',
                    val: 45,
                },
            ],
        },
    ],
    skills: {
        basic: [
            {
                type: 'normal',
                name: {jp: 'ボルトターボ', en: ''},
                combo: true,
                params: [
                    {
                        title: '1段目',
                        attr: ['Slash', 'Physical'],
                        number: 1,
                        multiplier: {base: 31.2, growth: 2.9},
                    },
                    {
                        title: '2段目',
                        attr: ['Slash', 'Physical'],
                        number: 1,
                        multiplier: {base: 33.7, growth: 3.1},
                    },
                    {
                        title: '3段目',
                        attr: ['Slash', 'Physical'],
                        number: 1,
                        multiplier: {base: 113.6, growth: 10.4},
                    },
                    {
                        title: '4段目',
                        attr: ['Slash', 'Electric'],
                        number: 1,
                        multiplier: {base: 239.1, growth: 21.8},
                    },
                ],
            },
            {
                type: 'derived',
                name: {jp: '落雷', en: ''},
                combo: true,
                params: [
                    {
                        title: '1段目',
                        attr: ['Slash', 'Physical'],
                        number: 1,
                        multiplier: {base: 31.2, growth: 2.9},
                    },
                    {
                        title: '2段目',
                        attr: ['Slash', 'Physical'],
                        number: 1,
                        multiplier: {base: 33.7, growth: 3.1},
                    },
                    {
                        title: '3段目',
                        attr: ['Slash', 'Physical'],
                        number: 1,
                        multiplier: {base: 113.6, growth: 10.4},
                    },
                    {
                        title: '4段目(派生)',
                        attr: ['Slash', 'Electric'],
                        number: 1,
                        multiplier: {base: 328.6, growth: 29.9},
                    },
                ],
            },
        ],
        dodge: [
            {
                type: 'dash',
                name: {jp: '電弧斬り', en: ''},
                combo: false,
                params: [
                    {
                        title: '1段目', attr: ['Slash', 'Physical'], number: 1,
                        multiplier: {base: 56.7, growth: 5.2},
                    },
                ],
            },
            {
                type: 'counter',
                name: {jp: '迅雷', en: ''},
                combo: false,
                params: [
                    {
                        title: '1段目',
                        attr: ['Slash', 'Electric'],
                        number: 1,
                        multiplier: {base: 180.2, growth: 16.4},
                    },
                ],
            },
        ],
        assist: [
            {
                type: 'quick',
                name: {jp: '雷呼', en: ''},
                combo: false,
                params: [
                    {
                        title: '1段目', attr: ['Slash', 'Electric'], number: 1,
                        multiplier: {base: 61.7, growth: 5.7},
                    },
                ],
            },
            {
                type: 'follow',
                name: {jp: 'スピニングサンダー', en: ''},
                combo: false,
                params: [
                    {
                        title: '1段目', attr: ['Slash', 'Electric'], number: 1,
                        multiplier: {base: 335.2, growth: 30.5},
                    },
                ],
            },
        ],
        special: [
            {
                type: 'normal',
                name: {jp: '雷光斬り', en: ''},
                combo: false,
                params: [
                    {
                        title: '1段目', attr: ['Slash', 'Electric'], number: 1,
                        multiplier: {base: 93.4, growth: 8.5},
                    },
                ],
            },
            {
                type: 'enhance',
                name: {jp: '蒼雷斬り', en: ''},
                combo: false,
                params: [
                    {
                        title: '1段目', attr: ['Slash', 'Electric'], number: 1,
                        multiplier: {base: 583, growth: 53},
                    },
                ],
            },
        ],
        chain: [
            {
                type: 'chain',
                name: {jp: 'ソレノイドエンジン', en: ''},
                combo: false,
                params: [
                    {
                        title: '1段目', attr: ['Slash', 'Electric'], number: 1,
                        multiplier: {base: 542.4, growth: 49.4},
                    },
                ],
            },
            {
                type: 'enhance',
                name: {jp: 'オーバードライブエンジン', en: ''},
                combo: false,
                params: [
                    {
                        title: '1段目', attr: ['Slash', 'Electric'], number: 1,
                        multiplier: {base: 1512.6, growth: 137.6},
                    },
                ],
            },
        ],
    }
}

charData[1] = { // ID:1 , Billy
    charId: 1,
    type: 'Attack',
    rank: 'A',
    name: {jp: 'ビリー・キッド', en: ''},
    faction: 0,
    attr: {primary: 'Physical', secondary: ''},
    motif: 28,
    status: {
        hp: 6907,
        atk: 712,
        def: 606,
        imp: 91,
        critR: 5, critD: 50,
        anmB: 92, anmP: 91,
        penR: 0,
        enReg: 1.2,
    },
    core: {
        odd: { stat:'critR', val:4.8 },
        even: { stat:'atk', val:25 },
        passive: {
            title: '射撃姿勢',
            desc: 'ビリーが『通常攻撃』を行った時に、しゃがみ撃ちに入ると、自身の与ダメージが[0:val]アップする。移動する、直立状態に戻る、あるいはノックバックされるか吹き飛ばされた時、バフ効果が終了する。',
            include: true,
            effect: [
                {
                    active: 'auto',
                    targetType: 'skill',
                    target: {primary: 'basic', secondary: 'derived'},
                    stat: 'bonus-dmg',
                    val: [25, 29.1, 33.3, 37.5, 41.6, 45.8, 50],
                },
            ],
        },
        additional: {
            title: 'スターライト戦隊',
            desc: 'チームに自身と同じ属性または同じ陣営のメンバーがいる時に発動：ビリーが『連携スキル』を発動した後、次に『終結スキル』を発動した時に、スキルの与ダメージが50%アップする、最大2重まで重ね掛け可能。『終結スキル』を発動するとリセットされる。',
            include: true,
            stack: 2,
            effect: [
                {
                    active: 'select',
                    targetType: 'skill',
                    target: {primary: 'chain', secondary: 'ultimate'},
                    stat: 'bonus-dmg',
                    val: [50, 50, 50, 50, 50, 50, 50],
                },
            ]
        }
    },
    mindscape: [
        {
            title: '堂々登場',
            desc: '『ダッシュ攻撃』または『回避反撃』が敵に命中した時、 ビリーは追加でエネルギーを2.7Pt回復する、5秒に1回のみ発動可能。',
            include: false,
        },
        {
            title: 'ローミング・ガンスリンガー',
            desc: '『回避反撃』の与ダメージが25%アップする。『通常攻撃』中、身躱し射撃が回避アクションと見なされ、スキル発動中に無敵効果を得る。また、『極限回避』を発動できる。身躱し射撃で『極限回避』を発動した後、『回避反撃』が自動で発動される。',
            include: true,
            effect: [
                {
                    active: 'auto',
                    targetType: 'skill',
                    target: {primary: 'dodge', secondary: 'counter'},
                    stat: 'bonus-dmg',
                    val: 25,
                },
            ],
        },
        {
            title: 'スターライトナイトの教え',
            desc: '『通常攻撃』、『回避』、『支援スキル』、『特殊スキル』、『連携スキル』のスキルレベル+2',
        },
        {
            title: 'スターライト・バリスティクス',
            desc: '『強化特殊スキル』が敵に命中した時、スキルの会心率がターゲットとの距離に応じてアップする。ビリーとターゲットの距離が近いほど、会心率アップ効果が高くなる、最大32%アップできる。',
            include: true,
            effect: [
                {
                    active: 'select',
                    targetType: 'skill',
                    target: {primary: 'special', secondary: 'enhance'},
                    stat: 'crit-r',
                    val: 32,
                },
            ]
        },
        {
            title: '失われた技術の構造体',
            desc: '『通常攻撃』、『回避』、『支援スキル』、『特殊スキル』、『連携スキル』のスキルレベル+2',
        },
        {
            title: 'スターライト・英雄的瞬間',
            desc: '敵に累計10回攻撃を命中させた時、または『極限回避』を発動した時、ビリーの与ダメージが6%アップする、最大5重まで重ね掛け可能。敵にノックバックされる、または吹き飛ばされた場合、バフ効果がリセットされる。',
            include: true,
            effect: [
                {
                    active: 'select',
                    targetType: 'stat',
                    stat: 'bonus-dmg',
                    val: 6,
                    stack: 5,
                }
            ],
        },
    ],
}

charData[2] = { // ID:2 , Nico
    charId: 1,
    type: 'Support',
    rank: 'A',
    name: {jp: 'ニコ・デマラ', en: ''},
    faction: 0,
    attr: {primary: 'Ether', secondary: ''},
    motif: 26,
}

charData[3] = {

}

charData[4] = {

}

charData[5] = {}

charData[6] = {}

charData[7] = {}

charData[8] = {}

charData[9] = {}

charData[10] = {}