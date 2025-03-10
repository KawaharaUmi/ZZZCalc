const enemyBaseDef = [36, 40, 43, 45, 46, 50, 54, 58, 60]
const levelCoefficient = [1,1.08,1.16,1.24,1.32,1.42,1.52,1.64,1.76,1.88,2,2.14,2.28,2.42,2.58,2.74,2.9,3.06,3.24,3.44,3.62,3.82,4.02,4.22,4.44,4.66,4.9,5.12,5.36,5.62,5.86,6.12,6.38,6.66,6.94,7.22,7.5,7.8,8.1,8.42,8.72,9.04,9.38,9.7,10.04,10.38,10.74,11.1,11.46,11.84,12.2,12.58,12.98,13.38,13.78,14.18,14.6,15.02,15.44,15.88]

const agentDataCSV = `
0,Stun,A,Electric,,,アンビー・デマラ,7500,583,612,118,5,50,94,93,0,1.2,imp,6,atk,25,0
1,Attack,A,Physical,,,ビリー・キッド,6907,712,606,91,5,50,92,91,0,1.2,critR,4.8,atk,25,28
2,Support,A,Ether,,,ニコ・デマラ,8145,574,622,80,5,50,90,93,0,1.2,enReg,0.12,atk,25,26
3,Attack,S,Physical,,,猫宮又奈,7560,835,587,92,5,50,97,96,0,1.2,critR,4.8,atk,25,35
4,Attack,S,Fire,,,「11号」,7673,813,612,93,5,50,94,93,0,1.2,critR,4.8,atk,25,36
5,Attack,A,Physical,,,カリン・ウィクス,6976,732,604,93,5,50,93,96,0,1.2,critD,9.6,atk,25,27
6,Attack,A,Electric,,,アンドー・イワノフ,7219,716,622,95,5,50,86,90,0,1.2,critR,4.8,atk,25,29
7,Defense,A,Fire,,,ベン・ビガー,8577,867,724,95,5,50,86,90,0,1.2,enReg,0.12,atk,25,30
8,Stun,S,Fire,,,クレタ・ベロボーグ,8127,660,594,116,5,50,97,96,0,1.2,imp,6,atk,25,37
9,Anomaly,S,Electric,,,グレース・ハワード,7482,750,600,83,5,50,115,116,0,1.2,anmB,12,atk,25,39
10,Stun,S,Ice,,,フォン・ライカン,8416,653,606,119,5,50,91,90,0,1.2,imp,6,atk,25,38
11,Attack,S,Ice,,,エレン・ジョー,7673,863,606,93,5,50,94,93,0,1.2,critR,4.8,atk,25,40
12,Support,S,Electric,,,アレクサンドリナ・セバスチャン,8609,642,600,83,5,50,93,92,0,1.2,penP,4.8,atk,25,41
13,Attack,S,Ether,,,朱鳶,7482,844,600,90,5,50,93,92,0,1.2,critD,9.6,atk,25,42
14,Support,A,Ice,,,蒼角,8025,590,597,86,5,50,93,96,0,1.2,enReg,0.12,atk,25,31
15,Support,A,Fire,,,ルシアーナ・デ・モンテフィーノ,8025,583,612,86,5,50,94,93,0,1.2,enReg,0.12,atk,25,43
16,Anomaly,A,Physical,,,パイパー・ウィール,6976,683,612,86,5,50,116,118,0,1.2,enReg,0.12,atk,25,44
17,Stun,S,Electric,,,青衣,8250,683,612,118,5,50,94,93,0,1.2,imp,6,atk,25,46
18,Anomaly,S,Physical,,,ジェーン・ドゥ,7788,805,606,89,5,50,112,114,0,1.2,anmB,12,atk,25,47
19,Defense,A,Electric,,,セス・ローウェル,8701,568,746,94,5,50,86,90,0,1.2,enReg,0.12,atk,25,48
20,Defense,S,Physical,,,キング・シーザー,9526,636,753,105,5,50,87,90,0,1.2,imp,6,atk,25,49
21,Anomaly,S,Fire,,,バーニス・ホワイト,7368,788,600,83,5,50,118,120,0,1.2,enReg,0.12,atk,25,50
22,Anomaly,S,Electric,,,月城柳,7788,797,612,86,5,50,112,114,0,1.2,anmB,12,atk,25,51
23,Stun,S,Fire,,,ライト,8253,722,612,119,5,50,91,90,0,1.2,imp,6,atk,25,52
24,Anomaly,S,Ice,Frost,,星見雅,7673,805,606,86,5,50,116,148,0,1.2,anmP,30,atk,25,54
25,Attack,S,Electric,,,浅羽悠真,7405,840,600,90,5,50,80,95,0,1.2,critR,4.8,atk,25,55
26,Support,S,Ether,,,アストラ・ヤオ,8609,640,600,83,5,50,93,92,0,1.2,enReg,0.12,atk,25,56
27,Attack,S,Fire,,,イヴリン・シュヴァリエ,7788,854,612,93,5,50,92,90,0,1.2,critR,4.8,atk,25,57
`

const wEngineDataCSV = `
0,Stun,A,Demara Battery Mark II,デマラ式電池Ⅱ型,42,624,imp-p,15,bonus-ele,15,17.5,20,22,24,,,,,,,,
1,Attack,B,[Lunar] Pleniluna,「月相」‐望,32,475,atk-p,20,,,,,,,,,,,,,,
2,Attack,B,[Lunar] Decresent,「月相」‐晦,32,475,atk-p,20,,,,,,,,,,,,,,
3,Attack,B,[Lunar] Noviluna,「月相」‐朔,32,475,crit-r,16,,,,,,,,,,,,,,
4,Support,B,[Reverb] Mark I,「残響」‐Ⅰ型,32,475,atk-p,20,,,,,,,,,,,,,,
5,Support,B,[Reverb] Mark II,「残響」‐Ⅱ型,32,475,en-reg,40,,,,,,,,,,,,,,
6,Support,B,[Reverb] Mark III,「残響」‐Ⅲ型,32,475,hp-p,20,,,,,,,,,,,,,,
7,Stun,B,[Vortex] Revolver,「激流」‐銃型,32,475,atk-p,20,,,,,,,,,,,,,,
8,Stun,B,[Vortex] Arrow,「激流」‐矢型,32,475,imp-p,12,,,,,,,,,,,,,,
9,Stun,B,[Vortex] Hatchet,「激流」‐斧型,32,475,en-reg,40,,,,,,,,,,,,,,
10,Anomaly,B,[Magnetic Storm] Alpha,「磁気嵐」‐壱式,32,475,atk-p,20,,,,,,,,,,,,,,
11,Anomaly,B,[Magnetic Storm] Bravo,「磁気嵐」‐弐式,32,475,anm-p,68,,,,,,,,,,,,,,
12,Anomaly,B,[Magnetic Storm] Charlie,「磁気嵐」‐参式,32,475,pen-r,16,,,,,,,,,,,,,,
13,Defense,B,[Identity] Base,「恒等式」‐本格,32,475,def-p,32,,,,,,,,,,,,,,
14,Defense,B,[Identity] Inflection,「恒等式」‐変格,32,475,def-p,32,,,,,,,,,,,,,,
15,Attack,A,Street Superstar,ストリートスター,40,594,atk-p,25,,,,,,,,,,,,,,
16,Support,A,Slice of Time,歳月の薄片,40,594,pen-r,20,,,,,,,,,,,,,,
17,Anomaly,A,Rainforest Gourmet,密林の食いしん坊,40,594,anm-p,75,,,,,,,,,,,,,,
18,Attack,A,Starlight Engine,スターライトエンジン,40,594,atk-p,25,,,,,,,,,,,,,,
19,Stun,A,Steam Oven,まな板の鯉,40,594,en-reg,50,,,,,,,,,,,,,,
20,Stun,A,Precious Fossilized Core,貴重な化石コア,40,594,imp-p,15,,,,,,,,,,,,,,
21,Defense,A,Original Transmorpher,正式版変身装置,40,594,hp-p,25,hp-p,8,9,10,11,12.5,,,,,,,,
22,Anomaly,A,Weeping Gemini,双生の涙,40,594,atk-p,25,,,,,,,,,,,,,,
23,Anomaly,A,Electro-Lip Gloss,電撃リップグロス,40,594,anm-p,75,,,,,,,,,,,,,,
24,Defense,A,Bunny Band,ラビットチャージャー,40,594,def-p,40,hp-p,8,9.2,10.4,11.6,12.8,,,,,,,,
25,Defense,A,Spring Embrace,ホットスプリング,40,594,atk-p,25,,,,,,,,,,,,,,
26,Support,A,The Vault,ザ・ボールト,42,624,en-reg,50,,,,,,,,,,,,,,
27,Attack,A,Housekeeper,ハウスキーパー,42,624,atk-p,25,,,,,,,,,,,,,,
28,Attack,A,Starlight Engine Replica,なんちゃってスターライトエンジン,42,624,atk-p,25,,,,,,,,,,,,,,
29,Attack,A,Drill Rig - Red Axis,ドリルリグ‐レッドシャフト,42,624,en-reg,50,,,,,,,,,,,,,,
30,Defense,A,Big Cylinder,ビガー・シリンダー,42,624,def-p,40,,,,,,,,,,,,,,
31,Support,A,Bashful Demon,恥じらう悪面,42,624,atk-p,25,bonus-ice,15,17.5,20,22,24,,,,,,,,
32,Attack,A,Cannon Rotor,キャノンローラー,40,594,crit-r,20,atk-p,7.5,8.6,9.7,10.8,12,,,,,,,,
33,Support,A,Unfettered Game Ball,ゲームボール,40,594,en-reg,50,,,,,,,,,,,,,,
34,Stun,A,Six Shooter,シックスシューター,40,594,imp-p,15,,,,,,,,,,,,,,
35,Attack,S,Steel Cushion,鋼の肉球,46,684,crit-r,24,bonus-phy,20,25,30,35,40,,,,,,,,
36,Attack,S,The Brimstone,ブリムストーン,46,684,atk-p,30,,,,,,,,,,,,,,
37,Stun,S,Helfire Gears,燃獄ギア,46,684,imp-p,18,,,,,,,,,,,,,,
38,Stun,S,The Restrained,束縛されし者,46,684,imp-p,18,,,,,,,,,,,,,,
39,Anomaly,S,Fusion Compiler,複合コンパイラ,46,684,pen-r,24,atk-p,12,15,18,21,24,,,,,,,,
40,Attack,S,Deep Sea Visitor,ディープシー・ビジター,48,713,crit-r,24,bonus-ice,25,31.5,38,44.5,50,,,,,,,,
41,Support,S,Weeping Cradle,啜り泣くゆりかご,46,684,pen-r,24,,,,,,,,,,,,,,
42,Attack,S,Riot Suppressor Mark VI,サプレッサーⅣ型,48,713,crit-d,48,crit-r,15,18.8,22.6,26.4,30,,,,,,,,
43,Support,A,Kaboom the Cannon,喧嘩腰のボンバルダム,42,624,en-reg,50,,,,,,,,,,,,,,
44,Anomaly,A,Roaring Ride,グロウル・マイ・カー,42,624,atk-p,25,,,,,,,,,,,,,,
45,Attack,A,Gilded Blossom,金メッキの花信,40,594,atk-p,25,atk-p,6,6.9,7.8,8.7,9.6,special,enhance,bonus-dmg,15,17.2,19.5,21.8,24
46,Stun,S,Ice-Jade Teapot,玉壺青氷,48,713,imp-p,18,,,,,,,,,,,,,,
47,Anomaly,S,Sharpened Stinger,磨き抜かれた切っ先,48,713,anm-p,90,,,,,,,,,,,,,,
48,Defense,A,Peacekeeper ‐ Specialized,秩序の守り手・特化型,42,624,atk-p,25,,,,,,,,,,,,,,
49,Defense,S,Tusks of Fury,猛進するキバ,48,713,imp-p,18,,,,,,,,,,,,,,
50,Anomaly,S,Flamemaker Shaker,バーニング・シェイカー,48,713,atk-p,30,,,,,,,,,,,,,,
51,Anomaly,S,Timeweaver,刻流の賢者,48,713,atk-p,30,,,,,,,,,,,,,,
52,Stun,S,Blazing Laurel,炎心の桂冠,48,713,imp-p,18,,,,,,,,,,,,,,
53,Attack,A,Marcato Desire,強音デザイア,40,594,crit-r,20,,,,,,,,,,,,,,
54,Anomaly,S,Hailstorm Shrine,あられ落つ星殿,50,743,crit-r,24,crit-d,50,57,65,72,80,,,,,,,,
55,Attack,S,Zanshin Herb Case,残心の青籠,48,713,crit-d,48,crit-r,10,11.5,13,14.5,16,dodge,dash,bonus-ele,40,46,52,58,64
56,Support,S,Elegant Vanity,優美のヴァニティ,48,713,atk-p,30,,,,,,,,,,,,,,
57,Attack,S,Heartstring Nocturne,心弦のノクターン,48,713,crit-r,24,crit-d,50,57.5,65,72.5,80,,,,,,,,
`

const discDataCSV = `
0,Swing Jazz,スイング・ジャズ,en-reg,20,assist
1,Woodpecker Electro,ウッドペッカー・エレクトロ,crit-r,8,attack
2,Puffer Electro,パファー・エレクトロ,pen-r,8,attack
3,Shockstar Disco,ショックスター・ディスコ,imp-p,6,stun
4,Freedom Blues,フリーダム・ブルース,anm-p,30,anomaly
5,Hormone Punk,ホルモン・パンク,atk-p,10,attack
6,Soul Rock,ソウル・ロック,def-p,16,defense
7,Inferno Metal,炎獄のヘヴィメタル,bonus-fire,10,dmg-bonus
8,Chaotic Metal,混沌のヘヴィメタル,bonus-eth,10,dmg-bonus
9,Thunder Metal,霹靂のヘヴィメタル,bonus-ele,10,dmg-bonus
10,Polar Metal,極地のヘヴィメタル,bonus-ice,10,dmg-bonus
11,Fanged Metal,獣牙のヘヴィメタル,bonus-phy,10,dmg-bonus
12,Proto Punk,プロト・パンク,shield,15,shield
13,Chaos Jazz,ケイオス・ジャズ,anm-p,30,anomaly
14,Branch & Blade Song,折枝の刀歌,crit-d,16,anomaly
15,Astral Voice,静寂のアストラ,atk-p,10,assist
`

const skillDataCSV = `
0,0,basic,normal,,ボルトターボ,TRUE,slash,Physical,31.2,1,2.9,slash,Physical,33.7,1,3.09999999999999,slash,Physical,113.6,1,10.4,slash,Electric,239.1,1,21.8,,,,,,,,,,
1,0,basic,derived,,落雷,TRUE,slash,Physical,31.2,1,2.9,slash,Physical,33.7,1,3.09999999999999,slash,Physical,113.6,1,10.4,strike,Electric,328.6,1,29.9,,,,,,,,,,
2,0,dodge,dash,,電弧斬り,FALSE,slash,Physical,56.7,1,5.2,,,,,,,,,,,,,,,,,,,,,,,,,
3,0,dodge,counter,,迅雷,FALSE,slash,Electric,180.2,1,16.4,,,,,,,,,,,,,,,,,,,,,,,,,
4,0,assist,quick,,雷呼,FALSE,slash,Electric,61.7,1,5.7,,,,,,,,,,,,,,,,,,,,,,,,,
5,0,assist,follow,,スピニングサンダー,FALSE,slash,Electric,335.2,1,30.5,,,,,,,,,,,,,,,,,,,,,,,,,
6,0,special,normal,,雷光斬り,FALSE,slash,Electric,93.4,1,8.5,,,,,,,,,,,,,,,,,,,,,,,,,
7,0,special,enhance,,蒼雷斬り,FALSE,slash,Electric,583,1,53,,,,,,,,,,,,,,,,,,,,,,,,,
8,0,chain,chain,,ソレノイドエンジン,FALSE,slash,Electric,542.4,1,49.4,,,,,,,,,,,,,,,,,,,,,,,,,
9,0,chain,ultimate,,オーバードライブエンジン,FALSE,slash,Electric,1512.6,1,137.6,,,,,,,,,,,,,,,,,,,,,,,,,
10,1,basic,normal,,出力全開,TRUE,pierce,Physical,68,1,6.2,pierce,Physical,7.6,1,0.700000000000001,pierce,Physical,61.8,1,5.7,pierce,Physical,12.7,1,1.2,pierce,Physical,61.8,1,5.7,pierce,Physical,49.5,1,4.5
11,1,dodge,dash,,スターライトジャッジメント,FALSE,pierce,Physical,63,1,5.8,pierce,Physical,39,1,3.6,,,,,,,,,,,,,,,,,,,,
12,1,dodge,counter,,フェアな決闘,FALSE,pierce,Physical,221.4,1,20.2,,,,,,,,,,,,,,,,,,,,,,,,,
13,1,assist,quick,,スターライト・絆の力,FALSE,pierce,Physical,93.4,1,8.5,,,,,,,,,,,,,,,,,,,,,,,,,
14,1,assist,follow,,急所エイム,FALSE,pierce,Physical,388.8,1,35.4,,,,,,,,,,,,,,,,,,,,,,,,,
15,1,special,normal,,大人しくしてろ！,TRUE,pierce,Physical,24.2,1,2.2,pierce,Physical,51.7,1,4.7,pierce,Physical,50.1,1,4.6,,,,,,,,,,,,,,,
16,1,special,derived,,スイーパー・タイム,FALSE,pierce,Physical,543.8,1,49.5,,,,,,,,,,,,,,,,,,,,,,,,,
17,1,chain,chain,,スターライトグローリー,FALSE,pierce,Physical,735.2,1,66.9,,,,,,,,,,,,,,,,,,,,,,,,,
18,1,chain,ultimate,,スターライト・ここに輝く！,FALSE,pierce,Physical,1597.7,1,145.3,,,,,,,,,,,,,,,,,,,,,,,,,
19,2,basic,normal,,邪兎の連打,TRUE,strike,Physical,38.9,1,3.6,strike,Physical,35.3,1,3.3,strike,Physical,124.3,1,11.3,,,,,,,,,,,,,,,
20,2,basic,normal,,邪兎の連打（弾）,TRUE,strike,Physical,9,3,0.800000000000001,strike,Physical,9,4,0.800000000000001,strike,Physical,9,20,0.800000000000001,,,,,,,,,,,,,,,
21,2,basic,enhance,,思うがままに(弾),TRUE,strike,Physical,16.4,3,1.5,strike,Physical,16.4,4,1.5,strike,Physical,16.4,20,1.5,,,,,,,,,,,,,,,
22,2,dodge,dash,,開けてびっくり（前方）,FALSE,strike,Physical,41.2,1,3.8,,,,,,,,,,,,,,,,,,,,,,,,,
23,2,dodge,dash,,開けてびっくり（前方/弾）,FALSE,strike,Physical,9,13,0.800000000000001,,,,,,,,,,,,,,,,,,,,,,,,,
24,2,dodge,dash,,開けてびっくり（後方）,FALSE,strike,Physical,60,1,5.5,,,,,,,,,,,,,,,,,,,,,,,,,
25,2,dodge,counter,,牽制砲撃,FALSE,strike,Physical,182.4,1,16.6,,,,,,,,,,,,,,,,,,,,,,,,,
26,2,assist,quick,,救急砲撃,FALSE,strike,Ether,63.4,1,5.8,,,,,,,,,,,,,,,,,,,,,,,,,
27,2,assist,follow,,邪兎の出番！,FALSE,strike,Ether,246.7,1,11.3,,,,,,,,,,,,,,,,,,,,,,,,,
28,2,special,normal,,シュガーボム,FALSE,strike,Ether,52.6,1,4.8,,,,,,,,,,,,,,,,,,,,,,,,,
29,2,special,enhance,,シュガーボムサンド,FALSE,strike,Ether,215,1,19.6,strike,Ether,215,1,19.6,strike,Ether,387,1,35.2,,,,,,,,,,,,,,,
30,2,chain,chain,,高級エーテルボム,FALSE,strike,Ether,209.6,1,19.2,strike,Ether,283,1,25.8,,,,,,,,,,,,,,,,,,,,
31,2,chain,ultimate,,特製エーテルグレネード,FALSE,strike,Ether,646.8,1,58.8000000000001,strike,Ether,873.2,1,79.4,,,,,,,,,,,,,,,,,,,,
32,24,basic,normal,,風花,TRUE,slash,Physical,26.9,1,2.5,slash,Physical,29.6,1,2.7,slash,Ice,62.8,1,5.8,slash,Ice,96.5,1,8.8,slash,Ice,129,1,11.8,,,,,
33,24,basic,charge,,霜月,FALSE,slash,Ice,454.7,1,41.4,slash,Ice,858.1,1,78.1,slash,Ice,2141.1,1,194.7,,,,,,,,,,,,,,,
34,24,dodge,dash,,冬蜂,FALSE,slash,Physical,25.8,1,2.4,,,,,,,,,,,,,,,,,,,,,,,,,
35,24,dodge,counter,,寒雀,FALSE,slash,Ice,245.9,1,22.4,,,,,,,,,,,,,,,,,,,,,,,,,
36,24,assist,quick,,花信風,FALSE,slash,Ice,104.5,1,9.5,,,,,,,,,,,,,,,,,,,,,,,,,
37,24,assist,follow,,返り花,FALSE,slash,Ice,337.8,1,30.8,,,,,,,,,,,,,,,,,,,,,,,,,
38,24,special,normal,,深雪,FALSE,slash,Ice,35.8,1,3.3,,,,,,,,,,,,,,,,,,,,,,,,,
39,24,special,enhance,,飛雪,TRUE,slash,Ice,393.4,1,35.9,slash,Ice,483.2,1,44.0000000000001,,,,,,,,,,,,,,,,,,,,
40,24,chain,chain,,春来たる,FALSE,slash,Ice,628,1,57.3,,,,,,,,,,,,,,,,,,,,,,,,,
41,24,chain,ultimate,,なごり雪,FALSE,slash,Ice,2388,1,217.1,,,,,,,,,,,,,,,,,,,,,,,,,
42,3,basic,normal,,猫の引っ掻き,TRUE,slash,Physical,55.2,1,5.09999999999999,slash,Physical,62.6,1,5.7,slash,Physical,72.7,1,6.7,slash,Physical,170.2,1,15.5,slash,Physical,123.6,1,11.3,,,,,
43,3,basic,derived,,赤き刃,TRUE,slash,Physical,71.8,1,6.60000000000001,,,,,,,,,,,,,,,,,,,,,,,,,
44,3,dodge,dash,,どこを見てるの？,FALSE,slash,Physical,35.1,1,3.2,,,,,,,,,,,,,,,,,,,,,,,,,
45,3,dodge,counter,,ファントムクロー,FALSE,slash,Physical,227.9,1,20.8,,,,,,,,,,,,,,,,,,,,,,,,,
46,3,assist,quick,,猫の手貸すぞ☆,FALSE,slash,Physical,94.5,1,8.59999999999999,,,,,,,,,,,,,,,,,,,,,,,,,
47,3,assist,follow,,迅影,FALSE,slash,Physical,300.4,1,27.4,,,,,,,,,,,,,,,,,,,,,,,,,
48,3,special,normal,,奇襲,FALSE,strike,Physical,47.3,1,4.3,,,,,,,,,,,,,,,,,,,,,,,,,
49,3,special,enhance,,めちゃコワ奇襲！,FALSE,slash,Physical,539.7,1,49.0999999999999,,,,,,,,,,,,,,,,,,,,,,,,,
50,3,chain,chain,,クロースワイプ,FALSE,slash,Physical,536.2,1,48.8,,,,,,,,,,,,,,,,,,,,,,,,,
51,3,chain,ultimate,,クロースマッシュ,FALSE,slash,Physical,1571.1,1,142.9,,,,,,,,,,,,,,,,,,,,,,,,,
52,4,basic,normal,,抜刀散火,TRUE,slash,Physical,34.4,1,3.2,slash,Physical,41.2,1,3.8,slash,Physical,102.8,1,9.40000000000001,slash,Physical,213.4,1,19.4,,,,,,,,,,
53,4,basic,enhance,,火力鎮圧,TRUE,slash,Fire,55.1,1,5.1,slash,Fire,57.2,1,5.2,slash,Fire,132,1,12,slash,Fire,340.7,1,31,,,,,,,,,,
54,4,dodge,dash,,熾火,FALSE,slash,Physical,68.3,1,6.3,,,,,,,,,,,,,,,,,,,,,,,,,
55,4,dodge,enhance,,火力鎮圧,FALSE,slash,Fire,78.8,1,7.2,,,,,,,,,,,,,,,,,,,,,,,,,
56,4,dodge,counter,,逆火,FALSE,slash,Fire,262,1,23.9,,,,,,,,,,,,,,,,,,,,,,,,,
57,4,assist,quick,,火力支援,FALSE,slash,Fire,120.8,1,11,,,,,,,,,,,,,,,,,,,,,,,,,
58,4,assist,follow,,再燃,FALSE,slash,Fire,383.7,1,34.9,,,,,,,,,,,,,,,,,,,,,,,,,
59,4,special,normal,,烈火,FALSE,slash,Fire,52.6,1,4.8,,,,,,,,,,,,,,,,,,,,,,,,,
60,4,special,enhance,,燃え盛る烈火,FALSE,slash,Fire,675,1,61.4,,,,,,,,,,,,,,,,,,,,,,,,,
61,4,chain,chain,,滾る烈火,FALSE,slash,Fire,632.5,1,57.5,,,,,,,,,,,,,,,,,,,,,,,,,
62,4,chain,ultimate,,轟く烈火,FALSE,slash,Fire,2103,1,191.2,,,,,,,,,,,,,,,,,,,,,,,,,
63,5,basic,normal,,お掃除開始,TRUE,slash,Physical,82,1,7.5,slash,Physical,76.6,1,7,slash,Physical,179.2,1,16.3,slash,Physical,233.4,1,21.3,slash,Physical,421.2,1,38.3,,,,,
64,5,dodge,dash,,『断』,FALSE,slash,Physical,96.7,1,8.8,,,,,,,,,,,,,,,,,,,,,,,,,
65,5,dodge,counter,,『捨』,FALSE,slash,Physical,271.2,1,24.8,,,,,,,,,,,,,,,,,,,,,,,,,
66,5,assist,quick,,応急処置,FALSE,slash,Physical,215,1,19.6,,,,,,,,,,,,,,,,,,,,,,,,,
67,5,assist,follow,,テキパキお掃除,FALSE,slash,Physical,547.5,1,49.8,,,,,,,,,,,,,,,,,,,,,,,,,
68,5,special,normal,,強力清掃,FALSE,slash,Physical,66.7,1,6.09999999999999,slash,Physical,37.5,1,3.5,slash,Physical,25,1,2.3,,,,,,,,,,,,,,,
69,5,special,enhance,,スカートの裾に注意,FALSE,slash,Physical,345.1,1,31.4,slash,Physical,1035.2,1,94.2000000000001,slash,Physical,345.1,1,31.4,,,,,,,,,,,,,,,
70,5,chain,chain,,ごめんなさい…,FALSE,slash,Physical,687.3,1,62.5,,,,,,,,,,,,,,,,,,,,,,,,,
71,5,chain,ultimate,,も、申し訳ございません！,FALSE,slash,Physical,2028.8,1,184.5,,,,,,,,,,,,,,,,,,,,,,,,,
72,6,basic,normal,,熱血準備体操,TRUE,strike,Physical,67.8,1,6.2,strike,Physical,92.3,1,8.40000000000001,strike,Physical,109.8,1,10,pierce,Physical,229.1,1,20.9,,,,,,,,,,
73,6,basic,enhance,,熱血準備体操（爆発状態）,TRUE,strike,Electric,240.9,1,21.9,pierce,Electric,469.2,1,42.7,pierce,Electric,456.9,1,41.6,,,,,,,,,,,,,,,
74,6,dodge,dash,,正面衝突,FALSE,strike,Physical,68.4,1,6.3,,,,,,,,,,,,,,,,,,,,,,,,,
75,6,dodge,counter,,拳骨応酬,FALSE,strike,Physical,271.2,1,24.7,,,,,,,,,,,,,,,,,,,,,,,,,
76,6,dodge,enhance,,オーバーロード・ドリルブレイク（爆発状態）,FALSE,pierce,Electric,465.4,1,42.4,,,,,,,,,,,,,,,,,,,,,,,,,
77,6,assist,quick,,肩を並べて,FALSE,strike,Physical,263.4,1,24,,,,,,,,,,,,,,,,,,,,,,,,,
78,6,assist,follow,,極限突進,FALSE,pierce,Electric,325.8,1,29.7,,,,,,,,,,,,,,,,,,,,,,,,,
79,6,special,normal,,回れ、兄弟！,FALSE,pierce,Electric,44.2,1,4.09999999999999,,,,,,,,,,,,,,,,,,,,,,,,,
80,6,special,enhance,,バースト・ドリルブレイク（爆発状態）,FALSE,pierce,Electric,231.4,1,21.1,,,,,,,,,,,,,,,,,,,,,,,,,
81,6,special,enhance,,兄弟、天を衝け！,FALSE,pierce,Electric,195.1,1,17.8,,,,,,,,,,,,,,,,,,,,,,,,,
82,6,chain,chain,,回れ回れ！,FALSE,pierce,Electric,640.7,1,58.3,,,,,,,,,,,,,,,,,,,,,,,,,
83,6,chain,ultimate,,回れ！回れ！！回れ！！！,FALSE,pierce,Electric,1816.4,1,165.2,,,,,,,,,,,,,,,,,,,,,,,,,
`