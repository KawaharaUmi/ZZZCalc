const agentDataCSV = `
0,Stun,A,Electric,,,アンビー・デマラ,603,95,49,71,5,50,93,92,0,1.2,,
1,Attack,A,Physical,,,ビリー・キッド,555,113,49,72,5,50,93,92,0,1.2,,
2,Support,A,Ether,,,ニコ・デマラ,655,93,50,73,5,50,93,92,0,1.2,,
3,Attack,S,Physical,,,猫宮又奈,608,131,47,74,5,50,93,92,0,1.2,,
4,Attack,S,Fire,,,「11号」,617,128,49,75,5,50,93,92,0,1.2,,
5,Attack,A,Physical,,,カリン・ウィクス,561,116,49,76,5,50,93,92,0,1.2,,
6,Attack,A,Electric,,,アンドー・イワノフ,580,114,50,77,5,50,93,92,0,1.2,,
7,Defense,A,Fire,,,ベン・ビガー,690,117,58,78,5,50,93,92,0,1.2,,
8,Stun,S,Fire,,,クレタ・ベロボーグ,653,106,48,79,5,50,93,92,0,1.2,,
9,Anomaly,S,Electric,,,グレース・ハワード,602,119,48,80,5,50,93,92,0,1.2,,
10,Stun,S,Ice,,,フォン・ライカン,677,105,49,81,5,50,93,92,0,1.2,,
11,Attack,S,Ice,,,エレン・ジョー,617,135,49,82,5,50,93,92,0,1.2,,
12,Support,S,Electric,,,アレクサンドリナ・セバスチャン,692,103,48,83,5,50,93,92,0,1.2,pen-p,atk
13,Attack,S,Ether,,,朱鳶,602,132,48,84,5,50,93,92,0,1.2,,
14,Support,A,Ice,,,蒼角,645,96,48,85,5,50,93,92,0,1.2,,
15,Support,A,Fire,,,ルシアーナ・デ・モンテフィーノ,645,95,49,86,5,50,93,92,0,1.2,,
16,Anomaly,A,Physical,,,パイパー・ウィール,561,109,49,87,5,50,93,92,0,1.2,,
17,Stun,S,Electric,,,青衣,663,109,49,88,5,50,93,92,0,1.2,,
18,Anomaly,S,Physical,,,ジェーン・ドゥ,626,127,49,89,5,50,93,92,0,1.2,,
19,Defense,A,Electric,,,セス・ローウェル,699,93,60,90,5,50,93,92,0,1.2,,
20,Defense,S,Physical,,,キング・シーザー,766,101,61,91,5,50,93,92,0,1.2,,
21,Anomaly,S,Fire,,,バーニス・ホワイト,592,124,48,92,5,50,93,92,0,1.2,,
22,Anomaly,S,Electric,,,月城柳,626,126,49,93,5,50,93,92,0,1.2,,
23,Stun,S,Fire,,,ライト,677,109,49,94,5,50,93,92,0,1.2,,
24,Anomaly,S,Ice,Frost,,星見雅,617,127,49,95,5,50,93,92,0,1.2,,
25,Attack,S,Electric,,,浅羽悠真,595,132,48,96,5,50,93,92,0,1.2,,
26,Support,S,Ether,,,アストラ・ヤオ,692,103,48,97,5,50,93,92,0,1.2,,
27,Attack,S,Fire,,,イヴリン・シュヴァリエ,626,134,49,98,5,50,93,92,0,1.2,,
`

const skillDataCSV = `
0,basic,normal,,ボルトターボ,TRUE,slash,physical,31.2,1,2.9,slash,physical,33.7,1,3.09999999999999,slash,physical,113.6,1,10.4,slash,electric,239.1,1,21.8,,,,,,,,,,
0,basic,derived,,落雷,TRUE,slash,physical,31.2,1,2.9,slash,physical,33.7,1,3.09999999999999,slash,physical,113.6,1,10.4,strike,electric,328.6,1,29.9,,,,,,,,,,
0,dodge,dash,,電弧斬り,FALSE,slash,physical,56.7,1,5.2,,,,,,,,,,,,,,,,,,,,,,,,,
0,dodge,counter,,迅雷,FALSE,slash,electric,180.2,1,16.4,,,,,,,,,,,,,,,,,,,,,,,,,
0,assist,quick,,雷呼,FALSE,slash,electric,61.7,1,5.7,,,,,,,,,,,,,,,,,,,,,,,,,
0,assist,follow,,スピニングサンダー,FALSE,slash,electric,335.2,1,30.5,,,,,,,,,,,,,,,,,,,,,,,,,
0,special,normal,,雷光斬り,FALSE,slash,electric,93.4,1,8.5,,,,,,,,,,,,,,,,,,,,,,,,,
0,special,derived,,蒼雷斬り,FALSE,slash,electric,583,1,53,,,,,,,,,,,,,,,,,,,,,,,,,
0,chain,chain,,ソレノイドエンジン,FALSE,slash,electric,542.4,1,49.4,,,,,,,,,,,,,,,,,,,,,,,,,
0,chain,ultimate,,オーバードライブエンジン,FALSE,slash,electric,1512.6,1,137.6,,,,,,,,,,,,,,,,,,,,,,,,,
1,basic,normal,,出力全開,TRUE,pierce,physical,68,1,6.2,pierce,physical,7.6,1,0.700000000000001,pierce,physical,61.8,1,5.7,pierce,physical,12.7,1,1.2,pierce,physical,61.8,1,5.7,pierce,physical,49.5,1,4.5
1,dodge,dash,,スターライトジャッジメント,FALSE,pierce,physical,63,1,5.8,pierce,physical,39,1,3.6,,,,,,,,,,,,,,,,,,,,
1,dodge,counter,,フェアな決闘,FALSE,pierce,physical,221.4,1,20.2,,,,,,,,,,,,,,,,,,,,,,,,,
1,assist,quick,,スターライト・絆の力,FALSE,pierce,physical,93.4,1,8.5,,,,,,,,,,,,,,,,,,,,,,,,,
1,assist,follow,,急所エイム,FALSE,pierce,physical,388.8,1,35.4,,,,,,,,,,,,,,,,,,,,,,,,,
1,special,normal,,大人しくしてろ！,TRUE,pierce,physical,24.2,1,2.2,pierce,physical,51.7,1,4.7,pierce,physical,50.1,1,4.6,,,,,,,,,,,,,,,
1,special,derived,,スイーパー・タイム,FALSE,pierce,physical,543.8,1,49.5,,,,,,,,,,,,,,,,,,,,,,,,,
1,chain,chain,,スターライトグローリー,FALSE,pierce,physical,735.2,1,66.9,,,,,,,,,,,,,,,,,,,,,,,,,
1,chain,ultimate,,スターライト・ここに輝く！,FALSE,pierce,physical,1597.7,1,145.3,,,,,,,,,,,,,,,,,,,,,,,,,
2,basic,normal,,邪兎の連打,TRUE,strike,physical,38.9,1,3.6,strike,physical,35.3,1,3.3,strike,physical,124.3,1,11.3,,,,,,,,,,,,,,,
2,basic,normal,,邪兎の連打（弾）,TRUE,strike,physical,9,3,0.800000000000001,strike,physical,9,4,0.800000000000001,strike,physical,9,20,0.800000000000001,,,,,,,,,,,,,,,
2,basic,enhance,,思うがままに(弾),TRUE,strike,physical,16.4,3,1.5,strike,physical,16.4,4,1.5,strike,physical,16.4,20,1.5,,,,,,,,,,,,,,,
2,dodge,dash,,開けてびっくり（前方）,FALSE,strike,physical,41.2,1,3.8,,,,,,,,,,,,,,,,,,,,,,,,,
2,dodge,dash,,開けてびっくり（前方/弾）,FALSE,strike,physical,9,13,0.800000000000001,,,,,,,,,,,,,,,,,,,,,,,,,
2,dodge,dash,,開けてびっくり（後方）,FALSE,strike,physical,60,1,5.5,,,,,,,,,,,,,,,,,,,,,,,,,
2,dodge,counter,,牽制砲撃,FALSE,strike,physical,182.4,1,16.6,,,,,,,,,,,,,,,,,,,,,,,,,
2,assist,quick,,救急砲撃,FALSE,strike,ether,63.4,1,5.8,,,,,,,,,,,,,,,,,,,,,,,,,
2,assist,follow,,邪兎の出番！,FALSE,strike,ether,246.7,1,11.3,,,,,,,,,,,,,,,,,,,,,,,,,
2,special,normal,,シュガーボム,FALSE,strike,ether,52.6,1,4.8,,,,,,,,,,,,,,,,,,,,,,,,,
2,special,enhance,,シュガーボムサンド,FALSE,strike,ether,215,1,19.6,strike,ether,215,1,19.6,strike,ether,387,1,35.2,,,,,,,,,,,,,,,
2,chain,chain,,高級エーテルボム,FALSE,strike,ether,209.6,1,19.2,strike,ether,283,1,25.8,,,,,,,,,,,,,,,,,,,,
2,chain,ultimate,,特製エーテルグレネード,FALSE,strike,ether,646.8,1,58.8000000000001,strike,ether,873.2,1,79.4,,,,,,,,,,,,,,,,,,,,
24,basic,normal,,風花,TRUE,slash,physical,26.9,1,2.5,slash,physical,29.6,1,2.7,slash,ice,62.8,1,5.8,slash,ice,96.5,1,8.8,slash,ice,129,1,11.8,,,,,
24,basic,derived,,霜月,FALSE,slash,ice,454.7,1,41.4,slash,ice,858.1,1,78.1,slash,ice,2141.1,1,194.7,,,,,,,,,,,,,,,
24,dodge,dash,,冬蜂,FALSE,slash,physical,25.8,1,2.4,,,,,,,,,,,,,,,,,,,,,,,,,
24,dodge,counter,,寒雀,FALSE,slash,ice,245.9,1,22.4,,,,,,,,,,,,,,,,,,,,,,,,,
24,assist,quick,,花信風,FALSE,slash,ice,104.5,1,9.5,,,,,,,,,,,,,,,,,,,,,,,,,
24,assist,follow,,返り花,FALSE,slash,ice,337.8,1,30.8,,,,,,,,,,,,,,,,,,,,,,,,,
24,special,normal,,深雪,FALSE,slash,ice,35.8,1,3.3,,,,,,,,,,,,,,,,,,,,,,,,,
24,special,derived,,飛雪,TRUE,slash,ice,393.4,1,35.9,slash,ice,483.2,1,44.0000000000001,,,,,,,,,,,,,,,,,,,,
24,chain,chain,,春来たる,FALSE,slash,ice,628,1,57.3,,,,,,,,,,,,,,,,,,,,,,,,,
24,chain,ultimate,,なごり雪,FALSE,slash,ice,2388,1,217.1,,,,,,,,,,,,,,,,,,,,,,,,,
`

const wEngineDataText = `
Attack,S,Deep Sea Visitor,ディープシー・ビジター,48,713,crit-r,24,bonus-ice,25,50
Attack,S,Heartstring Nocturne,心弦のノクターン,48,713,crit-r,24,crit-d,50,80
Attack,S,Riot Suppressor Mark VI,サプレッサーⅣ型,48,713,crit-d,48,crit-r,15,26.4
Attack,S,Steel Cushion,鋼の肉球,46,684,crit-r,24,bonus-phy,20,40
Attack,S,The Brimstone,ブリムストーン,46,684,atk-p,30,,,
Attack,S,Zanshin Herb Case,残心の青籠,48,713,crit-d,48,crit-r,10,16
Attack,A,Cannon Rotor,キャノンローラー,40,594,crit-r,20,atk-p,7.5,10.8
Attack,A,Drill Rig - Red Axis,ドリルリグ‐レッドシャフト,42,624,en-reg,50,,,
Attack,A,Housekeeper,ハウスキーパー,42,624,atk-p,25,,,
Attack,A,Marcato Desire,強音デザイア,40,594,crit-r,20,,,
Attack,A,,金メッキの花信,40,594,atk-p,25,atk-p,6,9.6
Attack,A,Starlight Engine,スターライトエンジン,40,594,atk-p,25,,,
Attack,A,Starlight Engine Replica,なんちゃってスターライトエンジン,42,624,atk-p,25,,,
Attack,A,Street Superstar,ストリートスター,40,594,atk-p,25,,,
Attack,B,[Lunar] Decresent,「月相」‐晦,32,475,atk-p,20,,,
Attack,B,[Lunar] Noviluna,「月相」‐朔,32,475,crit-r,16,,,
Attack,B,[Lunar] Pleniluna,「月相」‐望,32,475,atk-p,20,,,
Anomaly,S,Flamemaker Shaker,バーニング・シェイカー,48,713,atk-p,30,,,
Anomaly,S,Fusion Compiler,複合コンパイラ,46,684,pen-p,24,atk-p,12,21
Anomaly,S,Hailstorm Shrine,あられ落つ星殿,50,743,crit-r,24,crit-d,50,80
Anomaly,S,Sharpened Stinger,磨き抜かれた切っ先,48,713,anm-p,90,,,
Anomaly,S,Timeweaver,刻流の賢者,48,713,atk-p,30,,,
Anomaly,A,Electro-Lip Gloss,電撃リップグロス,40,594,anm-p,75,,,
Anomaly,A,Rainforest Gourmet,密林の食いしん坊,40,594,anm-p,75,,,
Anomaly,A,Roaring Ride,グロウル・マイ・カー,42,624,atk-p,25,,,
Anomaly,A,Weeping Gemini,双生の涙,40,594,atk-p,25,,,
Anomaly,B,[Magnetic Storm] Alpha,「磁気嵐」‐壱式,32,475,atk-p,20,,,
Anomaly,B,[Magnetic Storm] Bravo,「磁気嵐」‐弐式,32,475,anm-p,68,,,
Anomaly,B,[Magnetic Storm] Charlie,「磁気嵐」‐参式,32,475,pen-p,16,,,
Stun,S,Blazing Laurel,炎心の桂冠,48,713,imp-p,18,,,
Stun,S,Helfire Gears,燃獄ギア,46,684,imp-p,18,,,
Stun,S,Ice-Jade Teapot,玉壺青氷,48,713,imp-p,18,,,
Stun,S,The Restrained,束縛されし者,46,684,imp-p,18,,,
Stun,A,Demara Battery Mark II,デマラ式電池Ⅱ型,42,624,imp-p,15,bonus-ele,15,24
Stun,A,Precious Fossilized Core,貴重な化石コア,40,594,imp-p,15,,,
Stun,A,Six Shooter,シックスシューター,40,594,imp-p,15,,,
Stun,A,Steam Oven,まな板の鯉,40,594,en-reg,50,,,
Stun,B,[Vortex] Arrow,「激流」‐矢型,32,475,imp-p,12,,,
Stun,B,[Vortex] Hatchet,「激流」‐斧型,32,475,en-reg,40,,,
Stun,B,[Vortex] Revolver,「激流」‐銃型,32,475,atk-p,20,,,
Defense,S,Tusks of Fury,猛進するキバ,48,713,imp-p,18,,,
Defense,A,Big Cylinder,ビガー・シリンダー,42,624,def-p,40,,,
Defense,A,Bunny Band,ラビットチャージャー,40,594,def-p,40,hp-p,8,11.6
Defense,A,Original Transmorpher,正式版変身装置,40,594,hp-p,25,hp-p,8,25
Defense,A,Peacekeeper ‐ Specialized,秩序の守り手・特化型,42,624,atk-p,25,,,
Defense,A,Spring Embrace,ホットスプリング,40,594,atk-p,25,,,
Defense,B,[Identity] Base,「恒等式」‐本格,32,475,def-p,32,,,
Defense,B,[Identity] Inflection,「恒等式」‐変格,32,475,def-p,32,,,
Support,S,Elegant Vanity,優美のヴァニティ,48,713,atk-p,30,,,
Support,S,Weeping Cradle,啜り泣くゆりかご,46,684,pen-p,24,,,
Support,A,Bashful Demon,恥じらう悪面,42,624,atk-p,25,bonus-ice,15,22
Support,A,Kaboom the Cannon,喧嘩腰のボンバルダム,42,624,en-reg,50,,,
Support,A,Slice of Time,歳月の薄片,40,594,pen-p,20,,,
Support,A,The Vault,ザ・ボールト,42,624,en-reg,50,,,
Support,A,Unfettered Game Ball,ゲームボール,40,594,en-reg,50,,,
Support,B,[Reverb] Mark I,「残響」‐Ⅰ型,32,475,atk-p,20,,,
Support,B,[Reverb] Mark II,「残響」‐Ⅱ型,32,475,en-reg,40,,,
Support,B,[Reverb] Mark III,「残響」‐Ⅲ型,32,475,hp-p,20,,,
`

const discDataText = `
Woodpecker Electro,ウッドペッカー・エレクトロ,crit-r,8
Thunder Metal,霹靂のヘヴィメタル,bonus-ele,10
Swing Jazz,スイング・ジャズ,en-reg,20
Soul Rock,ソウル・ロック,def-p,16
Shockstar Disco,ショックスター・ディスコ,imp-p,6
Puffer Electro,パファー・エレクトロ,pen-p,8
Proto Punk,プロト・パンク,shield,15
Polar Metal,極地のヘヴィメタル,bonus-ice,10
Inferno Metal,炎獄のヘヴィメタル,bonus-fire,10
Hormone Punk,ホルモン・パンク,atk-p,10
Freedom Blues,フリーダム・ブルース,anm-p,30
Fanged Metal,獣牙のヘヴィメタル,bonus-phy,10
Chaotic Metal,混沌のヘヴィメタル,bonus-eth,10
Chaos Jazz,ケイオス・ジャズ,anm-p,30
Branch & Blade Song,折枝の刀歌,crit-d,16
Astral Voice,静寂のアストラ,atk-p,10
`