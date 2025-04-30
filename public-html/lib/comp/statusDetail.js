export default {
    props: {
        agent: Object,
        text: Object,
        lang: String,
        patternNo: Number,
    },
    template: `
                            <section class="status" :id="'p' + patternNo + '-status'">
                                <h4>Status details</h4>
                                <div>
                                    <table class="value-details">
                                        <colgroup>
                                            <col span="2">
                                            <col>
                                            <col span="2">
                                            <col span="2">
                                            <col>
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th colspan="2" rowspan="2">Status Detail</th>
                                                <th rowspan="2">Agent</th>
                                                <th colspan="2">W-Engine</th>
                                                <th colspan="2">Driver</th>
                                                <th rowspan="2">Total</th>
                                            </tr>
                                            <tr>
                                                <th>Main</th>
                                                <th>Adv.</th>
                                                <th>%</th>
                                                <th>Val</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th colspan="2">HP</th>
                                                <td>{{ agent.base.hp }}</td>
                                                <td>-</td>
                                                <td>{{ agent.equipment.wEngine.advSt['hp-p'] }}%</td>
                                                <td>{{ agent.equipment.discTotal['hp-p'] }}%</td>
                                                <td>{{ agent.equipment.discTotal['hp-v'] }}</td>
                                                <td>{{ agent.hp }}</td>
                                            </tr>
                                            <tr>
                                                <th colspan="2">{{text.status.atk[lang]}}</th>
                                                <td>{{ agent.base.atk }}</td>
                                                <td>{{ agent.equipment.wEngine.atk }}</td>
                                                <td>{{ agent.equipment.wEngine.advSt['atk-p'] }}%</td>
                                                <td>{{ agent.equipment.discTotal['atk-p'] }}%</td>
                                                <td>{{ agent.equipment.discTotal['atk-v'] }}</td>
                                                <td>{{ agent.atk }}</td>
                                            </tr>
                                            <tr>
                                                <th colspan="2">{{text.status.def[lang]}}</th>
                                                <td>{{ agent.base.def }}</td>
                                                <td>-</td>
                                                <td>{{ agent.equipment.wEngine.advSt['def-p'] }}%</td>
                                                <td>{{ agent.equipment.discTotal['def-p'] }}%</td>
                                                <td>{{ agent.equipment.discTotal['def-v'] }}</td>
                                                <td>{{ agent.def }}</td>
                                            </tr>
                                            <tr>
                                                <th colspan="2">{{text.status.imp[lang]}}</th>
                                                <td>{{ agent.base.imp }}</td>
                                                <td>-</td>
                                                <td>{{ agent.equipment.wEngine.advSt['imp-p'] }}%</td>
                                                <td>{{ agent.equipment.discTotal['imp-p'] }}%</td>
                                                <td>-</td>
                                                <td>{{ agent.imp }}</td>
                                            </tr>
                                            <tr>
                                                <th colspan="2">{{text.status.critR[lang]}}</th>
                                                <td>{{ agent.base.critR }}%</td>
                                                <td>-</td>
                                                <td>{{ agent.equipment.wEngine.advSt['crit-r'] }}%</td>
                                                <td>{{ agent.equipment.discTotal['crit-r'] }}%</td>
                                                <td>-</td>
                                                <td>{{ agent.critR }}%</td>
                                            </tr>
                                            <tr>
                                                <th colspan="2">{{text.status.critD[lang]}}</th>
                                                <td>{{ agent.base.critD }}%</td>
                                                <td>-</td>
                                                <td>{{ agent.equipment.wEngine.advSt['crit-d'] }}%</td>
                                                <td>{{ agent.equipment.discTotal['crit-d'] }}%</td>
                                                <td>-</td>
                                                <td>{{ agent.critD }}%</td>
                                            </tr>
                                            <tr>
                                                <th colspan="2">{{text.status.anmB[lang]}}</th>
                                                <td>{{ agent.base.anmB }}</td>
                                                <td>-</td>
                                                <td>{{ agent.equipment.wEngine.advSt['anm-b'] }}%</td>
                                                <td>{{ agent.equipment.discTotal['anm-b'] }}%</td>
                                                <td>-</td>
                                                <td>{{ agent.anmB }}</td>
                                            </tr>
                                            <tr>
                                                <th colspan="2">{{text.status.anmP[lang]}}</th>
                                                <td>{{ agent.base.anmP }}</td>
                                                <td>-</td>
                                                <td>{{ agent.equipment.wEngine.advSt['anm-p'] }}</td>
                                                <td>-</td>
                                                <td>{{ agent.equipment.discTotal['anm-p'] }}</td>
                                                <td>{{ agent.anmP }}</td>
                                            </tr>
                                            <tr>
                                                <th colspan="2">{{text.status.penR[lang]}}</th>
                                                <td>0%</td>
                                                <td>-</td>
                                                <td>{{ agent.equipment.wEngine.advSt['pen-r'] }}%</td>
                                                <td>{{ agent.equipment.discTotal['pen-r'] }}%</td>
                                                <td>-</td>
                                                <td>{{ agent.penR }}%</td>
                                            </tr>
                                            <tr>
                                                <th colspan="2">{{text.status.penV[lang]}}</th>
                                                <td>0</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>{{ agent.equipment.discTotal['pen-v'] }}</td>
                                                <td>{{ agent.penV }}</td>
                                            </tr>
                                            <tr>
                                                <th colspan="2">{{text.status.enReg[lang]}}</th>
                                                <td>{{ agent.base.enReg }}</td>
                                                <td>-</td>
                                                <td>{{ agent.equipment.wEngine.advSt['en-reg'] }}%</td>
                                                <td>{{ agent.equipment.discTotal['en-reg'] }}%</td>
                                                <td>-</td>
                                                <td>{{ agent.enReg }}</td>
                                            </tr>
                                            <tr>
                                                <th rowspan="6">DMG Bonus</th>
                                                <th>{{text.attribute.phys[lang]}}</th>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>{{ agent.equipment.wEngine.advSt['bonus-phy'] }}%</td>
                                                <td>{{ agent.equipment.discTotal['bonus-phy'] }}%</td>
                                                <td>-</td>
                                                <td>{{ agent.bonusPhy }}%</td>
                                            </tr>
                                            <tr>
                                                <th>{{text.attribute.fire[lang]}}</th>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>{{ agent.equipment.wEngine.advSt['bonus-fire'] }}%</td>
                                                <td>{{ agent.equipment.discTotal['bonus-fire'] }}%</td>
                                                <td>-</td>
                                                <td>{{ agent.bonusFire }}%</td>
                                            </tr>
                                            <tr>
                                                <th>{{text.attribute.ice[lang]}}</th>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>{{ agent.equipment.wEngine.advSt['bonus-ice'] }}%</td>
                                                <td>{{ agent.equipment.discTotal['bonus-ice'] }}%</td>
                                                <td>-</td>
                                                <td>{{ agent.bonusIce }}%</td>
                                            </tr>
                                            <tr>
                                                <th>{{text.attribute.elec[lang]}}</th>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>{{ agent.equipment.wEngine.advSt['bonus-ele'] }}%</td>
                                                <td>{{ agent.equipment.discTotal['bonus-ele'] }}%</td>
                                                <td>-</td>
                                                <td>{{ agent.bonusEle }}%</td>
                                            </tr>
                                            <tr>
                                                <th>{{text.attribute.ether[lang]}}</th>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>{{ agent.equipment.wEngine.advSt['bonus-eth'] }}%</td>
                                                <td>{{ agent.equipment.discTotal['bonus-eth'] }}%</td>
                                                <td>-</td>
                                                <td>{{ agent.bonusEth }}%</td>
                                            </tr>
                                            <tr>
                                                <th>Deal</th>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>{{ agent.equipment.wEngine.advSt['bonus-dmg'] }}%</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>{{ agent.bonusDmg }}%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </section>
    `
}