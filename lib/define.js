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
        "hp-p": {jp: 'HP%', en: 'HP%'},
        "hp-v": {jp: 'HP', en: 'HP'},
        "atk-p": {jp: '攻撃力%', en: 'ATK%'},
        "atk-v": {jp: '攻撃力', en: 'ATK'},
        "def-p": {jp: '防御力%', en: 'DEF%'},
        "def-v": {jp: '防御力', en: 'DEF'},
        "imp-p": {jp: '衝撃力', en: 'Impact'},
        "crit-r": {jp: '会心率', en: 'CRIT Rate'},
        "crit-d": {jp: '会心ダメージ', en: 'CRIT DMG'},
        "anm-b": {jp: '異常掌握', en: 'ANOM Buildup'},
        "anm-p": {jp: '異常マスタリー', en: 'ANOM Prof.'},
        "pen-r": {jp: '貫通率', en: 'PEN Ratio'},
        'pen-v': {jp: '貫通値', en: 'PEN'},
        "en-reg": {jp: 'EN回復', en: 'Energy Regen'},
        "bonus-phy": {jp: '物理ダメージ', en: 'Bonus(Phy)'},
        'bonus-fire': {jp: '炎ダメージ', en: 'Bonus(Fire)'},
        'bonus-ice': {jp: '氷ダメージ', en: 'Bonus(Ice)'},
        'bonus-ele': {jp: '電気ダメージ', en: 'Bonus(Ele)'},
        'bonus-eth': {jp: 'エーテルダメージ', en: 'Bonus(Ether)'},
        'bonus-dmg': {jp: '与ダメージ', en: 'Bonus DMG'},
        'pen-phy': {jp: '物理耐性貫通', en: ''},
        'pen-fire': {jp: '炎耐性貫通', en: ''},
        'pen-ice': {jp: '氷耐性貫通', en: ''},
        'pen-ele': {jp: '電気耐性貫通', en: ''},
        'pen-eth': {jp: 'エーテル耐性貫通', en: ''},
        'effic-phy': {jp: '物理異常蓄積効率', en: ''},
        'effic-fire': {jp: '炎異常蓄積効率', en: ''},
        'effic-ice': {jp: '氷異常蓄積効率', en: ''},
        'effic-ele': {jp: '電気異常蓄積効率', en: ''},
        'effic-eth': {jp: 'エーテル異常蓄積効率', en: ''},
        'effic-anm': {jp: '状態異常蓄積効率', en: ''},
        'bonus-disorder': {jp: '混沌ダメージ', en: ''},
        'bonus-anomaly': {jp: '状態異常ダメージ', en: ''},
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
    type: {
        stun: {jp:'撃破', en:'Stun'},
        attack: {jp:'強攻', en:'Attack'},
        anomaly: {jp:'異常', en:'Anomaly'},
        defense: {jp:'防護', en:'Defense'},
        support: {jp:'支援', en:'Support'},
    },
    attribute: {
        phys: {jp:'物理', en:'Phys.'},
        physical: {jp:'物理', en:'Phys.'},
        fire: {jp:'炎', en:'Fire'},
        ice: {jp:'氷', en:'Ice'},
        frost: {jp:'霜烈', en:'Frost'},
        elec: {jp:'電気', en:'Elec.'},
        electric: {jp:'電気', en:'Elec.'},
        ether: {jp:'エーテル', en:'Ether'}
    }
}
