/*
    {
        charId: 0,
        type: 'Anomaly' 'Attack' 'Assist' 'Defense' 'Stun',
        rank: 'S' 'A',
        name: {jp: '', en: ''},
        faction: 0,
        attr: {primary: 'ice', secondary: 'none'},
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
                title: '',
                desc: '',
            },
            additional: {
                title: '',
                desc: '',
            }
        },
        motif: 0,
        mindscape: [
            {
                title: '',
                desc: '',
            },
            {
                title: '',
                desc: '',
            },
            {
                title: '',
                desc: '',
            },
            {
                title: '',
                desc: '',
            },
            {
                title: '',
                desc: '',
            },
            {
                title: '',
                desc: '',
            },
        ],
    },
*/

charData = [
    {
        charId: 0,
        type: 'Stun',
        rank: 'A',
        name: {jp: 'アンビー・デマラ', en: 'Anby'},
        faction: 0,
        attr: {primary: 'ice', secondary: 'none'},
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
            },
            additional: {
                title: '並列回路',
                desc: 'チームに自身と同じ属性または同じ陣営のメンバーがいる時に発動：アンビーが発動した『回避反撃』が敵に命中した場合、エネルギーを追加で7.2Pt回復する。5秒に1回のみ発動可能。',
            }
        },
        motif: 0,
        mindscape: [
            {
                title: '急速充電モード',
                desc: '『通常攻撃』の4段目の斬撃が敵に命中した時、アンビーのエネルギー獲得効率が12%アップする、継続時間30秒。',
            },
            {
                title: '精密放電',
                desc: '『通常攻撃：落雷』がブレイク状態の敵に命中した時、スキルの与ダメージが30%アップする。『強化特殊スキル』がブレイク状態ではない敵に命中した時、スキルの与えるブレイク値が10%アップする。',
            },
            {
                title: '訓練の成果',
                desc: '『通常攻撃』、『回避』、『支援スキル』、『特殊スキル』、『連携スキル』のスキルレベル+2',
            },
            {
                title: '電荷伝導',
                desc: '『連携スキル』または『終結スキル』を発動した時、控えの電気属性メンバーのエネルギーを3Pt回復する。アンビーのエネルギー獲得効率12%につき、回復量が追加で2Ptアップする、最大6Ptまで。',
            },
            {
                title: 'ストリートの経験',
                desc: '『通常攻撃』、『回避』、『支援スキル』、『特殊スキル』、『連携スキル』のスキルレベル+2',
            },
            {
                title: 'フィールドチャージ',
                desc: '『強化特殊スキル』を発動した時、アンビーはパワーを8重獲得する（最大8重）。『通常攻撃』または『ダッシュ攻撃』が敵に命中した時、パワーを1重消費することで、その攻撃の与ダメージが45%アップする。',
            },
        ]
    },
]