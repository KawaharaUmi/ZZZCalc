export default {
    props: {
        agent: Object,
        text: Object,
        lang: String,
        patternNo: Number,
    },
    template: `
                            <section class="status2" :id="'p' + patternNo + '-status2'">
                                <h4>Status</h4>
                                <div>
                                    <div class="value-group">
                                        <div class="">ATK</div>
                                        <div class="total">{{agent.atk}}</div>
                                        <div class="breakdown">{{agent.base.atk}} + {{agent.equipment.wEngine.atk}} + {{Math.floor((agent.base.atk + agent.equipment.wEngine.atk) * agent.equipment.discTotal['atk-p'] / 100)}} ({{agent.equipment.discTotal['atk-p']}}%) + {{agent.equipment.discTotal['atk-v']}}</div>
                                    </div>
                                    <div class="value-group">
                                        <div class="">CRIT Rate</div>
                                        <div class="total">{{agent.critR}}%</div>
                                        <div class="breakdown">{{agent.base.critR}} + {{agent.equipment.wEngine.advSt['crit-r']}} + {{agent.equipment.discTotal['crit-r']}}</div>
                                    </div>
                                    <div class="value-group">
                                        <div class="">CRIT DMG</div>
                                        <div class="total">{{agent.critD}}%</div>
                                        <div class="breakdown">{{agent.base.critD}} + {{agent.equipment.wEngine.advSt['crit-d']}} + {{agent.equipment.discTotal['crit-d']}}</div>
                                    </div>
                                    <div class="value-group">
                                        <div class="">PEN</div>
                                        <div class="total">{{agent.penR}}% + {{agent.penV}}</div>
                                    </div>
                                    <div class="bonus-group">
                                        <h5>Bonus</h5>
                                        <dl>
                                            <div>
                                                <dt>Damage</dt>
                                                <dd>{{agent.bonusDmg}}%</dd>
                                            </div>
                                            <div :class="agent.attribute.primary != 'Physical'?'unmatch':''">
                                                <dt><img src="./img/icon_attribute_physical.png" width="12pt" height="12pt">Phys.</dt>
                                                <dd>{{agent.bonusPhy}}%</dd>
                                            </div>
                                            <div :class="agent.attribute.primary != 'Fire'?'unmatch':''">
                                                <dt><img src="./img/icon_attribute_fire.png" width="12pt" height="12pt">Fire</dt>
                                                <dd>{{agent.bonusFire}}%</dd>
                                            </div>
                                            <div :class="agent.attribute.primary != 'Ice'?'unmatch':''">
                                                <dt><img src="./img/icon_attribute_ice.png" width="12pt" height="12pt">Ice</dt>
                                                <dd>{{agent.bonusIce}}%</dd>
                                            </div>
                                            <div :class="agent.attribute.primary != 'Electric'?'unmatch':''">
                                                <dt><img src="./img/icon_attribute_electric.png" width="12pt" height="12pt">Elec.</dt>
                                                <dd>{{agent.bonusEle}}%</dd>
                                            </div>
                                            <div :class="agent.attribute.primary != 'Ether'?'unmatch':''">
                                                <dt><img src="./img/icon_attribute_ether.png" width="12pt" height="12pt">Ether</dt>
                                                <dd>{{agent.bonusEth}}%</dd>
                                            </div>
                                        </dl>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                            </section>
    `
}