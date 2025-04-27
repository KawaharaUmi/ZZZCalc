class enemyClass {
    static levelCoefficient = levelCoefficient // Array
    static defBase = [36, 40, 43, 45, 46, 50, 54, 58, 60]
    static type = ['common', 'elite', 'boss']

    id = 0
    _name = ''
    get name() {
        return (this._name ? this._name : '仮想敵 No.' + (this.id + 1) + ' [' + (this.defClass >= enemyClass.defBase[8]?'ボス':'精鋭') + ']')
    }
    set name(text) {
        this._name = text.slice(0,20)
    }

    level = 70
    defClass = 60
    get def() {
        const val = (
            this.defClass * (
                enemyClass.levelCoefficient[(this.level > 60 ? 60 : this.level) - 1] * 100
            ) * (
                100 - this.debuff
            )
        ) /10000
        return (val < 0 ? 0 : val)
    }
    
    resist = [0, 0]
    weak = [0, 0]
    get resistValue() {
        return {
            dmg: 100,
            phys: 100,
            fire: 100,
            ice: 100,
            elec: 100,
            ethe: 100,
            slash: 100,
            strike: 100,
            pierce: 100,
        }
    }

    broken = false
    _breakRate = 125
    get breakRate() { return (this.broken ? this._breakRate : 100) }
    set breakRate(val) { this._breakRate = val < 100 ? 100 : val }
    
    state = 0
    // 0:通常, 1:畏縮, 2:熱傷, 3:霜寒, 4:感電, 5:侵食
    
    debuff = 0

    constructor(id) {
        this.id = id
    }

    reset() {

    }
}