export default {
    props: {
        dataTarget: Number,
        execute: Function,
        close: Function,
    },
    methods: {
        comment() {
            const comments = [
                'こんなふうに電気代の請求書も捨てて済むなら、どんなにいいだろうね？',
                '何この「うたた寝の表情記録およびそれに基づく健康状態の分析」ってデータ！？今すぐ消して！！',
                'ソースの多いハンバーガーだったから、テーブルを汚してしまわないよう敷物にしたわ。必要な紙だった？',
                'この注文票の予約限定版だけどよ。1セット分の代金はツケにしといてくれねえか・・・？',
                'にゃにゃ！？これビリビリに破いちゃっていいのか？？',
                '新しい捜査情報ですね、ありがとうござ・・・「伝説的棋譜百選」？なんですか・・・？これ。',
                '廃棄物の気分を味わうというのも、なかなかに乙であったな・・・とはいえ、二度は御免被るがのう？',
                'これを処分しておけばいいのか？わかった！',
                'こういう何気なく捨てたものから足がつくものよ。理解してると思うけど、ね？',
                '何を難しい顔しているのかと思えば・・・こんなデータ、命に関わりますわよ？',
                '「古くて使えませんわ」って捨てようとしたんだぜ！？なにかの役に立つかもしれねえじゃねえか！',
                'でさ？結局捨てられた紙束は着火剤として役立ったんだぜぇ？お笑いだよなぁ？',
                ''
            ]
            return comments[Math.floor(Math.random() * comments.length)]
        },
    },
    template: `
                <dialog @click.stop="close">
                    <div @click.stop="">
                        <h2>Warning:</h2>
                        <p>データ[No.{{dataTarget}}]を削除します。<br>復元できませんがよろしいですか？</p>
                        <blockquote>{{comment()}}</blockquote>
                        <div class="select"><button class="delete" @click.stop="execute">Yes</button> <button @click.stop="close">No</button></div>
                    </div>
                </dialog>
    `
}