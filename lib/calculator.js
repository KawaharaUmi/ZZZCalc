export default class calculator {

    // Lv係数
    static levelCoefficient = [1,1.08,1.16,1.24,1.32,1.42,1.52,1.64,1.76,1.88,2,2.14,2.28,2.42,2.58,2.74,2.9,3.06,3.24,3.44,3.62,3.82,4.02,4.22,4.44,4.66,4.9,5.12,5.36,5.62,5.86,6.12,6.38,6.66,6.94,7.22,7.5,7.8,8.1,8.42,8.72,9.04,9.38,9.7,10.04,10.38,10.74,11.1,11.46,11.84,12.2,12.58,12.98,13.38,13.78,14.18,14.6,15.02,15.44,15.88]

    // 属性別異常倍率補正値
    static anmMultiplier = {
        phys: 713,
        fire: 50,
        ice: 500,
        elec: 125,
        ethe: 62.5,
    }

    static calcEnemyDef(obj) {
        return obj.defClass * (
            calculator.levelCoefficient[(obj.level > 60 ? 60 : obj.level) - 1] * 100
        ) / 100
    }

    calcAnomalyDmg() {
        let result

        // フィールド上でのバフ込み攻撃力計算
        const atkInField = this.atk * (100 + agentClass.activeBuff.rate) / 100 + agentClass.activeBuff.int

        const anmMultiplier = (() => {
            switch(this.attribute.primary.toLowerCase()) { // 属性別異常倍率補正
                case 'physical' : return 713
                case 'fire'     : return 50
                case 'ice'      : return 500
                case 'electric' : return 125
                case 'ether'    : return 62.5
            }
        })()
        result = atkInField * this.anmP / 100 // 異常マスタリー補正
        result *= anmMultiplier / 100 // 異常倍率補正
        result *= 1 + (this.level - 1) / (agentClass.rangeLimits.level.max - 1) // 付与側レベル補正

        return result
    }

    calcSkillDmg(type, target) { // [type]:計算対象のスキルグループ名 , target:計算に使用する敵オブジェクト
        console.log(agentClass.agentData[this.charId].name.jp, '/', type, '---------------------')
        // フィールド上でのバフ込み攻撃力計算
        const atkBuff = {
            rate: agentClass.activeBuff.rate,
            value: agentClass.activeBuff.int
        }
        const atkInField = this.atk * (100 + atkBuff.rate) / 100 + atkBuff.value

        if(type == 'summary') return Math.floor(atkInField)

        // 返り値用変数宣言
        const resultArray = []

        // スキルデータごとの処理開始
        //console.log(this.skills[type].data)
        for(let skill of this.skills[type].data) {
            const result = {}
            result.secondary = skill.group.secondary
            result.name = {jp: skill.name.jp, en: skill.name.en}
            result.lines = []

            for(let param of skill.params) {
                const line = {}
                line.type = param.type
                line.attribute = param.attribute
                line.multiplier = ((param.multiplier * 10) + ((param.growth * 10) * (this.skills[skill.group.primary].level - 1))) / 10
                let temp = atkInField * line.multiplier / 100 // 一時計算結果変数宣言と倍率補正計算

                const attrBonus = (() => { // 属性に対応するダメージボーナスの代入
                    switch(param.attribute.toLowerCase()) {
                        case 'physical' : return this.bonusPhy
                        case 'fire'     : return this.bonusFire
                        case 'ice'      : return this.bonusIce
                        case 'electric' : return this.bonusEle
                        case 'ether'    : return this.bonusEth
                    }
                })()

                const buffValue = {}
                if(this.core.passive.include) { // コアスキルに計算対象となるバフがあるか確認
                    //console.log('Buff include')
                    const skillBuff = this.core.passive.effect.filter((data) => data.targetType == 'skill')
                    if(skillBuff) {
                        for(let buff of skillBuff) {
                            //console.log(buff.stat)
                        }
                    }
                }

                // 音動機のバフ
                for(let effect of this.buffs.wEngine) {
                    if(!effect.enable) continue // 無効に設定されていたらスキップ
                    if(effect.data.active == 'stack' && !effect.stack) continue // スタック制かつスタック0の場合はスキップ
                    effect.data.comparison.right.forEach((group) => { // 適用対象すべてに対し
                        let primary, secondary
                        [primary, secondary] = group.split('-')
                        switch(effect.data.comparison.left) { // 条件チェック
                            case 'skill': // スキル分類が条件に設定されている
                                if(primary != skill.group.primary) { // スキル第一分類が一致しないなら次のループへ
                                    return false
                                } else if(secondary && secondary != skill.group.secondary) { // スキル第二分類があり、かつ一致しないならば次のループへ
                                    return false
                                }
                                break
                            case 'stack': // スタック数が条件に設定されている
                                
                                break
                            case 'attr': // 属性が条件に設定されている
                                if(primary != param.attribute) { // 属性が一致しないなら次のループへ
                                    return false
                                }
                                break
                            case 'enemy': // 敵の状態が条件に設定されている
                                
                                break
                            default:
                                break
                        }
                        // 以上で終了されなければ、バフ効果値を追加
                        buffValue[effect.data.stat] = buffValue[effect.data.stat] ? buffValue[effect.data.stat] + effect.data.val[this.wEngine.grade-1]*(effect.stack ? effect.stack : 1) : effect.data.val[this.wEngine.grade-1]*(effect.stack ? effect.stack : 1)
                    })

                }
                console.log(skill.group.primary, skill.group.secondary, buffValue)
                let totalDmgBonus = this.bonusDmg + attrBonus // ステータス上のボーナス値を合算
                switch(param.attribute.toLowerCase()) {
                    case 'physical':    totalDmgBonus += (buffValue['bonus-phy'] ? buffValue['bonus-phy'] : 0); break
                    case 'fire':        totalDmgBonus += (buffValue['bonus-fire'] ? buffValue['bonus-fire'] : 0); break
                    case 'ice':         totalDmgBonus += (buffValue['bonus-ice'] ? buffValue['bonus-ice'] : 0); break
                    case 'electric':    totalDmgBonus += (buffValue['bonus-ele'] ? buffValue['bonus-ele'] : 0); break
                    case 'ether':       totalDmgBonus += (buffValue['bonus-eth'] ? buffValue['bonus-eth'] : 0); break
                }
                totalDmgBonus += (buffValue['bonus-dmg'] ? buffValue['bonus-dmg'] : 0)
                
                // ダメージボーナスによる乗算
                temp = temp * (100 + totalDmgBonus) / 100

                // 敵耐性補正による乗算
                temp = temp * target.resistValue[param.attribute.toLowerCase()] / 100
                // console.log('resist', temp)

                // 防御補正計算
                let enemyDefence = (target.def * (100 - this.penR)) / 10000 - this.penV
                if(enemyDefence < 0) enemyDefence = 0
                const attackerCoefficient = 50 * agentClass.levelCoefficient[this.level - 1]
                const defCorrection = attackerCoefficient / (attackerCoefficient + enemyDefence) * 100
                temp = temp * target.breakRate * defCorrection / 10000

                // 通常ダメージ結果出力
                line.normal = Math.floor(temp)
                // 会心ダメージ結果出力
                line.critical = Math.floor(temp * (100 + this.critD + (target.state == 3 ? 10 : 0)) / 100)
                // ダメージ期待値出力
                line.expected = Math.floor((line.normal * (100 - this.critR) + line.critical * this.critR) / 100)

                result.lines.push(line)
            }
            resultArray.push(result)
        }

        return resultArray
        //console.log(result)
    }
}